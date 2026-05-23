import { describe, expect, it } from 'vitest';
import { GET } from '../route.js';

describe('GET /api/items — status', () => {
  it('returns HTTP 200', async () => {
    const res = await GET(new Request('http://localhost/api/items'));
    expect(res.status).toBe(200);
  });
});
