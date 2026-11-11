window.RENDER=function(D,set){const E=D.ev;const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
// evidence button(s)
function eb(ids){ if(!ids) return ''; return [].concat(ids).map(id=>{const e=E[id]; if(!e){console.warn('missing ev',id);return ''}
  return `<button class="eb ${e.t==='chat'?'wa':''}" data-ev="${id}">${esc(e.b||e.title)}</button>`}).join('')}
function evHTML(x){
  const who={claim:'طلب طالبة التنفيذ',fact:'واقعة ثابتة',court:'قرار المحكمة',order:'أمر مقيِّد للحرية',ahmed:'طلب أحمد'}[x.k]||'';
  const cls=x.k==='ahmed'?'fact':x.k;
  return `${x.gap?`<div class="gap">${esc(x.gap)}</div>`:''}<div class="ev ${cls}"><div class="hd"><time class="num">${x.d}</time><span class="who">${who}</span>${x.ref?`<span>${esc(x.ref)}</span>`:''}</div>${x.q?`<q>${esc(x.q)}</q>`:''}${x.t?`<p class="t">${x.t}</p>`:''}${eb(x.e)}</div>`}

// HERO
set('goals',D.goals.map(g=>`<a class="g3d tilt" href="${g.href}"><span class="tag">${g.tag}</span><div class="big num">${g.big}<small>${g.unit}</small></div><h3>${g.h}</h3><p>${g.p}</p></a>`).join(''));
set('sys',D.system.map((s,i)=>`<div class="step"><i>${i+1}</i><h4>${s.h}</h4><p>${s.p}</p></div>`).join(''));
// EPISODES
set('eptabs',D.episodes.map((e,i)=>`<button data-i="${i}" class="${i?'':'on'}">${e.tab}<small>${e.when}</small></button>`).join(''));
set('eps',D.episodes.map((e,i)=>`<div class="ep ${i?'':'on'}" data-i="${i}"><div class="verdict"><div class="ic">!</div><div><b>${e.h}</b><br>${e.sum}</div></div><div class="tl">${e.items.map(evHTML).join('')}</div></div>`).join(''));
// CLAIMS
set('claims',D.claims.map(c=>`<article class="cl"><header><div class="cnt"><b class="num">${c.n}</b><span>مرة</span></div><div><h3><q>${esc(c.q)}</q></h3><div class="span">من <span class="num">${c.from}</span> إلى <span class="num">${c.to}</span></div></div></header>
 <div class="chips">${c.chips.map(x=>x.e?`<button class="chip ${x.ok?'ok':''}" data-ev="${x.e}">${esc(x.l)}</button>`:`<span class="chip ${x.ok?'ok':''}">${esc(x.l)}</span>`).join('')}</div>
 <div class="proof"><h4>الثابت بالمستندات</h4><p>${c.proof}</p>${eb(c.e)}</div>${c.honest?`<p class="honest">${c.honest}</p>`:''}</article>`).join(''));
// COMPARES
set('cmps',D.compares.map(c=>`<article class="cmp"><h3>${c.h}</h3><div class="cols"><div class="col a"><h4>ما قيل في الطلب</h4><p>${c.a}</p>${eb(c.ae)}</div><div class="col b"><h4>ما في المرفق / الملف نفسه</h4><p>${c.b}</p>${eb(c.be)}</div><div class="col c"><h4>القرار الذي صدر</h4><p>${c.c}</p>${eb(c.ce)}</div></div></article>`).join(''));
// LADDERS
set('lads',D.ladders.map(l=>`<article class="lad"><h3>${l.h}</h3><p class="sub">${l.sub}</p><div class="rungs">${l.rungs.map(r=>`<div class="rung ${r.final?'final':''}"><span class="no">${esc(r.no)}</span><time class="num">${r.d}</time><p>${r.p}</p><span class="res ${r.rc}">${esc(r.r)}</span><br>${eb(r.e)}</div>`).join('')}</div>${l.note?`<p class="honest" style="margin:6px 0 0;font-size:12.8px;color:var(--mute);border-inline-start:2px solid var(--gold);padding-inline-start:10px">${l.note}</p>`:''}</article>`).join(''));
// FACTS
set('facts',D.facts.map(f=>`<article class="fa"><h3>${f.h}</h3><ol>${f.li.map(x=>`<li class="${x.c||''}"><time class="num">${x.d}</time> — ${x.t} ${eb(x.e)}</li>`).join('')}</ol></article>`).join(''));
// AHMED
set('alerts',D.alerts.map(evHTML).join(''));
set('limits',D.limits.map(x=>`<li>${x}</li>`).join(''));

};
