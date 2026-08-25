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

// ===== Anam Assistant — trilingual chatbot (English / Urdu / Roman Urdu) =====
(function () {
  const WHATSAPP_URL = 'https://wa.me/923166687805?text=Hi%20Anam!%20I%20chatted%20with%20Anam%20Assistant%20and%20I%27d%20like%20to%20order.';

  const toggle = document.getElementById('chat-toggle');
  const win = document.getElementById('chat-window');
  const closeBtn = document.getElementById('chat-close');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatBody = document.getElementById('chat-body');

  if (!toggle || !win || !chatForm) return;

  toggle.addEventListener('click', () => {
    win.hidden = !win.hidden;
    if (!win.hidden) chatInput.focus();
  });
  closeBtn?.addEventListener('click', () => { win.hidden = true; });

  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg ' + sender;
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function addLinkMessage(text, linkLabel) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg bot';
    msg.textContent = text + ' ';
    const a = document.createElement('a');
    a.href = WHATSAPP_URL;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = linkLabel;
    a.style.color = 'var(--orange)';
    a.style.fontWeight = '700';
    a.style.textDecoration = 'underline';
    msg.appendChild(a);
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Very small keyword-based intent matcher across EN / Urdu script / Roman Urdu.
  const intents = [
    {
      keywords: ['order', 'buy', 'chahiye', 'chaiye', 'banwani', 'banwana', 'want to order', 'karna hai', 'خریدنا', 'آرڈر'],
      reply: {
        note: 'Great — let\'s get your order started. Please tap below to continue on WhatsApp:',
        link: 'Order on WhatsApp'
      }
    },
    {
      keywords: ['price', 'cost', 'rate', 'fee', 'qeemat', 'qimat', 'kitna', 'kitne', 'paise', 'paisay', 'قیمت'],
      en: "Pricing depends on the type of resume, your experience level and turnaround time. Share your details on WhatsApp and I'll give you a custom quote — no hidden charges.",
      ur: 'قیمت ریزیومے کی قسم، تجربے اور ڈیلیوری ٹائم پر منحصر ہے۔ اپنی تفصیلات واٹس ایپ پر بھیجیں، میں آپ کو کسٹم قیمت بتاؤں گی۔',
      roman: 'Price resume ki type, experience aur delivery time par depend karti hai. Apni details WhatsApp par bhejein, main aapko custom quote dungi.'
    },
    {
      keywords: ['ats', 'applicant tracking'],
      en: 'Every resume I write is ATS-friendly — clean structure, standard headings and proper formatting so applicant tracking systems can parse it correctly.',
      ur: 'میں جو بھی ریزیومے بناتی ہوں وہ ATS-friendly ہوتا ہے — صاف ڈھانچہ اور درست فارمیٹنگ کے ساتھ۔',
      roman: 'Har resume ATS-friendly banaya jata hai — clean structure aur proper formatting ke saath, taake applicant tracking systems usay sahi tarah parh sakein.'
    },
    {
      keywords: ['delivery', 'time', 'kab tak', 'kitne din', 'turnaround', 'ڈیلیوری'],
      en: 'Typical delivery is within 24 hours. Urgent requests are welcome — just mention it when you message me.',
      ur: 'عام طور پر ڈیلیوری 24 گھنٹوں میں ہو جاتی ہے۔ ارجنٹ آرڈر کے لیے مجھے بتائیں۔',
      roman: 'Aam tor par delivery 24 hours mein ho jati hai. Urgent order ho to message mein zaroor bata dein.'
    },
    {
      keywords: ['process', 'how does it work', 'kaise', 'kese', 'tareeqa', 'طریقہ'],
      en: 'It\'s simple: message me your education, experience and target job role, I confirm the details and price, then deliver your resume — usually within 24 hours.',
      ur: 'یہ آسان ہے: مجھے اپنی تعلیم، تجربہ اور جاب رول بتائیں، میں تفصیلات اور قیمت کنفرم کروں گی اور پھر ریزیومے تیار کر دوں گی۔',
      roman: 'Simple hai: mujhe apni education, experience aur job role batayein, main details aur price confirm karungi, phir resume 24 hours mein deliver kar dungi.'
    },
    {
      keywords: ['contact', 'whatsapp', 'number', 'email', 'رابطہ'],
      en: 'You can reach me on WhatsApp at +92 316 6687805 or email anamaitech5@gmail.com.',
      ur: 'آپ مجھ سے واٹس ایپ +92 316 6687805 یا ای میل anamaitech5@gmail.com پر رابطہ کر سکتے ہیں۔',
      roman: 'Aap mujhse WhatsApp +92 316 6687805 ya email anamaitech5@gmail.com par contact kar sakte hain.'
    },
    {
      keywords: ['linkedin'],
      en: 'I also offer LinkedIn Profile Optimization — a rewritten headline, summary and experience section aligned with your resume and target roles.',
      ur: 'میں لنکڈ ان پروفائل آپٹیمائزیشن بھی کرتی ہوں — آپ کے ریزیومے کے مطابق ہیڈلائن، سمری اور تجربہ۔',
      roman: 'Main LinkedIn Profile Optimization bhi karti hoon — resume ke mutabiq headline, summary aur experience section.'
    },
    {
      keywords: ['cover letter'],
      en: 'Yes, I write short, tailored cover letters that support your resume instead of repeating it.',
      ur: 'جی ہاں، میں مختصر اور ذاتی نوعیت کے کور لیٹر بھی لکھتی ہوں۔',
      roman: 'Ji han, main short aur tailored cover letter bhi likhti hoon jo resume ko support kare.'
    },
    {
      keywords: ['resume', 'cv', 'ریزیومے', 'سی وی'],
      en: 'Sure! I can help you create a professional resume. Please share your education, experience and target job role.',
      ur: 'بالکل! میں آپ کا پروفیشنل ریزیومے بنانے میں مدد کر سکتی ہوں۔ اپنی تعلیم، تجربہ اور جاب رول بتائیں۔',
      roman: 'Bilkul! Apni education, experience aur jis job ke liye apply karna hai wo details share karein.'
    }
  ];

  const fallback = {
    en: "I can help with resumes, CVs, ATS formatting, LinkedIn, delivery time or the process. You can also message me directly on WhatsApp.",
    link: 'Chat on WhatsApp'
  };

  function detectLanguage(text) {
    if (/[\u0600-\u06FF]/.test(text)) return 'ur'; // Urdu script
    return 'roman-or-en'; // heuristic below decides further
  }

  function isRomanUrdu(text) {
    const romanWords = ['hai', 'chahiye', 'kaise', 'kese', 'kitna', 'kitne', 'karna', 'mujhe', 'apni', 'banwani', 'banwana', 'qeemat', 'qimat', 'paise', 'paisay', 'aap', 'bhejein'];
    const lower = text.toLowerCase();
    return romanWords.some(w => lower.includes(w));
  }

  function respondTo(userText) {
    const lower = userText.toLowerCase();
    const lang = detectLanguage(userText) === 'ur' ? 'ur' : (isRomanUrdu(userText) ? 'roman' : 'en');

    for (const intent of intents) {
      const matched = intent.keywords.some(k => lower.includes(k.toLowerCase()) || userText.includes(k));
      if (matched) {
        if (intent.reply) {
          addLinkMessage(intent.reply.note, intent.reply.link);
        } else {
          addMessage(intent[lang] || intent.en, 'bot');
        }
        return;
      }
    }

    addLinkMessage(fallback.en, fallback.link);
  }

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    chatInput.value = '';
    setTimeout(() => respondTo(text), 350);
  });
})();
