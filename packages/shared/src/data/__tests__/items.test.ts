import { describe, expect, it } from 'vitest';
import { items } from '../items.js';
import type { Item } from '../items.js';

describe('items data module', () => {
  it('exports items as an array with at least 3 entries', () => {
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThanOrEqual(3);
  });

  it('items array is frozen — push throws a TypeError at runtime', () => {
    expect(() => {
      (items as Item[]).push({ id: 'x', name: 'y' });
    }).toThrow(TypeError);
  });

  it('every item has a string id and a string name', () => {
    const allValid = items.every(
      (i) => typeof i.id === 'string' && typeof i.name === 'string',
    );
    expect(allValid).toBe(true);
  });

  it('Item shape is structurally correct (id and name fields present)', () => {
    for (const item of items) {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
    }
  });
});
