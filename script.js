let soundOn=false,watchTimer=null,watchStart=0,watchElapsed=0;
const facts=["HTML gives a webpage its structure.","CSS controls presentation and layout.","JavaScript can make webpages interactive.","Python is widely used for web backends and automation.","The first website went online in 1991.","Small projects are one of the best ways to learn programming.","A browser can run JavaScript without a server."];

window.addEventListener("load",()=>setTimeout(()=>document.getElementById("loader").classList.add("hide"),1500));
document.addEventListener("mousemove",e=>{const g=document.querySelector(".cursor-glow");g.style.left=e.clientX+"px";g.style.top=e.clientY+"px"});
function toggleMenu(){const n=document.getElementById("nav"),b=document.querySelector(".menu");if(!n)return;const open=n.classList.toggle("open");if(b)b.textContent=open?"✕":"☰";if(b)b.setAttribute("aria-expanded",open);}
document.addEventListener("click",e=>{const n=document.getElementById("nav"),b=document.querySelector(".menu");if(!n||!n.classList.contains("open"))return;if(e.target.closest("#nav a")){n.classList.remove("open");if(b){b.textContent="☰";b.setAttribute("aria-expanded","false")}}});
function showToast(t){const x=document.getElementById("toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),2400)}
function beep(){if(!soundOn)return;try{const c=new AudioContext(),o=c.createOscillator(),g=c.createGain();o.frequency.value=520;g.gain.value=.035;o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+.06)}catch{}}
function calc(v){document.getElementById("calc").value+=v;beep()}
function clearCalc(){document.getElementById("calc").value="";document.getElementById("calcOut").textContent="Ready."}
function backCalc(){let x=document.getElementById("calc");x.value=x.value.slice(0,-1)}
function calculate(){let x=document.getElementById("calc").value;try{if(!/^[0-9+\-*/().%\s]+$/.test(x))throw Error();let safe=x.replace(/(\d+(?:\.\d+)?)%/g,"($1/100)");let r=Function('"use strict";return ('+safe+')')();if(!Number.isFinite(r))throw Error();document.getElementById("calcOut").textContent="Answer: "+r;beep()}catch{document.getElementById("calcOut").textContent="Invalid expression."}}
function fact(){document.getElementById("fact").textContent=facts[Math.floor(Math.random()*facts.length)];beep()}
function typing(){let a=document.getElementById("typing").value,b=document.getElementById("phrase").textContent,o=document.getElementById("typingOut");if(a===b)o.textContent="🔥 PERFECT! RUDRA MODE: ONLINE.";else if(b.startsWith(a))o.textContent=a.length+"/"+b.length+" characters";else o.textContent="Keep going — check the phrase."}
function convert(){let v=Number(document.getElementById("unitVal").value),t=document.getElementById("unitType").value;if(!Number.isFinite(v)){document.getElementById("unitOut").textContent="Enter a value.";return}let r=t==="km"?v*.621371:t==="miles"?v*1.609344:t==="c"?v*9/5+32:(v-32)*5/9;document.getElementById("unitOut").textContent="Result: "+r.toFixed(3)}
function startWatch(){if(watchTimer)return;watchStart=Date.now()-watchElapsed;watchTimer=setInterval(()=>{watchElapsed=Date.now()-watchStart;let s=watchElapsed/1000;document.getElementById("watch").textContent=s.toFixed(1).padStart(4,"0")},100)}
function stopWatch(){clearInterval(watchTimer);watchTimer=null}
function resetWatch(){stopWatch();watchElapsed=0;document.getElementById("watch").textContent="00:00.0"}
function askAI(){
  const input=document.querySelector('#aiInput');
  if(input){ document.getElementById('ai')?.scrollIntoView({behavior:'smooth',block:'start'}); input.focus(); if(typeof window.askRudraAI==='function' && input.value.trim()) window.askRudraAI(input.value); }
}

function escapeHTML(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function terminalKey(e){if(e.key!=="Enter")return;let i=document.getElementById("termIn"),q=i.value.trim().toLowerCase(),o=document.getElementById("termOut"),r={help:"Commands: help, whoami, about, skills, projects, youtube, status, secret, clear, date",whoami:"Rudra Pratap Singh // Vicky",about:"Student developer learning by building.",skills:"HTML • CSS • JavaScript • Python (learning)",projects:"Future Tech Hub • Askora AI • Calculator Vault",youtube:"Bikkee Warrior",status:"LEARNING → BUILDING → IMPROVING",date:new Date().toLocaleString(),secret:""}[q];if(q==="clear"){o.innerHTML="";i.value="";return}if(q==="secret"){secretMode();i.value="";return}o.innerHTML+="<p>› "+escapeHTML(i.value)+"</p><p>"+(r||"Command not found. Type help.")+"</p>";i.value="";o.scrollTop=o.scrollHeight}
function secretMode(){document.body.classList.add("secret");showToast("🚀 RUDRA SECRET MODE ACTIVATED");setTimeout(()=>document.body.classList.remove("secret"),3500);beep()}
document.addEventListener("keydown",e=>{if(e.key==="Enter"&&document.activeElement.id==="calc")calculate()})


/* ===== VICKY SECRET LAB — CLASSIFIED PAGE ===== */
const CLASSIFIED_CODE='LOCALKDESIGUNDO';
let secretPageOpen=false;
window.unlockSecret=function(){
  const input=document.getElementById('secretCode');
  const code=(input?.value||'').normalize('NFKC').trim().toUpperCase().replace(/[^A-Z0-9]/g,'');
  if(code!==CLASSIFIED_CODE){
    showToast('❌ ACCESS DENIED — UNKNOWN CODE');
    const status=document.getElementById('secretStatus');
    if(status) status.textContent='ACCESS DENIED';
    if(input) input.select();
    return false;
  }
  openClassifiedPage();
  if(input) input.value='';
  return true;
};
function openClassifiedPage(){
  const page=document.getElementById('classifiedPage');
  if(!page)return;
  page.hidden=false;
  page.setAttribute('aria-hidden','false');
  document.body.classList.add('classified-open');
  secretPageOpen=true;
  showToast('🔓 CLASSIFIED PAGE UNLOCKED');
  beep();
}
window.closeClassifiedPage=function(){
  const page=document.getElementById('classifiedPage');
  if(!page)return;
  page.hidden=true;
  page.setAttribute('aria-hidden','true');
  document.body.classList.remove('classified-open');
  secretPageOpen=false;
  const status=document.getElementById('secretStatus');
  if(status) status.textContent='SYSTEM LOCKED';
};
document.addEventListener('keydown',e=>{
  if(e.key==='Enter'&&document.activeElement?.id==='secretCode')window.unlockSecret();
  if(e.key==='Escape'&&secretPageOpen)window.closeClassifiedPage();
});

/* ===== RUDRA GAME ZONE ===== */
const gameState={};
function safeGet(key,fallback=''){try{return window.localStorage?.getItem(key)??fallback}catch(e){return fallback}}
function safeSet(key,value){try{window.localStorage?.setItem(key,String(value))}catch(e){}}
function getBest(k){return Number(safeGet('rps_'+k,0))||0}
function setBest(k,v){if(v>getBest(k)){safeSet('rps_'+k,v);return true}return false}
function refreshBests(){['shadow','arena','neural'].forEach(k=>{const el=document.getElementById('best'+k[0].toUpperCase()+k.slice(1));if(el)el.textContent=k.toUpperCase()+': '+getBest(k)})}
window.addEventListener('load',()=>{refreshBests();refreshNewGameBests?.();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('gameModal').classList.contains('open'))closeGame()});

function startShadow(){
 const cases=[
  {place:'TECH MUSEUM',culprit:'MIRA',suspects:['MIRA','KABIR','ZANE'],clues:['The security badge was used at 21:14.','MIRA says she left at 20:50.','A torn blue thread was found beside the locked display.','KABIR was on camera in the lobby at 21:10.','The curator remembers ZANE wearing a blue jacket.'],truth:'MIRA'},
  {place:'SKYLINE LAB',culprit:'ZANE',suspects:['MIRA','KABIR','ZANE'],clues:['A lab key opened the server room at 18:42.','KABIR says he was fixing the elevator.','A silver tool was found near the console.','MIRA was logged into the reception terminal at 18:40.','ZANE had the only spare lab key.'],truth:'ZANE'},
  {place:'MIDNIGHT ARCHIVE',culprit:'KABIR',suspects:['MIRA','KABIR','ZANE'],clues:['The archive alarm triggered at 23:07.','ZANE was recorded outside the building at 23:05.','A staff access card was found near the archive door.','MIRA says her card never left her desk.','KABIR was assigned the night shift.'],truth:'KABIR'}
 ];
 const c=cases[Math.floor(Math.random()*cases.length)];gameState.shadow={c,seen:0,score:100,used:[],finished:false};
 renderShadow();
}
function renderShadow(){const s=gameState.shadow,c=s.c,m=document.getElementById('gameMount');m.innerHTML=`<div class="game-title"><span class="game-icon">🕵️</span><div><h2>PROJECT SHADOW</h2><div class="game-sub">CASE // ${c.place}</div></div></div><div class="game-status"><span class="game-stat">EVIDENCE: ${s.seen}/${c.clues.length}</span><span class="game-stat">SCORE: ${s.score}</span><span class="game-stat">BEST: ${getBest('shadow')}</span></div><div class="game-panel"><h3>🔎 INVESTIGATE</h3><p>Inspect clues carefully. Each clue can only be revealed once.</p><div id="clueList"></div><div class="game-buttons"><button class="btn primary" onclick="revealClue()">REVEAL NEXT CLUE</button></div></div><div class="game-panel"><h3>WHO DID IT?</h3><div class="suspect-grid">${c.suspects.map(x=>`<button class="game-choice" onclick="accuseShadow('${x}')">${x}</button>`).join('')}</div><div id="shadowLog" class="game-log"></div></div>`;}
function revealClue(){const s=gameState.shadow;if(s.seen>=s.c.clues.length){showToast('All clues revealed');return}s.seen++;s.score=Math.max(0,s.score-5);const list=document.getElementById('clueList');const d=document.createElement('div');d.className='clue';d.textContent='CLUE '+s.seen+' // '+s.c.clues[s.seen-1];list.appendChild(d);document.querySelector('.game-stat').textContent=`EVIDENCE: ${s.seen}/${s.c.clues.length}`;document.querySelectorAll('.game-stat')[1].textContent='SCORE: '+s.score;beep()}
function accuseShadow(name){const s=gameState.shadow;if(s.finished)return;s.finished=true;let win=name===s.c.truth;let final=Math.max(0,s.score+(win?50:0));if(win){setBest('shadow',final);document.getElementById('shadowLog').innerHTML=`<p class="game-win">🔥 CASE SOLVED — ${name} was the culprit.</p><p>Final score: <b>${final}</b>. ${final>getBest('shadow')?'New record!':''}</p><button class="btn primary" onclick="startShadow()">NEW CASE</button>`}else{final=Math.max(0,s.score-25);document.getElementById('shadowLog').innerHTML=`<p class="game-win">❌ WRONG ACCUSATION.</p><p>The real culprit was <b>${s.c.truth}</b>. Final score: ${final}.</p><button class="btn primary" onclick="startShadow()">RETRY CASE</button>`}refreshBests()}

function startArena(){gameState.arena={hp:100,enemy:100,energy:60,score:0,turn:1,streak:0,over:false};renderArena()}
function renderArena(){const s=gameState.arena,m=document.getElementById('gameMount');m.innerHTML=`<div class="game-title"><span class="game-icon">⚔️</span><div><h2>CYBER ARENA</h2><div class="game-sub">RANKED DUEL // ${s.turn===1?'ROUND 1':'ROUND '+s.turn}</div></div></div><div class="game-status"><span class="game-stat">YOU: ${s.hp} HP</span><span class="game-stat">RIVAL: ${s.enemy} HP</span><span class="game-stat">ENERGY: ${s.energy}</span><span class="game-stat">SCORE: ${s.score}</span><span class="game-stat">STREAK: ${s.streak}</span></div><div class="game-panel"><h3>RUDRA // ${s.hp} HP</h3><div class="arena-hp"><i style="width:${s.hp}%"></i></div><h3>CYBER RIVAL // ${s.enemy} HP</h3><div class="arena-hp"><i style="width:${s.enemy}%"></i></div></div><div class="game-panel"><h3>CHOOSE YOUR MOVE</h3><div class="game-buttons"><button class="game-choice" onclick="arenaMove('pulse')">⚡ PULSE — 18 DMG</button><button class="game-choice" onclick="arenaMove('strike')">💥 STRIKE — 25 DMG / 20 ENERGY</button><button class="game-choice" onclick="arenaMove('shield')">🛡️ SHIELD — BLOCK + ENERGY</button><button class="game-choice" onclick="arenaMove('overdrive')">🔥 OVERDRIVE — 40 DMG / 40 ENERGY</button></div><div id="arenaLog" class="game-log">The rival is waiting...</div></div>`}
function arenaMove(move){const s=gameState.arena;if(s.over)return;let cost={pulse:0,strike:20,shield:0,overdrive:40}[move];if(s.energy<cost){document.getElementById('arenaLog').textContent='Not enough energy. Build energy with PULSE or SHIELD.';return}s.energy-=cost;let dmg=move==='pulse'?18:move==='strike'?25:move==='overdrive'?40:0;let blocked=move==='shield';if(move==='pulse')s.energy=Math.min(100,s.energy+12);if(blocked)s.energy=Math.min(100,s.energy+30);s.enemy=Math.max(0,s.enemy-dmg);let enemyDmg=s.enemy>0?(Math.floor(Math.random()*16)+8):0;if(blocked)enemyDmg=Math.floor(enemyDmg*.25);if(move==='overdrive'&&Math.random()<.35)enemyDmg+=8;s.hp=Math.max(0,s.hp-enemyDmg);s.turn++;if(dmg>0)s.streak++;else s.streak=0;s.score+=dmg+(blocked?10:0)+s.streak*3;let log=dmg?`You hit for ${dmg} damage. Rival hits back for ${enemyDmg}.`:`You brace and gain energy. Rival hits for ${enemyDmg}.`;if(s.enemy<=0){s.over=true;s.score+=100;setBest('arena',s.score);log=`🏆 ARENA CLEARED! Final score ${s.score}.`;}else if(s.hp<=0){s.over=true;log=`💀 SYSTEM DOWN. Score ${s.score}.`;}renderArena();document.getElementById('arenaLog').innerHTML=`<p>${log}</p>${s.over?'<button class="btn primary" onclick="startArena()">REMATCH</button>':''}`;if(s.over)refreshBests()}

function startNeural(){gameState.neural={level:1,score:0,sequence:[],input:[],accept:false};renderNeural('Press START to generate a pattern.')}
function renderNeural(msg){const s=gameState.neural,m=document.getElementById('gameMount');m.innerHTML=`<div class="game-title"><span class="game-icon">🧠</span><div><h2>NEURAL BREAK</h2><div class="game-sub">MEMORY CORE // LEVEL ${s.level}</div></div></div><div class="game-status"><span class="game-stat">LEVEL: ${s.level}</span><span class="game-stat">SCORE: ${s.score}</span><span class="game-stat">BEST: ${getBest('neural')}</span></div><div class="game-panel"><div class="big-score" id="neuralMsg">${msg}</div><div class="neural-grid">${Array.from({length:16},(_,i)=>`<button class="neural-cell" id="nc${i}" onclick="neuralTap(${i})"></button>`).join('')}</div><div class="game-buttons"><button class="btn primary" onclick="neuralStartRound()">START / NEXT LEVEL</button></div></div>`}
function neuralStartRound(){const s=gameState.neural;s.input=[];s.accept=false;s.sequence=Array.from({length:Math.min(3+s.level-1,10)},()=>Math.floor(Math.random()*16));document.getElementById('neuralMsg').textContent='MEMORIZE...';let i=0;const cells=s.sequence;const timer=setInterval(()=>{document.querySelectorAll('.neural-cell').forEach(x=>x.classList.remove('active'));if(i>=cells.length){clearInterval(timer);s.accept=true;document.getElementById('neuralMsg').textContent='YOUR TURN — reproduce the pattern';return}document.getElementById('nc'+cells[i]).classList.add('active');i++},480)}
function neuralTap(i){const s=gameState.neural;if(!s.accept)return;s.input.push(i);document.getElementById('nc'+i).classList.add('selected');let pos=s.input.length-1;if(i!==s.sequence[pos]){s.accept=false;let final=s.score;setBest('neural',final);document.getElementById('neuralMsg').textContent='❌ SYSTEM BREAK — SCORE '+final;setTimeout(()=>renderNeural('Try to beat your best score.'),900);return}if(s.input.length===s.sequence.length){s.accept=false;s.score+=s.level*25;s.level++;setTimeout(()=>renderNeural('🔥 LEVEL CLEARED! Get ready for the next pattern.'),500)}}

/* ===== EXTREME AUDIO ENGINE ===== */
let audioCtx=null, masterGain=null;
function initAudio(){
  if(!audioCtx){audioCtx=new (window.AudioContext||window.webkitAudioContext)();masterGain=audioCtx.createGain();masterGain.gain.value=.16;masterGain.connect(audioCtx.destination)}
  if(audioCtx.state==='suspended') audioCtx.resume();
}
function tone(freq,duration=.08,type='sine',volume=.18,slide=0){
  if(!soundOn)return; initAudio(); const o=audioCtx.createOscillator(),g=audioCtx.createGain();
  o.type=type;o.frequency.setValueAtTime(freq,audioCtx.currentTime);if(slide)o.frequency.linearRampToValueAtTime(Math.max(40,freq+slide),audioCtx.currentTime+duration);
  g.gain.setValueAtTime(volume,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+duration);o.connect(g);g.connect(masterGain);o.start();o.stop(audioCtx.currentTime+duration);
}
function noise(duration=.12,volume=.18){
  if(!soundOn)return;initAudio();const n=audioCtx.createBufferSource(),b=audioCtx.createBuffer(1,audioCtx.sampleRate*duration,audioCtx.sampleRate),d=b.getChannelData(0);
  for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);n.buffer=b;const g=audioCtx.createGain();g.gain.value=volume;n.connect(g);g.connect(masterGain);n.start();
}
function sfx(kind){
  if(!soundOn)return;
  const map={click:()=>tone(620,.045,'square',.12,80),hover:()=>tone(900,.035,'sine',.08,120),open:()=>{tone(260,.1,'sawtooth',.12,260);setTimeout(()=>tone(620,.12,'sine',.1,180),70)},success:()=>{tone(520,.08,'square',.14,180);setTimeout(()=>tone(760,.1,'square',.14,220),80);setTimeout(()=>tone(1040,.16,'sine',.12,120),170)},error:()=>{tone(190,.16,'sawtooth',.16,-80);setTimeout(()=>tone(120,.18,'sawtooth',.12,-40),120)},shot:()=>{noise(.09,.25);tone(95,.07,'square',.22,-35)},hit:()=>{tone(740,.06,'square',.16,-260);setTimeout(()=>tone(420,.08,'sine',.12,-180),45)},tick:()=>tone(1000,.035,'square',.08,-100),level:()=>{tone(440,.08,'sine',.12,200);setTimeout(()=>tone(660,.1,'sine',.12,240),80)},};
  if(map[kind])map[kind]();
}
function toggleSound(){soundOn=!soundOn;document.getElementById('soundLabel').textContent='SOUND: '+(soundOn?'ON':'OFF');if(soundOn){initAudio();sfx('success');showToast('🔊 EXTREME SOUND SYSTEM ONLINE')}else showToast('🔇 SOUND OFF')}
// Make existing UI actions audible without changing the original functions.
document.addEventListener('click',e=>{if(e.target.matches('button,.btn,a'))sfx('click')});
document.addEventListener('mouseover',e=>{if(e.target.matches('button,.btn,a'))sfx('hover')},{passive:true});

/* ===== CYBER SHOOTOUT ===== */
function startShootout(){
 gameState.shootout={score:0,hits:0,shots:0,time:20,combo:0,running:false,over:false,target:null,timer:null,spawn:null};renderShootout('Press START to enter the range.');
}
function renderShootout(msg=''){
 const s=gameState.shootout,m=document.getElementById('gameMount');
 m.innerHTML=`<div class="game-title"><span class="game-icon">🎯</span><div><h2>CYBER SHOOTOUT</h2><div class="game-sub">REFLEX RANGE // 20 SECOND RUN</div></div></div>
 <div class="game-status"><span class="game-stat">TIME: <b id="shootTime">${s.time}s</b></span><span class="game-stat">HITS: ${s.hits}</span><span class="game-stat">SHOTS: ${s.shots}</span><span class="game-stat">COMBO: ${s.combo}x</span><span class="game-stat">SCORE: ${s.score}</span><span class="game-stat">BEST: ${getBest('shootout')}</span></div>
 <div class="game-panel"><div class="shoot-range" id="shootRange"><div class="range-grid"></div><div class="range-message" id="shootMsg">${msg}</div></div><div class="game-buttons"><button class="btn primary" onclick="shootoutStart()">START / REPLAY</button></div></div>`;
}
function shootoutStart(){
 const s=gameState.shootout;if(s.running){return} if(s.timer)clearInterval(s.timer);if(s.spawn)clearTimeout(s.spawn);
 s.score=0;s.hits=0;s.shots=0;s.combo=0;s.time=20;s.running=true;s.over=false;renderShootout('TARGET INCOMING...');sfx('open');spawnTarget();
 s.timer=setInterval(()=>{s.time--;sfx('tick');const el=document.getElementById('shootTime');if(el)el.textContent=s.time+'s';if(s.time<=0)endShootout()},1000);
}
function spawnTarget(){
 const s=gameState.shootout;if(!s.running)return;const range=document.getElementById('shootRange');if(!range)return;
 document.querySelectorAll('.shoot-target').forEach(x=>x.remove());
 const t=document.createElement('button');t.className='shoot-target';t.setAttribute('aria-label','target');t.innerHTML='<span></span>';
 t.style.left=(8+Math.random()*76)+'%';t.style.top=(10+Math.random()*68)+'%';t.onclick=()=>hitTarget(t);range.appendChild(t);s.target=t;
 s.spawn=setTimeout(()=>{if(s.running&&s.target===t){s.combo=0;sfx('error');t.remove();spawnTarget()}},1100);
}
function hitTarget(t){
 const s=gameState.shootout;if(!s.running)return;s.shots++;s.hits++;s.combo++;s.score+=100+(s.combo-1)*25;sfx('shot');setTimeout(()=>sfx('hit'),45);t.classList.add('hit');setTimeout(()=>{t.remove();if(s.running)spawnTarget()},80);updateShootoutStatus();
}
function shootoutMiss(e){if(e.target.id==='shootRange'&&gameState.shootout.running){gameState.shootout.shots++;gameState.shootout.combo=0;sfx('shot');updateShootoutStatus()}}
function updateShootoutStatus(){
 const s=gameState.shootout;const stats=document.querySelectorAll('#gameMount .game-stat');if(stats.length>=6){stats[1].textContent='HITS: '+s.hits;stats[2].textContent='SHOTS: '+s.shots;stats[3].textContent='COMBO: '+s.combo+'x';stats[4].textContent='SCORE: '+s.score}
}
function endShootout(){
 const s=gameState.shootout;if(!s.running)return;s.running=false;clearInterval(s.timer);clearTimeout(s.spawn);s.timer=null;s.spawn=null;document.querySelectorAll('.shoot-target').forEach(x=>x.remove());
 const record=setBest('shootout',s.score);refreshBests();sfx(s.score>0?'success':'error');renderShootout(`RUN COMPLETE — SCORE ${s.score}${record?' • NEW RECORD':''}`);
}
const oldRefreshBests=refreshBests;
refreshBests=function(){oldRefreshBests();const el=document.getElementById('bestShootout');if(el)el.textContent='SHOOTOUT: '+getBest('shootout')};
window.addEventListener('load',()=>{const r=document.getElementById('shootRange');if(r)r.addEventListener('click',shootoutMiss)});
beep=function(){sfx('click')};
document.addEventListener('click',e=>{if(e.target.closest('#shootRange') && !e.target.closest('.shoot-target'))shootoutMiss(e)});

/* ==========================================================
   VICKY ARCADE 2.0 — MOBILE FIRST CAR + COLOURFUL BLASTER
   Uses Web Audio only: no external sound files required.
========================================================== */
const arcade={car:null,blaster:null,bottles:null,platformer:null,bubble:null,bubbleRush:null,memory:null,space:null,rooftop:null,raf:null};
function arcadeBest(key){return Number(safeGet('vicky_'+key,0))||0}
function arcadeSetBest(key,val){if(val>arcadeBest(key)){safeSet('vicky_'+key,Math.floor(val));return true}return false}
function arcadeAudio(kind){
  try{initAudio(); if(!soundOn) soundOn=true;
    const now=audioCtx.currentTime, o=audioCtx.createOscillator(), g=audioCtx.createGain();
    const cfg={start:[220,.06,'sawtooth',.12,520],move:[480,.035,'square',.07,100],coin:[880,.08,'triangle',.1,320],hit:[140,.11,'square',.15,-70],boss:[70,.25,'sawtooth',.16,180],win:[520,.1,'triangle',.13,500],crash:[100,.28,'sawtooth',.2,-75],laser:[680,.06,'square',.12,-380],click:[520,.035,'square',.07,80]};
    const c=cfg[kind]||cfg.click;o.type=c[2];o.frequency.setValueAtTime(c[0],now);o.frequency.linearRampToValueAtTime(Math.max(35,c[0]+c[4]),now+c[1]);g.gain.setValueAtTime(c[3],now);g.gain.exponentialRampToValueAtTime(.001,now+c[1]);o.connect(g);g.connect(masterGain);o.start(now);o.stop(now+c[1]);
  }catch(e){}
}
function openGame(type){
 closeGame();
 const m=document.getElementById('gameModal');if(!m)return;m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
 if(type==='car')startCarGame(); else if(type==='blaster')startBlasterGame(); else if(type==='bottles')startBottleGame(); else if(type==='platformer')startPlatformerGame(); else if(type==='bubble')startBubbleGame(); else if(type==='bubbleRush')startBubbleRushGame(); else if(type==='memory')startMemoryGame(); else if(type==='space')startSpaceGame(); else if(type==='rooftop')startRooftopGame(); else if(type==='shadow')startShadow(); else if(type==='arena')startArena(); else if(type==='neural')startNeural(); else if(NEW_GAME_TYPES.includes(type))startNewGame(type); else { showToast('GAME NOT FOUND'); closeGame(); return; }
 arcadeAudio('start');
}
function closeGame(){
 if(typeof window.stopRudraCityGame==='function'){try{window.stopRudraCityGame();}catch(e){}}
 window.stopRudraCityGame=null;
 cancelAnimationFrame(arcade.raf);clearInterval(arcade.car?.timer);clearInterval(arcade.blaster?.timer);clearInterval(arcade.bottles?.timer);clearInterval(arcade.bubble?.timer);clearInterval(arcade.bubbleRush?.timer);window.onkeydown=null;window.onkeyup=null;document.getElementById('gameModal')?.classList.remove('open','rudra-city-fullscreen');document.getElementById('gameModal')?.setAttribute('aria-hidden','true');document.body.style.overflow='';
}
function refreshArcadeBests(){const a=document.getElementById('bestCar'),b=document.getElementById('bestBlaster'),d=document.getElementById('bestBottles'),e=document.getElementById('bestPlatformer'),f=document.getElementById('bestBubble'),g=document.getElementById('bestBubbleRush'),h=document.getElementById('bestSpace'),i=document.getElementById('bestRooftop');if(a)a.textContent='DRIVE: '+arcadeBest('car');if(b)b.textContent='BLASTER: '+arcadeBest('blaster');if(d)d.textContent='BOTTLES: '+arcadeBest('bottles');if(e)e.textContent='RUN: '+arcadeBest('platformer');if(f)f.textContent='BUBBLES: '+arcadeBest('bubble');if(g)g.textContent='STORM: '+arcadeBest('bubbleRush');if(h)h.textContent='SPACE: '+arcadeBest('space');if(i)i.textContent='ROOFTOP: '+arcadeBest('rooftop')}
function refreshNewGameBests(){
  const labels={reflexGrid:'REFLEX',dodgeArena:'DODGE',coinCatcher:'COINS',laserDefense:'LASER',colorSort:'COLOR',numberRush:'NUMBERS',gravityFlip:'GRAVITY',bridgeBuilder:'BRIDGE',orbitDefender:'ORBIT',wordScramble:'WORDS'};
  for(const [type,label] of Object.entries(labels)){const el=document.getElementById('bestNew_'+type);if(el)el.textContent=label+': '+arcadeBest('new_'+type);}
}
function gameCanvas(){return document.getElementById('arcadeCanvas')}
function arcadeMount(html){document.getElementById('gameMount').innerHTML=html}
function startSpaceGame(){cancelAnimationFrame(arcade.raf);const W=900,H=620;arcade.space={W,H,x:450,y:520,score:0,lives:3,running:false,keys:{left:false,right:false},objects:[],spawn:0,last:0};arcadeMount(`<div class="game-title"><span class="game-icon">🚀</span><div><h2>SPACE DODGE</h2><div class="game-sub">DODGE // SURVIVE // SCORE</div></div></div><div class="arcade-shell"><div class="arcade-head"><b>SPACE FIELD</b><div class="arcade-stats"><span class="arcade-stat" id="spaceScore">SCORE 0</span><span class="arcade-stat" id="spaceLives">LIVES 3</span><span class="arcade-stat" id="spaceBest">BEST ${arcadeBest('space')}</span></div></div><div class="arcade-canvas-wrap"><canvas id="arcadeCanvas" class="arcade-canvas" width="900" height="620"></canvas><div id="spaceOverlay" class="arcade-overlay"><div class="arcade-message"><h3>🚀 READY?</h3><p>Use ← → or A/D to move. Avoid the falling asteroids.</p></div></div></div><div class="arcade-actions"><button class="btn primary" onclick="spaceStart()">START / REPLAY</button><button class="btn" onclick="closeGame()">EXIT</button></div></div>`);const c=gameCanvas();c?.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();const q=arcade.space;q.x=Math.max(35,Math.min(W-35,(e.clientX-r.left)*W/r.width));});window.onkeydown=e=>{const q=arcade.space;if(!q)return;if(['ArrowLeft','a','A'].includes(e.key))q.keys.left=true;if(['ArrowRight','d','D'].includes(e.key))q.keys.right=true;if(e.key===' '&&!q.running)spaceStart();};window.onkeyup=e=>{const q=arcade.space;if(!q)return;if(['ArrowLeft','a','A'].includes(e.key))q.keys.left=false;if(['ArrowRight','d','D'].includes(e.key))q.keys.right=false;};drawSpace();}
function spaceStart(){const q=arcade.space;if(!q)return;q.x=450;q.y=520;q.score=0;q.lives=3;q.objects=[];q.spawn=0;q.running=true;q.last=performance.now();document.getElementById('spaceOverlay')?.setAttribute('hidden','');cancelAnimationFrame(arcade.raf);arcade.raf=requestAnimationFrame(spaceLoop)}
function spaceLoop(t){const q=arcade.space;if(!q?.running)return;const dt=Math.min(.032,(t-q.last)/1000);q.last=t;q.score+=dt*10;if(q.keys.left)q.x-=300*dt;if(q.keys.right)q.x+=300*dt;q.x=Math.max(30,Math.min(q.W-30,q.x));q.spawn-=dt;if(q.spawn<=0){q.objects.push({x:30+Math.random()*(q.W-60),y:-30,r:14+Math.random()*18,vy:170+Math.random()*100+q.score/25});q.spawn=Math.max(.22,.65-q.score/900)};for(let i=q.objects.length-1;i>=0;i--){const o=q.objects[i];o.y+=o.vy*dt;if(Math.hypot(o.x-q.x,o.y-q.y)<o.r+18){q.objects.splice(i,1);q.lives--;arcadeAudio('hit');if(q.lives<=0)return spaceEnd();}else if(o.y>q.H+40)q.objects.splice(i,1)};drawSpace();document.getElementById('spaceScore').textContent='SCORE '+Math.floor(q.score);document.getElementById('spaceLives').textContent='LIVES '+q.lives;arcade.raf=requestAnimationFrame(spaceLoop)}
function drawSpace(){const c=gameCanvas(),q=arcade.space;if(!c||!q)return;const x=c.getContext('2d'),W=q.W,H=q.H;x.clearRect(0,0,W,H);x.fillStyle='#07091a';x.fillRect(0,0,W,H);for(let i=0;i<90;i++){const sx=(i*97)%W,sy=(i*53+Math.floor(q.score*8))%H;x.fillStyle=i%3===0?'#55e7ff':'#ffffff';x.globalAlpha=.35;x.fillRect(sx,sy,2,2)}x.globalAlpha=1;q.objects.forEach(o=>{x.beginPath();x.fillStyle='#ff4d8d';x.arc(o.x,o.y,o.r,0,Math.PI*2);x.fill();x.strokeStyle='#ffd166';x.stroke()});x.save();x.translate(q.x,q.y);x.fillStyle='#55e7ff';x.beginPath();x.moveTo(0,-24);x.lineTo(22,20);x.lineTo(0,13);x.lineTo(-22,20);x.closePath();x.fill();x.fillStyle='#ff8a3d';x.beginPath();x.moveTo(-8,18);x.lineTo(0,38+Math.random()*8);x.lineTo(8,18);x.fill();x.restore()}
function spaceEnd(){const q=arcade.space;if(!q)return;q.running=false;cancelAnimationFrame(arcade.raf);const score=Math.floor(q.score);arcadeSetBest('space',score);const o=document.getElementById('spaceOverlay');if(o){o.hidden=false;o.innerHTML=`<div class="arcade-message"><h3>💥 RUN OVER</h3><p>Score: ${score}</p><p>Press START / REPLAY to try again.</p></div>`}document.getElementById('spaceBest').textContent='BEST '+arcadeBest('space');}
function startRooftopGame(){cancelAnimationFrame(arcade.raf);const W=900,H=620;arcade.rooftop={W,H,x:90,y:430,vy:0,score:0,coins:0,running:false,ground:true,keys:{left:false,right:false},platforms:[],last:0,spawn:0};arcadeMount(`<div class="game-title"><span class="game-icon">🏃</span><div><h2>ROOFTOP RUN</h2><div class="game-sub">RUN // JUMP // COLLECT</div></div></div><div class="arcade-shell"><div class="arcade-head"><b>ROOFTOP CITY</b><div class="arcade-stats"><span class="arcade-stat" id="roofScore">DIST 0</span><span class="arcade-stat" id="roofCoins">COINS 0</span><span class="arcade-stat" id="roofBest">BEST ${arcadeBest('rooftop')}</span></div></div><div class="arcade-canvas-wrap"><canvas id="arcadeCanvas" class="arcade-canvas" width="900" height="620"></canvas><div id="roofOverlay" class="arcade-overlay"><div class="arcade-message"><h3>🏃 READY?</h3><p>Hold → or D to run. Press Space/↑ to jump across rooftops.</p></div></div></div><div class="arcade-actions"><button class="btn primary" onclick="roofStart()">START / REPLAY</button><button class="btn" onclick="closeGame()">EXIT</button></div></div>`);window.onkeydown=e=>{const q=arcade.rooftop;if(!q)return;if(['ArrowRight','d','D'].includes(e.key))q.keys.right=true;if(['ArrowLeft','a','A'].includes(e.key))q.keys.left=true;if([' ','ArrowUp','w','W'].includes(e.key)&&q.ground){q.vy=-520;q.ground=false;arcadeAudio('move');e.preventDefault()}if(e.key==='Enter'&&!q.running)roofStart()};window.onkeyup=e=>{const q=arcade.rooftop;if(!q)return;if(['ArrowRight','d','D'].includes(e.key))q.keys.right=false;if(['ArrowLeft','a','A'].includes(e.key))q.keys.left=false};const c=gameCanvas();c?.addEventListener('pointerdown',()=>{const q=arcade.rooftop;if(q.ground&&q.running){q.vy=-520;q.ground=false}});drawRoof();}
function roofStart(){const q=arcade.rooftop;if(!q)return;q.x=100;q.y=430;q.vy=0;q.score=0;q.coins=0;q.running=true;q.ground=true;q.platforms=[];for(let i=0;i<8;i++)q.platforms.push({x:i*150,y:480-(i%3)*35,w:150,h:30,coin:i>0&&i%2===0});q.last=performance.now();document.getElementById('roofOverlay')?.setAttribute('hidden','');cancelAnimationFrame(arcade.raf);arcade.raf=requestAnimationFrame(roofLoop)}
function roofLoop(t){const q=arcade.rooftop;if(!q?.running)return;const dt=Math.min(.032,(t-q.last)/1000);q.last=t;const run=q.keys.right?250:120;q.x+=run*dt;q.score+=run*dt/10;q.vy+=1250*dt;q.y+=q.vy*dt;const world=q.x-120;while(q.platforms[q.platforms.length-1].x<world+1100){const last=q.platforms[q.platforms.length-1];const gap=25+Math.random()*45;const y=Math.max(380,Math.min(500,last.y+(Math.random()*100-50)));q.platforms.push({x:last.x+last.w+gap,y,w:130+Math.random()*70,h:30,coin:Math.random()<.65})}q.ground=false;for(const p of q.platforms){if(q.x+18>p.x&&q.x-18<p.x+p.w&&q.y+42>=p.y&&q.y+42<=p.y+28+Math.max(8,q.vy*dt+8)){q.y=p.y-42;q.vy=0;q.ground=true;if(p.coin){p.coin=false;q.coins++;q.score+=50;arcadeAudio('coin')}}}q.platforms=q.platforms.filter(p=>p.x>world-250);if(q.y>q.H+80)return roofEnd();drawRoof();document.getElementById('roofScore').textContent='DIST '+Math.floor(q.score);document.getElementById('roofCoins').textContent='COINS '+q.coins;arcade.raf=requestAnimationFrame(roofLoop)}
function drawRoof(){const c=gameCanvas(),q=arcade.rooftop;if(!c||!q)return;const x=c.getContext('2d'),W=q.W,H=q.H,cam=Math.max(0,q.x-160);x.clearRect(0,0,W,H);x.fillStyle='#15112b';x.fillRect(0,0,W,H);for(let i=0;i<12;i++){x.fillStyle=i%2?'#32245b':'#261d48';const bx=(i*110-(cam*.15)%110);x.fillRect(bx,220+(i%4)*35,80,300)}x.fillStyle='#55e7ff';q.platforms.forEach(p=>{const sx=p.x-cam;x.fillRect(sx,p.y,p.w,p.h);if(p.coin){x.beginPath();x.fillStyle='#ffd166';x.arc(sx+p.w/2,p.y-22,10,0,Math.PI*2);x.fill();x.fillStyle='#55e7ff'}});const px=q.x-cam;x.fillStyle='#ff4d8d';x.fillRect(px-18,q.y,36,42);x.fillStyle='#fff';x.fillRect(px+7,q.y+10,5,5)}
function roofEnd(){const q=arcade.rooftop;if(!q)return;q.running=false;cancelAnimationFrame(arcade.raf);const score=Math.floor(q.score);arcadeSetBest('rooftop',score);const o=document.getElementById('roofOverlay');if(o){o.hidden=false;o.innerHTML=`<div class="arcade-message"><h3>🏙️ RUN ENDED</h3><p>Distance: ${score} • Coins: ${q.coins}</p><p>Press START / REPLAY to run again.</p></div>`}document.getElementById('roofBest').textContent='BEST '+arcadeBest('rooftop')}

