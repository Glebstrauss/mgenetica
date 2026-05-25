(function () {
  'use strict';

  function t(key, fallback) {
    if (window.mgeneticaI18n && typeof window.mgeneticaI18n.t === 'function') {
      return window.mgeneticaI18n.t(key, fallback);
    }
    return fallback;
  }

  const MODULES = [
    'modulo01', 'modulo02', 'modulo03', 'modulo04',
    'modulo05', 'modulo06', 'modulo07', 'modulo08',
    'modulo09', 'modulo10', 'modulo11', 'modulo12',
    'modulo13', 'modulo14', 'modulo15', 'modulo16',
    'modulo17', 'modulo18', 'modulo19', 'modulo20',
    'modulo21'
  ];

  const STORAGE_KEY = 'mgenetica_completed';

  function getCompleted() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (_) {
      return [];
    }
  }

  function saveCompleted(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function markModuleComplete(moduleId) {
    const completed = getCompleted();
    if (!completed.includes(moduleId)) {
      completed.push(moduleId);
      saveCompleted(completed);
      updateUI();
    }
  }

  function getCurrentModule() {
    const match = window.location.pathname.match(/modulo(\d{2})/);
    return match ? 'modulo' + match[1] : null;
  }

  // Inject the progress bar container above the sidebar module list
  function injectProgressBar(sidebar) {
    if (sidebar.querySelector('.mg-sidebar-progress')) return;

    const bar = document.createElement('div');
    bar.className = 'mg-sidebar-progress';
    bar.innerHTML =
      '<div class="mg-progress-label">' +
        '<span>' + t('progress.label', 'Progresso') + '</span>' +
        '<span class="mg-progress-count">0/21</span>' +
      '</div>' +
      '<div class="mg-progress-bar-track">' +
        '<div class="mg-progress-bar-fill" style="width:0%"></div>' +
      '</div>';

    // Insert before the first sidebar section
    const firstSection = sidebar.querySelector('.sidebar-menu');
    if (firstSection) {
      sidebar.insertBefore(bar, firstSection);
    } else {
      sidebar.prepend(bar);
    }
  }

  function updateProgressBar(count, total) {
    const countEl = document.querySelector('.mg-progress-count');
    const fillEl  = document.querySelector('.mg-progress-bar-fill');
    if (countEl) countEl.textContent = count + '/' + total;
    if (fillEl)  fillEl.style.width  = Math.round((count / total) * 100) + '%';
  }

  function updateSidebarItems(completed) {
    const links = document.querySelectorAll(
      '#quarto-sidebar a[href], #quarto-sidebar .sidebar-item-text'
    );

    links.forEach(function (el) {
      const href = el.getAttribute('href') || el.closest('a')?.getAttribute('href') || '';
      const match = href.match(/modulo(\d{2})/);
      if (!match) return;

      const moduleId = 'modulo' + match[1];
      const container = el.closest('.sidebar-item-text') || el;

      // Remove existing indicator
      const old = container.querySelector('.mg-progress-indicator');
      if (old) old.remove();

      if (completed.includes(moduleId)) {
        const indicator = document.createElement('span');
        indicator.className = 'mg-progress-indicator mg-done';
        indicator.setAttribute('aria-label', t('progress.done', 'Concluído'));
        indicator.textContent = '✓';
        container.appendChild(indicator);
      }
    });
  }

  function updateUI() {
    const completed = getCompleted();
    const validCompleted = completed.filter(function (m) {
      return MODULES.includes(m);
    });
    const count = validCompleted.length;

    const sidebar = document.getElementById('quarto-sidebar');
    if (sidebar) {
      injectProgressBar(sidebar);
      updateProgressBar(count, MODULES.length);
      updateSidebarItems(validCompleted);
    }
  }

  // Expose API for quiz.js to call
  window.mgenetica = {
    markModuleComplete: markModuleComplete,
    getCompleted:       getCompleted,
    getCurrentModule:   getCurrentModule,
    MODULES:            MODULES
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateUI);
  } else {
    updateUI();
  }

  document.addEventListener('mgenetica:i18n-ready', updateUI);
})();
