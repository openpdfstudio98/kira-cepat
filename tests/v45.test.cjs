/* node --test tests/v45.test.cjs */
const test=require('node:test');
const assert=require('node:assert/strict');
const M=require('../calc-core-v45.js');
const close=(actual,expected,epsilon=1e-6)=>assert.ok(Math.abs(actual-expected)<epsilon,actual+' != '+expected);
test('1 loan: zero interest, nonzero interest, invalid term',()=>{
 close(M.loan(1200,0,1).monthly,100);
 close(M.loan(10000,5,5).monthly,188.71233644);
 assert.throws(()=>M.loan(1000,5,0));
 assert.throws(()=>M.loan('',5,5));
});
test('2 zakat: below/above nisab and invalid income',()=>{
 close(M.zakat(1000,30000).due,0);
 close(M.zakat(5000,30000).due,1500);
 assert.throws(()=>M.zakat(-1,2000));
});
test('3 converter: signed temperatures, absolute zero, units, currency rates',()=>{
 close(M.convert('tmp',-10,'C','F'),14);
 close(M.convert('tmp',-40,'F','C'),-40);
 close(M.convert('tmp',0,'C','K'),273.15);
 assert.throws(()=>M.convert('tmp',-274,'C','K'),/sifar mutlak/);
 close(M.convert('len',1,'km','m'),1000);
 close(M.convert('wgt',1,'kg','g'),1000);
 close(M.convert('cur',10,'USD','MYR',{MYR:1,USD:.25}),40);
 assert.throws(()=>M.convert('cur',10,'USD','MYR',null),/Kadar langsung/);
 assert.throws(()=>M.convert('len',-1,'m','km'));
});
test('4 salary: deductions and impossible negative net are guarded',()=>{
 const s=M.salary(3500,200,0,0);
 close(s.gross,3700);assert.ok(s.net<3700&&s.net>0);
 assert.equal(s.estimated,false);
 assert.throws(()=>M.salary(1000,0,0,10000),/Potongan/);
});
test('5 overtime: multiplier and zero workdays guard',()=>{
 close(M.overtime(2600,26,8,2,1.5).total,37.5);
 assert.throws(()=>M.overtime(2600,0,8,2,1.5));
 assert.throws(()=>M.overtime(2600,26,8,2,8),/Pengganda/);
});
test('6 EPF: official RM3250 sample and 5000 threshold',()=>{
 // KWSP employer guidance sample: 3250 -> employee 359, employer 424.
 assert.deepEqual({employee:M.epfPartA(3250).employee,employer:M.epfPartA(3250).employer},{employee:359,employer:424});
 const a=M.epfPartA(5000),b=M.epfPartA(5000.01);
 assert.equal(a.employer,650);assert.ok(b.employer<650);
 assert.equal(M.epfPartA(0).employee,0);
});
test('7 PERKESO official Act 4 / Act 800 first-category wage bands',()=>{
 const a=M.perkesoFirstCategory(3500),b=M.perkesoFirstCategory(3500.01);
 close(a.socso,17.25);close(a.employerSocso,60.35);close(a.eis,6.90);
 close(b.socso,17.75);close(b.employerSocso,62.15);close(b.eis,7.10);
 const low=M.perkesoFirstCategory(20);
 close(low.socso,.10);close(low.employerSocso,.40);close(low.eis,.05);
 const cap=M.perkesoFirstCategory(6000);
 close(cap.socso,29.75);close(cap.employerSocso,104.15);close(cap.eis,11.90);
 assert.deepEqual(M.perkesoFirstCategory(8000),cap);
 assert.equal(a.estimated,false);
 assert.throws(()=>M.perkesoFirstCategory(-1));
 for(const boundary of [30,50,70,100,140,200,300,400,500,1000,1100,3500,5000,6000]){
  const left=M.perkesoFirstCategory(boundary);
  const right=M.perkesoFirstCategory(boundary+.01);
  assert.ok(right.socso>=left.socso);
  assert.ok(right.eis>=left.eis);
 }
});
test('7b KWSP Part A published official examples and boundaries',()=>{
 const x=M.epfPartA(6710.80);
 close(x.employee,748);close(x.employer,816);close(x.total,1564);
 const high=M.epfPartA(21250);
 close(high.employee,2337.5);close(high.employer,2550);close(high.total,4888);
 const tiny=M.epfPartA(20);
 close(tiny.employee,3);close(tiny.employer,3);
 const next=M.epfPartA(20.01);
 close(next.employee,5);close(next.employer,6);
});
test('8 income tax YA2025: published LHDN bracket boundaries',()=>{
 close(M.taxYA2025(20000,0).tax,150);
 close(M.taxYA2025(35000,0).tax,600);
 close(M.taxYA2025(100000,0).tax,9400);
 close(M.taxYA2025(400000,0).tax,84400);
 close(M.taxYA2025(0,0).tax,0);
 assert.equal(M.taxYA2025(100000,0).year,2025);
 assert.throws(()=>M.taxYA2025(-1000,0));
});
test('9 savings: no interest, end-of-month contributions',()=>{
 const v=M.savings(1000,100,1,0);
 close(v.balance,2200);close(v.principal,2200);
 assert.ok(M.savings(1000,100,1,3).balance>2200);
 assert.throws(()=>M.savings(0,0,101,3));
});

test('Gaji bersih mengecualikan OT untuk KWSP dan memasukkannya untuk SOCSO/EIS',()=>{
 const salary=M.salary(3500,200,500,0);
 assert.equal(salary.gross,4200);
 assert.equal(salary.epf,407);
 assert.equal(salary.socso,20.75);
 assert.equal(salary.eis,8.30);
 close(salary.net,3763.95);
});

test('KWSP gaji melebihi RM20,000 membundarkan jumlah sebelum paparan sen',()=>{
 const result=M.epfPartA(20000.01);
 assert.equal(result.employee,2200);
 assert.equal(result.employer,2400);
 assert.equal(result.total,4601);
 assert.equal(M.epfPartA(20100).total,4623);
});