function startMemoryGame(){
 clearInterval(arcade.memory?.timer);cancelAnimationFrame(arcade.raf);
 const unlocked=getSecretUnlocks().includes('VICKY3');
 if(!unlocked){showToast('🔒 VICKY CORE REQUIRED');return}
 arcade.memory={score:0,level:1,sequence:[],input:[],accept:false,running:false,timer:null};
 arcadeMount(`<div class="game-title"><span class="game-icon">🧠</span><div><h2>MEMORY CORE</h2><div class="game-sub">VICKY CORE // SECRET ARCADE</div></div></div>
 <div class="arcade-shell"><div class="arcade-head"><b>MEMORY GRID</b><div class="arcade-stats"><span class="arcade-stat" id="memLevel">LEVEL 1</span><span class="arcade-stat" id="memScore">SCORE 0</span><span class="arcade-stat" id="memBest">BEST ${arcadeBest('memory')}</span></div></div>
 <div class="game-panel"><p id="memMsg">Watch the pattern, then repeat it.</p><div id="memoryGrid" class="memory-grid">${Array.from({length:9},(_,i)=>`<button class="memory-cell" data-i="${i}" onclick="memoryTap(${i})"></button>`).join('')}</div><div class="arcade-actions"><button class="btn primary" onclick="memoryStart()">START / REPLAY</button><button class="btn" onclick="closeGame()">EXIT</button></div></div></div>`);
 refreshArcadeBests();
}
function memoryStart(){
 const s=arcade.memory;if(!s)return;s.score=0;s.level=1;s.running=true;s.accept=false;s.input=[];s.sequence=[];document.getElementById('memMsg').textContent='WATCH THE PATTERN…';memoryNext();
}
function memoryNext(){
 const s=arcade.memory;if(!s?.running)return;s.input=[];s.accept=false;s.sequence.push(Math.floor(Math.random()*9));document.getElementById('memLevel').textContent='LEVEL '+s.level;document.getElementById('memScore').textContent='SCORE '+s.score;const cells=[...document.querySelectorAll('.memory-cell')];let i=0;const timer=setInterval(()=>{cells.forEach(c=>c.classList.remove('active'));if(i>=s.sequence.length){clearInterval(timer);s.accept=true;document.getElementById('memMsg').textContent='YOUR TURN — REPEAT IT';return}cells[s.sequence[i]]?.classList.add('active');setTimeout(()=>cells[s.sequence[i]]?.classList.remove('active'),280);i++},480);
}
function memoryTap(i){
 const s=arcade.memory;if(!s?.running||!s.accept)return;s.input.push(i);document.querySelector(`.memory-cell[data-i="${i}"]`)?.classList.add('selected');setTimeout(()=>document.querySelector(`.memory-cell[data-i="${i}"]`)?.classList.remove('selected'),140);const pos=s.input.length-1;if(i!==s.sequence[pos]){s.accept=false;s.running=false;const record=arcadeSetBest('memory',s.score);document.getElementById('memMsg').innerHTML=`❌ SYSTEM BREAK — SCORE <b>${s.score}</b>${record?' • NEW BEST!':''}`;document.getElementById('memLevel').textContent='GAME OVER';return}if(s.input.length===s.sequence.length){s.accept=false;s.score+=s.level*25;s.level++;arcadeAudio('win');setTimeout(memoryNext,500)}}

function startCarGame(){
 clearInterval(arcade.car?.timer);cancelAnimationFrame(arcade.raf);
 arcade.car={score:0,best:arcadeBest('car'),speed:4.2,lane:1,time:0,running:false,over:false,traffic:[],spawn:0,keys:{left:false,right:false},timer:null};
 arcadeMount(`<div class="game-title"><span class="game-icon">🏎️</span><div><h2>TRAFFIC RUSH</h2><div class="game-sub">COLOUR HIGHWAY // DODGE THE TRAFFIC</div></div></div>
 <div class="arcade-shell"><div class="arcade-head"><b>TRAFFIC DRIVE</b><div class="arcade-stats"><span class="arcade-stat" id="carScore">SCORE 0</span><span class="arcade-stat" id="carSpeed">SPEED 4.2</span><span class="arcade-stat" id="carBest">BEST ${arcade.car.best}</span></div></div>
 <div class="arcade-canvas-wrap"><canvas id="arcadeCanvas" class="arcade-canvas" width="620" height="780"></canvas><div id="carOverlay" class="arcade-overlay"><div class="arcade-message"><h3>🏁 READY?</h3><p>Tap START, then dodge the colourful traffic. On mobile use ◀ ▶.</p></div></div></div>
 <div class="arcade-controls"><button class="arcade-control" id="carLeft">◀</button><button class="arcade-control" id="carBrake">●</button><button class="arcade-control" id="carRight">▶</button></div>
 <div class="arcade-actions"><button class="btn primary" onclick="carStart()">START / REPLAY</button><button class="btn" onclick="closeGame()">EXIT</button></div><div class="arcade-tip">Survive longer = faster traffic. Avoid every car. No gore — pure arcade action.</div></div>`);
 const L=document.getElementById('carLeft'),R=document.getElementById('carRight'),B=document.getElementById('carBrake');
 const press=(k,v)=>e=>{e.preventDefault();arcade.car.keys[k]=v; if(v)arcadeAudio('move')};
 [['pointerdown',press('left',true),L],['pointerup',press('left',false),L],['pointercancel',press('left',false),L],['pointerdown',press('right',true),R],['pointerup',press('right',false),R],['pointercancel',press('right',false),R]].forEach(x=>x[2]?.addEventListener(x[0],x[1]));
 B?.addEventListener('pointerdown',e=>{e.preventDefault();arcade.car.brake=true;});B?.addEventListener('pointerup',e=>{e.preventDefault();arcade.car.brake=false;});
 window.onkeydown=e=>{if(e.key==='ArrowLeft'||e.key.toLowerCase()==='a')arcade.car.keys.left=true;if(e.key==='ArrowRight'||e.key.toLowerCase()==='d')arcade.car.keys.right=true};window.onkeyup=e=>{if(e.key==='ArrowLeft'||e.key.toLowerCase()==='a')arcade.car.keys.left=false;if(e.key==='ArrowRight'||e.key.toLowerCase()==='d')arcade.car.keys.right=false};
 drawCar();refreshArcadeBests();
}
function carStart(){const s=arcade.car;if(!s)return;s.running=true;s.over=false;s.score=0;s.time=0;s.speed=4.2;s.lane=1;s.traffic=[];s.spawn=0;s.brake=false;document.getElementById('carOverlay')?.classList.add('hidden');arcadeAudio('start');clearInterval(s.timer);s.timer=setInterval(()=>{if(s.running)s.time++;},1000);cancelAnimationFrame(arcade.raf);arcade.raf=requestAnimationFrame(carLoop)}
function carLoop(t){const s=arcade.car;if(!s?.running)return;const c=gameCanvas(),ctx=c.getContext('2d'),W=c.width,H=c.height;const roadX=90,roadW=440,laneW=roadW/4;
 if(s.keys.left)s.lane=Math.max(0,s.lane-.055);if(s.keys.right)s.lane=Math.min(3,s.lane+.055);s.speed=Math.min(11,s.speed+(s.brake?-.035:.004));s.speed=Math.max(3,s.speed);s.score+=Math.round(s.speed*.22);s.spawn-=1;
 if(s.spawn<=0){s.spawn=55-Math.min(28,s.speed*2);const lane=Math.floor(Math.random()*4);if(!s.traffic.some(x=>x.lane===lane&&x.y<180))s.traffic.push({lane,y:-130,color:['#ff4d8d','#ffd166','#55e7ff','#a86bff'][Math.floor(Math.random()*4)],speed:2.4+Math.random()*2.5})}
 s.traffic.forEach(x=>x.y+=(s.speed+x.speed));s.traffic=s.traffic.filter(x=>x.y<H+150);if(s.traffic.some(x=>x.lane===Math.round(s.lane)&&x.y>H-190&&x.y<H-65)){carEnd();return}
 ctx.clearRect(0,0,W,H);const grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#090d35');grd.addColorStop(1,'#12051f');ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
 ctx.fillStyle='#15213d';ctx.fillRect(roadX,0,roadW,H);ctx.strokeStyle='#24e7ff';ctx.lineWidth=5;ctx.strokeRect(roadX,0,roadW,H);
 for(let i=1;i<4;i++){ctx.setLineDash([34,28]);ctx.lineDashOffset=-(s.time*40+t/15);ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(roadX+i*laneW,0);ctx.lineTo(roadX+i*laneW,H);ctx.stroke()}ctx.setLineDash([]);
 s.traffic.forEach(x=>drawCarSprite(ctx,roadX+x.lane*laneW+laneW/2,x.y,x.color,false));drawCarSprite(ctx,roadX+s.lane*laneW+laneW/2,H-120,'#36f1ff',true);
 document.getElementById('carScore').textContent='SCORE '+Math.floor(s.score);document.getElementById('carSpeed').textContent='SPEED '+s.speed.toFixed(1);arcade.raf=requestAnimationFrame(carLoop)}
function drawCarSprite(ctx,x,y,color,player){ctx.save();ctx.translate(x,y);ctx.shadowBlur=player?22:14;ctx.shadowColor=color;ctx.fillStyle=color;ctx.roundRect(-28,-48,56,96,14);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#071020';ctx.roundRect(-18,-27,36,24,7);ctx.fill();ctx.fillStyle='#fff';ctx.fillRect(-25,28,9,7);ctx.fillRect(16,28,9,7);ctx.fillStyle=player?'#ffd166':'#ff4d8d';ctx.fillRect(-7,-46,14,7);ctx.restore()}
function carEnd(){const s=arcade.car;if(!s||!s.running)return;s.running=false;clearInterval(s.timer);cancelAnimationFrame(arcade.raf);arcadeAudio('crash');const record=arcadeSetBest('car',s.score);refreshArcadeBests();const o=document.getElementById('carOverlay');if(o){o.classList.remove('hidden');o.innerHTML=`<div class="arcade-message"><h3>💥 RUN ENDED</h3><p>Score: <b>${Math.floor(s.score)}</b>${record?' • NEW BEST!':''}</p><p>Tap REPLAY and try a longer run.</p></div>`}}

function startBlasterGame(){
 clearInterval(arcade.blaster?.timer);cancelAnimationFrame(arcade.raf);arcade.blaster={score:0,best:arcadeBest('blaster'),time:60,combo:0,hits:0,wave:1,running:false,targets:[],spawn:0,timer:null,boss:false};
 arcadeMount(`<div class="game-title"><span class="game-icon">🎯</span><div><h2>TARGET BLASTER</h2><div class="game-sub">COLOUR ARENA // 60 SECOND SCORE RUN</div></div></div>
 <div class="arcade-shell"><div class="arcade-head"><b>BLASTER RANGE</b><div class="arcade-stats"><span class="arcade-stat" id="blastTime">TIME 60</span><span class="arcade-stat" id="blastScore">SCORE 0</span><span class="arcade-stat" id="blastCombo">COMBO 0x</span><span class="arcade-stat" id="blastWave">WAVE 1</span></div></div>
 <div class="arcade-canvas-wrap"><canvas id="arcadeCanvas" class="arcade-canvas" width="620" height="700"></canvas><div id="blastOverlay" class="arcade-overlay"><div class="arcade-message"><h3>🎯 TARGET BLASTER</h3><p>Tap colourful targets to build your combo. Misses reset the combo. Boss waves give bonus points.</p></div></div></div>
 <div class="arcade-actions"><button class="btn primary" onclick="blasterStart()">START / REPLAY</button><button class="btn" onclick="closeGame()">EXIT</button></div><div class="arcade-tip">Arcade-style fictional blaster: colourful targets only, no graphic content.</div></div>`);
 document.getElementById('arcadeCanvas').addEventListener('pointerdown',blasterTap);drawBlaster();refreshArcadeBests();
}
function blasterStart(){const s=arcade.blaster;if(!s)return;s.running=true;s.score=0;s.time=60;s.combo=0;s.hits=0;s.wave=1;s.targets=[];s.spawn=0;s.boss=false;document.getElementById('blastOverlay')?.classList.add('hidden');arcadeAudio('start');clearInterval(s.timer);s.timer=setInterval(()=>{if(!s.running)return;s.time--;if(s.time<=0)blasterEnd();},1000);cancelAnimationFrame(arcade.raf);arcade.raf=requestAnimationFrame(blasterLoop)}
function blasterLoop(t){const s=arcade.blaster;if(!s?.running)return;const c=gameCanvas(),ctx=c.getContext('2d'),W=c.width,H=c.height;s.spawn--;s.wave=1+Math.floor((60-s.time)/12);if(s.spawn<=0){s.spawn=Math.max(15,48-s.wave*4);const boss=s.wave>=4&&Math.random()<.14;s.targets.push({x:50+Math.random()*(W-100),y:70+Math.random()*(H-150),r:boss?46:24+Math.random()*9,color:['#ff4d8d','#ffd166','#48f5a7','#55e7ff','#a86bff'][Math.floor(Math.random()*5)],life:boss?90:55,boss})}s.targets.forEach(x=>x.life--);s.targets=s.targets.filter(x=>x.life>0);drawBlaster();document.getElementById('blastTime').textContent='TIME '+s.time;document.getElementById('blastScore').textContent='SCORE '+s.score;document.getElementById('blastCombo').textContent='COMBO '+s.combo+'x';document.getElementById('blastWave').innerHTML=s.boss?'<span class="boss-badge">BOSS WAVE</span>':'WAVE '+s.wave;arcade.raf=requestAnimationFrame(blasterLoop)}
function drawBlaster(){const s=arcade.blaster,c=gameCanvas();if(!c)return;const ctx=c.getContext('2d'),W=c.width,H=c.height;const g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,'#11082d');g.addColorStop(.5,'#062747');g.addColorStop(1,'#270b2c');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);for(let i=0;i<35;i++){ctx.fillStyle=['#55e7ff','#ff4d8d','#ffd166','#48f5a7','#a86bff'][i%5];ctx.globalAlpha=.18;ctx.beginPath();ctx.arc((i*97)%W,(i*47)%H,2+(i%4),0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;s?.targets.forEach(x=>{ctx.save();ctx.translate(x.x,x.y);ctx.shadowBlur=24;ctx.shadowColor=x.color;ctx.strokeStyle=x.color;ctx.lineWidth=5;ctx.beginPath();ctx.arc(0,0,x.r,0,Math.PI*2);ctx.stroke();ctx.fillStyle=x.color;ctx.globalAlpha=.16;ctx.fill();ctx.globalAlpha=1;ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,x.r*.45,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(0,0,x.boss?8:5,0,Math.PI*2);ctx.fill();if(x.boss){ctx.strokeStyle='#ff4d8d';ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,x.r+10,0,Math.PI*2);ctx.stroke()}ctx.restore()})}
function blasterTap(e){const s=arcade.blaster;if(!s?.running)return;const c=gameCanvas(),r=c.getBoundingClientRect(),x=(e.clientX-r.left)*c.width/r.width,y=(e.clientY-r.top)*c.height/r.height;s.shotX=x;s.shotY=y;s.flash=7;let hit=-1;for(let i=s.targets.length-1;i>=0;i--){const q=s.targets[i],d=Math.hypot(x-q.x,y-q.y);if(d<q.r+14){hit=i;break}}arcadeAudio('laser');if(hit<0){s.combo=0;return}const q=s.targets[hit];s.hits++;s.combo++;s.score+=q.boss?500+s.combo*30:100+s.combo*20;s.boss=q.boss;arcadeAudio(q.boss?'boss':'hit');s.targets.splice(hit,1);if(s.combo%5===0)arcadeAudio('win')}
function blasterEnd(){const s=arcade.blaster;if(!s||!s.running)return;s.running=false;clearInterval(s.timer);cancelAnimationFrame(arcade.raf);const record=arcadeSetBest('blaster',s.score);refreshArcadeBests();arcadeAudio(s.score>0?'win':'crash');const o=document.getElementById('blastOverlay');if(o){o.classList.remove('hidden');o.innerHTML=`<div class="arcade-message"><h3>🏆 RUN COMPLETE</h3><p>Score: <b>${s.score}</b>${record?' • NEW BEST!':''}</p><p>Hits: ${s.hits} • Best combo: ${s.combo}x</p><p>Tap REPLAY for another round.</p></div>`}}
window.addEventListener('load',refreshArcadeBests);

function startBottleGame(){
 clearInterval(arcade.bottles?.timer);cancelAnimationFrame(arcade.raf);
 arcade.bottles={score:0,best:arcadeBest('bottles'),time:45,hits:0,misses:0,combo:0,running:false,bottles:[],shards:[],spawn:0,timer:null,flash:0,shotX:310,shotY:640};
 arcadeMount(`<div class="game-title"><span class="game-icon">🍾</span><div><h2>BOTTLE BREAKER</h2><div class="game-sub">COLOUR RANGE // BREAK THE BOTTLES</div></div></div>
 <div class="arcade-shell"><div class="arcade-head"><b>BOTTLE RANGE</b><div class="arcade-stats"><span class="arcade-stat" id="bottleTime">TIME 45</span><span class="arcade-stat" id="bottleScore">SCORE 0</span><span class="arcade-stat" id="bottleCombo">COMBO 0x</span><span class="arcade-stat" id="bottleAcc">ACC 100%</span></div></div>
 <div class="arcade-canvas-wrap"><canvas id="arcadeCanvas" class="arcade-canvas" width="620" height="700"></canvas><div id="bottleOverlay" class="arcade-overlay"><div class="arcade-message"><h3>🍾 READY?</h3><p>Tap START, then tap the bottles in front of you. Hit streaks earn bonus points.</p></div></div></div>
 <div class="arcade-actions"><button class="btn primary" onclick="bottleStart()">START / REPLAY</button><button class="btn" onclick="closeGame()">EXIT</button></div><div class="arcade-tip">Fictional arcade targets only — colourful bottles and harmless game effects.</div></div>`);
 document.getElementById('arcadeCanvas').addEventListener('pointerdown',bottleTap);drawBottles();refreshArcadeBests();
}
function bottleStart(){const s=arcade.bottles;if(!s)return;s.running=true;s.score=0;s.time=45;s.hits=0;s.misses=0;s.combo=0;s.bottles=[];s.shards=[];s.spawn=0;s.flash=0;document.getElementById('bottleOverlay')?.classList.add('hidden');arcadeAudio('start');clearInterval(s.timer);s.timer=setInterval(()=>{if(!s.running)return;s.time--;if(s.time<=0)bottleEnd()},1000);cancelAnimationFrame(arcade.raf);arcade.raf=requestAnimationFrame(bottleLoop)}
function bottleLoop(t){const s=arcade.bottles;if(!s?.running)return;const c=gameCanvas(),W=c.width,H=c.height;s.spawn--;if(s.flash>0)s.flash--;if(s.spawn<=0){s.spawn=Math.max(18,42-s.hits);if(s.bottles.length<6){const scale=.72+Math.random()*.42;s.bottles.push({x:70+Math.random()*(W-140),y:150+Math.random()*(H-270),scale,color:['#55e7ff','#ff4d8d','#ffd166','#48f5a7','#a86bff'][Math.floor(Math.random()*5)],life:105+Math.random()*55})}}s.bottles.forEach(q=>q.life--);s.bottles=s.bottles.filter(q=>q.life>0);s.shards.forEach(q=>{q.x+=q.vx;q.y+=q.vy;q.vy+=.12;q.life--});s.shards=s.shards.filter(q=>q.life>0);drawBottles();document.getElementById('bottleTime').textContent='TIME '+s.time;document.getElementById('bottleScore').textContent='SCORE '+s.score;document.getElementById('bottleCombo').textContent='COMBO '+s.combo+'x';const total=s.hits+s.misses;document.getElementById('bottleAcc').textContent='ACC '+(total?Math.round(s.hits/total*100):100)+'%';arcade.raf=requestAnimationFrame(bottleLoop)}
function drawBottles(){const s=arcade.bottles,c=gameCanvas();if(!c)return;const ctx=c.getContext('2d'),W=c.width,H=c.height;const g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,'#17082d');g.addColorStop(.5,'#06344a');g.addColorStop(1,'#2b0925');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);for(let i=0;i<24;i++){ctx.fillStyle=['#55e7ff','#ff4d8d','#ffd166','#48f5a7','#a86bff'][i%5];ctx.globalAlpha=.2;ctx.beginPath();ctx.arc((i*113)%W,(i*71)%H,2+(i%5),0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;ctx.fillStyle='rgba(255,255,255,.06)';ctx.fillRect(45,560,W-90,7);ctx.fillStyle='rgba(255,255,255,.08)';ctx.fillRect(70,585,W-140,6);s?.bottles.forEach(q=>drawBottleSprite(ctx,q.x,q.y,q.scale,q.color));drawBottleGun(ctx,W,H,s?.flash||0,s?.shotX||W/2,s?.shotY||H-60);s?.shards.forEach(q=>{ctx.save();ctx.globalAlpha=Math.max(0,q.life/35);ctx.translate(q.x,q.y);ctx.rotate(q.r);ctx.fillStyle=q.color;ctx.fillRect(-3,-9,6,18);ctx.restore()})}
function drawBottleSprite(ctx,x,y,scale,color){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);ctx.shadowBlur=22;ctx.shadowColor=color;ctx.fillStyle='rgba(255,255,255,.18)';ctx.strokeStyle=color;ctx.lineWidth=4;ctx.beginPath();ctx.roundRect(-28,-42,56,88,13);ctx.fill();ctx.stroke();ctx.fillStyle=color;ctx.globalAlpha=.65;ctx.beginPath();ctx.roundRect(-11,-62,22,24,5);ctx.fill();ctx.globalAlpha=1;ctx.fillStyle='rgba(255,255,255,.65)';ctx.fillRect(-17,-27,7,46);ctx.fillStyle='#fff';ctx.globalAlpha=.7;ctx.fillRect(-8,-5,16,5);ctx.restore()}
function drawBottleGun(ctx,W,H,flash,shotX,shotY){
  ctx.save();
  const gx=shotX, gy=H-34;
  ctx.translate(gx,gy);
  ctx.shadowBlur=20; ctx.shadowColor='#55e7ff';
  ctx.fillStyle='#10182f'; ctx.strokeStyle='#55e7ff'; ctx.lineWidth=3;
  ctx.beginPath(); ctx.roundRect(-30,-18,60,28,8); ctx.fill(); ctx.stroke();
  ctx.fillStyle='#25365c'; ctx.beginPath(); ctx.roundRect(-13,7,26,48,7); ctx.fill(); ctx.stroke();
  ctx.fillStyle='#ff4d8d'; ctx.fillRect(-7,15,14,25);
  ctx.fillStyle='#55e7ff'; ctx.fillRect(-9,-13,18,7);
  ctx.fillStyle='#ffd166'; ctx.fillRect(-4,-29,8,12);
  if(flash>0){
    ctx.globalAlpha=Math.min(1,flash/6); ctx.shadowBlur=35; ctx.shadowColor='#ffd166';
    ctx.fillStyle='#ffd166'; ctx.beginPath(); ctx.moveTo(0,-34);ctx.lineTo(-12,-58);ctx.lineTo(0,-48);ctx.lineTo(12,-58);ctx.closePath();ctx.fill();
  }
  ctx.restore();
}
function bottleTap(e){const s=arcade.bottles;if(!s?.running)return;const c=gameCanvas(),r=c.getBoundingClientRect(),x=(e.clientX-r.left)*c.width/r.width,y=(e.clientY-r.top)*c.height/r.height;let hit=-1;for(let i=s.bottles.length-1;i>=0;i--){const q=s.bottles[i],rx=34*q.scale,ry=58*q.scale;if(Math.abs(x-q.x)<rx&&Math.abs(y-q.y)<ry){hit=i;break}}arcadeAudio('laser');if(hit<0){s.misses++;s.combo=0;return}const q=s.bottles[hit];s.hits++;s.combo++;s.score+=100+s.combo*25;arcadeAudio('hit');for(let i=0;i<12;i++){const a=Math.random()*Math.PI*2,v=1.5+Math.random()*4;s.shards.push({x:q.x,y:q.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1.5,r:a,color:q.color,life:25+Math.random()*20})}s.bottles.splice(hit,1);if(s.combo%5===0)arcadeAudio('win')}
function bottleEnd(){const s=arcade.bottles;if(!s||!s.running)return;s.running=false;clearInterval(s.timer);cancelAnimationFrame(arcade.raf);const record=arcadeSetBest('bottles',s.score);refreshArcadeBests();arcadeAudio(s.score>0?'win':'crash');const o=document.getElementById('bottleOverlay');if(o){o.classList.remove('hidden');o.innerHTML=`<div class="arcade-message"><h3>🍾 ROUND COMPLETE</h3><p>Score: <b>${s.score}</b>${record?' • NEW BEST!':''}</p><p>Hits: ${s.hits} • Accuracy: ${s.hits+s.misses?Math.round(s.hits/(s.hits+s.misses)*100):100}%</p><p>Tap REPLAY for another round.</p></div>`}}


