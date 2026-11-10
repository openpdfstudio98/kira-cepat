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
 const units={
  len:['m','km','cm','mm','inch','ft'],
  wgt:['kg','g','lb','oz'],
  tmp:['C','F','K'],
  cur:currencies
 };
 const endpoint='https://open.er-api.com/v6/latest/MYR';
 let cache=null, updatedAt=0,loading=null;
 const result=document.getElementById('c_res');
 const typeControl=document.getElementById('c_type');
 const fromControl=document.getElementById('c_from');
 const toControl=document.getElementById('c_to');
 const credit=document.getElementById('c_credit');
 const currencyNames=typeof Intl.DisplayNames==='function'?new Intl.DisplayNames('ms',{type:'currency',fallback:'none'}):null;
 function updateOptions(){
  const type=typeControl.value;
  for(const select of [fromControl,toControl]){
   select.replaceChildren(...units[type].map(code=>{
    const name=type==='cur'?currencyNames?.of(code):null;
    return new Option(name?`${code} — ${name}`:code,code);
   }));
  }
  toControl.selectedIndex=1;
  credit.hidden=type!=='cur';
 }
 typeControl.addEventListener('change',updateOptions);
 updateOptions();
 let requestId=0;
 function invalidate(){
  requestId++;
  result.dataset.resultReady='false';
  result.textContent='Isi nilai dan tekan Tukar.';
 }
 document.getElementById('conv').addEventListener('input',invalidate);
 document.getElementById('conv').addEventListener('change',invalidate);
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
 window.calcConv=async function(){
  const id=++requestId;
  result.dataset.resultReady='false';
  const type=typeControl.value;
  const input=document.getElementById('c_val');
  const from=fromControl.value,to=toControl.value;
  const v=input.value;
  if(v.trim()===''){result.textContent='Sila masukkan nilai.';return;}
  if(type==='cur'&&Number(v)<0){result.textContent='Nilai perlu bukan negatif untuk penukaran ini.';return;}
  if(type==='cur'&&from!==to){
   result.textContent='Mendapatkan kadar rujukan terkini...';
   try{
    const {rates,timestamp}=await latest();
    if(id!==requestId)return;
    if(!rates[from]||!rates[to]){result.textContent='Kadar rujukan untuk pasangan mata wang ini belum tersedia.';return;}
    const out=math.convert(type,v,from,to,rates);
    result.dataset.resultReady='true';
    result.textContent='';
    const label=document.createElement('b');label.textContent=out.toFixed(4)+' '+to;
    const rateDate=new Intl.DateTimeFormat('ms-MY',{dateStyle:'medium',timeZone:'Asia/Kuala_Lumpur'}).format(timestamp);
    result.append(document.createTextNode(v+' '+from+' = '),label,
     document.createElement('br'),document.createTextNode('Tarikh kadar: '+rateDate+' (kadar rujukan; bukan kadar bank).'));
   }catch(e){
    if(id!==requestId)return;
    result.textContent='Kadar rujukan terkini tidak tersedia. Cuba semula sebentar lagi.';
   }
   return;
  }
  try{
   const out=math.convert(type,v,from,to);
   result.dataset.resultReady='true';
   result.textContent='';
   const label=document.createElement('b');label.textContent=out.toFixed(4)+' '+to;
   result.append(document.createTextNode(v+' '+from+' = '),label);
  }catch(e){result.textContent=e.message;}
 };
})();
