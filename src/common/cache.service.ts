import { Injectable, Logger } from '@nestjs/common';

export interface CacheEntry<T> {
  value: T;
  expiresAt: number;
  hits: number;
}

export interface CacheStats {
  totalKeys: number;
  hits: number;
  misses: number;
  hitRatio: string;
  uptimeSeconds: number;
}

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);
  private readonly memoryStore = new Map<string, CacheEntry<any>>();
  private hitCount = 0;
  private missCount = 0;
  private readonly startTime = Date.now();

  constructor() {
    this.logger.log('SITAPAK In-Memory Cache Service diinisialisasi (High-Performance TTL Store).');
    
    // Garbage collector periodik setiap 60 detik untuk membersihkan kunci expired
    setInterval(() => {
      this.purgeExpired();
    }, 60000).unref();
  }

  get<T>(key: string): T | null {
    const entry = this.memoryStore.get(key);
    if (!entry) {
      this.missCount++;
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.memoryStore.delete(key);
      this.missCount++;
      return null;
    }

    entry.hits++;
    this.hitCount++;
    return entry.value as T;
  }

  set<T>(key: string, value: T, ttlSeconds: number): void {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.memoryStore.set(key, {
      value,
      expiresAt,
      hits: 0,
    });
  }

  del(key: string): boolean {
    return this.memoryStore.delete(key);
  }

  delPattern(pattern: RegExp | string): number {
    let deleted = 0;
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    for (const key of this.memoryStore.keys()) {
      if (regex.test(key)) {
        this.memoryStore.delete(key);
        deleted++;
      }
    }
    return deleted;
  }

  flush(): void {
    this.memoryStore.clear();
    this.logger.log('Seluruh entri cache SITAPAK telah dibersihkan.');
  }

  /**
   * Helper eksekusi fungsi dengan otomatisasi cache & header HTTP
   */
  async wrap<T>(
    key: string,
    ttlSeconds: number,
    fetcher: () => Promise<T> | T,
    res?: any,
  ): Promise<T> {
    const cached = this.get<T>(key);
    if (cached !== null && cached !== undefined) {
      if (res && typeof res.setHeader === 'function') {
        res.setHeader('X-Cache-Status', 'HIT');
        res.setHeader('Cache-Control', `public, max-age=${ttlSeconds}, stale-while-revalidate=60`);
      }
      return cached;
    }

    const fresh = await fetcher();
    this.set(key, fresh, ttlSeconds);
    if (res && typeof res.setHeader === 'function') {
      res.setHeader('X-Cache-Status', 'MISS');
      res.setHeader('Cache-Control', `public, max-age=${ttlSeconds}, stale-while-revalidate=60`);
    }
    return fresh;
  }

  getStats(): CacheStats {
    const totalRequests = this.hitCount + this.missCount;
    const ratio = totalRequests > 0 ? ((this.hitCount / totalRequests) * 100).toFixed(2) + '%' : '0.00%';
    return {
      totalKeys: this.memoryStore.size,
      hits: this.hitCount,
      misses: this.missCount,
      hitRatio: ratio,
      uptimeSeconds: Math.floor((Date.now() - this.startTime) / 1000),
    };
  }

  private purgeExpired(): void {
    const now = Date.now();
    let purged = 0;
    for (const [key, entry] of this.memoryStore.entries()) {
      if (now > entry.expiresAt) {
        this.memoryStore.delete(key);
        purged++;
      }
    }
    if (purged > 0) {
      this.logger.debug(`Purged ${purged} expired cache entries.`);
    }
  }
}