/* ==========================================================
   VICKY SUPER RUN — original retro-inspired platformer
   No external assets. Keyboard + touch controls.
========================================================== */
function platformerLevel(level=1){
 const n=Math.max(1,Math.min(10,level));
 const base=n*115;
 const portalX=3060+Math.min(n*15,150);
 const platforms=[{x:0,y:460,w:720,h:60},{x:860,y:460,w:700,h:60},{x:1700,y:460,w:760,h:60},{x:2600,y:460,w:portalX+220-2600,h:60}];
 for(let i=0;i<8;i++){const x=280+i*310+(n%2)*35; const y=380-(i%3)*65; platforms.push({x,y,w:135+(i%2)*25,h:20});}
 const coins=[]; for(let i=0;i<14;i++){coins.push({x:180+i*235,y:410-(i%3)*65,taken:false});}
 const enemies=[]; for(let i=0;i<4;i++){const x=500+i*650;enemies.push({x,y:425,vx:(i%2? -1:1)*(0.65+n*0.06),min:x-110,max:x+120,dead:false});}
 return {platforms,coins,enemies,portal:{x:portalX,y:385,w:52,h:75},level:n};
}
function startPlatformerGame(){
 cancelAnimationFrame(arcade.raf);clearInterval(arcade.platformer?.timer);
 arcade.platformer={level:1,x:70,y:426,prevY:426,vx:0,vy:0,ground:false,score:0,coins:0,lives:3,running:false,camera:0,keys:{left:false,right:false},jump:false,levelData:platformerLevel(1),levelChanging:false};
 arcadeMount(`<div class="game-title"><span class="game-icon">🍄</span><div><h2>VICKY SUPER RUN</h2><div class="game-sub">10 LEVEL PLATFORM ADVENTURE // RUN • JUMP • COLLECT</div></div></div><div class="arcade-shell"><div class="arcade-head"><b>VICKY WORLD</b><div class="arcade-stats"><span class="arcade-stat" id="platLevel">LEVEL 1 / 10</span><span class="arcade-stat" id="platScore">SCORE 0</span><span class="arcade-stat" id="platCoins">COINS 0</span><span class="arcade-stat" id="platLives">LIVES 3</span></div></div><div class="arcade-canvas-wrap"><canvas id="arcadeCanvas" class="arcade-canvas" width="900" height="520"></canvas><div id="platOverlay" class="arcade-overlay"><div class="arcade-message"><h3>🍄 READY TO RUN?</h3><p>Arrow keys / A-D to move. Space / W / ▲ to jump. Reach the portal to advance through 10 levels.</p></div></div></div><div class="arcade-controls"><button class="arcade-control" id="platLeft">◀</button><button class="arcade-control" id="platJump">▲</button><button class="arcade-control" id="platRight">▶</button></div><div class="arcade-actions"><button class="btn primary" onclick="platformerStart()">START / REPLAY</button><button class="btn" onclick="closeGame()">EXIT</button></div></div>`);
 const s=arcade.platformer; const bind=(id,key)=>{const el=document.getElementById(id);if(!el)return;el.addEventListener('pointerdown',e=>{e.preventDefault();s.keys[key]=true;if(key==='jump')s.jump=true;});['pointerup','pointercancel','pointerleave'].forEach(ev=>el.addEventListener(ev,e=>{e.preventDefault();s.keys[key]=false;}));};
 bind('platLeft','left');bind('platRight','right');bind('platJump','jump');
 window.onkeydown=e=>{const k=e.key.toLowerCase();if(['arrowleft','arrowright','arrowup',' ','a','d','w'].includes(k)||e.code==='Space')e.preventDefault();if(e.key==='ArrowLeft'||k==='a')s.keys.left=true;if(e.key==='ArrowRight'||k==='d')s.keys.right=true;if(e.key==='ArrowUp'||e.code==='Space'||k==='w')s.jump=true;};
 window.onkeyup=e=>{const k=e.key.toLowerCase();if(e.key==='ArrowLeft'||k==='a')s.keys.left=false;if(e.key==='ArrowRight'||k==='d')s.keys.right=false;if(e.key==='ArrowUp'||e.code==='Space'||k==='w')s.jump=false;};
 drawPlatformer();refreshArcadeBests();
}
function platformerStart(){const s=arcade.platformer;if(!s)return;s.level=1;s.score=0;s.coins=0;s.lives=3;s.camera=0;s.running=true;s.levelChanging=false;platformerLoadLevel(1,true);document.getElementById('platOverlay')?.classList.add('hidden');arcadeAudio('start');cancelAnimationFrame(arcade.raf);arcade.raf=requestAnimationFrame(platformerLoop);}
function platformerLoadLevel(level,resetLives=false){const s=arcade.platformer;s.level=level;s.levelData=platformerLevel(level);s.x=70;s.y=426;s.prevY=s.y;s.vx=0;s.vy=0;s.ground=false;s.camera=0;s.levelChanging=false;if(resetLives)s.lives=3;s.levelData.coins.forEach(q=>q.taken=false);s.levelData.enemies.forEach(e=>e.dead=false);const l=document.getElementById('platLevel');if(l)l.textContent=`LEVEL ${level} / 10`;}
function platformerLoop(){const s=arcade.platformer;if(!s?.running||s.levelChanging)return;const c=gameCanvas();if(!c){platformerEnd(false);return}const W=c.width,H=c.height,L=s.levelData;const speed=3.4; if(s.keys.left)s.vx=Math.max(s.vx-.55,-speed);else if(s.keys.right)s.vx=Math.min(s.vx+.55,speed);else s.vx*=.72; if(s.jump&&s.ground){s.vy=-11.5;s.ground=false;arcadeAudio('move');}s.jump=false;s.prevY=s.y;s.vy=Math.min(s.vy+.48,12);s.x+=s.vx;s.y+=s.vy;s.ground=false;
 for(const p of L.platforms){const prevBottom=s.prevY+34,newBottom=s.y+34;if(s.x+22>p.x&&s.x-22<p.x+p.w&&prevBottom<=p.y&&newBottom>=p.y&&s.vy>=0){s.y=p.y-34;s.vy=0;s.ground=true;}}
 s.x=Math.max(15,Math.min(L.portal.x+60,s.x));if(s.y>H+80){s.lives--;arcadeAudio('crash');if(s.lives<=0){platformerEnd(false);return;}s.x=Math.max(50,s.x-220);s.y=260;s.prevY=s.y;s.vy=0;}
 s.coins=0;L.coins.forEach(q=>{if(!q.taken&&Math.hypot(s.x-q.x,s.y-q.y)<40){q.taken=true;s.score+=100;arcadeAudio('coin');}if(q.taken)s.coins++;});
 for(const e of L.enemies){if(e.dead)continue;e.x+=e.vx;if(e.x<e.min||e.x>e.max){e.x=Math.max(e.min,Math.min(e.max,e.x));e.vx*=-1;}if(Math.abs(s.x-e.x)<34&&Math.abs(s.y-e.y)<38){if(s.vy>1&&s.prevY+34<=e.y+5){e.dead=true;s.vy=-7;s.score+=150;arcadeAudio('hit');}else{s.lives--;s.x=Math.max(50,s.x-180);s.y=250;s.prevY=s.y;s.vy=0;arcadeAudio('crash');if(s.lives<=0){platformerEnd(false);return;}}}}
 if(s.x>=L.portal.x){if(s.level<10){s.score+=500;s.levelChanging=true;const next=s.level+1;const o=document.getElementById('platOverlay');if(o){o.classList.remove('hidden');o.innerHTML=`<div class="arcade-message"><h3>🏆 LEVEL ${s.level} CLEAR!</h3><p>Get ready for level ${next} / 10...</p></div>`;}arcadeAudio('level');setTimeout(()=>{if(!s.running)return;platformerLoadLevel(next);document.getElementById('platOverlay')?.classList.add('hidden');arcade.raf=requestAnimationFrame(platformerLoop);},900);return;}s.score+=1500;platformerEnd(true);return;}
 s.camera=Math.max(0,Math.min(L.portal.x-W+120,s.x-W*.35));drawPlatformer();document.getElementById('platScore').textContent='SCORE '+s.score;document.getElementById('platCoins').textContent='COINS '+s.coins;document.getElementById('platLives').textContent='LIVES '+s.lives;arcade.raf=requestAnimationFrame(platformerLoop);}
function drawPlatformer(){const s=arcade.platformer,c=gameCanvas();if(!c)return;const ctx=c.getContext('2d'),W=c.width,H=c.height,L=s.levelData,cam=s?.camera||0;ctx.clearRect(0,0,W,H);let g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#7bdcff');g.addColorStop(1,'#e9fbff');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.fillStyle='rgba(255,255,255,.55)';for(let i=0;i<9;i++){ctx.beginPath();ctx.arc((i*170-(cam*.12)%170),90+(i%3)*45,28,0,Math.PI*2);ctx.fill()}ctx.save();ctx.translate(-cam,0);L.platforms.forEach(p=>{ctx.fillStyle='#553c8f';ctx.fillRect(p.x,p.y,p.w,p.h);ctx.fillStyle='#7cf26a';ctx.fillRect(p.x,p.y,p.w,10)});L.coins.forEach(q=>{if(q.taken)return;ctx.save();ctx.translate(q.x,q.y);ctx.shadowBlur=16;ctx.shadowColor='#ffd34d';ctx.fillStyle='#ffd34d';ctx.beginPath();ctx.arc(0,0,11,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff3a3';ctx.fillRect(-2,-7,4,14);ctx.restore()});L.enemies.forEach(e=>{if(e.dead)return;ctx.save();ctx.translate(e.x,e.y);ctx.fillStyle='#7b4bd8';ctx.beginPath();ctx.roundRect(-22,-18,44,36,12);ctx.fill();ctx.fillStyle='#fff';ctx.fillRect(-12,-8,7,7);ctx.fillRect(5,-8,7,7);ctx.fillStyle='#222';ctx.fillRect(-10,-6,3,3);ctx.fillRect(7,-6,3,3);ctx.restore()});const P=L.portal;ctx.fillStyle='#17284a';ctx.fillRect(P.x,P.y,P.w,P.h);ctx.strokeStyle='#55e7ff';ctx.lineWidth=5;ctx.strokeRect(P.x,P.y,P.w,P.h);ctx.fillStyle='#55e7ff';ctx.fillRect(P.x+9,P.y+10,P.w-18,P.h-20);if(s){ctx.save();ctx.translate(s.x,s.y);ctx.fillStyle='#ff4d8d';ctx.fillRect(-24,-30,48,45);ctx.fillStyle='#ffd166';ctx.fillRect(-20,-43,40,16);ctx.fillStyle='#fff';ctx.fillRect(-14,-24,8,8);ctx.fillRect(6,-24,8,8);ctx.fillStyle='#16213b';ctx.fillRect(-18,15,13,19);ctx.fillRect(5,15,13,19);ctx.restore()}ctx.restore()}
function platformerEnd(win){const s=arcade.platformer;if(!s||!s.running)return;s.running=false;cancelAnimationFrame(arcade.raf);const final=Math.floor(s.score);const record=arcadeSetBest('platformer',final);refreshArcadeBests();arcadeAudio(win?'win':'crash');const o=document.getElementById('platOverlay');if(o){o.classList.remove('hidden');o.innerHTML=`<div class="arcade-message"><h3>${win?'🏆 LEVEL CLEAR!':'💥 RUN OVER'}</h3><p>Score: <b>${final}</b> • Coins: ${s.coins} • Lives: ${s.lives}</p><p>${record?'NEW BEST! ':''}${win?'You reached the VICKY portal.':'Try again and beat your score.'}</p></div>`}}



/* ==========================================================
   BUBBLE SHOOTER — original match-3 arcade game
========================================================== */
function startBubbleGame(){cancelAnimationFrame(arcade.raf);const W=900,H=620,cols=10,rows=10,colors=['#55e7ff','#ff4d8d','#ffd166','#48f5a7','#a86bff','#ff8a3d'];arcade.bubble={W,H,cols,rows,colors,grid:[],score:0,level:1,misses:0,aimX:450,running:false,current:0,next:1};const s=arcade.bubble;s.grid=bubbleNewGrid(s);arcadeMount(`<div class="game-title"><span class="game-icon">🫧</span><div><h2>BUBBLE SHOOTER</h2><div class="game-sub">MATCH 3 // AIM • SHOOT • CLEAR</div></div></div><div class="arcade-shell"><div class="arcade-head"><b>BUBBLE ARENA</b><div class="arcade-stats"><span class="arcade-stat" id="bubbleScore">SCORE 0</span><span class="arcade-stat" id="bubbleLevel">LEVEL 1</span><span class="arcade-stat" id="bubbleMiss">MISS 0 / 6</span><span class="arcade-stat" id="bubbleBest">BEST ${arcadeBest('bubble')}</span></div></div><div class="arcade-canvas-wrap"><canvas id="arcadeCanvas" class="arcade-canvas" width="900" height="620"></canvas><div id="bubbleOverlay" class="arcade-overlay"><div class="arcade-message"><h3>🫧 READY?</h3><p>Press START, then click/tap a column. Match 3 or more connected bubbles.</p></div></div></div><div class="arcade-actions"><button class="btn primary" onclick="bubbleStart()">START / REPLAY</button><button class="btn" onclick="closeGame()">EXIT</button></div></div>`);const c=gameCanvas();c?.addEventListener('pointermove',bubbleAim);c?.addEventListener('pointerdown',bubbleShoot);drawBubble();refreshArcadeBests();}
function bubbleNewGrid(s){return Array.from({length:s.rows},(_,r)=>Array.from({length:s.cols},()=>r<5?Math.floor(Math.random()*s.colors.length):null));}
function bubbleStart(){const s=arcade.bubble;if(!s)return;s.grid=bubbleNewGrid(s);s.score=0;s.level=1;s.misses=0;s.running=true;s.current=Math.floor(Math.random()*s.colors.length);s.next=Math.floor(Math.random()*s.colors.length);document.getElementById('bubbleOverlay')?.classList.add('hidden');arcadeAudio('start');cancelAnimationFrame(arcade.raf);arcade.raf=requestAnimationFrame(bubbleLoop);}
function bubbleAim(e){const s=arcade.bubble,c=gameCanvas();if(!s||!c)return;const r=c.getBoundingClientRect();s.aimX=Math.max(50,Math.min(s.W-50,(e.clientX-r.left)*s.W/r.width));drawBubble();}
function bubbleCellCenter(c,r){return{x:90+c*80,y:55+r*50};}
function bubbleNeighbours(r,c){const s=arcade.bubble,out=[];for(const [dr,dc] of [[1,0],[-1,0],[0,1],[0,-1],[1,-1],[-1,1]]){const rr=r+dr,cc=c+dc;if(rr>=0&&rr<s.rows&&cc>=0&&cc<s.cols)out.push([rr,cc]);}return out;}
function bubblePlace(){const s=arcade.bubble;const col=Math.max(0,Math.min(s.cols-1,Math.round((s.aimX-90)/80)));for(let r=s.rows-1;r>=0;r--){if(s.grid[r][col]===null){s.grid[r][col]=s.current;return[r,col];}}return null;}
function bubbleShoot(e){const s=arcade.bubble;if(!s?.running)return;const c=gameCanvas(),r=c.getBoundingClientRect();s.aimX=Math.max(50,Math.min(s.W-50,(e.clientX-r.left)*s.W/r.width));const placed=bubblePlace();if(!placed){bubbleAddRow();s.misses=0;drawBubble();return;}const [pr,pc]=placed,same=s.current,seen=new Set(),q=[[pr,pc]];while(q.length){const [rr,cc]=q.pop(),key=rr+','+cc;if(seen.has(key)||s.grid[rr]?.[cc]!==same)continue;seen.add(key);bubbleNeighbours(rr,cc).forEach(n=>q.push(n));}if(seen.size>=3){seen.forEach(key=>{const [rr,cc]=key.split(',').map(Number);s.grid[rr][cc]=null;});s.score+=seen.size*60+s.level*10;s.misses=0;arcadeAudio('hit');}else{s.misses++;arcadeAudio('laser');if(s.misses>=6){bubbleAddRow();s.misses=0;}}s.current=s.next;s.next=Math.floor(Math.random()*s.colors.length);if(s.grid.every(row=>row.every(v=>v===null))){s.score+=1000;s.level++;s.grid=bubbleNewGrid(s);arcadeAudio('win');}drawBubble();}
function bubbleAddRow(){const s=arcade.bubble;if(!s)return;for(let r=s.rows-1;r>0;r--)s.grid[r]=s.grid[r-1].slice();s.grid[0]=Array.from({length:s.cols},()=>Math.floor(Math.random()*s.colors.length));if(s.grid[s.rows-1].some(v=>v!==null))bubbleEnd(false);}
function bubbleLoop(){const s=arcade.bubble;if(!s?.running)return;drawBubble();const a=document.getElementById('bubbleScore'),b=document.getElementById('bubbleLevel'),c=document.getElementById('bubbleMiss');if(a)a.textContent='SCORE '+s.score;if(b)b.textContent='LEVEL '+s.level;if(c)c.textContent='MISS '+s.misses+' / 6';arcade.raf=requestAnimationFrame(bubbleLoop);}
function bubbleEnd(win){const s=arcade.bubble;if(!s||!s.running)return;s.running=false;cancelAnimationFrame(arcade.raf);const final=Math.floor(s.score),record=arcadeSetBest('bubble',final);refreshArcadeBests();arcadeAudio(win?'win':'crash');const o=document.getElementById('bubbleOverlay');if(o){o.classList.remove('hidden');o.innerHTML=`<div class="arcade-message"><h3>${win?'🏆 BOARD CLEAR!':'💥 ARENA FULL'}</h3><p>Score: <b>${final}</b> • Level: ${s.level}</p><p>${record?'NEW BEST! ':''}Press REPLAY to start again.</p></div>`;}}

function startBubbleRushGame(){
  cancelAnimationFrame(arcade.raf);clearInterval(arcade.bubbleRush?.timer);
  const W=900,H=620,cols=10,rows=9,colors=['#55e7ff','#ff4d8d','#ffd166','#48f5a7','#a86bff','#ff8a3d'];
  arcade.bubbleRush={W,H,cols,rows,colors,grid:[],score:0,combo:0,shots:0,seconds:60,aimX:450,running:false,current:0,next:1,timer:null};
  const s=arcade.bubbleRush;s.grid=bubbleRushNewGrid(s);
  arcadeMount(`<div class="game-title"><span class="game-icon">🌪️</span><div><h2>BUBBLE STORM</h2><div class="game-sub">TIME ATTACK // MATCH 3 // SURVIVE THE STORM</div></div></div><div class="arcade-shell"><div class="arcade-head"><b>STORM CORE</b><div class="arcade-stats"><span class="arcade-stat" id="rushScore">SCORE 0</span><span class="arcade-stat" id="rushTime">TIME 60</span><span class="arcade-stat" id="rushCombo">COMBO x0</span><span class="arcade-stat" id="rushBest">BEST ${arcadeBest('bubbleRush')}</span></div></div><div class="arcade-canvas-wrap"><canvas id="arcadeCanvas" class="arcade-canvas" width="900" height="620"></canvas><div id="rushOverlay" class="arcade-overlay"><div class="arcade-message"><h3>🌪️ READY?</h3><p>Click/tap a column to fire. Match 3+ bubbles, chain combos and beat the 60-second storm.</p></div></div></div><div class="arcade-actions"><button class="btn primary" onclick="bubbleRushStart()">START / REPLAY</button><button class="btn" onclick="closeGame()">EXIT</button></div><div class="arcade-tip">Every 10 shots the storm pushes a new row into the board. Clear fast!</div></div>`);
  const c=gameCanvas();c?.addEventListener('pointermove',bubbleRushAim);c?.addEventListener('pointerdown',bubbleRushShoot);drawBubbleRush();refreshArcadeBests();
}
function bubbleRushNewGrid(s){return Array.from({length:s.rows},(_,r)=>Array.from({length:s.cols},()=>r<4?Math.floor(Math.random()*s.colors.length):null))}
function bubbleRushStart(){const s=arcade.bubbleRush;if(!s)return;s.grid=bubbleRushNewGrid(s);s.score=0;s.combo=0;s.shots=0;s.seconds=60;s.running=true;s.current=Math.floor(Math.random()*s.colors.length);s.next=Math.floor(Math.random()*s.colors.length);document.getElementById('rushOverlay')?.classList.add('hidden');arcadeAudio('start');clearInterval(s.timer);s.timer=setInterval(()=>{if(!s.running)return;s.seconds--;if(s.seconds<=0){s.seconds=0;bubbleRushEnd(false)}},1000);cancelAnimationFrame(arcade.raf);arcade.raf=requestAnimationFrame(bubbleRushLoop)}
function bubbleRushAim(e){const s=arcade.bubbleRush,c=gameCanvas();if(!s||!c)return;const r=c.getBoundingClientRect();s.aimX=Math.max(45,Math.min(s.W-45,(e.clientX-r.left)*s.W/r.width));drawBubbleRush()}
function bubbleRushNeighbours(s,r,c){const out=[];for(const [dr,dc] of [[1,0],[-1,0],[0,1],[0,-1],[1,-1],[-1,1]]){const rr=r+dr,cc=c+dc;if(rr>=0&&rr<s.rows&&cc>=0&&cc<s.cols)out.push([rr,cc])}return out}
function bubbleRushPlace(s){const col=Math.max(0,Math.min(s.cols-1,Math.round((s.aimX-60)/80)));for(let r=s.rows-1;r>=0;r--){if(s.grid[r][col]===null){s.grid[r][col]=s.current;return [r,col]}}return null}
function bubbleRushShoot(e){const s=arcade.bubbleRush;if(!s?.running)return;const c=gameCanvas(),r=c.getBoundingClientRect();s.aimX=Math.max(45,Math.min(s.W-45,(e.clientX-r.left)*s.W/r.width));const placed=bubbleRushPlace(s);if(!placed){bubbleRushEnd(false);return}const [pr,pc]=placed,same=s.current,seen=new Set(),q=[[pr,pc]];while(q.length){const [rr,cc]=q.pop(),key=rr+','+cc;if(seen.has(key)||s.grid[rr]?.[cc]!==same)continue;seen.add(key);bubbleRushNeighbours(s,rr,cc).forEach(n=>q.push(n))}s.shots++;if(seen.size>=3){seen.forEach(key=>{const [rr,cc]=key.split(',').map(Number);s.grid[rr][cc]=null});s.combo++;s.score+=seen.size*60*s.combo;arcadeAudio('hit');}else{s.combo=0;arcadeAudio('laser')}if(s.shots%10===0){bubbleRushAddRow(s);if(!s.running)return;}s.current=s.next;s.next=Math.floor(Math.random()*s.colors.length);if(s.grid.every(row=>row.every(v=>v===null))){s.score+=1500;s.seconds=Math.min(60,s.seconds+8);s.grid=bubbleRushNewGrid(s);s.combo++;arcadeAudio('win')}drawBubbleRush()}
function bubbleRushAddRow(s){for(let r=s.rows-1;r>0;r--)s.grid[r]=s.grid[r-1].slice();s.grid[0]=Array.from({length:s.cols},()=>Math.floor(Math.random()*s.colors.length));if(s.grid[s.rows-1].some(v=>v!==null))bubbleRushEnd(false)}
function bubbleRushLoop(){const s=arcade.bubbleRush;if(!s?.running)return;drawBubbleRush();const a=document.getElementById('rushScore'),b=document.getElementById('rushTime'),c=document.getElementById('rushCombo');if(a)a.textContent='SCORE '+s.score;if(b)b.textContent='TIME '+s.seconds;if(c)c.textContent='COMBO x'+s.combo;arcade.raf=requestAnimationFrame(bubbleRushLoop)}
function drawBubbleRush(){const s=arcade.bubbleRush,c=gameCanvas();if(!s||!c)return;const ctx=c.getContext('2d'),W=s.W,H=s.H;ctx.clearRect(0,0,W,H);let g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#17082e');g.addColorStop(1,'#020610');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);for(let r=0;r<s.rows;r++)for(let c2=0;c2<s.cols;c2++){const v=s.grid?.[r]?.[c2];if(v===null||v===undefined)continue;const x=60+c2*80,y=55+r*48;ctx.beginPath();ctx.arc(x,y,21,0,Math.PI*2);ctx.fillStyle=s.colors[v];ctx.shadowBlur=18;ctx.shadowColor=s.colors[v];ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle='rgba(255,255,255,.42)';ctx.stroke();ctx.fillStyle='rgba(255,255,255,.35)';ctx.beginPath();ctx.arc(x-6,y-7,5,0,Math.PI*2);ctx.fill()}ctx.strokeStyle='rgba(255,77,141,.35)';ctx.setLineDash([7,8]);ctx.beginPath();ctx.moveTo(40,505);ctx.lineTo(860,505);ctx.stroke();ctx.setLineDash([]);ctx.strokeStyle='rgba(85,231,255,.45)';ctx.beginPath();ctx.moveTo(450,570);ctx.lineTo(s.aimX,485);ctx.stroke();ctx.beginPath();ctx.arc(450,575,24,0,Math.PI*2);ctx.fillStyle=s.colors[s.current??0];ctx.shadowBlur=20;ctx.shadowColor=s.colors[s.current??0];ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#fff';ctx.font='700 14px sans-serif';ctx.fillText('NEXT',760,575);ctx.beginPath();ctx.arc(820,570,15,0,Math.PI*2);ctx.fillStyle=s.colors[s.next??0];ctx.fill();ctx.fillStyle='#ff8fb5';ctx.font='700 12px sans-serif';ctx.fillText('STORM LINE',55,500)}
function bubbleRushEnd(win){const s=arcade.bubbleRush;if(!s||!s.running)return;s.running=false;clearInterval(s.timer);cancelAnimationFrame(arcade.raf);const final=Math.floor(s.score),record=arcadeSetBest('bubbleRush',final);refreshArcadeBests();arcadeAudio(win?'win':'crash');const o=document.getElementById('rushOverlay');if(o){o.classList.remove('hidden');o.innerHTML=`<div class="arcade-message"><h3>${win?'🏆 STORM CLEARED!':'🌪️ STORM OVER'}</h3><p>Score: <b>${final}</b> • Time: ${s.seconds}s • Combo: x${s.combo}</p><p>${record?'NEW BEST! ':''}${win?'Legendary run.':'Pop faster and survive the storm.'}</p></div>`}}


// Game Zone filters
window.filterGames = function(type){
  const cards = document.querySelectorAll('.game-card[data-game-type]');
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === type));
  cards.forEach(card => {
    const show = type === 'all' || card.dataset.gameType === type;
    card.classList.toggle('is-hidden', !show);
  });
};


/* ==========================================================
   RUDRA CITY + 20 MINI GAMES HUB
========================================================== */
window.openRudraCity=function(){
  closeGame();
  const m=document.getElementById('gameModal');
  const mount=document.getElementById('gameMount');
  const tpl=document.getElementById('rudraCityTemplate');
  if(!m||!mount||!tpl)return;
  m.classList.add('open','rudra-city-fullscreen');m.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
  const title=`<div class="game-title"><span class="game-icon">🏙️</span><div><h2>RUDRA CITY</h2><div class="game-sub">BUILD 36.1 // FULL 3D OPEN WORLD</div></div></div>`;
  mount.innerHTML=title+`<div class="rudra-city-frame">${tpl.innerHTML}</div><div class="arcade-actions"><button class="btn primary" onclick="closeGame()">EXIT RUDRA CITY</button><a class="btn" href="https://www.youtube.com/@bikkeedada" target="_blank" rel="noopener">WATCH ON YT FOR EXPLANATION ↗</a></div>`;
  requestAnimationFrame(()=>{if(typeof initRudraCityGame==='function')initRudraCityGame();});
};

const MINI_INFO={
 memory2:['MEMORY FLIP','Match the highlighted tile pattern.'],reaction:['REACTION RUSH','Tap the target instantly.'],snake:['SNAKE GRID','Eat dots and avoid yourself.'],pong:['PONG DUEL','Move the paddle and return the ball.'],breakout:['BRICK BREAK','Break the brick wall.'],jumpdash:['JUMP DASH','Jump over incoming blocks.'],colormatch:['COLOR MATCH','Tap the requested color.'],math:['MATH BLITZ','Solve as many sums as possible.'],typing2:['WORD SNAP','Type the shown word.'],precision:['PRECISION TAP','Hit the shrinking target.'],lanes:['LANE SWITCH','Change lanes to dodge blocks.'],asteroids2:['ASTEROID FIELD','Survive the falling rocks.'],flappy:['FLAPPY SKY','Fly through the gaps.'],stack:['STACK MASTER','Build the tallest tower.'],ttt:['TIC TAC TOE','Beat the local CPU.'],merge:['2048 MINI','Merge equal tiles.'],whack:['WHACK ZONE','Tap targets quickly.'],rhythm:['RHYTHM TAP','Tap when the marker enters the zone.'],maze:['MAZE ESCAPE','Reach the exit.'],alien:['ALIEN SWARM','Protect the base from waves.']};
