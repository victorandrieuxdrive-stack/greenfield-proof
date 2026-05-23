/**
 * Lux Design Tokens — TypeScript source of truth.
 *
 * Colors reference CSS custom properties defined in apps/web/src/styles/globals.css.
 * Spacing follows a base-4px scale.
 * Typography defines heading, body, and caption variants with consistent line-height ratios.
 */
declare const colors: {
    /** Primary interactive color */
    readonly primary: "hsl(var(--primary))";
    readonly primaryForeground: "hsl(var(--primary-foreground))";
    /** Destructive / error state */
    readonly destructive: "hsl(var(--destructive))";
    readonly destructiveForeground: "hsl(var(--destructive-foreground))";
    /** Muted / subdued surfaces */
    readonly muted: "hsl(var(--muted))";
    readonly mutedForeground: "hsl(var(--muted-foreground))";
    /** Page background and default text */
    readonly background: "hsl(var(--background))";
    readonly foreground: "hsl(var(--foreground))";
    /** Borders and focus rings */
    readonly border: "hsl(var(--border))";
    readonly ring: "hsl(var(--ring))";
    /** Accent highlight */
    readonly accent: "hsl(var(--accent))";
    readonly accentForeground: "hsl(var(--accent-foreground))";
};
type ColorToken = keyof typeof colors;
type ColorValue = (typeof colors)[ColorToken];
/** Base-4px spacing scale. Keys map to Tailwind's default spacing scale. */
declare const spacing: {
    readonly 0: "0px";
    readonly px: "1px";
    readonly 0.5: "2px";
    readonly 1: "4px";
    readonly 1.5: "6px";
    readonly 2: "8px";
    readonly 2.5: "10px";
    readonly 3: "12px";
    readonly 3.5: "14px";
    readonly 4: "16px";
    readonly 5: "20px";
    readonly 6: "24px";
    readonly 7: "28px";
    readonly 8: "32px";
    readonly 9: "36px";
    readonly 10: "40px";
    readonly 11: "44px";
    readonly 12: "48px";
    readonly 14: "56px";
    readonly 16: "64px";
};
type SpacingToken = keyof typeof spacing;
type SpacingValue = (typeof spacing)[SpacingToken];
interface TypographyVariant {
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
declare const typography: {
    readonly heading: {
        readonly fontSize: "2rem";
        readonly lineHeight: "1.25";
        readonly fontWeight: "700";
        readonly fontFamily: "var(--font-sans)";
    };
    readonly body: {
        readonly fontSize: "1rem";
        readonly lineHeight: "1.5";
        readonly fontWeight: "400";
        readonly fontFamily: "var(--font-sans)";
    };
    readonly caption: {
        readonly fontSize: "0.75rem";
        readonly lineHeight: "1.4";
        readonly fontWeight: "400";
        readonly fontFamily: "var(--font-sans)";
    };
};
type TypographyScale = typeof typography;
type TypographyVariantKey = keyof TypographyScale;

export { type ColorToken, type ColorValue, type SpacingToken, type SpacingValue, type TypographyScale, type TypographyVariant, type TypographyVariantKey, colors, spacing, typography };
