/* ANAM AI STUDIO — script.js v6 Premium */
'use strict';

/* ── Loader ── */
window.addEventListener('load',()=>{
  const l=document.getElementById('loader');
  if(l)setTimeout(()=>l.classList.add('done'),700);
});

/* ── Progress bar ── */
window.addEventListener('scroll',()=>{
  const p=document.getElementById('progress');
  if(p){const h=document.documentElement;
    p.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';}
},{passive:true});

/* ── Nav scroll + active links ── */
const nav=document.getElementById('nav');
const onScroll=()=>{
  if(!nav)return;
  nav.classList.toggle('scrolled',window.scrollY>40);
  document.getElementById('top-btn')?.classList.toggle('show',window.scrollY>420);
  let cur='';
  document.querySelectorAll('section[id]').forEach(s=>{
    if(window.scrollY>=s.offsetTop-130)cur=s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.classList.toggle('active',a.getAttribute('href')==='#'+cur);
  });
};
window.addEventListener('scroll',onScroll,{passive:true});
onScroll();

/* ── Mobile Drawer ── */
const burger=document.getElementById('burger');
const drawer=document.getElementById('drawer');
const doverlay=document.getElementById('doverlay');
const openD=()=>{
  burger.classList.add('open');
  drawer.classList.add('open');
  doverlay.classList.add('on');
  document.body.style.overflow='hidden';
  burger.setAttribute('aria-expanded','true');
};
const closeD=()=>{
  burger.classList.remove('open');
  drawer.classList.remove('open');
  doverlay.classList.remove('on');
  document.body.style.overflow='';
  burger.setAttribute('aria-expanded','false');
};
burger?.addEventListener('click',()=>drawer.classList.contains('open')?closeD():openD());
document.getElementById('drawer-close')?.addEventListener('click',closeD);
doverlay?.addEventListener('click',closeD);
drawer?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeD));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeD();});

/* ── Theme Toggle ── */
const applyTheme=m=>{
  document.body.classList.toggle('light',m==='light');
  const i=document.getElementById('theme-icon');
  if(i)i.textContent=m==='light'?'☀️':'🌙';
  localStorage.setItem('aas-theme',m);
};
applyTheme(localStorage.getItem('aas-theme')||'dark');
document.getElementById('theme-btn')?.addEventListener('click',()=>
  applyTheme(document.body.classList.contains('light')?'dark':'light'));

/* ── Scroll Reveal ── */
const ro=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('on');
      ro.unobserve(e.target);
    }
  });
},{threshold:0.10,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>ro.observe(el));

/* ── Counter Animation ── */
const co=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target;
    const end=parseInt(el.dataset.count);
    let cur=0;
    const dur=1800;
    const step=end/(dur/16);
    const tick=()=>{
      cur=Math.min(cur+step,end);
      el.textContent=Math.floor(cur).toLocaleString();
      if(cur<end)requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    co.unobserve(el);
  });
},{threshold:0.5});
document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));

/* ── Skill Bars ── */
const so=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    e.target.querySelectorAll('.sk-fill').forEach(b=>{
      b.style.width=b.dataset.w||'0%';
    });
    so.unobserve(e.target);
  });
},{threshold:0.3});
document.querySelectorAll('.sk-sect,.about-layout').forEach(el=>so.observe(el));

/* ── Pricing Tabs ── */
document.querySelectorAll('.ptab').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.ptab').forEach(b=>{
      b.classList.remove('active');
      b.setAttribute('aria-selected','false');
    });
    document.querySelectorAll('.price-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    btn.setAttribute('aria-selected','true');
    const panel=document.getElementById('tab-'+btn.dataset.tab);
    if(panel)panel.classList.add('active');
  });
});

