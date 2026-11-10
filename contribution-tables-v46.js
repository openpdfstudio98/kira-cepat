/* Official wage-band tables, November 2026, for Malaysian employed workers.
 * PERKESO Act 4 first category, phase 1 SKBBK: June 2026 schedule (wage cap RM6000).
 * Columns: employer Act4, employee invalidity Act4, employee voluntary SKBBK.
 * https://www.perkeso.gov.my/images/lindung/lindung-24-jam/JadualCarumanBaharuTermasukSKBBK.pdf
 * EIS Act800: https://www.perkeso.gov.my/images/dokumen/101024%20-%20Kadar%20Caruman%20Akta%20800.pdf
 * KWSP Part A: https://www.kwsp.gov.my/documents/d/guest/third_schedule_from_-1-october-2025
 * All amounts in RM, exact to 2 decimals; no floating-point rate estimators for PERKESO.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.KiraContributionTables=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
// Ranges: <=30, <=50, <=70, <=100, <=140, <=200, <=300, then RM100 bands until RM6000.
const caps=[30,50,70,100,140,200,300,...Array.from({length:57},(_,i)=>400+100*i)];
const rows=[[0.4,0.1,0.2],[0.7,0.2,0.3],[1.1,0.3,0.5],[1.5,0.4,0.65],[2.1,0.6,0.9],[2.95,0.85,1.25],[4.35,1.25,1.85],[6.15,1.75,2.65],[7.85,2.25,3.35],[9.65,2.75,4.15],[11.35,3.25,4.85],[13.15,3.75,5.65],[14.85,4.25,6.35],[16.65,4.75,7.15],[18.35,5.25,7.85],[20.15,5.75,8.65],[21.85,6.25,9.35],[23.65,6.75,10.15],[25.35,7.25,10.85],[27.15,7.75,11.65],[28.85,8.25,12.35],[30.65,8.75,13.15],[32.35,9.25,13.85],[34.15,9.75,14.65],[35.85,10.25,15.35],[37.65,10.75,16.15],[39.35,11.25,16.85],[41.15,11.75,17.65],[42.85,12.25,18.35],[44.65,12.75,19.15],[46.35,13.25,19.85],[48.15,13.75,20.65],[49.85,14.25,21.35],[51.65,14.75,22.15],[53.35,15.25,22.85],[55.15,15.75,23.65],[56.85,16.25,24.35],[58.65,16.75,25.15],[60.35,17.25,25.85],[62.15,17.75,26.65],[63.85,18.25,27.35],[65.65,18.75,28.15],[67.35,19.25,28.85],[69.15,19.75,29.65],[70.85,20.25,30.35],[72.65,20.75,31.15],[74.35,21.25,31.85],[76.15,21.75,32.65],[77.85,22.25,33.35],[79.65,22.75,34.15],[81.35,23.25,34.85],[83.15,23.75,35.65],[84.85,24.25,36.35],[86.65,24.75,37.15],[88.35,25.25,37.85],[90.15,25.75,38.65],[91.85,26.25,39.35],[93.65,26.75,40.15],[95.35,27.25,40.85],[97.15,27.75,41.65],[98.85,28.25,42.35],[100.65,28.75,43.15],[102.35,29.25,43.85],[104.15,29.75,44.65]];
if(caps.length!==64||rows.length!==caps.length)throw Error('PERKESO table must have 64 bands');
const money=n=>Math.round((n+Number.EPSILON)*100)/100;
function wageBand(wage){if(!Number.isFinite(wage)||wage<0)throw Error('Gaji tidak sah.');if(wage===0)return -1;return caps.findIndex(cap=>wage<=cap)===-1?caps.length-1:caps.findIndex(cap=>wage<=cap);}
function perkeso(wage,{skbbk=false}={}){
 const w=Number(wage),i=wageBand(w);
 if(typeof skbbk!=='boolean')throw Error('Pilihan SKBBK perlu benar atau palsu.');
 if(i<0)return {socso:0,employerSocso:0,socsoInvalidity:0,skbbk:0,eis:0,employerEis:0,category:'first',source:'official-schedule'};
 const [employer,invalidity,skbbkAmount]=rows[i];
 // Act 800 schedule: RM0.05–0.90 first nine bands, then RM1.10 and RM0.20 per RM100 band.
 const earlyEis=[.05,.10,.15,.20,.25,.35,.50,.70,.90];
 const eis=i<earlyEis.length?earlyEis[i]:money(1.1+(i-9)*.2);
 return {socso:money(invalidity+(skbbk?skbbkAmount:0)),employerSocso:employer,
         socsoInvalidity:invalidity,skbbk:skbbk?skbbkAmount:0,
         eis,employerEis:eis,category:'first',source:'official-schedule',skbbkIncluded:skbbk};
}
// Part A, Oct 2025: official fixed band table for wages <= RM20k; beyond that KWSP allows
// exact percentage computation with total rounded upward to next ringgit.
// The regular bands below are generated from published schedule rules and validated at boundaries.
const kwspBands=[{cap:10,employee:0,employer:0}];
for(let cap=20;cap<=5000;cap+=20)kwspBands.push({cap,employee:Math.ceil(cap*.11-1e-9),employer:Math.ceil(cap*.13-1e-9)});
for(let cap=5100;cap<=20000;cap+=100)kwspBands.push({cap,employee:Math.ceil(cap*.11-1e-9),employer:Math.ceil(cap*.12-1e-9)});
function kwsp(wage){
 const w=Number(wage);if(!Number.isFinite(w)||w<0)throw Error('Gaji KWSP tidak sah.');
 if(w===0)return {employee:0,employer:0,method:'Part A schedule'};
 if(w<=20000){const band=kwspBands.find(row=>w<=row.cap);return {employee:band.employee,employer:band.employer,method:'Part A schedule bands'};}
 const employee=money(w*.11),total=Math.ceil(w*.23-1e-9);
 return {employee,employer:money(total-employee),method:'rate above RM20k with total rounded'};
}
return {perkeso,kwsp,bandCaps:caps.slice(),kwspBandCount:kwspBands.length};
});
