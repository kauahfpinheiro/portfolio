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

// FORM FEEDBACK - OPEN GMAIL COMPOSE WINDOW
document.getElementById('sendBtn').addEventListener('click', function() {
  try {
    // Get form values
    const form = document.getElementById('contactForm');
    const name = form.querySelector('input[name="nome"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const message = form.querySelector('textarea[name="mensagem"]').value.trim();
    
    // Validation
    if (!name) {
      alert('Por favor, preencha o campo Nome.');
      return false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Por favor, insira um e-mail válido.');
      return false;
    }
    if (!message) {
      alert('Por favor, preencha o campo Mensagem.');
      return false;
    }
    
    // Abre o Gmail Compose com os campos preenchidos para o usuário confirmar e enviar
    const subject = `Mensagem de ${name}`;
    const body = `${message}\n\n---\nNome: ${name}\nEmail: ${email}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=kauahfpinheiro@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Show success feedback
    document.getElementById('formFeedback').style.display = 'block';
    document.getElementById('formFeedback').textContent = '✓ Abrindo o Gmail para você confirmar o envio...';
    
    // Open Gmail window after a brief delay
    setTimeout(() => {
      window.open(gmailUrl, '_blank');
    }, 500);
    
    // Hide feedback after delay
    setTimeout(() => { document.getElementById('formFeedback').style.display = 'none'; }, 4000);
    
    return false;
  } catch (err) {
    console.error('Erro ao enviar mensagem:', err);
    alert('Erro ao processar formulário. Por favor, tente novamente.');
    return false;
  }
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