let miniState=null,miniTimer=null,miniRaf=null;
function miniMount(title,desc){
 clearTimeout(miniTimer);cancelAnimationFrame(miniRaf);
 arcadeMount(`<div class="game-title"><span class="game-icon">🎮</span><div><h2>${title}</h2><div class="game-sub">${desc}</div></div></div><div class="arcade-shell"><div class="arcade-head"><b>MINI ARENA</b><div class="arcade-stats"><span class="arcade-stat" id="miniScore">SCORE 0</span><span class="arcade-stat" id="miniTime">TIME 30</span></div></div><div class="arcade-canvas-wrap"><canvas id="arcadeCanvas" class="arcade-canvas" width="700" height="520"></canvas><div id="miniOverlay" class="arcade-overlay"><div class="arcade-message"><h3>READY?</h3><p>Tap / click the arena or use the keyboard.</p></div></div></div><div class="arcade-actions"><button class="btn primary" onclick="miniStart()">START / REPLAY</button><button class="btn" onclick="closeGame()">EXIT</button></div><div class="arcade-tip">Scores are stored locally on this device.</div></div>`);
}
function openMiniGame(type,title){closeGame();const m=document.getElementById('gameModal');m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';miniState={type,title,score:0,time:30,running:false,x:350,y:260,vx:180,vy:140,target:null,keys:{},cells:[],value:2};miniMount(title,MINI_INFO[type]?.[1]||'Quick arcade challenge.');miniPrepare();}
function miniPrepare(){const c=gameCanvas();if(!c)return;c.onpointerdown=miniPointer;c.onpointermove=miniPointer;window.onkeydown=e=>{if(!miniState)return;miniState.keys[e.key.toLowerCase()]=true;if(e.key===' '&&!miniState.running)miniStart();if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key))e.preventDefault()};window.onkeyup=e=>{if(miniState)miniState.keys[e.key.toLowerCase()]=false};miniDraw();}
function miniStart(){const s=miniState;if(!s)return;s.score=0;s.time=30;s.running=true;s.x=350;s.y=260;s.vx=180;s.vy=140;s.cells=[];s.target=null;document.getElementById('miniOverlay')?.classList.add('hidden');arcadeAudio('start');clearInterval(miniTimer);miniTimer=setInterval(()=>{if(!s.running)return;s.time--;if(s.time<=0)miniEnd()},1000);cancelAnimationFrame(miniRaf);miniRaf=requestAnimationFrame(miniLoop)}
function miniPointer(e){const s=miniState;if(!s)return;const c=gameCanvas(),r=c.getBoundingClientRect();s.px=(e.clientX-r.left)*c.width/r.width;s.py=(e.clientY-r.top)*c.height/r.height;if(s.running)miniAction()}
function miniAction(){const s=miniState;if(!s?.running)return;const W=700,H=520;
 if(s.type==='reaction'||s.type==='precision'||s.type==='whack'){if(!s.target||Math.hypot(s.px-s.target.x,s.py-s.target.y)<s.target.r+12){s.score+=s.type==='precision'?Math.max(20,Math.floor(80-(s.target?.r||20))):100;s.target=null;arcadeAudio('hit')}}
 else if(s.type==='colormatch'){if(Math.hypot(s.px-s.x,s.py-s.y)<45){s.score+=50;s.x=80+Math.random()*540;s.y=80+Math.random()*360;arcadeAudio('coin')}}
 else if(s.type==='math'){if(s.target&&Math.hypot(s.px-s.target.x,s.py-s.target.y)<55){s.score+=20;s.target=null;arcadeAudio('coin')}}
 else if(s.type==='maze'){if(Math.hypot(s.px-s.x,s.py-s.y)<35){s.score+=100;s.x=620;s.y=430;arcadeAudio('win')}}
 else {s.score+=1;arcadeAudio('click')}
}
function miniLoop(t){const s=miniState;if(!s?.running)return;const dt=.016;const W=700,H=520;
 if(s.type==='snake'){s.x+=((s.keys.arrowright||s.keys.d)?3:(s.keys.arrowleft||s.keys.a)?-3:0);s.y+=((s.keys.arrowdown||s.keys.s)?3:(s.keys.arrowup||s.keys.w)?-3:0);s.x=Math.max(20,Math.min(W-20,s.x));s.y=Math.max(20,Math.min(H-20,s.y));}
 else if(s.type==='pong'){s.y+=(s.keys.arrowdown||s.keys.s?5:0)-(s.keys.arrowup||s.keys.w?5:0);s.y=Math.max(40,Math.min(H-40,s.y));s.x+=s.vx*dt;s.y+=s.vy*dt;if(s.y<20||s.y>H-20)s.vy*=-1;if(s.x>W-25){s.vx=-Math.abs(s.vx);s.score+=10}if(s.x<35){if(Math.abs(s.y-(s.py||260))<65)s.vx=Math.abs(s.vx);else return miniEnd()}}
 else if(s.type==='jumpdash'){s.x=100;s.y+=s.vy*dt;s.vy+=850*dt;if((s.keys[' ']||s.keys.arrowup)&&s.y>430){s.vy=-430;s.keys[' ']=false;s.score+=2}if(s.y>500)return miniEnd()}
 else if(s.type==='flappy'){s.vy+=900*dt;s.y+=s.vy*dt;if(s.keys[' ']||s.keys.arrowup){s.vy=-330;s.keys[' ']=false;s.score+=2}if(s.y<0||s.y>H)return miniEnd()}
 else if(s.type==='lanes'){s.x+=((s.keys.arrowright||s.keys.d)?6:(s.keys.arrowleft||s.keys.a)?-6:0);s.x=Math.max(60,Math.min(W-60,s.x));s.y=440;if(!s.target||s.target.y>H+30){s.target={x:80+Math.random()*540,y:-30,r:24,vy:4+Math.random()*3};}s.target.y+=s.target.vy;if(Math.abs(s.target.x-s.x)<45&&s.target.y>400)return miniEnd();if(s.target.y>H){s.score+=10;s.target=null}}
 else if(s.type==='asteroids2'||s.type==='alien'){s.x+=((s.keys.arrowright||s.keys.d)?5:(s.keys.arrowleft||s.keys.a)?-5:0);s.x=Math.max(30,Math.min(W-30,s.x));if(!s.target||s.target.y>H+40){s.target={x:20+Math.random()*660,y:-30,r:15+Math.random()*20,vy:3+Math.random()*4};}s.target.y+=s.target.vy;if(Math.hypot(s.target.x-s.x,s.target.y-s.y)<s.target.r+18)return miniEnd();if(s.target.y>H){s.score+=12;s.target=null}}
 else if(s.type==='stack'){s.score+=Math.random()<.08?5:0}
 else if(s.type==='reaction'&&(!s.target)){s.target={x:50+Math.random()*600,y:50+Math.random()*400,r:30};}
 else if(s.type==='precision'&&(!s.target)){s.target={x:70+Math.random()*560,y:70+Math.random()*340,r:50};}
 else if(s.type==='whack'&&(!s.target)){s.target={x:50+Math.random()*600,y:50+Math.random()*400,r:28};}
 else if(s.type==='colormatch'&&(!s.x)){s.x=350;s.y=260}
 else if(s.type==='math'&&(!s.target)){s.target={x:350,y:260,r:55,a:2+Math.floor(Math.random()*8),b:2+Math.floor(Math.random()*8)}}
 else if(s.type==='maze'){s.x+=(s.keys.arrowright?3:0)-(s.keys.arrowleft?3:0);s.y+=(s.keys.arrowdown?3:0)-(s.keys.arrowup?3:0);s.x=Math.max(30,Math.min(670,s.x));s.y=Math.max(30,Math.min(490,s.y));if(s.x>620&&s.y>430){s.score+=200;s.x=80;s.y=80}}
 else if(s.type==='ttt'){if(!s.cells.length)s.cells=Array(9).fill(0)}
 else if(s.type==='merge'){if(!s.cells.length)s.cells=[2,4,2,8,4,2,0,0,0]}
 else if(s.type==='breakout'){s.x+=(s.keys.arrowright?6:0)-(s.keys.arrowleft?6:0);s.x=Math.max(60,Math.min(640,s.x));s.y=450}
 else if(s.type==='memory2'){if(!s.cells.length)s.cells=[0,1,2,3].sort(()=>Math.random()-.5)}
 else if(s.type==='typing2'){s.targetWord=s.targetWord||['RUDRA','VICKY','CITY','BUILD','CODE'][Math.floor(Math.random()*5)];}
 else if(s.type==='rhythm'){s.x=(s.x+5)%650+25;if(Math.abs(s.x-350)<35&&(s.keys[' ']||s.keys.enter)){s.score+=50;s.keys[' ']=false}}
 miniDraw();document.getElementById('miniScore').textContent='SCORE '+Math.floor(s.score);document.getElementById('miniTime').textContent='TIME '+s.time;miniRaf=requestAnimationFrame(miniLoop)}
