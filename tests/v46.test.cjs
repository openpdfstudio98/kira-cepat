const test=require('node:test');const assert=require('node:assert/strict');
const T=require('../contribution-tables-v46.js');const M=require('../calc-core-v45.js');
const eq=(a,b)=>assert.equal(Math.round(a*100),Math.round(b*100));
test('PERKESO official 2026 SKBBK Act4 first category: all 64 ordered wage bands',()=>{
 assert.equal(T.bandCaps.length,64);assert.equal(T.bandCaps[0],30);assert.equal(T.bandCaps[63],6000);
 for(let i=1;i<64;i++)assert.ok(T.bandCaps[i]>T.bandCaps[i-1]);
 for(let i=0;i<64;i++){
  const wage=T.bandCaps[i];const a=T.perkeso(wage,{skbbk:false}),b=T.perkeso(wage,{skbbk:true});
  eq(b.socso,a.socso+b.skbbk);
  eq(a.socsoInvalidity,a.socso);
  eq(a.skbbk,0);eq(a.employerSocso,b.employerSocso);
  eq(a.eis,b.eis);eq(a.employerEis,a.eis);
  assert.ok(a.socso>=0&&a.eis>0);
  if(i<63){const next=T.perkeso(wage+.01);assert.ok(next.eis>=a.eis);}
 }
});
test('PERKESO current published wage-specific anchor amounts and opt-in differences',()=>{
 assert.deepEqual({employer:T.perkeso(30).employerSocso,invalidity:T.perkeso(30).socso,skbbk:T.perkeso(30,{skbbk:true}).skbbk},{employer:.40,invalidity:.10,skbbk:.20});
 eq(T.perkeso(3500).socso,17.25);eq(T.perkeso(3500,{skbbk:true}).socso,43.10);
 eq(T.perkeso(4150).socso,20.75);eq(T.perkeso(4150,{skbbk:true}).socso,51.90);
 eq(T.perkeso(4150).employerSocso,72.65);
 eq(T.perkeso(6000).socso,29.75);eq(T.perkeso(6000,{skbbk:true}).socso,74.40);
 eq(T.perkeso(6000).employerSocso,104.15);
 eq(T.perkeso(20000,{skbbk:true}).socso,74.40);eq(T.perkeso(20000).eis,11.90);
 eq(T.perkeso(0).socso,0);eq(T.perkeso(0).eis,0);
 assert.throws(()=>T.perkeso(-1));assert.throws(()=>T.perkeso(1000,{skbbk:'yes'}));
});
test('EIS Act 800 official early and later brackets',()=>{
 const pairs=[[30,.05],[30.01,.10],[50,.10],[50.01,.15],[100,.20],[140,.25],[200,.35],[300,.50],[400,.70],[500,.90],[600,1.10],[1000,1.90],[3500,6.90],[6000,11.90],[6000.01,11.90]];
 for(const [w,expected] of pairs)eq(T.perkeso(w).eis,expected);
});
test('KWSP Part A Oct 2025 low-wage, regular brackets, threshold and >20k',()=>{
 assert.equal(T.kwspBandCount,401);
 const samples=[
  [0,0,0],[10,0,0],[10.01,3,3],[20,3,3],[20.01,5,6],[40.01,7,8],
  [240,27,32],[3250,359,424],[5000,550,650],[5000.01,561,612],
  [14800,1628,1776],[20000,2200,2400],[20001,2200.11,2400.89]
 ];
 for(const [w,employee,employer] of samples){const a=T.kwsp(w);eq(a.employee,employee);eq(a.employer,employer);}
 assert.throws(()=>T.kwsp(-1));
});
test('Net salary excludes overtime from KWSP wage, includes overtime in PERKESO wage',()=>{
 const r=M.salary(3000,200,300,0,{skbbk:true});
 eq(r.gross,3500);eq(r.epfWage,3200);
 eq(r.epf,T.kwsp(3200).employee);
 eq(r.socso,T.perkeso(3500,{skbbk:true}).socso);
 eq(r.skbbk,25.85);eq(r.eis,6.90);
 eq(r.net,3500-r.epf-r.socso-r.eis);
 assert.equal(r.source,'official-schedule');
});
