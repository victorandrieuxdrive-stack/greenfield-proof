import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

describe('GET /api/items — error sanitization', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not leak raw error message to the client when items module throws', async () => {
    vi.doMock('@orchestrator/shared', () => {
      throw new Error('SECRET_DB_CREDENTIAL leaked');
    });
    const { GET } = await import('../route.js');
    const res = await GET(new Request('http://localhost/api/items'));
    const text = await res.text();
    expect(text).not.toContain('SECRET_DB_CREDENTIAL');
    expect(res.status).toBe(500);
  });
});
