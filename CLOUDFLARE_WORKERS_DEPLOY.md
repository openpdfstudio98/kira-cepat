# Kira Cepat — Fix Cloudflare Workers Static Assets (Post-Merge)

Cloudflare Workers account subdomain **opstudio** and Worker name **kiracepat** have been confirmed through the connected Cloudflare account. This is **Workers**, not a Pages project.

## Required deployment settings

In Cloudflare Dashboard → **Workers & Pages** → **kiracepat** → **Settings** → **Builds**, use:

- GitHub repository: `openpdfstudio98/kira-cepat`
- Production branch: `master`
- Build command: `node scripts/build-cloudflare.mjs`
- Deploy command: `npx wrangler deploy`
- Root directory: repository root
- Production build environment variable: `SITE_URL=https://kiracepat.opstudio.workers.dev`

The new `wrangler.jsonc` pins the existing Worker name and configures static assets from `./dist`, with trailing-slash handling for the nine `/slug/` calculator pages. The build generates 10 static pages, canonical/OG URLs, sitemap, robots and a branded 404.

**Do not paste Cloudflare API tokens into GitHub or chat.** The Cloudflare-integrated build provides deploy authorization.

## Verification before Search Console

1. Check Worker production deployment has completed after these settings are applied.
2. Confirm the homepage `https://kiracepat.opstudio.workers.dev/` opens.
3. Confirm `https://kiracepat.opstudio.workers.dev/kalkulator-gaji-bersih/` opens directly (and other eight calculator URLs).
4. Confirm `https://kiracepat.opstudio.workers.dev/sitemap.xml` lists all ten URL entries and no `github.io` URLs.
5. Check `/robots.txt` and canonical tags for `opstudio.workers.dev`.
6. Test premium black CSS, favicon, calculators and mobile tab navigation.
7. Only after all URLs load, add the URL-prefix property to Google Search Console, verify ownership and submit `https://kiracepat.opstudio.workers.dev/sitemap.xml`.

## Notes

- The previous PR's Pages setup instructions were for a different product. The current Worker should use the settings **above**, not the Pages `dist` output field.
- The existing GitHub Pages publication, if active, can be retired after the new site has been verified to avoid duplicate domains; do not turn it off prematurely.
- Google indexing cannot be guaranteed. No SEO verification token has been added yet for the Cloudflare URL.
- The financial calculator formulas are unchanged; SOCSO/EIS remain approximate, and the individual tax calculator remains labelled YA 2025.
- This PR is a deployment configuration fix, not a verified live SEO launch.

Cloudflare references:
- https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/
- https://developers.cloudflare.com/workers/ci-cd/builds/configuration/
- https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/
