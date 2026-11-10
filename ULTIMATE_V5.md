# Kira Cepat Ultimate V5

## Caruman dan skop semakan

- KWSP Jadual Ketiga Bahagian A, Oktober 2025. Kesemua 401 julat hingga RM20,000 disemak pada had bawah dan atas. Contoh bagi gaji lebih tinggi disemak dengan panduan KWSP, dan pembundaran jumlah dibuat sebelum bahagian pekerja dan majikan dipaparkan dalam sen.
- PERKESO Akta 4 kategori pertama dan Akta 800, Oktober 2024. Kesemua 65 baris setiap jadual disemak, termasuk gaji melebihi siling RM6,000.
- Gaji Bersih memasukkan OT ke dalam gaji kasar dan asas SOCSO/EIS. Asas KWSP menggunakan gaji asas dan elaun tertakluk caruman. Semakan kelayakan individu, klasifikasi elaun khusus dan PCB di luar skop simulasi.

Rujukan rasmi

- [KWSP Jadual Ketiga](https://www.kwsp.gov.my/en/epf-act-1991-third-schedule)
- [KWSP contoh caruman dan pembayaran OT](https://www.kwsp.gov.my/en/employer/responsibilities/mandatory-contribution)
- [PERKESO Kadar Caruman](https://www.perkeso.gov.my/en/contribution-rate/)
- [Buku Panduan PERKESO 2025, jadual Akta 4 dan Akta 800](https://www.perkeso.gov.my/images/dokumen/risalah/2025-BOOKLET_PERKESO_BI.pdf)

## Pengaktifan selepas semakan PR

- **Cloudflare Web Analytics.** Daftarkan hos produksi di Cloudflare Web Analytics, pilih pemasangan manual dan tetapkan `CF_WEB_ANALYTICS_TOKEN` pada persekitaran binaan produksi Workers. Gunakan token tapak daripada snippet, yang memang dikhaskan untuk kod awam. Elakkan pemasangan automatik berganda. Ukuran meliputi lawatan dan prestasi halaman. Pilihan tab tidak direkodkan sebagai lawatan tambahan dan input kalkulator kekal dalam pelayar.
- **Google AdSense.** Jika domain diterima dalam senarai Sites di AdSense, tetapkan `ADSENSE_PUBLISHER_ID` pada persekitaran binaan produksi. Gunakan ID format `pub-…` yang diberikan Google. Binaan menjana `/ads.txt` untuk pengesahan pemilikan. Semak status semakan AdSense dan persediaan privasi/persetujuan sebelum menambah skrip iklan. Halaman `/privasi/` menerangkan tingkah laku semasa dan perlu dikemas kini apabila iklan diaktifkan.
- Kedua-dua tetapan adalah pilihan dan dikecualikan daripada binaan branch preview yang dikenal pasti oleh Cloudflare. Jangan gunakan kunci API Cloudflare atau Google sebagai nilai tetapan ini.

Panduan rasmi

- [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/faq/)
- [Google AdSense Site Management](https://support.google.com/adsense/answer/12131223)
