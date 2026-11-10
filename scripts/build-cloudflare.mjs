import {cpSync,existsSync,mkdirSync,readFileSync,readdirSync,rmSync,writeFileSync} from 'node:fs';
import {join,relative,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

// Build: node scripts/build-cloudflare.mjs  |  Output directory: dist
// SITE_URL is the production origin used for canonical URLs.
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const dist=join(root,'dist');
const old='https://openpdfstudio98.github.io/kira-cepat/';
const raw=(process.env.SITE_URL||'').trim();
if(!raw)throw Error('Set SITE_URL=https://your-confirmed-production-origin before deployment.');
let url;try{url=new URL(raw)}catch{throw Error('SITE_URL must be a valid HTTPS URL.');}
if(url.protocol!=='https:'||url.pathname!=='/'||url.search||url.hash||url.username||url.password)throw Error('SITE_URL must be an HTTPS origin without path, query or hash.');
const base=url.origin+'/';
const deployedBranch=process.env.WORKERS_CI_BRANCH||process.env.CF_PAGES_BRANCH||'';
const preview=Boolean(deployedBranch&&deployedBranch!=='master');
const analyticsToken=preview?'':(process.env.CF_WEB_ANALYTICS_TOKEN||'').trim();
const publisherId=preview?'':(process.env.ADSENSE_PUBLISHER_ID||'').trim();
if(analyticsToken&&!/^[a-f0-9]{32}$/i.test(analyticsToken))throw Error('CF_WEB_ANALYTICS_TOKEN must be a Cloudflare Web Analytics site token.');
if(publisherId&&!/^pub-[0-9]{16}$/.test(publisherId))throw Error('ADSENSE_PUBLISHER_ID must use the pub- followed by 16 digits format.');
const slugs=['kalkulator-pinjaman','kalkulator-zakat-pendapatan','converter-unit-mata-wang','penukar-mata-wang','kalkulator-gaji-bersih','kalkulator-overtime','kalkulator-kwsp-epf','kalkulator-socso-eis','kalkulator-cukai-pendapatan','kalkulator-simpanan'];
const assets=['index.html','favicon.png','share-preview-v1.jpg','premium-v3.css','premium-v3-1.css','premium-v3-1.js','ultimate-v2.js','seo-v4.css','calc-core-v45.js','legacy-v45.js','converter-v45.js','language.js','saved-calculations.js'];
for(const name of assets)if(!existsSync(join(root,name)))throw Error('Missing asset: '+name);
for(const slug of [...slugs,'privasi'])if(!existsSync(join(root,slug,'index.html')))throw Error('Missing page: '+slug);
rmSync(dist,{recursive:true,force:true});mkdirSync(dist,{recursive:true});
for(const name of assets)cpSync(join(root,name),join(dist,name));
for(const slug of [...slugs,'privasi'])cpSync(join(root,slug),join(dist,slug),{recursive:true});
function pages(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const p=join(dir,e.name);return e.isDirectory()?pages(p):e.name.endsWith('.html')?[p]:[];});}
for(const file of pages(dist)){
 const path=relative(dist,file).replaceAll('\\','/');
 const canonical=base+(path==='index.html'?'':path.replace(/index\.html$/,''));
 let html=readFileSync(file,'utf8').replaceAll(old,base);
 html=html.replace(/<link rel="canonical" href="[^"]*">/g,'<link rel="canonical" href="'+canonical+'">');
 html=html.replace(/<meta property="og:url" content="[^"]*">/g,'<meta property="og:url" content="'+canonical+'">');
 html=html.replace('</head>',[
  '<meta property="og:site_name" content="Kira Cepat">',
  `<meta property="og:image" content="${base}share-preview-v1.jpg">`,
  '<meta property="og:image:type" content="image/jpeg">',
  '<meta property="og:image:width" content="1200">',
  '<meta property="og:image:height" content="630">',
  '<meta property="og:image:alt" content="Kira Cepat — kalkulator percuma dalam BM dan English">',
  '</head>'
 ].join('\n'));
 html=html.replace(/\s*<meta name="google-site-verification" content="[^"]*"\s*\/?>/g,'');
 // Search Console verifies the production site's homepage source. Preserve
 // exactly one matching tag there; do not expose it on preview deployments.
 if(path==='index.html'&&!preview){
  html=html.replace('</head>','<meta name="google-site-verification" content="W0jRa2Sy0OZ_iIiEbsTv875YhH2PZyrsbzebYxs9F0s" />\n</head>');
 }
 if(analyticsToken){
  const beacon=JSON.stringify({token:analyticsToken,spa:false});
  html=html.replace('</body>',`<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${beacon}'></script>\n</body>`);
 }
 if(preview)html=html.replace(/<meta name="robots" content="[^"]*">/g,'<meta name="robots" content="noindex,nofollow">');
 writeFileSync(file,html);
}
const urls=['',...slugs.map(s=>s+'/')].map(path=>base+path);
writeFileSync(join(dist,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(u=>'  <url><loc>'+u+'</loc></url>').join('\n')+'\n</urlset>\n');
if(publisherId)writeFileSync(join(dist,'ads.txt'),`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`);
writeFileSync(join(dist,'robots.txt'),'User-agent: *\n'+(preview?'Disallow: /':'Allow: /')+'\nSitemap: '+base+'sitemap.xml\n');
writeFileSync(join(dist,'404.html'), '<!doctype html><html lang="ms"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Halaman tidak ditemui | Kira Cepat</title><body style="font:16px system-ui;background:#08090b;color:white;padding:3rem;text-align:center"><h1>Halaman tidak ditemui</h1><p>Sila kembali ke halaman utama.</p><a style="color:#aea0ff" href="/">Kira Cepat</a></body></html>');
writeFileSync(join(dist,'_headers'),'/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n');
console.log('Cloudflare build OK:',{origin:base,preview,htmlPages:pages(dist).length,sitemapUrls:urls.length});
