# Kira Cepat Ultimate V4.6 — Official Contribution Schedules

## Scope and assumptions
- **KWSP**: Third Schedule Part A effective wages October 2025, Malaysian citizen / eligible PR, **under 60**. Band-based contributions for wages up to RM20,000; exact percentages with total rounded up to next RM for wages above RM20,000. The employee and employer amounts retain their own cents in this latter case; the separately displayed total is rounded up.
- **PERKESO SOCSO**: Act 4 **first category** (eligible worker under 60) and **EIS Act 800**, effective 1 October 2024, with wage ceiling RM6,000. Other categories, worker ages, EIS exemptions, foreign worker rules and voluntary contributions are **not supported**.
- **Net salary**: assumes gross salary + allowance + overtime are each subject to all three contributions; eligibility and statutory wage definitions can differ. PCB excluded.
- Premium Black UI and existing SEO metadata remain unchanged.

## Official sources
- KWSP Third Schedule (Oct 2025): https://www.kwsp.gov.my/en/epf-act-1991-third-schedule
- KWSP official worked examples (RM3250, RM6710.80, RM21250): https://www.kwsp.gov.my/en/employer/responsibilities/mandatory-contribution
- PERKESO published official booklet, Act 4 and Act 800 wage-band tables: https://www.perkeso.gov.my/images/dokumen/risalah/2025-BOOKLET_PERKESO_BI.pdf
- PERKESO ceiling Oct 2024: https://perkeso.gov.my/en/rate-of-contribution.html

## Implementation
- `calc-core-v45.js`: KWSP Part A bracket function, `perkesoFirstCategory(wage)` for the two PERKESO schedules, and `approxContributions` compatibility API (now official first-category schedule values; name retained to avoid breaking callers).
- For PERKESO, low wage bands through RM1,000 are represented as direct table values; RM1,000.01–RM6,000 use the published RM100 bands: SOCSO employee increases RM0.50 per band, employer alternates RM1.70 / RM1.80, EIS each share increases RM0.20. Values checked against published table examples and the RM6,000 cap.
- `ultimate-v2.js`: Show table-based values, applicable category and clear eligibility warnings. KWSP shows the separately rounded total where appropriate.
- `tests/v45.test.cjs`: Official boundary tests, caps and KWSP published examples.

## Test commands
```sh
node --test tests/v45.test.cjs
SITE_URL=https://kiracepat.opstudio.workers.dev node scripts/build-cloudflare.mjs
SITE_URL=https://kiracepat.opstudio.workers.dev node scripts/verify-cloudflare.mjs
```

## Remaining manual QA
Check all nine calculators on desktop/mobile, copy/share, currency API, salary wage-component eligibility, and category-specific payroll values against the official PERKESO/KWSP portals. This is an informational calculator, not a replacement for payroll software.
