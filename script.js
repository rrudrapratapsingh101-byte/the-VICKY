let soundOn=false,watchTimer=null,watchStart=0,watchElapsed=0;
const facts=["HTML gives a webpage its structure.","CSS controls presentation and layout.","JavaScript can make webpages interactive.","Python is widely used for web backends and automation.","The first website went online in 1991.","Small projects are one of the best ways to learn programming.","A browser can run JavaScript without a server."];

window.addEventListener("load",()=>setTimeout(()=>document.getElementById("loader").classList.add("hide"),1500));
document.addEventListener("mousemove",e=>{const g=document.querySelector(".cursor-glow");g.style.left=e.clientX+"px";g.style.top=e.clientY+"px"});
function toggleMenu(){const n=document.getElementById("nav"),b=document.querySelector(".menu");if(!n)return;const open=n.classList.toggle("open");if(b)b.textContent=open?"✕":"☰";if(b)b.setAttribute("aria-expanded",open);}
document.addEventListener("click",e=>{const n=document.getElementById("nav"),b=document.querySelector(".menu");if(!n||!n.classList.contains("open"))return;if(e.target.closest("#nav a")){n.classList.remove("open");if(b){b.textContent="☰";b.setAttribute("aria-expanded","false")}}});
function showToast(t){const x=document.getElementById("toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),2400)}
function beep(){if(!soundOn)return;try{const c=new AudioContext(),o=c.createOscillator(),g=c.createGain();o.frequency.value=520;g.gain.value=.035;o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+.06)}catch{}}
function toggleSound(){soundOn=!soundOn;document.getElementById("soundLabel").textContent="SOUND: "+(soundOn?"ON":"OFF");beep()}
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
function askAI(){let i=document.getElementById("aiInput"),q=i.value.trim().toLowerCase(),c=document.getElementById("chat");if(!q)return;let r=q.includes("/help")?"Commands: /about /skills /projects /creator":q.includes("/about")?"I'm Vicky AI Core — a local interactive assistant for Rudra's website.":q.includes("/skills")?"Current learning: HTML, CSS, JavaScript and Python.":q.includes("/projects")?"Projects: Future Tech Hub, Askora AI and Calculator Vault.":q.includes("/creator")?"Creator identity: Bikkee Warrior.":q.includes("hello")?"Hello! Welcome to Rudra's Tech Lab.":"Try /help, /about, /skills, /projects or /creator.";c.innerHTML+="<p><b>YOU:</b> "+escapeHTML(i.value)+"</p><p>VICKY AI: "+r+"</p>";i.value="";c.scrollTop=c.scrollHeight}
function escapeHTML(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function terminalKey(e){if(e.key!=="Enter")return;let i=document.getElementById("termIn"),q=i.value.trim().toLowerCase(),o=document.getElementById("termOut"),r={help:"Commands: help, whoami, about, skills, projects, youtube, status, secret, clear, date",whoami:"Rudra Pratap Singh // Vicky",about:"Student developer learning by building.",skills:"HTML • CSS • JavaScript • Python (learning)",projects:"Future Tech Hub • Askora AI • Calculator Vault",youtube:"Bikkee Warrior",status:"LEARNING → BUILDING → IMPROVING",date:new Date().toLocaleString(),secret:""}[q];if(q==="clear"){o.innerHTML="";i.value="";return}if(q==="secret"){secretMode();i.value="";return}o.innerHTML+="<p>› "+escapeHTML(i.value)+"</p><p>"+(r||"Command not found. Type help.")+"</p>";i.value="";o.scrollTop=o.scrollHeight}
function secretMode(){document.body.classList.add("secret");showToast("🚀 RUDRA SECRET MODE ACTIVATED");setTimeout(()=>document.body.classList.remove("secret"),3500);beep()}
document.addEventListener("keydown",e=>{if(e.key==="Enter"&&document.activeElement.id==="calc")calculate()})


/* ===== VICKY SECRET LAB ===== */
const secretModules={
  VICKY1:{title:'NEON OVERDRIVE',text:'Secret Mode unlocked. The site now has an enhanced neon pulse.',action:()=>{document.body.classList.add('secret-unlocked-1');showToast('🔓 VICKY1 UNLOCKED — NEON OVERDRIVE');}},
  VICKY2:{title:'SYSTEM VISION',text:'Secret HUD unlocked. Your browser now remembers the discovered modules.',action:()=>{document.body.classList.add('secret-unlocked-2');showToast('🔓 VICKY2 UNLOCKED — SYSTEM VISION');}},
  VICKY3:{title:'VICKY CORE',text:'Final module unlocked. The Ultimate Secret Room is now online.',action:()=>{document.body.classList.add('secret-unlocked-3');showToast('👑 VICKY3 UNLOCKED — ULTIMATE CORE');}}
};
function getSecretUnlocks(){try{return JSON.parse(localStorage.getItem('vicky_secret_unlocks')||'[]')}catch{return[]}}
function saveSecretUnlocks(a){localStorage.setItem('vicky_secret_unlocks',JSON.stringify(a))}
function updateSecretUI(){
 const list=getSecretUnlocks(),status=document.getElementById('secretStatus');
 document.querySelectorAll('.secret-chip').forEach(ch=>{const code=ch.dataset.secret,open=list.includes(code);ch.classList.toggle('unlocked',open);const small=ch.querySelector('small');if(small)small.textContent=open?'UNLOCKED':'LOCKED';if(open){const name=secretModules[code]?.title;if(name)ch.querySelector('b').textContent=name}});
 if(status)status.textContent=list.length===3?'SYSTEM FULLY UNLOCKED • ULTIMATE CORE ONLINE':'SYSTEM LOCKED • '+list.length+' / 3 UNLOCKED';
 const ultimate=document.getElementById('ultimateSecret');
 if(ultimate){ultimate.hidden=list.length<3;if(list.length===3)ultimate.innerHTML='<div class="ultimate-icon">👑</div><p class="eyebrow">VICKY CORE // FINAL ACCESS</p><h3>ULTIMATE SECRET ROOM ONLINE</h3><p>All three modules discovered. You found the complete VICKY secret system.</p><div class="ultimate-line">VICKY1 ✓ &nbsp; VICKY2 ✓ &nbsp; VICKY3 ✓</div>'}
 if(list.length)document.body.classList.add('secret-progress');
}
function unlockSecret(){
 const input=document.getElementById('secretCode'),code=(input?.value||'').trim().toUpperCase();
 if(!secretModules[code]){showToast('❌ ACCESS DENIED — UNKNOWN CODE');if(input){input.select()}return}
 const list=getSecretUnlocks();
 const order=['VICKY1','VICKY2','VICKY3'],index=order.indexOf(code);
 if(index>0 && !list.includes(order[index-1])){showToast('🔒 ACCESS LOCKED — UNLOCK '+order[index-1]+' FIRST');return}
 if(list.includes(code)){showToast('⚡ '+code+' ALREADY UNLOCKED');return}
 list.push(code);saveSecretUnlocks(list);secretModules[code].action();updateSecretUI();
 if(code==='VICKY3' && list.length===3) setTimeout(()=>document.getElementById('ultimateSecret')?.scrollIntoView({behavior:'smooth',block:'center'}),300);
 if(input)input.value='';
}
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&document.activeElement?.id==='secretCode')unlockSecret()});
window.addEventListener('load',updateSecretUI);

