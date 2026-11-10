# Kira Cepat Ultimate V4 — SEO Power

## What changed
- Nine distinct, crawlable, pre-rendered HTML pages under descriptive URLs
- Each page has a unique title, meta description, canonical, Open Graph title/description/URL, static Malay introduction and an FAQ displayed in the initial HTML
- Unique guide and links to three related tools on each landing page
- Static directory of all nine landing pages on the homepage and each landing page
- BreadcrumbList JSON-LD and a ten-URL XML sitemap
- Reuses existing Premium Black CSS and all existing calculator JavaScript (no calculation formulas changed)
- Uses relative paths for shared CSS, scripts and favicon so nested pages work on project hosting such as GitHub Pages

## Canonical domain and deployment assumptions
The GitHub repository `homepage` is currently configured as `https://openpdfstudio98.github.io/kira-cepat/`. Canonical tags and sitemap use that base. The live website was **not independently verified** through an HTTP request, so **confirm that GitHub Pages serves the deployment** before merging. If Vercel or a custom domain is primary instead, replace the canonical and sitemap base URLs consistently and add redirects from duplicate domains.

On GitHub Pages *project* hosting, `/kira-cepat/robots.txt` is not the origin-root `/robots.txt`. We did not add a misleading robots file; submit `https://openpdfstudio98.github.io/kira-cepat/sitemap.xml` directly to Google Search Console when the URLs work.

## Important limitations
- All nine pages reuse the same interactive calculator workspace and scripts. Their initial HTML contains distinctive written guidance and SEO navigation, while the selected calculator is shown after JavaScript runs.
- SEO indexing and traffic results cannot be guaranteed.
- FAQ content is visible in HTML but is not marked up as FAQPage rich results; Google limits FAQ rich results to certain authoritative government/health sites.
- No changes were made to financial formulas. SOCSO/EIS remain **rough estimates**, and individual income tax logic remains explicitly labelled **YA 2025**.
- Currency conversion retains the original stale rate fallback behavior.

## QA checklist before merging
1. Confirm GitHub Pages or production hosting is publishing the correct branch/directory.
2. Open homepage and all nine nested URLs directly (not by clicking from the homepage). No 404.
3. Inspect each page title, description, single canonical, OG URL and breadcrumb.
4. Ensure the first visible calculator matches the page, and test all nine calculations.
5. Verify sharing, clipboard, navigation, browser back and responsive Premium Black layout.
6. Verify `sitemap.xml` contains exactly ten URLs and all URLs return HTTP 200.
7. Run Google Search Console URL Inspection on one nested page, then submit the sitemap.
8. If your canonical domain is not the GitHub Pages homepage, update all canonical/sitemap links first.

## Google reference
https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
