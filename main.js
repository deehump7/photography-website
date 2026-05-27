document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     NAV MENU
  ========================= */
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  document.querySelectorAll(".nav__links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });


  /* =========================
     FEATURED SLIDER
  ========================= */
  const slider = document.querySelector(".featured-slider");
  const slides = document.querySelectorAll(".featured-slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  if (!slider || slides.length === 0) {
    console.error("Slider not found");
    return;
  }

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

  nextBtn?.addEventListener("click", nextSlide);
  prevBtn?.addEventListener("click", prevSlide);

  setInterval(nextSlide, 5000);

  showSlide(0);

});