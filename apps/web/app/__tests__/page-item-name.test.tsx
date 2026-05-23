import { describe, expect, it } from 'vitest';
import { items } from '@orchestrator/shared';
import Page from '../page.js';

describe('Home page — item names', () => {
  it('each rendered item displays its name field visibly in the markup', async () => {
    const res = await Page();
    const html = await res.text();
    for (const item of items) {
      expect(html).toContain(item.name);
    }
  });
});
