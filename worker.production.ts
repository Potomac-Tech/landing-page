import handler from 'vinext/server/fetch-handler';
import { isPrivatePreviewPath } from './lib/worker-preview';
import {
  productionOrigin,
  productionRedirect,
  productionRequest,
  productionResponse,
} from './lib/worker-production';

type ProductionEnvironment = Record<string, unknown> & {
  ASSETS: { fetch(request: Request): Promise<Response> };
};

export default {
  async fetch(request: Request, env: ProductionEnvironment, ctx: ExecutionContext) {
    const finish = (response: Response) => productionResponse(response, request);
    const redirect = productionRedirect(request);
    if (redirect) return finish(redirect);
    const url = new URL(request.url);
    if (isPrivatePreviewPath(url.pathname)) {
      return finish(new Response('This private page is unavailable on the public website.', {
        status: 403,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      }));
    }
    if (url.pathname === '/robots.txt') {
      const rules = url.origin === productionOrigin
        ? 'User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /inquiries\nDisallow: /signin-with-chatgpt\nDisallow: /signout-with-chatgpt\nDisallow: /callback\n'
        : 'User-agent: *\nDisallow: /\n';
      return finish(new Response(rules, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      }));
    }
    const cleanRequest = productionRequest(request);
    if (url.pathname.startsWith('/_next/static/')) {
      return finish(await env.ASSETS.fetch(cleanRequest));
    }
    return finish(await handler.fetch(cleanRequest, env, ctx));
  },
};
