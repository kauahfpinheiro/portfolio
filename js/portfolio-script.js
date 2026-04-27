// CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top  = my - 6 + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx - 18 + 'px';
  ring.style.top  = ry - 18 + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();

// TYPING
const roles = [
  'Desenvolvedor Full Stack',
  'Estudante de TI',
  'Front-End Developer',
  'Back-End Developer',
];
let ri = 0, ci = 0, del = false;
const el = document.getElementById('typedText');
function type() {
  const cur = roles[ri];
  if (!del) {
    el.textContent = cur.slice(0, ++ci);
    if (ci === cur.length) { del = true; setTimeout(type, 1600); return; }
  } else {
    el.textContent = cur.slice(0, --ci);
    if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, del ? 50 : 80);
}
type();

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
reveals.forEach(r => obs.observe(r));

// FORM FEEDBACK (demo)
document.getElementById('sendBtn').addEventListener('click', () => {
  document.getElementById('formFeedback').style.display = 'block';
  setTimeout(() => { document.getElementById('formFeedback').style.display = 'none'; }, 3000);
});

// NAVBAR ACTIVE ON SCROLL
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) cur = s.id;
  });
  navLinks.forEach(l => {
    l.style.color = l.getAttribute('href') === '#' + cur
      ? 'var(--blue-neon)' : '';
  });
});
