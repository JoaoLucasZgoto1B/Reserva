
// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('main-nav-mobile');
 
if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
 
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
 
// ============================================================
// Economic threshold simulator
// Zones: 0-35 equilibrio | 35-70 alerta | 70-100 dano economico
// ============================================================
const slider = document.getElementById('pestSlider');
const needle = document.getElementById('gaugeNeedle');
const statusEl = document.getElementById('readoutStatus');
const textEl = document.getElementById('readoutText');
const readoutBox = document.getElementById('simulatorReadout');
 
const ZONES = {
  equilibrio: {
    max: 35,
    color: 'var(--leaf)',
    label: 'Nível de equilíbrio',
    text: 'A população está abaixo do limiar de ação. Nenhuma intervenção é necessária — continue monitorando semanalmente.'
  },
  alerta: {
    max: 70,
    color: 'var(--gold)',
    label: 'Nível de alerta',
    text: 'A população está subindo. Ainda não é hora de aplicar — reforce o monitoramento e observe a presença de inimigos naturais na área.'
  },
  dano: {
    max: 100,
    color: 'var(--ladybug)',
    label: 'Nível de dano econômico — ação necessária',
    text: 'A população cruzou o limiar em que o prejuízo supera o custo do controle. Este é o momento de intervir, escolhendo o método mais adequado à praga monitorada.'
  }
};
 
function updateSimulator() {
  const value = Number(slider.value);
  needle.style.left = value + '%';
 
  let zone;
  if (value < ZONES.equilibrio.max) zone = ZONES.equilibrio;
  else if (value < ZONES.alerta.max) zone = ZONES.alerta;
  else zone = ZONES.dano;
 
  statusEl.textContent = zone.label;
  statusEl.style.color = zone.color;
  textEl.textContent = zone.text;
  readoutBox.style.borderLeftColor = zone.color;
}
 
if (slider) {
  slider.addEventListener('input', updateSimulator);
  updateSimulator();
}
 
// ============================================================
// Reveal sections on scroll
// ============================================================
const revealTargets = document.querySelectorAll('.pillar, .benefit-card, .map-figure, .map-analysis, .steps li');
 
if ('IntersectionObserver' in window && revealTargets.length) {
  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
  });
 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
 
  revealTargets.forEach(el => observer.observe(el));
}