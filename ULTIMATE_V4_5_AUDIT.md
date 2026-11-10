# Kira Cepat Ultimate V4.5 — Bug Fix & Accuracy Audit

## Scope

The existing Premium Black interface and all nine calculator pages stay intact. Calculations have been moved to `calc-core-v45.js` so Node.js regression tests can exercise the same formulas used by the browser. An adapter handles the three original homepage tools, while the existing V2 UI invokes the shared module for the remaining six.

## Findings and decisions

| Tool | Audit result / V4.5 action | Accuracy boundary |
| --- | --- | --- |
| Loan | Shared stable amortization formula; 0% rate and invalid duration tests | **Reducing-balance** installment only, not flat-rate loan |
| Zakat income | Inputs/threshold validated, 2.5% simulation tested | Basic gross-income simulation only; consult state zakat authorities |
| Converter | Fix negative °C/°F inputs down to absolute zero; live currency rates required; remove silent static fallbacks; show provider date | Exchange rates may be unavailable when offline, API fails, or provider date is older than 48 hours; no bank spreads |
| Net salary | Input guards, explicit estimated SOCSO/EIS and negative net deduction guard | Does not replace payslip; **PCB not included** |
| Overtime | Validates days/hours and 1.5/2/3 multipliers; test known hourly case | Eligibility and exact OT basis depend on employment rules |
| EPF/KWSP | Check the **official RM3,250 example** (employee RM359 / employer RM424). Use approximate Oct 2025 Part A bands; above RM20k uses percentage method | Not all wage brackets, statuses, exemptions or edge cases independently reconciled against complete schedule; **do not use as official payroll** |
| SOCSO/EIS | Correctly labels percentage output as **approximation**, capped at RM6,000; points users to PERKESO calculator | Real compulsory contributions are in **official schedules**, not simple wage × percentage. **Not payroll-ready** |
| Income tax | Verified progressive YA 2025 brackets from official LHDN table: RM20,000 -> RM150; RM35,000 -> RM600; RM100,000 -> RM9,400; RM400,000 -> RM84,400 | Not YA2026. Relief input is user-supplied, rebates/PCB/exemptions not modelled |
| Savings | Tested zero interest and end-of-month contribution order; invalid input & excessive return handled | No guarantees, inflation, tax or investment fees |

## Official sources checked (10 Nov 2026)

- KWSP rates and rules: https://www.kwsp.gov.my/en/employer/responsibilities/mandatory-contribution
- KWSP Third Schedule (Oct 2025): https://www.kwsp.gov.my/en/epf-act-1991-third-schedule
- PERKESO salary ceiling and schedules: https://perkeso.gov.my/en/rate-of-contribution
- Official PERKESO calculator: https://perkeso.gov.my/en/our-services/employer-employee/contribution-calculator.html
- LHDN individual resident income tax for YA2023–2025: https://www.hasil.gov.my/en/individu/kadar-cukai/

**Not claiming authoritative payroll calculations:** PERKESO's detailed wage brackets and KWSP's complete downloadable Third Schedule were not exhaustively converted into code in V4.5; don't claim they have been.

## Automated tests

```bash
node --test tests/v45.test.cjs
SITE_URL=https://kiracepat.opstudio.workers.dev node scripts/build-cloudflare.mjs
SITE_URL=https://kiracepat.opstudio.workers.dev node scripts/verify-cloudflare.mjs
```

GitHub Actions runs the regression tests and static SEO verification on PRs and master pushes. No new external npm dependencies.

## Manual smoke test checklist

1. Open homepage and all nine SEO pages directly on mobile and desktop.
2. Run each calculator and test blank/negative values, rate 0%, and unusually large figures.
3. Select Converter → Temperature → Celsius → Fahrenheit: **-10°C should output 14°F**; -274°C should show an absolute zero error.
4. Select Converter → Currency: verify live rate/date when online. Disable network and refresh: conversion **must not present fabricated/stale exchange rates**.
5. Check KWSP RM3,250 comparison (worker RM359; employer RM424).
6. Verify SOCSO/EIS results visibly say *anggaran kasar* and link to PERKESO.
7. Verify tax result explicitly says **YA 2025** and matches official progressive brackets.
8. Verify UI remains Premium Black, mobile tabs remain scrollable, existing share/copy buttons work.
9. Confirm Cloudflare build includes all three new JS assets and 10 HTML pages.
10. Verify Google canonical and sitemap still target the deployed production domain.

## Known limitations

- Browser-device testing and live exchange-rate API availability still require smoke testing; passing Node tests is not equivalent to a full E2E browser test.
- Offline currency conversion intentionally fails safely rather than silently displaying fictional rates.
- Currency result is a reference quote, not an executable bank rate.
