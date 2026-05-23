import { describe, expect, it } from 'vitest';
import { GET } from '../route.js';

describe('GET /api/items — content-type', () => {
  it('returns application/json content-type', async () => {
    const res = await GET(new Request('http://localhost/api/items'));
    const ct = res.headers.get('content-type') ?? '';
    expect(ct).toContain('application/json');
  });
});
