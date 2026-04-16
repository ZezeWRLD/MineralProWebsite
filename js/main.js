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

// ── 7. CONTACT / QUOTE FORM HANDLER ───────────────────────
(function () {
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

  // Submission
  form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('formMsg');
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    // Replace setTimeout with real EmailJS/fetch call when ready
    setTimeout(() => {
      if (msg) {
        msg.className = 'form-message success';
        msg.textContent = '✓ Message sent! We will respond within 24 hours.';
      }
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }, 1200);
  });
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
