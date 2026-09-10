# Potomac production hosting

Production: https://potomacdb.com. The Worker redirects `www.potomacdb.com` to the apex, preserving paths and query strings.

Cutover verified on September 10, 2026: homepage, 31 referenced/representative assets, canonical metadata, robots, private-route denial, forged-header handling, contact save/retry, and `www` redirect passed. The existing branch preview and email DNS were preserved. No DNS records were deleted.

## Resources

- Worker: `potomac-landing-production` in account `2491244ab83d2260e4b5226bcb79967a`.
- Config: `wrangler.production.jsonc`; build entry: `worker.production.ts`.
- D1: `potomac-landing-production`, ID `22770263-a2dd-404b-b4c3-aa6b36e86757`, binding `DB`.
- Diagnostic address: https://potomac-landing-production.jake-249.workers.dev (not indexed).
- Existing branch preview remains separate: https://potomac-lunar-preview-20260908.jake-249.workers.dev.

Only `potomacdb.com/*` and `www.potomacdb.com/*` are routed to this Worker. Their existing GitHub DNS targets remain as a rollback option, with Cloudflare proxying enabled. The Worker serves all website responses itself; it does not fetch GitHub as an origin. Do not change email records, other subdomains, or the original private Sites deployment.

## Deploy

Use the repository's pinned dependencies with Node 24. After `npm ci`, authenticate Wrangler to the account above and run:

```sh
node --test tests/inquiries.test.mjs tests/worker-preview.test.mjs tests/worker-production.test.mjs
npx tsc --noEmit
npm run deploy:production
node scripts/check-worker-production.mjs https://potomacdb.com
```

The production command builds the standalone Worker, applies checked-in migrations to the production database, then publishes the compiled Worker and its two hostname routes. Do not run the default Sites build for this deployment. Preview builds explicitly disable production mode and retain their own Worker and database.

GitHub does not currently contain a Cloudflare deployment credential. Pushing source alone does not publish the Worker; deploy using the command above. A future automatic workflow requires a separately provisioned, narrowly scoped deployment token, not a copied personal Wrangler OAuth token.

## Contact requests and access

Requests are saved to production D1 with input validation, same-origin checks, idempotency and rate limiting. No preview requests were copied into production. Test records must be removed using their exact IDs and test identities.

Email notifications are not configured. The existing `info@potomacdb.com` mail link remains available. Account-authorized operators can inspect requests through Cloudflare D1; an authenticated web inbox is not exposed. Sites identity headers are untrusted on a standalone Worker, so `/inquiries` and the Sites authentication routes remain denied. Never enable those routes without a separately verified authentication system.

## Rollback

For an application regression, use Cloudflare's Worker version rollback to a previously verified production version. Confirm D1 schema compatibility; do not delete or reset production inquiry data.

The last working legacy GitHub Pages source is `1309b080fe511ef9e09c6d4cc06c7907a5c571a8`. The Pages workflow remains pinned to it for a manual emergency rebuild. Restoring that artifact alone does **not** redirect domain traffic away from Cloudflare.

To return website traffic to GitHub Pages, set only the four apex A records and the `www` CNAME back to DNS-only in Cloudflare DNS. Their original targets are retained:

- Apex DNS-only A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
- `www` DNS-only CNAME: `potomac-tech.github.io`.
- No apex AAAA record was present before migration. These five website records use the original Auto TTL (observed as 300 seconds).

Keep the Pages custom-domain setting `potomacdb.com`. Leave MX/TXT, all other DNS records, the branch preview and D1 data unchanged. Changing proxy status requires a Cloudflare DNS-authorized session; the existing Wrangler OAuth session can manage Workers but cannot directly read/edit DNS records. The normal Worker routes are inert for DNS-only traffic and can be retired separately once the rollback is verified.
