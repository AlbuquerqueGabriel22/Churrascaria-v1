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

  const restaurantSlider = document.querySelector(".restaurant-slider");
  if (restaurantSlider) {
    const restaurantSlides = [...restaurantSlider.querySelectorAll(".restaurant-preview-card")];
    const restaurantButtons = [...restaurantSlider.querySelectorAll(".restaurant-slider-button")];
    const restaurantStatus = restaurantSlider.querySelector(".restaurant-slider-status");
    let restaurantIndex = 0;
    let restaurantTimer;

    const showRestaurantSlide = (direction) => {
      const nextIndex = (restaurantIndex + direction + restaurantSlides.length) % restaurantSlides.length;
      if (nextIndex === restaurantIndex) return;
      const currentSlide = restaurantSlides[restaurantIndex];
      currentSlide.classList.remove("is-active");
      currentSlide.classList.add("is-leaving");
      restaurantSlides[nextIndex].classList.add("is-active");
      restaurantSlides[nextIndex].setAttribute("aria-hidden", "false");
      currentSlide.setAttribute("aria-hidden", "true");
      window.setTimeout(() => currentSlide.classList.remove("is-leaving"), 850);
      restaurantIndex = nextIndex;
      if (restaurantStatus) restaurantStatus.innerHTML = `${String(restaurantIndex + 1).padStart(2, "0")} <i>/ 04</i>`;
    };
    const restartRestaurantTimer = () => {
      window.clearInterval(restaurantTimer);
      restaurantTimer = window.setInterval(() => showRestaurantSlide(1), 5200);
    };
    restaurantButtons.forEach((button) => button.addEventListener("click", () => {
      showRestaurantSlide(button.dataset.sliderDirection === "previous" ? -1 : 1);
      restartRestaurantTimer();
    }));
    restartRestaurantTimer();
  }
});

