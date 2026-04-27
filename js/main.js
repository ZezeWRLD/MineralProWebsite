// ── MINERAL PRO ENTERPRISE — MAIN JS (PREMIUM EDITION) ────

// ── 1. NAVBAR: scroll shrink + active link ─────────────────
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // init

  // Mark active nav link
  const links = document.querySelectorAll('.nav-links a');
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(l => {
    const href = l.getAttribute('href')?.split('#')[0] || '';
    if (href === current || (current === '' && href === 'index.html')) {
      l.classList.add('active');
    }
  });
})();

// ── 2. MOBILE MENU ─────────────────────────────────────────
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const overlay   = document.getElementById('navOverlay');
  if (!hamburger) return;

  const openMenu = () => {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  };
  const closeMenu = () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () =>
    navLinks.classList.contains('open') ? closeMenu() : openMenu()
  );
  overlay?.addEventListener('click', closeMenu);
  document.querySelectorAll('.nav-links a').forEach(l =>
    l.addEventListener('click', closeMenu)
  );
  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) closeMenu();
  });
})();

// ── 3. BACK TO TOP ─────────────────────────────────────────
(function () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.style.display = 'none';
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 350 ? 'grid' : 'none';
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ── 4. SCROLL REVEAL (data-reveal + data-reveal-stagger) ───
(function () {
  // Single elements
  const singles = document.querySelectorAll('[data-reveal]');
  // Stagger containers
  const staggers = document.querySelectorAll('[data-reveal-stagger]');

  if (!singles.length && !staggers.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

  singles.forEach(el => obs.observe(el));
  staggers.forEach(el => obs.observe(el));
})();

// ── 5. ANIMATED NUMBER COUNTERS ────────────────────────────
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  const animateCounter = (el) => {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const duration = parseInt(el.dataset.duration || 1800);
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const start    = performance.now();

    const tick = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = easeOut(progress) * target;
      el.textContent = prefix + value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target.toFixed(decimals) + suffix;
    };
    requestAnimationFrame(tick);
  };

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => obs.observe(el));
})();

// ── 6. GENERIC IMAGE SLIDER (data-slider) ─────────────────
(function () {
  document.querySelectorAll('[data-slider]').forEach(slider => {
    const imgs = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.slider-dot');
    if (!imgs.length) return;
    let cur = 0;
    let timer;

    const go = i => {
      imgs[cur].classList.remove('active');
      dots[cur]?.classList.remove('active');
      cur = (i + imgs.length) % imgs.length;
      imgs[cur].classList.add('active');
      dots[cur]?.classList.add('active');
    };

    const startAuto = () => { timer = setInterval(() => go(cur + 1), 4500); };
    const stopAuto  = () => clearInterval(timer);

    slider.querySelectorAll('[data-prev]').forEach(b =>
      b.addEventListener('click', () => { stopAuto(); go(cur - 1); startAuto(); })
    );
    slider.querySelectorAll('[data-next]').forEach(b =>
      b.addEventListener('click', () => { stopAuto(); go(cur + 1); startAuto(); })
    );
    dots.forEach((d, i) => d.addEventListener('click', () => {
      stopAuto(); go(i); startAuto();
    }));

    imgs[0].classList.add('active');
    dots[0]?.classList.add('active');
    startAuto();
  });
})();

