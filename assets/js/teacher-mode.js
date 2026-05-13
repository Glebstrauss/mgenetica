(function () {
  'use strict';

  var STORAGE_KEY = 'mgenetica_teacher_mode';

  function t(key, fallback) {
    if (window.mgeneticaI18n && typeof window.mgeneticaI18n.t === 'function') {
      return window.mgeneticaI18n.t(key, fallback);
    }
    return fallback;
  }

  function enabled() {
    try { return localStorage.getItem(STORAGE_KEY) === '1'; }
    catch (_) { return false; }
  }

  function setEnabled(value) {
    try { localStorage.setItem(STORAGE_KEY, value ? '1' : '0'); }
    catch (_) {}
    document.documentElement.classList.toggle('teacher-mode', value);
    var button = document.querySelector('.teacher-mode-toggle');
    if (button) {
      button.setAttribute('aria-pressed', value ? 'true' : 'false');
      button.textContent = value ? t('teacher.active', 'Modo professor ativo') : t('teacher.inactive', 'Modo professor');
    }
    document.dispatchEvent(new CustomEvent('mgenetica:teacher-mode', { detail: { enabled: value } }));
  }

  function init() {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'teacher-mode-toggle';
    button.setAttribute('aria-label', t('teacher.toggle', 'Alternar modo professor'));
    button.setAttribute('title', t('teacher.title', 'Alternar modo professor'));
    button.addEventListener('click', function () { setEnabled(!enabled()); });
    document.body.appendChild(button);
    setEnabled(enabled());
  }

  window.mgeneticaTeacher = {
    enabled: enabled,
    setEnabled: setEnabled
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('mgenetica:i18n-ready', function () {
    var button = document.querySelector('.teacher-mode-toggle');
    if (!button) return;
    button.setAttribute('aria-label', t('teacher.toggle', 'Alternar modo professor'));
    button.setAttribute('title', t('teacher.title', 'Alternar modo professor'));
    setEnabled(enabled());
  });
})();
