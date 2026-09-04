document.addEventListener("DOMContentLoaded", () => {
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dots = [...document.querySelectorAll(".slide-dot")];
  const revealItems = document.querySelectorAll(".reveal");
  let currentSlide = 0;
  let timer;

  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === currentSlide));
    dots.forEach((dot, dotIndex) => { dot.classList.toggle("is-active", dotIndex === currentSlide); dot.setAttribute("aria-current", dotIndex === currentSlide ? "true" : "false"); });
  };
  const restartTimer = () => { window.clearInterval(timer); timer = window.setInterval(() => showSlide(currentSlide + 1), 6500); };
  dots.forEach((dot, index) => dot.addEventListener("click", () => { showSlide(index); restartTimer(); }));
  showSlide(0);
  restartTimer();

  const revealObserver = new IntersectionObserver((entries, observer) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }); }, { threshold: 0.14 });
  revealItems.forEach((item) => revealObserver.observe(item));
});