/* ===== RUDRA GAME ZONE ===== */
const gameState={};
function getBest(k){return Number(localStorage.getItem('rps_'+k)||0)}
function setBest(k,v){if(v>getBest(k)){localStorage.setItem('rps_'+k,v);return true}return false}
function refreshBests(){['shadow','arena','neural'].forEach(k=>{const el=document.getElementById('best'+k[0].toUpperCase()+k.slice(1));if(el)el.textContent=k.toUpperCase()+': '+getBest(k)})}
function openGame(type){const m=document.getElementById('gameModal'),mount=document.getElementById('gameMount');m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';if(type==='shadow')startShadow();if(type==='arena')startArena();if(type==='neural')startNeural()}
function closeGame(){const m=document.getElementById('gameModal');m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow='';}
window.addEventListener('load',refreshBests);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('gameModal').classList.contains('open'))closeGame()});

function startShadow(){
 const cases=[
  {place:'NEON MUSEUM',culprit:'MIRA',suspects:['MIRA','KABIR','ZANE'],clues:['The security badge was used at 21:14.','MIRA says she left at 20:50.','A torn blue thread was found beside the locked display.','KABIR was on camera in the lobby at 21:10.','The curator remembers ZANE wearing a blue jacket.'],truth:'MIRA'},
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
const oldOpenGame=openGame;
openGame=function(type){oldOpenGame(type);if(type==='shootout')startShootout();sfx('open')};
const oldRefreshBests=refreshBests;
refreshBests=function(){oldRefreshBests();const el=document.getElementById('bestShootout');if(el)el.textContent='SHOOTOUT: '+getBest('shootout')};
window.addEventListener('load',()=>{const r=document.getElementById('shootRange');if(r)r.addEventListener('click',shootoutMiss)});
beep=function(){sfx('click')};
document.addEventListener('click',e=>{if(e.target.closest('#shootRange') && !e.target.closest('.shoot-target'))shootoutMiss(e)});

/* ==========================================================
   VICKY ARCADE 2.0 — MOBILE FIRST CAR + COLOURFUL BLASTER
   Uses Web Audio only: no external sound files required.
========================================================== */
const arcade={car:null,blaster:null,raf:null};
function arcadeBest(key){return Number(localStorage.getItem('vicky_'+key)||0)}
function arcadeSetBest(key,val){if(val>arcadeBest(key)){localStorage.setItem('vicky_'+key,String(Math.floor(val)));return true}return false}
function arcadeAudio(kind){
  try{initAudio(); if(!soundOn) soundOn=true;
    const now=audioCtx.currentTime, o=audioCtx.createOscillator(), g=audioCtx.createGain();
    const cfg={start:[220,.06,'sawtooth',.12,520],move:[480,.035,'square',.07,100],coin:[880,.08,'triangle',.1,320],hit:[140,.11,'square',.15,-70],boss:[70,.25,'sawtooth',.16,180],win:[520,.1,'triangle',.13,500],crash:[100,.28,'sawtooth',.2,-75],laser:[680,.06,'square',.12,-380],click:[520,.035,'square',.07,80]};
    const c=cfg[kind]||cfg.click;o.type=c[2];o.frequency.setValueAtTime(c[0],now);o.frequency.linearRampToValueAtTime(Math.max(35,c[0]+c[4]),now+c[1]);g.gain.setValueAtTime(c[3],now);g.gain.exponentialRampToValueAtTime(.001,now+c[1]);o.connect(g);g.connect(masterGain);o.start(now);o.stop(now+c[1]);
  }catch(e){}
}
function openGame(type){
 const m=document.getElementById('gameModal');if(!m)return;m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
 if(type==='car')startCarGame(); else if(type==='blaster')startBlasterGame(); else if(type==='bottles')startBottleGame(); else { if(typeof startShadow==='function') startShadow(); }
 arcadeAudio('start');
}
function closeGame(){
 cancelAnimationFrame(arcade.raf);clearInterval(arcade.car?.timer);clearInterval(arcade.blaster?.timer);clearInterval(arcade.bottles?.timer);document.getElementById('gameModal')?.classList.remove('open');document.getElementById('gameModal')?.setAttribute('aria-hidden','true');document.body.style.overflow='';
}
function refreshArcadeBests(){const a=document.getElementById('bestCar'),b=document.getElementById('bestBlaster'),d=document.getElementById('bestBottles');if(a)a.textContent='DRIVE: '+arcadeBest('car');if(b)b.textContent='BLASTER: '+arcadeBest('blaster');if(d)d.textContent='BOTTLES: '+arcadeBest('bottles')}
function gameCanvas(){return document.getElementById('arcadeCanvas')}
function arcadeMount(html){document.getElementById('gameMount').innerHTML=html}

function startCarGame(){
 clearInterval(arcade.car?.timer);cancelAnimationFrame(arcade.raf);
 arcade.car={score:0,best:arcadeBest('car'),speed:4.2,lane:1,time:0,running:false,over:false,traffic:[],spawn:0,keys:{left:false,right:false},timer:null};
 arcadeMount(`<div class="game-title"><span class="game-icon">🏎️</span><div><h2>NEON TRAFFIC RUSH</h2><div class="game-sub">COLOUR HIGHWAY // DODGE THE TRAFFIC</div></div></div>
 <div class="arcade-shell"><div class="arcade-head"><b>NEON DRIVE</b><div class="arcade-stats"><span class="arcade-stat" id="carScore">SCORE 0</span><span class="arcade-stat" id="carSpeed">SPEED 4.2</span><span class="arcade-stat" id="carBest">BEST ${arcade.car.best}</span></div></div>
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
 arcadeMount(`<div class="game-title"><span class="game-icon">🎯</span><div><h2>NEON BLASTER</h2><div class="game-sub">COLOUR ARENA // 60 SECOND SCORE RUN</div></div></div>
 <div class="arcade-shell"><div class="arcade-head"><b>BLASTER RANGE</b><div class="arcade-stats"><span class="arcade-stat" id="blastTime">TIME 60</span><span class="arcade-stat" id="blastScore">SCORE 0</span><span class="arcade-stat" id="blastCombo">COMBO 0x</span><span class="arcade-stat" id="blastWave">WAVE 1</span></div></div>
 <div class="arcade-canvas-wrap"><canvas id="arcadeCanvas" class="arcade-canvas" width="620" height="700"></canvas><div id="blastOverlay" class="arcade-overlay"><div class="arcade-message"><h3>🎯 NEON BLASTER</h3><p>Tap colourful targets to build your combo. Misses reset the combo. Boss waves give bonus points.</p></div></div></div>
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
 arcadeMount(`<div class="game-title"><span class="game-icon">🍾</span><div><h2>NEON BOTTLE BREAKER</h2><div class="game-sub">COLOUR RANGE // BREAK THE BOTTLES</div></div></div>
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
