import{readFileSync,readdirSync,statSync,existsSync}from'node:fs';
import{join}from'node:path';
const dir=new URL('../dist/',import.meta.url).pathname;
const base=new URL(process.env.SITE_URL).origin+'/';
const paths=['', 'kalkulator-pinjaman/','kalkulator-zakat-pendapatan/','converter-unit-mata-wang/','kalkulator-gaji-bersih/','kalkulator-overtime/','kalkulator-kwsp-epf/','kalkulator-socso-eis/','kalkulator-cukai-pendapatan/','kalkulator-simpanan/'];
const verification='W0jRa2Sy0OZ_iIiEbsTv875YhH2PZyrsbzebYxs9F0s';
const homepage=readFileSync(join(dir,'index.html'),'utf8');
const production=!(process.env.WORKERS_CI_BRANCH&&process.env.WORKERS_CI_BRANCH!=='master');
const tags=[...homepage.matchAll(/<meta name="google-site-verification" content="([^"]+)"\s*\/?\s*>/g)].map(m=>m[1]);
if(production&&(tags.length!==1||tags[0]!==verification))throw Error('Production homepage must contain exactly one matching Google verification tag');
if(!production&&tags.length)throw Error('Preview must not contain Google verification tag');
const xml=readFileSync(join(dir,'sitemap.xml'),'utf8');
if((xml.match(/<url>/g)||[]).length!==10)throw Error('Sitemap should contain ten URLs');
if(xml.includes('github.io'))throw Error('Sitemap still uses previous host');
for(const path of paths){
 const html=readFileSync(join(dir,path,'index.html'),'utf8');
 const canonical=base+path;
 const canon=[...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map(x=>x[1]);
 if(canon.length!==1||canon[0]!==canonical)throw Error('Canonical mismatch: '+path+': '+canon);
 if(!html.includes('<meta property="og:url" content="'+canonical+'">'))throw Error('Open Graph URL mismatch: '+path);
 if(html.includes('openpdfstudio98.github.io/kira-cepat/'))throw Error('Old domain remains in '+path);
 if(!xml.includes('<loc>'+canonical+'</loc>'))throw Error('Sitemap missing '+canonical);
 const prefix=path?'../':'';
 for(const asset of ['premium-v3.css','premium-v3-1.css','seo-v4.css','ultimate-v2.js','premium-v3-1.js','favicon.png']){
  if(!existsSync(join(dir,asset)))throw Error('Shared asset not in output: '+asset);
  if(!html.includes(prefix+asset))throw Error('HTML missing shared asset: '+path+asset);
 }
}
if(!readFileSync(join(dir,'robots.txt'),'utf8').includes('Sitemap: '+base+'sitemap.xml'))throw Error('Incorrect robots sitemap');
console.log('PASS: 10 accessible static HTML files, canonicals, Open Graph URLs, assets, sitemap and robots configuration.');
