document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     NAV — mobile toggle + scroll shrink
  ========================= */
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  const nav = document.getElementById("main-nav");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuBtn.querySelector("i").classList.toggle("ri-menu-3-line");
      menuBtn.querySelector("i").classList.toggle("ri-close-line");
    });

    document.querySelectorAll(".nav__links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.querySelector("i").classList.add("ri-menu-3-line");
        menuBtn.querySelector("i").classList.remove("ri-close-line");
      });
    });
  }

  /* =========================
     FEATURED SLIDER — FIXED
     Slides are now direct children of .featured-slider
  ========================= */
  const slider = document.querySelector(".featured-slider");
  const slides = document.querySelectorAll(".featured-slide");
  const nextBtn = document.querySelector(".slider-btn.next");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const dotsContainer = document.getElementById("slider-dots");

  if (!slider || slides.length === 0) {
    console.warn("Slider: no slides found.");
  } else {
    let currentIndex = 0;
    let autoplayTimer = null;

    // Build dots
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "slider-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsContainer?.appendChild(dot);
    });

    function updateDots(i) {
      document.querySelectorAll(".slider-dot").forEach((d, idx) => {
        d.classList.toggle("active", idx === i);
      });
    }

    function goTo(i) {
      currentIndex = ((i % slides.length) + slides.length) % slides.length;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots(currentIndex);
    }

    function startAutoplay() {
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => goTo(currentIndex + 1), 5000);
    }

    function resetAutoplay() {
      startAutoplay();
    }

    nextBtn?.addEventListener("click", () => { goTo(currentIndex + 1); resetAutoplay(); });
    prevBtn?.addEventListener("click", () => { goTo(currentIndex - 1); resetAutoplay(); });

    // Touch/swipe support
    let touchStartX = 0;
    slider.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener("touchend", e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1); resetAutoplay(); }
    }, { passive: true });

    goTo(0);
    startAutoplay();
  }

  /* =========================
     SCROLL REVEAL
  ========================= */
  const revealEls = document.querySelectorAll(
    ".about__container, .service__card, .video__card, .portfolio__grid, .contact__container, .featured__header"
  );

  revealEls.forEach(el => el.classList.add("reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children if they're cards
        const cards = entry.target.querySelectorAll(".service__card, .video__card");
        if (cards.length > 0) {
          cards.forEach((card, idx) => {
            setTimeout(() => card.classList.add("visible"), idx * 100);
          });
        }
        setTimeout(() => entry.target.classList.add("visible"), 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  // Also observe individual service cards
  document.querySelectorAll(".service__card, .video__card").forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
  });

  /* =========================
     CONTACT FORM
  ========================= */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type='submit']");
      btn.textContent = "Sending...";
      btn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });

        if (res.ok) {
          status.textContent = "Message sent! I'll be in touch soon.";
          form.reset();
        } else {
          status.textContent = "Something went wrong. Please email me directly.";
        }
      } catch {
        status.textContent = "Network error. Please try again.";
      } finally {
        btn.textContent = "Send Message";
        btn.disabled = false;
      }
    });
  }

  /* =========================
     COPYRIGHT YEAR
  ========================= */
  const yearEl = document.getElementById("copy-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});