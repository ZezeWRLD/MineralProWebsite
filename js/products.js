(function () {
  function setActiveSlide(container, activeIndex) {
    const slides = container.querySelectorAll('.slider-img');
    const dots = container.querySelectorAll('.slider-dot');
    if (!slides.length) return;
    const i = ((activeIndex % slides.length) + slides.length) % slides.length;
    slides.forEach((img, idx) => img.classList.toggle('active', idx === i));
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === i));
  }

  function initServiceSlider(container) {
    const slides = container.querySelectorAll('.slider-img');
    if (!slides.length) return;

    let index = 0;
    setActiveSlide(container, 0);

    container.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.addEventListener('click', () => {
        index = i;
        setActiveSlide(container, index);
      });
    });

    setInterval(() => {
      index = (index + 1) % slides.length;
      setActiveSlide(container, index);
    }, 4500);
  }

  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.service-slider .slider-container').forEach(initServiceSlider);

    const form = document.getElementById('contact-form');
    const resetBtn = document.querySelector('.reset-btn');
    if (form && resetBtn) {
      resetBtn.addEventListener('click', () => form.reset());
    }

    const toggleBtn = document.getElementById('toggleQuoteBtn');
    const quoteSection = document.getElementById('quote');
    if (toggleBtn && quoteSection) {
      toggleBtn.addEventListener('click', () => {
        quoteSection.classList.toggle('hidden');
        toggleBtn.textContent = quoteSection.classList.contains('hidden')
          ? 'Request a Quote'
          : 'Close Form';
        if (!quoteSection.classList.contains('hidden')) {
          quoteSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });
})();
