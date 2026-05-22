(function () {
  'use strict';

  var STORAGE_KEY = 'mgenetica_locale';
  var DEFAULT_LOCALE = 'pt-BR';
  var SUPPORTED = ['pt-BR', 'en', 'es'];
  var ALIAS = { pt: 'pt-BR', 'pt-br': 'pt-BR', en: 'en', es: 'es' };
  var SPECIAL_ROUTES = [
    {
      test: /^\/$|^\/index\.(html|qmd)$/i,
      paths: { 'pt-BR': '/', en: '/en/', es: '/es/' }
    },
    {
      test: /^\/modules(\/index\.(html|qmd))?\/?$/i,
      paths: { 'pt-BR': '/modules/', en: '/en/modules/', es: '/es/modules/' }
    },
    {
      test: /^\/semanas(\/index\.(html|qmd))?\/?$/i,
      paths: { 'pt-BR': '/semanas/', en: '/en/semanas/', es: '/es/semanas/' }
    },
    {
      test: /^\/busca\.(html|qmd)$/i,
      paths: { 'pt-BR': '/busca.html', en: '/en/search.html', es: '/es/busqueda.html' }
    },
    {
      test: /^\/glossario\.(html|qmd)$/i,
      paths: { 'pt-BR': '/glossario.html', en: '/en/glossary.html', es: '/es/glosario.html' }
    },
    {
      test: /^\/perfil\.(html|qmd)$/i,
      paths: { 'pt-BR': '/perfil.html', en: '/en/about.html', es: '/es/sobre.html' }
    },
    {
      test: /^\/certificado\.(html|qmd)$/i,
      paths: { 'pt-BR': '/certificado.html', en: '/en/certificate.html', es: '/es/certificado.html' }
    }
  ];
  var FALLBACK = {};
  var dict = {};
  var locale = DEFAULT_LOCALE;
  var ready = false;
  var listeners = [];
  var PROJECT_BASE = '/mgenetica';

  function getBasePath() {
    var path = window.location.pathname || '/';
    if (path === PROJECT_BASE || path.indexOf(PROJECT_BASE + '/') === 0) return PROJECT_BASE;
    return '';
  }

  function getAssetPrefix() {
    if (typeof window.mgeneticaAssetPrefix === 'string') return window.mgeneticaAssetPrefix;
    var base = getBasePath();
    var path = window.location.pathname || '/';
    if (base && path.indexOf(base) === 0) path = path.slice(base.length) || '/';
    var clean = path.replace(/\/[^/]+\.(html|qmd)$/i, '/');
    var depth = clean.split('/').filter(Boolean).length;
    return depth === 0 ? '' : '../'.repeat(depth);
  }

  function normalizePath(pathname) {
    var path = String(pathname || '/').split('?')[0].split('#')[0];
    path = path.replace(/\/index\.html$/i, '/').replace(/\/index\.qmd$/i, '/');
    if (!path.startsWith('/')) path = '/' + path;
    if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
    if (path === '/en' || path === '/es') path += '/';
    return path || '/';
  }

  function stripLocalePrefix(path) {
    var normalized = normalizePath(path);
    var base = getBasePath();
    if (base && (normalized === base || normalized.indexOf(base + '/') === 0)) {
      normalized = normalized.slice(base.length) || '/';
      normalized = normalizePath(normalized);
    }
    if (normalized === '/en' || normalized === '/en/') return '/';
    if (normalized === '/es' || normalized === '/es/') return '/';
    return normalized.replace(/^\/(en|es)(?=\/)/i, '');
  }

  function withBase(path) {
    var base = getBasePath();
    if (!base) return path;
    if (path === '/') return base + '/';
    return base + path;
  }

  function mapPathToLocale(pathname, targetLocale) {
    var path = stripLocalePrefix(pathname);
    for (var i = 0; i < SPECIAL_ROUTES.length; i++) {
      if (SPECIAL_ROUTES[i].test.test(path)) {
        return withBase(SPECIAL_ROUTES[i].paths[targetLocale] || SPECIAL_ROUTES[i].paths[DEFAULT_LOCALE]);
      }
    }

    var moduleMatch = path.match(/^\/modules\/(modulo[0-9]{2}[^/]*\.(html|qmd))$/i);
    if (moduleMatch) {
      var prefix = targetLocale === DEFAULT_LOCALE ? '' : '/' + targetLocale;
      return withBase(prefix + '/modules/' + moduleMatch[1]);
    }

    return null;
  }

  function normalizeLocale(value) {
    if (!value) return null;
    var raw = String(value).trim();
    if (!raw) return null;
    if (SUPPORTED.indexOf(raw) >= 0) return raw;
    var low = raw.toLowerCase();
    if (ALIAS[low]) return ALIAS[low];
    if (low.indexOf('-') >= 0) {
      var shortCode = low.split('-')[0];
      if (ALIAS[shortCode]) return ALIAS[shortCode];
    }
    return null;
  }

  function getLocaleFromPath() {
    var parts = window.location.pathname.split('/').filter(Boolean);
    if (parts[0] === PROJECT_BASE.slice(1)) parts.shift();
    var first = parts[0];
    return normalizeLocale(first);
  }

  function readStoredLocale() {
    try {
      return normalizeLocale(localStorage.getItem(STORAGE_KEY));
    } catch (_) {
      return null;
    }
  }

  function saveLocale(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (_) {}
  }

  function resolveLocale() {
    var byPath = getLocaleFromPath();
    var params = new URLSearchParams(window.location.search);
    var byQuery = normalizeLocale(params.get('lang'));
    if (byPath) {
      saveLocale(byPath);
      return byPath;
    }
    if (byQuery) {
      saveLocale(byQuery);
      return byQuery;
    }
    return readStoredLocale() || normalizeLocale(document.documentElement.lang) || DEFAULT_LOCALE;
  }

  function template(text, vars) {
    return String(text).replace(/\{([a-zA-Z0-9_]+)\}/g, function (_, key) {
      return Object.prototype.hasOwnProperty.call(vars || {}, key) ? vars[key] : '{' + key + '}';
    });
  }

  function t(key, fallback, vars) {
    var value = dict[key];
    if (value == null) value = FALLBACK[key];
    if (value == null) value = fallback != null ? fallback : key;
    return template(value, vars);
  }

  function applyDataI18n() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!key) return;
      el.textContent = t(key, el.textContent);
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria-label');
      if (!key) return;
      el.setAttribute('aria-label', t(key, el.getAttribute('aria-label') || ''));
    });

    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-title');
      if (!key) return;
      el.setAttribute('title', t(key, el.getAttribute('title') || ''));
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (!key) return;
      el.setAttribute('placeholder', t(key, el.getAttribute('placeholder') || ''));
    });
  }

  function localHref(href) {
    if (!href) return '';
    try {
      var parsed = new URL(href, window.location.href);
      if (parsed.origin === window.location.origin) return parsed.pathname;
      return parsed.href;
    } catch (_) {
      return href.replace(window.location.origin, '').split('#')[0];
    }
  }

  function translateNavAndFooter() {
    var rules = [
      { re: /(^\/?$|^\/index\.(html|qmd)$|^\/(en|es)\/?$|^\/(en|es)\/index\.(html|qmd)$)/i, key: 'nav.home' },
      { re: /\/modules(\/index\.(html|qmd))?\/?$/i, key: 'nav.modules' },
      { re: /\/semanas(\/index\.(html|qmd))?\/?$/i, key: 'nav.route' },
      { re: /\/(busca|search|busqueda)\.(html|qmd)$/i, key: 'nav.search' },
      { re: /\/(glossario|glossary|glosario)\.(html|qmd)$/i, key: 'nav.glossary' },
      { re: /certificado\.(html|qmd)$/, key: 'nav.certificate' },
      { re: /\/(perfil|about|sobre)\.(html|qmd)$/i, key: 'nav.about' },
      { re: /modulo01-revisao-de-genetica-basica\.(html|qmd)$/, key: 'nav.start_m01' },
      { re: /github\.com\/(Glebstrauss|Mgenetica)\/mgenetica\/issues\/new$/i, key: 'nav.feedback' }
    ];

    document.querySelectorAll('a[href]').forEach(function (anchor) {
      if (anchor.closest('.navbar-brand')) return;
      var href = localHref(anchor.getAttribute('href') || '');
      if (!href) return;
      for (var i = 0; i < rules.length; i++) {
        var rule = rules[i];
        if (rule.re.test(href)) {
          anchor.textContent = t(rule.key, anchor.textContent);
          var target = mapPathToLocale(href, locale);
          if (target) anchor.setAttribute('href', target);
          break;
        }
      }
    });
  }

  function buildLocaleSwitcher() {
    if (document.querySelector('.mg-locale-switcher')) return;
    var holder = document.createElement('div');
    holder.className = 'mg-locale-switcher';
    holder.setAttribute('role', 'group');
    holder.setAttribute('aria-label', t('lang.label', 'Language'));
    SUPPORTED.forEach(function (code) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'mg-locale-btn';
      button.setAttribute('data-locale', code);
      button.setAttribute('aria-pressed', code === locale ? 'true' : 'false');
      button.textContent = t('lang.' + code, code);
      button.addEventListener('click', function () {
        if (code === locale) return;
        saveLocale(code);
        var targetPath = mapPathToLocale(window.location.pathname, code);
        if (targetPath) {
          window.location.assign(targetPath + window.location.hash);
          return;
        }
        var params = new URLSearchParams(window.location.search);
        params.set('lang', code);
        window.location.search = params.toString();
      });
      holder.appendChild(button);
    });
    var navbar = document.querySelector('.navbar .navbar-collapse') || document.querySelector('.navbar .container-fluid') || document.querySelector('.navbar');
    if (navbar) {
      navbar.appendChild(holder);
    } else {
      document.body.appendChild(holder);
    }
  }

  function applyLocale() {
    document.documentElement.lang = locale;
    applyDataI18n();
    translateNavAndFooter();
    buildLocaleSwitcher();
    document.dispatchEvent(new CustomEvent('mgenetica:i18n-ready', { detail: { locale: locale } }));
    while (listeners.length) listeners.shift()();
  }

  function onReady(callback) {
    if (ready) {
      callback();
      return;
    }
    listeners.push(callback);
  }

  function loadLocaleDictionary(code) {
    var url = getAssetPrefix() + 'assets/i18n/' + encodeURIComponent(code) + '.json';
    return fetch(url, { cache: 'no-cache' }).then(function (response) {
      if (!response.ok) throw new Error('i18n dictionary not found: ' + code);
      return response.json();
    });
  }

  window.mgeneticaI18n = {
    t: t,
    locale: function () { return locale; },
    onReady: onReady,
    getAssetPrefix: getAssetPrefix
  };

  locale = resolveLocale();

  Promise.resolve()
    .then(function () { return loadLocaleDictionary(DEFAULT_LOCALE); })
    .then(function (base) {
      FALLBACK = base || {};
      if (locale === DEFAULT_LOCALE) return FALLBACK;
      return loadLocaleDictionary(locale).catch(function () { return FALLBACK; });
    })
    .then(function (selected) {
      dict = selected || FALLBACK;
      ready = true;
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyLocale);
      } else {
        applyLocale();
      }
    })
    .catch(function () {
      ready = true;
      dict = FALLBACK;
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyLocale);
      } else {
        applyLocale();
      }
    });
})();
