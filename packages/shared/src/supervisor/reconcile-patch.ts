/**
 * reconcile-patch — Supervisor cron tick reconciler.
 *
 * Called at the TOP of every supervisor cron tick, before any alert
 * evaluation.  Reads /workspace/.chunk-state-patch.json.applied (if
 * present) and upserts each override entry into the caller-supplied
 * in-memory chunk state map.
 *
 * This eliminates stale failure signals for chunks that were
 * superseded by a previous hotfix injection without re-running the
 * full replanner pipeline.
 */

import { existsSync, readFileSync } from 'node:fs';

/** Default path where the orchestrator writes applied state patches. */
const DEFAULT_PATCH_PATH = '/workspace/.chunk-state-patch.json.applied';

/**
 * A minimal representation of a chunk's state held in the supervisor's
 * in-memory map during a cron tick evaluation.
 */
export interface ChunkStateEntry {
  /** Lifecycle status of the chunk (e.g. 'failed', 'superseded', 'done'). */
  status: string;
  /**
   * When true the chunk reached a terminal state that must not be
   * retried by the replanner.
   */
  terminalNonRetryable?: boolean;
  /** ID of the chunk that supersedes this one (when status = 'superseded'). */
  supersededBy?: string;
  /** Human-readable rationale for the override. */
  reason?: string;
}

/** Shape of one entry inside the `overrides` array of the patch file. */
interface PatchOverride {
  chunkId: string;
  newStatus: string;
  terminalNonRetryable?: boolean;
  supersededBy?: string;
  reason?: string;
}

/** Top-level shape of .chunk-state-patch.json.applied. */
interface PatchFile {
  schemaVersion: string;
  kind: string;
  overrides: PatchOverride[];
}

/**
 * Minimal runtime validation — fail loud on structural problems rather
 * than silently falling back to a default.
 */
function parsePatchFile(raw: unknown, path: string): PatchFile {
  if (typeof raw !== 'object' || raw === null) {
    throw new Error(
      `reconcileChunkStateFromPatch: patch file at ${path} must be a JSON object`,
    );
  }
  const obj = raw as Record<string, unknown>;
  if (!Array.isArray(obj['overrides'])) {
    throw new Error(
      `reconcileChunkStateFromPatch: patch file at ${path} is missing required overrides array`,
    );
  }
  return raw as PatchFile;
}

/**
 * Reconcile the supervisor's in-memory chunk state map against the
 * applied patch file.
 *
 * Call this at the very top of `runCronTick()`, before any alert
 * evaluation, so that superseded chunks are never surfaced as active
 * failures.
 *
 * @param chunkStateMap - The supervisor's working chunk state map,
 *   keyed by chunk ID.  Modified in-place.
 * @param patchPath - Path to the applied patch file.  Defaults to
 *   `/workspace/.chunk-state-patch.json.applied`.  Injectable for
 *   testing.
 */
export function reconcileChunkStateFromPatch(
  chunkStateMap: Map<string, ChunkStateEntry>,
  patchPath: string = DEFAULT_PATCH_PATH,
): void {
  // If no patch file has been written, nothing to reconcile.
  if (!existsSync(patchPath)) return;

  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(patchPath, 'utf-8'));
  } catch (err) {
    throw new Error(
      `reconcileChunkStateFromPatch: failed to parse ${patchPath}: ${String(err)}`,
    );
  }

  const patch = parsePatchFile(raw, patchPath);

  for (const override of patch.overrides) {
    if (
      typeof override.chunkId !== 'string' ||
      typeof override.newStatus !== 'string'
    ) {
      throw new Error(
        `reconcileChunkStateFromPatch: every override must have string chunkId and newStatus`,
      );
    }

    // Upsert: spread existing entry (or start from scratch), then apply overrides.
    const existing: ChunkStateEntry =
      chunkStateMap.get(override.chunkId) ?? { status: 'unknown' };

    chunkStateMap.set(override.chunkId, {
      ...existing,
      status: override.newStatus,
      ...(override.terminalNonRetryable !== undefined && {
        terminalNonRetryable: override.terminalNonRetryable,
      }),
      ...(override.supersededBy !== undefined && {
        supersededBy: override.supersededBy,
      }),
      ...(override.reason !== undefined && { reason: override.reason }),
    });
  }
}
