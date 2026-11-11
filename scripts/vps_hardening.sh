#!/usr/bin/env bash
# ==============================================================================
# SCRIPT OTOMASI PENGUATAN SERVER (LINUX & WEBUZO VPS HARDENING)
# Target: SITAPAK Sidoarjo Deployment Host
# Standar: CIS Benchmark & BSSN Security Guide
# ==============================================================================

set -euo pipefail

echo "=== MEMULAI HARDENING SERVER SITAPAK SIDOARJO ==="

# 1. Update paket sistem operasi
echo "[1/6] Memperbarui repositori dan paket OS..."
sudo apt-get update && sudo apt-get upgrade -y

# 2. Pasang firewall UFW dan Fail2ban
echo "[2/6] Memasang UFW Firewall & Fail2ban..."
sudo apt-get install -y ufw fail2ban

# 3. Konfigurasi Firewall Minimalis
echo "[3/6] Mengonfigurasi aturan firewall UFW..."
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 80/tcp comment 'HTTP (Cloudflare)'
sudo ufw allow 443/tcp comment 'HTTPS (Cloudflare)'
sudo ufw allow 22/tcp comment 'SSH Administrative'

# Aktifkan Firewall
echo "y" | sudo ufw enable
sudo ufw status verbose

# 4. Pengamanan Hak Akses Berkas Database SQLite
echo "[4/6] Mengamankan hak akses direktori database/..."
chmod 700 /home/jukijek/project/lapeace/database || true
chmod 600 /home/jukijek/project/lapeace/database/sitapak.db || true

# 5. Blokir Port Webuzo & Database dari Internet Terbuka
echo "[5/6] Memastikan port database internal tidak terekspos ke 0.0.0.0..."
sudo ufw deny 3306/tcp comment 'Block MySQL from Public' || true
sudo ufw deny 5432/tcp comment 'Block PostgreSQL from Public' || true
sudo ufw deny 2002:2005/tcp comment 'Block Webuzo Internal Ports' || true

# 6. Pengamanan File .env
echo "[6/6] Menyetel izin akses file lingkungan .env..."
if [ -f "/home/jukijek/project/lapeace/.env" ]; then
  chmod 600 /home/jukijek/project/lapeace/.env
fi

echo "=== HARDENING SERVER BERHASIL DISELESAIKAN ==="
