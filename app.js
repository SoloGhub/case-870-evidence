(function(){
const D=window.CASE,E=D.ev,S=window.STORY,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const TIER={s:'إثبات قوي',m:'إثبات متوسط',n:'إثبات داعم'};
const ic=(n,c)=>`<img class="ic ${c||''}" src="assets/ic/${n}.png" alt="" loading="lazy">`;
const IC=s=>{const h=s.h;return /منع السفر|منع سفر/.test(h)?'ban':/إحضار|الضبط/.test(h)?'arrest':/تأمين/.test(h)?'shield':/العيد/.test(h)?'gift':/المدرسة|مزور/.test(h)?'school':/راتب/.test(h)?'work':/عقارات|الأراضي/.test(h)?'house':/إقامة|إقامته/.test(h)?'id':/المستشفى|جلطة/.test(h)?'hospital':/مسكن الحضانة/.test(h)?'house':/حجز|البنك|182,000|للخارج|أمانة|الخبير/.test(h)?'bank':/يسدّد|سدّد|16,150/.test(h)?'money':/تكرار|متكررة|الطلب نفسه|مرة أخرى/.test(h)?'repeat':/بخطها|أمام المحكمة|أرفق/.test(h)?'speech':/أحمد يطلب/.test(h)?'doc':'court'};
const key=d=>{const y=(d.match(/20\d\d/g)||['0']).pop();const m=d.match(/(\d\d)\/(\d\d)(?:\/(20\d\d))?/);return (m[3]||y)+m[2]+m[1]};
const SC=[];S.acts.forEach((a,ai)=>a.scenes.slice().sort((x,z)=>key(x.d)<key(z.d)?-1:1).forEach(s=>SC.push(Object.assign({act:ai,ay:a.y,ah:a.h},s))));

function thumbs(ids,cls){return `<div class="ths ${cls||''}">`+[].concat(ids||[]).map(id=>{const e=E[id];if(!e)return '';const img=[].concat(e.img)[0];
  return `<button class="th" data-ev="${id}" title="${esc(e.title)}"><img loading="lazy" src="assets/ev/${img}" alt=""><span>${esc(e.b||e.title)}</span></button>`}).join('')+'</div>'}
const evb=ids=>[].concat(ids||[]).map(id=>E[id]?`<button class="eb" data-ev="${id}">${esc(E[id].b||E[id].title)}</button>`:'').join('');
function panels(s){return `<div class="pns">${s.her?`<div class="pn her">${ic('speech','pi')}<b>ما ورد في طلب طالبة التنفيذ</b><p>${esc(s.her)}</p></div>`:''}${s.me?`<div class="pn me">${ic('ok','pi')}<b>الثابت بالمستند</b><p>${esc(s.me)}</p></div>`:''}${s.court?`<div class="pn court">${ic('court','pi')}<b>قرار المحكمة</b><p>${esc(s.court)}</p></div>`:''}</div>`}

/* counters */
$('#counters').innerHTML=S.counters.map((c,i)=>`<div class="ct"${c.e?` data-ev="${[].concat(c.e)[0]}" role="button" tabindex="0"`:''}>${ic(['arrest','repeat','work','x'][i],'cti')}<b>${c.n}</b><span>${esc(c.u)}</span><small>${esc(c.s)}</small></div>`).join('');

/* 1 BRIEF */
$('#brief').innerHTML=S.brief.map((b,i)=>`<article class="bf"><div class="bn">${i+1}</div>${ic(b.ic,'bi')}<div class="bt"><h3>${esc(b.h)}</h3><p>${esc(b.p)}</p>${thumbs(b.e,'sm')}</div></article>`).join('');

/* 2 PLAYER */
let cur=0,timer=null;
$('#track').innerHTML=S.acts.map((a,ai)=>`<div class="tk"><em>${a.y}</em><div>${SC.map((s,i)=>s.act===ai?`<button class="dot ${s.t}" data-i="${i}" title="${esc(s.d+' — '+s.h)}"></button>`:'').join('')}</div></div>`).join('');
function show(i){cur=(i+SC.length)%SC.length;const s=SC[cur];
  $('#stage').innerHTML=`<div class="scene t-${s.t}"><div class="sh"><span class="act">${esc(s.ah)}</span><span class="tier ${s.t}">${TIER[s.t]}</span></div>
   <div class="sth">${ic(IC(s),'big')}<div><time>${esc(s.d)}</time><h2>${esc(s.h)}</h2></div></div>${panels(s)}${thumbs(s.e)}<p class="pos">${cur+1} / ${SC.length}</p></div>`;
  $$('.dot').forEach(d=>d.classList.toggle('on',+d.dataset.i===cur));requestAnimationFrame(()=>$('#stage .scene').classList.add('in'))}
function stop(){clearInterval(timer);timer=null;$('#auto').textContent='عرض تلقائي';$('#auto').classList.remove('run')}
$('#next').onclick=()=>{stop();show(cur+1)};$('#prev').onclick=()=>{stop();show(cur-1)};
$('#track').onclick=e=>{const b=e.target.closest('.dot');if(b){stop();show(+b.dataset.i)}};
$('#auto').onclick=()=>{if(timer)return stop();$('#auto').textContent='إيقاف العرض';$('#auto').classList.add('run');show(cur+1);timer=setInterval(()=>show(cur+1),12000)};
document.addEventListener('keydown',e=>{if($('#lb').classList.contains('on')||!$('#v-play').classList.contains('on'))return;if(e.key==='ArrowLeft'){stop();show(cur+1)}if(e.key==='ArrowRight'){stop();show(cur-1)}});
show(0);

/* 3 LIST by year */
const YEARS=['الكل','2023','2024','2025','2026'];let fy='الكل',ft='all';
$('#yf').innerHTML=`<div class="chips">${YEARS.map(y=>`<button data-y="${y}" class="${y===fy?'on':''}">${y}</button>`).join('')}</div>
 <div class="chips">${[['all','كل المستويات'],['s','قوية'],['m','متوسطة'],['n','داعمة']].map(([k,l])=>`<button data-t="${k}" class="${k===ft?'on':''}">${l}</button>`).join('')}</div>`;
const card=s=>`<article class="card t-${s.t}"><div class="ch">${ic(IC(s),'mid')}<time>${esc(s.d)}</time><span class="tier ${s.t}">${TIER[s.t]}</span></div><h3>${esc(s.h)}</h3>${panels(s)}${thumbs(s.e)}</article>`;
function renderList(){$('#list').innerHTML=SC.filter(s=>(fy==='الكل'||s.d.includes(fy))&&(ft==='all'||s.t===ft)).map(card).join('')||'<p class="empty">لا وقائع.</p>'}
$('#yf').onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.y){fy=b.dataset.y;$$('#yf [data-y]').forEach(x=>x.classList.toggle('on',x===b))}if(b.dataset.t){ft=b.dataset.t;$$('#yf [data-t]').forEach(x=>x.classList.toggle('on',x===b))}renderList()};
renderList();

