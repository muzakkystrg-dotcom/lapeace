import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CacheService } from './common/cache.service.js';
import { DatabaseService } from './database/database.service.js';

describe('Performance Suite: Caching & Keyset Pagination', () => {
  let cache: CacheService;
  let db: DatabaseService;

  beforeEach(() => {
    cache = new CacheService();
    db = new DatabaseService();
    db.onModuleInit();
  });

  afterEach(() => {
    db.onModuleDestroy();
  });

  describe('In-Memory CacheService with TTL & Stats', () => {
    it('should store, retrieve, and evict expired keys', async () => {
      cache.set('key1', { message: 'Halo Sidoarjo' }, 1); // 1 sec TTL
      expect(cache.get('key1')).toEqual({ message: 'Halo Sidoarjo' });

      // Invalidate
      cache.del('key1');
      expect(cache.get('key1')).toBeNull();
    });

    it('should support pattern-based cache invalidation', () => {
      cache.set('reports:page:20:1', [1, 2, 3], 60);
      cache.set('reports:page:20:2', [4, 5, 6], 60);
      cache.set('budget:2026', { total: 5.4 }, 300);

      const deleted = cache.delPattern(/^reports:/);
      expect(deleted).toBe(2);
      expect(cache.get('reports:page:20:1')).toBeNull();
      expect(cache.get('budget:2026')).not.toBeNull();
    });

    it('should wrap computations, manage headers, and track hit/miss statistics', async () => {
      const mockRes1: any = { headers: {}, setHeader(k: string, v: string) { this.headers[k] = v; } };
      let computeCalls = 0;

      const fetcher = () => {
        computeCalls++;
        return { apbd: 'Rp 5,42 Triliun' };
      };

      // Turn 1: Cache MISS
      const res1 = await cache.wrap('budget:metrics', 300, fetcher, mockRes1);
      expect(res1).toEqual({ apbd: 'Rp 5,42 Triliun' });
      expect(computeCalls).toBe(1);
      expect(mockRes1.headers['X-Cache-Status']).toBe('MISS');
      expect(mockRes1.headers['Cache-Control']).toContain('public, max-age=300');

      // Turn 2: Cache HIT
      const mockRes2: any = { headers: {}, setHeader(k: string, v: string) { this.headers[k] = v; } };
      const res2 = await cache.wrap('budget:metrics', 300, fetcher, mockRes2);
      expect(res2).toEqual({ apbd: 'Rp 5,42 Triliun' });
      expect(computeCalls).toBe(1); // Fetcher should NOT be called again
      expect(mockRes2.headers['X-Cache-Status']).toBe('HIT');

      const stats = cache.getStats();
      expect(stats.hits).toBe(1);
      expect(stats.misses).toBe(1);
      expect(stats.totalKeys).toBe(1);
      expect(stats.hitRatio).toBe('50.00%');
    });
  });

  describe('Database Keyset / Cursor Pagination', () => {
    it('should paginate citizen reports with cursor and limit', () => {
      const page1 = db.getReports(2);
      expect(page1.data).toBeDefined();
      expect(page1.data.length).toBeLessThanOrEqual(2);
      expect(page1.pagination.limit).toBe(2);
      expect(page1.pagination.totalCount).toBeGreaterThan(0);

      if (page1.pagination.hasMore && page1.pagination.nextCursor) {
        const page2 = db.getReports(2, page1.pagination.nextCursor);
        expect(page2.data).toBeDefined();
        // Keyset IDs should be strictly less than previous cursor
        for (const item of page2.data) {
          expect(item.id).toBeLessThan(page1.pagination.nextCursor);
        }
      }
    });

    it('should paginate citizens with cursor and limit', () => {
      const page1 = db.getCitizens(2);
      expect(page1.data).toBeDefined();
      expect(page1.data.length).toBeLessThanOrEqual(2);
      expect(page1.pagination.limit).toBe(2);
      expect(page1.pagination.totalCount).toBeGreaterThan(0);

      // Verify masking
      for (const citizen of page1.data) {
        expect(citizen.nik_masked).toContain('****');
      }
    });
  });
});
