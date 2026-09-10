# Potomac lunar website — branch preview

This branch contains the current Potomac website, including the Pathfinder “CubeSat for the Moon” positioning, interactive intelligence-platform previews, and the resized Pathfinder image label. The previous website remains in `main` and in Git history.

## Isolated Cloudflare preview

- Branch: `codex/potomac-lunar-preview-20260908`
- Worker: `potomac-lunar-preview-20260908`
- D1 database: `potomac-lunar-preview-20260908` (preview inquiries only)
- Configuration: `wrangler.preview.jsonc`
- No production route, custom domain, GitHub Pages deployment, or original Sites deployment is changed.
- The preview is publicly reachable but sends `noindex` headers and a disallow-all `robots.txt`. These are indexing controls, not authentication.
- The private inquiry inbox and Sites sign-in routes return 403 on this standalone preview. Incoming Sites identity headers are stripped. Do not configure `INBOX_OWNER_EMAIL` here; external authenticated inbox access requires a separately verified identity layer.
- The briefing form stores submissions in the isolated preview database. No automatic email notifications are sent. Preview submissions can be inspected by an authorized Cloudflare account administrator through D1.

## Reproduce

Use Node.js 22.13+ and the authenticated Cloudflare account named in the preview configuration.

```sh
npm ci
npm run build:preview
node --experimental-strip-types --test tests/inquiries.test.mjs tests/worker-preview.test.mjs
npx wrangler deploy --dry-run --config dist/server/wrangler.json
npm run deploy:preview
```

`deploy:preview` rebuilds for the separate Worker, applies the existing migrations to the preview database, and deploys the generated Worker configuration. It does not create the database: its existing ID is intentionally explicit to prevent accidental use of production storage. There is no automatic push-to-Worker deployment configured.

The default `npm run dev` and `npm run build` retain the original Sites development/build path. The separate preview build omits the Sites plugin and uses `worker.preview.ts` with the same application and assets. Secrets, local environment files, build output, and local inquiry records are not committed. The original social metadata/canonical origin is retained; the preview itself is not intended for indexing.

The existing GitHub Pages workflow is retained but guarded to run only on `main`, including manual dispatch. This Worker-backed app is not a static GitHub Pages export; review deployment separately before any future merge to `main`.

## Priority audit updates — 10 September 2026

- Typography uses Barlow for body/UI and Barlow Semi Condensed for headlines, including a real italic face for gold emphasis. Fonts remain self-hosted through the existing build integration.
- The inquiry form renders with an explicit POST target and disabled controls until JavaScript initializes its request ID. An email fallback remains available without JavaScript. The preview check also asserts these server-rendered privacy defaults.
- React, React DOM, and React Server DOM are pinned to 19.2.8; RSC plugin 0.5.34 includes the patched vendored 19.2.8 decoder. Vite is 8.0.16. Cloudflare tooling and its matching types are updated together.
- The supplied Potomac logo is used unchanged for the favicon, with a versioned URL to refresh browser caches.
- Updates are pushed and deployed manually when requested; GitHub branch pushes do not automatically publish the Worker or replace production.

Remaining audit items are not silently treated as fixed: `image-size` 2.0.2 has build-time parsing advisories with no published patched release. Use trusted checked-in images only; do not add untrusted image processing. Vinext is retained at beta.5 because newer releases bundle this parser rather than fixing it. Drizzle Kit's old esbuild loader also retains a moderate development-tool advisory; do not expose its development server or accept the audit's suggested breaking downgrade. Response-header policy, edge abuse controls, retention, and CI hardening remain follow-up work.
