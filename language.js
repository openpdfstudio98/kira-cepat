/* Malay source copy and its English translations. */
(function(){
  'use strict';
  const english={
  ". Laporan di sana boleh dilihat umum. Elakkan menyertakan maklumat peribadi atau butiran gaji sebenar.": ". Issues are public. Please avoid posting personal information or real salary details.",
  "Adakah 1.5× sentiasa kadar OT?": "Is 1.5× always the overtime rate?",
  "Adakah Kira Cepat percuma?": "Is Kira Cepat free?",
  "Adakah angka SOCSO/EIS ini rasmi?": "Are these SOCSO and EIS amounts official?",
  "Adakah bayaran bank sama dengan hasil converter?": "Will my bank use the same rate?",
  "Adakah gaji bersih termasuk PCB?": "Does net pay include monthly tax deductions (PCB)?",
  "Adakah hasil ini masuk automatik ke kalkulator gaji?": "Does this result carry over to the salary calculator automatically?",
  "Adakah hasil kewangan merupakan pengiraan rasmi?": "Are the financial results official calculations?",
  "Adakah hasilnya jumlah cukai akhir?": "Is this my final tax bill?",
  "Adakah kadar mata wang sentiasa masa nyata?": "Are exchange rates updated in real time?",
  "Adakah kalkulator menolak perbelanjaan asas?": "Does the calculator deduct essential expenses?",
  "Adakah keputusan ini tawaran bank?": "Is this a bank offer?",
  "Adakah pelepasan cukai dikira automatik?": "Are tax reliefs calculated automatically?",
  "Adakah pengiraan SOCSO dan EIS tepat untuk slip gaji?": "Can I use the SOCSO and EIS figures on a payslip?",
  "Adakah pulangan dijamin?": "Are returns guaranteed?",
  "Adakah sama dengan pinjaman kadar rata?": "Is this the same as a flat-rate loan?",
  "Adakah semua pekerja layak EIS?": "Are all employees eligible for EIS?",
  "Adakah semua pekerja menggunakan kadar sama?": "Do all employees use the same rates?",
  "Akses percuma": "Free to use",
  "Alat tersedia": "Tools available",
  "Analitik laman": "Site analytics",
  "Anggaran kadar sejam ialah gaji asas bulanan dibahagi hari kerja rujukan dan jam kerja sehari yang dimasukkan.": "The estimated hourly rate is your monthly basic pay divided by the workdays and hours per day entered.",
  "Apa beza caruman pekerja dan majikan?": "What is the difference between employee and employer contributions?",
  "Apakah maksud nisab?": "What does nisab mean?",
  "Apakah unit yang tersedia?": "Which units are available?",
  "Bagaimana ansuran dikira?": "How are instalments calculated?",
  "Bagaimana dapatkan jumlah tepat?": "How can I find the exact contribution?",
  "Bagaimana kira tanpa pulangan?": "How do I calculate savings without returns?",
  "Bagaimana saya berkongsi kalkulator?": "How do I share a calculator?",
  "Bandingkan jumlah bayaran sepanjang tempoh, bukan ansuran bulanan sahaja. Kadar rata, fi pemprosesan, insurans dan kadar berubah-ubah boleh menghasilkan jumlah sebenar berbeza.": "Compare the total repayment over the full term as well as the monthly instalment. Flat rates, processing fees, insurance and rate changes can affect the actual cost.",
  "Belum. Versi ini menggunakan pendapatan kasar tahunan dan nilai nisab yang pengguna isi.": "This version uses the gross annual income and nisab you enter.",
  "Berat": "Weight",
  "Bila simpanan bulanan dimasukkan?": "When are monthly deposits added?",
  "Bolehkah digunakan terus sebagai angka payroll rasmi?": "Can I use these figures directly for payroll?",
  "Bolehkah saya masukkan OT?": "Can I include overtime pay?",
  "Buka halaman kalkulator berkenaan dan salin alamat URL atau gunakan fungsi perkongsian yang tersedia.": "Open the calculator and copy its URL, or use the share button.",
  "Bukan pengiraan e-Filing. Jumlah cukai sebenar bergantung pada jenis pendapatan, pelepasan, rebat, PCB dan peraturan tahun taksiran berkaitan. Semak dengan LHDN sebelum memfailkan cukai.": "This is an estimate for planning. Actual tax depends on income type, reliefs, rebates, monthly deductions (PCB) and the rules for the relevant assessment year. Check with LHDN before filing.",
  "Caruman pekerja dipotong daripada gaji yang layak, manakala caruman majikan ialah bahagian yang dibayar oleh majikan.": "The employee contribution is deducted from eligible pay. The employer pays its own contribution.",
  "Cloudflare mengehos laman ini. Untuk penukaran mata wang, pelayar meminta senarai kadar rujukan daripada ExchangeRate-API tanpa menghantar amaun yang anda masukkan. Halaman kalkulator juga boleh meminta fon daripada Google Fonts.": "Cloudflare hosts this site. For currency conversion, your browser requests reference rates from ExchangeRate-API without sending the amount you enter. Calculator pages may also request fonts from Google Fonts.",
  "Converter Unit & Mata Wang": "Unit & Currency Converter",
  "Converter Unit dan Mata Wang Percuma – Kira Cepat | Kira Cepat": "Free Unit & Currency Converter | Kira Cepat",
  "Dari": "From",
  "Dasar Privasi": "Privacy Policy",
  "Dasar Privasi | Kira Cepat": "Privacy Policy | Kira Cepat",
  "Di mana boleh semak kadar rasmi?": "Where can I check the official figures?",
  "Fokus Malaysia": "Malaysia-focused",
  "Gunakan jadual dan kalkulator caruman rasmi PERKESO dengan butiran pekerja yang betul.": "Use PERKESO’s official contribution tables and calculator with the correct employee details.",
  "Gunakan kalkulator ini untuk membuat simulasi bayaran kerja lebih masa mengikut asas gaji, bilangan hari kerja dan jam bekerja sehari. Pilih pengganda 1.5×, 2× atau 3×.": "Estimate overtime pay using basic salary, workdays and working hours per day. Choose a 1.5×, 2× or 3× multiplier.",
  "Hasil lebih jelas.": "Clearer results.",
  "Hubungi Kira Cepat": "Contact Kira Cepat",
  "Input dan keputusan kalkulator": "Calculator inputs and results",
  "Input seperti gaji, jumlah pinjaman dan keputusan diproses dalam pelayar anda. Aplikasi tidak menghantar nilai tersebut ke pelayan. Jika anda memilih untuk menyalin atau berkongsi keputusan, kandungannya akan dimasukkan ke papan klip atau dihantar melalui aplikasi yang anda pilih.": "Your browser processes inputs such as salary and loan amounts, as well as the results. The app does not send these values to a server. If you copy or share a result, it goes to your clipboard or the app you select.",
  "Isi nilai dan tekan Kira.": "Enter your values and select Calculate.",
  "Isi nilai dan tekan Tukar.": "Enter an amount and select Convert.",
  "Jadual Ketiga KWSP dan kategori pekerjaan menentukan caruman sebenar. Pengiraan ini mungkin tidak meliputi pengecualian, caruman sukarela, kategori umur lain dan semua kes gaji tinggi; sahkan dengan KWSP untuk urusan rasmi.": "Actual contributions depend on the EPF Third Schedule and the worker’s category. This estimate may exclude exemptions, voluntary contributions, other age groups and some high-income cases. Confirm with EPF for official use.",
  "Jangan gunakan tanpa mengesahkan jadual KWSP rasmi dan kategori pekerja berkenaan.": "Verify the official EPF schedule and the employee’s category before using these figures for payroll.",
  "Jenis": "Type",
  "Jika diaktifkan, Cloudflare Web Analytics mengukur trafik dan prestasi halaman seperti halaman dilawati dan masa pemuatan. Nilai input dan hasil kalkulator tidak disertakan dalam analitik. Maklumat lanjut tersedia dalam": "When enabled, Cloudflare Web Analytics measures site traffic and performance, such as pages visited and load times. It does not include calculator inputs or results. Read the",
  "Jumlah Pinjaman (RM)": "Loan amount (RM)",
  "Jumlah kalkulator": "Number of calculators",
  "Jumlah pinjaman, kadar tahunan yang dibahagikan kepada kadar bulanan dan bilangan bulan digunakan untuk menganggarkan bayaran tetap.": "The calculator uses the loan amount, annual rate divided by 12 and term in months to estimate a fixed monthly payment.",
  "Kadar Faedah (% setahun)": "Interest rate (% per year)",
  "Kadar rata mengira faedah atas jumlah asal pinjaman. Kaedah baki berkurangan mengira caj atas baki tertunggak. Di Malaysia, peralihan sewa beli kepada baki berkurangan dan kadar efektif bermula pada 1 Jun 2026, dengan tempoh peralihan hingga 31 Mac 2027. Semak kaedah dalam surat tawaran sebelum menggunakan simulasi ini.": "A flat rate charges interest on the original loan amount. A reducing balance rate charges interest on the outstanding amount. Malaysia began transitioning hire purchase to the reducing balance method and effective interest rates on 1 June 2026, with a transition period through 31 March 2027. Check your offer letter for the method used.",
  "Kadar rujukan boleh berbeza daripada kadar bank atau penyedia pembayaran. Aplikasi memaparkan mesej apabila kadar terkini tidak tersedia. Penukaran suhu menerima nilai negatif hingga had sifar mutlak.": "Reference rates can differ from the rates banks and payment providers offer. The converter shows a message when current rates are unavailable. Temperature conversion accepts negative values down to absolute zero.",
  "Kadar rujukan dikemas kini sekali sehari. Tarikh kadar dipaparkan bersama keputusan.": "Reference rates update once a day. The result shows the date of the rate.",
  "Kalkulator Cukai Pendapatan": "Income Tax Calculator",
  "Kalkulator Cukai Pendapatan Individu Malaysia – Anggaran | Kira Cepat": "Malaysia Individual Income Tax Calculator – Estimate | Kira Cepat",
  "Kalkulator Gaji Bersih": "Net Salary Calculator",
  "Kalkulator Gaji Bersih Malaysia – EPF, SOCSO & EIS | Kira Cepat": "Malaysia Net Salary Calculator – EPF, SOCSO & EIS | Kira Cepat",
  "Kalkulator KWSP / EPF": "KWSP / EPF Calculator",
  "Kalkulator KWSP EPF Malaysia – Pekerja dan Majikan | Kira Cepat": "Malaysia EPF Calculator – Employee and Employer | Kira Cepat",
  "Kalkulator OT Malaysia – Kadar 1.5x, 2x dan 3x | Kira Cepat": "Malaysia Overtime Calculator – 1.5×, 2× and 3× Rates | Kira Cepat",
  "Kalkulator Overtime": "Overtime Calculator",
  "Kalkulator Pinjaman": "Loan Calculator",
  "Kalkulator Pinjaman Malaysia – Anggaran Bayaran Bulanan | Kira Cepat": "Malaysia Loan Calculator – Monthly Payment Estimate | Kira Cepat",
  "Kalkulator SOCSO & EIS": "SOCSO & EIS Calculator",
  "Kalkulator SOCSO dan EIS Malaysia – Anggaran PERKESO | Kira Cepat": "Malaysia SOCSO and EIS Calculator – PERKESO Estimate | Kira Cepat",
  "Kalkulator Simpanan": "Savings Calculator",
  "Kalkulator Simpanan Bulanan – Simulasi Faedah Kompaun | Kira Cepat": "Monthly Savings Calculator – Compound Interest | Kira Cepat",
  "Kalkulator Zakat Pendapatan": "Income Zakat Calculator",
  "Kalkulator Zakat Pendapatan – Anggaran 2.5% Malaysia | Kira Cepat": "Malaysia Income Zakat Calculator – 2.5% Estimate | Kira Cepat",
  "Kalkulator berkaitan": "Related calculators",
  "Kalkulator ini menganggarkan ansuran pinjaman berdasarkan jumlah pokok, kadar faedah tahunan dan tempoh. Ia menggunakan formula ansuran berjadual yang biasanya dikenali sebagai kaedah baki berkurangan, bukan pengiraan kadar rata.": "Estimate your loan instalments from the principal, annual interest rate and term. The formula uses scheduled payments on a reducing balance.",
  "Kalkulator menggunakan kadar yang dilabel Tahun Taksiran 2025, bukannya kadar yang disahkan untuk semua tahun.": "The calculator uses rates for Assessment Year 2025.",
  "Ke": "To",
  "Kelayakan OT, hari rehat, cuti umum dan asas kadar bayaran tertakluk kepada undang-undang serta syarat pekerjaan yang relevan. Pengganda yang dipilih bukan pengesahan bahawa ia terpakai kepada semua pekerja.": "Overtime eligibility, rest days, public holidays and the pay basis depend on applicable law and employment terms. Check which multiplier applies to your situation.",
  "Kelebihan": "Features",
  "Kembali ke kalkulator": "Back to the calculators",
  "Kereta.": "Car loans.",
  "Kira Cepat menghimpunkan alat pengiraan harian dalam Bahasa Melayu dan Inggeris. Buka menu Alat untuk memilih kalkulator dan melihat panduan penggunaannya. Sesetengah kalkulator berkaitan kewangan hanya memberi anggaran dan perlu disemak dengan agensi rasmi.": "Kira Cepat brings together everyday calculators in Malay and English. Use the Tools menu to choose a calculator and see its guide. Verify financial estimates with the relevant authority when needed.",
  "Kira Cepat menyediakan kalkulator percuma dalam Bahasa Melayu dan Inggeris. Kalkulator boleh digunakan tanpa membuka akaun.": "Kira Cepat offers free calculators in Malay and English. You can use them without creating an account.",
  "Kira Cepat · Alat pengiraan percuma. Angka kewangan tertentu ialah anggaran dan bukan nasihat profesional.": "Kira Cepat · Free calculators. Some financial results are estimates and do not constitute professional advice.",
  "Kira Cepat – 10 Alat Percuma Malaysia | Gaji, KWSP & Zakat": "Kira Cepat – 10 Free Tools for Malaysia | Salary, EPF & Zakat",
  "Kira Cepat — halaman utama": "Kira Cepat — home",
  "Kira Sekarang": "Calculate",
  "Kira Zakat": "Calculate Zakat",
  "Kira anggaran pendapatan dibawa pulang dengan memasukkan gaji asas, elaun, bayaran lebih masa dan potongan lain. Kalkulator menunjukkan anggaran KWSP, SOCSO dan EIS secara berasingan.": "Enter your basic pay, allowances, overtime and other deductions to estimate your take-home pay. The calculator shows EPF, SOCSO and EIS separately.",
  "Kiraan lebih mudah.": "Easier calculations.",
  "Kiraan pantas": "Fast calculations",
  "Laman ini belum menayangkan iklan. Dasar ini akan dikemas kini dengan penerangan tentang penyedia iklan, kuki dan pilihan privasi sebelum iklan diaktifkan.": "This site currently shows no ads. We will update this policy with details on providers, cookies and privacy choices before enabling ads.",
  "Laporkan masalah": "Report an issue",
  "Lihat perbandingan caruman bahagian pekerja dan majikan berdasarkan gaji yang tertakluk kepada KWSP. Pengiraan ini disasarkan untuk kategori standard warganegara Malaysia atau penduduk tetap bawah usia 60 tahun.": "Compare employee and employer contributions based on EPF-eligible wages. This estimate covers the standard category for Malaysian citizens and permanent residents under 60.",
  "MUDAH • PANTAS • JELAS": "EASY • FAST • CLEAR",
  "Macam mana kadar sejam diperoleh?": "How is the hourly rate calculated?",
  "Maklumat laman": "Site information",
  "Masukkan kadar tahunan 0% untuk melihat jumlah modal dan simpanan bulanan sahaja.": "Enter an annual return of 0% to see the total of your initial and monthly deposits.",
  "Masukkan pendapatan bulanan dan nilai nisab tahunan yang bersesuaian untuk melihat anggaran zakat pendapatan. Kalkulator asas ini menggunakan kadar 2.5% apabila pendapatan tahunan mencapai nisab yang dimasukkan.": "Enter your monthly income and the applicable annual nisab to estimate income zakat. This basic calculator applies a 2.5% rate once annual income reaches the threshold entered.",
  "Masukkan pendapatan kasar tahunan dan jumlah pelepasan yang layak untuk melihat anggaran cukai progresif. Formula semasa ditandakan untuk Tahun Taksiran 2025 dan hanya relevan untuk individu pemastautin.": "Enter gross annual income and eligible reliefs to estimate progressive income tax. The formula applies to resident individuals for Assessment Year 2025.",
  "Mata Wang": "Currency",
  "Nilai": "Amount",
  "Nilai mengikut jadual bagi kategori yang dipaparkan. Semak kelayakan dan upah tertakluk caruman dengan PERKESO sebelum menyediakan slip gaji.": "Amounts follow the schedules for the categories shown. Verify eligibility and contributable wages with PERKESO before preparing payroll.",
  "Nisab Tahunan (RM)": "Annual nisab (RM)",
  "Nisab dan kaedah taksiran boleh berbeza mengikut negeri, jenis pendapatan serta potongan yang dibenarkan. Semak kaedah terkini dengan pusat zakat negeri sebelum membuat bayaran.": "Nisab and assessment methods can vary by state, income type and permitted deductions. Check the latest guidance from your state zakat authority before paying.",
  "Nisab ialah paras minimum yang digunakan dalam menilai kewajipan zakat mengikut kaedah badan zakat berkaitan.": "Nisab is the minimum threshold the relevant zakat authority uses to determine whether zakat is due.",
  "Nota: Hasil yang dipaparkan adalah simulasi atau anggaran. Semak rujukan rasmi untuk keputusan berkaitan kewangan, cukai, pekerjaan atau zakat.": "These results are estimates or simulations. Check official guidance before making financial, tax, employment or zakat decisions.",
  "Panduan Converter Unit & Mata Wang": "Unit & Currency Converter Guide",
  "Panduan Kalkulator Cukai Pendapatan": "Income Tax Calculator Guide",
  "Panduan Kalkulator Gaji Bersih": "Net Salary Calculator Guide",
  "Panduan Kalkulator KWSP / EPF": "KWSP / EPF Calculator Guide",
  "Panduan Kalkulator Overtime": "Overtime Calculator Guide",
  "Panduan Kalkulator Pinjaman": "Loan Calculator Guide",
  "Panduan Kalkulator SOCSO & EIS": "SOCSO & EIS Calculator Guide",
  "Panduan Kalkulator Simpanan": "Savings Calculator Guide",
  "Panduan Kalkulator Zakat Pendapatan": "Income Zakat Calculator Guide",
  "Panjang": "Length",
  "Panjang termasuk meter, kilometer, sentimeter, milimeter, inci dan kaki; berat termasuk kilogram, gram, paun dan auns; serta Celsius, Fahrenheit dan Kelvin.": "Length units include metres, kilometres, centimetres, millimetres, inches and feet. Weight units include kilograms, grams, pounds and ounces. Temperature units are Celsius, Fahrenheit and Kelvin.",
  "Paparan mesra telefon": "Mobile-friendly",
  "Pecahan mengikut jadual rasmi untuk kategori yang dipaparkan. Semakan kelayakan pekerja perlu dibuat secara berasingan.": "The amounts follow the official schedules for the categories shown. Confirm employee eligibility separately.",
  "Pembiayaan perumahan lazimnya mengenakan faedah atau keuntungan atas baki tertunggak. Jika kadar terapung, ansuran boleh berubah apabila kadar berubah. Simulasi ini menganggap kadar kekal sepanjang tempoh.": "Home financing typically charges interest or profit on the outstanding balance. With a floating rate, instalments can change when the rate changes. This simulation assumes a constant rate.",
  "Pendapatan Bulanan (RM)": "Monthly income (RM)",
  "Pengiklanan": "Advertising",
  "Percuma untuk semua": "Free for everyone",
  "Perkhidmatan pihak ketiga": "Third-party services",
  "Persatuan Bank-Bank Dalam Malaysia": "The Association of Banks in Malaysia",
  "Pilih alat di bawah untuk mula mengira": "Select a tool to get started",
  "Pilih alat yang sesuai dengan keperluan anda. Setiap kalkulator mempunyai halaman tersendiri.": "Pick the tool you need. Each calculator has its own page.",
  "Pilih kalkulator": "Choose a calculator",
  "Pinjaman": "Loan",
  "Pinjaman rumah dan kereta": "Home and car loans",
  "Pulangan masa hadapan tidak dijamin. Simulasi ini tidak mengambil kira inflasi, fi, risiko produk atau perubahan kadar sepanjang tempoh, dan bukan cadangan pelaburan.": "Future returns are uncertain. This simulation excludes inflation, fees, product risk and changes in rates. It does not provide investment advice.",
  "Rujuk institusi zakat negeri untuk nisab dan kaedah penilaian yang terkini.": "Check with your state zakat authority for the latest nisab and assessment method.",
  "Rujukan:": "References",
  "Rumah.": "Home loans.",
  "Sahkan kategori pekerja dan upah tertakluk caruman melalui portal rasmi PERKESO sebelum urusan gaji atau remitan.": "Confirm the employee’s category and contributable wages with PERKESO before preparing payroll or remitting contributions.",
  "Sepuluh kalkulator dan penukar percuma dalam satu tempat. Kira gaji, simpanan, pinjaman dan banyak lagi dengan pengalaman premium.": "Ten free calculators and converters in one place. Estimate take-home pay, savings, loans and more.",
  "Semua kalkulator percuma": "All free calculators",
  "Senarai kalkulator": "Calculator list",
  "Simulasi ansuran baki berkurangan dengan andaian kadar kekal. Semak kaedah dalam tawaran bank untuk pinjaman rumah atau kereta.": "Estimate reducing balance instalments at a constant rate. Check your bank’s offer for the method used for a home or car loan.",
  "Simulasi menganggap tambahan simpanan dimasukkan pada hujung setiap bulan.": "The simulation adds deposits at the end of each month.",
  "Simulasi menggunakan jadual KWSP Bahagian A, SOCSO kategori pertama dan EIS untuk pekerja yang layak. Masukkan hanya elaun yang tertakluk caruman. PCB, bonus dan pengecualian individu di luar skop simulasi ini.": "This estimate uses EPF Part A, first-category SOCSO and EIS schedules for eligible workers. Enter only contributable allowances. The estimate excludes monthly tax deductions (PCB), bonuses and individual exemptions.",
  "Simulasikan pecahan caruman perlindungan sosial pekerja dan majikan. Kalkulator menggunakan jadual Akta 4 kategori pertama dan Akta 800 bagi pekerja yang layak, dengan siling gaji RM6,000 mulai Oktober 2024.": "See employee and employer social security contributions. This calculator uses the first-category Act 4 and Act 800 schedules for eligible workers, with a wage ceiling of RM6,000 effective October 2024.",
  "Simulasikan pertumbuhan simpanan menggunakan modal permulaan, jumlah tambahan bulanan, tempoh dan anggaran pulangan setahun. Model semasa menggunakan pengkompaunan bulanan.": "Estimate savings growth using your initial balance, monthly deposits, term and assumed annual return. The model compounds monthly.",
  "Soalan lazim": "Frequently asked questions",
  "Suhu": "Temperature",
  "Tahun taksiran manakah digunakan?": "Which assessment year does this use?",
  "Tempoh (tahun)": "Term (years)",
  "Tentang Kira Cepat": "About Kira Cepat",
  "Tidak semestinya. Bank dan perkhidmatan pembayaran boleh mengenakan margin serta caj tambahan.": "Banks and payment providers may apply a margin or additional fees.",
  "Tidak semestinya. Kadar, kategori dan kelayakan sebenar boleh berbeza; semak sumber rasmi sebelum menggunakan angka untuk urusan penting.": "Rates, categories and eligibility can vary. Check official sources before relying on these estimates.",
  "Tidak semestinya. Kelayakan tertakluk kepada kategori dan peraturan PERKESO.": "Eligibility depends on PERKESO’s categories and rules.",
  "Tidak. Anda perlu memasukkan jumlah pelepasan yang benar-benar layak.": "Enter the total reliefs you are eligible to claim.",
  "Tidak. Ini simulasi umum, bukan kelulusan atau sebut harga bank.": "This is a general estimate. A bank can provide a quote and assess your application.",
  "Tidak. Kadar atau jadual mungkin berbeza mengikut umur, status dan kategori caruman.": "Rates and schedules vary by age, status and contribution category.",
  "Tidak. Kadar pulangan hanyalah andaian untuk tujuan simulasi.": "The return rate is an assumption for the simulation.",
  "Tidak. Kadar yang terpakai bergantung pada kategori kerja, waktu dan peraturan pekerjaan.": "The applicable rate depends on job category, hours and employment rules.",
  "Tidak. Masukkan nilai bayaran OT ke kalkulator gaji jika anda ingin mensimulasikan gaji bersih.": "Enter the overtime amount in the net salary calculator to include it in that estimate.",
  "Tidak. Paparan gaji bersih ini ialah anggaran sebelum potongan PCB.": "The result estimates net salary before monthly tax deductions (PCB).",
  "Tidak. Pengiraan ini menggunakan kaedah baki berkurangan; pinjaman kadar rata mempunyai formula lain.": "This calculator uses reducing balance instalments. Flat-rate loans use a different formula.",
  "Tidak. Rebat, PCB dan keadaan peribadi lain belum dimasukkan.": "This estimate excludes rebates, monthly tax deductions (PCB) and other personal circumstances.",
  "Tukar": "Convert",
  "Tukar unit panjang, berat dan suhu dengan mudah. Untuk mata wang, pilih kod yang tersedia dalam senarai dan gunakan kadar rujukan harian daripada ExchangeRate-API.": "Convert length, weight and temperature. For currency, select a supported code and use daily reference rates from ExchangeRate-API.",
  "Untuk maklum balas, gunakan": "To send feedback, visit the",
  "Utama": "Home",
  "Ya, kesemua sepuluh alat boleh digunakan tanpa bayaran.": "Yes, all ten tools are free to use.",
  "Ya. Masukkan jumlah bayaran OT bulanan. Bayaran ini dikira dalam asas SOCSO dan EIS; asas KWSP mengecualikan bayaran OT.": "Yes. Enter your monthly overtime pay. It counts towards SOCSO and EIS contributions and is excluded from the EPF calculation.",
  "dan": "and",
  "dasar privasi Cloudflare": "Cloudflare privacy policy",
  "halaman isu GitHub Kira Cepat": "Kira Cepat GitHub issues page",
  "· Kadar rujukan harian.": "· Daily reference rates."
};
  Object.assign(english,{
    'Alat':'Tools','Penukar Unit':'Unit Converter','Penukar Mata Wang':'Currency Converter',
    'Penukar Unit Percuma | Kira Cepat':'Free Unit Converter | Kira Cepat',
    'Penukar Mata Wang Percuma | Kira Cepat':'Free Currency Converter | Kira Cepat',
    'Panduan Penukar Unit':'Unit Converter Guide','Panduan Penukar Mata Wang':'Currency Converter Guide',
    'Tukar ukuran panjang, berat dan suhu, termasuk meter, kilogram, Celsius, Fahrenheit dan Kelvin.':'Convert length, weight and temperature, including metres, kilograms, Celsius, Fahrenheit and Kelvin.',
    'Tukar antara 165 kod mata wang menggunakan kadar rujukan harian. Pilih dua kod mata wang, masukkan amaun dan tekan Tukar.':'Convert between 165 currency codes using daily reference rates. Pick two currencies, enter an amount and select Convert.',
    'Penukar suhu menerima nilai negatif hingga had sifar mutlak.':'The temperature converter accepts negative values down to absolute zero.',
    'Kadar rujukan boleh berbeza daripada kadar bank atau penyedia pembayaran. Aplikasi memaparkan mesej apabila kadar terkini tidak tersedia.':'Reference rates can differ from bank or payment provider rates. The converter shows a message when current rates are unavailable.',
    'Bahasa paparan':'Display language',
    'Gaji':'Salary','Gaji Bersih':'Net Salary','Cukai':'Tax','Cukai Pendapatan':'Income Tax',
    'Simpanan':'Savings','Caruman KWSP / EPF':'KWSP / EPF Contributions',
    'Cukai Pendapatan Individu':'Individual Income Tax','Matlamat Simpanan':'Savings Goal',
    'Gaji asas bulanan (RM)':'Monthly basic salary (RM)',
    'Elaun tetap tertakluk caruman (RM)':'Contributable fixed allowance (RM)',
    'Bayaran OT (RM)':'Overtime pay (RM)','Potongan lain (RM)':'Other deductions (RM)',
    'Gaji asas sebulan (RM)':'Monthly basic pay (RM)',
    'Hari bekerja untuk asas kadar harian':'Workdays used to calculate the daily rate',
    'Jam kerja sehari':'Working hours per day','Jumlah jam OT':'Overtime hours',
    'Pengganda kadar OT':'Overtime rate multiplier',
    'Gaji tertakluk caruman (RM)':'Contributable pay (RM)','Gaji bulanan (RM)':'Monthly pay (RM)',
    'Pendapatan kasar tahunan (RM)':'Annual gross income (RM)',
    'Jumlah pelepasan layak tahunan (RM)':'Total eligible annual tax reliefs (RM)',
    'Simpanan permulaan (RM)':'Initial savings (RM)',
    'Simpanan tambahan bulanan (RM)':'Monthly savings deposit (RM)',
    'Anggaran pulangan setahun (%)':'Estimated annual return (%)',
    'Anggaran bagi warganegara Malaysia bawah 60 tahun yang layak untuk KWSP Bahagian A, SOCSO kategori pertama dan EIS. Bayaran OT masuk dalam asas SOCSO dan EIS; asas KWSP menggunakan gaji asas dan elaun tertakluk caruman sahaja. PCB dan bonus tidak termasuk.':'Estimate for Malaysian citizens under 60 who qualify for EPF Part A, first-category SOCSO and EIS. Overtime counts towards SOCSO and EIS. EPF uses basic pay and contributable allowances. PCB and bonuses are excluded.',
    'Anggaran menggunakan gaji bulanan ÷ hari bekerja ÷ jam sehari. Kelayakan, kaedah pengiraan dan kadar OT sebenar bergantung pada undang-undang serta kontrak pekerjaan.':'This estimate divides monthly pay by workdays and working hours per day. Eligibility, calculation method and actual overtime rates depend on applicable law and the employment contract.',
    'Pengiraan julat gaji Jadual Ketiga KWSP (Part A), berkuat kuasa Oktober 2025, bagi warganegara Malaysia/PR bawah 60 tahun sahaja. Kes khusus, kadar sukarela dan kategori pekerja lain tidak termasuk. Untuk pekerja Malaysia bawah 60 tahun sahaja.':'The EPF Third Schedule (Part A), effective October 2025, applies here to eligible Malaysian citizens and permanent residents under 60. Special cases, voluntary rates and other worker categories are excluded.',
    'Jadual PERKESO rasmi Akta 4 kategori pertama (pekerja layak bawah 60 tahun) dan Akta 800 EIS, berkuat kuasa Oktober 2024, siling RM6,000. Kategori kedua, pekerja tidak layak EIS dan pengecualian lain tidak disokong. Sahkan kelayakan sebelum guna untuk payroll.':'PERKESO’s Act 4 first-category and Act 800 EIS schedules apply to eligible workers, with an RM6,000 ceiling effective October 2024. Second-category workers, EIS exclusions and other exemptions are outside this estimate. Confirm eligibility before using it for payroll.',
    'Anggaran cukai pemastautin berdasarkan jadual Tahun Taksiran 2025. Pelepasan perlu dimasukkan sendiri; tidak mengambil kira rebat, PCB, pendapatan khas atau perubahan peraturan 2026. Bukan e-Filing rasmi.':'Resident income tax estimate based on Assessment Year 2025. Enter your own reliefs. The estimate excludes rebates, monthly deductions (PCB), special income and 2026 rule changes.',
    'Simulasi faedah kompaun bulanan dan sumbangan pada hujung bulan. Pulangan bukan jaminan; tidak mengambil kira inflasi, cukai atau yuran.':'The simulation compounds monthly and adds deposits at month end. Returns are uncertain. Inflation, taxes and fees are excluded.',
    'KWSP rasmi':'Official EPF site','PERKESO rasmi':'Official PERKESO site','LHDN rasmi':'Official LHDN site',
    'Masukkan nilai dan tekan Kira.':'Enter your values and select Calculate.',
    'Sila isi nilai yang sah dan tidak negatif.':'Enter a valid non-negative value.',
    'Pendapatan tahunan kurang nisab. Tiada zakat pendapatan dalam simulasi asas ini.':'Annual income falls below the nisab. No income zakat is due in this simulation.',
    'Terpakai hanya bagi pekerja yang layak caruman kategori pertama & EIS; tidak termasuk PCB. Sahkan kategori dan gaji tertakluk caruman.':'For workers eligible for first-category SOCSO and EIS. PCB is excluded. Confirm the category and contributable pay.',
    'Jadual Ketiga KWSP Part A Oktober 2025, bagi kategori pekerja yang dinyatakan sahaja.':'EPF Third Schedule Part A, October 2025, for the stated employee categories.',
    'Jadual PERKESO: Akta 4 Kategori Pertama + EIS Akta 800':'PERKESO schedules: Act 4 First Category and Act 800 EIS',
    'Sahkan kategori pekerja dan kelayakan EIS; untuk payroll/remitan, semak':'Confirm the employee’s category and EIS eligibility. For payroll or remittance, check the',
    'kalkulator rasmi PERKESO':'official PERKESO calculator',
    'Sila masukkan nilai.':'Enter an amount.',
    'Nilai perlu bukan negatif untuk penukaran ini.':'Enter a non-negative amount for this conversion.',
    'Mendapatkan kadar rujukan terkini...':'Fetching the latest reference rates…',
    'Kadar rujukan untuk pasangan mata wang ini belum tersedia.':'Reference rates for this currency pair are unavailable.',
    'Kadar rujukan terkini tidak tersedia. Cuba semula sebentar lagi.':'Current reference rates are unavailable. Try again shortly.',
    '(kadar rujukan; bukan kadar bank).':'(reference rate; bank rates may differ).',
    'Salin keputusan':'Copy result','Disalin ✓':'Copied ✓','Kira dahulu':'Calculate first',
    'Tidak dapat salin — cuba pelayar HTTPS':'Copying failed. Open the site over HTTPS and try again.',
    'Kongsi keputusan':'Share result',
    'Masukkan nilai yang sah dahulu.':'Enter valid values and calculate first.',
    'Disalin. Boleh tampal ke WhatsApp atau aplikasi lain.':'Copied. You can paste it into WhatsApp or another app.',
    'Perkongsian tidak disokong dalam pelayar ini.':'Sharing is unavailable in this browser.',
    'Perkongsian dibatalkan.':'Sharing was cancelled.',
    'Tidak dapat berkongsi dalam pelayar ini.':'Sharing failed in this browser.',
    'Nota: Semak maklumat dan syarat pengiraan pada laman web.':'See the website for calculation details and assumptions.',
    'Tempoh atau kadar pinjaman melebihi julat simulasi.':'The loan term or interest rate is outside the simulation range.',
    'Nilai pinjaman tidak dapat dikira.':'The loan amount could not be calculated.',
    'Masukkan nilai yang sah.':'Enter a valid value.',
    'Unit suhu tidak sah.':'Select valid temperature units.',
    'Suhu tidak boleh lebih rendah daripada sifar mutlak (-273.15°C).':'Temperature cannot be below absolute zero (-273.15°C).',
    'Mata wang tidak disokong.':'This currency is unsupported.',
    'Kadar langsung belum tersedia. Semak sambungan internet.':'Reference rates are unavailable. Check your internet connection.',
    'Unit tidak sah.':'Select valid units.',
    'Potongan melebihi gaji kasar. Semak nilai dimasukkan.':'Deductions exceed gross pay. Check the amounts entered.',
    'Pengganda OT tidak sah.':'Select a valid overtime multiplier.',
    'Sila gunakan tempoh ≤ 100 tahun dan pulangan ≤ 1200% setahun.':'Use a term of up to 100 years and an annual return of up to 1200%.',
    'Nilai simpanan terlalu besar.':'The savings amount is too large.',
    'Jumlah pinjaman':'Loan amount','Kadar faedah':'Interest rate','Tempoh pinjaman':'Loan term',
    'Pendapatan':'Income','Nisab':'Nisab','Gaji KWSP':'EPF pay','Gaji PERKESO':'PERKESO pay',
    'Gaji asas':'Basic pay','Elaun':'Allowance','Bayaran OT':'Overtime pay','Potongan lain':'Other deductions',
    'Hari bekerja':'Workdays','Jam OT':'Overtime hours',
    'Pendapatan tahunan':'Annual income','Pelepasan':'Tax relief','Simpanan awal':'Initial savings',
    'Simpanan bulanan':'Monthly savings','Tempoh':'Term','Pulangan':'Return rate'
  });
  const resultLabels={
    'Bayaran bulanan':'Monthly payment','Jumlah bayar':'Total repayment','Jumlah faedah':'Total interest',
    'Anggaran zakat pendapatan (2.5%)':'Estimated income zakat (2.5%)',
    'Gaji kasar':'Gross pay','KWSP pekerja (Part A)':'Employee EPF (Part A)',
    'SOCSO pekerja (Akta 4 kategori pertama)':'Employee SOCSO (Act 4 first category)',
    'EIS pekerja (Akta 800)':'Employee EIS (Act 800)',
    'Potongan lain':'Other deductions','Gaji bersih sebelum PCB (anggaran)':'Estimated net pay before PCB',
    'Kadar sejam asas':'Basic hourly rate','Kadar OT sejam':'Overtime hourly rate','Jumlah bayaran OT':'Total overtime pay',
    'Bahagian pekerja':'Employee contribution','Bahagian majikan':'Employer contribution',
    'Jumlah caruman (dibundarkan jika perlu)':'Total contribution (rounded where required)',
    'SOCSO pekerja':'Employee SOCSO','SOCSO majikan':'Employer SOCSO',
    'EIS pekerja':'Employee EIS','EIS majikan':'Employer EIS',
    'Jumlah potongan pekerja':'Total employee deductions',
    'Pendapatan bercukai':'Chargeable income','Cukai tahunan anggaran (YA 2025)':'Estimated annual tax (YA 2025)',
    'Purata bulanan':'Monthly average','Modal dan simpanan':'Initial balance and deposits',
    'Anggaran pulangan':'Estimated returns','Jumlah akhir':'Final balance','Tarikh kadar':'Rate date'
  };
  const textSources=new WeakMap();
  const attributeSources=new WeakMap();
  const controls=document.querySelector('[data-language-switch]');
  const workspace=document.querySelector('.workspace');
  const attributes=['aria-label','title'];
  let current='ms';
  let currencyNames;
  let rateDate;
  const translations=Object.assign(Object.create(null),english);
  function translate(source){
    if(current!=='en')return source;
    return source.replace(/^\s*(\S[\s\S]*?)\s*$/u,(match,phrase)=>{
      let translation=translations[phrase];
      if(!translation&&phrase.startsWith('/ '))translation='/ '+translate(phrase.slice(2));
      for(const [prefix,englishPrefix] of [['Buka kalkulator ','Open calculator: '],['Kongsi keputusan kalkulator ','Share result: ']]){
        if(!translation&&phrase.startsWith(prefix))translation=englishPrefix+translate(phrase.slice(prefix.length));
      }
      const colon=phrase.indexOf(':');
      if(!translation&&colon>=0&&Object.hasOwn(resultLabels,phrase.slice(0,colon))){
        translation=resultLabels[phrase.slice(0,colon)]+phrase.slice(colon);
      }
      const invalid=phrase.match(/^(.+) mesti (nombor bukan negatif yang sah|lebih daripada sifar)\.$/u);
      if(!translation&&invalid){
        translation=translate(invalid[1])+(invalid[2]==='lebih daripada sifar'
          ?' must be greater than zero.':' must be a valid non-negative number.');
      }
      return translation?match.replace(phrase,()=>translation):match;
    });
  }
  function localizeText(node){
    const parent=node.parentElement;
    if(!parent||parent.closest('script,style,[data-language-switch]'))return;
    const previous=textSources.get(node);
    const original=previous?.rendered===node.data?previous.original:node.data;
    let rendered=translate(original);
    if(parent.dataset.currency){
      const code=parent.dataset.currency;
      const name=currencyNames?.of(code);
      rendered=name?`${code} — ${name}`:code;
    }else if(parent.matches('time[data-rate-date]')){
      rendered=rateDate.format(new Date(parent.dateTime));
    }
    if(rendered!==node.data)node.data=rendered;
    if(previous||rendered!==original)textSources.set(node,{original,rendered});
  }
  function localizeTree(root){
    if(root.nodeType===Node.TEXT_NODE){localizeText(root);return;}
    if(root.nodeType!==Node.ELEMENT_NODE)return;
    const elements=[root,...root.querySelectorAll('[aria-label],[title]')];
    for(const element of elements){
      let originals=attributeSources.get(element);
      for(const name of attributes){
        if(!element.hasAttribute(name)||element===controls)continue;
        originals??={};
        originals[name]??=element.getAttribute(name);
        element.setAttribute(name,translate(originals[name]));
      }
      if(originals)attributeSources.set(element,originals);
    }
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    while(walker.nextNode())localizeText(walker.currentNode);
  }
  const observer=new MutationObserver(records=>{
    for(const record of records){
      if(record.type==='characterData')localizeText(record.target);
      else for(const node of record.addedNodes)localizeTree(node);
    }
    observer.takeRecords();
  });
  if(workspace)observer.observe(workspace,{childList:true,characterData:true,subtree:true});
  function setLanguage(language){
    current=language==='en'?'en':'ms';
    document.documentElement.lang=current;
    currencyNames=typeof Intl.DisplayNames==='function'?new Intl.DisplayNames(current,{type:'currency',fallback:'none'}):null;
    rateDate=new Intl.DateTimeFormat(current==='en'?'en-MY':'ms-MY',{dateStyle:'medium',timeZone:'Asia/Kuala_Lumpur'});
    localizeTree(document.documentElement);
    observer.takeRecords();
    controls.setAttribute('aria-label',translate('Bahasa paparan'));
    for(const button of controls.querySelectorAll('button')){
      button.setAttribute('aria-pressed',String(button.dataset.lang===current));
    }
  }
  let savedLanguage;
  try{savedLanguage=localStorage.getItem('kira-cepat-language');}catch{}
  setLanguage(savedLanguage);
  controls.hidden=false;
  controls.addEventListener('click',event=>{
    const button=event.target.closest('button[data-lang]');
    if(!button)return;
    setLanguage(button.dataset.lang);
    try{localStorage.setItem('kira-cepat-language',current);}catch{}
  });
  window.KiraLanguage={translate};
})();
