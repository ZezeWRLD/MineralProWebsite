const backToTopBtn = document.getElementById("backToTop");

  // Show button after user scrolls down 100px
  window.onscroll = function () {
    backToTopBtn.style.display = window.scrollY > 100 ? "block" : "none";
  };

  // Scroll smoothly to the top
  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

// EmailJS init
/*emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your public key

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const message = document.getElementById("form-message");
  let valid = true;

  // Form field validations
  const fields = form.querySelectorAll(".form-input");
  fields.forEach((field) => {
    const errorMsg = field.nextElementSibling;
    if (field.value.trim() === "" || (field.type === "email" && !/\S+@\S+\.\S+/.test(field.value))) {
      field.style.borderColor = "red";
      field.placeholder = "Field is required or format is incorrect";
      valid = false;
    } else {
      field.style.borderColor = "green";
    }
  });

  if (!valid) {
    message.textContent = "Please fix the errors above.";
    message.className = "form-message error";
    return;
  }

  const formData = {
    firstname: form.firstname.value,
    lastname: form.lastname.value,
    company: form.company.value,
    phone: form.phone.value,
    email: form.email.value,
    enquiry: form.enquiry.value,
  };

  emailjs
    .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
    .then(() => {
      message.textContent = "Message sent successfully!";
      message.className = "form-message success";
      form.reset();
      fields.forEach((field) => (field.style.borderColor = ""));
    })
    .catch((error) => {
      message.textContent = "Failed to send message. Try again later.";
      message.className = "form-message error";
      console.error("EmailJS error:", error);
    });
}); */

const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const inputs = document.querySelectorAll('.form-input');

form.addEventListener('reset', () => {
  // Clear any custom messages
  formMessage.textContent = '';
  
  // Remove input highlights (e.g., red/green borders)
  inputs.forEach(input => {
    input.classList.remove('input-error', 'input-success');
  });
});

const toggleBtn = document.getElementById('toggleQuoteBtn');
  const quoteSection = document.getElementById('contactForm');

  toggleBtn.addEventListener('click', () => {
    quoteSection.classList.toggle('hidden');
    toggleBtn.textContent = quoteSection.classList.contains('hidden')
      ? 'Enquire'
      : 'Close Form';

    // Scroll to form when shown
    if (!quoteSection.classList.contains('hidden')) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