/* ── Portfolio Filters + Lightbox ── */
const pfData={
  'resume':['Professional ATS Resume','ATS-optimized single-page resume for fresh graduate. Keyword-rich and recruiter-ready.'],
  'design':['Modern Certificate Design','Premium certificate for a training institute. Print-ready with editable template.'],
  'office':['Excel Dashboard','Sales tracking dashboard with charts, formulas and automated summaries.'],
  'data':['Google Sheets Project','Complete data entry for an e-commerce store. 500+ records cleaned and organized.'],
};
document.querySelectorAll('.pf-filter').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.pf-filter').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    document.querySelectorAll('.pf-card').forEach(c=>{
      const show=f==='all'||c.dataset.cat===f;
      c.classList.toggle('hidden',!show);
    });
  });
});
const lb=document.getElementById('lb');
const lbContent=document.getElementById('lb-content');
document.querySelectorAll('.pf-card').forEach(card=>{
  card.addEventListener('click',()=>{
    const title=card.querySelector('.pf-title')?.textContent||'';
    const desc=card.querySelector('.pf-desc')?.textContent||'';
    const cat=card.querySelector('.pf-cat')?.textContent||'';
    const tools=[...card.querySelectorAll('.pf-tool')].map(t=>t.textContent).join(', ');
    if(lbContent)lbContent.innerHTML=`
      <h3 style="font-size:20px;font-weight:700;margin-bottom:8px;color:var(--txt)">${title}</h3>
      <p style="font-size:12px;font-weight:700;color:var(--p1);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:12px">${cat}</p>
      <p style="font-size:14px;color:var(--txt2);line-height:1.75;margin-bottom:16px">${desc}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px">${tools.split(', ').map(t=>`<span class="pf-tool">${t}</span>`).join('')}</div>
      <a href="https://wa.me/923166687805?text=Hi!%20I%20want%20a%20similar%20project%3A%20${encodeURIComponent(title)}" target="_blank" class="btn btn-p btn-sm"><i class="fab fa-whatsapp"></i>Order Similar</a>`;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  });
});
const closeLb=()=>{
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
};
document.getElementById('lb-close')?.addEventListener('click',closeLb);
lb?.addEventListener('click',e=>{if(e.target===lb)closeLb();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&lb?.classList.contains('open'))closeLb();});

/* ── AI Tools Search + Filter ── */
let activeCat='all';
const toolItems=document.querySelectorAll('.tool-item');
const noTools=document.getElementById('no-tools');
const filterTools=()=>{
  const q=(document.getElementById('tool-search')?.value||'').toLowerCase().trim();
  let visible=0;
  toolItems.forEach(item=>{
    const cat=item.dataset.cat||'';
    const name=item.querySelector('.ti-name')?.textContent.toLowerCase()||'';
    const desc=item.querySelector('.ti-desc')?.textContent.toLowerCase()||'';
    const catMatch=activeCat==='all'||cat===activeCat;
    const searchMatch=!q||name.includes(q)||desc.includes(q)||cat.includes(q);
    const show=catMatch&&searchMatch;
    item.classList.toggle('hide',!show);
    if(show)visible++;
  });
  if(noTools)noTools.classList.toggle('show',visible===0);
};
document.querySelectorAll('.tc-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.tc-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    activeCat=btn.dataset.cat||'all';
    filterTools();
  });
});
document.getElementById('tool-search')?.addEventListener('input',filterTools);

/* ── Testimonials Slider with Dots ── */
let tIdx=0;
const tTrack=document.getElementById('testi-track');
const dotsCont=document.getElementById('s-dots');
const perView=()=>window.innerWidth<768?1:window.innerWidth<1100?2:3;

const buildDots=()=>{
  if(!tTrack||!dotsCont)return;
  const total=tTrack.querySelectorAll('.testi-card').length;
  const pv=perView();
  const count=Math.max(1,total-pv+1);
  dotsCont.innerHTML='';
  for(let i=0;i<count;i++){
    const d=document.createElement('button');
    d.className='s-dot'+(i===tIdx?' active':'');
    d.setAttribute('aria-label',`Go to slide ${i+1}`);
    d.addEventListener('click',()=>slideTo(i));
    dotsCont.appendChild(d);
  }
};
const slideTo=i=>{
  if(!tTrack)return;
  const cards=tTrack.querySelectorAll('.testi-card');
  const pv=perView();
  const max=Math.max(0,cards.length-pv);
  tIdx=Math.max(0,Math.min(i,max));
  const cw=(tTrack.parentElement.offsetWidth+22)/pv;
  tTrack.style.transform=`translateX(-${tIdx*cw}px)`;
  document.querySelectorAll('.s-dot').forEach((d,i)=>{
    d.classList.toggle('active',i===tIdx);
  });
};
document.getElementById('t-prev')?.addEventListener('click',()=>slideTo(tIdx-1));
document.getElementById('t-next')?.addEventListener('click',()=>slideTo(tIdx+1));
window.addEventListener('resize',()=>{buildDots();slideTo(tIdx);});
buildDots();

