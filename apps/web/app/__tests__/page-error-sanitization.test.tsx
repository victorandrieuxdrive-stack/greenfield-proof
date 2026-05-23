import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

describe('Home page — error sanitization', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not leak raw error messages or stack traces on API failure', async () => {
    vi.doMock('@orchestrator/shared', () => {
      throw new Error('SECRET_CREDENTIAL leaked');
    });
    const { default: Page } = await import('../page.js');
    const res = await Page();
    const html = await res.text();
    // Raw secret must not appear in the markup
    expect(html).not.toContain('SECRET_CREDENTIAL');
    // Error constructor name must not be forwarded
    expect(html).not.toContain('Error:');
    // No stack trace lines
    expect(html).not.toMatch(/\bat\s+\w/);
  });
});
