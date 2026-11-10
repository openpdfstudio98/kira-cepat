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
 const tables=(typeof module==='object'&&module.exports&&typeof require==='function')?require('./contribution-tables-v46.js'):globalThis.KiraContributionTables;
 if(!tables)throw Error('Jadual caruman V4.6 tidak dimuat.');
 function epfPartA(wage){const w=nonnegative(wage,'Gaji KWSP');return tables.kwsp(w);}
 function approxContributions(wage,{skbbk=false}={}){
  const w=nonnegative(wage,'Gaji'),epf=epfPartA(w),soc=tables.perkeso(w,{skbbk});
  return {epf:epf.employee,employerEPF:epf.employer,epfMethod:epf.method,
   socso:soc.socso,socsoInvalidity:soc.socsoInvalidity,skbbk:soc.skbbk,
   eis:soc.eis,employerEis:soc.employerEis,employerSocso:soc.employerSocso,
   source:'official-schedule',estimated:true,skbbkIncluded:skbbk};
 }
 function salary(base,allowance,ot,other,{skbbk=false}={}){
  const basePay=nonnegative(base,'Gaji asas'),eligibleAllowance=nonnegative(allowance,'Elaun'),overtimePay=nonnegative(ot,'Bayaran OT');
  const gross=basePay+eligibleAllowance+overtimePay;
  // Under normal KWSP rules, overtime payments are not liable to EPF contributions.
  const epfWage=basePay+eligibleAllowance;
  const epf=epfPartA(epfWage);
  const soc=tables.perkeso(gross,{skbbk});
  const deduction=nonnegative(other,'Potongan lain'),net=gross-epf.employee-soc.socso-soc.eis-deduction;
  if(net<0)throw Error('Potongan melebihi gaji kasar. Semak nilai dimasukkan.');
  return {gross,net,other:deduction,epfWage,epf:epf.employee,employerEPF:epf.employer,
   socso:soc.socso,socsoInvalidity:soc.socsoInvalidity,skbbk:soc.skbbk,eis:soc.eis,
   employerEis:soc.employerEis,employerSocso:soc.employerSocso,
   source:'official-schedule',estimated:true,skbbkIncluded:skbbk};
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
 return {loan,zakat,convert,epfPartA,approxContributions,salary,overtime,taxYA2025,savings};
});
