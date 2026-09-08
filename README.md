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
