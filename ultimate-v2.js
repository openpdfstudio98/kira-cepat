/* Ultimate V2: indicative Malaysia calculator utilities; not payroll or tax advice. */
(function(){
'use strict';
const $ = id => document.getElementById(id);
const money = n => 'RM ' + Number(n).toLocaleString('en-MY',{minimumFractionDigits:2,maximumFractionDigits:2});
const number = (id,allowZero=true) => {
  const el=$(id), n=Number(el.value);
  if(el.value.trim()===''||!Number.isFinite(n)||n<0||(!allowZero&&n===0)) throw Error('Sila isi nilai yang sah dan tidak negatif.');
  return n;
};
const output=(id,html)=>{$(id).innerHTML=html;};
const error=(id,e)=>output(id,'<span class="error">'+e.message+'</span>');
const field=(label,id,value,step='0.01')=>'<label for="'+id+'">'+label+'</label><input id="'+id+'" type="number" min="0" step="'+step+'" value="'+value+'">';
const result=id=>'<div class="result" id="'+id+'" role="status" aria-live="polite">Masukkan nilai dan tekan Kira.</div>';
const button=(method,label='Kira Sekarang')=>'<button type="button" class="calc" id="btn_'+method+'">'+label+'</button>';
const note=s=>'<p class="v2-note">'+s+'</p>';
const sections=[
['salary','Gaji Bersih',field('Gaji asas bulanan (RM)','s_base',3500)+field('Elaun tetap (RM)','s_allow',200)+field('Bayaran OT (RM)','s_ot',0)+field('Potongan lain (RM)','s_other',0)+'<label for="s_skbbk">Status LINDUNG 24 Jam / SKBBK (pekerja tempatan)</label><select id="s_skbbk"><option value="">-- Pilih status penyertaan --</option><option value="no">Tidak sertai (opt-out)</option><option value="yes">Sertai SKBBK</option></select>'+button('salary')+result('s_res')+note('Anggaran pekerja warganegara bawah 60 tahun. Tidak termasuk PCB, bonus atau pengecualian khusus. EPF menggunakan Jadual Ketiga Part A gaji layak sahaja (bayaran OT tidak tertakluk KWSP). SOCSO/EIS daripada jadual PERKESO Kategori Pertama; pilihan SKBBK tempatan perlu ditetapkan. PCB tidak termasuk. Sila sahkan kelayakan pekerja dan jenis elaun.')],
['ot','Kalkulator Overtime',field('Gaji asas sebulan (RM)','o_pay',3500)+field('Hari bekerja untuk asas kadar harian','o_days',26,'1')+field('Jam kerja sehari','o_daily',8,'0.5')+field('Jumlah jam OT','o_hours',10,'0.5')+'<label for="o_multi">Pengganda kadar OT</label><select id="o_multi"><option value="1.5">1.5×</option><option value="2">2.0×</option><option value="3">3.0×</option></select>'+button('ot')+result('o_res')+note('Anggaran menggunakan gaji bulanan ÷ hari bekerja ÷ jam sehari. Kelayakan, kaedah pengiraan dan kadar OT sebenar bergantung pada undang-undang serta kontrak pekerjaan.')],
['epf','Caruman KWSP / EPF',field('Gaji tertakluk caruman (RM)','e_pay',3500)+button('epf')+result('e_res')+note('Pengiraan julat gaji Jadual Ketiga KWSP (Part A), berkuat kuasa Oktober 2025, bagi warganegara Malaysia/PR bawah 60 tahun sahaja. Kes khusus, kadar sukarela dan kategori pekerja lain tidak termasuk. Untuk pekerja Malaysia bawah 60 tahun sahaja. <a href="https://www.kwsp.gov.my/en/employer/responsibilities/mandatory-contribution" target="_blank" rel="noopener noreferrer">KWSP rasmi</a>.')],
['socso','SOCSO & EIS',field('Gaji bulanan (RM)','p_pay',3500)+'<label for="p_skbbk">Status LINDUNG 24 Jam / SKBBK (pekerja tempatan)</label><select id="p_skbbk"><option value="">-- Pilih status penyertaan --</option><option value="no">Tidak sertai (opt-out)</option><option value="yes">Sertai SKBBK</option></select>'+button('socso')+result('p_res')+note('Berdasarkan jadual PERKESO Akta 4 Kategori Pertama (Jun 2026) dan Akta 800 (Oktober 2024). Untuk pekerja tempatan kategori pertama: LINDUNG 24 Jam / SKBBK ialah skim sukarela; status mesti dipilih. Kategori lain dan pengecualian tidak diliputi. Sila gunakan kalkulator rasmi PERKESO untuk kadar tepat. <a href="https://perkeso.gov.my/en/our-services/employer-employee/contributions" target="_blank" rel="noopener noreferrer">PERKESO rasmi</a>.')],
['tax','Cukai Pendapatan Individu',field('Pendapatan kasar tahunan (RM)','t_income',60000)+field('Jumlah pelepasan layak tahunan (RM)','t_relief',9000)+button('tax')+result('t_res')+note('Anggaran cukai pemastautin berdasarkan jadual Tahun Taksiran 2025. Pelepasan perlu dimasukkan sendiri; tidak mengambil kira rebat, PCB, pendapatan khas atau perubahan peraturan 2026. Bukan e-Filing rasmi. <a href="https://www.hasil.gov.my/en/individu/kadar-cukai/" target="_blank" rel="noopener noreferrer">LHDN rasmi</a>.')],
['savings','Matlamat Simpanan',field('Simpanan permulaan (RM)','v_start',1000)+field('Simpanan tambahan bulanan (RM)','v_month',300)+field('Tempoh (tahun)','v_years',5,'1')+field('Anggaran pulangan setahun (%)','v_rate',3,'0.1')+button('savings')+result('v_res')+note('Simulasi faedah kompaun bulanan dan sumbangan pada hujung bulan. Pulangan bukan jaminan; tidak mengambil kira inflasi, cukai atau yuran.')]];
const host=document.querySelector('.workspace-content');
const tabs=document.querySelector('.tabs');
sections.forEach(([id,title,body])=>{
  const tab=document.createElement('button');tab.type='button';tab.className='tab';tab.textContent=title==='Kalkulator Overtime'?'OT':title==='Kalkulator KWSP / EPF'?'EPF':({salary:'Gaji',epf:'EPF',socso:'SOCSO',tax:'Cukai',savings:'Simpanan'})[id]||title;
  tab.dataset.target=id;
  const number=String(4+sections.findIndex(section=>section[0]===id)).padStart(2,'0');
  const label=tab.textContent;
  const symbol=document.createElement('span');symbol.className='tab-icon';symbol.setAttribute('aria-hidden','true');symbol.textContent=number;
  tab.textContent='';tab.appendChild(symbol);tab.appendChild(document.createTextNode(label));
  tab.addEventListener('click',()=>showV2(id));tabs.appendChild(tab);
  const card=document.createElement('section');card.id=id;card.className='card hidden';card.innerHTML='<h2>'+title+'</h2>'+body;
  host.appendChild(card);
});
const oldShow=window.show;
window.show=function(t){oldShow(t);sections.forEach(([id])=>$(id).classList.add('hidden'));document.querySelectorAll('.tab[data-target]').forEach(x=>x.classList.remove('active'));};
function showV2(t){['loan','zakat','conv'].forEach(id=>$(id).classList.add('hidden'));sections.forEach(([id])=>$(id).classList.toggle('hidden',id!==t));document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x.dataset.target===t));}
// KWSP Part A: Malaysian citizen/PR aged below 60. Official salary-band method
// for wages <= RM20,000 (effective October 2025). Do not apply to other categories.
const math=window.KiraMath;
if(!math)throw Error('Modul pengiraan KiraMath tidak dimuat.');
const optIn=id=>{const val=$(id).value;if(!['yes','no'].includes(val))throw Error('Sila pilih status penyertaan SKBBK dahulu.');return val==='yes';};
const calc={
 salary(){
  const r=math.salary(number('s_base'),number('s_allow'),number('s_ot'),number('s_other'),{skbbk:optIn('s_skbbk')});
  output('s_res','Gaji kasar: <b>'+money(r.gross)+'</b><br>Gaji tertakluk KWSP (tanpa OT): '+money(r.epfWage)+'<br>KWSP pekerja: '+money(r.epf)+'<br>SOCSO pekerja (Akta 4): '+money(r.socsoInvalidity)+'<br>SKBBK pekerja ('+(r.skbbkIncluded?'sertai':'tidak sertai')+'): '+money(r.skbbk)+'<br>EIS pekerja (Akta 800): '+money(r.eis)+'<br>Potongan lain: '+money(r.other)+'<br><strong>Gaji bersih sebelum PCB (anggaran): '+money(r.net)+'</strong><br><small>Andaian: pekerja tempatan bawah 60 tahun, Kategori Pertama; elaun adalah layak caruman. Bukan slip gaji rasmi.</small>');
 },
 ot(){
  const r=math.overtime(number('o_pay'),number('o_days',false),number('o_daily',false),number('o_hours'),$('o_multi').value);
  output('o_res','Kadar sejam asas: '+money(r.hourly)+'<br>Kadar OT sejam: '+money(r.otHourly)+'<br>Jumlah bayaran OT: <b>'+money(r.total)+'</b>');
 },
 epf(){
  const r=math.epfPartA(number('e_pay'));
  output('e_res','Bahagian pekerja: <b>'+money(r.employee)+'</b><br>Bahagian majikan: '+money(r.employer)+'<br>Jumlah anggaran: '+money(r.employee+r.employer)+'<br><small>Jadual Ketiga KWSP Part A (Oktober 2025); pekerja Malaysia/PR bawah 60 tahun sahaja.</small>');
 },
 socso(){
  const c=math.approxContributions(number('p_pay'),{skbbk:optIn('p_skbbk')});
  output('p_res','<strong>Jadual PERKESO Akta 4 & Akta 800 — Kategori Pertama</strong><br>SOCSO pekerja (Skim Keilatan): '+money(c.socsoInvalidity)+'<br>SKBBK pekerja ('+(c.skbbkIncluded?'sertai':'tidak sertai')+'): '+money(c.skbbk)+'<br><b>Jumlah SOCSO pekerja: '+money(c.socso)+'</b><br>SOCSO majikan: '+money(c.employerSocso)+'<br>EIS pekerja: '+money(c.eis)+'<br>EIS majikan: '+money(c.employerEis)+'<br><strong>Jumlah potongan pekerja SOCSO + EIS: '+money(c.socso+c.eis)+'</strong><br><small>Gaji caruman tertakluk siling RM6,000. Semak <a href="https://www.perkeso.gov.my/perkhidmatan-kami/majikan-pekerja/kalkulator-caruman.html" target="_blank" rel="noopener noreferrer">PERKESO rasmi</a> untuk kelayakan dan remitan.</small>');
 },
 tax(){
  const r=math.taxYA2025(number('t_income'),number('t_relief'));
  output('t_res','Pendapatan bercukai: '+money(r.chargeable)+'<br>Cukai tahunan anggaran (YA '+r.year+'): <b>'+money(r.tax)+'</b><br>Purata bulanan: '+money(r.monthly));
 },
 savings(){
  const r=math.savings(number('v_start'),number('v_month'),number('v_years'),number('v_rate'));
  output('v_res','Modal dan simpanan: '+money(r.principal)+'<br>Anggaran pulangan: '+money(r.returnAmount)+'<br>Jumlah akhir: <b>'+money(r.balance)+'</b>');
 }
};
const resultIds={salary:'s_res',ot:'o_res',epf:'e_res',socso:'p_res',tax:'t_res',savings:'v_res'};
function runCalc(k){try{calc[k]();}catch(e){error(resultIds[k],e);}}
Object.keys(calc).forEach(k=>{
 $('btn_'+k).addEventListener('click',()=>runCalc(k));
 const panel=$(k);
 const fields=panel.querySelectorAll('input,select');
 let initialized=false;
 fields.forEach(el=>el.addEventListener(el.tagName==='SELECT'?'change':'input',()=>{
   if(initialized||Array.from(fields).some(f=>f.value.trim()===''))return;
   initialized=true;runCalc(k);initialized=false;
 }));
 const copy=document.createElement('button');copy.type='button';copy.className='v2-copy';copy.textContent='Salin keputusan';
 copy.addEventListener('click',async()=>{
  const data=$(resultIds[k]).innerText.trim();
  if(!data||data.startsWith('Masukkan nilai'))return;
  try{await navigator.clipboard.writeText('Kira Cepat — '+panel.querySelector('h2').textContent+'\n'+data);copy.textContent='Disalin ✓';}
  catch(e){copy.textContent='Tidak dapat salin — cuba pelayar HTTPS';}
 });
 $(resultIds[k]).insertAdjacentElement('afterend',copy);
 runCalc(k);
});
})();