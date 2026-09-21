const {chromium,webkit} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs=require('fs');
const path=require('path');
const {pathToFileURL}=require('url');
const base=process.env.BASE_URL || pathToFileURL(path.resolve(__dirname,'../index.html')).href;
const output=path.resolve(__dirname,'screenshots');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const results=[];
 fs.mkdirSync(output,{recursive:true});
 for(const [w,h] of [[390,844],[430,932],[768,1024],[1440,900],[1920,1080]]){
  const page=await browser.newPage({viewport:{width:w,height:h},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForTimeout(200);
  const scenes=await page.locator('.scene').evaluateAll(es=>es.map(e=>e.id));
  const failures=[];
  for(const id of scenes){
   await page.locator('#'+id).evaluate(e=>e.scrollIntoView({behavior:'instant'}));await page.waitForTimeout(120);
   const bounds=await page.evaluate(id=>{
    const s=document.getElementById(id),r=s.getBoundingClientRect();
    const out=[...s.querySelectorAll('h1,h2,h3,p,a,label,.company,.signature,.connections')].filter(e=>e.getClientRects().length && !e.closest('.quote-track')).filter(e=>{const b=e.getBoundingClientRect();return b.left<-.5||b.right>innerWidth+.5||b.bottom>r.bottom+.5}).map(e=>e.outerHTML.slice(0,100));
    return {overflow:document.documentElement.scrollWidth>innerWidth,sceneHeight:Math.round(r.height),out};
   },id);
   if(bounds.overflow||bounds.out.length)failures.push({id,...bounds});
   await page.screenshot({path:path.join(output,`${w}-${id}.png`)});
   await page.locator('#'+id).screenshot({path:path.join(output,`${w}-${id}-full.png`)});
  }
  await page.locator('#garba').evaluate(e=>e.scrollIntoView({behavior:'instant'}));
  for(const [choice,panel] of [['retirement','retirement'],['wealth','wealth'],['family','family']]){
   await page.locator(`label[for="choose-${choice}"]`).click();
   if(!(await page.locator(`.${panel}-panel`).isVisible()))failures.push('choice '+choice);
  }
  await page.locator('#escuchar').evaluate(e=>e.scrollIntoView({behavior:'instant'}));
  for(let i=0;i<4;i++){await page.locator('.quote-next').click();await page.waitForTimeout(60)}
  if(!(await page.locator('.quote-next').isDisabled()))failures.push('quote end');
  await page.locator('#conectar').evaluate(e=>e.scrollIntoView({behavior:'instant'}));await page.waitForTimeout(100);
  await page.locator('h2#title-7').click();await page.keyboard.press('ArrowRight');await page.waitForTimeout(100);
  if(!(await page.locator('.scene-count').innerText()).startsWith('08'))failures.push('last scene loops');
  for(const name of ['connection','opportunity','goal']) {
   await page.locator(`label[for="your-${name}"]`).click();
   if(!(await page.locator(`.answer-${name}`).isVisible())) failures.push('reciprocity '+name);
   const href=await page.locator(`.answer-${name} a`).getAttribute('href');
   if(!href.startsWith('https://wa.me/526623072573?text=')) failures.push('reciprocity contact');
  }
  const targetCount=await page.locator('.scene').count();
  if(targetCount!==8) failures.push('missing narrative scene');
  await page.locator('#personas').evaluate(e=>e.scrollIntoView({behavior:'instant'}));
  await page.locator('.affinity-detail summary').click();
  if(!(await page.locator('.affinity-detail p').isVisible())) failures.push('affinity detail');
  await page.locator('.affinity-detail summary').click();
  await page.locator('.restart').click();await page.waitForTimeout(150);
  if(!(await page.locator('.scene-count').innerText()).startsWith('01'))failures.push('restart');
  await page.keyboard.press('ArrowRight');await page.waitForTimeout(150);
  if(!(await page.locator('.scene-count').innerText()).startsWith('02'))failures.push('keyboard');
  await page.locator('.next-scene').click();await page.waitForTimeout(150);
  if(!(await page.locator('.scene-count').innerText()).startsWith('03'))failures.push('next arrow');
  results.push({viewport:`${w}x${h}`,failures,errors});await page.close();
 }
 // Native navigation and controls must still work with scripting disabled.
 const p=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:false});
 await p.goto(base);
 await p.locator('label[for="choose-wealth"]').click();
 await p.locator('label[for="your-connection"]').click();
 const reciprocalWithoutJS=await p.locator('.answer-connection').isVisible();
 results.push({javascriptDisabled:true,reciprocalWithoutJS,wealthVisible:await p.locator('.wealth-panel').isVisible(),scrollWidth:await p.locator('body').evaluate(e=>e.scrollWidth)});
 await browser.close();
 try{
 const b=await webkit.launch({headless:true});const p=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});await p.goto(base);await p.emulateMedia({reducedMotion:'reduce'});await p.locator('.restart').click();await p.waitForTimeout(150);results.push({webkit:true,title:await p.title(),overflow:await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});await b.close();
 }catch(e){results.push({webkit:false,error:e.message.slice(0,150)})}
 fs.writeFileSync(path.resolve(__dirname,'results.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
 if(results.some(r => r.failures?.length || r.errors?.length || r.wealthVisible === false || r.reciprocalWithoutJS === false || r.webkit === false || r.overflow)) process.exitCode=1;
})();
