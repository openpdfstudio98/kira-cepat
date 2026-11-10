# Kira Cepat — Ultimate V2

This change adds six Malaysia-focused financial calculators to the existing three tools, without introducing dependencies or altering the deployment architecture.

## New calculators
- Salary take-home (gross, estimated EPF/SOCSO/EIS and other deductions; excludes PCB)
- Overtime (configurable basic pay, working days, daily hours, rate multiplier)
- EPF (indicative employee and employer percentages, under-60 Malaysian workers)
- SOCSO / EIS (indicative estimates subject to RM6,000 wage ceiling)
- Resident individual income tax (YA 2025 progressive brackets; manually entered eligible relief; excludes rebates, PCB and exceptions)
- Savings growth (monthly contributions, monthly compounding)

## Important financial accuracy limits
The EPF, SOCSO and EIS estimates are **not statutory payroll-grade values**. EPF contributions at or below RM20,000 must follow the statutory Third Schedule rather than direct percentages. SOCSO/EIS use scheduled contribution bands and depend on coverage and eligibility. Calculators display this disclaimer and links to source agencies.

2025 tax brackets were used because the published LHDN rate page explicitly identifies assessment years 2023–2025; do not market this calculator as a verified YA 2026 computation. Actual taxes also depend on full personal circumstances.

Loan and zakat original tools remain, with zero-interest loan support and basic input validation added. Currency conversion retains existing exchange API and fallback behavior (fallback is not live; consider a later improvement to identify stale rates).

## Manual QA checklist
- [ ] Existing loan, zakat, converter tabs still open and calculate
- [ ] Zero-interest loan produces principal / months
- [ ] Each of six new tabs opens and returns numbers for valid inputs
- [ ] Negative / blank data results in a validation message
- [ ] OT multiplier 1.5 / 2 / 3 updates results
- [ ] Savings with 0% yield returns principal plus deposits
- [ ] LHDN 2025: taxable RM50,000 = RM1,500; RM100,000 = RM9,400 (before rebates)
- [ ] View small-mobile layout, labels, links and keyboard controls

## Sources
- https://www.kwsp.gov.my/en/employer/responsibilities/mandatory-contribution
- https://perkeso.gov.my/en/our-services/employer-employee/contributions
- https://perkeso.gov.my/uncategorised/800-contribution-rate.html
- https://www.hasil.gov.my/en/individu/kadar-cukai/
