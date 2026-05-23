/**
 * Home page — server component.
 *
 * Fetches items from the shared data module and renders an HTML list.
 * Error messages are never forwarded to the markup (sanitised at the boundary).
 *
 * NOTE: No 'use client' directive — this is intentionally a server component.
 */

export default async function Page(): Promise<Response> {
  try {
    const { items } = await import('@orchestrator/shared');

    let body: string;
    if (items.length === 0) {
      body = '<p class="items-empty">No items to display.</p>';
    } else {
      const listItems = items
        .map((item) => `<li class="item-entry" data-id="${item.id}">${item.name}</li>`)
        .join('\n');
      body = `<ul class="items-list">\n${listItems}\n</ul>`;
    }

    return new Response(
      `<main class="home">\n${body}\n</main>`,
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    );
  } catch (_err) {
    // Sanitize: do NOT expose _err.message, _err.stack, or any raw detail.
    return new Response(
      '<main class="home"><p class="error-message">Something went wrong. Please try again.</p></main>',
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    );
  }
}
