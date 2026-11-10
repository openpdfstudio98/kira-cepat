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
['salary','Gaji Bersih',field('Gaji asas bulanan (RM)','s_base',3500)+field('Elaun tetap (RM)','s_allow',200)+field('Bayaran OT (RM)','s_ot',0)+field('Potongan lain (RM)','s_other',0)+button('salary')+result('s_res')+note('Anggaran pekerja warganegara bawah 60 tahun. Tidak termasuk PCB, bonus atau pengecualian khusus. EPF menggunakan julat gaji Part A; SOCSO/EIS masih anggaran kasar, bukan potongan payroll yang tepat.')],
['ot','Kalkulator Overtime',field('Gaji asas sebulan (RM)','o_pay',3500)+field('Hari bekerja untuk asas kadar harian','o_days',26,'1')+field('Jam kerja sehari','o_daily',8,'0.5')+field('Jumlah jam OT','o_hours',10,'0.5')+'<label for="o_multi">Pengganda kadar OT</label><select id="o_multi"><option value="1.5">1.5×</option><option value="2">2.0×</option><option value="3">3.0×</option></select>'+button('ot')+result('o_res')+note('Anggaran menggunakan gaji bulanan ÷ hari bekerja ÷ jam sehari. Kelayakan, kaedah pengiraan dan kadar OT sebenar bergantung pada undang-undang serta kontrak pekerjaan.')],
['epf','Caruman KWSP / EPF',field('Gaji tertakluk caruman (RM)','e_pay',3500)+button('epf')+result('e_res')+note('Pengiraan julat gaji Jadual Ketiga KWSP (Part A), berkuat kuasa Oktober 2025, bagi warganegara Malaysia/PR bawah 60 tahun sahaja. Kes khusus, kadar sukarela dan kategori pekerja lain tidak termasuk. Untuk pekerja Malaysia bawah 60 tahun sahaja. <a href="https://www.kwsp.gov.my/en/employer/responsibilities/mandatory-contribution" target="_blank" rel="noopener noreferrer">KWSP rasmi</a>.')],
['socso','SOCSO & EIS',field('Gaji bulanan (RM)','p_pay',3500)+button('socso')+result('p_res')+note('ANGGARAN KASAR — BUKAN jadual caruman rasmi. SOCSO pekerja 0.5%, majikan 1.75%; EIS pekerja/majikan 0.2%, dengan had gaji RM6,000. Angka ini tidak sesuai untuk slip gaji atau remitan. Sila gunakan kalkulator rasmi PERKESO untuk kadar tepat. <a href="https://perkeso.gov.my/en/our-services/employer-employee/contributions" target="_blank" rel="noopener noreferrer">PERKESO rasmi</a>.')],
['tax','Cukai Pendapatan Individu',field('Pendapatan kasar tahunan (RM)','t_income',60000)+field('Jumlah pelepasan layak tahunan (RM)','t_relief',9000)+button('tax')+result('t_res')+note('Anggaran cukai pemastautin berdasarkan jadual Tahun Taksiran 2025. Pelepasan perlu dimasukkan sendiri; tidak mengambil kira rebat, PCB, pendapatan khas atau perubahan peraturan 2026. Bukan e-Filing rasmi. <a href="https://www.hasil.gov.my/en/individu/kadar-cukai/" target="_blank" rel="noopener noreferrer">LHDN rasmi</a>.')],
['savings','Matlamat Simpanan',field('Simpanan permulaan (RM)','v_start',1000)+field('Simpanan tambahan bulanan (RM)','v_month',300)+field('Tempoh (tahun)','v_years',5,'1')+field('Anggaran pulangan setahun (%)','v_rate',3,'0.1')+button('savings')+result('v_res')+note('Simulasi faedah kompaun bulanan dan sumbangan pada hujung bulan. Pulangan bukan jaminan; tidak mengambil kira inflasi, cukai atau yuran.')]];
const host=document.querySelector('.wrap');
const tabs=document.querySelector('.tabs');
sections.forEach(([id,title,body])=>{
  const tab=document.createElement('button');tab.type='button';tab.className='tab';tab.textContent=title==='Kalkulator Overtime'?'OT':title==='Kalkulator KWSP / EPF'?'EPF':({salary:'Gaji',epf:'EPF',socso:'SOCSO',tax:'Cukai',savings:'Simpanan'})[id]||title;
  tab.dataset.target=id;tab.addEventListener('click',()=>showV2(id));tabs.appendChild(tab);
  const card=document.createElement('section');card.id=id;card.className='card hidden';card.innerHTML='<h2>'+title+'</h2>'+body;
  host.insertBefore(card,document.querySelector('footer'));
});
const oldShow=window.show;
window.show=function(t){oldShow(t);sections.forEach(([id])=>$(id).classList.add('hidden'));document.querySelectorAll('.tab[data-target]').forEach(x=>x.classList.remove('active'));};
function showV2(t){['loan','zakat','conv'].forEach(id=>$(id).classList.add('hidden'));sections.forEach(([id])=>$(id).classList.toggle('hidden',id!==t));document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x.dataset.target===t));}
// KWSP Part A: Malaysian citizen/PR aged below 60. Official salary-band method
// for wages <= RM20,000 (effective October 2025). Do not apply to other categories.
function epfPartA(wage){
 if(wage===0)return {employee:0,employer:0,method:'schedule'};
 if(wage>20000){
   const emp=wage*.11,boss=wage*.12;
   // KWSP rounds total contributions including sen upward to a whole ringgit.
   const total=Math.ceil((emp+boss)-1e-9);
   return {employee:Math.round(emp*100)/100,employer:Math.round((total-emp)*100)/100,method:'percentage total rounded'};
 }
 if(wage<=10)return {employee:0,employer:0,method:'schedule'};
 const upper=wage<=5000 ? Math.ceil((wage-1e-9)/20)*20 : Math.ceil((wage-5000-1e-9)/100)*100+5000;
 return {employee:Math.ceil(upper*.11-1e-9),employer:Math.ceil(upper*(wage<=5000?.13:.12)-1e-9),method:'schedule bands'};
}
function approxContributions(gross){
 const epf=epfPartA(gross);
 const capped=Math.min(gross,6000);
 return {epf:epf.employee, socso:Math.round(capped*.005*100)/100, eis:Math.round(capped*.002*100)/100,
 employerEPF:epf.employer,employerSocso:Math.round(capped*.0175*100)/100,epfMethod:epf.method};
}

