import { describe, expect, it } from 'vitest';
import { items } from '@orchestrator/shared';

describe('Home page — renders items', () => {
  it('renders one DOM element per item returned by the items API', async () => {
    const { default: Page } = await import('../page.js');
    const res = await Page();
    const html = await res.text();
    // Each item is wrapped in an <li> element — count must match items array length
    const matches = html.match(/<li\b/g) ?? [];
    expect(matches.length).toBe(items.length);
  });
});
