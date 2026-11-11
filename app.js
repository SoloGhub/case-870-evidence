(function(){
const D=window.CASE, E=D.ev, $=(s,r=document)=>r.querySelector(s), h=(t)=>{const d=document.createElement('div');d.innerHTML=t.trim();return d.firstElementChild};
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
if(!document.querySelector('#goals').children.length)window.RENDER(D,(id,html)=>{$('#'+id).innerHTML=html});
$('#eptabs').addEventListener('click',ev=>{const b=ev.target.closest('button');if(!b)return;document.querySelectorAll('#eptabs button,#eps .ep').forEach(n=>n.classList.toggle('on',n.dataset.i===b.dataset.i))});
// LIGHTBOX
const lb=$('#lb');
function chatHTML(e){let last='';return `<div class="chat">${e.msgs.map(m=>{let o='';if(m.d!==last){o+=`<div class="day num">${m.d}</div>`;last=m.d}
  return o+`<div class="msg ${m.w}"><b>${m.w==='a'?'أحمد':'رانيا'}</b>${m.x}<small>${m.h}</small></div>`}).join('')}</div>`}
function open(id){const e=E[id];if(!e)return;$('#lbt').textContent=e.title;$('#lbs').textContent='المصدر: '+e.src;
  $('#lbb').innerHTML=(e.hl?`<p class="hl">${e.hl}</p>`:'')+(e.t==='chat'?chatHTML(e):[].concat(e.img).map(s=>`<img loading="lazy" src="assets/ev/${s}" alt="${esc(e.title)}" style="margin-bottom:10px">`).join(''));
  lb.classList.add('on');$('#lbb').scrollTop=0;document.body.style.overflow='hidden'}
function close(){lb.classList.remove('on');document.body.style.overflow=''}
document.addEventListener('click',ev=>{const b=ev.target.closest('[data-ev]');if(b){ev.preventDefault();open(b.dataset.ev)}else if(ev.target===lb||ev.target.closest('.x'))close()});
document.addEventListener('keydown',ev=>{if(ev.key==='Escape')close()});

// 3D tilt (pointer devices only)
if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
  document.querySelectorAll('.tilt').forEach(c=>{c.addEventListener('mousemove',ev=>{const r=c.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width-.5,y=(ev.clientY-r.top)/r.height-.5;c.style.transform=`rotateY(${x*14}deg) rotateX(${-y*12}deg) translateZ(8px)`});c.addEventListener('mouseleave',()=>c.style.transform='')})}
// nav highlight
const links=[...document.querySelectorAll('.nav a[href^="#"]')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-40% 0px -55% 0px'});
document.querySelectorAll('section[id]').forEach(s=>io.observe(s));
})();