/* 4 SAID — Ahmed's requests */
$('#said').innerHTML=S.said.map(x=>`<article class="sd"><div class="sdh"><span class="no">طلب أحمد ${x.no}</span><time>${x.d}</time></div>
 <blockquote>${esc(x.q)}</blockquote><div class="sdr"><div><b>المرفق</b><p>${esc(x.att)}</p></div><div class="dec"><b>قرار المحكمة</b><p>${esc(x.dec)}</p></div></div>${thumbs(x.e,'sm')}</article>`).join('');

/* 5 GOALS */
const G=[['g1','حملات التشويه المتعمد','الادعاء نفسه يتكرر — وأمامه المستند الذي ينفيه'],['g2','القاضي لا يقرأ المرفقات','ما كُتب في الطلب / ما في المرفق / القرار الذي صدر'],['g3','تكرار الطلب حتى الموافقة','الطلب نفسه 4 و5 مرات — وفي الآخر يوافق القاضي'],['g4','تسخين القاضي قبل كل أمر','الطلبات المتلاحقة التي سبقت كل أمر مقيد للحرية']];
$('#gtabs').innerHTML=G.map((g,i)=>`<button data-g="${g[0]}" class="${i?'':'on'}"><b>${g[1]}</b><small>${g[2]}</small></button>`).join('');
const WHO={claim:'طلب طالبة التنفيذ',fact:'واقعة ثابتة',court:'المحكمة',order:'أمر مقيد للحرية'};
$('#g1').innerHTML=D.claims.map(c=>`<article class="cl"><header><div class="cnt"><b>${c.n}</b><span>مرة</span></div><div><h3>«${esc(c.q)}»</h3><small>من ${c.from} إلى ${c.to}</small></div></header>
 <div class="chips2">${c.chips.map(x=>x.e?`<button class="chip ${x.ok?'ok':''}" data-ev="${x.e}">${esc(x.l)}</button>`:`<span class="chip">${esc(x.l)}</span>`).join('')}</div>
 <div class="pn me">${ic('ok','pi')}<b>الثابت بالمستند</b><p>${c.proof}</p></div>${thumbs(c.e,'sm')}</article>`).join('');