const calc={
 salary(){
 const gross=number('s_base')+number('s_allow')+number('s_ot');
 const c=approxContributions(gross),other=number('s_other'),take=gross-c.epf-c.socso-c.eis-other;
 output('s_res','Gaji kasar: <b>'+money(gross)+'</b><br>EPF pekerja (anggaran): '+money(c.epf)+'<br>SOCSO pekerja (anggaran): '+money(c.socso)+'<br>EIS pekerja (anggaran): '+money(c.eis)+'<br>Potongan lain: '+money(other)+'<br><strong>Gaji bersih sebelum PCB (anggaran): '+money(take)+'</strong>');
 },
 ot(){
 const pay=number('o_pay'),days=number('o_days',false),hours=number('o_daily',false),ot=number('o_hours'),multi=Number($('o_multi').value);
 const hourly=pay/days/hours,total=hourly*ot*multi;
 output('o_res','Kadar sejam asas: '+money(hourly)+'<br>Kadar OT sejam: '+money(hourly*multi)+'<br>Jumlah bayaran OT: <b>'+money(total)+'</b>');
 },
 epf(){
 const gross=number('e_pay'),c=approxContributions(gross);
 output('e_res','Bahagian pekerja: <b>'+money(c.epf)+'</b><br>Bahagian majikan: '+money(c.employerEPF)+'<br>Jumlah anggaran: '+money(c.epf+c.employerEPF));
 },
 socso(){
 const gross=number('p_pay'),c=approxContributions(gross),eisEmployer=c.eis;
 output('p_res','SOCSO pekerja: <b>'+money(c.socso)+'</b><br>SOCSO majikan: '+money(c.employerSocso)+'<br>EIS pekerja: '+money(c.eis)+'<br>EIS majikan: '+money(eisEmployer)+'<br>Jumlah potongan pekerja (anggaran): <strong>'+money(c.socso+c.eis)+'</strong>');
 },
 tax(){
 const income=number('t_income'),relief=number('t_relief'),chargeable=Math.max(0,income-relief);
 const bands=[[5000,0],[20000,.01],[35000,.03],[50000,.06],[70000,.11],[100000,.19],[400000,.25],[600000,.26],[2000000,.28],[Infinity,.30]];
 let previous=0,tax=0;for(const [limit,rate] of bands){const amount=Math.max(0,Math.min(chargeable,limit)-previous);tax+=amount*rate;previous=limit;if(chargeable<=limit)break;}
 output('t_res','Pendapatan bercukai: '+money(chargeable)+'<br>Cukai tahunan anggaran (YA 2025): <b>'+money(tax)+'</b><br>Purata bulanan: '+money(tax/12));
 },
 savings(){
 const start=number('v_start'),month=number('v_month'),years=number('v_years'),rate=number('v_rate')/100/12;
 if(years>100||rate>1)throw Error('Sila gunakan tempoh ≤ 100 tahun dan pulangan ≤ 1200% setahun.');
 const months=Math.round(years*12);let future=start;
 for(let i=0;i<months;i++)future=future*(1+rate)+month;
 const principal=start+month*months;
 output('v_res','Modal dan simpanan: '+money(principal)+'<br>Anggaran pulangan: '+money(future-principal)+'<br>Jumlah akhir: <b>'+money(future)+'</b>');
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