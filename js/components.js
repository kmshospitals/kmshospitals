/* =========================================================
   Shared UI components — injected on every page.
   Keeps the multipage site DRY (single source for header/footer),
   dynamic language switching, mobile menu and animated emblem.
   ========================================================= */
(function () {
  'use strict';

  var PHONE = '+919006008932';
  var PHONE2 = '+919122295023';
  var EMAIL = 'kmshospital7@gmail.com';

  /* ---- Animated emblem based on the real hospital logo ---- */
  function emblemSVG() {
    return (
      '<div class="emblem logo-emblem" role="img" aria-label="Krishna Multispeciality Hospital">' +
        '<span class="le-ring" aria-hidden="true"></span>' +
        '<img src="assets/logo.png" alt="Krishna Multispeciality Hospital logo" />' +
      '</div>'
    );
  }

  /* ---- Navigation links (page => file) ---- */
  var NAV = [
    { href: 'index.html', en: 'Home', hi: 'होम' },
    { href: 'about.html', en: 'About', hi: 'हमारे बारे में' },
    { href: 'services.html', en: 'Services', hi: 'सेवाएँ' },
    { href: 'doctors.html', en: 'Doctors', hi: 'डॉक्टर' },
    { href: 'booking.html', en: 'Booking', hi: 'बुकिंग' },
    { href: 'contact.html', en: 'Contact', hi: 'संपर्क' }
  ];

  function currentPage() {
    var path = window.location.pathname.split('/').pop();
    return path === '' ? 'index.html' : path;
  }

  function buildHeader() {
    var page = currentPage();
    var links = NAV.map(function (n) {
      var active = n.href === page ? ' active' : '';
      return '<a class="nav-link' + active + '" href="' + n.href + '">' +
        '<span class="lang-en">' + n.en + '</span><span class="lang-hi">' + n.hi + '</span></a>';
    }).join('');

    return '' +
      '<div class="topline">' +
        '<div class="container">' +
          '<span class="lang-en">🕒 Open 24 Hours &nbsp;|&nbsp; <span class="topline-emg">🚑 24×7 Emergency</span></span>' +
          '<span class="lang-hi">🕒 24 घंटे खुला &nbsp;|&nbsp; <span class="topline-emg">🚑 24×7 आपातकाल</span></span>' +
          '<span><a href="mailto:' + EMAIL + '">✉️ ' + EMAIL + '</a> &nbsp;·&nbsp; ' +
          '<a href="tel:' + PHONE + '">📞 +91 90060 08932</a></span>' +
        '</div>' +
      '</div>' +
      '<header class="topbar" id="topbar">' +
        '<div class="container topbar-flex">' +
          '<a class="brand" href="index.html" aria-label="Krishna Multispeciality Hospital home">' +
            '<img class="brand-logo" src="assets/logo.png" alt="Krishna Multispeciality Hospital logo" />' +
            '<span class="brand-text">' +
              '<span class="brand-title">Krishna Multispeciality Hospital</span>' +
              '<span class="brand-subtitle lang-en">Compassion • Care • Excellence</span>' +
              '<span class="brand-subtitle lang-hi">करुणा • देखभाल • उत्कृष्टता</span>' +
            '</span>' +
          '</a>' +
          '<nav class="nav-shell" id="navShell">' + links + '</nav>' +
          '<div class="header-actions">' +
            '<div class="header-desktop-actions" style="display:flex;gap:0.6rem;align-items:center">' +
              '<button class="lang-toggle" id="langToggle" type="button" aria-label="Switch language">' +
                '<span class="lang-en">हिन्दी</span><span class="lang-hi">English</span></button>' +
              '<a class="btn btn-call" href="tel:' + PHONE + '">' +
                '<span>📞</span><span class="lang-en">Call Now</span><span class="lang-hi">कॉल करें</span></a>' +
            '</div>' +
            '<button class="lang-toggle header-mobile-lang" id="langToggleM" type="button" style="display:none">' +
              '<span class="lang-en">हिन्दी</span><span class="lang-hi">EN</span></button>' +
            '<button class="menu-toggle" id="menuToggle" type="button" aria-label="Open menu" aria-expanded="false">' +
              '<span></span><span></span><span></span></button>' +
          '</div>' +
        '</div>' +
      '</header>' +
      '<div class="nav-overlay" id="navOverlay"></div>';
  }

  function buildFooter() {
    var linkList = NAV.map(function (n) {
      return '<li><a href="' + n.href + '"><span class="lang-en">' + n.en + '</span><span class="lang-hi">' + n.hi + '</span></a></li>';
    }).join('');

    return '' +
      '<footer class="footer">' +
        '<div class="container">' +
          '<div class="footer-grid">' +
            '<div>' +
              '<div class="f-brand"><img src="assets/logo.png" alt="Krishna Multispeciality Hospital"/>' +
                '<b>Krishna Multispeciality Hospital</b></div>' +
              '<p class="lang-en">Compassion • Care • Excellence.<br/>Your Health, Our Priority. Delivering affordable, ethical and high-quality healthcare to Sitamarhi and beyond.</p>' +
              '<p class="lang-hi">करुणा • देखभाल • उत्कृष्टता।<br/>आपका स्वास्थ्य, हमारी प्राथमिकता। सीतामढ़ी और आसपास किफायती, नैतिक और उच्च गुणवत्ता वाली स्वास्थ्य सेवा।</p>' +
              '<div class="footer-social">' +
                '<a href="tel:' + PHONE + '" aria-label="Call">📞</a>' +
                '<a href="mailto:' + EMAIL + '" aria-label="Email">✉️</a>' +
                '<a href="https://wa.me/919006008932" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>' +
                '<a href="https://maps.google.com/?q=Krishna+Multispeciality+Hospital+Sitamarhi" target="_blank" rel="noopener" aria-label="Map">📍</a>' +
              '</div>' +
            '</div>' +
            '<div><h4 class="lang-en">Quick Links</h4><h4 class="lang-hi">त्वरित लिंक</h4><ul>' + linkList + '</ul></div>' +
            '<div><h4 class="lang-en">Services</h4><h4 class="lang-hi">सेवाएँ</h4><ul>' +
              '<li><a href="services.html#dentistry"><span class="lang-en">Dentistry</span><span class="lang-hi">दंत चिकित्सा</span></a></li>' +
              '<li><a href="services.html"><span class="lang-en">Emergency & Trauma</span><span class="lang-hi">आपातकाल एवं ट्रॉमा</span></a></li>' +
              '<li><a href="services.html"><span class="lang-en">ICU Care</span><span class="lang-hi">आईसीयू देखभाल</span></a></li>' +
              '<li><a href="services.html"><span class="lang-en">Obstetrics & Gynae</span><span class="lang-hi">स्त्री एवं प्रसूति</span></a></li>' +
              '<li><a href="services.html"><span class="lang-en">Pharmacy</span><span class="lang-hi">फार्मेसी</span></a></li>' +
            '</ul></div>' +
            '<div><h4 class="lang-en">Reach Us</h4><h4 class="lang-hi">संपर्क करें</h4>' +
              '<ul class="f-contact">' +
                '<li>📍 <span class="lang-en">Ring Bandh, Mathura High School Road, Near Narayan Vivah Bhawan, Sitamarhi, Bihar, India</span>' +
                     '<span class="lang-hi">रिंग बंध, मथुरा हाई स्कूल रोड, नारायण विवाह भवन के पास, सीतामढ़ी, बिहार, भारत</span></li>' +
                '<li>📞 <a href="tel:' + PHONE + '">+91 9006008932</a>, <a href="tel:' + PHONE2 + '">+91 9122295023</a></li>' +
                '<li>✉️ <a href="mailto:' + EMAIL + '">' + EMAIL + '</a></li>' +
                '<li>🌐 www.kmshospitals.com</li>' +
              '</ul>' +
            '</div>' +
          '</div>' +
          '<div class="footer-bottom">' +
            '<span>© <span id="year"></span> Krishna Multispeciality Hospital. <span class="lang-en">All Rights Reserved.</span><span class="lang-hi">सर्वाधिकार सुरक्षित।</span></span>' +
            '<span class="lang-en">Compassion • Care • Excellence</span><span class="lang-hi">करुणा • देखभाल • उत्कृष्टता</span>' +
          '</div>' +
        '</div>' +
      '</footer>';
  }

  function buildFloating() {
    return '' +
      '<a class="floating-call" href="tel:' + PHONE + '" aria-label="Call hospital">' +
        '<span class="ph">📞</span><span class="lang-en">Call Now</span><span class="lang-hi">कॉल करें</span></a>' +
      '<button class="to-top" id="toTop" aria-label="Back to top">↑</button>';
  }

  /* ---- Language handling (persisted across pages) ---- */
  function applyLang(lang) {
    // Drop the early anti-flash class so the runtime toggle (body.is-hindi) is authoritative.
    document.documentElement.classList.remove('preload-hi');
    document.body.classList.toggle('is-hindi', lang === 'hi');
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
    try { localStorage.setItem('kms-lang', lang); } catch (e) {}
  }

  function initLang() {
    var saved = 'en';
    try { saved = localStorage.getItem('kms-lang') || 'en'; } catch (e) {}
    applyLang(saved);
    ['langToggle', 'langToggleM'].forEach(function (id) {
      var btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', function () {
        applyLang(document.body.classList.contains('is-hindi') ? 'en' : 'hi');
      });
    });
  }

  /* ---- Mobile menu ---- */
  function initMenu() {
    var toggle = document.getElementById('menuToggle');
    var overlay = document.getElementById('navOverlay');
    function close() { document.body.classList.remove('menu-open'); if (toggle) toggle.setAttribute('aria-expanded', 'false'); }
    if (toggle) toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    if (overlay) overlay.addEventListener('click', close);
    document.querySelectorAll('#navShell .nav-link').forEach(function (a) { a.addEventListener('click', close); });
    // Show a compact language button on mobile
    var mq = window.matchMedia('(max-width: 820px)');
    function sync() { var m = document.getElementById('langToggleM'); if (m) m.style.display = mq.matches ? 'inline-flex' : 'none'; }
    mq.addEventListener ? mq.addEventListener('change', sync) : mq.addListener(sync);
    sync();
  }

  /* ---- Header shadow on scroll + back to top ---- */
  function initScrollUI() {
    var topbar = document.getElementById('topbar');
    var toTop = document.getElementById('toTop');
    function onScroll() {
      var y = window.scrollY;
      if (topbar) topbar.classList.toggle('scrolled', y > 8);
      if (toTop) toTop.classList.toggle('show', y > 500);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    onScroll();
  }

  /* ---- Preloader ---- */
  function initPreloader() {
    var pre = document.getElementById('preloader');
    if (!pre) return;
    window.addEventListener('load', function () {
      setTimeout(function () { pre.classList.add('hidden'); }, 500);
    });
    // Safety timeout
    setTimeout(function () { pre.classList.add('hidden'); }, 3500);
  }

  /* ---- Mount everything ---- */
  function mount() {
    var pre = document.getElementById('preloader');
    if (pre) pre.innerHTML = emblemSVG();

    var header = document.getElementById('site-header');
    if (header) header.innerHTML = buildHeader();

    // Inject emblem into any placeholder marked data-emblem
    document.querySelectorAll('[data-emblem]').forEach(function (el) { el.innerHTML = emblemSVG(); });

    var footer = document.getElementById('site-footer');
    if (footer) footer.innerHTML = buildFooter();

    var floating = document.getElementById('site-floating');
    if (floating) floating.innerHTML = buildFloating();

    var yr = document.getElementById('year');
    if (yr) yr.textContent = new Date().getFullYear();

    initLang();
    initMenu();
    initScrollUI();
    initPreloader();

    // Signal to main.js that components are ready
    document.dispatchEvent(new Event('components:ready'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
