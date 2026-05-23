import { describe, expect, it } from 'vitest';

describe('Home page — status', () => {
  it('GET / returns HTTP 200 when the home page is requested', async () => {
    const { default: Page } = await import('../page.js');
    const res = await Page();
    expect(res.status).toBe(200);
  });
});
