// ===== Mobile nav toggle =====
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', false);
  });
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== FAQ accordion =====
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  btn.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ===== Contact form (Web3Forms) =====
const form = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  formNote.textContent = 'Sending…';

  const formData = new FormData(form);
  // Replace with your actual Web3Forms access key
  formData.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY');

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (data.success) {
      formNote.textContent = "✅ Message sent! I'll reply within a few hours.";
      form.reset();
    } else {
      formNote.textContent = '⚠️ Something went wrong. Please try WhatsApp instead.';
    }
  } catch (err) {
    formNote.textContent = '⚠️ Something went wrong. Please try WhatsApp instead.';
  }
});
