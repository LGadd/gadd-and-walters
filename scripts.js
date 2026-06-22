/* ============================================================
   Gadd & Walters — site behaviour (vanilla JS, no framework)
   One IIFE, null-guarded init* functions, reduced-motion aware.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia && window.matchMedia("(pointer: fine)").matches;

  /* ---------- Mobile nav toggle ---------- */
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

  /* ---------- Highlight current page in nav ---------- */
  function initActiveNav() {
    var here = location.pathname.split("/").pop() || "index.html";
    var links = document.querySelectorAll(".site-nav a:not(.btn)");
    links.forEach(function (a) {
      if (a.getAttribute("href") === here) a.classList.add("active");
    });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Sticky header state on scroll ---------- */
  function initHeader() {
    var head = document.querySelector(".site-head");
    if (!head) return;
    function onScroll() {
      head.classList.toggle("scrolled", window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Demo enquiry form ---------- */
  function initForm() {
    var form = document.getElementById("enquiry-form");
    if (!form) return;
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var hp = form.querySelector(".hp");
      if (hp && hp.value) return; // bot
      if (status) {
        status.textContent =
          "Thanks — this demo form isn't connected to an inbox yet. For now please email lbgadduk@gmail.com or call 07471 623215 and we'll get straight back to you.";
        status.classList.add("ok");
      }
      form.reset();
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Animated counters ---------- */
  function initCounters() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nums.forEach(function (el) { el.textContent = el.getAttribute("data-count") + (el.getAttribute("data-suffix") || ""); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        var target = parseFloat(el.getAttribute("data-count"));
        var suffix = el.getAttribute("data-suffix") || "";
        var prefix = el.getAttribute("data-prefix") || "";
        var dur = 1400, start = null;
        function tick(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1);
          el.textContent = prefix + val + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Cursor glow (desktop, motion on) ---------- */
  function initCursorGlow() {
    if (!fine || reduceMotion) return;
    var glow = document.querySelector(".cursor-glow");
    if (!glow) return;
    var x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y, shown = false;
    document.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!shown) { glow.style.opacity = "1"; shown = true; }
    });
    (function loop() {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      glow.style.transform = "translate(" + x + "px," + y + "px)";
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Magnetic buttons ---------- */
  function initMagnetic() {
    if (!fine || reduceMotion) return;
    var els = document.querySelectorAll("[data-magnetic]");
    els.forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var mx = e.clientX - (r.left + r.width / 2);
        var my = e.clientY - (r.top + r.height / 2);
        el.style.transform = "translate(" + mx * 0.25 + "px," + my * 0.35 + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- 3D tilt cards ---------- */
  function initTilt() {
    if (!fine || reduceMotion) return;
    var cards = document.querySelectorAll("[data-tilt]");
    cards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = "perspective(900px) rotateX(" + (-py * 5).toFixed(2) + "deg) rotateY(" + (px * 6).toFixed(2) + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", function () { card.style.transform = ""; });
    });
  }

  /* ---------- Aurora gradient-mesh hero (canvas) ---------- */
  function initAurora() {
    var canvas = document.querySelector(".hero-aurora");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var w, h, dpr;
    var blobs = [
      { c: "rgba(255, 106, 61, 0.50)", r: 0.55, x: 0.28, y: 0.28, dx: 0.00018, dy: 0.00013, px: 0, py: 0 },
      { c: "rgba(255, 161, 74, 0.38)", r: 0.50, x: 0.74, y: 0.34, dx: -0.00015, dy: 0.00017, px: 0.3, py: 0.6 },
      { c: "rgba(224, 72, 31, 0.30)", r: 0.44, x: 0.55, y: 0.62, dx: 0.00012, dy: -0.00014, px: 0.8, py: 0.2 }
    ];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      blobs.forEach(function (b) {
        var cx = (b.x + Math.sin(t * b.dx + b.px) * 0.16) * w;
        var cy = (b.y + Math.cos(t * b.dy + b.py) * 0.16) * h;
        var rad = b.r * Math.min(w, h);
        var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, b.c);
        g.addColorStop(1, "rgba(14,13,12,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });
    }

    if (reduceMotion) { draw(0); return; }

    var running = true;
    document.addEventListener("visibilitychange", function () {
      running = !document.hidden;
      if (running) requestAnimationFrame(frame);
    });
    function frame(ts) {
      draw(ts);
      if (running) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  initMenu();
  initActiveNav();
  initYear();
  initHeader();
  initForm();
  initReveal();
  initCounters();
  initCursorGlow();
  initMagnetic();
  initTilt();
  initAurora();
})();