$('#g2').innerHTML=D.compares.map(c=>`<article class="cmp"><h3>${c.h}</h3><div class="pns"><div class="pn her">${ic('speech','pi')}<b>ما كُتب في الطلب</b><p>${c.a}</p>${evb(c.ae)}</div><div class="pn me">${ic('search','pi')}<b>ما في المرفق / الملف</b><p>${c.b}</p>${evb(c.be)}</div><div class="pn court">${ic('court','pi')}<b>القرار الذي صدر</b><p>${c.c}</p>${evb(c.ce)}</div></div></article>`).join('');
$('#g3').innerHTML=D.ladders.map(l=>`<article class="lad"><h3>${l.h}</h3><p class="sub">${l.sub}</p><ol class="rungs">${l.rungs.map(r=>`<li class="${r.final?'final':''}"><span class="no">${esc(r.no)}</span><time>${r.d}</time><p>${r.p}</p><span class="res ${r.rc}">${esc(r.r)}</span>${evb(r.e)}</li>`).join('')}</ol>${l.note?`<p class="note">${l.note}</p>`:''}</article>`).join('');
$('#g4').innerHTML=`<div class="chips eps">${D.episodes.map((e,i)=>`<button data-i="${i}" class="${i?'':'on'}">${e.tab}</button>`).join('')}</div>`+D.episodes.map((e,i)=>`<div class="ep ${i?'':'on'}" data-i="${i}"><p class="eph">${e.h}</p><p class="eps2">${e.sum}</p><ol class="etl">${e.items.map(x=>`<li class="${x.k}">${x.gap?`<em class="gap">${esc(x.gap)}</em>`:''}<div class="eh"><time>${x.d}</time><span class="who ${x.k}">${WHO[x.k]||''}</span><small>${esc(x.ref||'')}</small></div>${x.q?`<q>${esc(x.q)}</q>`:''}${x.t?`<p>${x.t}</p>`:''}${evb(x.e)}</li>`).join('')}</ol></div>`).join('');
$('#g4').onclick=e=>{const b=e.target.closest('.eps button');if(!b)return;$$('#g4 .eps button,#g4 .ep').forEach(n=>n.classList.toggle('on',n.dataset.i===b.dataset.i))};
$('#gtabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;$$('#gtabs button').forEach(x=>x.classList.toggle('on',x===b));$$('.gp').forEach(p=>p.classList.toggle('on',p.id===b.dataset.g))};

/* 6 PROOF tiers */
$('#proof').innerHTML=['s','m','n'].map(t=>`<section class="tierblk ${t}"><h2>${t==='s'?'إثباتات قوية':t==='m'?'إثباتات متوسطة':'إثباتات داعمة'} <small>${SC.filter(s=>s.t===t).length}</small></h2>
 <div class="grid">${SC.map((s,i)=>s.t===t?`<button class="pc" data-go="${i}">${ic(IC(s),'mid')}<time>${esc(s.d)}</time><b>${esc(s.h)}</b></button>`:'').join('')}</div></section>`).join('');
$('#proof').onclick=e=>{const b=e.target.closest('[data-go]');if(!b)return;mode('play');stop();show(+b.dataset.go);window.scrollTo({top:$('.modes').offsetTop,behavior:'smooth'})};

/* modes */
const HINT={brief:'تسع نقاط تكفي لشرح القضية في خمس دقائق — كل نقطة معها مستندها.',play:'الوقائع واحدة واحدة بالتاريخ — ما ورد في طلبها، والمستند، وقرار المحكمة. استخدم «التالي» أو العرض التلقائي.',list:'كل الوقائع مرتبة بالتاريخ، مع تصفية بالسنة وبقوة الإثبات.',said:'طلبات أحمد للقاضي: نص ما قاله، ومرفقاته، والقرار عليها — كل ذلك قيل للمحكمة في حينه.',goals:'الأهداف الثلاثة، وتسخين القاضي قبل كل أمر — كلٌّ في صفحة.',proof:'الإثباتات مرتبة حسب قوتها — اضغط أي إثبات لفتح الواقعة.'};
function mode(m){$$('#modes button[data-m]').forEach(b=>b.classList.toggle('on',b.dataset.m===m));$$('.view').forEach(v=>v.classList.toggle('on',v.id==='v-'+m));$('#hint').textContent=HINT[m];if(m!=='play')stop();try{localStorage.setItem('mode',m)}catch(e){}}
$('#modes').onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.id==='print'){setTimeout(()=>window.print(),100);return}mode(b.dataset.m);const hh=$('.hero').offsetHeight;if(window.scrollY>hh)window.scrollTo({top:hh,behavior:'smooth'})};
let m0='brief';try{m0=localStorage.getItem('mode')||'brief'}catch(e){}mode(HINT[m0]?m0:'brief');

/* lightbox */
const lb=$('#lb');
function open(id){const e=E[id];if(!e)return;$('#lbt').textContent=e.title;$('#lbs').textContent='المصدر: '+e.src;
  $('#lbb').innerHTML=(e.hl?`<p class="hl">${e.hl}</p>`:'')+[].concat(e.img).map(s=>`<img src="assets/ev/${s}" alt="${esc(e.title)}">`).join('');
  lb.classList.add('on');$('#lbb').scrollTop=0;document.body.style.overflow='hidden'}
function close(){lb.classList.remove('on');document.body.style.overflow=''}
document.addEventListener('click',e=>{const b=e.target.closest('[data-ev]');if(b){e.preventDefault();open(b.dataset.ev)}else if(e.target===lb||e.target.closest('.x'))close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close();if(e.key==='Enter'&&e.target.dataset&&e.target.dataset.ev)open(e.target.dataset.ev)});
})();
