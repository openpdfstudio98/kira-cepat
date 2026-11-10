/* V4.5 currency: no hidden historical fallback; Celsius/Fahrenheit signed values allowed. */
(function(){
 'use strict';
 const math=window.KiraMath;
 // Currency codes published by the open MYR feed. Keep the selector usable offline.
 const currencies=`MYR USD AED AFN ALL AMD ANG AOA ARS AUD AWG AZN BAM BBD BDT BGN BHD BIF BMD BND BOB BRL BSD
BTN BWP BYN BZD CAD CDF CHF CLF CLP CNH CNY COP CRC CUP CVE CZK DJF DKK DOP DZD EGP ERN ETB
EUR FJD FKP FOK GBP GEL GGP GHS GIP GMD GNF GTQ GYD HKD HNL HRK HTG HUF IDR IMP INR IQD IRR
ISK JEP JMD JOD JPY KES KGS KHR KID KMF KRW KWD KYD KZT LAK LBP LKR LRD LSL LYD MAD MDL MGA
MKD MMK MNT MOP MRU MUR MVR MWK MXN MZN NAD NGN NIO NOK NPR NZD OMR PAB PEN PGK PHP PKR PLN
PYG QAR RON RSD RUB RWF SAR SBD SCR SDG SEK SGD SHP SLE SLL SOS SRD SSP STN SYP SZL THB TJS
TMT TND TOP TRY TTD TVD TWD TZS UAH UGX UYU UZS VES VND VUV WST XAF XCD XCG XDR XOF XPF YER
ZAR ZMW ZWG ZWL`.split(/\s+/);
 const units={len:['m','km','cm','mm','inch','ft'],wgt:['kg','g','lb','oz'],tmp:['C','F','K']};
 const endpoint='https://open.er-api.com/v6/latest/MYR';
 const byId=id=>document.getElementById(id);
 const unitCard=byId('conv');
 unitCard.insertAdjacentHTML('afterend',`<section id="currency" class="card hidden">
  <h2>Penukar Mata Wang</h2>
  <div class="row currency-pair">
    <div><label for="fx_search_from">Cari mata wang asal</label><input id="fx_search_from" class="currency-search" type="search" autocomplete="off" aria-controls="fx_from">
    <label for="fx_from">Dari</label><select id="fx_from"></select><p class="currency-search-status" role="status" hidden>Tiada mata wang sepadan.</p></div>
    <button class="secondary-button currency-swap" id="fx_swap" type="button" aria-label="Tukar arah mata wang">⇄</button>
    <div><label for="fx_search_to">Cari mata wang sasaran</label><input id="fx_search_to" class="currency-search" type="search" autocomplete="off" aria-controls="fx_to">
    <label for="fx_to">Ke</label><select id="fx_to"></select><p class="currency-search-status" role="status" hidden>Tiada mata wang sepadan.</p></div>
  </div>
  <label for="fx_val">Nilai</label><input id="fx_val" type="number" min="0" step="any" value="1">
  <button type="button" class="calc" id="btn_currency">Tukar</button>
  <div class="result" id="fx_res">Isi nilai dan tekan Tukar.</div>
  <p class="v2-note"><a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a> · Kadar rujukan harian.</p>
 </section>`);
 function writeResult(result,value,from,to,converted){
  const amount=document.createElement('b');
  amount.textContent=converted.toFixed(4)+' '+to;
  result.replaceChildren(value+' '+from+' = ',amount);
  result.dataset.resultReady='true';
 }
 function clearResult(result){
  result.dataset.resultReady='false';
  result.textContent='Isi nilai dan tekan Tukar.';
 }
 const unitType=byId('c_type');
 const unitResult=byId('c_res');
 function updateUnits(){
  for(const id of ['c_from','c_to'])byId(id).replaceChildren(...units[unitType.value].map(code=>new Option(code,code)));
  byId('c_to').selectedIndex=1;
 }
 updateUnits();
 unitType.addEventListener('change',updateUnits);
 unitCard.addEventListener('input',()=>clearResult(unitResult));
 unitCard.addEventListener('change',()=>clearResult(unitResult));
 byId('btn_unit').addEventListener('click',()=>{
  const value=byId('c_val').value,from=byId('c_from').value,to=byId('c_to').value;
  unitResult.dataset.resultReady='false';
  try{writeResult(unitResult,value,from,to,math.convert(unitType.value,value,from,to));}
  catch(e){unitResult.textContent=e.message;}
 });
 const hasDisplayNames=typeof Intl.DisplayNames==='function';
 const malayNames=hasDisplayNames?new Intl.DisplayNames('ms',{type:'currency',fallback:'none'}):null;
 const englishNames=hasDisplayNames?new Intl.DisplayNames('en',{type:'currency',fallback:'none'}):null;
 const normalize=text=>text.normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase().trim();
 const searchNames=new Map(currencies.map(code=>[code,normalize([code,malayNames?.of(code),englishNames?.of(code)].join(' '))]));
 const clearSearch=[];
 for(const direction of ['from','to']){
  const select=byId('fx_'+direction);
  const search=byId('fx_search_'+direction);
  const status=select.nextElementSibling;
  select.replaceChildren(...currencies.map(code=>{
   const name=malayNames?.of(code);
   const option=new Option(name?`${code} — ${name}`:code,code);
   option.dataset.currency=code;
   return option;
  }));
  function filter(){
   const query=normalize(search.value);
   const matches=[];
   for(const option of select.options){
    const matched=searchNames.get(option.value).includes(query);
    option.hidden=!matched&&!option.selected;
    if(matched)matches.push(option.value);
   }
   status.hidden=matches.length>0;
   return matches;
  }
  search.addEventListener('input',filter);
  search.addEventListener('keydown',event=>{
   if(event.key!=='Enter'||!search.value.trim())return;
   event.preventDefault();
   const matches=filter();
   const exact=search.value.trim().toUpperCase();
   const choice=matches.includes(exact)?exact:matches[0];
   if(!choice)return;
   select.value=choice;
   select.dispatchEvent(new Event('change',{bubbles:true}));
   select.focus();
  });
  function reset(){search.value='';filter();}
  clearSearch.push(reset);
  select.addEventListener('change',reset);
 }
 byId('fx_swap').addEventListener('click',()=>{
  const from=byId('fx_from'),to=byId('fx_to');
  [from.value,to.value]=[to.value,from.value];
  clearSearch.forEach(reset=>reset());
  byId('btn_currency').click();
 });
 byId('fx_to').value='USD';
 const result=byId('fx_res');
 let cache=null,updatedAt=0,loading=null,requestId=0;
 function invalidate(event){
  if(event.target.matches('.currency-search'))return;
  requestId++;clearResult(result);
 }
 byId('currency').addEventListener('input',invalidate);
 byId('currency').addEventListener('change',invalidate);
 async function latest(){
  const now=Date.now();
  if(cache&&now-updatedAt<60*60*1000&&now-cache.timestamp<=48*60*60*1000)return cache;
  if(loading)return loading;
  loading=(async()=>{
   const controller=new AbortController();
   const timeout=setTimeout(()=>controller.abort(),9000);
   try{
    const response=await fetch(endpoint,{signal:controller.signal,cache:'no-store'});
    if(!response.ok)throw Error('HTTP '+response.status);
    const data=await response.json();
    if(data?.result!=='success'||data.base_code!=='MYR'||data.rates?.MYR!==1)throw Error('Kadar tidak lengkap.');
    const timestamp=data.time_last_update_unix*1000;
    const age=Date.now()-timestamp;
    if(!Number.isFinite(age)||age<0||age>48*60*60*1000)throw Error('Tarikh kadar tidak sah atau terlalu lama.');
    const rates=Object.fromEntries(currencies.filter(code=>Number.isFinite(data.rates[code])&&data.rates[code]>0)
     .map(code=>[code,data.rates[code]]));
    cache={rates,timestamp};
    updatedAt=Date.now();
    return cache;
   }finally{clearTimeout(timeout);loading=null;}
  })();
  return loading;
 }
 byId('btn_currency').addEventListener('click',async()=>{
  const id=++requestId;
  result.dataset.resultReady='false';
  const value=byId('fx_val').value,from=byId('fx_from').value,to=byId('fx_to').value;
  if(value.trim()===''){result.textContent='Sila masukkan nilai.';return;}
  if(Number(value)<0){result.textContent='Nilai perlu bukan negatif untuk penukaran ini.';return;}
  if(from===to){
   writeResult(result,value,from,to,math.convert('cur',value,from,to));
   return;
  }
  result.textContent='Mendapatkan kadar rujukan terkini...';
  try{
   const {rates,timestamp}=await latest();
   if(id!==requestId)return;
   if(!rates[from]||!rates[to]){result.textContent='Kadar rujukan untuk pasangan mata wang ini belum tersedia.';return;}
   writeResult(result,value,from,to,math.convert('cur',value,from,to,rates));
   const date=document.createElement('time');
   date.dataset.rateDate='';
   date.dateTime=new Date(timestamp).toISOString();
   date.textContent=new Intl.DateTimeFormat('ms-MY',{dateStyle:'medium',timeZone:'Asia/Kuala_Lumpur'}).format(timestamp);
   result.append(document.createElement('br'),'Tarikh kadar: ',date,' (kadar rujukan; bukan kadar bank).');
  }catch(e){
   if(id!==requestId)return;
   result.textContent='Kadar rujukan terkini tidak tersedia. Cuba semula sebentar lagi.';
  }
 });
})();
