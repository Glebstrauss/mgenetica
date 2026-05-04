(function () {
  'use strict';

  var STORAGE_KEY = 'mgenetica_theme';
  var LIGHT_LOGO = 'images/mgenetica-logo-correct.png';
  var DARK_LOGO = 'images/mgenetica-logo-dark.svg';

  function isDarkTheme() {
    var html = document.documentElement;
    var body = document.body;
    var attr = html.getAttribute('data-bs-theme') || body.getAttribute('data-bs-theme') || '';
    var classes = (html.className + ' ' + body.className).toLowerCase();

    return attr === 'dark' ||
      classes.indexOf('quarto-dark') >= 0 ||
      classes.indexOf('dark') >= 0;
  }

  function normalizeLogoPath(path, logo) {
    var inModule = window.location.pathname.indexOf('/modules/') >= 0 ||
      window.location.pathname.indexOf('/semanas/') >= 0;
    var prefix = inModule ? '../' : '';
    return prefix + path + '/' + logo;
  }

  function updateLogo() {
    var logo = document.querySelector('.navbar-brand img');
    if (!logo) return;

    var src = logo.getAttribute('src') || '';
    var path = src.indexOf('../images/') >= 0 ? '../images' : 'images';
    var next = isDarkTheme() ? DARK_LOGO : LIGHT_LOGO;
    logo.setAttribute('src', normalizeLogoPath(path.replace('../', ''), next.replace('images/', '')));
  }

  function persistTheme() {
    try {
      localStorage.setItem(STORAGE_KEY, isDarkTheme() ? 'dark' : 'light');
    } catch (_) {}
  }

  function enhanceToggle() {
    document.querySelectorAll('.quarto-color-scheme-toggle').forEach(function (toggle) {
      toggle.setAttribute('aria-label', 'Alternar tema claro ou escuro');
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
})();
