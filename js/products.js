function showSlide(sliderId, index) {
  const container = document.querySelector(`.slider-container[data-slider-id="${sliderId}"]`);
  const slides = container.querySelectorAll('.slider-img');
  const dots = container.querySelectorAll('.dot');

  slides.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function startSlider(sliderId) {
  const container = document.querySelector(`.slider-container[data-slider-id="${sliderId}"]`);
  const slides = container.querySelectorAll('.slider-img');
  let index = 0;

  showSlide(sliderId, index); // Show the first slide

  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(sliderId, index);
  }, 3000); // Change every 3 seconds
}

// Start sliders on page load
window.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.slider-container');
  sliders.forEach(slider => {
    const id = slider.getAttribute('data-slider-id');
    startSlider(id);
  });
});
const backToTopBtn = document.getElementById("backToTop");

  // Show button after user scrolls down 100px
  window.onscroll = function () {
    backToTopBtn.style.display = window.scrollY > 100 ? "block" : "none";
  };

  // Scroll smoothly to the top
  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  const form = document.getElementById('contact-form');
  const resetBtn = document.querySelector('.reset-btn');

  resetBtn.addEventListener('click', () => {
    form.reset(); // This is optional since <button type="reset"> does this automatically
    // You can also reset error messages, highlight borders, etc., here if needed
  });