// ── 7. CONTACT / QUOTE FORM HANDLER (EmailJS) ─────────────
(function () {
  // ┌─────────────────────────────────────────────────────────┐
  // │  EMAILJS CONFIGURATION                                  │
  // │  1. Sign up at https://www.emailjs.com (free tier:      │
  // │     200 emails/month)                                   │
  // │  2. Create an Email Service (Gmail → info.mineral…)     │
  // │  3. Create a template using the variables listed below  │
  // │  4. Replace the three placeholder strings below         │
  // └─────────────────────────────────────────────────────────┘
  const EMAILJS_PUBLIC_KEY  = 'naIXJdfWn1gMeIRPJ';   // Account → API Keys
  const EMAILJS_SERVICE_ID  = 'service_2lt1p5o';   // Email Services tab
  const EMAILJS_TEMPLATE_ID = 'template_vej2gza';  // Email Templates tab

  // Template variables available in your EmailJS template:
  //   {{from_name}}     – sender's full name
  //   {{company}}       – sender's company / organisation
  //   {{from_email}}    – sender's email address
  //   {{phone}}         – sender's phone number (optional)
  //   {{service}}       – selected service area
  //   {{message}}       – enquiry message body
  //   {{to_email}}      – destination (info.mineralproptyltd@gmail.com)
  //   {{sent_at}}       – human-readable date/time of submission
  //   {{reply_to}}      – same as from_email, for one-click reply

  // Initialise EmailJS once
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  const form = document.getElementById('mpForm');
  if (!form) return;

  // Toggle visibility
  const toggleBtn = document.getElementById('formToggle');
  const formWrap  = document.getElementById('formWrap');
  if (toggleBtn && formWrap) {
    toggleBtn.addEventListener('click', () => {
      const hidden = formWrap.classList.toggle('hidden');
      toggleBtn.textContent = hidden
        ? (toggleBtn.dataset.open  || 'Request a Quote')
        : (toggleBtn.dataset.close || 'Close Form');
      if (!hidden) formWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // ── Submission ─────────────────────────────────────────────
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const msg = document.getElementById('formMsg');
    const btn = form.querySelector('[type="submit"]');

    // Show loading state
    btn.disabled = true;
    const originalLabel = btn.innerHTML;
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
           style="width:18px;height:18px;animation:spin .8s linear infinite">
        <path d="M12 2a10 10 0 0 1 10 10"/>
      </svg>
      Sending…`;

    // Collect form data
    const data = Object.fromEntries(new FormData(form));

    const templateParams = {
      from_name  : data['fname']  || data['name'] || '—',
      company    : data['company']                    || '—',
      from_email : data['email']                      || '—',
      phone      : data['phone']                      || '—',
      service    : data['service']                    || 'General Enquiry',
      message    : data['enquiry']   || data['message'] || '—',
      to_email   : 'info.mineralproptyltd@gmail.com',
      reply_to   : data['email']                      || '',
      sent_at    : new Date().toLocaleString('en-ZA', {
                     dateStyle: 'long', timeStyle: 'short'
                   }),
    };

    try {
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS SDK not loaded. Add the script tag to your HTML <head>.');
      }

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

      if (msg) {
        msg.className = 'form-message success';
        msg.innerHTML = '✓ &nbsp;Message sent! We will respond within 24 hours.';
      }
      form.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      if (msg) {
        msg.className = 'form-message error';
        msg.innerHTML =
          '✕ &nbsp;Sending failed — please email us directly at ' +
          '<a href="mailto:info.mineralproptyltd@gmail.com">info.mineralproptyltd@gmail.com</a>.';
      }
    } finally {
      btn.disabled = false;
      btn.innerHTML = originalLabel;
    }
  });

  // Spin animation for loading icon
  const style = document.createElement('style');
  style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
  document.head.appendChild(style);
})();

// ── 8. SMOOTH ANCHOR SCROLL (offset for sticky navbar) ────
(function () {
  const navbar = document.querySelector('.navbar');
  document.querySelectorAll('a[href*="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const hash = link.getAttribute('href').split('#')[1];
      if (!hash) return;
      const target = document.getElementById(hash);
      if (!target) return;
      e.preventDefault();
      const offset = (navbar?.offsetHeight || 72) + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

// ── 9. HERO STATS PARALLAX (subtle) ───────────────────────
(function () {
  const hero = document.querySelector('.hero');
  const bg   = hero?.querySelector('.hero-bg-img');
  if (!hero || !bg) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled > window.innerHeight) return;
    bg.style.transform = `scale(1.05) translateY(${scrolled * 0.15}px)`;
  }, { passive: true });
})();