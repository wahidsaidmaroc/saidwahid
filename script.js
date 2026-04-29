// ===== Menu mobile =====
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle?.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// ===== Année dynamique footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Animation des barres de compétences au scroll =====
const skillBars = document.querySelectorAll('.bar');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const target = bar.style.width;
      bar.style.width = '0';
      bar.style.transition = 'width 1.2s ease';
      requestAnimationFrame(() => {
        bar.style.width = target;
      });
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.4 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ===== Header au scroll =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('shadow-sm');
  } else {
    header.classList.remove('shadow-sm');
  }
});

// ===== Validation formulaire de contact =====
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

const showError = (field, message) => {
  const errorEl = form.querySelector(`.error[data-for="${field}"]`);
  if (errorEl) errorEl.textContent = message;
};

const clearErrors = () => {
  form.querySelectorAll('.error').forEach(e => e.textContent = '');
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();
  successMsg.classList.add('hidden');

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    subject: form.subject.value.trim(),
    message: form.message.value.trim()
  };

  let valid = true;
  if (data.name.length < 2) {
    showError('name', 'Veuillez entrer votre nom (min. 2 caractères).');
    valid = false;
  }
  if (!validateEmail(data.email)) {
    showError('email', 'Veuillez entrer un email valide.');
    valid = false;
  }
  if (data.subject.length < 3) {
    showError('subject', 'Le sujet doit contenir au moins 3 caractères.');
    valid = false;
  }
  if (data.message.length < 10) {
    showError('message', 'Votre message doit contenir au moins 10 caractères.');
    valid = false;
  }

  if (!valid) return;

  // Simulation d'envoi
  successMsg.classList.remove('hidden');
  form.reset();
  setTimeout(() => successMsg.classList.add('hidden'), 5000);
});