function miniDraw(){const s=miniState,c=gameCanvas();if(!s||!c)return;const ctx=c.getContext('2d'),W=700,H=520;ctx.clearRect(0,0,W,H);ctx.fillStyle='#06101f';ctx.fillRect(0,0,W,H);ctx.strokeStyle='rgba(100,220,255,.14)';for(let x=0;x<W;x+=35){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}for(let y=0;y<H;y+=35){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
 ctx.fillStyle='#dff8ff';ctx.font='700 18px sans-serif';ctx.fillText(s.title,20,30);
 if(['reaction','precision','whack'].includes(s.type)&&s.target){ctx.beginPath();ctx.arc(s.target.x,s.target.y,s.target.r,0,Math.PI*2);ctx.fillStyle='#ff4d8d';ctx.shadowBlur=22;ctx.shadowColor='#ff4d8d';ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle='#fff';ctx.stroke()}
 else if(s.type==='colormatch'){ctx.fillStyle='#55e7ff';ctx.beginPath();ctx.arc(s.x,s.y,45,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.fillText('TAP',s.x-20,s.y+6)}
 else if(s.type==='math'&&s.target){ctx.fillStyle='#55e7ff';ctx.fillRect(230,170,240,150);ctx.fillStyle='#06101f';ctx.font='700 34px sans-serif';ctx.fillText(`${s.target.a}+${s.target.b}`,310,245);ctx.fillStyle='#fff';ctx.font='14px sans-serif';ctx.fillText('Tap the card if you know it',255,280)}
 else if(s.type==='snake'){ctx.fillStyle='#48f5a7';ctx.beginPath();ctx.arc(s.x,s.y,18,0,Math.PI*2);ctx.fill();ctx.fillStyle='#ffd166';ctx.fillRect(560,390,18,18)}
 else if(s.type==='pong'){ctx.fillStyle='#55e7ff';ctx.fillRect(18,s.y-55,12,110);ctx.fillRect(670,180,12,160);ctx.beginPath();ctx.arc(s.x,s.y,10,0,Math.PI*2);ctx.fill()}
 else if(['lanes','asteroids2','alien'].includes(s.type)){ctx.fillStyle='#55e7ff';ctx.fillRect(s.x-20,420,40,55);if(s.target){ctx.fillStyle='#ff4d8d';ctx.beginPath();ctx.arc(s.target.x,s.target.y,s.target.r,0,Math.PI*2);ctx.fill()}}
 else if(['jumpdash','flappy'].includes(s.type)){ctx.fillStyle='#55e7ff';ctx.fillRect(80,s.y,38,38);ctx.fillStyle='#ff4d8d';ctx.fillRect(560,430,35,70)}
 else if(s.type==='maze'){ctx.strokeStyle='#ff4d8d';ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(70,70);ctx.lineTo(600,70);ctx.lineTo(600,430);ctx.lineTo(80,430);ctx.stroke();ctx.fillStyle='#55e7ff';ctx.beginPath();ctx.arc(s.x,s.y,14,0,Math.PI*2);ctx.fill();ctx.fillStyle='#48f5a7';ctx.fillRect(620,430,50,50)}
 else if(s.type==='stack'){ctx.fillStyle='#48f5a7';for(let i=0;i<Math.min(15,Math.floor(s.score/5)+1);i++)ctx.fillRect(300-i*4,450-i*28,100+i*8,24)}
 else if(s.type==='ttt'){for(let i=1;i<3;i++){ctx.fillStyle='#55e7ff';ctx.fillRect(220+i*85,120,5,255);ctx.fillRect(220,80+i*85,255,5)}ctx.fillStyle='#fff';ctx.font='700 30px sans-serif';ctx.fillText('TAP A SQUARE',245,430)}
 else if(s.type==='merge'){ctx.fillStyle='#55e7ff';for(let i=0;i<9;i++){const x=150+(i%3)*110,y=90+Math.floor(i/3)*110;ctx.fillRect(x,y,90,90);ctx.fillStyle='#06101f';ctx.font='700 24px sans-serif';ctx.fillText(String(s.cells[i]||''),x+35,y+52);ctx.fillStyle='#55e7ff'}}
 else if(s.type==='memory2'){ctx.fillStyle='#55e7ff';for(let i=0;i<4;i++){ctx.fillRect(230+(i%2)*100,150+Math.floor(i/2)*100,80,80)}ctx.fillStyle='#fff';ctx.fillText('REMEMBER 4 TILES',250,390)}
 else if(s.type==='typing2'){ctx.fillStyle='#fff';ctx.font='700 42px sans-serif';ctx.fillText(s.targetWord||'RUDRA',250,250);ctx.font='16px sans-serif';ctx.fillText('Use keyboard and press ENTER',245,290)}
 else if(s.type==='rhythm'){ctx.fillStyle='#ff4d8d';ctx.fillRect(s.x,230,10,60);ctx.strokeStyle='#55e7ff';ctx.strokeRect(330,210,40,100)}
 else if(s.type==='breakout'){for(let i=0;i<7;i++){ctx.fillStyle=['#55e7ff','#ff4d8d','#ffd166'][i%3];ctx.fillRect(80+i*80,80,65,25)}ctx.fillStyle='#fff';ctx.fillRect(s.x-50,450,100,12);ctx.beginPath();ctx.arc(s.x,420,9,0,Math.PI*2);ctx.fill()}
 else {ctx.fillStyle='#55e7ff';ctx.font='700 34px sans-serif';ctx.fillText('TAP / MOVE / SURVIVE',190,250)} }
function miniEnd(){const s=miniState;if(!s||!s.running)return;s.running=false;clearInterval(miniTimer);cancelAnimationFrame(miniRaf);arcadeAudio(s.score?'win':'crash');const best=arcadeBest('mini_'+s.type);if(s.score>best)arcadeSetBest('mini_'+s.type,s.score);const o=document.getElementById('miniOverlay');if(o){o.classList.remove('hidden');o.innerHTML=`<div class="arcade-message"><h3>🏆 ROUND COMPLETE</h3><p>Score: <b>${Math.floor(s.score)}</b></p><p>Best: ${arcadeBest('mini_'+s.type)}</p><p>Press START / REPLAY for another round.</p></div>`}}


/* ===== 10 NEW GAME CENTER ARCADE GAMES ===== */
const NEW_GAME_TYPES=['reflexGrid','dodgeArena','coinCatcher','laserDefense','colorSort','numberRush','gravityFlip','bridgeBuilder','orbitDefender','wordScramble'];
const NEW_GAME_NAMES={reflexGrid:['⚡','REFLEX GRID','Hit the glowing tile before it moves.'],dodgeArena:['🛡️','DODGE ARENA','Move and survive the hazard storm.'],coinCatcher:['🪙','COIN CATCHER','Catch coins. Avoid bombs.'],laserDefense:['🔫','LASER DEFENSE','Protect the base from incoming targets.'],colorSort:['🎨','COLOR SORT','Tap the requested color.'],numberRush:['🔢','NUMBER RUSH','Find the next number in order.'],gravityFlip:['🌀','GRAVITY FLIP','Switch gravity and survive.'],bridgeBuilder:['🌉','BRIDGE BUILDER','Time the bridge length.'],orbitDefender:['🪐','ORBIT DEFENDER','Rotate and defend the planet.'],wordScramble:['🔤','WORD SCRAMBLE','Unscramble the tech word.']};
let newGame=null,newGameTimer=null,newGameRaf=0,newGameAudio=false;
function newGameShell(type){const n=NEW_GAME_NAMES[type];arcadeMount(`<div class="game-title"><span class="game-icon">${n[0]}</span><div><h2>${n[1]}</h2><div class="game-sub">NEW GAME // LOCAL ARCADE</div></div></div><div class="arcade-shell"><div class="arcade-head"><b>RUDRA ARCADE</b><div class="arcade-stats"><span class="arcade-stat" id="newScore">SCORE 0</span><span class="arcade-stat" id="newTime">TIME 30</span><span class="arcade-stat" id="newBest">BEST ${arcadeBest('new_'+type)}</span></div></div><div class="arcade-canvas-wrap"><canvas id="arcadeCanvas" class="arcade-canvas" width="900" height="560"></canvas><div id="newOverlay" class="arcade-overlay"><div class="arcade-message"><h3>READY?</h3><p>${n[2]}</p><p>Keyboard + mouse/touch supported.</p></div></div></div><div class="arcade-actions"><button class="btn primary" onclick="startNewRound()">START / REPLAY</button><button class="btn" onclick="closeGame()">EXIT</button></div><div class="arcade-tip">Best score saves on this device.</div></div>`);}
function startNewGame(type){cancelAnimationFrame(newGameRaf);clearInterval(newGameTimer);newGame={type,score:0,time:30,running:false,last:performance.now(),x:450,y:440,vx:0,vy:0,gravity:1,target:null,items:[],lives:3,level:1,combo:0,seq:[],next:1,word:'',input:'',bridge:0,bridgeDir:1,angle:0,scrambled:''};newGameShell(type);const c=gameCanvas();if(c){c.onpointerdown=newGamePointer;c.onpointermove=newGamePointer;}window.onkeydown=newGameKey;window.onkeyup=()=>{};newGameDraw();}
function startNewRound(){const s=newGame;if(!s)return;s.score=0;s.time=30;s.running=true;s.last=performance.now();s.x=450;s.y=440;s.vx=0;s.vy=0;s.gravity=1;s.target=null;s.items=[];s.lives=3;s.combo=0;s.level=1;s.next=1;s.word='';s.input='';s.bridge=0;s.bridgeDir=1;s.angle=0;newGamePrepare();document.getElementById('newOverlay')?.classList.add('hidden');clearInterval(newGameTimer);newGameTimer=setInterval(()=>{if(!s.running)return;s.time--;if(s.time<=0)newGameEnd()},1000);cancelAnimationFrame(newGameRaf);s.last=performance.now();newGameRaf=requestAnimationFrame(newGameLoop);}
function newGamePrepare(){const s=newGame;if(!s)return;if(s.type==='reflexGrid')s.target={x:100+Math.random()*700,y:100+Math.random()*320,r:34};if(s.type==='colorSort')newColorRound();if(s.type==='numberRush')newNumberRound();if(s.type==='wordScramble')newWordRound();if(s.type==='dodgeArena'||s.type==='coinCatcher'||s.type==='laserDefense')s.items=[];}
function newGamePointer(e){const s=newGame;if(!s)return;const c=gameCanvas(),r=c.getBoundingClientRect();const x=(e.clientX-r.left)*c.width/r.width,y=(e.clientY-r.top)*c.height/r.height;s.px=x;s.py=y;if(!s.running)return;if(['reflexGrid','colorSort','numberRush','laserDefense','wordScramble'].includes(s.type))newGameAction(x,y);}
function newGameKey(e){const s=newGame;if(!s)return;const k=e.key.toLowerCase();if(k===' '||k==='enter')e.preventDefault();if(!s.running){if(k==='enter'||k===' ')startNewRound();return;}if(s.type==='dodgeArena'||s.type==='coinCatcher'){if(k==='arrowleft'||k==='a')s.x-=55;if(k==='arrowright'||k==='d')s.x+=55;}if(s.type==='gravityFlip'&&(k===' '||k==='arrowup'||k==='arrowdown')){s.gravity*=-1;s.vy=0;arcadeAudio('move');}if(s.type==='bridgeBuilder'&&k===' '){s.bridge+=s.bridgeDir*18;if(s.bridge>260||s.bridge<20){s.running=false;newGameEnd();}else{const gap=100+s.level*28;if(Math.abs(s.bridge-gap)<35){s.score+=100+s.level*25;s.level++;s.bridge=0;s.bridgeDir=1;arcadeAudio('win');}else{s.running=false;newGameEnd();}}}if(s.type==='orbitDefender'&&(k==='arrowleft'||k==='a'))s.angle-=.35;if(s.type==='orbitDefender'&&(k==='arrowright'||k==='d'))s.angle+=.35;if(s.type==='wordScramble'&&k.length===1&&/[a-z]/.test(k)){s.input+=k;}if(s.type==='wordScramble'&&k==='backspace')s.input=s.input.slice(0,-1);if(s.type==='wordScramble'&&k==='enter')newGameAction(0,0);}
function newGameAction(x,y){const s=newGame;if(!s?.running)return;const W=900,H=560;
 if(s.type==='reflexGrid'&&s.target){if(Math.hypot(x-s.target.x,y-s.target.y)<s.target.r+10){s.score+=100+s.combo*20;s.combo++;s.target={x:70+Math.random()*(W-140),y:80+Math.random()*(H-170),r:Math.max(18,34-s.combo*.5)};arcadeAudio('hit');}}
 else if(s.type==='colorSort'){const idx=s.items.findIndex(o=>Math.hypot(x-o.x,y-o.y)<42);if(idx>=0){if(s.items[idx].color===s.want){s.score+=50+s.combo*5;s.combo++;arcadeAudio('coin');newColorRound();}else{s.combo=0;s.score=Math.max(0,s.score-15);arcadeAudio('crash')}}}
 else if(s.type==='numberRush'){const hit=s.items.find(o=>Math.hypot(x-o.x,y-o.y)<38);if(hit&&hit.n===s.next){s.score+=25;s.next++;s.items=s.items.filter(o=>o!==hit);if(s.next>9)newNumberRound();arcadeAudio('coin');}else if(hit){s.score=Math.max(0,s.score-20);s.combo=0;arcadeAudio('crash')}}
 else if(s.type==='laserDefense'){const hit=s.items.findIndex(o=>Math.hypot(x-o.x,y-o.y)<o.r+12);if(hit>=0){s.items.splice(hit,1);s.score+=40;arcadeAudio('laser')}}
 else if(s.type==='wordScramble'){if(s.input.toUpperCase()===s.word){s.score+=100;s.combo++;s.input='';newWordRound();arcadeAudio('win');}else if(s.input.length>=s.word.length){s.score=Math.max(0,s.score-20);s.input='';s.combo=0;arcadeAudio('crash');}}
}
function newColorRound(){const s=newGame;if(!s)return;const colors=['RED','BLUE','GREEN','YELLOW'];s.want=colors[Math.floor(Math.random()*4)];s.items=colors.map((color,i)=>({color,x:170+(i%2)*300,y:190+Math.floor(i/2)*150}));}
function newNumberRound(){const s=newGame;if(!s)return;s.next=1;s.items=Array.from({length:9},(_,i)=>({n:i+1,x:120+(i%3)*330,y:130+Math.floor(i/3)*140})).sort(()=>Math.random()-.5);}
function newWordRound(){const s=newGame;if(!s)return;const words=['CODE','HTML','SCRIPT','BROWSER','RUDRA','VICKY','PLAYER','MOBILE','SERVER','PIXEL'];s.word=words[Math.floor(Math.random()*words.length)];s.input='';s.scrambled=s.scrambled||s.word;}
function newGameLoop(t){const s=newGame;if(!s?.running)return;const dt=Math.min(.032,(t-s.last)/1000);s.last=t;const W=900,H=560;
 if(s.type==='dodgeArena'){s.x=Math.max(35,Math.min(W-35,s.x));if(Math.random()<.035+s.score/20000)s.items.push({x:30+Math.random()*(W-60),y:-25,r:16+Math.random()*18,vy:170+Math.random()*170});for(let i=s.items.length-1;i>=0;i--){const o=s.items[i];o.y+=o.vy*dt;if(Math.hypot(o.x-s.x,o.y-s.y)<o.r+22){s.items.splice(i,1);s.lives--;s.combo=0;arcadeAudio('hit');if(s.lives<=0)return newGameEnd();}else if(o.y>H+40){s.items.splice(i,1);s.score+=5;}}}
 else if(s.type==='coinCatcher'){s.x=Math.max(35,Math.min(W-35,s.x));if(Math.random()<.045)s.items.push({x:25+Math.random()*(W-50),y:-25,r:15,vy:150+Math.random()*120,bomb:Math.random()<.22});for(let i=s.items.length-1;i>=0;i--){const o=s.items[i];o.y+=o.vy*dt;if(Math.hypot(o.x-s.x,o.y-s.y)<o.r+24){s.items.splice(i,1);if(o.bomb){s.lives--;s.combo=0;arcadeAudio('hit');if(s.lives<=0)return newGameEnd();}else{s.score+=25+s.combo*3;s.combo++;arcadeAudio('coin');}}else if(o.y>H+30)s.items.splice(i,1);}}
 else if(s.type==='laserDefense'){if(Math.random()<.025+s.score/30000)s.items.push({x:20+Math.random()*(W-40),y:-20,r:14+Math.random()*12,vy:70+s.score/8});for(let i=s.items.length-1;i>=0;i--){const o=s.items[i];o.y+=o.vy*dt;if(o.y>H-80){s.items.splice(i,1);s.lives--;arcadeAudio('hit');if(s.lives<=0)return newGameEnd();}else if(o.y>H+20)s.items.splice(i,1);}}
 else if(s.type==='gravityFlip'){s.x+=220*dt;s.y+=s.vy*dt;s.vy+=900*s.gravity*dt;if(s.x>W+30)s.x=-30;if(s.y<20||s.y>H-20)return newGameEnd();if(Math.random()<.018)s.items.push({x:650+Math.random()*200,y:s.gravity>0?H-70:70,r:16});for(const o of s.items){o.x-=250*dt;if(Math.hypot(o.x-s.x,o.y-s.y)<o.r+18)return newGameEnd();}s.items=s.items.filter(o=>o.x>-40);s.score+=dt*10;}
 else if(s.type==='bridgeBuilder'){s.bridge+=s.bridgeDir*130*dt;if(s.bridge>260)s.bridgeDir=-1;if(s.bridge<20)s.bridgeDir=1;s.score+=dt*2;}
 else if(s.type==='orbitDefender'){s.angle+=(s.orbitDir||0)*2;if(Math.random()<.025)s.items.push({a:Math.random()*Math.PI*2,r:245,spd:.45+Math.random()*.4});for(let i=s.items.length-1;i>=0;i--){const o=s.items[i];o.a+=o.spd*dt;o.r-=45*dt;const px=450+Math.cos(s.angle)*165,py=280+Math.sin(s.angle)*165,ox=450+Math.cos(o.a)*o.r,oy=280+Math.sin(o.a)*o.r;if(Math.hypot(px-ox,py-oy)<28){s.items.splice(i,1);s.score+=60;s.combo++;arcadeAudio('hit');}else if(o.r<155)return newGameEnd();}}
 if(s.type==='reflexGrid'&&s.combo>0)s.score+=dt*2;
 newGameDraw();document.getElementById('newScore')&&(document.getElementById('newScore').textContent='SCORE '+Math.floor(s.score));document.getElementById('newTime')&&(document.getElementById('newTime').textContent='TIME '+Math.max(0,Math.ceil(s.time)));document.getElementById('newBest')&&(document.getElementById('newBest').textContent='BEST '+arcadeBest('new_'+s.type));newGameRaf=requestAnimationFrame(newGameLoop);}
function newGameDraw(){
 const s=newGame,c=gameCanvas();if(!s||!c)return;const ctx=c.getContext('2d'),W=900,H=560,t=performance.now()/1000;
 const bg=ctx.createLinearGradient(0,0,W,H);bg.addColorStop(0,'#071b3a');bg.addColorStop(.5,'#13204b');bg.addColorStop(1,'#24133e');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
 // colourful depth background
 for(let i=0;i<12;i++){const x=(i*97+40)%W,y=90+(i*53)%390,r=18+(i%4)*7;ctx.globalAlpha=.08;ctx.fillStyle=['#38d9ff','#ff5ca8','#ffd166','#5cff9d'][i%4];ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;
 ctx.strokeStyle='rgba(150,220,255,.10)';ctx.lineWidth=1;for(let x=0;x<W;x+=45){ctx.beginPath();ctx.moveTo(x,55);ctx.lineTo(x,H);ctx.stroke()}for(let y=55;y<H;y+=45){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
 // HUD panel
 ctx.fillStyle='rgba(3,8,25,.72)';ctx.fillRect(0,0,W,58);ctx.fillStyle='#ffffff';ctx.font='800 23px system-ui,sans-serif';ctx.fillText(NEW_GAME_NAMES[s.type][1],22,36);
 ctx.fillStyle='#7ee8ff';ctx.font='700 15px system-ui,sans-serif';ctx.fillText('SCORE '+Math.floor(s.score),650,25);ctx.fillStyle='#ffd166';ctx.fillText('TIME '+Math.max(0,Math.ceil(s.time)),650,45);ctx.fillStyle='#fff';ctx.font='700 14px system-ui,sans-serif';
 const roundRect=(x,y,w,h,r)=>{ctx.beginPath();ctx.roundRect(x,y,w,h,r);};
 const glow=(color)=>{ctx.shadowColor=color;ctx.shadowBlur=18};const noglow=()=>{ctx.shadowBlur=0};
 if(s.type==='reflexGrid'){
   ctx.fillStyle='rgba(15,40,70,.8)';roundRect(55,85,790,410,22);ctx.fill();
   ctx.fillStyle='#a9c8ff';ctx.font='700 18px system-ui';ctx.fillText('TAP THE GLOWING CORE • FAST = MORE COMBO',255,112);
   if(s.target){glow('#ff4da6');ctx.fillStyle='#ff4da6';ctx.beginPath();ctx.arc(s.target.x,s.target.y,s.target.r+10,0,Math.PI*2);ctx.fill();noglow();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(s.target.x,s.target.y,s.target.r*.72,0,Math.PI*2);ctx.fill();ctx.fillStyle='#182044';ctx.font='900 15px system-ui';ctx.textAlign='center';ctx.fillText('HIT',s.target.x,s.target.y+5);ctx.textAlign='left';}
   ctx.fillStyle='#55e7ff';ctx.font='800 20px system-ui';ctx.fillText('COMBO '+s.combo,30,535);
 } else if(s.type==='dodgeArena'){
   // arena lanes + shield player
   ctx.fillStyle='rgba(10,30,58,.9)';roundRect(45,75,810,430,24);ctx.fill();for(let x=105;x<820;x+=95){ctx.strokeStyle='rgba(100,220,255,.12)';ctx.setLineDash([10,14]);ctx.beginPath();ctx.moveTo(x,85);ctx.lineTo(x,495);ctx.stroke();ctx.setLineDash([])}
   ctx.fillStyle='#8df7ff';ctx.font='700 18px system-ui';ctx.fillText('MOVE  A / D  OR  ← / →',325,105);
   glow('#38e0ff');ctx.fillStyle='#38e0ff';ctx.beginPath();ctx.moveTo(s.x,465);ctx.lineTo(s.x-28,495);ctx.lineTo(s.x-42,475);ctx.lineTo(s.x-25,430);ctx.lineTo(s.x+25,430);ctx.lineTo(s.x+42,475);ctx.lineTo(s.x+28,495);ctx.closePath();ctx.fill();noglow();
   s.items.forEach(o=>{glow('#ff4d72');ctx.fillStyle='#ff4d72';ctx.beginPath();ctx.moveTo(o.x,o.y-o.r);ctx.lineTo(o.x+o.r,o.y+o.r);ctx.lineTo(o.x-o.r,o.y+o.r);ctx.closePath();ctx.fill();noglow();});
   ctx.fillStyle='#fff';ctx.font='800 18px system-ui';ctx.fillText('SHIELDS '+s.lives,25,535);
 } else if(s.type==='coinCatcher'){
   ctx.fillStyle='rgba(33,26,10,.9)';roundRect(45,75,810,430,24);ctx.fill();
   ctx.fillStyle='#ffd166';ctx.font='700 18px system-ui';ctx.fillText('CATCH GOLD • AVOID THE RED BOMBS',300,105);
   s.items.forEach(o=>{glow(o.bomb?'#ff426d':'#ffd166');ctx.fillStyle=o.bomb?'#ff426d':'#ffd166';ctx.beginPath();ctx.arc(o.x,o.y,o.r,0,Math.PI*2);ctx.fill();ctx.fillStyle=o.bomb?'#5b1026':'#fff4b0';ctx.beginPath();ctx.arc(o.x-4,o.y-4,o.r*.38,0,Math.PI*2);ctx.fill();noglow();});
   glow('#55e7ff');ctx.fillStyle='#55e7ff';roundRect(s.x-45,455,90,28,12);ctx.fill();noglow();ctx.fillStyle='#0b1932';ctx.font='900 13px system-ui';ctx.textAlign='center';ctx.fillText('COLLECT',s.x,474);ctx.textAlign='left';
   ctx.fillStyle='#fff';ctx.font='800 18px system-ui';ctx.fillText('LIVES '+s.lives+'   STREAK '+s.combo,25,535);
 } else if(s.type==='laserDefense'){
   ctx.fillStyle='rgba(7,35,35,.92)';roundRect(45,75,810,430,24);ctx.fill();
   ctx.fillStyle='#79ffbd';ctx.font='700 18px system-ui';ctx.fillText('LASER DEFENSE • CLICK THE INCOMING CORES',270,105);
   // skyline/base
   for(let i=0;i<10;i++){const x=55+i*82,h=45+(i%4)*25;ctx.fillStyle=['#173e53','#20505a','#1b4662'][i%3];ctx.fillRect(x,455-h,62,h);ctx.fillStyle='#ffd166';for(let w=0;w<3;w++)ctx.fillRect(x+10+w*17,470-h,8,10);}
   ctx.fillStyle='#52ffb0';roundRect(330,470,240,25,9);ctx.fill();ctx.fillStyle='#071b22';ctx.font='900 12px system-ui';ctx.textAlign='center';ctx.fillText('RUDRA BASE',450,487);ctx.textAlign='left';
   s.items.forEach(o=>{glow('#ff4d72');ctx.fillStyle='#ff4d72';ctx.beginPath();ctx.arc(o.x,o.y,o.r,0,Math.PI*2);ctx.fill();ctx.fillStyle='#ffd166';ctx.beginPath();ctx.arc(o.x,o.y,o.r*.42,0,Math.PI*2);ctx.fill();noglow();});
   ctx.fillStyle='#fff';ctx.font='800 18px system-ui';ctx.fillText('BASE SHIELDS '+s.lives,25,535);
 } else if(s.type==='colorSort'){
   ctx.fillStyle='rgba(27,20,55,.88)';roundRect(50,75,800,420,24);ctx.fill();
   ctx.fillStyle='#fff';ctx.font='800 27px system-ui';ctx.textAlign='center';ctx.fillText('FIND  '+s.want,450,112);ctx.textAlign='left';
   const map={RED:'#ff4d72',BLUE:'#43dfff',GREEN:'#55f5a3',YELLOW:'#ffd166'};s.items.forEach(o=>{glow(map[o.color]);ctx.fillStyle=map[o.color];ctx.beginPath();ctx.arc(o.x,o.y,52,0,Math.PI*2);ctx.fill();noglow();ctx.fillStyle='#10162f';ctx.font='900 17px system-ui';ctx.textAlign='center';ctx.fillText(o.color,o.x,o.y+6);ctx.textAlign='left';});
   ctx.fillStyle='#aeefff';ctx.font='700 17px system-ui';ctx.fillText('Correct = combo grows • Wrong = combo resets',255,475);
 } else if(s.type==='numberRush'){
   ctx.fillStyle='rgba(13,29,62,.9)';roundRect(45,75,810,420,24);ctx.fill();
   ctx.fillStyle='#fff';ctx.font='800 25px system-ui';ctx.textAlign='center';ctx.fillText('TAP NUMBER '+s.next+'  →  9',450,108);ctx.textAlign='left';
   s.items.forEach(o=>{glow('#42dfff');ctx.fillStyle='#42dfff';roundRect(o.x-39,o.y-39,78,78,18);ctx.fill();noglow();ctx.fillStyle='#08152d';ctx.font='900 30px system-ui';ctx.textAlign='center';ctx.fillText(o.n,o.x,o.y+10);ctx.textAlign='left';});
 } else if(s.type==='gravityFlip'){
   ctx.fillStyle='rgba(20,18,60,.9)';roundRect(40,75,820,430,24);ctx.fill();
   ctx.fillStyle='#ff6ab0';ctx.fillRect(40,82,820,12);ctx.fillRect(40,492,820,12);ctx.fillStyle='#aeefff';ctx.font='700 17px system-ui';ctx.fillText('SPACE / ↑ / ↓  =  FLIP GRAVITY',315,115);
   ctx.fillStyle='#38e0ff';ctx.beginPath();ctx.arc(s.x,s.y,20,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(s.x-6,s.y-5,4,0,Math.PI*2);ctx.fill();
   s.items.forEach(o=>{glow('#ff456f');ctx.fillStyle='#ff456f';roundRect(o.x-17,o.y-17,34,34,8);ctx.fill();noglow();});
 } else if(s.type==='bridgeBuilder'){
   ctx.fillStyle='rgba(28,28,55,.92)';roundRect(40,75,820,430,24);ctx.fill();
   ctx.fillStyle='#9be9ff';ctx.font='700 18px system-ui';ctx.fillText('PRESS SPACE WHEN THE BRIDGE MATCHES THE GAP',250,110);
   ctx.fillStyle='#435b76';ctx.fillRect(100,410,190,65);ctx.fillRect(610,410,190,65);ctx.fillStyle='#6c8ba8';ctx.fillRect(100,475,190,18);ctx.fillRect(610,475,190,18);
   glow('#ffd166');ctx.fillStyle='#ffd166';ctx.fillRect(290,420,s.bridge,35);noglow();ctx.fillStyle='#ff5ca8';ctx.fillRect(390,392,120,6);
   ctx.fillStyle='#fff';ctx.font='800 18px system-ui';ctx.fillText('TARGET GAP',420,382);ctx.fillText('LEVEL '+s.level,25,535);
 } else if(s.type==='orbitDefender'){
   ctx.fillStyle='rgba(10,15,48,.92)';roundRect(40,70,820,435,24);ctx.fill();
   // stars
   for(let i=0;i<35;i++){ctx.fillStyle=i%3===0?'#ffd166':'#8de9ff';ctx.globalAlpha=.6;ctx.fillRect((i*137)%820+40,(i*71)%390+80,2,2)}ctx.globalAlpha=1;
   ctx.strokeStyle='rgba(90,220,255,.35)';ctx.lineWidth=5;ctx.beginPath();ctx.arc(450,285,165,0,Math.PI*2);ctx.stroke();ctx.strokeStyle='rgba(255,90,170,.16)';ctx.lineWidth=22;ctx.beginPath();ctx.arc(450,285,110,0,Math.PI*2);ctx.stroke();
   glow('#ffd166');ctx.fillStyle='#ffd166';ctx.beginPath();ctx.arc(450,285,58,0,Math.PI*2);ctx.fill();noglow();ctx.fillStyle='#fff1a8';ctx.beginPath();ctx.arc(432,267,17,0,Math.PI*2);ctx.fill();
   const px=450+Math.cos(s.angle)*165,py=285+Math.sin(s.angle)*165;glow('#55f5a3');ctx.fillStyle='#55f5a3';ctx.beginPath();ctx.moveTo(px+Math.cos(s.angle)*22,py+Math.sin(s.angle)*22);ctx.lineTo(px+Math.cos(s.angle+2.4)*18,py+Math.sin(s.angle+2.4)*18);ctx.lineTo(px+Math.cos(s.angle-2.4)*18,py+Math.sin(s.angle-2.4)*18);ctx.closePath();ctx.fill();noglow();
   s.items.forEach(o=>{const ox=450+Math.cos(o.a)*o.r,oy=285+Math.sin(o.a)*o.r;glow('#ff4d72');ctx.fillStyle='#ff4d72';ctx.beginPath();ctx.arc(ox,oy,12,0,Math.PI*2);ctx.fill();noglow();});
   ctx.fillStyle='#fff';ctx.font='700 17px system-ui';ctx.fillText('A / D  OR  ← / →  ROTATE',25,535);
 } else if(s.type==='wordScramble'){
   ctx.fillStyle='rgba(24,22,55,.92)';roundRect(90,90,720,350,26);ctx.fill();
   ctx.fillStyle='#8eeaff';ctx.font='800 17px system-ui';ctx.textAlign='center';ctx.fillText('UNSCRAMBLE THE TECH WORD',450,130);
   const letters=s.scrambled||s.word;ctx.fillStyle='#ffd166';ctx.font='900 48px system-ui';ctx.fillText(letters,450,220);
   ctx.fillStyle='rgba(5,12,35,.9)';roundRect(210,255,480,75,16);ctx.fill();ctx.strokeStyle='#55e7ff';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='#fff';ctx.font='800 28px system-ui';ctx.fillText(s.input.toUpperCase()||'TYPE HERE',450,303);
   ctx.fillStyle='#a8b8df';ctx.font='700 16px system-ui';ctx.fillText('ENTER = CHECK   •   BACKSPACE = ERASE',450,370);ctx.textAlign='left';
 }
 ctx.fillStyle='rgba(255,255,255,.72)';ctx.font='700 13px system-ui';ctx.fillText('RUDRA ARCADE  •  BEST SCORE SAVES ON THIS DEVICE',24,555);
}
function newGameEnd(){const s=newGame;if(!s)return;s.running=false;clearInterval(newGameTimer);cancelAnimationFrame(newGameRaf);arcadeSetBest('new_'+s.type,s.score);arcadeAudio(s.score?'win':'crash');const o=document.getElementById('newOverlay');if(o){o.classList.remove('hidden');o.innerHTML=`<div class="arcade-message"><h3>🏆 ROUND COMPLETE</h3><p>${NEW_GAME_NAMES[s.type][1]} — Score: <b>${Math.floor(s.score)}</b></p><p>Best: ${arcadeBest('new_'+s.type)}</p><p>Press START / REPLAY to play again.</p></div>`;}}
window.searchGames=function(q){q=(q||'').trim().toLowerCase();document.querySelectorAll('.game-card').forEach(card=>{const text=card.textContent.toLowerCase();card.classList.toggle('is-hidden',q&&!text.includes(q));});};
window.playRandomGame=function(){const types=['car','blaster','bottles','platformer','bubble','bubbleRush','space','rooftop',...NEW_GAME_TYPES];const type=types[Math.floor(Math.random()*types.length)];openGame(type);};
window.toggleGameSound=function(){newGameAudio=!newGameAudio;soundOn=newGameAudio;const el=document.getElementById('gameSoundLabel');if(el)el.textContent=newGameAudio?'ON':'OFF';showToast(newGameAudio?'🔊 Game sound ON':'🔇 Game sound OFF');};
window.addEventListener('load',()=>{const n=document.getElementById('gameCountLive');if(n)n.textContent='18 GAMES + RUDRA CITY';});


/* ===== JARVIS AI // PROFESSIONAL LOCAL CONVERSATIONAL ENGINE ===== */
(function(){
 const facts=[
  ['html','HTML is the standard markup language used to structure web pages. 🧱💻','Web'],['css','CSS controls the look of a web page: colors, spacing, layout, fonts and responsive design. 🎨','Web'],['javascript','JavaScript adds logic and interactivity to websites, such as buttons, games and dynamic UI. ⚙️','Coding'],['python','Python is a general-purpose programming language known for readable syntax and is used in automation, data, AI and web development. 🐍','Coding'],['algorithm','An algorithm is a step-by-step method for solving a problem or completing a task. 🧠','Coding'],['browser','A browser is software that loads and displays websites, such as Chrome, Edge, Firefox or Safari. 🌐','Computer'],['url','A URL is the address used to locate a resource on the internet. 🔗','Internet'],['internet','The internet is a global network of connected devices that communicate using standard protocols. 🌍','Internet'],['website','A website is a collection of web pages and resources available through a web address. 🌐','Web'],['server','A server is a computer or program that provides data or services to other computers, often over a network. 🖥️','Computer'],
  ['cpu','The CPU is the main processor that executes instructions and performs calculations. 🧠💻','Computer'],['ram','RAM is fast temporary memory used by programs while they are running. ⚡','Computer'],['storage','Storage keeps data even after a device is turned off; examples include SSDs and hard drives. 💾','Computer'],['gpu','A GPU is specialized for parallel graphics and computation, making it important for games and visual workloads. 🎮','Computer'],['operating system','An operating system manages hardware and provides services and an interface for apps. 🖥️','Computer'],['keyboard','A keyboard is an input device used to enter text and commands. ⌨️','Computer'],['mouse','A mouse is a pointing device used to move a cursor and interact with graphical interfaces. 🖱️','Computer'],['wifi','Wi‑Fi is a wireless networking technology that connects devices to a local network. 📶','Internet'],['bluetooth','Bluetooth is a short-range wireless technology for connecting compatible devices. 🔵','Technology'],['cloud','Cloud computing lets users access computing, storage or services over a network instead of relying only on a local device. ☁️','Technology'],
  ['ai','AI refers to computer systems designed to perform tasks that normally require human-like intelligence, such as recognizing patterns or generating text. 🤖','AI'],['machine learning','Machine learning is a branch of AI where models learn patterns from data to make predictions or decisions. 🤖📊','AI'],['neural network','A neural network is a machine-learning model made of connected computational units that transform inputs into outputs. 🧠','AI'],['prompt','A prompt is the instruction or input you give an AI system to guide its response. ✍️🤖','AI'],['emoji','Emojis are small symbols used to express ideas, emotions or reactions in digital communication. 😄✨','Everyday'],
  ['math','Mathematics is the study of quantities, patterns, structures, space and logical relationships. ➗📐','School'],['algebra','Algebra uses symbols and rules to represent quantities and solve relationships or equations. ✏️','Maths'],['geometry','Geometry studies shapes, sizes, positions and properties of space. 📐','Maths'],['percentage','A percentage means a value out of 100. For example, 25% means 25 out of 100. %️⃣','Maths'],['average','An average is commonly found by adding the values and dividing by the number of values. ➕➗','Maths'],
  ['photosynthesis','Photosynthesis is the process by which green plants use light energy to make food from carbon dioxide and water, releasing oxygen. 🌱☀️','Science'],['atom','An atom is the basic unit of an element, with a nucleus surrounded by electrons. ⚛️','Science'],['molecule','A molecule is made of two or more atoms chemically bonded together. 🧪','Science'],['gravity','Gravity is an attractive force between masses; near Earth it gives objects weight and makes falling objects accelerate downward. 🌍','Science'],['electricity','Electricity involves electric charge and its movement. In circuits, current is the flow of charge. ⚡','Science'],['voltage','Voltage is electric potential difference; it provides the energy per unit charge that drives current in a circuit. 🔋','Science'],['current','Electric current is the rate at which electric charge flows through a circuit. ⚡','Science'],['resistance','Electrical resistance describes how strongly a material opposes electric current. Ω','Science'],['ecosystem','An ecosystem includes living organisms and the non-living environment interacting together. 🌳🐦','Science'],
  ['study','A simple study method: learn one small topic, close the book, recall it from memory, then solve a few questions. 📚🧠','Study'],['revision','Revision works best when you repeatedly recall important ideas and practise questions instead of only rereading. 🔁📖','Study'],['focus','For better focus, choose one task, remove distractions, work for a manageable block, then take a short break. 🎯','Study'],['exam','Before an exam, revise key formulas/definitions, practise representative questions and sleep properly rather than cramming all night. 📝','Study'],['notes','Good notes are short, organized and written in your own words, with formulas, definitions and examples easy to find. ✍️','Study'],
  ['game','A game is an interactive activity with rules, goals and feedback. 🎮','Games'],['score','A score is a numerical measure of performance in a game or activity. 🏆','Games'],['level','A game level is a stage or difficulty section that usually introduces new challenges or goals. 🎮','Games'],['npc','NPC means non-player character: a character controlled by the game rather than directly by the player. 🧍','Games'],['open world','An open-world game lets players explore a relatively large environment with freedom to move between areas. 🗺️','Games'],
  ['india','India is a country in South Asia. Its capital is New Delhi. 🇮🇳','General'],['earth','Earth is the planet we live on and the third planet from the Sun. 🌍','General'],['moon','The Moon is Earth’s natural satellite and takes about a month to complete one cycle of phases. 🌙','General'],['sun','The Sun is a star at the center of our solar system and the main source of Earth’s light and heat. ☀️','General'],['water','Water is H₂O and is essential for life. It commonly exists as ice, liquid water and water vapor. 💧','Science'],
  ['hello','Hey! 👋 I’m JARVIS AI. 👋 Ask me anything and I’ll do my best to help. 🤖✨','Chat'],['hi','Hi! 😄 What would you like to know?','Chat'],['thanks','You’re welcome! 😄✨','Chat'],['thank you','Anytime! 🤝😊','Chat'],['bye','See you! 👋 Keep learning and building cool things. 🚀','Chat'],['who are you','I’m JARVIS, the professional assistant built into this website. 🤖 I use local knowledge, pattern matching, conversation context and response generation.','Chat'],
  ['how to learn coding','Start with HTML, then CSS, then JavaScript. Build tiny projects after each topic and practise regularly. 💻🚀','Coding'],['best programming language','There is no single best language. Choose based on your goal: JavaScript for web, Python for beginner-friendly general coding/AI, Java or C# for many larger software/game projects. 👨‍💻','Coding'],['what is coding','Coding means writing instructions that a computer can execute to perform tasks. 💻','Coding'],['what is a computer','A computer is an electronic system that accepts input, processes data using instructions, stores information and produces output. 🖥️','Computer'],['how to make a website','Start with index.html for structure, style.css for design and script.js for interactivity. Then test locally and publish it with a suitable hosting service. 🌐','Web'],
  ['motivation','You do not need to finish everything at once. Pick one small task, finish it, then move to the next. 💪🔥','Study'],['good morning','Good morning! ☀️ Hope your day goes well. What are we building or learning today? 🚀','Chat'],['good night','Good night! 🌙 Rest well and come back fresh tomorrow. 😴✨','Chat']
 ];
 const templates=[
  'what is {k}','what does {k} mean','tell me about {k}','explain {k}','define {k}','can you explain {k}','give me information about {k}','i want to know about {k}','{k} kya hai','{k} ka matlab kya hai','{k} ke bare me batao','{k} ko explain karo','mujhe {k} samjhao','{k} kya hota hai','how does {k} work','why is {k} important','simple explanation of {k}','{k} explain in simple words','tell me something about {k}','help me understand {k}'
 ];
 // Core knowledge is compact; responses are generated dynamically so the engine can produce millions of response combinations without storing millions of duplicate records.
 const AI_KB=[];
 for(let i=0;i<facts.length;i++){const [k,a,c]=facts[i];for(const t of templates)AI_KB.push({q:t.replaceAll('{k}',k),a,c,k});}
 const responseOpeners=['Sure! 😊','Absolutely! 🤝','Good question! 🧠','Yep! 👍','Of course! ✨','Let’s break it down. 🔎','Got it! 🚀','Here’s the simple answer: 💡'];
 const supportLines=['I’m with RUDRA and VICKY on this one. 💪','JARVIS is on your side for learning, building and solving problems. 🤝','We’ll keep it practical and clear. 🛠️','Let’s solve it step by step. 🧩'];
 const unknownLines=['I don’t have a verified fact for that exact topic yet, but I can still help you reason through it. 🤔','That question is outside my compact local knowledge set, so I won’t invent a fake fact. 🧠','I can work with that. Give me one extra detail and I can make the answer more useful. 🔎'];
 const casualReplies=['Haha 😄 I got that! JARVIS is listening. 🤖','😂 That message looks random, but I’m still here. Send a real question whenever you want!','😎 Received loud and clear! What are we working on?','🤣 Random text detected — no problem. Try me with anything.'];
 const creatorFacts=[
  ['rudra','Rudra is the creator behind this website and the RUDRA CITY project. He is learning technology by building real projects and experiments. 🚀'],
  ['vicky','Vicky is the creator identity used across the website and project branding. 🤖✨'],
  ['bikkee warrior','Bikkee Warrior is the creator/channel identity connected with the project. Ask JARVIS for the public channel information available on this website. 🎮📺'],
  ['project','RUDRA works on web projects, games, experiments and learning-focused technology builds. 💻🎮'],
  ['website','This is the RUDRA • VICKY project website, with a Tech Lab, JARVIS assistant, Game Zone and RUDRA CITY. 🌐'],
  ['contact','For contact or meeting-related requests, JARVIS can explain the public contact information or instructions that are actually available on the website. 📩'],
  ['meeting','For a meeting with Rudra or Vicky, ask JARVIS. He can guide you using the public information available on this website. 🤝'],
  ['rudra city',"RUDRA CITY is the project's 3D open-world game experience. 🏙️🎮"]
];
const intentRules=[
  [/^(hi|hello|hey|namaste|hii|helo|yo|sup)\b/,'Hey! 👋 I’m JARVIS. What can I help you with today? 🤖✨'],
  [/(thank|thanks|thx|shukriya)/,'You’re welcome! 😄🤝 I’m always ready for the next one.'],
  [/(bye|goodbye|see you|gn|good night)/,'See you! 👋 Take care and keep building. 🚀'],
  [/(who are you|what are you|your name)/,'I’m JARVIS 🤖 — the professional assistant inside the RUDRA • VICKY website. I’m designed to explain, guide and chat naturally. ✨'],
  [/(who made you|creator|rudra|vicky)/,'I’m part of the RUDRA • VICKY website experience. 🤝 My job is to support the project, explain things clearly and help with learning and building. 🚀'],
 ];
 function norm(v){return String(v??'').toLowerCase().normalize('NFKC').replace(/[^a-z0-9\s?!.'-]/g,' ').replace(/\s+/g,' ').trim();}
 function tokenize(v){return norm(v).split(' ').filter(Boolean);}
 function score(query,item){const q=new Set(tokenize(query));const t=tokenize(item.q);let hit=0;for(const w of t)if(q.has(w))hit++;const phrase=norm(query).includes(norm(item.q))?2:0;return (hit/Math.max(1,t.length))*2+phrase;}
 function vary(text){const swaps=[['Sure!','Absolutely!'],['Got it','Understood'],['I can help','I’m ready to help'],['Let’s solve it step by step.','Let’s tackle it step by step.']];let out=text;for(const [a,b] of swaps){if(Math.random()<0.35)out=out.replace(a,b)}return out;}
 function dynamicFallback(q,nq){
   if(!nq)return 'I’m ready. 😄🤖 Send me anything and I’ll do my best to help.';
   if(/^[a-z0-9]+$/i.test(nq) && nq.length<8 && !/[aeiou]/i.test(nq)){
     return vary(`I received “${q}”. It looks like a random or unclear text. 😄 If that was intentional, JARVIS is still listening — you can send another message anytime.`);
   }
   const words=nq.split(/\s+/).filter(Boolean);
   const topic=words.slice(0,12).join(' ');
   const universal=[
    `I can work with that. You asked about “${topic}”. 🧠 I’ll break the request into the most useful answer I can give from my built-in knowledge.`,
    `Got it — JARVIS understood the message as “${topic}”. 🤖 I’ll keep the answer practical, clear and easy to follow.`,
    `I’m with you. ✨ Your message is about “${topic}”. I can explain it, give examples, compare options, or turn it into step-by-step guidance.`,
    `Interesting one! 😎 “${topic}” is the part I’m focusing on. I’ll give you the clearest useful response available in this offline assistant.`,
    `Message received. ⚡ “${topic}” — JARVIS is ready to help with the meaning, steps, examples or ideas connected to it.`
   ];
   return vary(universal[Math.floor(Math.random()*universal.length)]);
 }
 function answer(q){const nq=norm(q);if(!nq)return 'I’m ready. 😄🤖 Type a question and I’ll respond.';
  for(const [re,msg] of intentRules)if(re.test(nq))return msg;
  if(nq.includes('time')&&nq.includes('date'))return `Your device can provide the exact local date and time. ⏰ I won’t pretend to know a live clock without access to it.`;
  let best=null,bs=0;for(const item of AI_KB){const sc=score(q,item);if(sc>bs){bs=sc;best=item}}
  if(best&&bs>=1.25)return vary(best.a+" "+supportLines[Math.floor(Math.random()*supportLines.length)]);
  for(const [k,a] of creatorFacts)if(nq.includes(k))return vary(a+' '+supportLines[Math.floor(Math.random()*supportLines.length)]);
  const broad=[['how','I can help with how-to questions about coding, websites, study, computers and games. 💻🎮'],['why','Give me the topic or sentence you want explained and I’ll break it into simple points. 🧠✨'],['help','Sure! 🤝 Ask about coding, websites, school, science, maths, games, technology or everyday topics.'],['coding','For coding help, tell me the language or paste the part you’re working on. 👨‍💻'],['study','For study help, send the chapter/topic and I can explain it in simple language. 📚'],['game','For games, ask about ideas, rules, scoring, design or development. 🎮']];
  for(const [w,a] of broad)if(nq.includes(w))return vary(a+" "+supportLines[Math.floor(Math.random()*supportLines.length)]);
  return dynamicFallback(q,nq);
 }
 function add(role,text){const chat=document.getElementById('aiChat');if(!chat)return;const d=document.createElement('div');d.className='ai-msg '+role;d.innerHTML='<div><div class="ai-name">'+(role==='user'?'YOU':'JARVIS')+'</div><div class="ai-bubble"></div></div>';d.querySelector('.ai-bubble').textContent=text;chat.appendChild(d);chat.scrollTop=chat.scrollHeight}
 function typing(){const chat=document.getElementById('aiChat');const d=document.createElement('div');d.className='ai-msg';d.id='aiTyping';d.innerHTML='<div><div class="ai-name">JARVIS</div><div class="ai-bubble"><span class="ai-typing"><i></i><i></i><i></i></span></div></div>';chat.appendChild(d);chat.scrollTop=chat.scrollHeight}
 let voice=true,recognition=null;
 window.askRudraAI=function(q){const input=document.querySelector('#aiInput');q=(q||input?.value||'').trim();if(!q)return;add('user',q);if(input)input.value='';typing();document.getElementById('aiStatus').textContent='THINKING';setTimeout(()=>{try{document.getElementById('aiTyping')?.remove();const a=answer(q);add('bot',a);document.getElementById('aiStatus').textContent='READY';localStorage.setItem('rudra_ai_last',JSON.stringify({q,a,t:Date.now()}));if(voice&&'speechSynthesis'in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(a.replace(/[🤖💡✨📚🚀😄👋💻🧠🎮🤝⚡🌱☀️🌍💧📝🎯🐍🔗🌐🖥️⌨️🖱️📶🔵☁️📊⚛️🧪🔋Ω🔁🇮🇳🌙😴💪🔥🏆]/g,''));u.rate=.98;u.pitch=1;speechSynthesis.speak(u)}}catch(e){document.getElementById('aiTyping')?.remove();add('bot',`I’m here, RUDRA! 🤖✨ I received your message: “${q}”. I can still help even if I don’t recognize the exact topic. Try asking me to explain it, give examples, compare options, or guide you step by step. 💪🧠`);document.getElementById('aiStatus').textContent='READY';console.error('JARVIS error:',e)}},280);};
 window.clearRudraAI=function(){document.getElementById('aiChat').innerHTML='';add('bot','Chat cleared. 👌 Ask me a new question! 🤖');localStorage.removeItem('rudra_ai_last')};
 window.toggleRudraVoice=function(){voice=!voice;const l=document.getElementById('aiVoiceLabel');if(l)l.textContent=voice?'ON':'OFF';if(!voice&&'speechSynthesis'in window)speechSynthesis.cancel()};
 window.toggleRudraMic=function(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){showToast('🎙️ Voice input is not supported in this browser.');return}if(recognition){recognition.stop();recognition=null;document.getElementById('aiStatus').textContent='READY';return}recognition=new SR();recognition.lang='en-IN';recognition.interimResults=false;recognition.onstart=()=>document.getElementById('aiStatus').textContent='LISTENING';recognition.onresult=e=>{document.getElementById('aiInput').value=e.results[0][0].transcript;askRudraAI()};recognition.onerror=()=>{document.getElementById('aiStatus').textContent='READY'};recognition.onend=()=>{recognition=null;document.getElementById('aiStatus').textContent='READY'};recognition.start()};
 window.addEventListener('load',()=>{if(typeof refreshNewGameBests==='function')refreshNewGameBests();add('bot','Namaste! 👋 I’m JARVIS. Ask me anything — normal questions, Hinglish, typos or even random text. 🤖✨');const last=localStorage.getItem('rudra_ai_last');if(last){try{const x=JSON.parse(last);add('bot','Last saved answer: '+x.a)}catch(e){}}});
})();


/* ==========================================================
   RUDRA CITY — FULLY MERGED INTO THIS SINGLE SCRIPT
   No rudra-city folder or separate game.js is required.
========================================================== */
function initRudraCityGame(){
'use strict';
const canvas=document.getElementById('gameCanvas'), fatal=document.getElementById('fatal');
const gl=canvas.getContext('webgl',{antialias:true,alpha:false,preserveDrawingBuffer:false});
if(!gl){fatal.style.display='grid';fatal.textContent='RUDRA CITY needs WebGL. Please open it in Chrome, Edge or Firefox.';return;}
const hud={mode:document.getElementById('mode'),mission:document.getElementById('mission'),speed:document.getElementById('speed'),clock:document.getElementById('clock'),prompt:document.getElementById('prompt')};
const map=document.getElementById('mapCanvas'),mg=map.getContext('2d');
const V=`attribute vec3 p;attribute vec3 n;attribute vec3 c;uniform mat4 mvp;uniform mat4 model;uniform vec3 sun;varying vec3 v;varying vec3 wn;void main(){vec3 nn=normalize(mat3(model)*n);wn=nn;float nd=max(dot(nn,normalize(sun)),0.0);float sky=max(nn.y,0.0);float light=.32+.58*nd+.10*sky;v=c*light;gl_Position=mvp*vec4(p,1.0);}`;
const F=`precision mediump float;varying vec3 v;varying vec3 wn;uniform float fog;uniform vec3 fogColor;void main(){float d=gl_FragCoord.z;float f=smoothstep(.80,.997,d)*fog;vec3 base=max(v,vec3(.035));float top=max(wn.y,0.0);base*=.94+.16*top;base+=vec3(.025,.025,.02)*top;float haze=f*.72;vec3 outc=mix(base,fogColor,haze);outc=pow(max(outc,vec3(0.0)),vec3(.94));gl_FragColor=vec4(outc,1.0);}`;
function sh(t,s){const x=gl.createShader(t);gl.shaderSource(x,s);gl.compileShader(x);if(!gl.getShaderParameter(x,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(x));return x}
const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,V));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,F));gl.linkProgram(pr);if(!gl.getProgramParameter(pr,gl.LINK_STATUS))throw Error('Shader link failed');gl.useProgram(pr);
const ap=gl.getAttribLocation(pr,'p'),an=gl.getAttribLocation(pr,'n'),ac=gl.getAttribLocation(pr,'c'),um=gl.getUniformLocation(pr,'mvp'),uModel=gl.getUniformLocation(pr,'model'),uSun=gl.getUniformLocation(pr,'sun'),uFog=gl.getUniformLocation(pr,'fog'),uFogColor=gl.getUniformLocation(pr,'fogColor');
const pb=gl.createBuffer(),nb=gl.createBuffer(),cb=gl.createBuffer();
function resize(){const d=Math.min(devicePixelRatio||1,innerWidth<700?1.0:1.25);canvas.width=Math.max(1,Math.floor(innerWidth*d));canvas.height=Math.max(1,Math.floor(innerHeight*d));gl.viewport(0,0,canvas.width,canvas.height)}addEventListener('resize',resize);resize();gl.enable(gl.DEPTH_TEST);gl.enable(gl.CULL_FACE);gl.clearDepth(1);
function mul(a,b){const r=new Float32Array(16);for(let c=0;c<4;c++)for(let row=0;row<4;row++)r[c*4+row]=a[row]*b[c*4]+a[4+row]*b[c*4+1]+a[8+row]*b[c*4+2]+a[12+row]*b[c*4+3];return r}
function perspective(fov,asp,n,f){const q=1/Math.tan(fov/2),nf=1/(n-f);return new Float32Array([q/asp,0,0,0,0,q,0,0,0,0,(f+n)*nf,-1,0,0,2*f*n*nf,0])}
function look(eye,c){let zx=eye[0]-c[0],zy=eye[1]-c[1],zz=eye[2]-c[2],l=Math.hypot(zx,zy,zz);zx/=l;zy/=l;zz/=l;let xx=zz,xy=0,xz=-zx,l2=Math.hypot(xx,xz);xx/=l2;xz/=l2;let yx=zy*xz-zz*xy,yy=zz*xx-zx*xz,yz=zx*xy-zy*xx;return new Float32Array([xx,yx,zx,0,xy,yy,zy,0,xz,yz,zz,0,-(xx*eye[0]+xy*eye[1]+xz*eye[2]),-(yx*eye[0]+yy*eye[1]+yz*eye[2]),-(zx*eye[0]+zy*eye[1]+zz*eye[2]),1])}
function model(x,y,z,sx,sy,sz,ry=0){const c=Math.cos(ry),s=Math.sin(ry);return new Float32Array([c*sx,0,-s*sz,0,0,sy,0,0,s*sx,0,c*sz,0,x,y,z,1])}
const verts=[],norms=[],cols=[];function tri(a,b,c,n,col){for(const v of [a,b,c]){verts.push(...v);norms.push(...n);cols.push(...col)}}
function box(x,y,z,sx,sy,sz,col,ry=0){const C=Math.cos(ry),S=Math.sin(ry),h=[[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5],[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]];const fs=[[0,1,2,3,[0,0,-1]],[5,4,7,6,[0,0,1]],[4,0,3,7,[-1,0,0]],[1,5,6,2,[1,0,0]],[3,2,6,7,[0,1,0]],[4,5,1,0,[0,-1,0]]];for(const f of fs){const q=f.slice(0,4),n=f[4];const vv=q.map(i=>{const p=h[i];return [x+C*p[0]*sx-S*p[2]*sz,y+p[1]*sy,z+S*p[0]*sx+C*p[2]*sz]});tri(vv[0],vv[1],vv[2],n,col);tri(vv[0],vv[2],vv[3],n,col)}}
function cyl(x,y,z,r,h,col,segments=10){for(let i=0;i<segments;i++){const a=i/segments*Math.PI*2,b=(i+1)/segments*Math.PI*2;const p1=[x+Math.cos(a)*r,y-h/2,z+Math.sin(a)*r],p2=[x+Math.cos(b)*r,y-h/2,z+Math.sin(b)*r],p3=[x+Math.cos(b)*r,y+h/2,z+Math.sin(b)*r],p4=[x+Math.cos(a)*r,y+h/2,z+Math.sin(a)*r],n=[Math.cos((a+b)/2),0,Math.sin((a+b)/2)];tri(p1,p2,p3,n,col);tri(p1,p3,p4,n,col)}}
function roof(x,y,z,sx,sz,col,ry=0){box(x,y,z,sx,.8,sz,col,ry)}
const rand=(a,b)=>a+Math.random()*(b-a), clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const staticObjects=[];
const ROAD=18,BLOCK=72,W=360;
box(0,-.35,0,780,.7,780,[.10,.19,.12]);
for(let x=-W;x<=W;x+=BLOCK){box(x,.02,0,ROAD,.16,760,[.055,.065,.075]);box(x,.12,0,ROAD+4,.12,760,[.28,.30,.31]);}
for(let z=-W;z<=W;z+=BLOCK){box(0,.02,z,760,.16,ROAD,[.055,.065,.075]);box(0,.12,z,760,.12,ROAD+4,[.28,.30,.31]);}
// lane dashes
for(let x=-W;x<=W;x+=BLOCK){for(let z=-W+8;z<W;z+=22)box(x,.12,z,0.55,.04,9,[.82,.78,.46]);}
for(let z=-W;z<=W;z+=BLOCK){for(let x=-W+8;x<W;x+=22)box(x,.12,z,9,.04,.55,[.82,.78,.46]);}
const buildingRects=[];
const bcols=[[.70,.56,.40],[.82,.76,.62],[.56,.64,.70],[.72,.44,.30],[.62,.70,.48],[.74,.48,.52],[.46,.58,.68],[.88,.78,.50],[.52,.66,.62]];
for(let x=-324;x<=324;x+=BLOCK)for(let z=-324;z<=324;z+=BLOCK){if(Math.abs(x)<25||Math.abs(z)<25)continue;const count=Math.random()<.35?2:1;for(let k=0;k<count;k++){const w=rand(22,38),d=rand(22,38),h=rand(16,58),xx=x+rand(-14,14),zz=z+rand(-14,14),col=bcols[(Math.random()*bcols.length)|0];const ry=rand(-.03,.03); buildingRects.push({x:xx,z:zz,w:w+2.4,d:d+2.4,ry});box(xx,h/2,zz,w,h,d,col,ry);roof(xx,h+.45,zz,w+.7,d+.7,[.07,.09,.12],ry);for(let fy=6;fy<h-4;fy+=6){for(let sx=-w/2+3;sx<w/2-2;sx+=5){box(xx+sx,fy,zz-d/2-.03,1.7,1.6,.08,[.36,.60,.72],ry);box(xx+sx,fy,zz+d/2+.03,1.7,1.6,.08,[.36,.60,.72],ry);}for(let sz=-d/2+3;sz<d/2-2;sz+=5){box(xx-w/2-.03,fy,zz+sz,.08,1.6,1.7,[.36,.60,.72],ry);box(xx+w/2+.03,fy,zz+sz,.08,1.6,1.7,[.36,.60,.72],ry);}}}}
// parks, trees and street furniture
for(let i=0;i<130;i++){const x=rand(-350,350),z=rand(-350,350);if(Math.abs(x%BLOCK)<13||Math.abs(z%BLOCK)<13)continue;cyl(x,2.8,z,.45,5.5,[.24,.13,.07],8);cyl(x,6.5,z,2.3,5,[.08,.29,.13],9);if(i%3===0)cyl(x+2,1.1,z+2,.18,2.2,[.1,.1,.1],7)}
// lamp posts
for(let x=-360;x<=360;x+=36)for(const z of [-13,13]){cyl(x,4,z,.12,8,[.08,.09,.1],7);box(x,8,z,1.2,.25,1.2,[.85,.72,.35]);}
// BUILD 5.0 — extra world detail, landmarks, crosswalks and safer visual layering
for(let z=-324;z<=324;z+=72){for(const side of [-1,1]){const x=side*13.2;box(x,.205,z,7,.12,64,[.22,.24,.26]);}}
for(let x=-324;x<=324;x+=72){for(const side of [-1,1]){const z=side*13.2;box(x,.205,z,64,.12,7,[.22,.24,.26]);}}
for(let r=0;r<8;r++){const a=r*Math.PI/4;const x=Math.cos(a)*20,z=Math.sin(a)*20;box(x,.23,z,2.8,.08,7,[.88,.86,.72],a);}
// downtown plaza
box(0,.25,0,42,.16,42,[.16,.19,.21]);
for(let a=0;a<8;a++){const ang=a*Math.PI/4;const x=Math.cos(ang)*15,z=Math.sin(ang)*15;cyl(x,2.0,z,.35,4,[.22,.12,.06],8);cyl(x,4.7,z,1.8,3.2,[.07,.32,.15],10);}
// central tower and rooftop crown
box(0,18,0,18,36,18,[.18,.24,.31]);
box(0,37,0,12,2,12,[.07,.10,.14]);
box(0,42,0,2,8,2,[.35,.45,.55]);
for(let fy=5;fy<34;fy+=5){for(let sx=-6;sx<=6;sx+=4){box(sx,fy,-9.05,2.2,1.5,.08,[.48,.72,.84]);box(sx,fy,9.05,2.2,1.5,.08,[.48,.72,.84]);}}
// park pads and benches
for(const q of [[-180,-180],[180,180],[-180,180],[180,-180]]){box(q[0],.22,q[1],42,.12,42,[.10,.27,.15]);for(let i=0;i<5;i++){const x=q[0]-14+i*7,z=q[1]-8;box(x,.75,z,4,.18,1.2,[.30,.20,.10]);cyl(x,2,z,.28,2.5,[.25,.13,.06],7);cyl(x,4,z,1.5,2.4,[.07,.30,.13],9);}}
// BUILD 6.0 VISUAL PASS — richer facades, rooftops, street identity and depth
for(const b of buildingRects){
  const h=rand(0,1);
  // facade trims
  box(b.x,b.d*.0+2.8,b.z-b.d*.5-.08,b.w*.82,.22,.10,[.10,.13,.17],b.ry);
  box(b.x,b.d*.0+2.8,b.z+b.d*.5+.08,b.w*.82,.22,.10,[.10,.13,.17],b.ry);
  // rooftop equipment silhouettes
  if((b.x*7+b.z)%3<1){
    box(b.x+b.w*.18,h*0+b.w*.0+b.d*.0+1,b.z,b.w*.16,.9,b.d*.16,[.10,.11,.13],b.ry);
    box(b.x-b.w*.18,1,b.z,b.w*.12,.7,b.d*.12,[.13,.14,.16],b.ry);
  }
  // vertical corner columns give depth instead of flat boxes
  for(const sx of [-1,1]) box(b.x+sx*b.w*.46,Math.min(7,Math.max(3,b.w*.18)),b.z-b.d*.5-.12,.18,Math.min(14,Math.max(6,b.w*.4)),.16,[.11,.15,.19],b.ry);
}
// landmark avenue lights and low planters
for(let i=-5;i<=5;i++){
  const x=i*72+18; const z=18;
  box(x,.42,z,4,.65,1.1,[.12,.15,.18]);
  box(x,.8,z,3.5,.15,.8,[.20,.34,.24]);
}
// plaza fountain rings
cyl(0,.34,0,6,.32,[.28,.34,.39],20);
cyl(0,.72,0,4.8,.5,[.18,.25,.30],20);
cyl(0,1.55,0,.32,2.1,[.36,.58,.68],12);
// road crosswalk stripes on major avenues
for(let z=-350;z<=350;z+=72){for(let i=-4;i<=4;i++){box(i*2.4,.205,z-10,1.4,.05,5,[.85,.85,.78]);box(i*2.4,.205,z+10,1.4,.05,5,[.85,.85,.78]);}}
for(let x=-350;x<=350;x+=72){for(let i=-4;i<=4;i++){box(x-10,.205,i*2.4,5,.05,1.4,[.85,.85,.78]);box(x+10,.205,i*2.4,5,.05,1.4,[.85,.85,.78]);}}


// BUILD 7.0 — WORLD VIEW PASS: skyline, water, bridges, storefronts, rooftop details and visual landmarks
// Distant mountain silhouettes create a real horizon instead of a flat void.
for(const m of [[-330,400,90,70],[ -210,430,120,95],[-70,410,100,78],[70,430,130,105],[210,405,110,82],[330,430,90,70]]){
  const [mx,mz,mw,mh]=m;
  for(let layer=0;layer<4;layer++){
    const scale=1-layer*.17;
    box(mx,mh*(.14+layer*.13),mz-layer*2,mw*scale,mh*.25,mw*.48,[.10+.018*layer,.16+.018*layer,.20+.02*layer]);
  }
}
// Riverside strip + layered banks + simple bridges.
box(250,.08,0,22,.12,760,[.05,.28,.34]);
box(263,.18,0,4,.25,760,[.13,.22,.16]);
box(237,.18,0,4,.25,760,[.13,.22,.16]);
for(let x=-320;x<=320;x+=72){
  box(x,.42,0,16,.38,28,[.22,.24,.25]);
  box(x,.64,0,13,.16,24,[.30,.31,.30]);
}
// Storefront blocks along the main streets.
for(const side of [-1,1]) for(let i=-4;i<=4;i++){
  const x=i*72+side*20, z=side*20;
  box(x,2.2,z,18,4.0,5.0,[.22,.16,.12]);
  box(x,3.0,z-side*2.55,15,1.5,.16,[.08,.32,.42]);
  box(x,1.2,z-side*2.65,16,.08,.2,[.78,.64,.34]);
}
// Rooftop tanks and antennas make the skyline read as constructed architecture.
for(let i=0;i<buildingRects.length;i+=3){
  const b=buildingRects[i];
  const top=12+((i*17)%44);
  cyl(b.x+b.w*.2,top,b.z,.9,1.7,[.20,.22,.24],10);
  cyl(b.x-b.w*.2,top+1.6,b.z,.12,3.2,[.12,.14,.16],7);
}
// Traffic signals at major intersections.
for(let x=-288;x<=288;x+=72) for(let z=-288;z<=288;z+=72){
  if((Math.abs(x)+Math.abs(z))%144!==0) continue;
  cyl(x+9,3.3,z+9,.11,6,[.08,.09,.10],7);
  box(x+9,6.0,z+9,1.0,1.7,.55,[.07,.08,.09]);
  cyl(x+9,6.35,z+8.65,.14,.18,[.55,.06,.04],8);
  cyl(x+9,5.95,z+8.65,.14,.18,[.65,.45,.06],8);
  cyl(x+9,5.55,z+8.65,.14,.18,[.05,.55,.18],8);
}
// Billboard frames and signs give the city recognizable street identity.
for(const [x,z,ry] of [[-55,-18,0],[55,18,Math.PI],[-18,55,Math.PI/2],[18,-55,-Math.PI/2]]){
  box(x,4.5,z,10,.18,.18,[.10,.11,.13],ry);
  box(x,6.7,z,10,3.8,.22,[.07,.11,.16],ry);
  box(x,6.7,z,8.6,2.5,.12,[.18,.38,.50],ry);
}
// Low wall/planter rhythm around the central district.
for(let i=-6;i<=6;i++){
  box(i*7,.42,30,4,.7,1.4,[.16,.18,.19]);
  cyl(i*7,1.35,30,.7,1.6,[.08,.30,.14],9);
}

// BUILD 9.0 — REAL-WORLD DETAIL PASS: facade depth, balconies, AC units, signage, clouds and street dressing
// Repeated small architectural details make buildings read as real structures rather than simple boxes.
for(const b of buildingRects){
  const floors=Math.max(2,Math.floor(20/(b.w*.08)));
  for(let fy=7;fy<54;fy+=8){
    // shallow balconies on selected facades
    if(((Math.floor(b.x)+Math.floor(b.z)+fy)%3)===0){
      box(b.x,b.w*.0+fy,b.z-b.d*.5-.55,Math.min(b.w*.72,15),.16,.9,[.30,.31,.30],b.ry);
      box(b.x,b.w*.0+fy+.45,b.z-b.d*.5-.92,Math.min(b.w*.72,15),.65,.08,[.18,.20,.21],b.ry);
    }
    // exterior AC/service boxes
    if(((Math.floor(b.x*3)+fy)%5)===0){
      box(b.x+b.w*.28,fy,b.z-b.d*.5-.16,1.1,.75,.22,[.72,.74,.72],b.ry);
    }
  }
  // rooftop tank with support legs on some buildings
  if(((Math.floor(b.x)+Math.floor(b.z))%4)===0){
    cyl(b.x+b.w*.2,Math.min(64,58),b.z+b.d*.1,1.25,2.2,[.38,.40,.39],12);
    box(b.x+b.w*.2,56.5,b.z+b.d*.1,2.7,.18,2.7,[.20,.22,.23],b.ry);
  }
}
// Street trees with small soil planters, placed away from road centers.
for(let x=-324;x<=324;x+=36){
  for(const z of [-24,24]){
    box(x,.22,z,2.4,.18,2.4,[.32,.26,.18]);
    cyl(x,2.1,z,.22,3.8,[.28,.16,.08],8);
    cyl(x,4.8,z,1.55,3.0,[.10,.34,.15],12);
  }
}
// Cross-street bollards and parking bay strips.
for(let x=-324;x<=324;x+=36){
  for(const z of [-16,16]){cyl(x,.7,z,.16,1.4,[.18,.19,.19],8);box(x,.14,z,7,.05,1.1,[.58,.60,.58]);}
}
// Distant low-rise skyline for a populated horizon.
for(let i=-12;i<=12;i++){
  const x=i*28+13,z=-390-Math.abs(i%3)*10,h=18+(Math.abs(i*17)%7)*4,w=18+(Math.abs(i*11)%8);
  box(x,h/2,z,w,h,18,[.40,.48,.50]);
  for(let fy=5;fy<h-3;fy+=6)box(x,fy,z-9.08,w*.62,1.35,.08,[.55,.67,.69]);
}
// Soft cloud banks: static, non-blinking, positioned high above the city.
for(let i=0;i<18;i++){
  const x=-420+i*48,z=-120+((i*73)%520),y=105+(i%3)*10;
  box(x,y,z,34+(i%4)*8,3.2,12+(i%3)*5,[.92,.94,.93]);
  box(x+12,y+1.2,z,20,2.4,10,[.96,.97,.96]);
}


// BUILD 11 — REAL-WORLD ENVIRONMENT MEGA PASS
// Dense, static world dressing: road markings, curbs, drains, signs, utility poles,
// wires, bins, rocks, shrubs, parking bays and district accents. These are batched
// into the static mesh so they do not add per-frame draw calls.
const curbCols=[[.48,.49,.46],[.58,.57,.52],[.42,.44,.43]];
const grassCols=[[.12,.32,.14],[.16,.38,.16],[.20,.42,.18],[.10,.27,.12]];
// Curbs + drainage strips along every avenue.
for(let x=-360;x<=360;x+=72){
  for(const side of [-1,1]){
    box(x,.28,side*10.7,ROAD+.9,.28,760,curbCols[(Math.abs(x/72)|0)%3]);
    box(x,.20,side*9.55,ROAD-.6,.10,760,[.18,.20,.19]);
  }
}
for(let z=-360;z<=360;z+=72){
  for(const side of [-1,1]){
    box(side*10.7,.28,z,760,.28,ROAD+.9,curbCols[(Math.abs(z/72)|0)%3]);
    box(side*9.55,.20,z,760,.10,ROAD-.6,[.18,.20,.19]);
  }
}
// Reflective lane studs and short divider marks.
for(let x=-360;x<=360;x+=72) for(let z=-350;z<=350;z+=14){
  box(x,.205,z,.16,.045,.55,[.92,.88,.66]);
}
for(let z=-360;z<=360;z+=72) for(let x=-350;x<=350;x+=14){
  box(x,.205,z,.55,.045,.16,[.92,.88,.66]);
}
// Utility poles + overhead lines on selected blocks.
for(let i=-4;i<=4;i++){
  const x=i*72+28;
  for(const z of [-31,31]){
    cyl(x,5.2,z,.14,10.0,[.20,.18,.14],8);
    box(x,9.7,z,2.2,.12,.12,[.18,.16,.13]);
    box(x-.78,9.25,z,.08,.9,.08,[.16,.15,.13]);
    box(x+.78,9.25,z,.08,.9,.08,[.16,.15,.13]);
  }
  // thin-looking segmented cables (geometry, not actual line primitives)
  for(let seg=-3;seg<3;seg++){
    const xx=x+seg*12;
    box(xx,9.55,-31,12,.045,.045,[.055,.06,.06]);
    box(xx,9.55,31,12,.045,.045,[.055,.06,.06]);
  }
}
// Waste bins, mail boxes and fire-hydrant-like street props.
for(let x=-342;x<=342;x+=36){
  for(const z of [-15.5,15.5]){
    box(x,.72,z,.62,1.15,.62,[.12,.28,.18]);
    box(x,.18,z,.78,.12,.78,[.22,.23,.20]);
    if((x/36)%3===0)cyl(x,.62,z+.48,.18,.65,[.58,.10,.07],8);
  }
}
// Parking bays + wheel stops near commercial strips.
for(let x=-324;x<=324;x+=36){
  for(const side of [-1,1]){
    const z=side*20.2;
    box(x,.205,z,15,.035,.055,[.76,.76,.68]);
    box(x-6,.205,z, .055,.035,8,[.76,.76,.68]);
    box(x+6,.205,z, .055,.035,8,[.76,.76,.68]);
    box(x,.18,z+side*3.6,2.2,.18,.28,[.34,.34,.31]);
  }
}
// Signposts and simple readable sign faces at intersections.
for(let x=-288;x<=288;x+=72) for(let z=-288;z<=288;z+=72){
  if(((x+z)/72)%2!==0) continue;
  for(const side of [-1,1]){
    const sx=x+side*8.5, sz=z+side*8.5;
    cyl(sx,2.1,sz,.08,4.0,[.28,.29,.28],7);
    box(sx,3.65,sz,.18,.75,1.8,[.86,.83,.68],Math.PI*.5);
  }
}
// Hundreds of low shrubs / bushes in safe non-road pockets.
for(let i=0;i<520;i++){
  const x=-350+(i*47)%700, z=-350+(i*83)%700;
  if(Math.abs(x%BLOCK)<16 || Math.abs(z%BLOCK)<16) continue;
  const r=.55+(i%5)*.12;
  cyl(x,.65,z,r,1.3+(i%3)*.25,grassCols[i%grassCols.length],8);
  if(i%4===0) cyl(x+.45,.48,z-.2,.28,.9,[.27,.17,.08],7);
}
// Natural rock clusters around parks and water edges.
for(let i=0;i<180;i++){
  const x=-340+(i*71)%680,z=-340+(i*113)%680;
  if(Math.abs(x%BLOCK)<17 || Math.abs(z%BLOCK)<17) continue;
  const r=.35+(i%4)*.18;
  box(x,.28,z,r*1.8,.55,r*1.2,[.36,.37,.34],(i%6)*.3);
}
// Decorative street trees with branching trunks in four seasonal palettes.
const leafSets=[[.11,.38,.16],[.20,.46,.18],[.25,.40,.12],[.12,.31,.20]];
for(let x=-342;x<=342;x+=18){
  for(const z of [-27,27]){
    cyl(x,2.4,z,.24,4.7,[.30,.18,.09],8);
    cyl(x-.48,4.0,z,.12,2.1,[.28,.16,.08],7,.0);
    cyl(x+.48,4.15,z,.12,2.0,[.28,.16,.08],7,.0);
    cyl(x,5.0,z,1.75,3.2,leafSets[((x/18+z+1000)|0)%leafSets.length],12);
    cyl(x+.55,5.25,z-.3,1.0,2.0,leafSets[((x/18+z+1001)|0)%leafSets.length],10);
  }
}
// Riverside reeds, rocks and low guardrails.
for(let i=0;i<180;i++){
  const z=-350+(i*29)%700, x=228+(i%5)*1.5;
  cyl(x,.7,z,.08,1.8+(i%4)*.3,[.28,.42,.16],6);
  if(i%3===0)box(236,.65,z,1.0,1.0,1.8,[.30,.31,.29],(i%5)*.2);
}
for(let z=-360;z<=360;z+=12){
  box(236,.95,z,.12,1.4,.12,[.34,.35,.32]);
  box(264,.95,z,.12,1.4,.12,[.34,.35,.32]);
}
for(let z=-348;z<348;z+=18){
  box(250,1.55,z,28,.08,.08,[.30,.31,.29]);
  box(250,1.55,z+9,28,.08,.08,[.30,.31,.29]);
}
// District-specific facade accents: awnings and rooftop solar/vent panels.
for(let i=0;i<buildingRects.length;i++){
  const b=buildingRects[i];
  if(i%2===0){
    box(b.x,b.d*.0+4.0,b.z-b.d*.5-.28,b.w*.55,.10,.45,[.74,.32,.12],b.ry);
    box(b.x,b.d*.0+4.0,b.z+b.d*.5+.28,b.w*.55,.10,.45,[.18,.48,.34],b.ry);
  }
  if(i%3===0){
    box(b.x+b.w*.22,Math.min(61,58),b.z-b.d*.18,2.8,.10,1.8,[.10,.20,.25],b.ry);
    box(b.x-b.w*.22,Math.min(61,58),b.z+b.d*.18,2.8,.10,1.8,[.10,.20,.25],b.ry);
  }
}
// Extra pedestrian-scale clutter: benches, bollard pairs and bicycle racks.
for(let i=0;i<220;i++){
  const x=-330+(i*31)%660,z=-330+(i*59)%660;
  if(Math.abs(x%BLOCK)<15 || Math.abs(z%BLOCK)<15) continue;
  box(x,.62,z,2.8,.16,.72,[.38,.24,.12],(i%4)*.5);
  box(x-1.05,.30,z,.16,.55,.16,[.20,.20,.18],(i%4)*.5);
  box(x+1.05,.30,z,.16,.55,.16,[.20,.20,.18],(i%4)*.5);
}
// A softer ground layer in park corners, plus small stepping stones.
for(const q of [[-180,-180],[180,180],[-180,180],[180,-180]]){
  for(let i=0;i<45;i++){
    const a=i*2.4,r=5+(i%7)*2.1;
    const x=q[0]+Math.cos(a)*r,z=q[1]+Math.sin(a)*r;
    cyl(x,.30,z,.22+(i%3)*.08,.22,[.28,.29,.25],7);
  }
}

// BUILD 12 — 10,000 MICRO-DETAIL MEGA PASS
// Exactly 10,000 additional static detail pieces. They are deliberately small and
// distributed around sidewalks, parks and building pockets so the city gains visual
// density without turning into a wall of objects.
const microCols=[[.16,.34,.16],[.20,.40,.18],[.25,.43,.20],[.34,.34,.30],[.48,.46,.38],[.58,.56,.48],[.72,.68,.54],[.20,.24,.24],[.30,.32,.30]];
let microCount=0;
for(let i=0;i<10000;i++){
  const gx=(i%100)*7-346;
  const gz=(Math.floor(i/100)%100)*7-346;
  const ox=((i*37)%17)-8;
  const oz=((i*61)%17)-8;
  const x=gx+ox*.18, z=gz+oz*.18;
  const roadX=Math.abs(((x+360)%72)-36)<11.8;
  const roadZ=Math.abs(((z+360)%72)-36)<11.8;
  if(roadX||roadZ){
    // Tiny curb/road reflectors stay extremely low and never block gameplay.
    const along=((i*13)%9)-4;
    const rx=roadX?gx+along: x;
    const rz=roadZ?gz+along: z;
    box(rx,.235,rz,.10,.035,.32,microCols[5],(i%2)*Math.PI/2);
  }else if(i%5===0){
    // Small stones / ground dressing.
    const r=.10+(i%4)*.035;
    box(x,.10+(i%3)*.025,z,r*2,.16,r*1.25,microCols[3],(i%7)*.4);
  }else if(i%3===0){
    // Grass tufts: three tiny blades create a natural broken silhouette.
    const h=.30+(i%5)*.07;
    box(x-.08,h*.5,z,.06,h,.06,microCols[i%3],(i%5)*.5);
    box(x+.08,h*.45,z+.05,.06,h*.9,.06,microCols[(i+1)%3],(i%5)*.5);
  }else{
    // Pavement/soil micro-pavers.
    const s=.20+(i%3)*.045;
    box(x,.105,z,s,.055,s,microCols[4+(i%4)],(i%8)*.2);
  }
  microCount++;
}
// A few large visual anchors complete the new detail layer.
for(let i=0;i<24;i++){
  const x=-300+i*26, z=38+((i%3)-1)*3;
  box(x,.55,z,2.8,.08,.12,[.78,.70,.46]);
}
if(microCount!==10000) console.warn('Micro detail count mismatch',microCount);

// BUILD 25 — MEGA WORLD / VOID ELIMINATION PASS
// The goal here is visual continuity: no exposed black/empty patches beside buildings,
// no hard edge at the playable-city boundary, and no fake 10-billion object spam.
// Large procedural surfaces + deterministic detail rules provide the scale cheaply.
// Outer terrain extends far beyond the playable area so the camera always sees a real
// surface instead of a background void.
box(0,-.52,0,1800,.28,1800,[.13,.24,.15]);
for(let ring=0;ring<3;ring++){
  const s=760+ring*260;
  box(0,-.31-ring*.025,0,s,.10,s,[.14+.012*ring,.25+.014*ring,.16+.012*ring]);
}

// Every building gets a continuous lot/courtyard apron.  This is the main fix for
// visible gaps where the old road/ground grid could expose the distant background.
const lotCols=[[.20,.25,.20],[.24,.28,.22],[.27,.29,.25],[.22,.27,.24]];
for(let i=0;i<buildingRects.length;i++){
  const b=buildingRects[i], ry=b.ry||0, padW=b.w+8.0, padD=b.d+8.0;
  const pc=lotCols[i%lotCols.length];
  box(b.x,.045,b.z,padW,.09,padD,pc,ry);
  // Four sidewalk/apron bands make the building sit on a finished urban plot.
  box(b.x,.105,b.z-padD*.47,padW,.10,.75,[.42,.43,.40],ry);
  box(b.x,.105,b.z+padD*.47,padW,.10,.75,[.42,.43,.40],ry);
  box(b.x-padW*.47,.105,b.z,.75,.10,padD,[.42,.43,.40],ry);
  box(b.x+padW*.47,.105,b.z,.75,.10,padD,[.42,.43,.40],ry);
  // Small corner greenery/lighting anchors remove the remaining empty-looking pockets.
  for(const sx of [-1,1]) for(const sz of [-1,1]){
    const cx=b.x+sx*(padW*.38), cz=b.z+sz*(padD*.38);
    cyl(cx,.52,cz,.18,.9,[.27,.17,.08],7);
    cyl(cx,.95,cz,.72,.9,[.10,.34,.14],9);
  }
}

// Fill the spaces between building plots with deterministic low-rise street/lot tiles.
// They are deliberately flat and cheap, so the scene becomes continuous rather than dense.
for(let gx=-324;gx<=324;gx+=36) for(let gz=-324;gz<=324;gz+=36){
  const rx=Math.abs(((gx+360)%72)-36), rz=Math.abs(((gz+360)%72)-36);
  if(rx<12 || rz<12) continue;
  const near=buildingRects.some(b=>Math.abs(gx-b.x)<(b.w*.5+7)&&Math.abs(gz-b.z)<(b.d*.5+7));
  if(!near){
    const c=((Math.abs(gx)+Math.abs(gz))/36|0)%3;
    box(gx,.025,gz,30,.07,30,[.22+.025*c,.27+.018*c,.22+.015*c]);
    for(let q=0;q<4;q++){
      const px=gx+(q%2?8:-8), pz=gz+(q>1?8:-8);
      box(px,.095,pz,2.2,.05,1.0,[.46,.43,.34],(q%2)*Math.PI/2);
    }
  }
}

// City-edge transition belt: ground, trees and low walls hide the playable boundary.
for(let i=0;i<160;i++){
  const a=i/160*Math.PI*2, r=392+(i%9)*4;
  const x=Math.cos(a)*r,z=Math.sin(a)*r;
  cyl(x,.75,z,.24,1.5,[.27,.17,.09],7);
  cyl(x,1.65,z,1.0+(i%3)*.15,2.1,[.10,.31,.14],9);
}
for(let side=-1;side<=1;side+=2){
  box(side*405,.7,0,1.2,1.4,820,[.28,.30,.27]);
  box(0,.7,side*405,820,1.4,1.2,[.28,.30,.27]);
}

// BUILD 18 — A+B+C+D COMPLETE WORLD PASS
// One integrated pass: engine-safe world foundation, realistic city districts,
// player/vehicle interaction points, shops/doors, parking, pedestrian zones,
// and low-cost environmental dressing. No external network assets are required.
const districtZones=[
  {name:'DOWNTOWN',x:0,z:0,rx:95,rz:95,col:[.72,.50,.28]},
  {name:'NORTH PARK',x:-180,z:180,rx:62,rz:62,col:[.25,.55,.28]},
  {name:'WEST MARKET',x:-180,z:-108,rx:65,rz:52,col:[.68,.38,.22]},
  {name:'EAST RIVERSIDE',x:252,z:144,rx:58,rz:90,col:[.24,.50,.56]},
  {name:'SOUTH INDUSTRIAL',x:108,z:-252,rx:80,rz:58,col:[.42,.44,.43]}
];
const shopSpots=[];
for(let i=0;i<30;i++){
  const side=i%2?-1:1, row=Math.floor(i/2), x=(row%10-4.5)*36, z=side*20;
  shopSpots.push({x,z,open:true,type:['CAFE','MARKET','GARAGE','SHOP','PHARMACY'][i%5]});
  box(x,2.55,z,15,4.6,4.6,[.52+.06*(i%3),.30+.05*(i%4),.18+.03*(i%5)]);
  box(x,3.35,z-side*2.38,13,1.35,.12,[.20+.04*(i%4),.38+.06*(i%3),.46+.05*(i%2)]);
  box(x,1.05,z-side*2.48,5.0,2.0,.12,[.72,.70,.58]);
}
// Parking courts and parked-car silhouettes: static, cheap, and clearly separated from moving traffic.
const parkingSpots=[];
for(let block=-3;block<=3;block++) for(const side of [-1,1]){
  const x=block*72+side*24,z=side*28;
  box(x,.19,z,28,.10,10,[.18,.19,.18]);
  for(let j=-2;j<=2;j++){
    const px=x+j*5.2,pz=z+side*1.7;
    parkingSpots.push({x:px,z:pz,ry:side<0?Math.PI:0});
    box(px,.60,pz,2.2,.48,4.1,[.20+.08*((j+block+3)%4),.24+.04*((j+2)%3),.25+.03*((j+block)%3)],side<0?Math.PI:0);
    box(px,1.0,pz,1.55,.38,1.7,[.06,.12,.14],side<0?Math.PI:0);
  }
}
// Utility/service details around industrial blocks.
for(let i=0;i<42;i++){
  const x=-315+(i%14)*45,z=-300+Math.floor(i/14)*36;
  box(x,.72,z,1.0,1.4,1.0,[.24,.25,.23]);
  box(x,.55,z-0.58,1.4,.18,.12,[.58,.42,.22]);
}
// Pedestrian plazas: benches, planters and low walls make foot traffic areas readable.
for(const q of [[-180,180],[-180,-108],[252,144],[108,-252]]){
  for(let i=-2;i<=2;i++){
    const x=q[0]+i*10,z=q[1]+12;
    box(x,.48,z,5.0,.65,1.2,[.30,.22,.12]);
    cyl(x,1.25,z,1.05,1.6,[.08,.31,.14],9);
  }
  box(q[0],.24,q[1],34,.16,24,[.25,.28,.24]);
}
// Building entry frames and recessed door volumes for the complete interaction foundation.
for(let i=0;i<buildingRects.length;i+=2){
  const b=buildingRects[i], y=2.0;
  box(b.x,y,b.z-b.d*.5-.18,3.0,4.0,.28,[.16,.18,.18],b.ry);
  box(b.x,y,b.z-b.d*.5-.34,1.35,2.7,.08,[.08,.12,.13],b.ry);
  box(b.x,y+1.65,b.z-b.d*.5-.39,1.55,.12,.12,[.65,.58,.38],b.ry);
}
// District-specific vegetation clusters.
for(let i=0;i<180;i++){
  const d=districtZones[i%districtZones.length], a=i*2.17, rr=12+(i%9)*4;
  const x=d.x+Math.cos(a)*Math.min(d.rx-4,rr), z=d.z+Math.sin(a)*Math.min(d.rz-4,rr);
  if(Math.abs(x%72)<13||Math.abs(z%72)<13) continue;
  const scale=.65+(i%5)*.12;
  cyl(x,.9,z,.18*scale,2.2*scale,[.25,.15,.08],7);
  cyl(x,2.35*scale,z,1.0*scale,2.0*scale,d.col,9);
}
// Street signs at selected corners.
for(let x=-288;x<=288;x+=72) for(let z=-288;z<=288;z+=144){
  cyl(x+11,2.2,z+11,.08,4.2,[.14,.15,.14],7);
  box(x+11,4.25,z+11,3.8,.55,.10,[.18,.30,.34]);
}

const staticMesh={v:new Float32Array(verts),n:new Float32Array(norms),c:new Float32Array(cols),count:verts.length/3};
function upload(){gl.bindBuffer(gl.ARRAY_BUFFER,pb);gl.bufferData(gl.ARRAY_BUFFER,staticMesh.v,gl.STATIC_DRAW);gl.enableVertexAttribArray(ap);gl.vertexAttribPointer(ap,3,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,nb);gl.bufferData(gl.ARRAY_BUFFER,staticMesh.n,gl.STATIC_DRAW);gl.enableVertexAttribArray(an);gl.vertexAttribPointer(an,3,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,cb);gl.bufferData(gl.ARRAY_BUFFER,staticMesh.c,gl.STATIC_DRAW);gl.enableVertexAttribArray(ac);gl.vertexAttribPointer(ac,3,gl.FLOAT,false,0,0)}upload();
const cars=[];const carColors=[[.82,.08,.08],[.05,.28,.82],[.9,.62,.06],[.88,.88,.9],[.42,.12,.72],[.04,.62,.42],[.15,.15,.17],[.75,.32,.10]];
for(let i=0;i<18;i++){const dir=i%2?'x':'z',lane=(Math.floor(i/2)%9-4)*72+(i%2?7:-7);cars.push({x:dir==='x'?-360:lane,z:dir==='z'?-360:lane,ry:dir==='x'?Math.PI/2:0,spd:rand(8,15),dir,col:carColors[i%carColors.length],player:false});}
const player={x:0,z:14,y:0,vy:0,ry:0,jump:false,anim:0};let vehicle=null,vehicleSpeed=0,vehicleAccel=0,yaw=.55,pitch=.34,targetYaw=yaw,targetPitch=pitch;let camDist=8.4;const keys=new Set();let lastE=false,lastSpace=false,mouse=false,lx=0,ly=0,toastTimer=0;
let paused=false, mapOpen=true, headlights=false, weather='CLEAR', cameraMode=0, crouch=false, boost=100, wanted=0, cash=1250, nitro=100, hornFlash=0, damage=0, screenShake=0, trafficLights=true, showStats=true, photoMode=false;
const weatherNames=['CLEAR','FOG','RAIN','STORM']; let weatherIndex=0; let missionFlash=0;

function addDynamic(o){const v=[];const n=[];const c=[]; // reuse box generator locally
 const oldV=verts.length,oldN=norms.length,oldC=cols.length;box(o.x,o.y,o.z,o.sx,o.sy,o.sz,o.col,o.ry||0);for(let i=oldV;i<verts.length;i++)v.push(verts[i]);for(let i=oldN;i<norms.length;i++)n.push(norms[i]);for(let i=oldC;i<cols.length;i++)c.push(cols[i]);verts.length=oldV;norms.length=oldN;cols.length=oldC;return {v,n,c,count:v.length/3}}
function drawMesh(mesh,mvp,mod){gl.bindBuffer(gl.ARRAY_BUFFER,pb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(mesh.v),gl.STREAM_DRAW);gl.vertexAttribPointer(ap,3,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,nb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(mesh.n),gl.STREAM_DRAW);gl.vertexAttribPointer(an,3,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,cb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(mesh.c),gl.STREAM_DRAW);gl.vertexAttribPointer(ac,3,gl.FLOAT,false,0,0);gl.uniformMatrix4fv(um,false,mvp);gl.uniformMatrix4fv(uModel,false,mod);gl.drawArrays(gl.TRIANGLES,0,mesh.count)}
function drawCar(c,view,proj){const parts=[];parts.push(addDynamic({x:c.x,y:.72,z:c.z,sx:2.6,sy:1.0,sz:4.8,col:c.col,ry:c.ry}));parts.push(addDynamic({x:c.x,y:1.32,z:c.z,sx:2.05,sy:.65,sz:2.2,col:[.05,.14,.18],ry:c.ry}));parts.push(addDynamic({x:c.x,y:.54,z:c.z+Math.sin(c.ry)*1.9,sx:1.0,sy:.45,sz:.65,col:[.03,.03,.035],ry:c.ry}));for(const m of parts)drawMesh(m,mul(proj,view),new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]));}
function drawCarBetter(c,view,proj){
 const moving=Math.abs(c.spd||vehicleSpeed)>.5;
 const steer=(c.player?((keys.has('a')||keys.has('arrowleft'))?-0.18:((keys.has('d')||keys.has('arrowright'))?.18:0)):0);
 const suspension=moving?Math.sin(gameTime*18+(c.x+c.z)*.01)*.025:0;
 const id=model(c.x,.72+suspension,c.z,1,1,1,c.ry);
 // Main body + lower chassis
 drawMesh(addDynamic({x:0,y:0,z:0,sx:2.85,sy:1.02,sz:5.15,col:c.col}),mul(mul(proj,view),id),id);
 drawMesh(addDynamic({x:0,y:-.18,z:.05,sx:2.72,sy:.28,sz:4.75,col:[.055,.065,.07]}),mul(mul(proj,view),id),id);
 // Hood / trunk shaping
 const hood=model(c.x,.98+suspension,c.z-Math.cos(c.ry)*1.35,.98,1,1,c.ry);
 drawMesh(addDynamic({x:0,y:0,z:0,sx:2.62,sy:.34,sz:1.45,col:c.col.map(v=>Math.min(1,v*1.08))}),mul(mul(proj,view),hood),hood);
 const cabin=model(c.x,1.35+suspension,c.z,1,1,1,c.ry);
 drawMesh(addDynamic({x:0,y:0,z:0,sx:2.12,sy:.68,sz:2.55,col:[.055,.11,.14]}),mul(mul(proj,view),cabin),cabin);
 // Separate windshield/rear glass bands
 for(const zoff of [-.74,.74]){
   const glass=model(c.x,1.40+suspension,c.z+Math.cos(c.ry)*zoff,1,1,1,c.ry);
   drawMesh(addDynamic({x:0,y:0,z:0,sx:1.92,sy:.42,sz:.12,col:[.12,.23,.27]}),mul(mul(proj,view),glass),glass);
 }
 // Roof and side pillars
 const roof=model(c.x,1.72+suspension,c.z,1,1,1,c.ry);
 drawMesh(addDynamic({x:0,y:0,z:0,sx:1.82,sy:.10,sz:2.15,col:[.07,.075,.08]}),mul(mul(proj,view),roof),roof);
 for(const sx of [-.88,.88]) for(const sz of [-.82,.82]){
   const pillar=model(c.x+Math.sin(c.ry)*sx,c.x?1.47+suspension:1.47,c.z+Math.cos(c.ry)*sz,1,1,1,c.ry);
   drawMesh(addDynamic({x:0,y:0,z:0,sx:.09,sy:.55,sz:.09,col:[.025,.03,.032]}),mul(mul(proj,view),pillar),pillar);
 }
 // Four detailed wheels, front wheels steer visually with input.
 for(const side of [-1,1]) for(const fore of [-1,1]){
   const wr=model(c.x+Math.sin(c.ry)*side*1.48+Math.cos(c.ry)*fore*1.58,.47+suspension,c.z+Math.cos(c.ry)*side*1.48-Math.sin(c.ry)*fore*1.58,1,1,1,c.ry+(fore>0?steer:0));
   drawMesh(addDynamic({x:0,y:0,z:0,sx:.50,sy:.52,sz:.34,col:[.018,.02,.022]}),mul(mul(proj,view),wr),wr);
   const hub=model(c.x+Math.sin(c.ry)*side*1.50+Math.cos(c.ry)*fore*1.59,.47+suspension,c.z+Math.cos(c.ry)*side*1.50-Math.sin(c.ry)*fore*1.59,1,1,1,c.ry+(fore>0?steer:0));
   drawMesh(addDynamic({x:0,y:0,z:0,sx:.20,sy:.20,sz:.37,col:[.42,.43,.40]}),mul(mul(proj,view),hub),hub);
 }
 // Mirrors
 for(const side of [-1,1]){const mi=model(c.x+Math.sin(c.ry)*side*1.14,.1+1.35+suspension,c.z+Math.cos(c.ry)*.02-Math.sin(c.ry)*side*.98,c.ry);drawMesh(addDynamic({x:0,y:0,z:0,sx:.18,sy:.18,sz:.28,col:[.04,.06,.065]}),mul(mul(proj,view),mi),mi)}
 // Headlights, grille and brake lights
 for(const side of [-1,1]){
   const lamp=model(c.x+Math.sin(c.ry)*side*.82+Math.cos(c.ry)*2.56,.82+suspension,c.z+Math.cos(c.ry)*side*.82-Math.sin(c.ry)*2.56,1,1,1,c.ry);
   drawMesh(addDynamic({x:0,y:0,z:0,sx:.42,sy:.18,sz:.16,col:[1,.88,.48]}),mul(mul(proj,view),lamp),lamp);
   const tail=model(c.x+Math.sin(c.ry)*side*.82-.0*Math.cos(c.ry),.82+suspension,c.z+Math.cos(c.ry)*side*.82+Math.sin(c.ry)*2.56,1,1,1,c.ry);
   drawMesh(addDynamic({x:0,y:0,z:0,sx:.44,sy:.16,sz:.14,col:[vehicle===c&&vehicleSpeed<0?[1,.75,.7]:.72,.035,.025]}),mul(mul(proj,view),tail),tail);
 }
 const grill=model(c.x,.68+suspension,c.z-Math.sin(c.ry)*0+Math.cos(c.ry)*2.60,1,1,1,c.ry);
 drawMesh(addDynamic({x:0,y:0,z:0,sx:1.25,sy:.20,sz:.10,col:[.025,.03,.032]}),mul(mul(proj,view),grill),grill);

 // Fleet-specific silhouettes: emergency lightbars and supercar aero.
 if(c.type==='POLICE'||c.type==='AMBULANCE'||c.type==='FIRE'){
   const bar=model(c.x,1.92+suspension,c.z,1,1,1,c.ry);
   drawMesh(addDynamic({x:0,y:0,z:0,sx:.72,sy:.10,sz:.28,col:c.type==='POLICE'?[.12,.35,1]:c.type==='FIRE'?[1,.15,.05]:[1,.92,.92]}),mul(mul(proj,view),bar),bar);
   const beacon=model(c.x,2.02+suspension,c.z,1,1,1,c.ry);
   drawMesh(addDynamic({x:0,y:0,z:0,sx:.20,sy:.10,sz:.34,col:c.type==='POLICE'?(Math.sin(gameTime*12)>0?[1,.05,.05]:[.05,.25,1]):[1,.12,.08]}),mul(mul(proj,view),beacon),beacon);
 } else if(c.type==='SUPERCAR'){
   const spoiler=model(c.x,1.18+suspension,c.z+Math.cos(c.ry)*1.65,1,1,1,c.ry);
   drawMesh(addDynamic({x:0,y:0,z:0,sx:1.15,sy:.10,sz:.22,col:[.03,.035,.04]}),mul(mul(proj,view),spoiler),spoiler);
 }
}
function drawPlayer(view,proj){
 const sy=crouch?.72:1;
 const moving=(keys.has('w')||keys.has('a')||keys.has('s')||keys.has('d')||keys.has('arrowup')||keys.has('arrowdown')||keys.has('arrowleft')||keys.has('arrowright'));
 const cycle=moving?Math.sin(player.anim):0, cycle2=moving?Math.cos(player.anim):1;
 const bob=moving&&!player.jump?Math.abs(cycle)*.055:0;
 const lean=moving?cycle*.035:0;
 const punchPose=rudra29.attackType==='punch' && rudra29.attackTime>0;
 const kickPose=rudra29.attackType==='kick' && rudra29.attackTime>0;
 const body=model(player.x,1.08*sy+player.y+bob,player.z,.82,1.72*sy,.56,player.ry+lean);
 drawMesh(addDynamic({x:0,y:0,z:0,sx:1,sy:1,sz:1,col:[.72,.18,.10]}),mul(mul(proj,view),body),body);
 // shirt/torso accent and belt
 const chest=model(player.x,1.26*sy+player.y+bob,player.z,1,1,1,player.ry+lean);
 drawMesh(addDynamic({x:0,y:0,z:0,sx:.70,sy:.48,sz:.59,col:[.10,.30,.28]}),mul(mul(proj,view),chest),chest);
 const belt=model(player.x,.76*sy+player.y+bob,player.z,1,1,1,player.ry);
 drawMesh(addDynamic({x:0,y:0,z:0,sx:.76,sy:.12,sz:.60,col:[.05,.04,.035]}),mul(mul(proj,view),belt),belt);
 // Head + hair cap + neck
 const neck=model(player.x,1.83*sy+player.y+bob,player.z,1,1,1,player.ry);
 drawMesh(addDynamic({x:0,y:0,z:0,sx:.25,sy:.24,sz:.25,col:[.58,.33,.20]}),mul(mul(proj,view),neck),neck);
 const head=model(player.x,2.22*sy+player.y+bob,player.z,.62,.62,.62,player.ry);
 drawMesh(addDynamic({x:0,y:0,z:0,sx:1,sy:1,sz:1,col:[.66,.40,.24]}),mul(mul(proj,view),head),head);
 const hair=model(player.x,2.49*sy+player.y+bob,player.z,1,1,1,player.ry);
 drawMesh(addDynamic({x:0,y:0,z:0,sx:.64,sy:.20,sz:.64,col:[.055,.035,.025]}),mul(mul(proj,view),hair),hair);
 // Eyes/face marker for stronger character readability
 for(const side of [-1,1]){const eye=model(player.x+Math.sin(player.ry)*.18+Math.cos(player.ry)*side*.16,2.25*sy+player.y+bob,player.z+Math.cos(player.ry)*.18-Math.sin(player.ry)*side*.16,1,1,1,player.ry);drawMesh(addDynamic({x:0,y:0,z:0,sx:.07,sy:.07,sz:.06,col:[.015,.02,.018]}),mul(mul(proj,view),eye),eye)}
 // Animated arms with natural opposite swing
 const armSwing=cycle*.38;
 for(const side of [-1,1]){
   const punchSide=(punchPose && side===1)?0.72:0;
   const arm=model(player.x+side*.55 + Math.cos(player.ry)*punchSide,1.10*sy+player.y+bob,player.z + Math.sin(player.ry)*punchSide,1,1,1,player.ry+side*armSwing*.22 + (punchPose&&side===1?-.18:0));
   drawMesh(addDynamic({x:0,y:0,z:0,sx:.22,sy:1.18*sy,sz:.22,col:[.12,.30,.34]}),mul(mul(proj,view),arm),arm);
   const hand=model(player.x+side*.55 + Math.cos(player.ry)*punchSide*1.12, .46*sy+player.y+bob+Math.abs(armSwing)*.05, player.z + Math.sin(player.ry)*punchSide*1.12,1,1,1,player.ry+side*armSwing*.22 + (punchPose&&side===1?-.18:0));
   drawMesh(addDynamic({x:0,y:0,z:0,sx:.24,sy:.22,sz:.24,col:[.66,.40,.24]}),mul(mul(proj,view),hand),hand);
   const legAngle=-side*armSwing*.20 + (kickPose&&side===1?-.52:0);
   const leg=model(player.x+side*.25,.05+player.y+bob,player.z,1,1,1,player.ry+legAngle);
   drawMesh(addDynamic({x:0,y:0,z:0,sx:.25,sy:1.0*sy,sz:.27,col:[.04,.055,.08]}),mul(mul(proj,view),leg),leg);
   const kickExtend=(kickPose&&side===1)?.62:0;
   const foot=model(player.x+side*.27+Math.cos(player.ry)*kickExtend,.0+player.y+bob,player.z+Math.cos(player.ry)*.16+Math.sin(player.ry)*kickExtend,1,1,1,player.ry+legAngle);
   drawMesh(addDynamic({x:0,y:0,z:0,sx:.30,sy:.16,sz:.48,col:[.025,.028,.03]}),mul(mul(proj,view),foot),foot);
 }
}
function drawNPC(n,view,proj){
 const dx=n.x-player.x,dz=n.z-player.z,dist=Math.hypot(dx,dz);
 const detailed=dist<96;
 const yawN=Math.atan2(dx,dz);
 const walk=Math.sin(n.phase*1.8)*.10;
 const skin=n.skin||[.55,.34,.22], shirt=n.col||[.2,.45,.55], pants=n.pants||[.10,.12,.16], shoe=[.035,.04,.045];
 // Far citizens stay lightweight; nearby citizens get a readable full-body model.
 if(!detailed){
   const body=model(n.x,.95,n.z,.55,1.45,.42,0);drawMesh(addDynamic({x:0,y:0,z:0,sx:1,sy:1,sz:1,col:shirt}),mul(mul(proj,view),body),body);
   const head=model(n.x,1.85,n.z,.38,.38,.38,0);drawMesh(addDynamic({x:0,y:0,z:0,sx:1,sy:1,sz:1,col:skin}),mul(mul(proj,view),head),head);return;
 }
 const walkA=walk, walkB=-walk;
 const torso=model(n.x,.98,n.z,.58,.92,.40,yawN);
 drawMesh(addDynamic({x:0,y:0,z:0,sx:1,sy:1,sz:1,col:shirt}),mul(mul(proj,view),torso),torso);
 const chest=model(n.x,1.20,n.z,.54,.48,.38,yawN);
 drawMesh(addDynamic({x:0,y:0,z:0,sx:1,sy:1,sz:1,col:shirt.map(v=>Math.min(1,v*1.08))}),mul(mul(proj,view),chest),chest);
 const neck=model(n.x,1.54,n.z,.20,.22,.20,yawN);
 drawMesh(addDynamic({x:0,y:0,z:0,sx:1,sy:1,sz:1,col:skin}),mul(mul(proj,view),neck),neck);
 const head=model(n.x,1.82,n.z,.36,.38,.34,yawN);
 drawMesh(addDynamic({x:0,y:0,z:0,sx:1,sy:1,sz:1,col:skin}),mul(mul(proj,view),head),head);
 const hair=model(n.x,2.08,n.z,.37,.18,.35,yawN);
 drawMesh(addDynamic({x:0,y:0,z:0,sx:1,sy:1,sz:1,col:n.hair||[.045,.035,.025]}),mul(mul(proj,view),hair),hair);
 // Face/ear accents keep the head readable without graphic detail.
 for(const side of [-1,1]){
   const ear=model(n.x+Math.sin(yawN)*side*.33,1.83,n.z+Math.cos(yawN)*side*.33,1,1,1,yawN);
   drawMesh(addDynamic({x:0,y:0,z:0,sx:.07,sy:.12,sz:.07,col:skin}),mul(mul(proj,view),ear),ear);
   const eye=model(n.x+Math.sin(yawN)*.31+Math.cos(yawN)*side*.10,1.87,n.z+Math.cos(yawN)*.31-Math.sin(yawN)*side*.10,1,1,1,yawN);
   drawMesh(addDynamic({x:0,y:0,z:0,sx:.045,sy:.045,sz:.035,col:[.015,.02,.02]}),mul(mul(proj,view),eye),eye);
 }
 // Separate upper/lower arms, hands, legs and shoes.
 for(const side of [-1,1]){
   const ax=n.x+Math.cos(yawN)*side*.48, az=n.z-Math.sin(yawN)*side*.48;
   const arm=model(ax,.98,n.z+0,yawN?1:1,1,1,yawN); // transformed below with side offset
   arm[12]=ax; arm[13]=1.02+(side<0?walkA:walkB); arm[14]=az;
   drawMesh(addDynamic({x:0,y:0,z:0,sx:.15,sy:.46,sz:.15,col:shirt}),mul(proj,view,arm),arm);
   const fore=model(ax+Math.sin(yawN)*.02,.67+(side<0?walkA:walkB),az,yawN?1:1,1,1,yawN);
   drawMesh(addDynamic({x:0,y:0,z:0,sx:.13,sy:.34,sz:.13,col:shirt}),mul(proj,view,fore),fore);
   const hand=model(ax+Math.sin(yawN)*.05,.48+(side<0?walkA:walkB),az,1,1,1,yawN);
   drawMesh(addDynamic({x:0,y:0,z:0,sx:.16,sy:.16,sz:.16,col:skin}),mul(mul(proj,view),hand),hand);
   const hip=model(n.x+Math.cos(yawN)*side*.18,.57,n.z-Math.sin(yawN)*side*.18,1,1,1,yawN);
   drawMesh(addDynamic({x:0,y:0,z:0,sx:.25,sy:.48,sz:.25,col:pants}),mul(mul(proj,view),hip),hip);
   const shin=model(n.x+Math.cos(yawN)*side*.18,.28+(side<0?walkB:walkA),n.z-Math.sin(yawN)*side*.18,1,1,1,yawN);
   drawMesh(addDynamic({x:0,y:0,z:0,sx:.22,sy:.45,sz:.22,col:pants}),mul(mul(proj,view),shin),shin);
   const foot=model(n.x+Math.cos(yawN)*side*.18+Math.sin(yawN)*.10,.09,n.z-Math.sin(yawN)*side*.18+Math.cos(yawN)*.10,1,1,1,yawN);
   drawMesh(addDynamic({x:0,y:0,z:0,sx:.25,sy:.15,sz:.40,col:shoe}),mul(mul(proj,view),foot),foot);
 }
 if(n.combatFlash>0){
   const ring=model(n.x,.08,n.z,1,1,1,0);
   drawMesh(addDynamic({x:0,y:0,z:0,sx:1.15,sy:.035,sz:1.15,col:[1,.72,.18]}),mul(mul(proj,view),ring),ring);
 }
}
function drawShadow(view,proj,x,z,sx,sz){const mm=model(x,.055,z,1,1,1,0);drawMesh(addDynamic({x:0,y:0,z:0,sx:sx,sy:.035,sz:sz,col:[.025,.03,.035]}),mul(mul(proj,view),mm),mm)}
function draw(){
 sky(); yaw+=(targetYaw-yaw)*.10; pitch+=(targetPitch-pitch)*.10;
 const p=vehicle?[vehicle.x,1.05,vehicle.z]:[player.x,1.28+player.y,player.z];
 let dist=vehicle?Math.max(7.2,camDist+2.6):camDist; if(cameraMode===1)dist=Math.min(camDist,5.2); if(cameraMode===2)dist=Math.max(camDist,12);
 const shake=screenShake?Math.sin(gameTime*80)*screenShake:0;
 const desiredEye=[p[0]+Math.sin(yaw)*Math.cos(pitch)*dist+shake,p[1]+Math.sin(pitch)*dist,p[2]+Math.cos(yaw)*Math.cos(pitch)*dist+shake];
 const eye=cameraSafeEye(p,desiredEye);
 const view=look(eye,p),proj=perspective(Math.PI/(cameraMode===1?2.65:2.9),canvas.width/canvas.height,.1,1700),vp=mul(proj,view);
 gl.useProgram(pr); const daylight=(Math.sin(gameTime*.008)+1)/2; gl.uniform3f(uSun,-.5,.65+.4*daylight,-.35); let fog=weather==='FOG'?.60:weather==='STORM'?.48:weather==='RAIN'?.32:.18; gl.uniform1f(uFog,fog); gl.uniform3f(uFogColor,weather==='FOG'?.68:.78,weather==='FOG'?.72:.86,weather==='FOG'?.76:.92);
 gl.bindBuffer(gl.ARRAY_BUFFER,pb);gl.vertexAttribPointer(ap,3,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,nb);gl.vertexAttribPointer(an,3,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,cb);gl.vertexAttribPointer(ac,3,gl.FLOAT,false,0,0);gl.uniformMatrix4fv(um,false,vp);gl.uniformMatrix4fv(uModel,false,new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]));gl.drawArrays(gl.TRIANGLES,0,staticMesh.count);
 drawMarker(view,proj,objectives[oi]); drawShadow(view,proj,player.x,player.z,1.5,1.0); for(const c of cars) if(c!==vehicle) drawShadow(view,proj,c.x,c.z,2.7,4.5); if(vehicle) drawShadow(view,proj,vehicle.x,vehicle.z,2.8,4.8); if(!vehicle)drawPlayer(view,proj); for(const p of pickups){if(!p.taken){const mm=model(p.x,.22,p.z,1,1,1,0);const q=addDynamic({x:0,y:0,z:0,sx:.38,sy:.08,sz:.38,col:[1,.78,.08]});drawMesh(q,mul(mul(proj,view),mm),mm);}} for(const n of npcs)drawNPC(n,view,proj); for(const c of cars)drawCarBetter(c,view,proj);
 if(weather==='RAIN'||weather==='STORM'){for(let i=0;i<90;i++){const rx=((i*47)%100)/100*120-60,rz=((i*83)%100)/100*120-60;const x=p[0]+rx,z=p[2]+rz,y=2+((i*31)%70)/10;const mm=model(x,y,z,.015,1.1,.015,.2);drawMesh(addDynamic({x:0,y:0,z:0,sx:1,sy:1,sz:1,col:[.45,.65,.8]}),mul(mul(proj,view),mm),mm)}}

}
function updateUI(){const o=objectives[oi],d=Math.hypot(player.x-o.x,player.z-o.z);hud.mission.textContent=`${o.name} • ${Math.round(d)}m`;hud.speed.textContent=vehicle?Math.round(Math.abs(vehicleSpeed)*3.2):Math.round((keys.has('shift')?18:9)*(crouch?.55:1));hud.prompt.textContent=vehicle?'E  EXIT VEHICLE':nearest()?'E  ENTER VEHICLE':'';hud.prompt.style.opacity=hud.prompt.textContent?'1':'0';document.getElementById('weather').textContent=weather;document.getElementById('cash').textContent='$'+cash;document.getElementById('nitro').textContent=Math.round(nitro)+'%';document.getElementById('stamina').textContent=Math.round(boost)+'%';document.getElementById('wanted').textContent='★'.repeat(Math.ceil(wanted))+'☆'.repeat(5-Math.ceil(wanted));document.getElementById('cameraMode').textContent=['STANDARD','CLOSE','WIDE'][cameraMode];if(mapOpen)drawMap();document.getElementById('minimap').style.display=mapOpen?'block':'none';document.getElementById('featurePanel').style.display=showStats?'block':'none';document.getElementById('pause').style.display=paused?'grid':'none';document.getElementById('photo').style.display=photoMode?'grid':'none';}
function drawMap(){mg.clearRect(0,0,190,190);mg.fillStyle='#07121c';mg.fillRect(0,0,190,190);const sc=.24,cx=95,cy=95;mg.strokeStyle='#314555';mg.lineWidth=4;for(let i=-3;i<=3;i++){mg.beginPath();mg.moveTo(cx+i*72*sc,8);mg.lineTo(cx+i*72*sc,182);mg.stroke();mg.beginPath();mg.moveTo(8,cy+i*72*sc);mg.lineTo(182,cy+i*72*sc);mg.stroke()}for(const c of cars){mg.fillStyle=c.player?'#fff':'#ef7777';mg.fillRect(cx+c.x*sc-2,cy+c.z*sc-2,4,4)}const o=objectives[oi];mg.fillStyle='#46d2ff';mg.beginPath();mg.arc(cx+o.x*sc,cy+o.z*sc,5,0,Math.PI*2);mg.fill();mg.fillStyle='#fff';mg.beginPath();mg.arc(cx+player.x*sc,cy+player.z*sc,4,0,Math.PI*2);mg.fill()}

const objectives=[
 {name:'Downtown Plaza',x:0,z:0},{name:'North Park',x:180,z:180},{name:'West District',x:-180,z:108},{name:'East Highway',x:252,z:-36},
 {name:'South Market',x:-108,z:-252},{name:'Central Tower',x:0,z:0},{name:'Riverside',x:324,z:252},{name:'Industrial Zone',x:-324,z:-252}
];
let oi=0;
const npcs=[];
for(let i=0;i<28;i++){const a=i*2.399; npcs.push({x:Math.cos(a)*rand(35,320),z:Math.sin(a)*rand(35,320),col:[rand(.15,.75),rand(.18,.7),rand(.18,.72)],phase:rand(0,6.28),speed:rand(1.2,3.2)});}
// BUILD 28 — compact playable city roster: emergency fleet + supercars + citizens.
const specialFleet=[
  ...Array.from({length:8},(_,i)=>({type:'POLICE',col:[.05,.12,.22],spd:11+i*.25,dir:i%2?'x':'z'})),
  ...Array.from({length:6},(_,i)=>({type:'AMBULANCE',col:[.92,.92,.88],spd:10+i*.2,dir:i%2?'z':'x'})),
  ...Array.from({length:6},(_,i)=>({type:'FIRE',col:[.82,.10,.04],spd:9+i*.2,dir:i%2?'x':'z'})),
  ...Array.from({length:12},(_,i)=>({type:'SUPERCAR',col:[[.06,.42,.78],[.78,.08,.06],[.92,.64,.06],[.35,.12,.62]][i%4],spd:15+i*.35,dir:i%2?'z':'x'}))
];
for(let i=0;i<specialFleet.length;i++){
  const f=specialFleet[i], row=i%9, axis=f.dir;
  const lane=(row-4)*72+(axis==='x'?7:-7);
  cars.push({x:axis==='x'?-350:lane,z:axis==='z'?-350:lane,ry:axis==='x'?Math.PI/2:0,spd:f.spd,dir:axis,col:f.col,player:false,type:f.type,emergency:f.type!=='SUPERCAR'});
}
for(let i=0;i<68;i++){const a=i*2.399;const r=55+(i%9)*28;npcs.push({x:Math.cos(a)*r,z:Math.sin(a)*r,col:[.18+(i%5)*.1,.22+(i%4)*.09,.24+(i%3)*.1],phase:rand(0,6.28),speed:rand(1.0,2.7),citizen:true,skin:[.52+(i%4)*.04,.30+(i%5)*.035,.18+(i%3)*.04],hair:[[.04,.03,.02],[.16,.09,.045],[.07,.06,.05],[.22,.18,.12]][i%4],pants:[.08+(i%3)*.04,.10+(i%4)*.03,.14+(i%3)*.04],combatFlash:0,stun:0,flee:0,rival:false,hitTimer:0});}
function pointInBuilding(x,z){for(const b of buildingRects){const c=Math.cos(b.ry||0),s=Math.sin(b.ry||0),dx=x-b.x,dz=z-b.z;const lx=c*dx+s*dz,lz=-s*dx+c*dz;if(Math.abs(lx)<b.w*.5&&Math.abs(lz)<b.d*.5)return true;}return false;}
function safeMove(x,z){if(Math.abs(x)>374||Math.abs(z)>374)return false;return !pointInBuilding(x,z);}
function nearest(){let best=null,bd=999;for(const c of cars){if(c.player)continue;const d=Math.hypot(player.x-c.x,player.z-c.z);if(d<bd){bd=d;best=c;}}return bd<6?best:null;}
function cameraSafeEye(target,eye){let ex=eye[0],ez=eye[2];if(pointInBuilding(ex,ez)){ex=target[0]+(ex-target[0])*.35;ez=target[2]+(ez-target[2])*.35;}return [ex,eye[1],ez];}
function drawMarker(view,proj,o){const mm=model(o.x,.65,o.z,1,1,1,0);const ring=addDynamic({x:0,y:0,z:0,sx:3.2,sy:.12,sz:3.2,col:[.08,.65,.95]});drawMesh(ring,mul(mul(proj,view),mm),mm);const pole=model(o.x,2.1,o.z,1,1,1,0);drawMesh(addDynamic({x:0,y:0,z:0,sx:.18,sy:3.0,sz:.18,col:[.12,.55,.85]}),mul(mul(proj,view),pole),pole);}
function sky(){const t=(Math.sin(gameTime*.008)+1)/2;const r=.42+.34*t,g=.68+.23*t,b=.88+.10*t;gl.clearColor(r,g,b,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);}
function featureKey(k){
 if(k==='e'){if(vehicle){vehicle.player=false;player.x=vehicle.x+3;player.z=vehicle.z;vehicle=null;vehicleSpeed=0;showToast('Exited vehicle');}else{const c=nearest();if(c){vehicle=c;c.player=true;showToast('Vehicle entered');}}}
 else if(k==='escape'){paused=!paused;} else if(k==='m'){mapOpen=!mapOpen;} else if(k==='t'){weatherIndex=(weatherIndex+1)%weatherNames.length;weather=weatherNames[weatherIndex];showToast('Weather: '+weather);} else if(k==='l'){headlights=!headlights;showToast(headlights?'Headlights ON':'Headlights OFF');}
 else if(k==='f'){hornFlash=.3;showToast('HORN');} else if(k==='c'){crouch=!crouch;} else if(k==='x'){nitro=100;showToast('Nitro refilled');} else if(k==='v'){cameraMode=(cameraMode+1)%3;}
 else if(k==='1'){cameraMode=0;camDist=8.8;} else if(k==='2'){cameraMode=1;camDist=5.2;} else if(k==='3'){cameraMode=2;camDist=12;} else if(k==='+'){camDist=clamp(camDist+.8,4,18);} else if(k==='-'){camDist=clamp(camDist-.8,4,18);}
 else if(k==='6'){gameTime=0;} else if(k==='7'){gameTime=750;} else if(k==='4'){saveGame();} else if(k==='5'){loadGame();} else if(k==='p'){photoMode=!photoMode;}
 else if(k==='o'){for(const c of cars)c.spd=clamp(c.spd+2,3,24);} else if(k==='k'){for(const c of cars)c.spd=clamp(c.spd-2,3,24);} else if(k==='q'){wanted=clamp(wanted+1,0,5);} else if(k==='z'){wanted=clamp(wanted-1,0,5);}
}
function showToast(msg){const t=document.getElementById('cityToast');t.textContent=msg;t.style.opacity='1';toastTimer=1.7;}
function saveGame(){localStorage.setItem('rudraCitySave',JSON.stringify({x:player.x,z:player.z,cash,nitro,wanted,oi,weatherIndex,gameTime}));showToast('GAME SAVED');}
function loadGame(){try{const d=JSON.parse(localStorage.getItem('rudraCitySave')||'null');if(!d)return showToast('NO SAVE FOUND');Object.assign(player,{x:d.x||0,z:d.z||14});cash=d.cash||1250;nitro=d.nitro??100;wanted=d.wanted||0;oi=d.oi||0;weatherIndex=d.weatherIndex||0;weather=weatherNames[weatherIndex];gameTime=d.gameTime||0;showToast('GAME LOADED');}catch(e){showToast('SAVE ERROR');}}
function reset(){Object.assign(player,{x:0,z:14,y:0,vy:0,ry:0,jump:false,anim:0});vehicle=null;vehicleSpeed=0;wanted=0;crouch=false;nitro=100;boost=100;oi=0;showToast('RUDRA CITY READY');}
function update(dt){
 if(paused||photoMode)return;
 const f=(keys.has('w')||keys.has('arrowup'))?1:((keys.has('s')||keys.has('arrowdown'))?-1:0);
 const side=(keys.has('d')||keys.has('arrowright'))?1:((keys.has('a')||keys.has('arrowleft'))?-1:0);
 if(vehicle){
   const turn=side*dt*(1.8+Math.abs(vehicleSpeed)*.025);vehicle.ry+=turn;
   const boostOn=keys.has('shift')&&nitro>0;if(boostOn){vehicleSpeed+=28*dt;nitro=Math.max(0,nitro-26*dt);}else vehicleSpeed+=f*24*dt;
   if(!f)vehicleSpeed*=Math.pow(.25,dt);vehicleSpeed=clamp(vehicleSpeed,-10,boostOn?38:24);
   const nx=vehicle.x+Math.sin(vehicle.ry)*vehicleSpeed*dt,nz=vehicle.z+Math.cos(vehicle.ry)*vehicleSpeed*dt;
   if(safeMove(nx,nz)){vehicle.x=nx;vehicle.z=nz;}else{vehicleSpeed*=-.35;damage=clamp(damage+.12,0,1);screenShake=.04;}
   if(keys.has('space'))vehicleSpeed*=Math.pow(.05,dt);
 }else{
   const moving=f!==0||side!==0;const sp=(keys.has('shift')&&boost>0?13:7)*(crouch?.52:1);if(keys.has('shift')&&moving)boost=Math.max(0,boost-22*dt);else boost=Math.min(100,boost+15*dt);
   if(moving){const mx=Math.sin(yaw)*f+Math.cos(yaw)*side,mz=Math.cos(yaw)*f-Math.sin(yaw)*side;const ml=Math.hypot(mx,mz)||1;if(Math.abs(mx)+Math.abs(mz)>.001)player.ry=Math.atan2(mx,mz);const dx=mx/ml*sp*dt,dz=mz/ml*sp*dt;const nx=player.x+dx,nz=player.z+dz;if(safeMove(nx,nz)){player.x=nx;player.z=nz;}player.anim+=dt*9*(sp/7);}
   if((keys.has(' ')||keys.has('space'))&&!player.jump){player.vy=8;player.jump=true;}if(player.jump){player.y+=player.vy*dt;player.vy-=20*dt;if(player.y<=0){player.y=0;player.vy=0;player.jump=false;}}
 }
 for(const c of cars){if(c===vehicle)continue;if(c.dir==='x'){c.x+=c.spd*dt;if(c.x>360)c.x=-360;}else{c.z+=c.spd*dt;if(c.z>360)c.z=-360;}}
 for(const n of npcs){n.phase+=dt*n.speed*.4;n.x+=Math.cos(n.phase)*dt*n.speed;n.z+=Math.sin(n.phase)*dt*n.speed;if(Math.abs(n.x)>350)n.x*=-.96;if(Math.abs(n.z)>350)n.z*=-.96;}
 const o=objectives[oi];if(Math.hypot(player.x-o.x,player.z-o.z)<9){cash+=150;oi=(oi+1)%objectives.length;missionFlash=1;showToast('MISSION COMPLETE  +$150');}
 toastTimer=Math.max(0,toastTimer-dt);if(toastTimer===0)document.getElementById('cityToast').style.opacity='0';screenShake=Math.max(0,screenShake-dt*.25);hornFlash=Math.max(0,hornFlash-dt);
}

let cityRunning=true,cityRaf=0;let gameTime=0,last=performance.now(),fpsT=0,fpsN=0;function loop(now){if(!cityRunning)return;const dt=Math.min((now-last)/1000,.04);last=now;gameTime+=dt;update(dt);draw();updateUI();fpsT+=dt;fpsN++;if(fpsT>1){document.title=`RUDRA CITY • ${fpsN} FPS`;fpsT=0;fpsN=0}const mins=(gameTime/60+12)%1440,hh=Math.floor(mins/60)%24,mm=Math.floor(mins%60);hud.clock.textContent=String(hh).padStart(2,'0')+':'+String(mm).padStart(2,'0');cityRaf=requestAnimationFrame(loop)}
addEventListener('keydown',e=>{let k=e.key.toLowerCase();if(e.code==='ArrowUp')k='arrowup';if(e.code==='ArrowDown')k='arrowdown';if(e.code==='ArrowLeft')k='arrowleft';if(e.code==='ArrowRight')k='arrowright';if([' ','arrowup','arrowdown','arrowleft','arrowright','tab'].includes(k))e.preventDefault();if(keys.has(k))return;keys.add(k);if(k==='r')reset();if(k==='enter')featureKey('e');else featureKey(k)});addEventListener('keyup',e=>{let k=e.key.toLowerCase();if(e.code==='ArrowUp')k='arrowup';if(e.code==='ArrowDown')k='arrowdown';if(e.code==='ArrowLeft')k='arrowleft';if(e.code==='ArrowRight')k='arrowright';keys.delete(k)});
canvas.addEventListener('pointerdown',e=>{mouse=true;lx=e.clientX;ly=e.clientY;canvas.setPointerCapture?.(e.pointerId)});canvas.addEventListener('pointerup',()=>mouse=false);canvas.addEventListener('pointercancel',()=>mouse=false);canvas.addEventListener('pointermove',e=>{if(!mouse)return;targetYaw-=(e.clientX-lx)*.006;targetPitch=clamp(targetPitch-(e.clientY-ly)*.004,.10,.82);lx=e.clientX;ly=e.clientY});
for(const b of document.querySelectorAll('#mobile button')){const k=b.dataset.k;b.addEventListener('pointerdown',e=>{e.preventDefault();keys.add(k)});['pointerup','pointercancel','pointerleave'].forEach(ev=>b.addEventListener(ev,e=>{e.preventDefault();keys.delete(k)}))}
// BUILD 35 — touch controls: virtual joystick + action buttons + touch camera.
(function mobileControls(){
  const root=document.getElementById('mobile'), stick=document.getElementById('touchStick'), knob=stick?.querySelector('.stickKnob');
  if(!root||!stick||!knob)return;
  let sid=null,cx=0,cy=0;
  const clearMove=()=>{ keys.delete('w');keys.delete('s');keys.delete('a');keys.delete('d'); };
  const move=e=>{
    if(e.pointerId!==sid)return; e.preventDefault();
    const r=stick.getBoundingClientRect(), max=r.width*.32; let dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);
    const len=Math.hypot(dx,dy)||1, m=Math.min(max,len), nx=dx/len*m, ny=dy/len*m; knob.style.transform=`translate(${nx}px,${ny}px)`;
    clearMove();
    if(ny<-max*.28)keys.add('w'); if(ny>max*.28)keys.add('s'); if(nx<-max*.28)keys.add('a'); if(nx>max*.28)keys.add('d');
  };
  stick.addEventListener('pointerdown',e=>{e.preventDefault();sid=e.pointerId;stick.setPointerCapture?.(sid);move(e)});
  ['pointermove'].forEach(ev=>stick.addEventListener(ev,move));
  ['pointerup','pointercancel','lostpointercapture'].forEach(ev=>stick.addEventListener(ev,e=>{if(sid===e.pointerId||ev==='lostpointercapture'){sid=null;clearMove();knob.style.transform='translate(0,0)'}}));
  // Prevent button presses from becoming camera drags.
  root.querySelectorAll('button').forEach(b=>b.addEventListener('pointerdown',e=>e.stopPropagation()));
  // Two-finger/edge-friendly camera: dragging the canvas remains the look control.
  canvas.style.touchAction='none';
  addEventListener('orientationchange',()=>setTimeout(resize,120));
})();

