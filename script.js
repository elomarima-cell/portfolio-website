const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const revealElements = document.querySelectorAll(".reveal, .card");
const contactForm = document.querySelector(".contact-form");
const yearSpan = document.getElementById("year");
const siteHeader = document.querySelector(".site-header");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    navLinks.classList.remove("open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

const revealOnScroll = () => {
  if (siteHeader) {
    siteHeader.classList.toggle("scrolled", window.scrollY > 24);
  }
};

window.addEventListener("scroll", revealOnScroll, { passive: true });
window.addEventListener("load", () => {
  revealOnScroll();
});

if (prefersReducedMotion) {
  revealElements.forEach((element) => element.classList.add("visible"));
} else if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Thanks for reaching out. I will get back to you shortly.");
    contactForm.reset();
  });
}
