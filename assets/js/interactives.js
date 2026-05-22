(function () {
  'use strict';

  function t(key, fallback) {
    if (window.mgeneticaI18n && typeof window.mgeneticaI18n.t === 'function') {
      return window.mgeneticaI18n.t(key, fallback);
    }
    return fallback;
  }

  function getLocale() {
    if (window.mgeneticaI18n && typeof window.mgeneticaI18n.locale === 'function') {
      return window.mgeneticaI18n.locale();
    }
    return 'pt-BR';
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function moduleLabels() {
    var locale = getLocale();
    if (locale === 'en') {
      return [
        ['01', 'Introduction', 'Fundamentals'],
        ['02', 'P = G + E', 'Fundamentals'],
        ['03', 'Exploration', 'Statistics'],
        ['04', 'Variances', 'Parameters'],
        ['05', 'h2 and r', 'Parameters'],
        ['06', 'Correlations', 'Parameters'],
        ['07', 'Models', 'Modeling'],
        ['08', 'BLUP', 'Evaluation'],
        ['09', 'Pedigree', 'Kinship'],
        ['10', 'SNPs', 'Genomics'],
        ['11', 'Genomic QC', 'Genomics'],
        ['12', 'GWAS/GBLUP', 'Genomics']
      ];
    }
    if (locale === 'es') {
      return [
        ['01', 'Introducción', 'Fundamentos'],
        ['02', 'P = G + E', 'Fundamentos'],
        ['03', 'Exploración', 'Estadística'],
        ['04', 'Varianzas', 'Parámetros'],
        ['05', 'h2 y r', 'Parámetros'],
        ['06', 'Correlaciones', 'Parámetros'],
        ['07', 'Modelos', 'Modelado'],
        ['08', 'BLUP', 'Evaluación'],
        ['09', 'Pedigrí', 'Parentesco'],
        ['10', 'SNPs', 'Genómica'],
        ['11', 'QC genómico', 'Genómica'],
        ['12', 'GWAS/GBLUP', 'Genómica']
      ];
    }
    return MODULES;
  }

  var MODULES = [
    ['01', 'Revisão de genética básica', 'Módulo'],
    ['02', 'Modos de ação gênica', 'Módulo'],
    ['03', 'Genética de populações I: frequências alélicas e genotípicas', 'Módulo'],
    ['04', 'Hardy-Weinberg, alelos múltiplos e genes ligados ao sexo', 'Módulo'],
    ['05', 'Fatores que alteram frequências gênicas', 'Módulo'],
    ['06', 'Valores e médias: fenótipo, genótipo e ambiente', 'Módulo'],
    ['07', 'Noções de genética quantitativa', 'Módulo'],
    ['08', 'Componentes de variância', 'Módulo'],
    ['09', 'Herdabilidade e repetibilidade', 'Módulo'],
    ['10', 'Seleção e ganho genético', 'Módulo'],
    ['11', 'Correlações genéticas, fenotípicas e ambientais', 'Módulo'],
    ['12', 'Características de limiar', 'Módulo'],
    ['13', 'Endogamia e parentesco', 'Módulo'],
    ['14', 'Cruzamentos, heterose e complementaridade', 'Módulo'],
    ['15', 'Avaliação genética: DEP/EBV e ranking de animais', 'Módulo'],
    ['16', 'Modelos lineares e modelos mistos', 'Módulo'],
    ['17', 'BLUP e modelo animal', 'Módulo'],
    ['18', 'Genômica, marcadores SNP e dados moleculares', 'Módulo'],
    ['19', 'Controle de qualidade de dados genômicos', 'Módulo'],
    ['20', 'Matrizes genômicas, GWAS e predição genômica', 'Módulo'],
    ['21', 'Projeto final: pipeline completo de seleção', 'Módulo']
  ];

  var MODULE_LINKS = [
    'modulo01-revisao-de-genetica-basica.qmd',
    'modulo02-modos-de-acao-genica.qmd',
    'modulo03-genetica-de-populacoes-i-frequencias-alelicas-e-genotipicas.qmd',
    'modulo04-hardy-weinberg-alelos-multiplos-e-genes-ligados-ao-sexo.qmd',
    'modulo05-fatores-que-alteram-frequencias-genicas.qmd',
    'modulo06-valores-e-medias-fenotipo-genotipo-e-ambiente.qmd',
    'modulo07-nocoes-de-genetica-quantitativa.qmd',
    'modulo08-componentes-de-variancia.qmd',
    'modulo09-herdabilidade-e-repetibilidade.qmd',
    'modulo10-selecao-e-ganho-genetico.qmd',
    'modulo11-correlacoes-geneticas-fenotipicas-e-ambientais.qmd',
    'modulo12-caracteristicas-de-limiar.qmd',
    'modulo13-endogamia-e-parentesco.qmd',
    'modulo14-cruzamentos-heterose-e-complementaridade.qmd',
    'modulo15-avaliacao-genetica-dep-ebv-e-ranking-de-animais.qmd',
    'modulo16-modelos-lineares-e-modelos-mistos.qmd',
    'modulo17-blup-e-modelo-animal.qmd',
    'modulo18-genomica-marcadores-snp-e-dados-moleculares.qmd',
    'modulo19-controle-de-qualidade-de-dados-genomicos.qmd',
    'modulo20-matrizes-genomicas-gwas-e-predicao-genomica.qmd',
    'modulo21-projeto-final-pipeline-completo-de-selecao.qmd'
  ];

  function completedModules() {
    try {
      if (window.mgenetica && window.mgenetica.getCompleted) return window.mgenetica.getCompleted();
      return JSON.parse(localStorage.getItem('mgenetica_completed')) || [];
    } catch (_) {
      return [];
    }
  }

  function h(tag, attrs, html) {
    var el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      if (key === 'class') el.className = attrs[key];
      else el.setAttribute(key, attrs[key]);
    });
    if (html != null) el.textContent = html;
    return el;
  }

  function clearNode(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function createSvgNode(tag, attrs) {
    var node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.keys(attrs || {}).forEach(function (key) {
      node.setAttribute(key, attrs[key]);
    });
    return node;
  }

  function renderKpiGrid(container, items) {
    clearNode(container);
    var grid = document.createElement('div');
    grid.className = 'mg-kpi-grid';
    items.forEach(function (item) {
      var card = document.createElement('div');
      var label = document.createElement('span');
      var value = document.createElement('strong');
      label.textContent = item.label;
      value.textContent = item.value;
      card.appendChild(label);
      card.appendChild(value);
      grid.appendChild(card);
    });
    container.appendChild(grid);
    return grid;
  }

  function appendVizHead(container, titleText, copyText) {
    var head = document.createElement('div');
    var title = document.createElement('h3');
    var copy = document.createElement('p');
    head.className = 'mg-viz-head';
    title.textContent = titleText;
    copy.textContent = copyText;
    head.appendChild(title);
    head.appendChild(copy);
    container.appendChild(head);
    return head;
  }

  function appendRangeControl(container, labelText, min, max, value, key) {
    var label = document.createElement('label');
    var input = document.createElement('input');
    var output = document.createElement('span');
    label.appendChild(document.createTextNode(labelText + ' '));
    input.type = 'range';
    input.min = String(min);
    input.max = String(max);
    input.value = String(value);
    input.setAttribute('data-key', key);
    label.appendChild(input);
    label.appendChild(output);
    container.appendChild(label);
    return label;
  }

  function appendSvg(container, className, viewBox, ariaLabel) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', className);
    svg.setAttribute('viewBox', viewBox);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', ariaLabel);
    container.appendChild(svg);
    return svg;
  }

  function renderBarsNode(values, labels, colors) {
    var max = Math.max.apply(null, values);
    var root = document.createElement('div');
    root.className = 'mg-bars';
    values.forEach(function (value, i) {
      var row = document.createElement('div');
      var label = document.createElement('span');
      var track = document.createElement('div');
      var fill = document.createElement('i');
      var strong = document.createElement('strong');
      row.className = 'mg-bar-row';
      label.textContent = labels[i];
      track.className = 'mg-bar-track';
      fill.style.width = (100 * value / max) + '%';
      fill.style.background = colors[i];
      strong.textContent = number(value, 1);
      track.appendChild(fill);
      row.appendChild(label);
      row.appendChild(track);
      row.appendChild(strong);
      root.appendChild(row);
    });
    return root;
  }

  function number(value, digits) {
    return Number(value).toFixed(digits == null ? 2 : digits);
  }

  function renderBars(values, labels, colors) {
    var max = Math.max.apply(null, values);
    return '<div class="mg-bars">' + values.map(function (value, i) {
      return '<div class="mg-bar-row"><span>' + escapeHtml(labels[i]) + '</span>' +
        '<div class="mg-bar-track"><i style="width:' + (100 * value / max) + '%;background:' + colors[i] + '"></i></div>' +
        '<strong>' + number(value, 1) + '</strong></div>';
    }).join('') + '</div>';
  }

  function initPGE(el) {
    clearNode(el);
    appendVizHead(el, 'Distribuicao P = G + E', 'Ajuste as variancias e observe como h2 muda quando VA compete com VE.');
    var controls = document.createElement('div');
    var output = document.createElement('div');
    controls.className = 'mg-control-grid';
    output.className = 'mg-viz-output';
    appendRangeControl(controls, 'VA', 40, 500, 200, 'va');
    appendRangeControl(controls, 'VD', 0, 220, 60, 'vd');
    appendRangeControl(controls, 'VI', 0, 120, 20, 'vi');
    appendRangeControl(controls, 'VE', 80, 650, 320, 've');
    el.appendChild(controls);
    el.appendChild(output);

    function draw() {
      var data = {};
      el.querySelectorAll('input').forEach(function (input) {
        data[input.dataset.key] = Number(input.value);
        input.nextElementSibling.textContent = input.value;
      });
      var vp = data.va + data.vd + data.vi + data.ve;
      var h2 = data.va / vp;
      var output = el.querySelector('.mg-viz-output');
      renderKpiGrid(output, [
        { label: 'VP', value: number(vp, 0) },
        { label: 'h2', value: number(h2, 3) },
        { label: 'h', value: number(Math.sqrt(h2), 3) }
      ]);
      output.appendChild(renderBarsNode([data.va, data.vd, data.vi, data.ve], ['VA', 'VD', 'VI', 'VE'], ['#2563a8', '#4a9fd1', '#d97706', '#5b6b7d']));
    }
    el.querySelectorAll('input').forEach(function (input) { input.addEventListener('input', draw); });
    draw();
  }

  function initH2(el) {
    clearNode(el);
    appendVizHead(el, 'Regressao pai-filho', 'O slider altera h2 e a inclinacao esperada da regressao: b = h2 / 2.');
    var controls = document.createElement('div');
    var output = document.createElement('div');
    controls.className = 'mg-control-grid';
    output.className = 'mg-viz-output';
    appendRangeControl(controls, 'h2', 5, 80, 32, 'h2');
    el.appendChild(controls);
    appendSvg(el, 'mg-scatter', '0 0 720 360', 'Grafico de dispersao pai-filho');
    el.appendChild(output);
    var points = Array.from({ length: 70 }, function (_, i) {
      var x = -2.4 + (i % 10) * 0.52 + ((i * 37) % 17) / 85;
      var noise = (((i * 53) % 29) - 14) / 16;
      return [x, noise];
    });
    function draw() {
      var h2 = Number(el.querySelector('input').value) / 100;
      el.querySelector('input').nextElementSibling.textContent = number(h2, 2);
      var b = h2 / 2;
      var svg = el.querySelector('svg');
      clearNode(svg);
      svg.appendChild(createSvgNode('line', { x1: '55', y1: '310', x2: '680', y2: '310', class: 'axis' }));
      svg.appendChild(createSvgNode('line', { x1: '55', y1: '30', x2: '55', y2: '310', class: 'axis' }));
      points.forEach(function (p) {
        var yVal = b * p[0] + p[1] * (1 - h2 * 0.5);
        var cx = 55 + (p[0] + 2.6) / 5.2 * 625;
        var cy = 170 - yVal / 2.8 * 140;
        svg.appendChild(createSvgNode('circle', { cx: String(cx), cy: String(cy), r: '4', class: 'dot' }));
      });
      var y1 = 170 - (b * -2.4) / 2.8 * 140;
      var y2 = 170 - (b * 2.4) / 2.8 * 140;
      svg.appendChild(createSvgNode('line', { x1: '80', y1: String(y1), x2: '655', y2: String(y2), class: 'trend' }));
      renderKpiGrid(el.querySelector('.mg-viz-output'), [
        { label: 'b esperado', value: number(b, 3) },
        { label: 'Resposta a selecao', value: h2 < 0.2 ? 'baixa' : h2 < 0.45 ? 'moderada' : 'alta' }
      ]);
    }
    el.querySelector('input').addEventListener('input', draw);
    draw();
  }

  function initBLUP(el) {
    var animals = [
      ['A15', 24.8, 26.2, 8], ['A10', 17.2, 2.3, 3], ['A17', 15.0, 12.8, 7], ['A18', 11.9, 7.1, 5],
      ['A13', 6.1, -9.0, 2], ['A06', 4.4, 5.5, 4], ['A12', -1.2, 1.0, 1], ['A03', -8.0, -6.5, 2]
    ];
    clearNode(el);
    appendVizHead(el, 'Ranking BLUP', 'Compare EBV, DEP e quantidade de informacao por candidato.');
    var segmented = document.createElement('div');
    var output = document.createElement('div');
    segmented.className = 'mg-segmented';
    output.className = 'mg-viz-output';
    ['ebv', 'dep', 'info'].forEach(function (mode, index) {
      var button = document.createElement('button');
      button.setAttribute('data-mode', mode);
      if (index === 0) button.className = 'active';
      button.textContent = mode === 'ebv' ? 'EBV' : mode === 'dep' ? 'DEP' : 'Filhos';
      segmented.appendChild(button);
    });
    el.appendChild(segmented);
    el.appendChild(output);
    function draw(mode) {
      el.querySelectorAll('.mg-segmented button').forEach(function (b) { b.classList.toggle('active', b.dataset.mode === mode); });
      var vals = animals.map(function (a) { return mode === 'dep' ? a[1] / 2 : mode === 'info' ? a[3] : a[1]; });
      var labels = animals.map(function (a) { return a[0]; });
      var output = el.querySelector('.mg-viz-output');
      var table = document.createElement('table');
      var thead = document.createElement('thead');
      var tbody = document.createElement('tbody');
      var headRow = document.createElement('tr');
      output.textContent = '';
      output.appendChild(renderBarsNode(vals.map(Math.abs), labels, vals.map(function (v) { return v >= 0 ? '#2563a8' : '#dc2626'; })));
      table.className = 'mg-compact-table';
      ['Animal', 'EBV', 'DEP', 'a real', 'filhos'].forEach(function (title) {
        var th = document.createElement('th');
        th.textContent = title;
        headRow.appendChild(th);
      });
      thead.appendChild(headRow);
      animals.forEach(function (a) {
        var row = document.createElement('tr');
        [a[0], a[1], number(a[1] / 2, 1), a[2], a[3]].forEach(function (value) {
          var td = document.createElement('td');
          td.textContent = String(value);
          row.appendChild(td);
        });
        tbody.appendChild(row);
      });
      table.appendChild(thead);
      table.appendChild(tbody);
      output.appendChild(table);
    }
    el.querySelectorAll('button').forEach(function (button) {
      button.addEventListener('click', function () { draw(button.dataset.mode); });
    });
    draw('ebv');
  }

  function initGWAS(el) {
    var qtl = [27, 82, 137, 204, 274];
    clearNode(el);
    appendVizHead(el, 'Manhattan plot simplificado', 'Altere o limiar e veja quais SNPs seriam declarados associados.');
    var controls = document.createElement('div');
    var output = document.createElement('div');
    controls.className = 'mg-control-grid';
    output.className = 'mg-viz-output';
    appendRangeControl(controls, 'Limiar -log10(p)', 2, 9, 5, 'threshold');
    el.appendChild(controls);
    appendSvg(el, 'mg-manhattan', '0 0 760 360', 'Manhattan plot interativo');
    el.appendChild(output);
    var points = Array.from({ length: 300 }, function (_, i) {
      var snp = i + 1;
      var base = 0.5 + ((i * 37) % 120) / 90;
      var boost = qtl.indexOf(snp) >= 0 ? 3 + (snp % 5) : 0;
      if (snp === 137) boost = 7.5;
      if (snp === 274) boost = 5.5;
      return [snp, base + boost];
    });
    function draw() {
      var threshold = Number(el.querySelector('input').value);
      el.querySelector('input').nextElementSibling.textContent = threshold;
      var svg = el.querySelector('svg');
      clearNode(svg);
      svg.appendChild(createSvgNode('line', { x1: '50', y1: '310', x2: '725', y2: '310', class: 'axis' }));
      svg.appendChild(createSvgNode('line', { x1: '50', y1: '30', x2: '50', y2: '310', class: 'axis' }));
      points.forEach(function (p) {
        var x = 50 + p[0] / 300 * 675;
        var y = 310 - Math.min(p[1], 9.5) / 9.5 * 270;
        var cls = p[1] >= threshold ? 'hit' : 'dot';
        svg.appendChild(createSvgNode('circle', { cx: String(x), cy: String(y), r: String(qtl.indexOf(p[0]) >= 0 ? 4 : 2.5), class: cls }));
      });
      var ty = 310 - threshold / 9.5 * 270;
      svg.appendChild(createSvgNode('line', { x1: '50', y1: String(ty), x2: '725', y2: String(ty), class: 'threshold' }));
      var hits = points.filter(function (p) { return p[1] >= threshold; }).length;
      renderKpiGrid(el.querySelector('.mg-viz-output'), [
        { label: 'SNPs acima do limiar', value: String(hits) },
        { label: 'QTLs simulados', value: String(qtl.length) }
      ]);
    }
    el.querySelector('input').addEventListener('input', draw);
    draw();
  }

  function initLearningMap(el) {
    var done = completedModules();
    var labels = moduleLabels();
    el.textContent = '';
    var grid = document.createElement('div');
    grid.className = 'learning-map-grid';
    labels.forEach(function (m, i) {
      var id = 'modulo' + m[0];
      var status = done.indexOf(id) >= 0 ? 'complete' : 'pending';
      var link = document.createElement('a');
      var numberEl = document.createElement('span');
      var titleEl = document.createElement('strong');
      var groupEl = document.createElement('em');
      link.className = 'learning-node ' + status;
      link.href = '../modules/' + MODULE_LINKS[i];
      numberEl.textContent = m[0];
      titleEl.textContent = m[1];
      groupEl.textContent = m[2];
      link.appendChild(numberEl);
      link.appendChild(titleEl);
      link.appendChild(groupEl);
      grid.appendChild(link);
    });
    el.appendChild(grid);
  }

  function initGlossary(el) {
    var items = [
      ['Herdabilidade', 'Proporcao da variancia fenotipica explicada por variancia genetica aditiva.'],
      ['Repetibilidade', 'Correlacao esperada entre medidas repetidas do mesmo animal.'],
      ['BLUP', 'Preditor linear nao viesado de efeitos aleatorios, como valores geneticos aditivos.'],
      ['EBV', 'Valor genetico estimado; no Brasil tambem aparece como valor de melhoramento.'],
      ['DEP', 'Diferenca esperada na progenie, aproximadamente EBV dividido por dois.'],
      ['Matriz A', 'Matriz de parentesco numerico derivada do pedigree.'],
      ['Matriz G', 'Matriz de parentesco genomico derivada de marcadores SNP.'],
      ['GWAS', 'Estudo de associacao genomica ampla entre marcadores e fenotipo.'],
      ['GBLUP', 'BLUP genomico que substitui A por G na predicao.'],
      ['MAF', 'Frequencia do alelo menor em um marcador.'],
      ['Call rate', 'Proporcao de genotipos observados, sem dados faltantes.'],
      ['QTL', 'Regiao genomica associada a variacao de uma caracteristica quantitativa.']
    ];
    el.textContent = '';
    var input = document.createElement('input');
    var results = document.createElement('div');
    input.className = 'glossary-search';
    input.type = 'search';
    input.placeholder = t('interactive.glossary.placeholder', 'Buscar termo, sigla ou conceito');
    input.setAttribute('aria-label', t('interactive.glossary.aria', 'Buscar no glossário'));
    input.setAttribute('aria-controls', 'glossary-results');
    results.className = 'glossary-results';
    results.id = 'glossary-results';
    results.setAttribute('role', 'status');
    results.setAttribute('aria-live', 'polite');
    el.appendChild(input);
    el.appendChild(results);
    function draw() {
      var q = input.value.toLowerCase();
      var filtered = items.filter(function (item) { return (item[0] + ' ' + item[1]).toLowerCase().indexOf(q) >= 0; });
      results.textContent = '';
      if (!filtered.length) {
        var empty = document.createElement('p');
        empty.textContent = t('interactive.glossary.empty', 'Nenhum termo encontrado.');
        results.appendChild(empty);
        return;
      }
      filtered.forEach(function (item) {
        var article = document.createElement('article');
        var title = document.createElement('h3');
        var copy = document.createElement('p');
        article.className = 'glossary-item';
        title.textContent = item[0];
        copy.textContent = item[1];
        article.appendChild(title);
        article.appendChild(copy);
        results.appendChild(article);
      });
    }
    input.addEventListener('input', draw);
    draw();
  }

  function init() {
    document.querySelectorAll('[data-mg-viz]').forEach(function (el) {
      var type = el.getAttribute('data-mg-viz');
      if (type === 'pge') initPGE(el);
      if (type === 'h2') initH2(el);
      if (type === 'blup') initBLUP(el);
      if (type === 'gwas') initGWAS(el);
    });
    document.querySelectorAll('[data-learning-map]').forEach(initLearningMap);
    document.querySelectorAll('[data-glossary]').forEach(initGlossary);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  document.addEventListener('mgenetica:i18n-ready', init);
})();
