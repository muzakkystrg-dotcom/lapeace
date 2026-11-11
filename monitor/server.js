import express from 'express';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.MONITOR_PORT || 4000;
const app = express();
const server = http.createServer(app);

// Target endpoints to monitor
const TARGETS = [
  {
    id: 'frontend_https',
    name: 'Portal Web SITAPAK (HTTPS)',
    url: 'https://lapeace.founduslab.my.id/',
    expectedStatus: 200,
    category: 'web',
  },
  {
    id: 'api_health',
    name: 'Backend API Health Gateway',
    url: 'https://lapeace.founduslab.my.id/api/health',
    expectedStatus: 200,
    category: 'api',
  },
  {
    id: 'api_budget',
    name: 'Database & Budget API (Transparansi)',
    url: 'https://lapeace.founduslab.my.id/api/budget',
    expectedStatus: 200,
    category: 'database',
  },
  {
    id: 'vps_direct_ip',
    name: 'Direct VPS Host (Nginx IP 178.83.188.173)',
    url: 'http://178.83.188.173/',
    expectedStatus: [200, 301, 302, 404],
    category: 'server',
  },
];

// State store
let probeIntervalMs = 5000;
let probeTimer = null;
let logIdCounter = 1;
const MAX_LOGS = 600;
const logs = [];
const incidents = [];
const targetStats = {};

TARGETS.forEach((t) => {
  targetStats[t.id] = {
    ...t,
    status: 'UNKNOWN', // 'UP' | 'DOWN' | 'DEGRADED' | 'UNKNOWN'
    statusCode: null,
    latency: null,
    lastChecked: null,
    history: [], // last 25 latencies
    totalChecks: 0,
    successfulChecks: 0,
    failedChecks: 0,
    uptimePercent: 100,
    lastError: null,
  };
});

// SSE Clients for real-time updates
const sseClients = new Set();

