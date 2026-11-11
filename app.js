(function(){
const E=window.CASE.ev, S=window.STORY, $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const TIER={s:'إثبات قوي',m:'إثبات متوسط',n:'إثبات معتاد'};
// flatten scenes
const key=d=>{const y=(d.match(/20\d\d/g)||['0']).pop();const m=d.match(/(\d\d)\/(\d\d)(?:\/(20\d\d))?/);return (m[3]||y)+m[2]+m[1]};
const SC=[]; S.acts.forEach((a,ai)=>a.scenes.slice().sort((x,z)=>key(x.d)<key(z.d)?-1:1).forEach(s=>SC.push(Object.assign({act:ai,ay:a.y,ah:a.h},s))));
const yearOf=s=>{const m=s.d.match(/(20\d\d)/g);return m?m[m.length-1]:''};

function thumbs(ids){return [].concat(ids||[]).map(id=>{const e=E[id];if(!e)return '';const img=[].concat(e.img)[0];
  return `<button class="th" data-ev="${id}" title="${esc(e.title)}"><img loading="lazy" src="assets/ev/${img}" alt=""><span>${esc(e.b||e.title)}</span></button>`}).join('')}
function panels(s){return `${s.her?`<div class="pn her"><b>ادّعت</b><p>${esc(s.her)}</p></div>`:''}${s.me?`<div class="pn me"><b>الثابت بالمستند</b><p>${esc(s.me)}</p></div>`:''}${s.court?`<div class="pn court"><b>المحكمة</b><p>${esc(s.court)}</p></div>`:''}`}

// counters
$('#counters').innerHTML=S.counters.map(c=>`<div class="ct"${c.e?` data-ev="${[].concat(c.e)[0]}" role="button" tabindex="0"`:''}><b>${c.n}</b><span>${esc(c.u)}</span><small>${esc(c.s)}</small></div>`).join('');

// PLAYER
let cur=0,timer=null;
$('#track').innerHTML=S.acts.map((a,ai)=>`<div class="tk"><em>${a.y}</em><div>${SC.map((s,i)=>s.act===ai?`<button class="dot ${s.t}" data-i="${i}" title="${esc(s.d+' — '+s.h)}"></button>`:'').join('')}</div></div>`).join('');
function show(i){cur=(i+SC.length)%SC.length;const s=SC[cur];
  $('#stage').innerHTML=`<div class="scene t-${s.t}"><div class="sh"><span class="act">${esc(s.ah)}</span><span class="tier ${s.t}">${TIER[s.t]}</span></div>
   <time>${esc(s.d)}</time><h2>${esc(s.h)}</h2><div class="pns">${panels(s)}</div><div class="ths">${thumbs(s.e)}</div>
   <p class="pos">${cur+1} / ${SC.length}</p></div>`;
  $$('.dot').forEach(d=>d.classList.toggle('on',+d.dataset.i===cur));
  const sc=$('#stage .scene');requestAnimationFrame(()=>sc.classList.add('in'));}
$('#next').onclick=()=>{stop();show(cur+1)};$('#prev').onclick=()=>{stop();show(cur-1)};
$('#track').onclick=e=>{const b=e.target.closest('.dot');if(b){stop();show(+b.dataset.i)}};
function stop(){clearInterval(timer);timer=null;$('#auto').textContent='▶ تشغيل تلقائي';$('#auto').classList.remove('run')}
$('#auto').onclick=()=>{if(timer)return stop();$('#auto').textContent='⏸ إيقاف';$('#auto').classList.add('run');show(cur+1);timer=setInterval(()=>show(cur+1),11000)};
document.addEventListener('keydown',e=>{if($('#lb').classList.contains('on'))return;if(!$('#v-play').classList.contains('on'))return;if(e.key==='ArrowLeft'){stop();show(cur+1)}if(e.key==='ArrowRight'){stop();show(cur-1)}});
show(0);

// LIST by year
const YEARS=['الكل','2023','2024','2025','2026'];let fy='الكل',ft='all';
$('#yf').innerHTML=`<div class="chips">${YEARS.map(y=>`<button data-y="${y}" class="${y===fy?'on':''}">${y}</button>`).join('')}</div>
 <div class="chips">${[['all','كل المستويات'],['s','قوية'],['m','متوسطة'],['n','معتادة']].map(([k,l])=>`<button data-t="${k}" class="${k===ft?'on':''}">${l}</button>`).join('')}</div>`;
function card(s,i){return `<article class="card t-${s.t}" id="c${i}"><div class="ch"><time>${esc(s.d)}</time><span class="tier ${s.t}">${TIER[s.t]}</span></div><h3>${esc(s.h)}</h3><div class="pns">${panels(s)}</div><div class="ths">${thumbs(s.e)}</div></article>`}
function renderList(){$('#list').innerHTML=SC.map((s,i)=>({s,i})).filter(({s})=>(fy==='الكل'||s.d.includes(fy))&&(ft==='all'||s.t===ft)).map(({s,i})=>card(s,i)).join('')||'<p class="empty">لا أحداث.</p>'}
$('#yf').onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.y){fy=b.dataset.y;$$('#yf [data-y]').forEach(x=>x.classList.toggle('on',x===b))}if(b.dataset.t){ft=b.dataset.t;$$('#yf [data-t]').forEach(x=>x.classList.toggle('on',x===b))}renderList()};
renderList();

// PROOF tiers
$('#proof').innerHTML=['s','m','n'].map(t=>`<section class="tierblk ${t}"><h2>${TIER[t]==='إثبات قوي'?'إثباتات قوية':TIER[t]==='إثبات متوسط'?'إثباتات متوسطة':'إثباتات معتادة'} <small>${SC.filter(s=>s.t===t).length}</small></h2>
 <div class="grid">${SC.map((s,i)=>s.t===t?`<button class="pc" data-go="${i}"><time>${esc(s.d)}</time><b>${esc(s.h)}</b></button>`:'').join('')}</div></section>`).join('');
$('#proof').onclick=e=>{const b=e.target.closest('[data-go]');if(!b)return;mode('play');stop();show(+b.dataset.go);window.scrollTo({top:$('.modes').offsetTop,behavior:'smooth'})};

// modes
function mode(m){$$('#modes button').forEach(b=>b.classList.toggle('on',b.dataset.m===m));$$('.view').forEach(v=>v.classList.toggle('on',v.id==='v-'+m));if(m!=='play')stop()}
$('#modes').onclick=e=>{const b=e.target.closest('button');if(b)mode(b.dataset.m)};

// LIGHTBOX
const lb=$('#lb');
function open(id){const e=E[id];if(!e)return;$('#lbt').textContent=e.title;$('#lbs').textContent='المصدر: '+e.src;
  $('#lbb').innerHTML=(e.hl?`<p class="hl">${e.hl}</p>`:'')+[].concat(e.img).map(s=>`<img src="assets/ev/${s}" alt="${esc(e.title)}">`).join('');
  lb.classList.add('on');$('#lbb').scrollTop=0;document.body.style.overflow='hidden'}
function close(){lb.classList.remove('on');document.body.style.overflow=''}
document.addEventListener('click',e=>{const b=e.target.closest('[data-ev]');if(b){e.preventDefault();open(b.dataset.ev)}else if(e.target===lb||e.target.closest('.x'))close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close();if(e.key==='Enter'&&e.target.dataset&&e.target.dataset.ev)open(e.target.dataset.ev)});
})();
