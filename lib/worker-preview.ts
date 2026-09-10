// Standalone previews do not have the Sites identity-verifying dispatcher.
export function previewRequest(request: Request): Request {
  const headers = new Headers();
  for (const [name, value] of request.headers) {
    if (!name.startsWith('oai-')) headers.append(name, value);
  }
  return new Request(request, { headers });
}

export function isPrivatePreviewPath(pathname: string): boolean {
  let path: string;
  try {
    path = decodeURIComponent(pathname).replace(/\/+/g, '/');
  } catch {
    return true;
  }
  return [
    '/inquiries',
    '/signin-with-chatgpt',
    '/signout-with-chatgpt',
    '/callback',
  ].some(
    (privatePath) => path === privatePath || path.startsWith(`${privatePath}/`),
  );
}

export function previewResponse(response: Response): Response {
  const secured = new Response(response.body, response);
  secured.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  secured.headers.set('Cache-Control', 'no-store');
  return secured;
}
