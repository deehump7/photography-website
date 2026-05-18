// ================= NAV TOGGLE =================
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  const isOpen = navLinks.classList.contains("active");
  menuBtnIcon.setAttribute(
    "class",
    isOpen ? "ri-close-line" : "ri-menu-3-line"
  );
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("active");
  menuBtnIcon.setAttribute("class", "ri-menu-3-line");
});


// ================= BOOKING MODAL =================
const bookBtn = document.getElementById("bookBtn");
const bookingModal = document.getElementById("bookingModal");
const modal = document.getElementById("bookingModal");
const closeBtn = document.querySelector(".close-btn");

bookBtn.addEventListener("click", () => {
  bookingModal.classList.add("active");
  document.body.style.overflow ="hidden";
});

closeBtn.addEventListener("click", () =>{
  bookingModal.classList.remove("active");
  document.body.style.overflow = "auto";
});

openBtn.onclick = () => {
  modal.style.display = "block";
};

closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};


// ================= SLIDER =================
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach(s => s.style.display = "none");
  slideIndex = (index + slides.length) % slides.length;
  slides[slideIndex].style.display = "block";
}

function nextSlide() {
  showSlide(slideIndex + 1);
}

function prevSlide() {
  showSlide(slideIndex - 1);
}

document.querySelector(".next").onclick = nextSlide;
document.querySelector(".prev").onclick = prevSlide;

setInterval(() => {
  nextSlide();
}, 5000);

showSlide(slideIndex);