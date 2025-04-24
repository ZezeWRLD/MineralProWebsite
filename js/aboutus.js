function toggleMore() {
    const moreText = document.getElementById("more-text");
    const btn = document.getElementById("seeMoreBtn");
  
    if (moreText.style.display === "none" || moreText.classList.contains("hidden")) {
      moreText.style.display = "block";
      moreText.classList.remove("hidden");
      btn.textContent = "See Less";
    } else {
      moreText.style.display = "none";
      btn.textContent = "See More";
    }
  }
 
  window.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector(".section-video");
    if (video) {
      video.playbackRate = 0.75; // 
    }
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
