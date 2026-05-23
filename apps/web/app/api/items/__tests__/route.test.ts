import { describe, expect, it } from 'vitest';
import { GET } from '../route.ts';

describe('GET /api/items', () => {
  it('returns 200', async () => {
    const res = await GET(new Request('http://localhost/api/items'));
    expect(res.status).toBe(200);
  });

  it('returns array', async () => {
    const res = await GET(new Request('http://localhost/api/items'));
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
  });

  it('each item has id and name', async () => {
    const res = await GET(new Request('http://localhost/api/items'));
    const body = (await res.json()) as unknown[];
    expect(body.length).toBeGreaterThan(0);
    for (const item of body) {
      expect(typeof (item as { id: unknown }).id).toBe('string');
      expect(typeof (item as { name: unknown }).name).toBe('string');
    }
  });
});
