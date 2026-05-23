import { describe, expect, it } from 'vitest';
import { colors, spacing } from '../tokens.js';

describe('colors', () => {
  it('exports a colors object', () => {
    expect(colors).toBeDefined();
    expect(typeof colors).toBe('object');
  });

  it('has primary color referencing CSS variable', () => {
    expect(colors.primary).toBe('hsl(var(--primary))');
  });

  it('has destructive color referencing CSS variable', () => {
    expect(colors.destructive).toBe('hsl(var(--destructive))');
  });

  it('has muted color referencing CSS variable', () => {
    expect(colors.muted).toBe('hsl(var(--muted))');
  });

  it('has background color referencing CSS variable', () => {
    expect(colors.background).toBe('hsl(var(--background))');
  });

  it('has foreground color referencing CSS variable', () => {
    expect(colors.foreground).toBe('hsl(var(--foreground))');
  });

  it('has border color referencing CSS variable', () => {
    expect(colors.border).toBe('hsl(var(--border))');
  });

  it('has ring color referencing CSS variable', () => {
    expect(colors.ring).toBe('hsl(var(--ring))');
  });

  it('has mutedForeground color referencing CSS variable', () => {
    expect(colors.mutedForeground).toBe('hsl(var(--muted-foreground))');
  });

  it('all color values reference CSS variables (no hardcoded hex)', () => {
    for (const [key, value] of Object.entries(colors)) {
      expect(value, `colors.${key} should reference a CSS variable`).toMatch(
        /^hsl\(var\(--[\w-]+\)\)$/,
      );
    }
  });
});

describe('spacing', () => {
  it('exports a spacing object', () => {
    expect(spacing).toBeDefined();
    expect(typeof spacing).toBe('object');
  });

  it('has zero spacing', () => {
    expect(spacing[0]).toBe('0px');
  });

  it('has px spacing (1px)', () => {
    expect(spacing.px).toBe('1px');
  });

  it('has base-4 spacing scale', () => {
    expect(spacing[1]).toBe('4px');
    expect(spacing[2]).toBe('8px');
    expect(spacing[4]).toBe('16px');
    expect(spacing[8]).toBe('32px');
  });

  it('all spacing values are valid CSS length strings', () => {
    for (const [key, value] of Object.entries(spacing)) {
      expect(value, `spacing.${key} should be a valid CSS length`).toMatch(/^\d+(\.\d+)?(px|rem|em)$/);
    }
  });
});
