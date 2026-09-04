document.addEventListener("DOMContentLoaded", () => {
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dots = [...document.querySelectorAll(".slide-dot")];
  const revealItems = document.querySelectorAll(".reveal");
  const recipeItems = document.querySelectorAll(".reveal-recipe");
  const recipeFilters = document.querySelectorAll(".recipe-filter");
  const filterEmpty = document.querySelector(".filter-empty");
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

  const recipeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting));
  }, { threshold: 0.22 });
  recipeItems.forEach((item) => recipeObserver.observe(item));

  recipeFilters.forEach((filterButton) => filterButton.addEventListener("click", () => {
    const selectedCategory = filterButton.dataset.filter;
    let visibleItems = 0;
    recipeFilters.forEach((button) => {
      const isSelected = button === filterButton;
      button.classList.toggle("is-active", isSelected);
      button.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });
    recipeItems.forEach((item) => {
      const shouldShow = selectedCategory === "todos" || item.dataset.category === selectedCategory;
      item.hidden = !shouldShow;
      if (shouldShow) {
        visibleItems += 1;
        item.classList.remove("is-visible");
        window.requestAnimationFrame(() => item.classList.add("is-visible"));
      }
    });
    if (filterEmpty) filterEmpty.hidden = visibleItems > 0;
  }));
});

