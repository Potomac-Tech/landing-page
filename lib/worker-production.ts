export const productionOrigin = 'https://potomacdb.com';
const allowedHosts = new Set([
  'potomacdb.com',
  'www.potomacdb.com',
  'potomac-landing-production.jake-249.workers.dev',
  'localhost',
  '127.0.0.1',
]);

export function productionRedirect(request: Request): Response | undefined {
  const url = new URL(request.url);
  if (!allowedHosts.has(url.hostname)) {
    return new Response('Unknown host.', { status: 421 });
  }
  if (url.hostname === 'www.potomacdb.com' ||
      (url.hostname === 'potomacdb.com' && url.protocol !== 'https:')) {
    // Assign the trusted origin; a path beginning with // must not change it.
    url.protocol = 'https:';
    url.hostname = 'potomacdb.com';
    url.port = '';
    return Response.redirect(url.href, 308);
  }
}

export function productionRequest(request: Request): Request {
  const headers = new Headers(request.headers);
  for (const name of [...headers.keys()]) {
    if (name.startsWith('oai-') || name === 'forwarded' || name.startsWith('x-forwarded-')) {
      headers.delete(name);
    }
  }
  const url = new URL(request.url);
  headers.set('host', url.host);
  return new Request(request, { headers });
}

export function productionResponse(response: Response, request: Request): Response {
  const secured = new Response(response.body, response);
  const url = new URL(request.url);
  secured.headers.set('X-Content-Type-Options', 'nosniff');
  secured.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  secured.headers.set('X-Frame-Options', 'DENY');
  secured.headers.set('Content-Security-Policy', "frame-ancestors 'none'; base-uri 'self'; object-src 'none'");
  secured.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  // Avoid cross-request caching of streamed HTML, RSC, or inquiry responses.
  secured.headers.set('Cache-Control', 'no-store');
  if (url.hostname !== 'potomacdb.com' || url.pathname.startsWith('/api/') || response.status >= 400) {
    secured.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }
  return secured;
}
