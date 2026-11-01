// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Typing effect
const roles = [
  'Cyber Security Analyst',
  'Web Application Penetration Tester',
  'Network Security Enthusiast',
  'APCSIP-2026 Selected Intern'
];
const typed = document.getElementById('typed');
let r = 0, c = 0, deleting = false;
function type() {
  const word = roles[r];
  typed.textContent = word.slice(0, c);
  if (!deleting && c < word.length) { c++; setTimeout(type, 70); }
  else if (!deleting) { deleting = true; setTimeout(type, 1500); }
  else if (c > 0) { c--; setTimeout(type, 35); }
  else { deleting = false; r = (r + 1) % roles.length; setTimeout(type, 300); }
}
type();

// Mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// Nav shadow, back-to-top, active link
const nav = document.getElementById('nav');
const toTop = document.getElementById('toTop');
const links = [...menu.querySelectorAll('a[href^="#"]')];
const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
  toTop.classList.toggle('show', window.scrollY > 500);
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) current = '#' + s.id; });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === current));
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Matrix-style background
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
const chars = '01{}[]<>/$#@%&*ABCDEF'.split('');
let drops = [];
function resize() {
  canvas.width = innerWidth; canvas.height = innerHeight;
  drops = Array(Math.floor(canvas.width / 16)).fill(1);
}
resize(); addEventListener('resize', resize);
function draw() {
  ctx.fillStyle = 'rgba(11,15,20,0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00e5a8';
  ctx.font = '14px JetBrains Mono, monospace';
  drops.forEach((y, i) => {
    ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 16, y * 16);
    if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(draw, 60);
