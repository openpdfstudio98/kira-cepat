# Kira Cepat Ultimate V4.6 — Official Contributions Audit

Date reviewed: 10 November 2026.

## Implemented scope

**Malaysian employed workers under age 60, KWSP Third Schedule Part A and PERKESO Act 4 First Category.** No claims for other nationalities, ages, first-time entrants aged 55+, Second Category, self-employed workers, special exemption classes, or retrospective payroll.

- **KWSP**: Third Schedule effective October 2025; wage bands through RM20,000, with 11% employee and 13% / 12% employer amounts rounded by the published wage-band method. Above RM20,000: exact percentages with total upward rounded to next RM. This module is explicitly limited to Part A.
- **SOCSO / PERKESO Act 4**: 64 exact wage-band rows (up to RM6,000) transcribed from the PERKESO June 2026 SKBBK-inclusive official schedule. Employee Keilatan and voluntary SKBBK are separated. The employer figure is the Category One employer share; wage ceiling RM6,000.
- **LINDUNG 24 Jam (SKBBK)**: Optional for local Malaysian employees per the latest PERKESO notice; mandatory for eligible foreign workers, who are OUT OF SCOPE for this specific calculator. Employee must explicitly select opted-in or opted-out. No assumed participation is silently added.
- **EIS / Act 800**: wage band amounts from PERKESO's updated RM6,000 wage ceiling schedule; no flat percent shortcut.
- **Net salary**: overtime is counted as gross pay and PERKESO applicable wages, but excluded from EPF applicable wages under KWSP's published exemption. Other allowance classifications are user's responsibility. PCB and rebates are not included.
- **UI**: preserves the Premium Black theme. Adds two small status drop-downs only: salary + SOCSO/EIS.

## Official primary sources

1. KWSP Third Schedule 1 October 2025: https://www.kwsp.gov.my/documents/d/guest/third_schedule_from_-1-october-2025
2. KWSP compulsory rates and >RM20,000 rounding: https://www.kwsp.gov.my/en/employer/responsibilities/mandatory-contribution
3. KWSP exempt overtime: https://www.kwsp.gov.my/en/employer/responsibilities/payments
4. PERKESO Act 4 new First Category table including SKBBK: https://www.perkeso.gov.my/images/lindung/lindung-24-jam/JadualCarumanBaharuTermasukSKBBK.pdf
5. PERKESO Act 800 (EIS): https://www.perkeso.gov.my/images/dokumen/101024%20-%20Kadar%20Caruman%20Akta%20800.pdf
6. PERKESO latest SKBBK voluntary notice: https://perkeso.gov.my/perkhidmatan-kami/perlindungan/lindung-24-jam.html
7. PERKESO official cross-check calculator: https://www.perkeso.gov.my/perkhidmatan-kami/majikan-pekerja/kalkulator-caruman.html

## Test method

```sh
node --test tests/*.test.cjs
SITE_URL=https://kiracepat.opstudio.workers.dev node scripts/build-cloudflare.mjs
SITE_URL=https://kiracepat.opstudio.workers.dev node scripts/verify-cloudflare.mjs
```

Two suites validate all nine baseline calculators and statutory boundary figures. Additional V4.6 tests traverse all 64 PERKESO wage band upper limits and test SKBBK choices, EIS bands, KWSP low/ordinary/high salary cases, and exclusion of overtime from KWSP salary calculations. GitHub Actions runs both suites before deployment.

## Representative reference samples

| Wage | Type | Employee | Employer |
| --- | --- | ---: | ---: |
| RM3,250 | KWSP | RM359.00 | RM424.00 |
| RM4,150 | SOCSO category one without SKBBK | RM20.75 | RM72.65 |
| RM4,150 | SOCSO category one with SKBBK | RM51.90 | RM72.65 |
| RM6,000 | SOCSO category one without SKBBK | RM29.75 | RM104.15 |
| RM6,000 | SOCSO category one with SKBBK | RM74.40 | RM104.15 |
| RM6,000 | EIS | RM11.90 | RM11.90 |

## Remaining limitations / tests before merging

- UI browser test in Chrome mobile and desktop; code/CI tests cannot guarantee every interaction.
- Ensure user's specific gross-pay components (e.g. exemptions, travel allowance, bonus) are liable to KWSP/SOCSO before relying on the estimate.
- Verify category, age, nationality, eligibility, and employment-date status with employer/payroll specialists and current PERKESO/KWSP sources.
- Tax remains clearly **YA2025** (unaffected by this change).
- No changes to previous canonical, sitemap, Search Console verification, or Premium Black styles.
