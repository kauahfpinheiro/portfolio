// CURSOR
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
function animCursor(){
  cursor.style.left = mx-6+'px'; cursor.style.top = my-6+'px';
  rx += (mx-rx)*0.12; ry += (my-ry)*0.12;
  ring.style.left = rx-18+'px'; ring.style.top = ry-18+'px';
  requestAnimationFrame(animCursor);
}
animCursor();

// REVEAL
const obs = new IntersectionObserver(entries => {
  entries.forEach((e,i) => { if(e.isIntersecting){ setTimeout(()=>e.target.classList.add('visible'), i*80); } });
}, { threshold:0.1 });
document.querySelectorAll('.reveal').forEach(r => obs.observe(r));
