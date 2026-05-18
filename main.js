// ================================
// OD1SHOTS MAIN JS (PRODUCTION)
// ================================

document.addEventListener("DOMContentLoaded", () => {

  // ================================
  // MOBILE NAV TOGGLE
  // ================================
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }


  // ================================
  // FEATURED PHOTOS SLIDER
  // ================================
  // IMPORTANT: Your HTML must use class="featured-slider"

  const slider = document.querySelector(".featured-slider");

  if (slider) {
    const slides = slider.querySelectorAll("img");
    let currentIndex = 0;

    // Create arrows (if not already in HTML)
    const prevBtn = document.createElement("button");
    const nextBtn = document.createElement("button");

    prevBtn.className = "slider-btn prev";
    nextBtn.className = "slider-btn next";

    prevBtn.innerHTML = "‹";
    nextBtn.innerHTML = "›";

    slider.appendChild(prevBtn);
    slider.appendChild(nextBtn);

    function showSlide(index) {
      slides.forEach((img, i) => {
        img.classList.remove("active");
        if (i === index) {
          img.classList.add("active");
        }
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex =
        (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    }

    // Auto slide
    let autoSlide = setInterval(nextSlide, 4000);

    // Buttons
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAutoSlide();
    });

    function resetAutoSlide() {
      clearInterval(autoSlide);
      autoSlide = setInterval(nextSlide, 4000);
    }

    // Init first slide
    showSlide(currentIndex);
  }


  // ================================
  // BOOKING MODAL FIX
  // ================================
  const bookBtn = document.getElementById("bookBtn");
  const modal = document.querySelector(".booking-modal");
  const closeBtn = document.querySelector(".close-modal");

  if (bookBtn && modal) {
    bookBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("active");
      document.body.style.overflow = "hidden"; // prevent scroll
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  }

  // Close when clicking outside modal
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  }


  // ================================
  // SAFETY CHECK (DEBUG)
  // ================================
  console.log("OD1Shots JS Loaded Successfully ✅");

});