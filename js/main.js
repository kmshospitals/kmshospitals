/* =========================================================
   Interactions: scroll reveal, animated counters,
   sliding card carousels, form tabs, FAQ accordion.
   ========================================================= */
(function () {
  'use strict';

  /* ---- Scroll reveal via IntersectionObserver ---- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !items.length) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---- Animated counters ---- */
  function initCounters() {
    var nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var dur = 1400, start = performance.now();
        function tick(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { io.observe(el); });
  }

  /* ---- Generic sliding carousel ---- */
  function initSliders() {
    document.querySelectorAll('[data-slider]').forEach(function (slider) {
      var track = slider.querySelector('.slider-track');
      var prev = slider.querySelector('[data-prev]');
      var next = slider.querySelector('[data-next]');
      var dotsWrap = slider.querySelector('.slider-dots');
      if (!track) return;
      var slides = Array.prototype.slice.call(track.children);
      var index = 0;
      var autoplay = slider.getAttribute('data-autoplay') === 'true';
      var timer = null;

      function perView() {
        var w = window.innerWidth;
        var pv = parseInt(slider.getAttribute('data-perview') || '3', 10);
        if (w <= 620) return 1;
        if (w <= 980) return Math.min(2, pv);
        return pv;
      }

      function maxIndex() { return Math.max(0, slides.length - perView()); }

      function go(i) {
        index = Math.max(0, Math.min(i, maxIndex()));
        var slide = slides[0];
        var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 0) || 0;
        var step = slide.getBoundingClientRect().width + gap;
        track.style.transform = 'translateX(' + (-index * step) + 'px)';
        renderDots();
      }

      function renderDots() {
        if (!dotsWrap) return;
        var pages = maxIndex() + 1;
        dotsWrap.innerHTML = '';
        for (var p = 0; p < pages; p++) {
          (function (p) {
            var b = document.createElement('button');
            b.className = p === index ? 'active' : '';
            b.setAttribute('aria-label', 'Go to slide ' + (p + 1));
            b.addEventListener('click', function () { go(p); restart(); });
            dotsWrap.appendChild(b);
          })(p);
        }
      }

      function sizeSlides() {
        var pv = perView();
        var gap = 22.4; // ~1.4rem
        slides.forEach(function (s) {
          s.style.width = 'calc((100% - ' + (gap * (pv - 1)) + 'px) / ' + pv + ')';
        });
        go(index);
      }

      function restart() { if (autoplay) { clearInterval(timer); timer = setInterval(function () { go(index >= maxIndex() ? 0 : index + 1); }, 4200); } }

      if (prev) prev.addEventListener('click', function () { go(index - 1); restart(); });
      if (next) next.addEventListener('click', function () { go(index + 1); restart(); });

      // Touch / swipe
      var startX = 0, dragging = false;
      track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; dragging = true; }, { passive: true });
      track.addEventListener('touchend', function (e) {
        if (!dragging) return; dragging = false;
        var dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) { go(dx < 0 ? index + 1 : index - 1); restart(); }
      });

      slider.addEventListener('mouseenter', function () { clearInterval(timer); });
      slider.addEventListener('mouseleave', restart);

      window.addEventListener('resize', debounce(sizeSlides, 150));
      sizeSlides();
      restart();
    });
  }

  function debounce(fn, wait) {
    var t; return function () { var a = arguments, c = this; clearTimeout(t); t = setTimeout(function () { fn.apply(c, a); }, wait); };
  }

  /* ---- Booking / Feedback form tabs ---- */
  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (group) {
      var tabs = group.querySelectorAll('.form-tab');
      var panels = group.querySelectorAll('.form-panel');
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var target = tab.getAttribute('data-tab');
          tabs.forEach(function (t) { t.classList.remove('active'); });
          panels.forEach(function (p) { p.classList.toggle('active', p.getAttribute('data-panel') === target); });
          tab.classList.add('active');
        });
      });
    });
  }

  /* ---- FAQ accordion ---- */
  function initAccordion() {
    document.querySelectorAll('.acc-head').forEach(function (head) {
      head.addEventListener('click', function () {
        var item = head.closest('.acc-item');
        var body = item.querySelector('.acc-body');
        var open = item.classList.toggle('open');
        body.style.maxHeight = open ? body.scrollHeight + 'px' : null;
      });
    });
  }

  function boot() {
    initReveal();
    initCounters();
    initSliders();
    initTabs();
    initAccordion();
  }

  // Wait for shared components to mount first
  document.addEventListener('components:ready', boot);
  // Fallback if components already ready
  if (document.getElementById('site-header') && document.getElementById('site-header').children.length) {
    boot();
  }
})();
