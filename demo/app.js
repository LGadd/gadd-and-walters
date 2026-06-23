/* ============================================================
   Gadd & Walters — Ascent · shared behaviour
   Vanilla JS, null-guarded, reduced-motion aware.
   ============================================================ */
(function () {
  "use strict";

  /* Mobile menu */
  var open = document.getElementById("menuOpen"),
      close = document.getElementById("menuClose"),
      menu = document.getElementById("mobileMenu");
  if (open && menu) open.addEventListener("click", function () { menu.classList.add("open"); });
  if (close && menu) close.addEventListener("click", function () { menu.classList.remove("open"); });
  if (menu) menu.addEventListener("click", function (e) { if (e.target.tagName === "A") menu.classList.remove("open"); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu) menu.classList.remove("open"); });

  /* Footer year */
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  /* Scroll reveal */
  var ups = document.querySelectorAll("[data-up]");
  if (ups.length) {
    if (!("IntersectionObserver" in window)) {
      ups.forEach(function (el) { el.classList.add("in"); });
    } else {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
      ups.forEach(function (el) { io.observe(el); });
    }
  }

  /* Contact form (demo — not wired to an inbox) */
  var form = document.getElementById("enquiry-form");
  if (form) {
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var hp = form.querySelector(".hp");
      if (hp && hp.value) return; /* bot */
      if (status) {
        status.textContent = "Thanks — this demo form isn't wired to an inbox yet. For now please email lbgadduk@gmail.com or call 07471 623215 and we'll come straight back to you.";
        status.classList.add("ok");
      }
      form.reset();
    });
  }
})();
