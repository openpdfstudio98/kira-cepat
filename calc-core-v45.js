/* Kira Cepat V4.5 - testable, browser/Node calculation primitives.
 * Financial outputs are estimates, NOT payroll remittance or a tax filing.
 */
(function(root,factory){
 const api=factory();
 if(typeof module==='object'&&module.exports)module.exports=api;
 if(root)root.KiraMath=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 function nonnegative(value,name='Nilai'){
  const n=Number(value);
  if(value===''||value==null||!Number.isFinite(n)||n<0)throw Error(name+' mesti nombor bukan negatif yang sah.');
  return n;
 }
 function positive(value,name='Nilai'){const n=nonnegative(value,name);if(n<=0)throw Error(name+' mesti lebih daripada sifar.');return n;}
 function loan(amount,annualRate,years){
  const p=positive(amount,'Jumlah pinjaman'), r=nonnegative(annualRate,'Kadar faedah')/1200,n=positive(years,'Tempoh pinjaman')*12;
  if(n>1200||r>1)throw Error('Tempoh atau kadar pinjaman melebihi julat simulasi.');
  const monthly=r===0?p/n:p*r/(-Math.expm1(-n*Math.log1p(r)));
  const total=monthly*n;
  if(!Number.isFinite(total))throw Error('Nilai pinjaman tidak dapat dikira.');
  return {monthly,total,interest:total-p};
 }
 function zakat(monthlyIncome,nisab){
  const annual=nonnegative(monthlyIncome,'Pendapatan')*12;
  const threshold=nonnegative(nisab,'Nisab');
  return {annual,eligible:annual>=threshold,due:annual>=threshold?annual*.025:0};
 }
 const unitMaps={len:{m:1,km:1000,cm:.01,mm:.001,inch:.0254,ft:.3048},wgt:{kg:1,g:.001,lb:.453592,oz:.0283495}};
 function convert(type,amount,from,to,rates){
  if(!Number.isFinite(Number(amount))||amount===''||amount==null)throw Error('Masukkan nilai yang sah.');
  const v=Number(amount);
  if(type==='tmp'){
   if(!['C','F','K'].includes(from)||!['C','F','K'].includes(to))throw Error('Unit suhu tidak sah.');
   const c=from==='C'?v:from==='F'?(v-32)*5/9:v-273.15;
   if(c<-273.150000001)throw Error('Suhu tidak boleh lebih rendah daripada sifar mutlak (-273.15°C).');
   const result=to==='C'?c:to==='F'?c*9/5+32:c+273.15;
   return Math.abs(result)<1e-9?0:result;
  }
  if(v<0)throw Error('Nilai perlu bukan negatif untuk penukaran ini.');
  if(type==='cur'){
   if(from===to && /^[A-Z]{3}$/.test(from))return v;
   if(!rates||!Number.isFinite(rates[from])||!Number.isFinite(rates[to])||rates[from]<=0||rates[to]<=0)throw Error('Kadar langsung belum tersedia. Semak sambungan internet.');
   return v*rates[to]/rates[from];
  }
  const map=unitMaps[type];
  if(!map||!Object.hasOwn(map,from)||!Object.hasOwn(map,to))throw Error('Unit tidak sah.');
  return v*map[from]/map[to];
 }
 // Part A, effective October 2025. RM0.01–RM20,000 wage-band rules;
 // RM20,000.01+ has independently rounded total as required by KWSP.
 function epfPartA(wage){
  const w=nonnegative(wage,'Gaji KWSP');
  if(w===0)return {employee:0,employer:0,total:0,method:'Part A'};
  if(w<=10)return {employee:0,employer:0,total:0,method:'Part A'};
  if(w>20000){
   const employee=Math.round(w*.11*100)/100;
   const employer=Math.round(w*.12*100)/100;
   return {employee,employer,total:Math.ceil((employee+employer)-1e-9),method:'Part A > RM20,000 (total rounded)'};
  }
  const upper=w<=5000?Math.ceil((w-1e-9)/20)*20:Math.ceil((w-5000-1e-9)/100)*100+5000;
  const employee=Math.ceil(upper*.11-1e-9),employer=Math.ceil(upper*(w<=5000?.13:.12)-1e-9);
  return {employee,employer,total:employee+employer,method:'Part A wage band Oct 2025'};
 }
 // PERKESO Act 4 first category and Act 800: official published wage ranges
 // effective Oct 2024. Only applicable to eligible first-category workers.
 const lowWageCeil=[30,50,70,100,140,200,300,400,500,600,700,800,900,1000];
 const lowAct4Employer=[.40,.70,1.10,1.50,2.10,2.95,4.35,6.15,7.85,9.65,11.35,13.15,14.85,16.65];
 const lowAct4Employee=[.10,.20,.30,.40,.60,.85,1.25,1.75,2.25,2.75,3.25,3.75,4.25,4.75];
 const lowEis=[.05,.10,.15,.20,.25,.35,.50,.70,.90,1.10,1.30,1.50,1.70,1.90];
 function perkesoFirstCategory(wage){
  const w=nonnegative(wage,'Gaji PERKESO');
  if(w===0)return {socso:0,employerSocso:0,eis:0,employerEis:0,source:'Act 4/800',estimated:false};
  const capped=Math.min(w,6000);
  let socso,employerSocso,eis;
  if(capped<=1000){
   const i=lowWageCeil.findIndex(limit=>capped<=limit);
   socso=lowAct4Employee[i];employerSocso=lowAct4Employer[i];eis=lowEis[i];
  }else{
   // 1000.01–1100 = index 1, ... 5900.01–6000 = index 50.
   const band=Math.ceil((capped-1000-1e-9)/100);
   socso=Math.round((4.75+band*.50)*100)/100;
   // Act 4 employer wage bands alternate +RM1.70 / +RM1.80.
   employerSocso=Math.round((16.65+Math.ceil(band/2)*1.70+Math.floor(band/2)*1.80)*100)/100;
   eis=Math.round((1.90+band*.20)*100)/100;
  }
  return {socso,employerSocso,eis,employerEis:eis,source:'PERKESO Act 4 first category / Act 800 (Oct 2024)',estimated:false};
 }
 function approxContributions(wage){
  const w=nonnegative(wage,'Gaji'),epf=epfPartA(w),p=perkesoFirstCategory(w);
  return {epf:epf.employee,employerEPF:epf.employer,epfTotal:epf.total,epfMethod:epf.method,
   socso:p.socso,eis:p.eis,employerSocso:p.employerSocso,employerEis:p.employerEis,
   estimated:false,source:p.source};
 }
 function salary(base,allowance,ot,other){
  const gross=nonnegative(base,'Gaji asas')+nonnegative(allowance,'Elaun')+nonnegative(ot,'Bayaran OT');
  const c=approxContributions(gross),deduction=nonnegative(other,'Potongan lain');
  const net=gross-c.epf-c.socso-c.eis-deduction;
  if(net<0)throw Error('Potongan melebihi gaji kasar. Semak nilai dimasukkan.');
  return {gross,net,other:deduction,...c};
 }
 function overtime(pay,days,dayHours,otHours,multiplier){
  const hourly=nonnegative(pay,'Gaji asas')/positive(days,'Hari bekerja')/positive(dayHours,'Jam kerja sehari');
  const m=Number(multiplier),hours=nonnegative(otHours,'Jam OT');
  if(![1.5,2,3].includes(m))throw Error('Pengganda OT tidak sah.');
  return {hourly,otHourly:hourly*m,total:hourly*hours*m};
 }
 function taxYA2025(income,relief){
  const taxable=Math.max(0,nonnegative(income,'Pendapatan tahunan')-nonnegative(relief,'Pelepasan'));
  const bands=[[5000,0],[20000,.01],[35000,.03],[50000,.06],[70000,.11],[100000,.19],[400000,.25],[600000,.26],[2000000,.28],[Infinity,.30]];
  let previous=0,due=0;
  for(const [limit,rate] of bands){
   const part=Math.max(0,Math.min(taxable,limit)-previous);
   due+=part*rate;previous=limit;if(taxable<=limit)break;
  }
  return {chargeable:taxable,tax:due,monthly:due/12,year:2025};
 }
 function savings(start,monthly,years,annualRate){
  const p=nonnegative(start,'Simpanan awal'),m=nonnegative(monthly,'Simpanan bulanan'),y=nonnegative(years,'Tempoh'),r=nonnegative(annualRate,'Pulangan')/1200;
  if(y>100||r>1)throw Error('Sila gunakan tempoh ≤ 100 tahun dan pulangan ≤ 1200% setahun.');
  const months=Math.round(y*12);let balance=p;
  for(let i=0;i<months;i++)balance=balance*(1+r)+m;
  const principal=p+m*months;
  if(!Number.isFinite(balance))throw Error('Nilai simpanan terlalu besar.');
  return {principal,returnAmount:balance-principal,balance};
 }
 return {loan,zakat,convert,epfPartA,perkesoFirstCategory,approxContributions,salary,overtime,taxYA2025,savings};
});
