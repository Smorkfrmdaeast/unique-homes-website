/* =========================================
   UNIQUE HOMES - Premium Fragrance Website
   script.js
   -----------------------------------------
   This file contains all JavaScript for the
   UNIQUE HOMES website, including:
   - Smooth scroll functionality
   - Interactive button actions
   - Future interactive effects for products
   ========================================= */

/* Smooth Scroll Function */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

/* Optional: Add hover effect for future interactive product cards */
document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
    });
  });
});
