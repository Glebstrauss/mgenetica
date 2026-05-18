(function () {
  'use strict';

  var STORAGE_KEY = 'mgenetica_theme';
  var LIGHT_LOGO = 'images/mgenetica-logo-correct.png';
  var DARK_LOGO = 'images/mgenetica-logo-dark.svg';

  function t(key, fallback) {
    if (window.mgeneticaI18n && typeof window.mgeneticaI18n.t === 'function') {
      return window.mgeneticaI18n.t(key, fallback);
    }
    return fallback;
  }

  function getAssetPrefix() {
    if (window.mgeneticaI18n && typeof window.mgeneticaI18n.getAssetPrefix === 'function') {
      return window.mgeneticaI18n.getAssetPrefix();
    }
    return window.location.pathname.indexOf('/modules/') >= 0 || window.location.pathname.indexOf('/semanas/') >= 0 ? '../' : '';
  }

  function isDarkTheme() {
    var html = document.documentElement;
    var body = document.body;
    var attr = html.getAttribute('data-bs-theme') || body.getAttribute('data-bs-theme') || '';
    var classes = (html.className + ' ' + body.className).toLowerCase();

    return attr === 'dark' ||
      classes.indexOf('quarto-dark') >= 0 ||
      classes.indexOf('dark') >= 0;
  }

  function updateLogo() {
    var logo = document.querySelector('.navbar-brand img');
    if (!logo) return;

    var next = isDarkTheme() ? DARK_LOGO : LIGHT_LOGO;
    logo.setAttribute('src', getAssetPrefix() + next);
  }

  function persistTheme() {
    try {
      localStorage.setItem(STORAGE_KEY, isDarkTheme() ? 'dark' : 'light');
    } catch (_) {}
  }

  function enhanceToggle() {
    document.querySelectorAll('.quarto-color-scheme-toggle').forEach(function (toggle) {
      var label = t('theme.toggle', t('darkmode.toggle', 'Alternar tema claro ou escuro'));
      toggle.setAttribute('aria-label', label);
      toggle.setAttribute('title', label);
      toggle.addEventListener('click', function () {
        setTimeout(function () {
          persistTheme();
          updateLogo();
        }, 80);
      });
    });
  }

  function init() {
    enhanceToggle();
    updateLogo();
    persistTheme();

    var observer = new MutationObserver(function () {
      updateLogo();
      persistTheme();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-bs-theme'] });
    if (document.body) {
      observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-bs-theme'] });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('mgenetica:i18n-ready', function () {
    enhanceToggle();
  });
})();
