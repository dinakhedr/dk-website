/* Dina Khedr — site interactions
   - Mobile navigation toggle
   - Scroll reveal for elements with .reveal
   - Count-up numbers for elements with [data-count]
   - Work page filter
   - Footer year
*/
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---------- Count-up numbers ---------- */
  function formatNumber(value, useCommas) {
    return useCommas ? value.toLocaleString('en-US') : String(value);
  }

  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var commas = el.hasAttribute('data-commas');
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var duration = 1800;
    var start = null;

    function frame(now) {
      if (start === null) start = now;
      var p = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      var value = decimals ? (target * eased).toFixed(decimals) : formatNumber(Math.round(target * eased), commas);
      el.textContent = prefix + value + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Scroll reveal + triggers ---------- */
  var revealEls = document.querySelectorAll('.reveal, .progress');
  var counters = document.querySelectorAll('[data-count]');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });

    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          countUp(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countObserver.observe(el); });
  }

  /* ---------- Work filter ---------- */
  var filter = document.querySelector('.work-filter');
  if (filter) {
    var workCards = document.querySelectorAll('.work-card');
    var empty = document.querySelector('.work-empty');
    filter.hidden = false;
    filter.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (!btn) return;
      var key = btn.getAttribute('data-filter');
      filter.querySelectorAll('[data-filter]').forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      var shown = 0;
      workCards.forEach(function (card) {
        var match = key === 'all' || (' ' + card.getAttribute('data-tags') + ' ').indexOf(' ' + key + ' ') > -1;
        card.hidden = !match;
        if (match) { card.classList.add('is-visible'); shown++; }
      });
      if (empty) empty.hidden = shown > 0;
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
