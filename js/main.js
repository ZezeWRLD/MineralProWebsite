// ── MINERAL PRO — SHARED JS ───────────────────────────────

// Mobile menu
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const overlay   = document.getElementById('navOverlay');

  if (!hamburger) return;

  const openMenu = () => {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    navLinks.classList.contains('open') ? closeMenu() : openMenu();
  });
  overlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.nav-links a').forEach(l => l.addEventListener('click', closeMenu));
})();

// Back to top
(function () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.style.display = 'none';
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 350 ? 'grid' : 'none';
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// Scroll-triggered fade-in
(function () {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
})();

// Image slider (generic, works with data-slider)
(function () {
  document.querySelectorAll('[data-slider]').forEach(slider => {
    const imgs  = slider.querySelectorAll('.slide');
    const dots  = slider.querySelectorAll('.slider-dot');
    if (!imgs.length) return;
    let cur = 0;

    const go = i => {
      imgs[cur].classList.remove('active');
      dots[cur]?.classList.remove('active');
      cur = (i + imgs.length) % imgs.length;
      imgs[cur].classList.add('active');
      dots[cur]?.classList.add('active');
    };

    slider.querySelectorAll('[data-prev]').forEach(b => b.addEventListener('click', () => go(cur - 1)));
    slider.querySelectorAll('[data-next]').forEach(b => b.addEventListener('click', () => go(cur + 1)));
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));

    imgs[0].classList.add('active');
    dots[0]?.classList.add('active');
    setInterval(() => go(cur + 1), 4500);
  });
})();

// Contact / Quote form handler
(function () {
  const form = document.getElementById('mpForm');
  if (!form) return;

  // Toggle visibility
  const toggleBtn = document.getElementById('formToggle');
  const formWrap  = document.getElementById('formWrap');
  if (toggleBtn && formWrap) {
    toggleBtn.addEventListener('click', () => {
      const hidden = formWrap.classList.toggle('hidden');
      toggleBtn.textContent = hidden ? toggleBtn.dataset.open : toggleBtn.dataset.close;
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

    // Simulate submission — replace with EmailJS or backend
    setTimeout(() => {
      msg.className = 'form-message success';
      msg.textContent = '✓ Message sent! We will respond within 24 hours.';
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }, 1200);
  });
})();