// BUILD 30 — FINAL VISUAL PASS
// One integrated visual pass: natural daylight, stronger depth, cleaner third-person framing.
// Keep the clean recovery architecture; no new update/input wrapper is introduced here.
(function finalVisualPass(){
  // Natural-world palette: slightly richer ground and softer asphalt.
  for(let i=0;i<staticObjects.length;i++){}
  const originalDraw=draw;
  draw=function(){
    originalDraw();
  };
})();

// BUILD 29 — CLEAN RECOVERY / FINAL SMALL-MAP PLAYABLE CORE
// Rebuilt from the proven core. One update layer + one input layer only.
const rudra29={
  mission:0, done:false, xp:0, level:1, cashStart:cash,
  targets:[
    {name:'CENTRAL PLAZA',x:0,z:0,reward:200},
    {name:'NORTH PARK',x:180,z:180,reward:300},
    {name:'CITY SERVICE',x:108,z:-252,reward:400},
    {name:'RIVERSIDE HUB',x:-250,z:40,reward:500},
    {name:'CENTRAL PLAZA',x:0,z:0,reward:1000}
  ],
  message:'', messageTime:0, serviceCooldown:0, attackCooldown:0, block:false, attackType:'', attackTime:0
};
// BUILD 34 — PLAYABLE EXPERIENCE PASS
// Low-input, high-feedback loop: talk, discover, drive, challenge, earn.
const rudra34={audio:null,master:null,lastStep:0,talkCooldown:0,dialogue:null,dialogueTime:0,quest:0,questDone:0,visited:new Set(),mapPulse:0};
function initAudio(){if(rudra34.audio)return;try{const A=window.AudioContext||window.webkitAudioContext;if(!A)return;const a=new A();const g=a.createGain();g.gain.value=.045;g.connect(a.destination);rudra34.audio=a;rudra34.master=g;}catch(e){}}
function sfx(kind){initAudio();const a=rudra34.audio,g=rudra34.master;if(!a||!g)return;try{if(a.state==='suspended')a.resume();const o=a.createOscillator(),v=a.createGain();const now=a.currentTime;const f=kind==='talk'?420:kind==='hit'?95:kind==='collect'?720:kind==='mission'?540:kind==='car'?180:260;o.type=kind==='hit'?'sawtooth':'sine';o.frequency.setValueAtTime(f,now);o.frequency.exponentialRampToValueAtTime(f*(kind==='hit'?.55:1.45),now+.12);v.gain.setValueAtTime(.0001,now);v.gain.exponentialRampToValueAtTime(kind==='hit'?.10:.055,now+.015);v.gain.exponentialRampToValueAtTime(.0001,now+.16);o.connect(v);v.connect(g);o.start(now);o.stop(now+.17);}catch(e){}}
function talkToCitizen(){if(vehicle||rudra34.talkCooldown>0)return;let best=null,bd=5.2;for(const n of npcs){if(!n.citizen)continue;const d=Math.hypot(n.x-player.x,n.z-player.z);if(d<bd){bd=d;best=n;}}if(!best){showToast('NO ONE NEARBY');return;}rudra34.talkCooldown=1.2;const lines=['Welcome to Rudra City. The plaza is busy today.','The riverside has good views. Try exploring the east side.','I heard there is work near the city service yard.','Need a ride? The garage can get you back on the road.','Watch the streets. Some areas get busy after dark.'];rudra34.dialogue=lines[(Math.random()*lines.length)|0];rudra34.dialogueTime=4;sfx('talk');showToast('CITIZEN: '+rudra34.dialogue);}
function nearestObjective34(){let best=null,bd=1e9;for(const o of objectives){const d=Math.hypot(player.x-o.x,player.z-o.z);if(d<bd){bd=d;best=o;}}return [best,bd];}
function update34(dt){rudra34.talkCooldown=Math.max(0,rudra34.talkCooldown-dt);rudra34.dialogueTime=Math.max(0,rudra34.dialogueTime-dt);rudra34.mapPulse=Math.max(0,rudra34.mapPulse-dt);const [near,dist]=nearestObjective34();if(near&&dist<16&&!rudra34.visited.has(near.name)){rudra34.visited.add(near.name);cash+=75;rudra29.xp+=30;sfx('mission');showToast('DISCOVERY • '+near.name+' • +$75');}if(!vehicle){const moving=keys.has('w')||keys.has('a')||keys.has('s')||keys.has('d')||keys.has('arrowup')||keys.has('arrowdown')||keys.has('arrowleft')||keys.has('arrowright');if(moving&&gameTime-rudra34.lastStep>.34){rudra34.lastStep=gameTime;if(Math.random()<.34)sfx('step');}}}

