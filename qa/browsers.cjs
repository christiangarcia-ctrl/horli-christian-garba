const {chromium,webkit}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs=require('fs');
const path=require('path');
const base=process.env.BASE_URL || 'http://127.0.0.1:8765/';
const output=path.resolve(__dirname,'screenshots');
fs.mkdirSync(output,{recursive:true});
(async()=>{
const results=[];
for(const [engine,type] of [['chromium',chromium],['webkit',webkit]]){
 const b=await type.launch();
 for(const [width,height] of [[390,844],[430,932]]){
  const p=await b.newPage({viewport:{width,height},isMobile:true,hasTouch:true,deviceScaleFactor:2});
  const errors=[];const failed=[];p.on('pageerror',e=>errors.push(e.message));p.on('requestfailed',r=>failed.push(r.url()));
  await p.goto(base,{waitUntil:'networkidle'});
  const sizes=await p.evaluate(()=>performance.getEntriesByType('resource').map(r=>({name:r.name.split('/').pop(),bytes:r.transferSize})));
  const nav=await p.evaluate(()=>({domReady:performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd,scrollWidth:document.documentElement.scrollWidth}));
  const steps=[];
  for(let i=0;i<6;i++){await p.locator('.next-scene').tap();await p.waitForTimeout(1100);steps.push(await p.locator('.scene-count').innerText());}
  await p.keyboard.press('ArrowRight');await p.waitForTimeout(300);const last=await p.locator('.scene-count').innerText();
  await p.locator('.restart').tap();await p.waitForTimeout(1400);const restart=await p.locator('.scene-count').innerText();
  await p.locator('#garba').evaluate(e=>e.scrollIntoView({behavior:'instant'}));await p.waitForTimeout(200);
  await p.locator('label[for="choose-retirement"]').tap();const retirement=await p.locator('.retirement-panel').isVisible();
  await p.locator('#escuchar').evaluate(e=>e.scrollIntoView({behavior:'instant'}));await p.waitForTimeout(200);await p.locator('.quote-next').tap();await p.waitForTimeout(900);const quote=await p.locator('.quote-position').innerText();
  await p.setViewportSize({width,height:height-150});await p.waitForTimeout(200);const resizedOverflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  // Confirm external links really open the supplied URL without sending messages.
  const links=await p.locator('a[target="_blank"]').evaluateAll(es=>es.map(e=>({href:e.href,rel:e.rel})));
  const images=await p.locator('img').evaluateAll(es=>es.map(e=>({src:e.getAttribute('src'),loaded:e.complete&&e.naturalWidth>0,displayRatio:e.clientWidth/e.clientHeight,naturalRatio:e.naturalWidth/e.naturalHeight,fit:getComputedStyle(e).objectFit})));
  await p.setViewportSize({width,height});await p.locator('#personas').evaluate(e=>e.scrollIntoView({behavior:'instant'}));await p.waitForTimeout(900);await p.screenshot({path:path.join(output,`${engine}-${width}-family.png`)});
  results.push({engine,viewport:`${width}x${height}`,errors,failed,steps,last,restart,retirement,quote,resizedOverflow,nav,sizes,links,images});
  await p.close();
 }
 await b.close();
}
fs.writeFileSync(path.resolve(__dirname,'browser-results.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results.map(({images,sizes,links,...r})=>r),null,2));
if(results.some(r=>r.errors.length||r.failed.length||r.resizedOverflow||!r.retirement||!r.last.startsWith('07')||!r.restart.startsWith('01')||!r.quote.startsWith('02')))process.exitCode=1;
})();
