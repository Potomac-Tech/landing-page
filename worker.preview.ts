import handler from 'vinext/server/fetch-handler';
import {
  isPrivatePreviewPath,
  previewRequest,
  previewResponse,
} from './lib/worker-preview';

type PreviewEnvironment = Record<string, unknown> & {
  ASSETS: { fetch(request: Request): Promise<Response> };
};

const previewWorker = {
  async fetch(
    request: Request,
    env: PreviewEnvironment,
    ctx: ExecutionContext,
  ) {
    const pathname = new URL(request.url).pathname;
    if (isPrivatePreviewPath(pathname)) {
      return previewResponse(
        new Response(
          'The private inquiry inbox is not available on this branch preview. It remains protected on the original site.',
          {
            status: 403,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          },
        ),
      );
    }
    if (pathname === '/robots.txt') {
      return previewResponse(
        new Response('User-agent: *\nDisallow: /\n', {
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        }),
      );
    }
    const cleanRequest = previewRequest(request);
    // Serve compiled JS, CSS, and fonts directly; they are not app routes.
    if (pathname.startsWith('/_next/static/')) {
      return previewResponse(await env.ASSETS.fetch(cleanRequest));
    }
    const response = await handler.fetch(cleanRequest, env, ctx);
    return previewResponse(response);
  },
};

export default previewWorker;
