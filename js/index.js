const slides = document.querySelectorAll('.slider-img');
const dots = document.querySelectorAll('.dot');
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function goToSlide(index) {
  current = index;
  showSlide(current);
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);

// Show the first slide on load
showSlide(current);
const backToTopBtn = document.getElementById("backToTop");

  // Show button after user scrolls down 100px
  window.onscroll = function () {
    backToTopBtn.style.display = window.scrollY > 100 ? "block" : "none";
  };

  // Scroll smoothly to the top
  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });