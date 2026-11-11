import{readFileSync,readdirSync,statSync,existsSync}from'node:fs';
import{join}from'node:path';
const dir=new URL('../dist/',import.meta.url).pathname;
const base=new URL(process.env.SITE_URL).origin+'/';
const paths=['', 'kalkulator-pinjaman/','kalkulator-zakat-pendapatan/','converter-unit-mata-wang/','penukar-mata-wang/','kalkulator-gaji-bersih/','kalkulator-overtime/','kalkulator-kwsp-epf/','kalkulator-socso-eis/','kalkulator-cukai-pendapatan/','kalkulator-simpanan/'];
const verification='W0jRa2Sy0OZ_iIiEbsTv875YhH2PZyrsbzebYxs9F0s';
const homepage=readFileSync(join(dir,'index.html'),'utf8');
const branch=process.env.WORKERS_CI_BRANCH||process.env.CF_PAGES_BRANCH||'';
const production=process.env.VERCEL_ENV!=='preview'&&(!branch||branch==='master');
const tags=[...homepage.matchAll(/<meta name="google-site-verification" content="([^"]+)"\s*\/?\s*>/g)].map(m=>m[1]);
if(production&&(tags.length!==1||tags[0]!==verification))throw Error('Production homepage must contain exactly one matching Google verification tag');
if(!production&&tags.length)throw Error('Preview must not contain Google verification tag');
const xml=readFileSync(join(dir,'sitemap.xml'),'utf8');
if((xml.match(/<url>/g)||[]).length!==paths.length)throw Error('Sitemap URL count does not match the published pages');
if(xml.includes('github.io'))throw Error('Sitemap still uses previous host');
for(const path of paths){
 const html=readFileSync(join(dir,path,'index.html'),'utf8');
 const canonical=base+path;
 const canon=[...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map(x=>x[1]);
 if(canon.length!==1||canon[0]!==canonical)throw Error('Canonical mismatch: '+path+': '+canon);
 if(!html.includes('<meta property="og:url" content="'+canonical+'">'))throw Error('Open Graph URL mismatch: '+path);
 if(html.includes('openpdfstudio98.github.io/kira-cepat/'))throw Error('Old domain remains in '+path);
 if(!xml.includes('<loc>'+canonical+'</loc>'))throw Error('Sitemap missing '+canonical);
 if(html.includes('USD:4.7')||html.includes('EUR:5.1'))throw Error('Stale currency fallback remains in '+path);
 if((html.match(/class="tools-picker"/g)||[]).length!==1||(html.match(/data-tool="/g)||[]).length!==10)throw Error('Expected one visible tool picker: '+path);
 if(!html.includes('<main id="kiraan"')||
  (html.match(/<a href="[^"]+\/#kiraan" data-tool="/g)||[]).length!==10)throw Error('Tool links must jump to the calculator: '+path);
 if(html.includes('class="hero-stats"')||html.includes('class="tools-menu"'))throw Error('Outdated tool navigation on '+path);
 const prefix=path?'../':'';
 for(const asset of ['premium-v3.css','premium-v3-1.css','seo-v4.css','ultimate-v2.js','premium-v3-1.js','calc-core-v45.js','legacy-v45.js','converter-v45.js','language.js','saved-calculations.js','favicon.png']){
  if(!existsSync(join(dir,asset)))throw Error('Shared asset not in output: '+asset);
  if(!html.includes(prefix+asset))throw Error('HTML missing shared asset: '+path+asset);
 }
}
const robots=readFileSync(join(dir,'robots.txt'),'utf8');
if(!robots.includes('Sitemap: '+base+'sitemap.xml')||!robots.includes(production?'\nAllow: /\n':'\nDisallow: /\n'))throw Error('Incorrect robots configuration');
const privacy=readFileSync(join(dir,'privasi','index.html'),'utf8');
if(!privacy.includes('<link rel="canonical" href="'+base+'privasi/">'))throw Error('Privacy canonical mismatch');
const previewImage=readFileSync(join(dir,'share-preview-v1.jpg'));
if(previewImage.length>300000||previewImage[0]!==0xff||previewImage[1]!==0xd8)throw Error('Share image must be a JPEG under 300 KB');
const shouldHaveAdsTxt=production&&Boolean(process.env.ADSENSE_PUBLISHER_ID?.trim());
if(existsSync(join(dir,'ads.txt'))!==shouldHaveAdsTxt)throw Error('Unexpected ads.txt state');
if(shouldHaveAdsTxt&&readFileSync(join(dir,'ads.txt'),'utf8')!==
 `google.com, ${process.env.ADSENSE_PUBLISHER_ID.trim()}, DIRECT, f08c47fec0942fa0\n`)throw Error('Incorrect ads.txt entry');
const shouldHaveAnalytics=production&&Boolean(process.env.CF_WEB_ANALYTICS_TOKEN?.trim());
for(const html of [privacy,...paths.map(path=>readFileSync(join(dir,path,'index.html'),'utf8'))]){
 const head=html.split('</head>')[0];
 for(const name of ['title','description','type','url','image']){
  const tags=[...head.matchAll(new RegExp('<meta property="og:'+name+'" content="([^"]+)">','g'))];
  if(tags.length!==1||(name==='image'&&tags[0][1]!==base+'share-preview-v1.jpg'))throw Error('Invalid share metadata: og:'+name);
 }
 const beaconCount=(html.match(/static\.cloudflareinsights\.com\/beacon\.min\.js/g)||[]).length;
 if(beaconCount!==Number(shouldHaveAnalytics))throw Error('Unexpected analytics beacon state');
 if(!production&&!html.includes('content="noindex,nofollow"'))throw Error('Preview HTML must be noindex');
 const adCount=(html.match(/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/g)||[]).length;
 const expectedAds=html!==privacy&&shouldHaveAdsTxt;
 if(adCount!==Number(expectedAds))throw Error('Unexpected AdSense ad script count');
 if(expectedAds&&!html.includes('client=ca-'+process.env.ADSENSE_PUBLISHER_ID.trim()))throw Error('Incorrect AdSense publisher');
}
console.log('PASS: 11 accessible static HTML files, canonicals, Open Graph URLs, assets, sitemap and robots configuration.');
