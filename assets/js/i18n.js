(function () {
  'use strict';

  var STORAGE_KEY = 'mgenetica_locale';
  var DEFAULT_LOCALE = 'pt-BR';
  var SUPPORTED = ['pt-BR', 'en', 'es'];
  var ALIAS = { pt: 'pt-BR', 'pt-br': 'pt-BR', en: 'en', es: 'es' };
  var ROUTES = {
    home: { 'pt-BR': '/', en: '/en/', es: '/es/' },
    modules: { 'pt-BR': '/modules/', en: '/en/modules/', es: '/es/modules/' },
    studyPath: { 'pt-BR': '/semanas/', en: '/en/semanas/', es: '/es/semanas/' },
    search: { 'pt-BR': '/busca.html', en: '/en/search.html', es: '/es/busqueda.html' },
    glossary: { 'pt-BR': '/glossario.html', en: '/en/glossary.html', es: '/es/glosario.html' },
    about: { 'pt-BR': '/perfil.html', en: '/en/about.html', es: '/es/sobre.html' }
  };
  var ROUTE_PATTERNS = {
    home: [/^\/$/, /^\/index\.(html|qmd)$/i, /^\/en\/?$/i, /^\/en\/index\.(html|qmd)$/i, /^\/es\/?$/i, /^\/es\/index\.(html|qmd)$/i],
    modules: [/^\/modules(\/index\.(html|qmd))?\/?$/i, /^\/en\/modules(\/index\.(html|qmd))?\/?$/i, /^\/es\/modules(\/index\.(html|qmd))?\/?$/i],
    studyPath: [/^\/semanas(\/index\.(html|qmd))?\/?$/i, /^\/en\/semanas(\/index\.(html|qmd))?\/?$/i, /^\/es\/semanas(\/index\.(html|qmd))?\/?$/i],
    search: [/^\/busca\.(html|qmd)$/i, /^\/en\/search\.(html|qmd)$/i, /^\/es\/busqueda\.(html|qmd)$/i],
    glossary: [/^\/glossario\.(html|qmd)$/i, /^\/en\/glossary\.(html|qmd)$/i, /^\/es\/glosario\.(html|qmd)$/i],
    about: [/^\/perfil\.(html|qmd)$/i, /^\/en\/about\.(html|qmd)$/i, /^\/es\/sobre\.(html|qmd)$/i]
  };
  var FALLBACK = {};
  var dict = {};
  var locale = DEFAULT_LOCALE;
  var ready = false;
  var listeners = [];

  function getAssetPrefix() {
    if (typeof window.mgeneticaAssetPrefix === 'string') return window.mgeneticaAssetPrefix;
    var path = window.location.pathname;
    return path.indexOf('/modules/') >= 0 || path.indexOf('/semanas/') >= 0 ? '../' : '';
  }

  function normalizePath(pathname) {
    var path = String(pathname || '/').split('?')[0].split('#')[0];
    path = path.replace(/\/index\.html$/i, '/').replace(/\/index\.qmd$/i, '/');
    if (!path.startsWith('/')) path = '/' + path;
    if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
    if (path === '/en' || path === '/es') path += '/';
    return path || '/';
  }

  function matchRouteId(pathname) {
    var path = normalizePath(pathname);
    var ids = Object.keys(ROUTE_PATTERNS);
    for (var i = 0; i < ids.length; i++) {
      var routeId = ids[i];
      var patterns = ROUTE_PATTERNS[routeId];
      for (var j = 0; j < patterns.length; j++) {
        if (patterns[j].test(path)) return routeId;
      }
    }
    return null;
  }

  function localizedRoutePath(routeId, targetLocale) {
    if (!routeId || !ROUTES[routeId]) return null;
    return ROUTES[routeId][targetLocale] || ROUTES[routeId][DEFAULT_LOCALE] || null;
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
    var first = window.location.pathname.split('/').filter(Boolean)[0];
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
      { routeId: 'home', key: 'nav.home' },
      { routeId: 'modules', key: 'nav.modules' },
      { routeId: 'studyPath', key: 'nav.route' },
      { routeId: 'search', key: 'nav.search' },
      { routeId: 'glossary', key: 'nav.glossary' },
      { re: /certificado\.(html|qmd)$/, key: 'nav.certificate' },
      { routeId: 'about', key: 'nav.about' },
      { re: /modulo01-introducao-ao-melhoramento-animal\.(html|qmd)$/, key: 'nav.start_m01' },
      { re: /github\.com\/Glebstrauss\/mgenetica\/issues\/new$/, key: 'nav.feedback' }
    ];

    document.querySelectorAll('a[href]').forEach(function (anchor) {
      var href = localHref(anchor.getAttribute('href') || '');
      if (!href) return;
      for (var i = 0; i < rules.length; i++) {
        var rule = rules[i];
        var routeId = rule.routeId ? matchRouteId(href) : null;
        var matches = rule.routeId ? routeId === rule.routeId : rule.re.test(href);
        if (matches) {
          anchor.textContent = t(rule.key, anchor.textContent);
          if (rule.routeId) {
            var target = localizedRoutePath(rule.routeId, locale);
            if (target) anchor.setAttribute('href', target);
          }
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
        var currentRouteId = matchRouteId(window.location.pathname);
        var targetPath = localizedRoutePath(currentRouteId, code);
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
    document.body.appendChild(holder);
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
