/* Gadd & Walters — frame + morph engine. Vanilla, no deps. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body;

  /* ---- Year ---------------------------------------------------------------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Mobile menu --------------------------------------------------------- */
  var burger = document.querySelector('.burger');
  var sheet = document.querySelector('.sheet');
  function closeMenu(){ body.classList.remove('menu-open'); if (burger) burger.setAttribute('aria-expanded','false'); }
  if (burger) {
    burger.addEventListener('click', function () {
      var open = body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  if (sheet) sheet.querySelectorAll('a').forEach(function (a){ a.addEventListener('click', closeMenu); });

  /* ---- Reveal on scroll ---------------------------------------------------- */
  var ups = document.querySelectorAll('[data-up]');
  if (reduce || !('IntersectionObserver' in window)) {
    ups.forEach(function (el){ el.classList.add('in'); });
  } else {
    var revealIO = new IntersectionObserver(function (entries){
      entries.forEach(function (e){ if (e.isIntersecting){ e.target.classList.add('in'); revealIO.unobserve(e.target); } });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    ups.forEach(function (el){ revealIO.observe(el); });
  }

  /* ---- Era morph: which era owns the viewport centre? ---------------------- */
  var eras = Array.prototype.slice.call(document.querySelectorAll('[data-era-name]'));
  var railLinks = Array.prototype.slice.call(document.querySelectorAll('.rail a'));
  function setEra(name){
    if (body.getAttribute('data-era') === name) return;
    body.setAttribute('data-era', name);
    railLinks.forEach(function (a){ a.classList.toggle('on', a.getAttribute('data-target') === name); });
  }
  if (eras.length) {
    // Pick the era whose midpoint is nearest the viewport centre on each scroll.
    var ticking = false;
    function pickEra(){
      ticking = false;
      var mid = window.innerHeight / 2, best = null, bestDist = Infinity;
      for (var i = 0; i < eras.length; i++) {
        var r = eras[i].getBoundingClientRect();
        // section considered "active" once its top passes 55% of viewport
        var centre = r.top + r.height / 2;
        var d = Math.abs(centre - mid);
        if (r.top <= window.innerHeight * 0.55 && r.bottom >= window.innerHeight * 0.45) { best = eras[i]; break; }
        if (d < bestDist) { bestDist = d; best = eras[i]; }
      }
      if (best) setEra(best.getAttribute('data-era-name'));
    }
    window.addEventListener('scroll', function (){ if (!ticking){ ticking = true; requestAnimationFrame(pickEra); } }, { passive: true });
    window.addEventListener('resize', pickEra, { passive: true });
    pickEra();
  } else {
    // Inner pages: single fixed era set via data-page-era on <body>
    var pe = body.getAttribute('data-page-era');
    if (pe) setEra(pe);
  }

  /* ---- Reading progress hairline ------------------------------------------ */
  var bar = document.querySelector('.progress');
  if (bar) {
    var onScroll = function (){
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Rail smooth-scroll to its era -------------------------------------- */
  railLinks.forEach(function (a){
    a.addEventListener('click', function (e){
      var id = a.getAttribute('href');
      if (id && id.charAt(0) === '#') {
        var t = document.querySelector(id);
        if (t){ e.preventDefault(); t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
      }
    });
  });

  /* ---- Hero showcase: auto-cycle the little "era switcher" preview --------- */
  var screens = document.querySelectorAll('.showcase__screen');
  var pagers = document.querySelectorAll('.showcase__pager b');
  if (screens.length && !reduce) {
    var idx = 0;
    setInterval(function (){
      screens[idx].style.opacity = '0';
      pagers[idx] && pagers[idx].classList.remove('on');
      idx = (idx + 1) % screens.length;
      screens[idx].style.opacity = '1';
      pagers[idx] && pagers[idx].classList.add('on');
    }, 2200);
  }

  /* ---- Count-up numbers (glossy stat band) -------------------------------- */
  var counts = document.querySelectorAll('[data-count]');
  if (counts.length && !reduce && 'IntersectionObserver' in window) {
    var countIO = new IntersectionObserver(function (entries){
      entries.forEach(function (e){
        if (!e.isIntersecting) return;
        var el = e.target, end = parseInt(el.getAttribute('data-count'), 10), pre = el.getAttribute('data-prefix') || '', t0 = null;
        function step(ts){ if (!t0) t0 = ts; var p = Math.min((ts - t0) / 1100, 1); el.textContent = pre + Math.round(p * end); if (p < 1) requestAnimationFrame(step); }
        requestAnimationFrame(step); countIO.unobserve(el);
      });
    }, { threshold: 0.5 });
    counts.forEach(function (el){ countIO.observe(el); });
  }

  /* ---- Starfield for the kinetic era (cheap, capped, motion-safe) --------- */
  var cv = document.getElementById('starfield');
  if (cv && !reduce) {
    var ctx = cv.getContext('2d'), stars = [], W, H, raf, running = false;
    function size(){ W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; }
    function seed(){ stars = []; var n = Math.min(90, Math.floor(W / 16)); for (var i=0;i<n;i++) stars.push({ x: Math.random()*W, y: Math.random()*H, z: Math.random()*.8+.2, s: Math.random()*1.4+.3 }); }
    function draw(){
      ctx.clearRect(0,0,W,H);
      for (var i=0;i<stars.length;i++){ var st = stars[i]; st.y -= st.z * .25; if (st.y < 0){ st.y = H; st.x = Math.random()*W; }
        ctx.globalAlpha = st.z * .8; ctx.fillStyle = i % 5 === 0 ? '#b98cff' : '#dfe2ff';
        ctx.beginPath(); ctx.arc(st.x, st.y, st.s, 0, 6.283); ctx.fill(); }
      ctx.globalAlpha = 1; raf = requestAnimationFrame(draw);
    }
    size(); seed();
    // Only animate while the kinetic era is active (saves battery/CPU).
    var starIO = new IntersectionObserver(function (entries){
      entries.forEach(function (e){
        if (e.isIntersecting && !running){ running = true; draw(); }
        else if (!e.isIntersecting && running){ running = false; cancelAnimationFrame(raf); }
      });
    }, { threshold: 0.05 });
    var kineticEra = document.querySelector('[data-era-name="kinetic"]');
    if (kineticEra) starIO.observe(kineticEra); else { running = true; draw(); }
    window.addEventListener('resize', function (){ size(); seed(); }, { passive: true });
  }

  /* ---- Contact form (demo, front-end only) -------------------------------- */
  var form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e){
      e.preventDefault();
      var status = form.querySelector('.form-status');
      if (form.querySelector('.hp') && form.querySelector('.hp').value) return; // bot
      var name = form.querySelector('#name'), email = form.querySelector('#email'), msg = form.querySelector('#message');
      if (!name.value.trim() || !email.value.trim() || !msg.value.trim()) {
        status.textContent = 'Please fill in your name, email and message.'; status.style.color = '#c0392b'; return;
      }
      status.textContent = 'Thanks — this demo form isn’t wired to an inbox yet. Please email or call us and we’ll come straight back to you.';
      status.style.color = 'var(--thread)';
      form.reset();
    });
  }
})();
