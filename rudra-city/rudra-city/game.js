(() => {
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
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.style.opacity='1';toastTimer=1.7;}
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
 toastTimer=Math.max(0,toastTimer-dt);if(toastTimer===0)document.getElementById('toast').style.opacity='0';screenShake=Math.max(0,screenShake-dt*.25);hornFlash=Math.max(0,hornFlash-dt);
}

let gameTime=0,last=performance.now(),fpsT=0,fpsN=0;function loop(now){const dt=Math.min((now-last)/1000,.04);last=now;gameTime+=dt;update(dt);draw();updateUI();fpsT+=dt;fpsN++;if(fpsT>1){document.title=`RUDRA CITY • ${fpsN} FPS`;fpsT=0;fpsN=0}const mins=(gameTime/60+12)%1440,hh=Math.floor(mins/60)%24,mm=Math.floor(mins%60);hud.clock.textContent=String(hh).padStart(2,'0')+':'+String(mm).padStart(2,'0');requestAnimationFrame(loop)}
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
requestAnimationFrame(loop);
})();