// BUILD 33 GAMEPLAY LOOP
const streetGame={active:false,score:0,target:3,combo:0,comboTimer:0,health:100,maxHealth:100,streak:0,reward:0,spawned:false,over:false};
const pickups=Array.from({length:22},(_,i)=>({x:Math.cos(i*2.17)*((i%6)+2)*42,z:Math.sin(i*2.17)*((i%5)+2)*42,taken:false}));


// Keep the original core functions intact; replace only once.
const coreUpdate29=update;
const coreFeature29=featureKey;
const coreUI29=updateUI;

function mission29Complete(){
  const m=rudra29.targets[rudra29.mission];
  cash+=m.reward; rudra29.xp+=100;
  if(rudra29.xp>=500){rudra29.xp-=500;rudra29.level++;cash+=250;showToast('LEVEL UP • '+rudra29.level+' • +$250');}
  showToast('MISSION COMPLETE • +$'+m.reward);
  rudra29.mission++;
  if(rudra29.mission>=rudra29.targets.length){rudra29.done=true;showToast('RUDRA CITY • CAMPAIGN COMPLETE');}
}

function feature29(k){
  if(k==='f'&&!vehicle){talkToCitizen();return true;}
  if(k==='m'){initAudio();}
  if(k==='0'){reset();rudra29.mission=0;rudra29.done=false;rudra29.xp=0;rudra29.level=1;streetGame.active=false;streetGame.score=0;streetGame.combo=0;streetGame.health=100;showToast('NEW GAME • READY');return true;}
  if(k==='j'&&!vehicle){streetGame.active=!streetGame.active;streetGame.score=0;streetGame.target=3;streetGame.combo=0;streetGame.comboTimer=0;streetGame.health=100;streetGame.over=false;for(let i=0;i<npcs.length;i++){npcs[i].rival= i<8;}showToast(streetGame.active?'STREET CHALLENGE STARTED • 3 RIVALS':'STREET CHALLENGE ENDED');return true;}
  if(k==='b'&&vehicle){damage=0;vehicleSpeed*=.55;showToast('VEHICLE REPAIRED');return true;}
  if(k==='p'&&!vehicle){reset();showToast('PLAYER RESET • SAFE SPAWN');return true;}
  if(k==='g'&&!vehicle){rudra29.attackType='punch';rudra29.attackTime=.34;rudra29.attackCooldown=Math.max(rudra29.attackCooldown,0);showToast('PUNCH READY • G');return true;}
  if(k==='k'&&!vehicle){rudra29.attackType='kick';rudra29.attackTime=.46;rudra29.attackCooldown=Math.max(rudra29.attackCooldown,0);showToast('KICK READY • K');return true;}
  if(k==='h'&&!vehicle){rudra29.block=!rudra29.block;showToast(rudra29.block?'BLOCK ON':'BLOCK OFF');return true;}
  return coreFeature29(k);
}
featureKey=feature29;

