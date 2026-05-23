/**
 * In-memory items data module.
 *
 * Exports a typed Item interface and a frozen read-only items array
 * that serves as the canonical data source for API routes and tests.
 */

export interface Item {
  id: string;
  name: string;
}

/**
 * Sample items array.
 * Frozen at runtime to prevent accidental mutation;
 * typed as ReadonlyArray<Item> to surface mutations at compile time.
 */
export const items: ReadonlyArray<Item> = Object.freeze<Item[]>([
  { id: '1', name: 'Item One' },
  { id: '2', name: 'Item Two' },
  { id: '3', name: 'Item Three' },
]);
