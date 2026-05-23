/**
 * @orchestrator/shared — public barrel index.
 *
 * Re-exports all design tokens for consumption by apps/web and apps/daemon.
 */

export {
  colors,
  spacing,
  typography,
} from './design/tokens.js';

export type {
  ColorToken,
  ColorValue,
  SpacingToken,
  SpacingValue,
  TypographyVariant,
  TypographyScale,
  TypographyVariantKey,
} from './design/tokens.js';

export { items } from './data/items.js';
export type { Item } from './data/items.js';
