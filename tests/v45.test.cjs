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
 assert.equal(s.estimated,true);
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
test('7 SOCSO/EIS: explicitly approximate, capped at RM6000',()=>{
 const a=M.approxContributions(6000),b=M.approxContributions(10000);
 assert.equal(a.estimated,true);close(a.socso,b.socso);close(a.eis,b.eis);
 close(a.socso,30);close(a.eis,12);
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
