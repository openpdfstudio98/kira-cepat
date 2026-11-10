/* V4.5 legacy calculator adapters; preserve button labels and Premium Black UI. */
(function(){
'use strict';
const math=window.KiraMath;
const el=id=>document.getElementById(id);
const value=id=>el(id).value;
const fmt=n=>'RM '+Number(n).toLocaleString('en-MY',{minimumFractionDigits:2,maximumFractionDigits:2});
window.calcLoan=function(){
 const out=el('l_res');
 out.dataset.resultReady='false';
 try{
  const r=math.loan(value('l_amt'),value('l_rate'),value('l_years'));
  out.textContent='';
  out.dataset.resultReady='true';
  const strong=document.createElement('b');strong.textContent=fmt(r.monthly);
  out.append('Bayaran bulanan: ',strong,document.createElement('br'),'Jumlah bayar: '+fmt(r.total),document.createElement('br'),'Jumlah faedah: '+fmt(r.interest));
 }catch(e){out.textContent=e.message;}
};
window.calcZakat=function(){
 const out=el('z_res');
 out.dataset.resultReady='false';
 try{
  const r=math.zakat(value('z_inc'),value('z_nisab'));
  out.textContent='';
  out.dataset.resultReady='true';
  if(!r.eligible){out.textContent='Pendapatan tahunan kurang nisab. Tiada zakat pendapatan dalam simulasi asas ini.';return;}
  const strong=document.createElement('b');strong.textContent=fmt(r.due);
  out.append('Anggaran zakat pendapatan (2.5%): ',strong);
 }catch(e){out.textContent=e.message;}
};
})();
