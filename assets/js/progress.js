(function () {
  'use strict';

  const MODULES = [
    'modulo01',
    'modulo02',
    'modulo03',
    'modulo04',
    'modulo05',
    'modulo06',
    'modulo07',
    'modulo08',
    'modulo09',
    'modulo10',
    'modulo11',
    'modulo12',
    'modulo13',
    'modulo14',
    'modulo15',
    'modulo16',
    'modulo17',
    'modulo18',
    'modulo19',
    'modulo20',
    'modulo21'
  ];

  const MODULE_LINKS = {
    modulo01: 'modulo01-revis-ao-de-gen-etica-b-asica.html',
    modulo02: 'modulo02-modos-de-ac-ao-g-enica.html',
    modulo03: 'modulo03-gen-etica-de-populac-oes-i-frequ-encias-al-elicas-e-genot-ipicas.html',
    modulo04: 'modulo04-hardy-weinberg-alelos-m-ultiplos-e-genes-ligados-ao-sexo.html',
    modulo05: 'modulo05-fatores-que-alteram-frequ-encias-g-enicas.html',
    modulo06: 'modulo06-valores-e-m-edias-fen-otipo-gen-otipo-e-ambiente.html',
    modulo07: 'modulo07-noc-oes-de-gen-etica-quantitativa.html',
    modulo08: 'modulo08-componentes-de-vari-ancia.html',
    modulo09: 'modulo09-herdabilidade-e-repetibilidade.html',
    modulo10: 'modulo10-selec-ao-e-ganho-gen-etico.html',
    modulo11: 'modulo11-correlac-oes-gen-eticas-fenot-ipicas-e-ambientais.html',
    modulo12: 'modulo12-caracter-isticas-de-limiar.html',
    modulo13: 'modulo13-endogamia-e-parentesco.html',
    modulo14: 'modulo14-cruzamentos-heterose-e-complementaridade.html',
    modulo15: 'modulo15-avaliac-ao-gen-etica-dep-ebv-e-ranking-de-animais.html',
    modulo16: 'modulo16-modelos-lineares-e-modelos-mistos.html',
    modulo17: 'modulo17-blup-e-modelo-animal.html',
    modulo18: 'modulo18-gen-omica-marcadores-snp-e-dados-moleculares.html',
    modulo19: 'modulo19-controle-de-qualidade-de-dados-gen-omicos.html',
    modulo20: 'modulo20-matrizes-gen-omicas-gwas-e-predic-ao-gen-omica.html',
    modulo21: 'modulo21-projeto-final-pipeline-completo-de-selec-ao.html'
  };

  const STUDY_ITEMS = [
    { id: 'leitura-pergunta', label: 'leitura inicial', href: '#item-leitura-pergunta' },
    { id: 'leitura-conceito', label: 'conceito técnico', href: '#item-leitura-conceito' },
    { id: 'exercicio', label: 'exercício manual', href: '#item-exercicio' },
    { id: 'laboratorio', label: 'laboratório R', href: '#item-laboratorio' },
    { id: 'quiz', label: 'quiz', href: '#item-quiz' }
  ];

  const STORAGE_KEY = 'mgenetica_completed';
  const ITEM_STORAGE_KEY = 'mgenetica_study_items';

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

  function getCompletedItems() {
    try {
      return JSON.parse(localStorage.getItem(ITEM_STORAGE_KEY)) || {};
    } catch (_) {
      return {};
    }
  }

  function saveCompletedItems(state) {
    localStorage.setItem(ITEM_STORAGE_KEY, JSON.stringify(state));
  }

  function markAllStudyItems(moduleId, state) {
    const nextState = state || getCompletedItems();
    nextState[moduleId] = STUDY_ITEMS.map(function (item) { return item.id; });
    saveCompletedItems(nextState);
  }

  function markModuleComplete(moduleId) {
    const completed = getCompleted();
    markAllStudyItems(moduleId);
    if (!completed.includes(moduleId)) {
      completed.push(moduleId);
      saveCompleted(completed);
    }
    updateUI();
  }

  function markStudyItemComplete(moduleId, itemId) {
    const state = getCompletedItems();
    const items = state[moduleId] || [];
    if (!items.includes(itemId)) items.push(itemId);
    state[moduleId] = items;
    saveCompletedItems(state);
    if (STUDY_ITEMS.every(function (item) { return items.includes(item.id); })) {
      markModuleComplete(moduleId);
      return;
    }
    updateUI();
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
        '<span>Progresso</span>' +
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
        indicator.setAttribute('aria-label', 'Concluído');
        indicator.textContent = '✓';
        container.appendChild(indicator);
      }
    });
  }

  function updateCourseProgress(validCompleted) {
    const summary = document.querySelector('[data-course-progress-summary]');
    const fill = document.querySelector('[data-course-progress-fill]');
    const link = document.querySelector('[data-course-continue]');
    if (!summary && !fill && !link) return;

    const count = validCompleted.length;
    const total = MODULES.length;
    const nextModule = MODULES.find(function (moduleId) {
      return !validCompleted.includes(moduleId);
    });

    if (summary) summary.textContent = count + '/' + total + ' blocos temáticos concluídos';
    if (fill) fill.style.width = Math.round((count / total) * 100) + '%';
    if (link) {
      if (nextModule) {
        link.href = MODULE_LINKS[nextModule] || link.href;
        link.textContent = count === 0 ? 'Começar curso' : 'Continuar estudo';
        link.setAttribute('aria-label', 'Continuar estudo pelo ' + nextModule);
      } else {
        link.href = '../certificado.html';
        link.textContent = 'Emitir certificado';
        link.setAttribute('aria-label', 'Abrir certificado de conclusão');
      }
    }
  }

  function updateStudyToolbar() {
    const moduleId = getCurrentModule();
    const toolbar = document.querySelector('[data-study-toolbar]');
    if (!moduleId || !toolbar) return;

    const state = getCompletedItems();
    const done = state[moduleId] || [];
    const nextItem = STUDY_ITEMS.find(function (item) { return !done.includes(item.id); });
    const count = done.filter(function (itemId) {
      return STUDY_ITEMS.some(function (item) { return item.id === itemId; });
    }).length;

    document.querySelectorAll('[data-study-item-id]').forEach(function (el) {
      const itemId = el.getAttribute('data-study-item-id');
      const item = STUDY_ITEMS.find(function (entry) { return entry.id === itemId; });
      const meta = el.querySelector('.study-item-meta');
      const isDone = done.includes(itemId);
      const isCurrent = nextItem && nextItem.id === itemId;
      el.classList.toggle('is-done', isDone);
      el.classList.toggle('is-current', isCurrent);
      el.classList.toggle('is-pending', !isDone && !isCurrent);
      const itemLink = el.querySelector('.study-item-link');
      if (itemLink) {
        if (isCurrent) itemLink.setAttribute('aria-current', 'step');
        else itemLink.removeAttribute('aria-current');
      }
      if (meta && item) {
        const time = meta.textContent.split('·')[0].trim();
        meta.textContent = time + ' · status: ' + (isDone ? 'concluído' : isCurrent ? 'atual' : 'pendente');
      }
    });

    const countEl = toolbar.querySelector('[data-study-count]');
    const fillEl = toolbar.querySelector('[data-study-fill]');
    const currentEl = toolbar.querySelector('[data-study-current]');
    const nextLink = toolbar.querySelector('[data-next-study-link]');
    const completeButton = toolbar.querySelector('[data-complete-item]');

    if (countEl) countEl.textContent = count + '/' + STUDY_ITEMS.length + ' itens';
    if (fillEl) fillEl.style.width = Math.round((count / STUDY_ITEMS.length) * 100) + '%';
    if (currentEl) currentEl.textContent = nextItem ? 'Próximo: ' + nextItem.label : 'Bloco concluído';
    if (nextLink) {
      nextLink.href = nextItem ? nextItem.href : (toolbar.getAttribute('data-next-href') || '#');
      nextLink.textContent = nextItem ? 'Próximo item' : 'Próximo bloco';
    }
    if (completeButton) {
      completeButton.disabled = !nextItem;
      completeButton.textContent = nextItem ? 'Marcar item atual' : 'Bloco concluído';
      if (!completeButton.dataset.studyBound) {
        completeButton.addEventListener('click', function () {
          const current = STUDY_ITEMS.find(function (item) {
            const latest = getCompletedItems()[moduleId] || [];
            return !latest.includes(item.id);
          });
          if (current) markStudyItemComplete(moduleId, current.id);
        });
        completeButton.dataset.studyBound = '1';
      }
    }
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

    updateCourseProgress(validCompleted);
    updateStudyToolbar();
  }

  // Expose API for quiz.js to call
  window.mgenetica = {
    markModuleComplete: markModuleComplete,
    markStudyItemComplete: markStudyItemComplete,
    getCompleted:       getCompleted,
    getCurrentModule:   getCurrentModule,
    MODULES:            MODULES,
    STUDY_ITEMS:        STUDY_ITEMS
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateUI);
  } else {
    updateUI();
  }
})();
