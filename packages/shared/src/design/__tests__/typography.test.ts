import { describe, expect, it } from 'vitest';
import { typography } from '../tokens.js';

describe('typography', () => {
  it('exports a typography object', () => {
    expect(typography).toBeDefined();
    expect(typeof typography).toBe('object');
  });

  it('defines a heading variant', () => {
    expect(typography.heading).toBeDefined();
  });

  it('defines a body variant', () => {
    expect(typography.body).toBeDefined();
  });

  it('defines a caption variant', () => {
    expect(typography.caption).toBeDefined();
  });

  it('each variant has fontSize, lineHeight, fontWeight, fontFamily', () => {
    const requiredKeys = ['fontSize', 'lineHeight', 'fontWeight', 'fontFamily'] as const;
    const variants = ['heading', 'body', 'caption'] as const;

    for (const variant of variants) {
      for (const key of requiredKeys) {
        expect(
          typography[variant][key],
          `typography.${variant}.${key} should be defined`,
        ).toBeDefined();
      }
    }
  });

  it('heading has larger fontSize than body', () => {
    const headingSize = parseFloat(typography.heading.fontSize);
    const bodySize = parseFloat(typography.body.fontSize);
    expect(headingSize).toBeGreaterThan(bodySize);
  });

  it('body has larger fontSize than caption', () => {
    const bodySize = parseFloat(typography.body.fontSize);
    const captionSize = parseFloat(typography.caption.fontSize);
    expect(bodySize).toBeGreaterThan(captionSize);
  });

  it('heading lineHeight is a valid ratio (number between 1 and 2)', () => {
    const ratio = parseFloat(typography.heading.lineHeight);
    expect(ratio).toBeGreaterThanOrEqual(1);
    expect(ratio).toBeLessThanOrEqual(2);
  });

  it('body lineHeight is a valid ratio (number between 1 and 2)', () => {
    const ratio = parseFloat(typography.body.lineHeight);
    expect(ratio).toBeGreaterThanOrEqual(1);
    expect(ratio).toBeLessThanOrEqual(2);
  });

  it('caption lineHeight is a valid ratio (number between 1 and 2)', () => {
    const ratio = parseFloat(typography.caption.lineHeight);
    expect(ratio).toBeGreaterThanOrEqual(1);
    expect(ratio).toBeLessThanOrEqual(2);
  });

  it('line-height ratios are consistent — heading tighter than body', () => {
    const headingRatio = parseFloat(typography.heading.lineHeight);
    const bodyRatio = parseFloat(typography.body.lineHeight);
    // Headings traditionally use tighter line-height than body text
    expect(headingRatio).toBeLessThan(bodyRatio);
  });

  it('heading has bold fontWeight (600 or higher)', () => {
    const weight = parseInt(typography.heading.fontWeight, 10);
    expect(weight).toBeGreaterThanOrEqual(600);
  });

  it('all fontFamily values reference CSS variable', () => {
    const variants = ['heading', 'body', 'caption'] as const;
    for (const variant of variants) {
      expect(typography[variant].fontFamily).toMatch(/^var\(--[\w-]+\)$/);
    }
  });
});
