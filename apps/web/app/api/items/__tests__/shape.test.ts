import { describe, expect, it } from 'vitest';
import { GET } from '../route.js';

describe('GET /api/items — shape', () => {
  it('body is a JSON array where every item has id and name string fields', async () => {
    const res = await GET(new Request('http://localhost/api/items'));
    const body = (await res.json()) as unknown[];
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    for (const item of body) {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(typeof (item as { id: unknown }).id).toBe('string');
      expect(typeof (item as { name: unknown }).name).toBe('string');
    }
  });
});