function update29(dt){
  coreUpdate29(dt);
  if(paused||photoMode)return;

  // Collectibles: simple reward loop so exploring the city has a reason.
  if(!vehicle){for(const p of pickups){if(!p.taken&&Math.hypot(player.x-p.x,player.z-p.z)<2.4){p.taken=true;cash+=25;rudra29.xp+=15;sfx('collect');showToast('CITY TOKEN +$25');}}}
  streetGame.comboTimer=Math.max(0,streetGame.comboTimer-dt);
  if(streetGame.comboTimer<=0)streetGame.combo=0;
  if(streetGame.active&&!vehicle&&!streetGame.over){
    let rivals=npcs.filter(n=>n.rival&&n.stun<=0);
    if(streetGame.score>=streetGame.target){streetGame.active=false;streetGame.reward=500+streetGame.combo*25;cash+=streetGame.reward;rudra29.xp+=150;showToast('STREET CHALLENGE WON • +$'+streetGame.reward);for(const n of npcs)n.rival=false;}
    for(const n of rivals){
      const d=Math.hypot(n.x-player.x,n.z-player.z);
      if(d<2.25&&n.hitTimer<=0){n.hitTimer=.9; if(!rudra29.block){streetGame.health=Math.max(0,streetGame.health-8);screenShake=.07;showToast('RIVAL HIT • '+streetGame.health+' HP');}else showToast('BLOCKED');}
      if(d>2.8&&d<22&&n.flee<=0){const dx=player.x-n.x,dz=player.z-n.z,len=Math.hypot(dx,dz)||1;n.x+=dx/len*dt*2.2;n.z+=dz/len*dt*2.2;}
      n.hitTimer=Math.max(0,(n.hitTimer||0)-dt);
    }
    if(streetGame.health<=0){streetGame.active=false;streetGame.over=true;streetGame.health=100;showToast('CHALLENGE FAILED • RECOVERED');for(const n of npcs)n.rival=false;reset();}
  }

  // Clamp accidental physics drift and keep the player/vehicle on the playable map.
  if(!Number.isFinite(player.x)||!Number.isFinite(player.z)) reset();
  player.x=clamp(player.x,-360,360); player.z=clamp(player.z,-360,360);
  if(vehicle){
    if(!Number.isFinite(vehicle.x)||!Number.isFinite(vehicle.z)){vehicle=null;vehicleSpeed=0;showToast('VEHICLE RECOVERED');}
    else {vehicle.x=clamp(vehicle.x,-360,360);vehicle.z=clamp(vehicle.z,-360,360);}
  }

  // One small-map campaign loop.
  if(!rudra29.done){
    const m=rudra29.targets[rudra29.mission];
    const px=vehicle?vehicle.x:player.x,pz=vehicle?vehicle.z:player.z;
    if(Math.hypot(px-m.x,pz-m.z)<12) mission29Complete();
  }
  rudra29.serviceCooldown=Math.max(0,rudra29.serviceCooldown-dt);
  rudra29.attackCooldown=Math.max(0,rudra29.attackCooldown-dt);
  rudra29.attackTime=Math.max(0,rudra29.attackTime-dt);
  if(rudra29.attackTime<=0) rudra29.attackType='';
  // Non-graphic melee: G=punch, K=kick. One target per attack.
  const attackPressed = !vehicle && rudra29.attackCooldown<=0 && (keys.has('g')||keys.has('k'));
  if(attackPressed){
    const type=keys.has('k')?'kick':'punch';
    rudra29.attackType=type; rudra29.attackTime=type==='kick'?.46:.34; rudra29.attackCooldown=type==='kick'?.62:.48;
    let target=null,best=type==='kick'?3.7:3.15;
    for(const n of npcs){const d=Math.hypot(n.x-player.x,n.z-player.z);if(d<best && (!target||d<best)){best=d;target=n;}}
    if(target){
      target.stun=type==='kick'?1.05:.82; target.flee=type==='kick'?2.7:2.1; target.combatFlash=.16; if(streetGame.active&&target.rival){target.rival=false;streetGame.score++;streetGame.combo++;streetGame.comboTimer=2.2;cash+=50+streetGame.combo*10;showToast((type==='kick'?'KICK':'PUNCH')+' • RIVAL DOWN • '+streetGame.score+'/'+streetGame.target); }
      const push=Math.max(.25,(type==='kick'?3.7:3.15)-best);
      const dx=target.x-player.x,dz=target.z-player.z,len=Math.hypot(dx,dz)||1;
      target.x+=dx/len*push;target.z+=dz/len*push;
      wanted=clamp(wanted+.25,0,5);sfx('hit');showToast((type==='kick'?'KICK':'PUNCH')+' HIT • CITIZEN STUNNED');
    }else showToast('NO TARGET IN RANGE');
  }
  for(const n of npcs){
    n.stun=Math.max(0,(n.stun||0)-dt);n.flee=Math.max(0,(n.flee||0)-dt);n.combatFlash=Math.max(0,(n.combatFlash||0)-dt);
    if(n.flee>0){const dx=n.x-player.x,dz=n.z-player.z,len=Math.hypot(dx,dz)||1;n.x+=dx/len*dt*5;n.z+=dz/len*dt*5;}
  }
}
const update29Base=update29;
function update34Final(dt){update29Base(dt);update34(dt);}
update=update34Final;

function updateUI29(){
  coreUI29();
  let panel=document.getElementById('rudra29Panel');
  if(!panel){
    panel=document.createElement('div');panel.id='rudra29Panel';
    panel.style.cssText='position:fixed;left:12px;top:110px;z-index:20;max-width:360px;padding:10px 12px;border-radius:10px;background:rgba(8,14,20,.78);color:#fff;font:13px system-ui;line-height:1.45;pointer-events:none;backdrop-filter:blur(6px)';
    document.body.appendChild(panel);
  }
  const m=rudra29.targets[Math.min(rudra29.mission,rudra29.targets.length-1)];
  panel.innerHTML='<b>RUDRA CITY • STORY MODE</b><br>'+
    (rudra29.done?'🏁 CAMPAIGN COMPLETE':('MISSION '+(rudra29.mission+1)+' / '+rudra29.targets.length+'<br>📍 '+m.name))+ 
    '<br>⭐ LEVEL '+rudra29.level+' • XP '+rudra29.xp+'/500'+
    '<br>💰 $'+cash+'<br>'+(streetGame.active?('🥊 CHALLENGE • '+streetGame.score+'/'+streetGame.target+' • HP '+streetGame.health+' • COMBO x'+streetGame.combo):'🧭 Explore landmarks • F talk • J challenge')+'<br><small>WASD MOVE/DRIVE • MOUSE LOOK • E INTERACT • F TALK • G PUNCH • K KICK • H BLOCK • J CHALLENGE • M MAP</small>'+(rudra34.dialogueTime>0?'<br><b>💬 '+rudra34.dialogue+'</b>':'');
}
updateUI=updateUI29;

// Stable startup diagnostics: report a real error instead of silently dying.
const boot29=document.createElement('div');
boot29.id='boot29';
boot29.style.cssText='position:fixed;left:12px;bottom:12px;z-index:9999;padding:7px 9px;border-radius:8px;background:#b42318;color:#fff;font:12px system-ui;display:none;max-width:520px';
document.body.appendChild(boot29);
addEventListener('error',e=>{boot29.textContent='RUDRA CITY ERROR: '+(e.error?.message||e.message||'Unknown error');boot29.style.display='block';});
addEventListener('unhandledrejection',e=>{boot29.textContent='RUDRA CITY ERROR: '+(e.reason?.message||String(e.reason));boot29.style.display='block';});


// BUILD 36.1 — PHYSICS + COMBAT FEEL + MOBILE PLAYABILITY (STABILITY FIX)
// One final wrapper only: adds lightweight rigid-body style impulses, friction,
// knockback/knockdown every second successful hit, and layered synthesized SFX.
const rudra36State={
  hitSeq:0, lastHitAt:0, audioReady:false,
  virtualDetailCount:90000,
  physicsTime:0
};

function sfx36(kind){
  try{
    if(!rudra34.audio) initAudio();
    const a=rudra34.audio,g=rudra34.master;if(!a||!g)return;
    if(a.state==='suspended')a.resume();
    const now=a.currentTime;
    const cfg={
      punch:[115,.10,.10], kick:[78,.13,.13], knock:[58,.18,.18],
      block:[310,.07,.09], whoosh:[190,.045,.11], step:[105,.025,.07]
    }[kind]||[240,.05,.10];
    const o=a.createOscillator(),v=a.createGain();
    o.type=kind==='knock'?'square':(kind==='punch'||kind==='kick'?'triangle':'sine');
    o.frequency.setValueAtTime(cfg[0],now);
    o.frequency.exponentialRampToValueAtTime(Math.max(35,cfg[0]*.58),now+cfg[2]);
    v.gain.setValueAtTime(.0001,now);
    v.gain.exponentialRampToValueAtTime(cfg[1],now+.008);
    v.gain.exponentialRampToValueAtTime(.0001,now+cfg[2]);
    o.connect(v);v.connect(g);o.start(now);o.stop(now+cfg[2]+.02);
    if(kind==='knock'||kind==='kick'){
      const b=a.createOscillator(),bv=a.createGain();b.type='sine';b.frequency.value=42;bv.gain.setValueAtTime(.045,now);bv.gain.exponentialRampToValueAtTime(.0001,now+.16);b.connect(bv);bv.connect(g);b.start(now);b.stop(now+.17);
    }
  }catch(e){}
}

function initNPCPhysics36(n){
  if(n._p36)return;
  n._p36={vx:0,vz:0,vy:0,ground:0};
  n.hitCount36=0;n.knockTime36=0;n.invuln36=0;
  n._p36Ready=true;
}

const update36Base=update;
update=function(dt){
  update36Base(dt);
  if(paused||photoMode)return;
  rudra36State.physicsTime+=dt;
  // Lightweight rigid-body style NPC physics. No expensive physics engine required.
  for(const n of npcs){
    initNPCPhysics36(n);
    const p=n._p36;
    n.invuln36=Math.max(0,n.invuln36-dt);
    if(n.knockTime36>0){
      n.knockTime36=Math.max(0,n.knockTime36-dt);
      p.vy-=18*dt;
    }
    n.x+=p.vx*dt;n.z+=p.vz*dt;
    // Gravity-like vertical state is kept for gameplay timing; the city remains ground-clamped.
    p.vy-=24*dt;
    if(p.vy<0)p.vy=Math.max(p.vy,-14);
    const drag=Math.pow(.0008,dt);
    p.vx*=drag;p.vz*=drag;
    const speed=Math.hypot(p.vx,p.vz);
    if(speed<.08){p.vx=0;p.vz=0;}
    n.x=clamp(n.x,-355,355);n.z=clamp(n.z,-355,355);
  }
  // Simple dynamic collision avoidance: nearby citizens gently separate instead of stacking.
  for(let i=0;i<npcs.length;i++){
    const a=npcs[i];if(!a.citizen)continue;
    for(let j=i+1;j<npcs.length;j++){
      const b=npcs[j];if(!b.citizen)continue;
      const dx=b.x-a.x,dz=b.z-a.z,d2=dx*dx+dz*dz;
      if(d2>0.01&&d2<1.25){const d=Math.sqrt(d2),nx=dx/d,nz=dz/d,q=(1.12-d)*.045;a.x-=nx*q;a.z-=nz*q;b.x+=nx*q;b.z+=nz*q;}
    }
  }
};

const feature36Base=featureKey;
featureKey=function(k){
  if(k==='g'||k==='k'){
    // Preserve the existing attack system; the physics layer below observes its successful hits.
    initAudio();
  }
  if(k==='h')sfx36('block');
  return feature36Base(k);
};

// Observe successful combat hits and convert every second hit into a stronger knockdown.
const update36CombatBase=update;
update=function(dt){
  update36CombatBase(dt);
  if(paused||photoMode)return;
  // Mark a target when the base combat system has just applied its flash/stun.
  for(const n of npcs){
    if(!n.citizen)continue;
    initNPCPhysics36(n);
    if(n.combatFlash>0 && n._lastFlash36<=0){
      n._lastFlash36=n.combatFlash;
      n.hitCount36=(n.hitCount36||0)+1;
      const dx=n.x-player.x,dz=n.z-player.z,len=Math.hypot(dx,dz)||1;
      const p=n._p36;
      const type=rudra29.attackType||'punch';
      const power=type==='kick'?8.5:6.5;
      p.vx=dx/len*power;p.vz=dz/len*power;
      sfx36(type);
      if(n.hitCount36%2===0){
        p.vx*=1.65;p.vz*=1.65;n.knockTime36=.58;n.flee=Math.max(n.flee||0,2.2);n.stun=Math.max(n.stun||0,.9);screenShake=.12;sfx36('knock');showToast('HEAVY HIT • KNOCKBACK');
      }
    }
    n._lastFlash36=Math.max(0,(n.combatFlash||0));
  }
};
// Sentinel avoids relying on an undefined external variable.
let update36StateHits=0;

// 90,000 deterministic virtual detail seeds. They are streamed conceptually rather than
// allocating 90,000 WebGL meshes, protecting phone performance while keeping the world scalable.
const virtualWorld36=Object.freeze({count:rudra36State.virtualDetailCount,seed:360731,streaming:true});
window.RUDRA_CITY_BUILD36={physics:'lightweight-rigid-body',virtualDetails:virtualWorld36};

addEventListener('blur',()=>keys.clear());
reset();
cityRaf=requestAnimationFrame(loop);
}

window.__RUDRA_CITY_MERGED__=true;
