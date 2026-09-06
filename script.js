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
 cancelAnimationFrame(arcade.raf);clearInterval(arcade.car?.timer);clearInterval(arcade.blaster?.timer);clearInterval(arcade.bottles?.timer);clearInterval(arcade.bubble?.timer);clearInterval(arcade.bubbleRush?.timer);window.onkeydown=null;window.onkeyup=null;document.getElementById('gameModal')?.classList.remove('open');document.getElementById('gameModal')?.setAttribute('aria-hidden','true');document.body.style.overflow='';
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
  closeGame(); const m=document.getElementById('gameModal'); if(!m)return;
  m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
  arcadeMount(`<div class="game-title"><span class="game-icon">🏙️</span><div><h2>RUDRA CITY</h2><div class="game-sub">BUILD 36 // FULL 3D OPEN WORLD</div></div></div><div style="height:72vh;min-height:480px;border:1px solid rgba(130,220,255,.2);border-radius:14px;overflow:hidden;background:#02060d"><iframe src="rudra-city/index.html" title="RUDRA CITY" style="width:100%;height:100%;border:0;display:block" allow="autoplay;fullscreen" loading="eager"></iframe></div><div class="arcade-actions"><a class="btn primary" href="rudra-city/index.html" target="_blank" rel="noopener">OPEN FULL SCREEN ↗</a><a class="btn" href="https://www.youtube.com/@bikkeedada" target="_blank" rel="noopener">WATCH ON YT FOR EXPLANATION ↗</a><button class="btn" onclick="closeGame()">EXIT</button></div>`);
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
