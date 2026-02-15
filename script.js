/* =========================================
   UNIQUE HOMES - Premium Fragrance Website
   script.js
   -----------------------------------------
   This JavaScript file handles interactive features:
   1. Navbar background change on scroll
   2. Floating WhatsApp chat button
   3. Smooth scroll (optional)
   ========================================= */

// Sticky Navbar Background Change on Scroll
window.addEventListener("scroll", function() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(0, 0, 0, 0.95)";
  } else {
    navbar.style.background = "#000";
  }
});

// Floating WhatsApp Button
const whatsappButton = document.createElement("a");
whatsappButton.href = "https://wa.me/2348105425746?text=Hi%20I%20want%20to%20place%20an%20order";
whatsappButton.target = "_blank";
whatsappButton.className = "whatsapp-float";
whatsappButton.innerHTML = "💬 WhatsApp";
document.body.appendChild(whatsappButton);

// WhatsApp Button Styling (JS version, optional if not in CSS)
const style = document.createElement("style");
style.innerHTML = `
.whatsapp-float {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #25D366;
  color: #fff;
  font-weight: bold;
  padding: 15px 20px;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  z-index: 999;
  transition: transform 0.3s, box-shadow 0.3s;
}
.whatsapp-float:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.4);
}
`;
document.head.appendChild(style);

// Optional: Smooth scroll fallback for older browsers
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
