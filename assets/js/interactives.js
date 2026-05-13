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
    ['01', 'Introducao', 'Fundamentos'],
    ['02', 'P = G + E', 'Fundamentos'],
    ['03', 'Exploracao', 'Estatistica'],
    ['04', 'Variancias', 'Parametros'],
    ['05', 'h2 e r', 'Parametros'],
    ['06', 'Correlacoes', 'Parametros'],
    ['07', 'Modelos', 'Modelagem'],
    ['08', 'BLUP', 'Avaliacao'],
    ['09', 'Pedigree', 'Parentesco'],
    ['10', 'SNPs', 'Genomica'],
    ['11', 'QC genomico', 'Genomica'],
    ['12', 'GWAS/GBLUP', 'Genomica']
  ];

  var MODULE_LINKS = [
    'modulo01-introducao-ao-melhoramento-animal.qmd',
    'modulo02-bases-da-genetica-quantitativa.qmd',
    'modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd',
    'modulo04-medias-variancias-e-componentes-de-variancia.qmd',
    'modulo05-herdabilidade-e-repetibilidade.qmd',
    'modulo06-correlacoes-geneticas-e-fenotipicas.qmd',
    'modulo07-modelos-lineares-e-modelos-mistos.qmd',
    'modulo08-blup-e-avaliacao-genetica.qmd',
    'modulo09-estrutura-de-pedigree-e-parentesco.qmd',
    'modulo10-introducao-a-genomica-e-marcadores-snp.qmd',
    'modulo11-controle-de-qualidade-de-dados-genomicos.qmd',
    'modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd'
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
    if (html != null) el.innerHTML = html;
    return el;
  }

  function number(value, digits) {
    return Number(value).toFixed(digits == null ? 2 : digits);
  }

  function renderBars(values, labels, colors) {
    var max = Math.max.apply(null, values);
    return '<div class="mg-bars">' + values.map(function (value, i) {
      return '<div class="mg-bar-row"><span>' + labels[i] + '</span>' +
        '<div class="mg-bar-track"><i style="width:' + (100 * value / max) + '%;background:' + colors[i] + '"></i></div>' +
        '<strong>' + number(value, 1) + '</strong></div>';
    }).join('') + '</div>';
  }

  function initPGE(el) {
    el.innerHTML =
      '<div class="mg-viz-head"><h3>Distribuicao P = G + E</h3><p>Ajuste as variancias e observe como h2 muda quando VA compete com VE.</p></div>' +
      '<div class="mg-control-grid">' +
        '<label>VA <input type="range" min="40" max="500" value="200" data-key="va"><span></span></label>' +
        '<label>VD <input type="range" min="0" max="220" value="60" data-key="vd"><span></span></label>' +
        '<label>VI <input type="range" min="0" max="120" value="20" data-key="vi"><span></span></label>' +
        '<label>VE <input type="range" min="80" max="650" value="320" data-key="ve"><span></span></label>' +
      '</div><div class="mg-viz-output"></div>';

    function draw() {
      var data = {};
      el.querySelectorAll('input').forEach(function (input) {
        data[input.dataset.key] = Number(input.value);
        input.nextElementSibling.textContent = input.value;
      });
      var vp = data.va + data.vd + data.vi + data.ve;
      var h2 = data.va / vp;
      el.querySelector('.mg-viz-output').innerHTML =
        '<div class="mg-kpi-grid"><div><span>VP</span><strong>' + number(vp, 0) + '</strong></div>' +
        '<div><span>h2</span><strong>' + number(h2, 3) + '</strong></div>' +
        '<div><span>h</span><strong>' + number(Math.sqrt(h2), 3) + '</strong></div></div>' +
        renderBars([data.va, data.vd, data.vi, data.ve], ['VA', 'VD', 'VI', 'VE'], ['#2563a8', '#4a9fd1', '#d97706', '#5b6b7d']);
    }
    el.querySelectorAll('input').forEach(function (input) { input.addEventListener('input', draw); });
    draw();
  }

  function initH2(el) {
    el.innerHTML =
      '<div class="mg-viz-head"><h3>Regressao pai-filho</h3><p>O slider altera h2 e a inclinacao esperada da regressao: b = h2 / 2.</p></div>' +
      '<div class="mg-control-grid"><label>h2 <input type="range" min="5" max="80" value="32" data-key="h2"><span></span></label></div>' +
      '<svg class="mg-scatter" viewBox="0 0 720 360" role="img" aria-label="Grafico de dispersao pai-filho"></svg>' +
      '<div class="mg-viz-output"></div>';
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
      svg.innerHTML = '<line x1="55" y1="310" x2="680" y2="310" class="axis"/><line x1="55" y1="30" x2="55" y2="310" class="axis"/>';
      points.forEach(function (p) {
        var yVal = b * p[0] + p[1] * (1 - h2 * 0.5);
        var cx = 55 + (p[0] + 2.6) / 5.2 * 625;
        var cy = 170 - yVal / 2.8 * 140;
        svg.innerHTML += '<circle cx="' + cx + '" cy="' + cy + '" r="4" class="dot"/>';
      });
      var y1 = 170 - (b * -2.4) / 2.8 * 140;
      var y2 = 170 - (b * 2.4) / 2.8 * 140;
      svg.innerHTML += '<line x1="80" y1="' + y1 + '" x2="655" y2="' + y2 + '" class="trend"/>';
      el.querySelector('.mg-viz-output').innerHTML =
        '<div class="mg-kpi-grid"><div><span>b esperado</span><strong>' + number(b, 3) + '</strong></div>' +
        '<div><span>Resposta a selecao</span><strong>' + (h2 < 0.2 ? 'baixa' : h2 < 0.45 ? 'moderada' : 'alta') + '</strong></div></div>';
    }
    el.querySelector('input').addEventListener('input', draw);
    draw();
  }

  function initBLUP(el) {
    var animals = [
      ['A15', 24.8, 26.2, 8], ['A10', 17.2, 2.3, 3], ['A17', 15.0, 12.8, 7], ['A18', 11.9, 7.1, 5],
      ['A13', 6.1, -9.0, 2], ['A06', 4.4, 5.5, 4], ['A12', -1.2, 1.0, 1], ['A03', -8.0, -6.5, 2]
    ];
    el.innerHTML =
      '<div class="mg-viz-head"><h3>Ranking BLUP</h3><p>Compare EBV, DEP e quantidade de informacao por candidato.</p></div>' +
      '<div class="mg-segmented"><button data-mode="ebv" class="active">EBV</button><button data-mode="dep">DEP</button><button data-mode="info">Filhos</button></div>' +
      '<div class="mg-viz-output"></div>';
    function draw(mode) {
      el.querySelectorAll('.mg-segmented button').forEach(function (b) { b.classList.toggle('active', b.dataset.mode === mode); });
      var vals = animals.map(function (a) { return mode === 'dep' ? a[1] / 2 : mode === 'info' ? a[3] : a[1]; });
      var labels = animals.map(function (a) { return a[0]; });
      el.querySelector('.mg-viz-output').innerHTML =
        renderBars(vals.map(Math.abs), labels, vals.map(function (v) { return v >= 0 ? '#2563a8' : '#dc2626'; })) +
        '<table class="mg-compact-table"><thead><tr><th>Animal</th><th>EBV</th><th>DEP</th><th>a real</th><th>filhos</th></tr></thead><tbody>' +
        animals.map(function (a) { return '<tr><td>' + a[0] + '</td><td>' + a[1] + '</td><td>' + number(a[1] / 2, 1) + '</td><td>' + a[2] + '</td><td>' + a[3] + '</td></tr>'; }).join('') +
        '</tbody></table>';
    }
    el.querySelectorAll('button').forEach(function (button) {
      button.addEventListener('click', function () { draw(button.dataset.mode); });
    });
    draw('ebv');
  }

  function initGWAS(el) {
    var qtl = [27, 82, 137, 204, 274];
    el.innerHTML =
      '<div class="mg-viz-head"><h3>Manhattan plot simplificado</h3><p>Altere o limiar e veja quais SNPs seriam declarados associados.</p></div>' +
      '<div class="mg-control-grid"><label>Limiar -log10(p) <input type="range" min="2" max="9" value="5" data-key="threshold"><span></span></label></div>' +
      '<svg class="mg-manhattan" viewBox="0 0 760 360" role="img" aria-label="Manhattan plot interativo"></svg>' +
      '<div class="mg-viz-output"></div>';
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
      svg.innerHTML = '<line x1="50" y1="310" x2="725" y2="310" class="axis"/><line x1="50" y1="30" x2="50" y2="310" class="axis"/>';
      points.forEach(function (p) {
        var x = 50 + p[0] / 300 * 675;
        var y = 310 - Math.min(p[1], 9.5) / 9.5 * 270;
        var cls = p[1] >= threshold ? 'hit' : 'dot';
        svg.innerHTML += '<circle cx="' + x + '" cy="' + y + '" r="' + (qtl.indexOf(p[0]) >= 0 ? 4 : 2.5) + '" class="' + cls + '"/>';
      });
      var ty = 310 - threshold / 9.5 * 270;
      svg.innerHTML += '<line x1="50" y1="' + ty + '" x2="725" y2="' + ty + '" class="threshold"/>';
      var hits = points.filter(function (p) { return p[1] >= threshold; }).length;
      el.querySelector('.mg-viz-output').innerHTML =
        '<div class="mg-kpi-grid"><div><span>SNPs acima do limiar</span><strong>' + hits + '</strong></div>' +
        '<div><span>QTLs simulados</span><strong>' + qtl.length + '</strong></div></div>';
    }
    el.querySelector('input').addEventListener('input', draw);
    draw();
  }

  function initLearningMap(el) {
    var done = completedModules();
    var labels = moduleLabels();
    el.innerHTML = '<div class="learning-map-grid">' + labels.map(function (m, i) {
      var id = 'modulo' + m[0];
      var status = done.indexOf(id) >= 0 ? 'complete' : 'pending';
      return '<a class="learning-node ' + status + '" href="../modules/' + MODULE_LINKS[i] + '">' +
        '<span>' + m[0] + '</span><strong>' + m[1] + '</strong><em>' + m[2] + '</em></a>';
    }).join('') + '</div>';
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
    el.innerHTML = '<input class="glossary-search" type="search" placeholder="' + t('interactive.glossary.placeholder', 'Buscar termo, sigla ou conceito') + '" aria-label="' + t('interactive.glossary.aria', 'Buscar no glossário') + '" aria-controls="glossary-results"><div class="glossary-results" id="glossary-results" role="status" aria-live="polite"></div>';
    var input = el.querySelector('input');
    var results = el.querySelector('.glossary-results');
    function draw() {
      var q = input.value.toLowerCase();
      var filtered = items.filter(function (item) { return (item[0] + ' ' + item[1]).toLowerCase().indexOf(q) >= 0; });
      results.innerHTML = filtered.map(function (item) {
        return '<article class="glossary-item"><h3>' + item[0] + '</h3><p>' + item[1] + '</p></article>';
      }).join('') || '<p>' + t('interactive.glossary.empty', 'Nenhum termo encontrado.') + '</p>';
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
