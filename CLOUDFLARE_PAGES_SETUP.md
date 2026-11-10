# Cloudflare Pages migration — Kira Cepat

This repository is plain HTML, CSS and JavaScript. No framework and no paid runtime dependencies are needed.

## 1. Create the site in your own Cloudflare account

1. Open https://dash.cloudflare.com/ and sign in.
2. Go to **Workers & Pages** → **Create application** → **Pages** → **Import an existing Git repository** (the exact label may vary).
3. Authorize the GitHub app only for the repository **openpdfstudio98/kira-cepat** if possible.
4. Select `openpdfstudio98/kira-cepat`.
5. Choose your desired Pages project name. Cloudflare will display the actual assigned `https://<project>.pages.dev` address. **Do not assume that `kira-cepat.pages.dev` is available.**
6. Set the production branch to **master** (this repository does not use main).
7. Set **Framework preset: None**, **Build command: `node scripts/build-cloudflare.mjs`**, **Build output directory: `dist`**, **Root directory: repository root** (blank or `/` depending on UI).
8. Under **Environment variables**, set `SITE_URL` to the actual, final production origin shown by Cloudflare, e.g. `https://YOUR-REAL-NAME.pages.dev`, with no path or trailing non-root segments. Set it for the production environment and previews. The build deliberately fails rather than publishing broken canonical metadata if this value is missing.
9. Save and deploy. Cloudflare will use its GitHub integration for future pushes and PR previews.

### Why the build step exists

Existing V4 static HTML uses `https://openpdfstudio98.github.io/kira-cepat/` in canonical tags, OG URLs, BreadcrumbList JSON-LD and XML sitemap. The build copies static assets into `dist/` and rewrites these to the exact `SITE_URL` you configured. The source files are left unchanged so the migration can be reviewed in a PR.

The build also generates a `robots.txt`, an XML sitemap (10 URLs), and standard security-oriented response headers. Previews use `noindex,nofollow` and disallow crawling in robots; the production build is indexable.

## 2. What to verify after deployment

- Homepage: `https://YOUR-REAL-NAME.pages.dev/`
- Example nested URL: `https://YOUR-REAL-NAME.pages.dev/kalkulator-gaji-bersih/`
- XML sitemap: `https://YOUR-REAL-NAME.pages.dev/sitemap.xml`
- Robots: `https://YOUR-REAL-NAME.pages.dev/robots.txt`
- Favicon, styles and scripts must load without 404 errors.
- Confirm the HTML source includes ONE canonical pointing to the production `.pages.dev` URL for that page. View the OG URL and breadcrumb too.
- Test all nine calculators, sharing, phone navigation and desktop appearance.
- Test all sitemap URLs with direct requests (HTTP 200).

## 3. Google Search Console and SEO

1. Add a **URL-prefix property** for the newly confirmed Cloudflare URL (or a domain property if you later own a custom domain). Verify ownership through a supported method.
2. Submit `https://YOUR-REAL-NAME.pages.dev/sitemap.xml`.
3. Use URL Inspection on homepage and a calculator page. Indexing is not immediate or guaranteed.
4. To avoid duplicate indexing once Cloudflare is the chosen primary host, disable the old GitHub Pages publication or arrange an appropriate permanent redirect from the old pages. **Do this only after confirming the Cloudflare deployment works.** Do not remove repository hosting from GitHub.
5. If you add a custom domain, change `SITE_URL` to the custom domain, redeploy and arrange a redirect from the old Pages subdomain as appropriate.

## Automated checks

- `SITE_URL=https://your-site.pages.dev node scripts/build-cloudflare.mjs`
- `SITE_URL=https://your-site.pages.dev node scripts/verify-cloudflare.mjs`

GitHub Actions checks these commands on every PR with a dummy test URL. This **does not mean the domain is registered or a live deployment has happened**.

## Restrictions

This PR does **not** connect to the user's private Cloudflare account or create a Pages project; an authorized account owner must complete the dashboard integration. No Cloudflare credentials should ever be committed to GitHub.

No calculator calculation or UI functionality has been changed.

## Existing Cloudflare Worker: `kiracepat`

The Cloudflare account currently has **a Worker with Static Assets**, not a Pages project. Its account-wide `workers.dev` subdomain was `asriblok15` at the time of checking. The preferred account subdomain is `kiraonline`, **but this is not yet confirmed or applied**.

- Cloudflare officially documents changing an existing account subdomain using **Workers & Pages → Your subdomain → Change** in the dashboard. API `PUT /accounts/{account_id}/workers/subdomain` returned HTTP 409 because the account already has a subdomain. Do **not** delete the existing subdomain automatically; this can break the current Worker URL.
- After the dashboard confirms the change, the expected Worker URL is `https://kiracepat.kiraonline.workers.dev/`. Verify the hostname and website first; do not assume it is already live.
- In the build settings, use that **verified** URL as `SITE_URL` when running `node scripts/build-cloudflare.mjs`. The resulting canonical tags, breadcrumb URLs, robots and sitemap will then use the same host.
- This existing Worker uses a **Workers deploy** workflow (`npx wrangler deploy` was shown). The Pages-specific `dist` build guide above does not by itself configure Workers Static Assets. Before deploying, adapt Workers static assets to serve `dist` and run the build step; do not merge a Pages-only deployment configuration without this change.
- Once the working site uses the new URL, verify each of the nine pages, `/sitemap.xml`, `/robots.txt`, and all canonical tags. Submit the new sitemap in Google Search Console. The previous GitHub Pages URL may remain a duplicate until retired or redirected.
