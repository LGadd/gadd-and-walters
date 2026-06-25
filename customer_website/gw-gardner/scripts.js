/* ============================================================
   G & W Gardner Building Contractors — site behaviour (vanilla JS)
   IIFE-wrapped, null-guarded init* functions — safe on every page.
   ============================================================ */
(function () {
  "use strict";

  /* Mobile nav toggle (open/close, Escape, click-outside) */
  function initMenu() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
    function open() {
      nav.classList.add("open");
      toggle.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      nav.classList.contains("open") ? close() : open();
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("open") && !nav.contains(e.target) && !toggle.contains(e.target)) close();
    });
  }

  /* Highlight the current page in the nav */
  function initActiveNav() {
    var here = location.pathname.split("/").pop() || "index.html";
    var links = document.querySelectorAll(".site-nav a:not(.btn)");
    links.forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === here) a.classList.add("active");
    });
  }

  /* Current year in the footer */
  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* Reveal-on-scroll for elements marked .reveal */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* Lightbox for gallery images. Any element with [data-lightbox] whose
     src/caption are read from a child <img> + [data-cap]. Null-guarded. */
  function initLightbox() {
    var triggers = document.querySelectorAll("[data-lightbox]");
    if (!triggers.length) return;

    var box = document.createElement("div");
    box.className = "lb";
    box.setAttribute("aria-hidden", "true");
    box.innerHTML =
      '<button class="lb-close" type="button" aria-label="Close image">&times;</button>' +
      '<img alt="" />' +
      '<p class="lb-cap"></p>';
    document.body.appendChild(box);

    var lbImg = box.querySelector("img");
    var lbCap = box.querySelector(".lb-cap");
    var closeBtn = box.querySelector(".lb-close");

    function show(src, alt, cap) {
      lbImg.src = src;
      lbImg.alt = alt || "";
      lbCap.textContent = cap || "";
      box.classList.add("open");
      box.setAttribute("aria-hidden", "false");
    }
    function hide() {
      box.classList.remove("open");
      box.setAttribute("aria-hidden", "true");
      lbImg.src = "";
    }

    triggers.forEach(function (t) {
      t.addEventListener("click", function () {
        var img = t.querySelector("img");
        if (!img) return;
        show(img.getAttribute("src"), img.getAttribute("alt"), t.getAttribute("data-cap") || img.getAttribute("alt"));
      });
    });
    closeBtn.addEventListener("click", hide);
    box.addEventListener("click", function (e) { if (e.target === box) hide(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") hide(); });
  }

  /* Demo enquiry form — no backend is connected, and the existing site
     publishes no email address, so this just acknowledges the message and
     points people to the phone number. (Honeypot field guards against bots.) */
  function initForm() {
    var form = document.getElementById("enquiry-form");
    if (!form) return;
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.querySelector(".hp") && form.querySelector(".hp").value) return; // bot
      if (status) {
        status.textContent =
          "Thanks — this demo form isn't connected to an inbox yet. For now please call us on 01843 221714 and we'll be glad to help.";
        status.classList.add("ok");
      }
      form.reset();
    });
  }

  initMenu();
  initActiveNav();
  initYear();
  initReveal();
  initLightbox();
  initForm();
})();
