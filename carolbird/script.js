// Carol Bird — front-end behaviour.
// The enquiry form is NOT connected to a backend yet: submission is
// intercepted below and answered with a typed confirmation only.
// To be wired to a Cloudflare Pages Function before go-live.

(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Enquiry form (front-end only) ---- */

  var form = document.getElementById('enquiry-form');
  var reply = document.getElementById('typed-reply');
  var formError = document.getElementById('form-error');

  var REPLY_TEXT = '— Received, and thank you. Carol will reply to your email. (This preview form does not send messages yet.)';

  function typeOut(el, text) {
    if (reducedMotion) {
      el.textContent = text;
      return;
    }
    el.classList.add('typing');
    var i = 0;
    (function tick() {
      el.textContent = text.slice(0, ++i);
      if (i < text.length) {
        setTimeout(tick, 28);
      } else {
        el.classList.remove('typing');
      }
    })();
  }

  if (form && reply) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var missing = false;
      Array.prototype.forEach.call(form.elements, function (el) {
        if (el.willValidate) {
          el.classList.toggle('missing', !el.checkValidity());
          if (!el.checkValidity()) missing = true;
        }
      });

      if (missing) {
        formError.hidden = false;
        var firstMissing = form.querySelector('.missing');
        if (firstMissing) firstMissing.focus();
        return;
      }

      formError.hidden = true;
      form.hidden = true;
      reply.hidden = false;
      typeOut(reply, REPLY_TEXT);
    });

    // clear the rust mark as soon as a field is corrected
    form.addEventListener('input', function (event) {
      var el = event.target;
      if (el.classList.contains('missing') && el.checkValidity()) {
        el.classList.remove('missing');
        if (!form.querySelector('.missing')) formError.hidden = true;
      }
    });
  }

  /* ---- Reveal-on-scroll for the press cuttings ---- */

  var cuttings = document.querySelectorAll('.cutting');
  if (!reducedMotion && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    Array.prototype.forEach.call(cuttings, function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i * 90) + 'ms';
      observer.observe(el);
    });
  }

  /* ---- Footer year ---- */

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
