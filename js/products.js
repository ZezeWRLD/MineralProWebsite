// ── MINERAL PRO — PRODUCTS / SERVICES PAGE JS ─────────────

(function () {
  // ── SERVICE SLIDER ──────────────────────────────────────
  function setActiveSlide(container, activeIndex) {
    const slides = container.querySelectorAll('.slider-img');
    const dots   = container.querySelectorAll('.slider-dot');
    if (!slides.length) return;
    const i = ((activeIndex % slides.length) + slides.length) % slides.length;
    slides.forEach((img, idx) => img.classList.toggle('active', idx === i));
    dots.forEach((dot, idx)   => dot.classList.toggle('active', idx === i));
  }

  function initServiceSlider(container) {
    const slides = container.querySelectorAll('.slider-img');
    if (!slides.length) return;
    let index = 0;
    let timer;

    setActiveSlide(container, 0);

    container.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(timer);
        index = i;
        setActiveSlide(container, index);
        startTimer();
      });
    });

    const startTimer = () => {
      timer = setInterval(() => {
        index = (index + 1) % slides.length;
        setActiveSlide(container, index);
      }, 4500);
    };

    // Pause on hover
    container.addEventListener('mouseenter', () => clearInterval(timer));
    container.addEventListener('mouseleave', startTimer);

    startTimer();
  }

  // ── QUOTE FORM TOGGLE ──────────────────────────────────
  function initQuoteToggle() {
    const toggleBtn    = document.getElementById('toggleQuoteBtn');
    const quoteSection = document.getElementById('quote');
    if (!toggleBtn || !quoteSection) return;

    toggleBtn.addEventListener('click', () => {
      const isHidden = quoteSection.classList.toggle('hidden');
      toggleBtn.textContent = isHidden ? 'Request a Quote' : 'Close Form';
      if (!isHidden) {
        const navbar = document.querySelector('.navbar');
        const offset = (navbar?.offsetHeight || 72) + 16;
        const top = quoteSection.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }

  // ── FORM RESET ────────────────────────────────────────
  function initFormReset() {
    const form     = document.getElementById('contact-form');
    const resetBtn = document.querySelector('.reset-btn');
    if (form && resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        const msg = document.getElementById('formMsg');
        if (msg) { msg.className = 'form-message'; msg.textContent = ''; }
      });
    }
  }

  // ── CONTENT CARDS REVEAL ──────────────────────────────
  function initCardReveal() {
    const cards = document.querySelectorAll('.content-card, .service-category');
    if (!cards.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    cards.forEach(c => {
      c.setAttribute('data-reveal', '');
      obs.observe(c);
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.service-slider .slider-container').forEach(initServiceSlider);
    initQuoteToggle();
    initFormReset();
    initCardReveal();
  });
})();
