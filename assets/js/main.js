/* Dina Khedr — site interactions
   - Mobile navigation toggle
   - Scroll reveal for elements with .reveal
   - Count-up numbers for elements with [data-count]
   - Category filter (Work, Insights)
   - Copy link button (articles)
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

  /* ---------- Category filter (Work, Insights) ---------- */
  var filter = document.querySelector('.filter-chips');
  if (filter) {
    var workCards = document.querySelectorAll('.filter-item');
    var empty = document.querySelector('.filter-empty');
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

  /* ---------- Copy link (articles) ---------- */
  document.querySelectorAll('[data-copy-link]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var done = function () { btn.textContent = 'Link copied'; setTimeout(function () { btn.textContent = 'Copy link'; }, 2000); };
      if (navigator.clipboard) { navigator.clipboard.writeText(window.location.href).then(done, function () {}); }
    });
  });

  /* ---------- Gallery prev / next buttons (AI Summit day spreads) ---------- */
  document.querySelectorAll('.lineups').forEach(function (box) {
    var strip = box.querySelector('.lineups__strip');
    if (!strip) return;
    box.querySelectorAll('[data-dir]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = strip.firstElementChild;
        var step = item ? item.getBoundingClientRect().width + parseFloat(getComputedStyle(strip).columnGap || 0) : strip.clientWidth;
        strip.scrollBy({ left: step * Number(btn.getAttribute('data-dir')), behavior: 'smooth' });
      });
    });
  });

  /* ---------- Lightbox for the day spreads (AI Summit) ---------- */
  var spreads = Array.prototype.slice.call(document.querySelectorAll('.spread'));
  if (spreads.length) {
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Day lineup and agenda');
    box.hidden = true;
    box.innerHTML = '<div class="lightbox__inner"><div class="lightbox__book"></div><p class="lightbox__cap"></p></div>' +
      '<button class="lightbox__btn lightbox__close" type="button" aria-label="Close">\u2715</button>' +
      '<button class="lightbox__btn lightbox__prev" type="button" aria-label="Previous day">\u2190</button>' +
      '<button class="lightbox__btn lightbox__next" type="button" aria-label="Next day">\u2192</button>';
    document.body.appendChild(box);
    var book = box.querySelector('.lightbox__book');
    var cap = box.querySelector('.lightbox__cap');
    var current = 0, lastFocus = null;
    var show = function (i) {
      current = (i + spreads.length) % spreads.length;
      var s = spreads[current];
      book.innerHTML = '';
      s.querySelectorAll('.spread__book img').forEach(function (img) {
        var c = img.cloneNode();
        c.removeAttribute('loading');
        book.appendChild(c);
      });
      var fc = s.querySelector('figcaption');
      cap.innerHTML = fc ? fc.innerHTML : '';
    };
    var open = function (i) {
      lastFocus = document.activeElement;
      show(i);
      box.hidden = false;
      document.documentElement.classList.add('lightbox-open');
      box.querySelector('.lightbox__close').focus();
    };
    var close = function () {
      box.hidden = true;
      document.documentElement.classList.remove('lightbox-open');
      if (lastFocus) lastFocus.focus();
    };
    spreads.forEach(function (s, i) {
      s.setAttribute('tabindex', '0');
      s.setAttribute('role', 'button');
      s.setAttribute('aria-label', 'Enlarge ' + (s.querySelector('figcaption b') || {}).textContent);
      s.addEventListener('click', function () { open(i); });
      s.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
    });
    box.querySelector('.lightbox__close').addEventListener('click', close);
    box.querySelector('.lightbox__prev').addEventListener('click', function () { show(current - 1); });
    box.querySelector('.lightbox__next').addEventListener('click', function () { show(current + 1); });
    box.addEventListener('click', function (e) { if (e.target === box || e.target.classList.contains('lightbox__inner')) close(); });
    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  /* ---------- Hero titles: keep the accent (beige) phrase on one line ---------- */
  var fitTitles = function () {
    document.querySelectorAll('.page-hero__title, .summit-hero__title').forEach(function (h) {
      var acc = h.querySelector('.accent, span');
      if (!acc) return;
      h.style.fontSize = '';
      acc.style.whiteSpace = 'normal';
      acc.style.display = 'inline';
      var avail = h.clientWidth;
      acc.style.whiteSpace = '';
      acc.style.display = '';
      var size = parseFloat(getComputedStyle(h).fontSize);
      var guard = 0;
      while (acc.getBoundingClientRect().width > avail + 1 && size > 22 && guard < 60) {
        size -= 1; guard++;
        h.style.fontSize = size + 'px';
      }
    });
  };
  fitTitles();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitTitles);
  var fitTimer;
  window.addEventListener('resize', function () { clearTimeout(fitTimer); fitTimer = setTimeout(fitTitles, 120); });

  /* ---------- Photo lightbox: click any case study photo to enlarge ---------- */
  var zoomImgs = Array.prototype.slice.call(document.querySelectorAll('.gphoto img, .cs-shot img, .creel img, .sdesign img'));
  if (zoomImgs.length) {
    var zb = document.createElement('div');
    zb.className = 'lightbox lightbox--photo';
    zb.setAttribute('role', 'dialog');
    zb.setAttribute('aria-modal', 'true');
    zb.setAttribute('aria-label', 'Enlarged photo');
    zb.hidden = true;
    zb.innerHTML = '<div class="lightbox__inner"><img class="lightbox__img" alt=""><p class="lightbox__cap"></p></div>' +
      '<button class="lightbox__btn lightbox__close" type="button" aria-label="Close">\u2715</button>' +
      '<button class="lightbox__btn lightbox__prev" type="button" aria-label="Previous photo">\u2190</button>' +
      '<button class="lightbox__btn lightbox__next" type="button" aria-label="Next photo">\u2192</button>';
    document.body.appendChild(zb);
    var zImg = zb.querySelector('.lightbox__img'), zCap = zb.querySelector('.lightbox__cap'), zi = 0, zLast = null;
    var zShow = function (i) {
      zi = (i + zoomImgs.length) % zoomImgs.length;
      var src = zoomImgs[zi];
      zImg.src = src.currentSrc || src.src;
      zImg.alt = src.alt;
      var fc = src.closest('figure') && src.closest('figure').querySelector('figcaption');
      zCap.textContent = fc ? fc.textContent : '';
    };
    var zClose = function () { zb.hidden = true; document.documentElement.classList.remove('lightbox-open'); if (zLast) zLast.focus(); };
    zoomImgs.forEach(function (img, i) {
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.addEventListener('click', function () { zLast = img; zShow(i); zb.hidden = false; document.documentElement.classList.add('lightbox-open'); zb.querySelector('.lightbox__close').focus(); });
      img.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); img.click(); } });
    });
    zb.querySelector('.lightbox__close').addEventListener('click', zClose);
    zb.querySelector('.lightbox__prev').addEventListener('click', function () { zShow(zi - 1); });
    zb.querySelector('.lightbox__next').addEventListener('click', function () { zShow(zi + 1); });
    zb.addEventListener('click', function (e) { if (e.target === zb || e.target.classList.contains('lightbox__inner')) zClose(); });
    document.addEventListener('keydown', function (e) {
      if (zb.hidden) return;
      if (e.key === 'Escape') zClose();
      else if (e.key === 'ArrowLeft') zShow(zi - 1);
      else if (e.key === 'ArrowRight') zShow(zi + 1);
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
