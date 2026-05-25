document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     NAV MENU TOGGLE
  ========================= */
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  /* =========================
     FEATURED PHOTOS SLIDER
  ========================= */
  const slider = document.querySelector(".featured-slider");
  const slides = document.querySelectorAll(".featured-slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  // STOP if slider doesn't exist (prevents crash)
  if (!slider || slides.length === 0) return;

  let index = 0;

  function showSlide(i) {
    index = (i + slides.length) % slides.length;
    slider.style.transform = `translateX(-${index * 100}%)`;
  }

  function nextSlide() {
    showSlide(index + 1);
  }

  function prevSlide() {
    showSlide(index - 1);
  }

  // Auto slide
  let autoSlide = setInterval(nextSlide, 5000);

  // Buttons
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAuto();
    });

    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAuto();
    });
  }

  function resetAuto() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 5000);
  }

});