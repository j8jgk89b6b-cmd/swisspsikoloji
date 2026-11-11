import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const pages=fs.readdirSync(root).filter(p=>p.endsWith('.html')&&!p.startsWith('google'));
let count=0;
for(const page of pages){
 const html=fs.readFileSync(path.join(root,page),'utf8');
 assert.equal((html.match(/<h1\b/g)||[]).length,1,page+': one H1 required');
 assert.match(html,/<html lang="(tr|en)"/,page+': language missing');
 assert.match(html,/<title>[^<]+<\/title>/,page+': title missing');
 assert.match(html,/<meta name="viewport"/,page+': viewport missing');
 if(page!=='404.html'){
  assert.equal((html.match(/rel="canonical"/g)||[]).length,1,page+': one canonical required');
  assert.equal((html.match(/name="description"/g)||[]).length,1,page+': one description required');
  assert(!html.includes('noindex'),page+': unexpectedly excluded from indexing');
 }
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,page+': duplicate IDs');
 for(const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))JSON.parse(m[1]);
 for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const value=m[1];if(/^(https?:|tel:|mailto:|data:)/.test(value))continue;
  const [raw,fragment]=value.split('#');
  const file=raw.replace(/^\//,'')||(value.startsWith('#')?page:'index.html');
  const target=path.join(root,file);
  assert(fs.existsSync(target),page+': missing '+value);
  if(fragment)assert(fs.readFileSync(target,'utf8').includes('id="'+fragment+'"'),page+': missing fragment '+value);
 }
 assert(!html.includes('data:image/'),page+': embedded image increases HTML payload');
 count++;
}
for(const file of fs.readdirSync(path.join(root,'assets')).filter(p=>p.endsWith('.js')))
 new vm.Script(fs.readFileSync(path.join(root,'assets',file),'utf8'),{filename:file});
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
assert(!sitemap.includes('/404.html'),'404 must not be in sitemap');
for(const page of pages.filter(p=>p!=='404.html'))
 assert(sitemap.includes('https://swisspsikoloji.com/'+(page==='index.html'?'':page)),page+': missing from sitemap');
assert.equal(fs.readFileSync(path.join(root,'CNAME'),'utf8').trim(),'swisspsikoloji.com');
console.log(count+' pages passed: metadata, schema, internal links, assets, sitemap and JavaScript.');
