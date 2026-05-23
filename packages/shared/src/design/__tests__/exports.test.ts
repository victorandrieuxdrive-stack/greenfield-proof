import { describe, expect, it } from 'vitest';

// Verify tokens are re-exported from the barrel index
import * as barrelExports from '../../index.js';

describe('barrel index exports', () => {
  it('exports colors from the barrel index', () => {
    expect(barrelExports).toHaveProperty('colors');
    expect(typeof barrelExports.colors).toBe('object');
  });

  it('exports spacing from the barrel index', () => {
    expect(barrelExports).toHaveProperty('spacing');
    expect(typeof barrelExports.spacing).toBe('object');
  });

  it('exports typography from the barrel index', () => {
    expect(barrelExports).toHaveProperty('typography');
    expect(typeof barrelExports.typography).toBe('object');
  });

  it('barrel colors match direct import', async () => {
    const { colors } = await import('../tokens.js');
    expect(barrelExports.colors).toStrictEqual(colors);
  });

  it('barrel spacing matches direct import', async () => {
    const { spacing } = await import('../tokens.js');
    expect(barrelExports.spacing).toStrictEqual(spacing);
  });

  it('barrel typography matches direct import', async () => {
    const { typography } = await import('../tokens.js');
    expect(barrelExports.typography).toStrictEqual(typography);
  });
});