/* Auto advance */
let tAuto=setInterval(()=>{
  if(!tTrack)return;
  const max=tTrack.querySelectorAll('.testi-card').length-perView();
  slideTo(tIdx>=max?0:tIdx+1);
},5000);
tTrack?.addEventListener('mouseenter',()=>clearInterval(tAuto));
tTrack?.addEventListener('mouseleave',()=>{
  tAuto=setInterval(()=>{
    const max=tTrack.querySelectorAll('.testi-card').length-perView();
    slideTo(tIdx>=max?0:tIdx+1);
  },5000);
});

/* ── FAQ Accordion ── */
document.querySelectorAll('.faq-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const item=btn.closest('.faq-item');
    const ans=item.querySelector('.faq-ans');
    const isOpen=item.classList.contains('open');
    /* Close all */
    document.querySelectorAll('.faq-item').forEach(i=>{
      i.classList.remove('open');
      i.querySelector('.faq-ans').style.maxHeight=null;
      i.querySelector('.faq-btn').setAttribute('aria-expanded','false');
    });
    if(!isOpen){
      item.classList.add('open');
      ans.style.maxHeight=ans.scrollHeight+'px';
      btn.setAttribute('aria-expanded','true');
    }
  });
});

/* ── Newsletter ── */
document.getElementById('nl-form')?.addEventListener('submit',e=>{
  e.preventDefault();
  const inp=e.target.querySelector('input');
  const ok=document.getElementById('nl-ok');
  if(!inp.value){inp.focus();return;}
  if(ok){ok.style.display='block';}
  const btn=e.target.querySelector('button');
  if(btn){btn.textContent='✓ Subscribed!';btn.style.background='#22C55E';}
  inp.value='';
  setTimeout(()=>{
    if(btn){btn.textContent='Subscribe';btn.style.background='';}
    if(ok)ok.style.display='none';
  },4000);
});

/* ── Contact Form (Web3Forms) ── */
document.getElementById('contact-form')?.addEventListener('submit',async e=>{
  e.preventDefault();
  const btn=e.target.querySelector('.submit-btn');
  const ok=document.getElementById('form-ok');
  if(btn){btn.textContent='Sending…';btn.disabled=true;}
  try{
    const r=await fetch('https://api.web3forms.com/submit',{
      method:'POST',
      body:new FormData(e.target)
    });
    const j=await r.json();
    if(j.success){
      e.target.style.display='none';
      if(ok)ok.style.display='block';
    }else{
      if(btn){btn.textContent='Try Again';btn.disabled=false;}
    }
  }catch{
    if(btn){btn.textContent='Try Again';btn.disabled=false;}
  }
});

/* ── Back To Top ── */
document.getElementById('top-btn')?.addEventListener('click',()=>{
  window.scrollTo({top:0,behavior:'smooth'});
});

/* ── Smooth Anchors ── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(id==='#')return;
    const target=document.querySelector(id);
    if(target){
      e.preventDefault();
      const offset=target.getBoundingClientRect().top+window.scrollY-80;
      window.scrollTo({top:offset,behavior:'smooth'});
    }
  });
});

/* ── Lazy load images (IntersectionObserver) ── */
const imgObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const img=e.target;
      if(img.dataset.src){img.src=img.dataset.src;delete img.dataset.src;}
      imgObs.unobserve(img);
    }
  });
},{rootMargin:'200px'});
document.querySelectorAll('img[loading="lazy"]').forEach(img=>imgObs.observe(img));
