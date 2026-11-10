/* V4.5 legacy calculator adapters; preserve button labels and Premium Black UI. */
(function(){
'use strict';
const math=window.KiraMath;
const el=id=>document.getElementById(id);
const value=id=>el(id).value;
const fmt=n=>'RM '+Number(n).toLocaleString('en-MY',{minimumFractionDigits:2,maximumFractionDigits:2});
const loanCard=el('loan');
function offerFields(prefix,heading,defaultMethod){
 const id=key=>prefix+key;
 return `<fieldset class="loan-offer">
  <legend>${heading}</legend>
  <label for="${id('method')}">Kaedah pinjaman</label>
  <select id="${id('method')}"><option value="reducing">Baki berkurangan</option><option value="flat"${defaultMethod==='flat'?' selected':''}>Kadar rata</option></select>
  <label for="${id('amt')}">Harga atau jumlah pinjaman (RM)</label>
  <input id="${id('amt')}" type="number" min="0" step="any" value="10000">
  <label for="${id('deposit')}">Deposit (RM)</label>
  <input id="${id('deposit')}" type="number" min="0" step="any" value="0">
  <label for="${id('rate')}">Kadar tahunan mengikut kaedah (%)</label>
  <input id="${id('rate')}" type="number" min="0" step="any" value="5">
  <label for="${id('years')}">Tempoh (tahun)</label>
  <input id="${id('years')}" type="number" min="0" step="any" value="5">
 </fieldset>`;
}
el('loan_pro_fields').innerHTML=`<label class="loan-compare"><input id="l_compare" type="checkbox" aria-controls="loan_offer_b"> Bandingkan dua tawaran</label>
 <div class="loan-grid">${offerFields('l_','Tawaran A','reducing')}
 <div id="loan_offer_b" hidden>${offerFields('lb_','Tawaran B','flat')}</div></div>`;
const compare=el('l_compare');
compare.addEventListener('change',()=>{
 el('loan_offer_b').hidden=!compare.checked;
 loanCard.classList.toggle('loan-comparing',compare.checked);
});
function readOffer(prefix){
 return math.loanOffer(...['amt','deposit','rate','years','method'].map(key=>value(prefix+key)));
}
function offerResult(heading,offer){
 const group=document.createElement('section');
 const title=document.createElement('h3');
 title.textContent=heading;
 group.append(title);
 const lines=[
  ['Bayaran bulanan',offer.monthly],['Jumlah pinjaman',offer.principal],
  ['Jumlah faedah',offer.interest],['Jumlah bayar',offer.total],
  ['Jumlah keluar termasuk deposit',offer.outlay]
 ];
 for(const [label,amount] of lines){
  const row=document.createElement('div');
  const strong=document.createElement('b');
  strong.textContent=fmt(amount);
  row.append(label+': ',strong);
  group.append(row);
 }
 return group;
}
window.calcLoan=function(){
 const out=el('l_res');
 out.dataset.resultReady='false';
 try{
  const a=readOffer('l_');
  const b=compare.checked?readOffer('lb_'):null;
  const grid=document.createElement('div');
  grid.className='loan-grid';
  grid.append(offerResult('Tawaran A',a));
  if(b)grid.append(offerResult('Tawaran B',b));
  out.replaceChildren(grid);
  if(b){
   const diff=Math.round(a.outlay*100)-Math.round(b.outlay*100);
   const summary=document.createElement('p');
   summary.className='loan-difference';
   summary.textContent=diff===0?'Jumlah keluar kedua-dua tawaran sama.':
    (diff>0?'Tawaran B lebih rendah sebanyak: ':'Tawaran A lebih rendah sebanyak: ')+fmt(Math.abs(diff)/100);
   out.append(summary);
  }
  out.dataset.resultReady='true';
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
