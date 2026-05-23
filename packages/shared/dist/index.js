// src/design/tokens.ts
var colors = {
  /** Primary interactive color */
  primary: "hsl(var(--primary))",
  primaryForeground: "hsl(var(--primary-foreground))",
  /** Destructive / error state */
  destructive: "hsl(var(--destructive))",
  destructiveForeground: "hsl(var(--destructive-foreground))",
  /** Muted / subdued surfaces */
  muted: "hsl(var(--muted))",
  mutedForeground: "hsl(var(--muted-foreground))",
  /** Page background and default text */
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  /** Borders and focus rings */
  border: "hsl(var(--border))",
  ring: "hsl(var(--ring))",
  /** Accent highlight */
  accent: "hsl(var(--accent))",
  accentForeground: "hsl(var(--accent-foreground))"
};
var spacing = {
  0: "0px",
  px: "1px",
  0.5: "2px",
  1: "4px",
  1.5: "6px",
  2: "8px",
  2.5: "10px",
  3: "12px",
  3.5: "14px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  9: "36px",
  10: "40px",
  11: "44px",
  12: "48px",
  14: "56px",
  16: "64px"
};
var typography = {
  heading: {
    fontSize: "2rem",
    lineHeight: "1.25",
    fontWeight: "700",
    fontFamily: "var(--font-sans)"
  },
  body: {
    fontSize: "1rem",
    lineHeight: "1.5",
    fontWeight: "400",
    fontFamily: "var(--font-sans)"
  },
  caption: {
    fontSize: "0.75rem",
    lineHeight: "1.4",
    fontWeight: "400",
    fontFamily: "var(--font-sans)"
  }
};

// src/data/items.ts
var items = Object.freeze([
  { id: "1", name: "Item One" },
  { id: "2", name: "Item Two" },
  { id: "3", name: "Item Three" }
]);
export {
  colors,
  items,
  spacing,
  typography
};
//# sourceMappingURL=index.js.map