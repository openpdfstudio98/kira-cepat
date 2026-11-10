# Ultimate V2.1 — Accuracy & UX

## Changes
- KWSP Part A for Malaysian citizen/PR workers below 60: salary-band calculation effective October 2025 up to RM20,000. Handles low-wage boundaries and standard employer tiers; total contribution rounded up above RM20,000.
- Automatic update for all six V2 calculators when fields change.
- Copy-result action on the six V2 calculators; requires a secure browser context for clipboard access.
- Keyboard-focus styling and better touch target for copy buttons.
- SOCSO/EIS warnings strengthened: **rough estimates only**, not table-accurate payroll contributions.
- Tax output explicitly labelled **Year of Assessment 2025**; not a verified YA 2026 projection.

## Verification completed
- JavaScript parsed successfully with `new Function`.
- KWSP computed: RM3,250 => employee 359, employer 424, and RM6,710.80 => employee 748, employer 816, matching official KWSP examples.
- Boundary smoke checks: RM1,000 => 110/130; RM5,000 => 550/650; RM0 => 0/0.
- Frontend script reference, copy handler, and automatic input handler found.

## Outstanding before production claims
- Complete browser + mobile testing not performed here.
- Cross-check all KWSP schedule rows, especially special employee categories and rates above RM20,000.
- Replace **SOCSO/EIS rough estimates** with the official PERKESO Act 4 / Act 800 statutory schedules, including eligibility options, before presenting as exact payroll data.
- Confirm LHDN Year of Assessment 2026 changes and relief/rebate rules before updating tax calculator.
- Test clipboard on HTTPS, browsers without clipboard permission, and keyboard navigation.

## Primary references
- KWSP Third Schedule (effective 1 October 2025): https://www.kwsp.gov.my/en/epf-act-1991-third-schedule
- KWSP mandatory contribution examples: https://www.kwsp.gov.my/en/employer/responsibilities/mandatory-contribution
- PERKESO wage ceiling / schedule: https://perkeso.gov.my/en/rate-of-contribution
- Official PERKESO contribution calculator: https://perkeso.gov.my/en/our-services/employer-employee/contribution-calculator.html
- LHDN tax table YA 2023–2025: https://www.hasil.gov.my/en/individu/kadar-cukai/
