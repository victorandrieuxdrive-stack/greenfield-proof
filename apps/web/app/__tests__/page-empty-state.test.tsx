import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

describe('Home page — empty state', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('handles empty state gracefully when no items are returned', async () => {
    vi.doMock('@orchestrator/shared', () => ({ items: [] }));
    const { default: Page } = await import('../page.js');
    const res = await Page();
    // Must not throw, must return 200 with non-empty HTML
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html.length).toBeGreaterThan(0);
  });
});
