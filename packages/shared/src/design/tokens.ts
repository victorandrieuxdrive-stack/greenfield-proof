/**
 * Lux Design Tokens — TypeScript source of truth.
 *
 * Colors reference CSS custom properties defined in apps/web/src/styles/globals.css.
 * Spacing follows a base-4px scale.
 * Typography defines heading, body, and caption variants with consistent line-height ratios.
 */

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

export const colors = {
  /** Primary interactive color */
  primary: 'hsl(var(--primary))',
  primaryForeground: 'hsl(var(--primary-foreground))',

  /** Destructive / error state */
  destructive: 'hsl(var(--destructive))',
  destructiveForeground: 'hsl(var(--destructive-foreground))',

  /** Muted / subdued surfaces */
  muted: 'hsl(var(--muted))',
  mutedForeground: 'hsl(var(--muted-foreground))',

  /** Page background and default text */
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',

  /** Borders and focus rings */
  border: 'hsl(var(--border))',
  ring: 'hsl(var(--ring))',

  /** Accent highlight */
  accent: 'hsl(var(--accent))',
  accentForeground: 'hsl(var(--accent-foreground))',
} as const;

export type ColorToken = keyof typeof colors;
export type ColorValue = (typeof colors)[ColorToken];

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------

/** Base-4px spacing scale. Keys map to Tailwind's default spacing scale. */
export const spacing = {
  0: '0px',
  px: '1px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  14: '56px',
  16: '64px',
} as const;

export type SpacingToken = keyof typeof spacing;
export type SpacingValue = (typeof spacing)[SpacingToken];

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export interface TypographyVariant {
  /** CSS font-size value */
  readonly fontSize: string;
  /** Unitless line-height ratio for consistent vertical rhythm */
  readonly lineHeight: string;
  /** CSS font-weight value */
  readonly fontWeight: string;
  /** CSS font-family referencing a CSS custom property */
  readonly fontFamily: string;
}

/**
 * Typography scale.
 *
 * Line-height ratios follow established typographic conventions:
 * - heading: 1.25 (tight — large text needs less leading)
 * - body: 1.5   (comfortable reading rhythm)
 * - caption: 1.4 (slightly tighter than body for secondary info)
 */
export const typography = {
  heading: {
    fontSize: '2rem',
    lineHeight: '1.25',
    fontWeight: '700',
    fontFamily: 'var(--font-sans)',
  },
  body: {
    fontSize: '1rem',
    lineHeight: '1.5',
    fontWeight: '400',
    fontFamily: 'var(--font-sans)',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: '1.4',
    fontWeight: '400',
    fontFamily: 'var(--font-sans)',
  },
} as const satisfies Record<string, TypographyVariant>;

export type TypographyScale = typeof typography;
export type TypographyVariantKey = keyof TypographyScale;
