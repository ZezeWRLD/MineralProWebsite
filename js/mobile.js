document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('mobileMenuToggle');
  const nav = document.getElementById('mainNav');
  
  toggle.addEventListener('click', function() {
    nav.classList.toggle('active');
  });
  
  // Close menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });
});