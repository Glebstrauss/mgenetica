(function () {
  'use strict';

  var STORAGE_KEY = 'mgenetica_teacher_mode';

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
      button.textContent = value ? 'Modo professor ativo' : 'Modo professor';
    }
    document.dispatchEvent(new CustomEvent('mgenetica:teacher-mode', { detail: { enabled: value } }));
  }

  function init() {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'teacher-mode-toggle';
    button.setAttribute('aria-label', 'Alternar modo professor');
    button.setAttribute('title', 'Alternar modo professor');
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
})();
