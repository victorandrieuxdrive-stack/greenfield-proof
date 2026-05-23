import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { reconcileChunkStateFromPatch } from '../reconcile-patch.js';
import type { ChunkStateEntry } from '../reconcile-patch.js';

describe('reconcileChunkStateFromPatch', () => {
  let tmpDir: string;
  let patchPath: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), 'reconcile-test-'));
    patchPath = join(tmpDir, 'patch.json.applied');
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it('is a no-op when the patch file does not exist', () => {
    const map = new Map<string, ChunkStateEntry>();
    map.set('chunk-1', { status: 'failed' });

    reconcileChunkStateFromPatch(map, patchPath);

    expect(map.get('chunk-1')?.status).toBe('failed');
    expect(map.size).toBe(1);
  });

  it('upserts status from override into existing chunk entry', () => {
    const map = new Map<string, ChunkStateEntry>();
    map.set('chunk-A', { status: 'failed' });

    writeFileSync(
      patchPath,
      JSON.stringify({
        schemaVersion: '1',
        kind: 'chunk_state_override',
        overrides: [{ chunkId: 'chunk-A', newStatus: 'superseded' }],
      }),
    );

    reconcileChunkStateFromPatch(map, patchPath);

    expect(map.get('chunk-A')?.status).toBe('superseded');
  });

  it('upserts terminalNonRetryable, supersededBy, and reason fields', () => {
    const map = new Map<string, ChunkStateEntry>();
    map.set('chunk-B', { status: 'failed' });

    writeFileSync(
      patchPath,
      JSON.stringify({
        schemaVersion: '1',
        kind: 'chunk_state_override',
        overrides: [
          {
            chunkId: 'chunk-B',
            newStatus: 'superseded',
            terminalNonRetryable: true,
            supersededBy: 'chunk-C',
            reason: 'Already merged under chunk-C',
          },
        ],
      }),
    );

    reconcileChunkStateFromPatch(map, patchPath);

    const entry = map.get('chunk-B');
    expect(entry?.status).toBe('superseded');
    expect(entry?.terminalNonRetryable).toBe(true);
    expect(entry?.supersededBy).toBe('chunk-C');
    expect(entry?.reason).toBe('Already merged under chunk-C');
  });

  it('creates a new entry if chunk does not yet exist in the map', () => {
    const map = new Map<string, ChunkStateEntry>();

    writeFileSync(
      patchPath,
      JSON.stringify({
        schemaVersion: '1',
        kind: 'chunk_state_override',
        overrides: [
          { chunkId: 'new-chunk', newStatus: 'superseded', terminalNonRetryable: true },
        ],
      }),
    );

    reconcileChunkStateFromPatch(map, patchPath);

    expect(map.get('new-chunk')?.status).toBe('superseded');
    expect(map.get('new-chunk')?.terminalNonRetryable).toBe(true);
  });

  it('processes multiple overrides in order', () => {
    const map = new Map<string, ChunkStateEntry>();
    map.set('c1', { status: 'failed' });
    map.set('c2', { status: 'in_progress' });

    writeFileSync(
      patchPath,
      JSON.stringify({
        schemaVersion: '1',
        kind: 'chunk_state_override',
        overrides: [
          { chunkId: 'c1', newStatus: 'superseded', terminalNonRetryable: true },
          { chunkId: 'c2', newStatus: 'done' },
        ],
      }),
    );

    reconcileChunkStateFromPatch(map, patchPath);

    expect(map.get('c1')?.status).toBe('superseded');
    expect(map.get('c1')?.terminalNonRetryable).toBe(true);
    expect(map.get('c2')?.status).toBe('done');
  });

  it('throws a clear error when patch file contains invalid JSON', () => {
    writeFileSync(patchPath, 'not-json{{');

    const map = new Map<string, ChunkStateEntry>();
    expect(() => reconcileChunkStateFromPatch(map, patchPath)).toThrow(
      'reconcileChunkStateFromPatch',
    );
  });

  it('throws a clear error when overrides array is missing', () => {
    writeFileSync(
      patchPath,
      JSON.stringify({ schemaVersion: '1', kind: 'chunk_state_override' }),
    );

    const map = new Map<string, ChunkStateEntry>();
    expect(() => reconcileChunkStateFromPatch(map, patchPath)).toThrow('overrides');
  });

  it('applies the real /workspace patch to eliminate stale failure for items_api_test', () => {
    const map = new Map<string, ChunkStateEntry>();
    map.set('cmphwmqed000001o6ubw1qizh__items_api_test', { status: 'failed' });

    // Use the actual patch file that was applied by the earlier hotfix
    reconcileChunkStateFromPatch(
      map,
      '/workspace/.chunk-state-patch.json.applied',
    );

    const entry = map.get('cmphwmqed000001o6ubw1qizh__items_api_test');
    expect(entry?.status).toBe('superseded');
    expect(entry?.terminalNonRetryable).toBe(true);
    expect(entry?.supersededBy).toBe('019e53db-7d85-73e6-8249-80f1271c846c');
  });
});