function broadcastSSE(eventType, data) {
  const payload = `event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
    } catch {
      sseClients.delete(client);
    }
  }
}

// Log writer
const LOG_FILE_PATH = path.join(__dirname, 'probe.log');
function appendToFileLog(logItem) {
  const line = `[${logItem.timestamp}] [${logItem.status}] [${logItem.targetName}] [${logItem.statusCode || 'ERR'}] ${logItem.responseTime}ms - ${logItem.message}\n`;
  fs.appendFile(LOG_FILE_PATH, line, () => {});
}

// Probe a single target
async function probeTarget(target) {
  const stat = targetStats[target.id];
  const startTime = Date.now();
  let status = 'DOWN';
  let statusCode = 0;
  let latency = 0;
  let errorMsg = null;

  try {
    const res = await fetch(target.url, {
      method: 'GET',
      headers: {
        'User-Agent': 'SITAPAK-DownDetector-Prober/1.0',
        'Cache-Control': 'no-cache',
      },
      signal: AbortSignal.timeout(8000), // 8s timeout
    });

    latency = Date.now() - startTime;
    statusCode = res.status;

    const expected = Array.isArray(target.expectedStatus)
      ? target.expectedStatus
      : [target.expectedStatus];

    if (expected.includes(statusCode)) {
      status = latency > 1500 ? 'DEGRADED' : 'UP';
    } else {
      status = 'DOWN';
      errorMsg = `HTTP Status tidak sesuai: ${statusCode}`;
    }
  } catch (err) {
    latency = Date.now() - startTime;
    status = 'DOWN';
    errorMsg = err.name === 'TimeoutError' ? 'Koneksi Timeout (> 8.000 ms)' : err.message;
  }

  // Update target statistics
  const prevStatus = stat.status;
  stat.status = status;
  stat.statusCode = statusCode;
  stat.latency = latency;
  stat.lastChecked = new Date().toISOString();
  stat.lastError = errorMsg;
  stat.totalChecks += 1;

  if (status === 'UP' || status === 'DEGRADED') {
    stat.successfulChecks += 1;
  } else {
    stat.failedChecks += 1;
  }

  stat.uptimePercent = Number(
    ((stat.successfulChecks / stat.totalChecks) * 100).toFixed(2)
  );

  stat.history.push({
    time: Date.now(),
    latency,
    status,
  });
  if (stat.history.length > 30) {
    stat.history.shift();
  }

  // Incident detection
  if (prevStatus === 'UP' && status === 'DOWN') {
    const incident = {
      id: `INC-${Date.now()}`,
      targetId: target.id,
      targetName: target.name,
      startedAt: new Date().toISOString(),
      resolvedAt: null,
      cause: errorMsg,
      status: 'ONGOING',
    };
    incidents.unshift(incident);
    broadcastSSE('incident_new', incident);
  } else if ((prevStatus === 'DOWN' || prevStatus === 'UNKNOWN') && status === 'UP') {
    const activeInc = incidents.find(
      (inc) => inc.targetId === target.id && inc.status === 'ONGOING'
    );
    if (activeInc) {
      activeInc.resolvedAt = new Date().toISOString();
      activeInc.status = 'RESOLVED';
      activeInc.durationSeconds = Math.round(
        (Date.now() - new Date(activeInc.startedAt).getTime()) / 1000
      );
      broadcastSSE('incident_resolved', activeInc);
    }
  }

  // Record log
  const logItem = {
    id: logIdCounter++,
    timestamp: new Date().toISOString(),
    formattedTime: new Date().toLocaleTimeString('id-ID', { hour12: false }),
    targetId: target.id,
    targetName: target.name,
    targetUrl: target.url,
    category: target.category,
    status,
    statusCode,
    responseTime: latency,
    message: errorMsg || (status === 'DEGRADED' ? 'Respons lambat (> 1.5s)' : 'Respons normal & sehat'),
  };

  logs.unshift(logItem);
  if (logs.length > MAX_LOGS) {
    logs.pop();
  }

  appendToFileLog(logItem);

  return logItem;
}

// Run probe on all targets
async function probeAll() {
  const results = await Promise.all(TARGETS.map(probeTarget));
  broadcastSSE('probe_batch', {
    timestamp: new Date().toISOString(),
    results,
    targets: Object.values(targetStats),
    summary: getOverallSummary(),
  });
}

function getOverallSummary() {
  const allStats = Object.values(targetStats);
  const downCount = allStats.filter((s) => s.status === 'DOWN').length;
  const degradedCount = allStats.filter((s) => s.status === 'DEGRADED').length;
  const upCount = allStats.filter((s) => s.status === 'UP').length;

  let overallStatus = 'UP';
  if (downCount > 0) {
    overallStatus = downCount === allStats.length ? 'DOWN' : 'PARTIAL_OUTAGE';
  } else if (degradedCount > 0) {
    overallStatus = 'DEGRADED';
  }

  const avgLatency =
    allStats.reduce((acc, s) => acc + (s.latency || 0), 0) /
    (allStats.filter((s) => s.latency !== null).length || 1);

  const totalChecks = allStats.reduce((acc, s) => acc + s.totalChecks, 0);
  const totalSuccess = allStats.reduce((acc, s) => acc + s.successfulChecks, 0);
  const overallUptime = totalChecks > 0 ? ((totalSuccess / totalChecks) * 100).toFixed(2) : '100.00';

  return {
    overallStatus,
    downCount,
    degradedCount,
    upCount,
    totalTargets: allStats.length,
    avgLatencyMs: Math.round(avgLatency),
    overallUptimePercent: overallUptime,
    activeIncidentsCount: incidents.filter((i) => i.status === 'ONGOING').length,
    lastCheckTime: new Date().toISOString(),
  };
}

// Schedule prober
let isProbing = false;
async function triggerProbeLoop() {
  if (isProbing) return;
  isProbing = true;
  try {
    await probeAll();
  } catch (err) {
    console.error('Probe batch error:', err);
  } finally {
    isProbing = false;
  }
}

function restartScheduler(intervalMs) {
  if (probeTimer) clearInterval(probeTimer);
  probeIntervalMs = intervalMs;
  probeTimer = setInterval(triggerProbeLoop, probeIntervalMs);
}

// API Routes
app.use(express.json());

// Server-Sent Events Endpoint
app.get('/api/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  sseClients.add(res);

  // Send initial state snapshot
  res.write(
    `event: init\ndata: ${JSON.stringify({
      targets: Object.values(targetStats),
      summary: getOverallSummary(),
      recentLogs: logs.slice(0, 50),
      incidents: incidents.slice(0, 10),
      intervalMs: probeIntervalMs,
    })}\n\n`
  );

  req.on('close', () => {
    sseClients.delete(res);
  });
});

app.get('/api/status', (req, res) => {
  res.json({
    summary: getOverallSummary(),
    targets: Object.values(targetStats),
    incidents,
  });
});

app.get('/api/logs', (req, res) => {
  const { limit = 100, status, targetId, search } = req.query;
  let filtered = logs;

  if (status && status !== 'all') {
    filtered = filtered.filter((l) => l.status.toLowerCase() === status.toLowerCase());
  }
  if (targetId && targetId !== 'all') {
    filtered = filtered.filter((l) => l.targetId === targetId);
  }
  if (search) {
    const s = String(search).toLowerCase();
    filtered = filtered.filter(
      (l) =>
        l.targetName.toLowerCase().includes(s) ||
        l.message.toLowerCase().includes(s) ||
        String(l.statusCode).includes(s)
    );
  }

  res.json({
    total: filtered.length,
    logs: filtered.slice(0, Number(limit)),
  });
});

app.post('/api/probe-now', async (req, res) => {
  await probeAll();
  res.json({ message: 'Probe triggered successfully', summary: getOverallSummary() });
});

app.post('/api/interval', (req, res) => {
  const { intervalMs } = req.body;
  const valid = [100, 500, 1000, 2000, 3000, 5000, 10000, 30000, 60000];
  if (valid.includes(Number(intervalMs))) {
    restartScheduler(Number(intervalMs));
    res.json({ message: 'Interval updated', intervalMs });
  } else {
    res.status(400).json({ error: 'Interval tidak valid. Pilihan: 100, 500, 1000, 2000, 3000, 5000, 10000, 30000, 60000' });
  }
});

app.post('/api/clear-logs', (req, res) => {
  logs.length = 0;
  res.json({ message: 'Log berhasil dikosongkan' });
});

// Embedded Dashboard HTML UI
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`<!DOCTYPE html>
<html lang="id" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SITAPAK Sidoarjo - Live Down Detector & VPS Uptime Monitor</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: '#038D66',
            surfaceDark: '#0D1311',
            cardDark: '#141D1A',
            borderDark: '#21302A',
          }
        }
      }
    }
  </script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #0D1311; }
    ::-webkit-scrollbar-thumb { background: #263831; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #375348; }
  </style>
</head>
<body class="bg-[#090E0C] text-slate-100 min-h-screen flex flex-col">

  <!-- Top Notification Banner (Live Alert) -->
  <div id="topBanner" class="hidden py-2.5 px-4 text-center text-xs font-bold transition-all"></div>

  <!-- Header -->
  <header class="border-b border-borderDark bg-[#0D1512]/80 backdrop-blur sticky top-0 z-30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <svg class="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-extrabold text-base sm:text-lg tracking-tight">SITAPAK Down Detector</h1>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">VPS 178.83.188.173</span>
          </div>
          <p class="text-xs text-slate-400">Pemantau Real-Time Infrastruktur & Layanan Publik Sidoarjo</p>
        </div>
      </div>

      <!-- Action Controls -->
      <div class="flex items-center gap-2.5">
        <div class="flex items-center gap-1.5 bg-[#141D1A] border border-borderDark px-2.5 py-1.5 rounded-lg text-xs">
          <span class="text-slate-400">Interval:</span>
          <select id="intervalSelect" class="bg-transparent font-semibold text-emerald-400 outline-none cursor-pointer">
            <option value="100" class="bg-[#141D1A] text-slate-100">100 ms (Real-time)</option>
            <option value="500" class="bg-[#141D1A] text-slate-100">500 ms</option>
            <option value="1000" class="bg-[#141D1A] text-slate-100">1 detik</option>
            <option value="2000" class="bg-[#141D1A] text-slate-100">2 detik</option>
            <option value="3000" class="bg-[#141D1A] text-slate-100">3 detik</option>
            <option value="5000" selected class="bg-[#141D1A] text-slate-100">5 detik</option>
            <option value="10000" class="bg-[#141D1A] text-slate-100">10 detik</option>
            <option value="30000" class="bg-[#141D1A] text-slate-100">30 detik</option>
          </select>
        </div>

        <button id="btnProbeNow" class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          <span>Ping Sekarang</span>
        </button>

        <button id="btnToggleSound" title="Aktifkan Alert Suara jika Server Down" class="p-2 bg-[#141D1A] hover:bg-slate-800 border border-borderDark rounded-lg text-slate-400 hover:text-slate-200 transition-colors cursor-pointer">
          <span id="soundIcon">🔇</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 flex flex-col gap-6 w-full">

    <!-- Overall Status Big Banner -->
    <div id="statusBanner" class="p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-emerald-950/20 border-emerald-500/30">
      <div class="flex items-center gap-4">
        <div id="statusPulseDot" class="w-4 h-4 rounded-full bg-emerald-500 ring-8 ring-emerald-500/20 animate-pulse"></div>
        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-emerald-400" id="statusSubLabel">Status Sistem Real-Time</div>
          <h2 class="text-xl sm:text-2xl font-black text-white tracking-tight" id="statusMainLabel">SEMUA SISTEM BEROPERASI NORMAL</h2>
          <p class="text-xs text-slate-400 mt-0.5" id="statusSubText">Seluruh endpoint web dan gateway API merespons dengan cepat.</p>
        </div>
      </div>
      <div class="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end border-t sm:border-t-0 border-emerald-500/20 pt-3 sm:pt-0">
        <div class="text-right">
          <div class="text-[11px] text-slate-400">Pembaruan Terakhir</div>
          <div class="font-mono text-xs text-slate-200 font-semibold" id="lastUpdatedClock">--:--:--</div>
        </div>
        <div class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
      </div>
    </div>

    <!-- Metrics 4-Grid -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-cardDark border border-borderDark p-4 rounded-xl">
        <div class="text-slate-400 text-xs font-medium flex items-center justify-between">
          <span>Uptime Total</span>
          <span class="text-emerald-400 text-[10px] font-mono">24 JAM</span>
        </div>
        <div class="text-2xl font-black text-white mt-1.5 font-mono" id="metricUptime">100.0%</div>
        <div class="text-[11px] text-slate-500 mt-1">Keandalan jaringan VPS</div>
      </div>

      <div class="bg-cardDark border border-borderDark p-4 rounded-xl">
        <div class="text-slate-400 text-xs font-medium flex items-center justify-between">
          <span>Rata-Rata Latensi</span>
          <span class="text-cyan-400 text-[10px] font-mono">MS</span>
        </div>
        <div class="text-2xl font-black text-white mt-1.5 font-mono" id="metricLatency">-- ms</div>
        <div class="text-[11px] text-slate-500 mt-1">Waktu tempuh respons</div>
      </div>

      <div class="bg-cardDark border border-borderDark p-4 rounded-xl">
        <div class="text-slate-400 text-xs font-medium flex items-center justify-between">
          <span>Total Probing</span>
          <span class="text-amber-400 text-[10px] font-mono">REQUEST</span>
        </div>
        <div class="text-2xl font-black text-white mt-1.5 font-mono" id="metricTotalChecks">0</div>
        <div class="text-[11px] text-slate-500 mt-1">Pemeriksaan otomatis</div>
      </div>

      <div class="bg-cardDark border border-borderDark p-4 rounded-xl">
        <div class="text-slate-400 text-xs font-medium flex items-center justify-between">
          <span>Insiden Down</span>
          <span class="text-rose-400 text-[10px] font-mono">EVENTS</span>
        </div>
        <div class="text-2xl font-black text-white mt-1.5 font-mono" id="metricIncidents">0</div>
        <div class="text-[11px] text-slate-500 mt-1">Insiden kegagalan terdeteksi</div>
      </div>
    </div>

    <!-- Monitored Targets Cards -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-bold uppercase tracking-wider text-slate-300">Daftar Endpoint yang Dipantau (Targets)</h3>
        <span class="text-xs text-slate-400" id="targetCountBadge">4 Endpoints Aktif</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="targetCardsContainer">
        <!-- Target cards will be rendered dynamically -->
      </div>
    </div>

    <!-- Live Event Logs Console -->
    <div class="bg-cardDark border border-borderDark rounded-2xl p-5 flex flex-col gap-4">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-borderDark pb-4">
        <div>
          <div class="flex items-center gap-2">
            <h3 class="font-bold text-sm text-slate-200">Live Probe Event Stream</h3>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              CONNECTED
            </span>
          </div>
          <p class="text-xs text-slate-400">Aliran log waktu nyata setiap kali pemeriksaan jaringan selesai dieksekusi.</p>
        </div>

        <!-- Filter tabs & actions -->
        <div class="flex flex-wrap items-center gap-2">
          <div class="flex bg-[#0D1311] border border-borderDark rounded-lg p-0.5 text-xs">
            <button class="filter-tab active px-2.5 py-1 rounded text-white font-medium bg-emerald-600" data-filter="all">Semua</button>
            <button class="filter-tab px-2.5 py-1 rounded text-slate-400 hover:text-white font-medium" data-filter="down">Down / Error</button>
            <button class="filter-tab px-2.5 py-1 rounded text-slate-400 hover:text-white font-medium" data-filter="up">Success (200)</button>
          </div>

          <button id="btnClearLogs" class="px-3 py-1 bg-[#0D1311] hover:bg-slate-800 border border-borderDark rounded-lg text-xs text-slate-400 hover:text-slate-200 transition-colors">
            Bersihkan
          </button>
          <button id="btnExportLogs" class="px-3 py-1 bg-[#0D1311] hover:bg-slate-800 border border-borderDark rounded-lg text-xs text-slate-400 hover:text-slate-200 transition-colors">
            Unduh CSV
          </button>
        </div>
      </div>

      <!-- Logs Terminal Box -->
      <div class="relative">
        <div id="logsContainer" class="max-h-[380px] overflow-y-auto space-y-2 pr-1 font-mono text-xs">
          <div class="text-center py-8 text-slate-500 font-sans text-xs">Menunggu data probe pertama...</div>
        </div>
      </div>
    </div>

  </main>

  <!-- Footer -->
  <footer class="border-t border-borderDark py-4 text-center text-xs text-slate-500 bg-[#090E0C]">
    SITAPAK Down Detector &bull; Berjalan Lokal pada Port ${PORT} &bull; Menghubungkan VPS Sidoarjo <span class="text-slate-400 font-mono">178.83.188.173</span>
  </footer>

  <!-- Audio Alert -->
  <audio id="alertAudio" preload="auto">
    <source src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" type="audio/mpeg">
  </audio>

  <!-- Client-side script -->
  <script>
    let soundEnabled = false;
    let autoScroll = true;
    let currentFilter = 'all';
    let targetsData = {};
    let logsList = [];

    const audio = document.getElementById('alertAudio');
    const soundBtn = document.getElementById('btnToggleSound');
    const soundIcon = document.getElementById('soundIcon');

    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundIcon.textContent = soundEnabled ? '🔔' : '🔇';
      soundBtn.classList.toggle('bg-emerald-500/20', soundEnabled);
      soundBtn.classList.toggle('border-emerald-500/40', soundEnabled);
      if (soundEnabled) {
        audio.play().catch(() => {});
      }
    });

    // Handle Manual Probe Now
    const btnProbe = document.getElementById('btnProbeNow');
    btnProbe.addEventListener('click', async () => {
      btnProbe.disabled = true;
      btnProbe.classList.add('opacity-50');
      try {
        await fetch('/api/probe-now', { method: 'POST' });
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => {
          btnProbe.disabled = false;
          btnProbe.classList.remove('opacity-50');
        }, 1000);
      }
    });

    // Handle Interval Change
    const intervalSelect = document.getElementById('intervalSelect');
    intervalSelect.addEventListener('change', async (e) => {
      await fetch('/api/interval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intervalMs: Number(e.target.value) }),
      });
    });

    // Handle Clear Logs
    document.getElementById('btnClearLogs').addEventListener('click', async () => {
      await fetch('/api/clear-logs', { method: 'POST' });
      logsList = [];
      renderLogs();
    });

    // Handle Export CSV
    document.getElementById('btnExportLogs').addEventListener('click', () => {
      if (!logsList.length) return alert('Belum ada log untuk diunduh');
      const csvRows = [
        ['ID', 'Timestamp', 'Status', 'Target', 'Status Code', 'Latency (ms)', 'Message'].join(','),
        ...logsList.map(l => [
          l.id,
          \`"\${l.timestamp}"\`,
          l.status,
          \`"\${l.targetName}"\`,
          l.statusCode,
          l.responseTime,
          \`"\${l.message.replace(/"/g, '""')}"\`
        ].join(','))
      ];
      const blob = new Blob([csvRows.join('\\n')], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = \`sitapak-monitor-logs-\${Date.now()}.csv\`;
      a.click();
    });

    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-tab').forEach(t => {
          t.classList.remove('active', 'bg-emerald-600', 'text-white');
          t.classList.add('text-slate-400');
        });
        e.target.classList.add('active', 'bg-emerald-600', 'text-white');
        e.target.classList.remove('text-slate-400');
        currentFilter = e.target.dataset.filter;
        renderLogs();
      });
    });

    // Render Targets
    function renderTargets(targets) {
      const container = document.getElementById('targetCardsContainer');
      container.innerHTML = targets.map(t => {
        const isUp = t.status === 'UP';
        const isDegraded = t.status === 'DEGRADED';
        const isDown = t.status === 'DOWN';

        const statusBadgeClass = isUp
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
          : isDegraded
          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
          : isDown
          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
          : 'bg-slate-500/10 text-slate-400 border-slate-500/30';

        const statusLabel = isUp ? 'ONLINE' : isDegraded ? 'DEGRADED' : isDown ? 'DOWN' : 'CHECKING';

        // Sparkline bars (last 20 latencies)
        const historyBars = (t.history || []).slice(-20).map(h => {
          const heightPercent = Math.min(100, Math.max(15, (h.latency / 500) * 100));
          const colorClass = h.status === 'UP' ? 'bg-emerald-500' : h.status === 'DEGRADED' ? 'bg-amber-400' : 'bg-rose-500';
          return \`<div class="w-1.5 rounded-xs \${colorClass} transition-all" style="height: \${heightPercent}%" title="\${h.latency}ms (\${h.status})"></div>\`;
        }).join('');

        return \`
          <div class="bg-cardDark border \${isDown ? 'border-rose-500/50 ring-1 ring-rose-500/30' : 'border-borderDark'} p-4 rounded-xl flex flex-col justify-between gap-3 transition-all">
            <div>
              <div class="flex items-start justify-between gap-2">
                <div>
                  <h4 class="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                    \${t.name}
                  </h4>
                  <a href="\${t.url}" target="_blank" class="text-slate-400 hover:text-emerald-400 text-xs font-mono break-all line-clamp-1 underline decoration-slate-600 mt-0.5">
                    \${t.url}
                  </a>
                </div>
                <span class="px-2.5 py-1 rounded text-[11px] font-mono font-bold border \${statusBadgeClass} shrink-0">
                  \${statusLabel}
                </span>
              </div>

              \${t.lastError ? \`<div class="mt-2 p-2 rounded bg-rose-950/40 border border-rose-800/40 text-[11px] text-rose-300 font-mono">\${t.lastError}</div>\` : ''}
            </div>

            <!-- Card Bottom: Latency & Sparkline -->
            <div class="pt-3 border-t border-borderDark/60 flex items-center justify-between gap-3 text-xs">
              <div class="flex items-center gap-3">
                <div>
                  <span class="text-slate-500 text-[10px] block">LATENSI</span>
                  <span class="font-mono font-bold \${t.latency > 1000 ? 'text-amber-400' : 'text-slate-200'}">\${t.latency !== null ? t.latency + ' ms' : '--'}</span>
                </div>
                <div>
                  <span class="text-slate-500 text-[10px] block">HTTP STATUS</span>
                  <span class="font-mono font-bold text-slate-300">\${t.statusCode || '--'}</span>
                </div>
                <div>
                  <span class="text-slate-500 text-[10px] block">UPTIME</span>
                  <span class="font-mono font-bold text-emerald-400">\${t.uptimePercent}%</span>
                </div>
              </div>

              <div class="h-6 flex items-end gap-1 px-1 bg-[#090E0C] rounded p-1 border border-borderDark/50">
                \${historyBars || '<span class="text-[9px] text-slate-600">no data</span>'}
              </div>
            </div>
          </div>
        \`;
      }).join('');
    }

    // Render Logs Console
    function renderLogs() {
      const container = document.getElementById('logsContainer');
      let filtered = logsList;
      if (currentFilter === 'down') {
        filtered = logsList.filter(l => l.status === 'DOWN' || l.status === 'DEGRADED');
      } else if (currentFilter === 'up') {
        filtered = logsList.filter(l => l.status === 'UP');
      }

      if (!filtered.length) {
        container.innerHTML = '<div class="text-center py-8 text-slate-500 font-sans text-xs">Tidak ada log yang sesuai filter.</div>';
        return;
      }

      container.innerHTML = filtered.map(log => {
        const isUp = log.status === 'UP';
        const isDown = log.status === 'DOWN';

        const badgeClass = isUp
          ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
          : isDown
          ? 'text-rose-400 bg-rose-500/10 border-rose-500/30'
          : 'text-amber-400 bg-amber-500/10 border-amber-500/30';

        return \`
          <div class="p-2.5 rounded-lg bg-[#0E1613] border border-borderDark/60 flex flex-wrap items-center justify-between gap-2 hover:bg-[#121C18] transition-colors">
            <div class="flex items-center gap-2.5 flex-1 min-w-[280px]">
              <span class="text-slate-500 text-[11px] shrink-0">\${log.formattedTime}</span>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold border \${badgeClass} shrink-0">\${log.status}</span>
              <span class="text-slate-300 font-semibold text-xs truncate max-w-[200px] sm:max-w-none">\${log.targetName}</span>
              <span class="text-slate-500 text-[11px] hidden sm:inline">\${log.message}</span>
            </div>

            <div class="flex items-center gap-3 text-right shrink-0">
              <span class="text-slate-400 text-[11px] font-mono">\${log.statusCode || 'ERR'}</span>
              <span class="font-mono text-xs font-bold \${log.responseTime > 1000 ? 'text-amber-400' : 'text-slate-200'}">\${log.responseTime}ms</span>
            </div>
          </div>
        \`;
      }).join('');
    }

    // Update Summary Header Banner
    function updateSummary(summary) {
      const banner = document.getElementById('statusBanner');
      const pulseDot = document.getElementById('statusPulseDot');
      const mainLabel = document.getElementById('statusMainLabel');
      const subLabel = document.getElementById('statusSubLabel');
      const subText = document.getElementById('statusSubText');

      document.getElementById('metricUptime').textContent = summary.overallUptimePercent + '%';
      document.getElementById('metricLatency').textContent = summary.avgLatencyMs + ' ms';
      document.getElementById('metricIncidents').textContent = summary.activeIncidentsCount;
      document.getElementById('lastUpdatedClock').textContent = new Date().toLocaleTimeString('id-ID', { hour12: false });

      if (summary.overallStatus === 'DOWN') {
        banner.className = 'p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-rose-950/40 border-rose-500/50 ring-2 ring-rose-500/30';
        pulseDot.className = 'w-4 h-4 rounded-full bg-rose-500 ring-8 ring-rose-500/30 animate-ping';
        mainLabel.textContent = 'PERINGATAN: SERVER VPS MENGALAMI GANGGUAN / DOWN!';
        subLabel.textContent = 'STATUS KRITIS';
        subLabel.className = 'text-xs font-semibold uppercase tracking-wider text-rose-400';
        subText.textContent = \`Ditemukan \${summary.downCount} endpoint tidak dapat dihubungi. Periksa log atau restart service di VPS.\`;

        if (soundEnabled) {
          audio.play().catch(() => {});
        }
      } else if (summary.overallStatus === 'PARTIAL_OUTAGE' || summary.overallStatus === 'DEGRADED') {
        banner.className = 'p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-amber-950/30 border-amber-500/40';
        pulseDot.className = 'w-4 h-4 rounded-full bg-amber-500 ring-8 ring-amber-500/20 animate-pulse';
        mainLabel.textContent = 'PERFORMA TERDEGRADASI / SEBAGIAN ENDPOINT LAMBAT';
        subLabel.textContent = 'PERHATIAN';
        subLabel.className = 'text-xs font-semibold uppercase tracking-wider text-amber-400';
        subText.textContent = 'Layanan tetap online namun terdapat waktu respons tinggi atau sebagian rute terhambat.';
      } else {
        banner.className = 'p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-emerald-950/20 border-emerald-500/30';
        pulseDot.className = 'w-4 h-4 rounded-full bg-emerald-500 ring-8 ring-emerald-500/20 animate-pulse';
        mainLabel.textContent = 'SEMUA SISTEM BEROPERASI NORMAL';
        subLabel.textContent = 'STATUS REAL-TIME';
        subLabel.className = 'text-xs font-semibold uppercase tracking-wider text-emerald-400';
        subText.textContent = 'Seluruh endpoint web dan gateway API merespons dengan cepat & andal.';
      }
    }

    // Connect to Server-Sent Events (SSE)
    function connectSSE() {
      const evtSource = new EventSource('/api/stream');

      evtSource.addEventListener('init', (e) => {
        const data = JSON.parse(e.data);
        renderTargets(data.targets);
        updateSummary(data.summary);
        logsList = data.recentLogs || [];
        renderLogs();
        document.getElementById('metricTotalChecks').textContent = data.summary.totalTargets ? (data.summary.totalTargets * 2) : 0;
      });

      evtSource.addEventListener('probe_batch', (e) => {
        const data = JSON.parse(e.data);
        renderTargets(data.targets);
        updateSummary(data.summary);

        // Prepend new results to logsList
        data.results.forEach(r => {
          logsList.unshift(r);
        });
        if (logsList.length > 500) logsList.length = 500;

        renderLogs();

        const totalChecks = data.targets.reduce((acc, t) => acc + t.totalChecks, 0);
        document.getElementById('metricTotalChecks').textContent = totalChecks;
      });

      evtSource.addEventListener('incident_new', (e) => {
        const incident = JSON.parse(e.data);
        console.warn('INCIDENT STARTED:', incident);
        if (soundEnabled) audio.play().catch(() => {});
      });

      evtSource.onerror = () => {
        console.log('SSE connection lost, reconnecting...');
      };
    }

    // Start
    connectSSE();
  </script>
</body>
</html>`);
});

// Start listening
server.listen(PORT, '0.0.0.0', () => {
  console.log(`==================================================================`);
  console.log(`[SITAPAK DOWN DETECTOR] Server aktif di: http://localhost:${PORT}`);
  console.log(`Memantau VPS Sidoarjo (178.83.188.173) setiap ${probeIntervalMs / 1000} detik`);
  console.log(`==================================================================`);

  // Initial immediate probe
  probeAll();

  // Start periodic probing
  restartScheduler(probeIntervalMs);
});
