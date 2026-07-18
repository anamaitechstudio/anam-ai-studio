// ===================== ANAM AI STUDIO — main script =====================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- header scroll state ---------- */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile drawer ---------- */
  const drawer = document.getElementById('mobileDrawer');
  const menuToggle = document.getElementById('menuToggle');
  const closeDrawer = document.getElementById('closeDrawer');
  menuToggle?.addEventListener('click', () => drawer.classList.add('open'));
  closeDrawer?.addEventListener('click', () => drawer.classList.remove('open'));
  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => drawer.classList.remove('open')));

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 6) * 60}ms`;
    revealObserver.observe(el);
  });

  /* ---------- skill bars ---------- */
  const bars = document.querySelectorAll('.bar i');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.w + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => barObserver.observe(b));

  /* ---------- smooth counters ---------- */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- pricing tabs ---------- */
  const tabs = document.querySelectorAll('.pricing-tab');
  const panels = {
    resume: document.getElementById('panel-resume'),
    data: document.getElementById('panel-data'),
    office: document.getElementById('panel-office'),
    design: document.getElementById('panel-design'),
  };
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      Object.values(panels).forEach(p => p.classList.remove('active'));
      panels[tab.dataset.tab].classList.add('active');
    });
  });

  /* ---------- mouse parallax on hero blobs ---------- */
  const hero = document.querySelector('.hero');
  const blobs = hero ? hero.querySelectorAll('.blob') : [];
  if (hero && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    hero.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 24;
      const y = (e.clientY / innerHeight - 0.5) * 24;
      blobs.forEach((b, i) => {
        const factor = i % 2 === 0 ? 1 : -1;
        b.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });
  }

  /* ---------- contact form (static demo — wire to Web3Forms / backend) ---------- */
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    // TODO: replace with your Web3Forms access key or preferred form backend
    formMsg.classList.add('show');
    form.reset();
    setTimeout(() => formMsg.classList.remove('show'), 6000);
  });

  /* ---------- close mobile drawer on resize to desktop ---------- */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) drawer.classList.remove('open');
  });

});
