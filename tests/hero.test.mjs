import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile,stat } from 'node:fs/promises';
test('all responsive hero assets remain below 220 KB',async()=>{
  for(const width of [720,1080,1600,1882])assert.ok((await stat(new URL(`../public/images/monochrome-building-${width}.webp`,import.meta.url))).size<220000);
});
test('in-page hero and menu destinations resolve to actual sections',async()=>{
  const paths=['src/components/home-hero.tsx','src/components/site-overlay.tsx','src/app/page.tsx','src/components/about-section.tsx','src/components/capabilities-section.tsx'];
  const sources=await Promise.all(paths.map(path=>readFile(new URL(`../${path}`,import.meta.url),'utf8')));
  const combined=sources.join('\n');
  const ids=new Set([...combined.matchAll(/id="([^"]+)"/g)].map(match=>match[1]));
  for(const [,target]of combined.matchAll(/href="#([^"]+)"/g))assert.ok(ids.has(target),`Missing anchor ${target}`);
  assert.ok(!combined.includes('href="#"'));
});
