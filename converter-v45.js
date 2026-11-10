/* V4.5 currency: no hidden historical fallback; Celsius/Fahrenheit signed values allowed. */
(function(){
 'use strict';
 const math=window.KiraMath;
 const allowed=['MYR','USD','EUR','SGD','JPY','GBP'];
 const endpoint='https://api.exchangerate-api.com/v4/latest/MYR';
 let cache=null, updatedAt=0,loading=null,rateDate='';
 const result=document.getElementById('c_res');
 async function latest(){
  if(cache && Date.now()-updatedAt<60*60*1000)return cache;
  if(loading)return loading;
  loading=(async()=>{
   const controller=new AbortController();
   const timeout=setTimeout(()=>controller.abort(),9000);
   try{
    const response=await fetch(endpoint,{signal:controller.signal,cache:'no-store'});
    if(!response.ok)throw Error('HTTP '+response.status);
    const data=await response.json(),rates=data?.rates;
    if(!rates||!allowed.every(code=>Number.isFinite(Number(rates[code]))&&Number(rates[code])>0))throw Error('Kadar tidak lengkap.');
    const reportedDate=data.date;
    if(!/^\d{4}-\d{2}-\d{2}$/.test(reportedDate||''))throw Error('Tarikh kadar tidak tersedia.');
    const age=Date.now()-Date.parse(reportedDate+'T23:59:59Z');
    if(!Number.isFinite(age)||age>48*60*60*1000)throw Error('Kadar yang diterima terlalu lama.');
    cache=Object.fromEntries(allowed.map(k=>[k,Number(rates[k])]));
    updatedAt=Date.now();rateDate=reportedDate;
    return cache;
   }finally{clearTimeout(timeout);loading=null;}
  })();
  return loading;
 }
 window.calcConv=async function(){
  const type=document.getElementById('c_type').value;
  const input=document.getElementById('c_val');
  const from=document.getElementById('c_from').value,to=document.getElementById('c_to').value;
  const v=input.value;
  if(v.trim()===''){result.textContent='Sila masukkan nilai.';return;}
  if(type==='cur'&&from!==to){
   result.textContent='Mendapatkan kadar mata wang terkini...';
   try{
    const rates=await latest();
    const out=math.convert(type,v,from,to,rates);
    result.textContent='';
    const label=document.createElement('b');label.textContent=out.toFixed(4)+' '+to;
    result.append(document.createTextNode(v+' '+from+' = '),label,
     document.createElement('br'),document.createTextNode('Tarikh kadar: '+rateDate+' (kadar rujukan; bukan kadar bank).'));
   }catch(e){
    result.textContent='Kadar pertukaran langsung tidak tersedia atau terlalu lama. Tiada anggaran lama digunakan. Cuba semula apabila internet stabil.';
   }
   return;
  }
  try{
   const out=math.convert(type,v,from,to);
   result.textContent='';
   const label=document.createElement('b');label.textContent=out.toFixed(4)+' '+to;
   result.append(document.createTextNode(v+' '+from+' = '),label);
  }catch(e){result.textContent=e.message;}
 };
})();
