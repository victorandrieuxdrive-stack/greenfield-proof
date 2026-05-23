export const runtime = "nodejs";

/**
 * GET /api/items
 *
 * Returns the items list as a JSON array.
 *
 * The data module is resolved lazily (dynamic import) so that any exception
 * thrown during module initialisation or data access is caught inside the
 * try/catch below. This ensures raw error messages — including credentials
 * that might appear in upstream errors — are never forwarded to the client.
 */
export async function GET(_req: Request): Promise<Response> {
  try {
    const { items } = await import('@orchestrator/shared');
    return Response.json(items);
  } catch (_err) {
    // Sanitize: do NOT expose _err.message or _err.stack to the client.
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
