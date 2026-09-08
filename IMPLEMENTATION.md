# Unpublished homepage improvements

These notes record the original Sites implementation, which remains unpublished there. This GitHub branch adds a separate Cloudflare Worker preview; see `README.md` for its isolated database, inbox restrictions, and deployment instructions.

The homepage now includes product previews from the supplied Potomac Data Distribution Platform Concept deck, revised Deloitte labels, mobile navigation, a private inquiry inbox, optimized assets, and social metadata. Pathfinder immediately follows the hero, ahead of the lunar market and Intelligence Platform sections. Existing surface-collection and flight-qualification wording is unchanged.

## Pathfinder positioning

The Pathfinder section now leads with “The CubeSat for the Moon”: lower-cost hardware access broadens the lunar market to universities, startups, and established customers. This is a market-access analogy, not a CubeSat form-factor claim. Specifications and the existing flight-qualification paragraph are retained.

The general CubeSat comparison remains. The detailed Blue Ghost delivery-cost paragraph and NASA source note have been removed from the homepage at the user's request. No Pathfinder price is invented.

## Inquiry flow

- The form saves to the logical Sites D1 binding `DB`. No messages or automatic email notifications are sent.
- `/inquiries` is owner-only. The server compares the trusted Sites-authenticated email with `INBOX_OWNER_EMAIL`; missing configuration fails closed.
- Local `.env` uses the Sites development identity `seedy@sites.test`. Open the inbox's owner-sign-in link for local development; this identity must never become the production owner value.
- Before a future publish, configure `INBOX_OWNER_EMAIL` through Sites with the verified owner's email. Production configuration was left unchanged when the user requested that this work remain unpublished.
- Deployments must include the generated `drizzle/` migrations. No production database has been created or changed by this work.
- The form includes bounded inputs, same-origin checks, a honeypot, per-source rate limits, idempotent receipt IDs, and an email fallback. Inbox content is escaped; reply links encode email addresses.

## Checks

- `npm run build` and `npx tsc --noEmit`
- `npx oxlint app db lib/inquiries.ts scripts tests drizzle.config.ts`
- `node --experimental-strip-types --test tests/inquiries.test.mjs`
- `node scripts/check-local-inquiries.mjs` uses only localhost and creates five clearly marked local test records. Remove those exact records after testing with Wrangler's local D1 command, matching email `potomac-qa@example.invalid` and name `LOCAL QA TEST`. Do not run these mutations against production.

Whole-project lint also scans the untouched starter component library, which has existing lint errors. The changed application files pass targeted lint. Browser interaction/visual QA was not performed in this implementation turn.

## Assets

- Original Pathfinder, team, and logo PNGs are retained. Responsive WebP versions are used by the page; rerun `node scripts/optimize-assets.mjs` to regenerate them.
- `public/product-previews.webp` is a compressed, otherwise unchanged 1600 × 900 source montage extracted from `Potomac_Data_Distribution_Platform_Concept.pptx`, slide 1, `ppt/media/image2.png`. CSS reveals one genuine product screenshot at a time. The Cabeus Terminal view is labeled as a coming-soon preview.
- `public/og.png` is the 1200 × 630 social-sharing card created with the built-in image-generation tool using the supplied logo and Pathfinder render. The prompt is retained in the parent workspace's `output/imagegen/potomac-social-card-20260908-prompt.md`.

No version was published; the live website remains unchanged.
