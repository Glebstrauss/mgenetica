(function () {
  'use strict';

  var MODULES = [
    ['01', "M1", "Fundamentos"],
    ['02', "M2", "Fundamentos"],
    ['03', "M3", "Genética de populações"],
    ['04', "M4", "Genética de populações"],
    ['05', "M5", "Genética de populações"],
    ['06', "M6", "Genética quantitativa"],
    ['07', "M7", "Genética quantitativa"],
    ['08', "M8", "Genética quantitativa"],
    ['09', "M9", "Genética quantitativa"],
    ['10', "M10", "Genética quantitativa"],
    ['11', "M11", "Genética quantitativa"],
    ['12', "M12", "Genética quantitativa"],
    ['13', "M13", "Parentesco, cruzamentos e avaliação genética"],
    ['14', "M14", "Parentesco, cruzamentos e avaliação genética"],
    ['15', "M15", "Parentesco, cruzamentos e avaliação genética"],
    ['16', "M16", "Parentesco, cruzamentos e avaliação genética"],
    ['17', "M17", "Parentesco, cruzamentos e avaliação genética"],
    ['18', "M18", "Genômica aplicada ao melhoramento"],
    ['19', "M19", "Genômica aplicada ao melhoramento"],
    ['20', "M20", "Genômica aplicada ao melhoramento"],
    ['21', "M21", "Genômica aplicada ao melhoramento"]
  ];

  var MODULE_LINKS = [
    'modulo01-revis-ao-de-gen-etica-b-asica.qmd',
    'modulo02-modos-de-ac-ao-g-enica.qmd',
    'modulo03-gen-etica-de-populac-oes-i-frequ-encias-al-elicas-e-genot-ipicas.qmd',
    'modulo04-hardy-weinberg-alelos-m-ultiplos-e-genes-ligados-ao-sexo.qmd',
    'modulo05-fatores-que-alteram-frequ-encias-g-enicas.qmd',
    'modulo06-valores-e-m-edias-fen-otipo-gen-otipo-e-ambiente.qmd',
    'modulo07-noc-oes-de-gen-etica-quantitativa.qmd',
    'modulo08-componentes-de-vari-ancia.qmd',
    'modulo09-herdabilidade-e-repetibilidade.qmd',
    'modulo10-selec-ao-e-ganho-gen-etico.qmd',
    'modulo11-correlac-oes-gen-eticas-fenot-ipicas-e-ambientais.qmd',
    'modulo12-caracter-isticas-de-limiar.qmd',
    'modulo13-endogamia-e-parentesco.qmd',
    'modulo14-cruzamentos-heterose-e-complementaridade.qmd',
    'modulo15-avaliac-ao-gen-etica-dep-ebv-e-ranking-de-animais.qmd',
    'modulo16-modelos-lineares-e-modelos-mistos.qmd',
    'modulo17-blup-e-modelo-animal.qmd',
    'modulo18-gen-omica-marcadores-snp-e-dados-moleculares.qmd',
    'modulo19-controle-de-qualidade-de-dados-gen-omicos.qmd',
    'modulo20-matrizes-gen-omicas-gwas-e-predic-ao-gen-omica.qmd',
    'modulo21-projeto-final-pipeline-completo-de-selec-ao.qmd'
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
    el.innerHTML = '<div class="learning-map-grid">' + MODULES.map(function (m, i) {
      var id = 'modulo' + m[0];
      var status = done.indexOf(id) >= 0 ? 'complete' : 'pending';
      return '<a class="learning-node ' + status + '" href="../modules/' + MODULE_LINKS[i] + '">' +
        '<span>' + m[0] + '</span><strong>' + m[1] + '</strong><em>' + m[2] + '</em></a>';
    }).join('') + '</div>';
  }

  function initGlossary(el) {
    var items = [
      ["Gene", "Região herdável do DNA associada a uma função biológica."],
      ["Alelo", "Versão de um gene. Animais podem carregar versões diferentes no mesmo loco."],
      ["Genótipo", "Combinação de alelos de um animal em um ou mais locos."],
      ["Fenótipo", "Característica observada ou medida, resultado de genética, ambiente e erro."],
      ["Segregação", "Separação dos alelos na formação dos gametas, gerando combinações nos descendentes."],
      ["Aditividade", "Parte do efeito gênico que se comporta como soma média dos alelos."],
      ["Dominância", "Desvio do heterozigoto em relação à média dos homozigotos."],
      ["Epistasia", "Interação em que um loco modifica o efeito de outro."],
      ["Valor genotípico", "Valor esperado associado ao genótipo de um animal para uma característica, antes de separar ambiente e erro."],
      ["Valor genético", "Parte do mérito de um animal atribuída aos efeitos genéticos relevantes para seleção."],
      ["Valor de acasalamento", "Componente aditivo do valor genético que representa o que o animal tende a transmitir à progênie."],
      ["Frequência alélica", "Proporção de um alelo entre todas as cópias alélicas da população."],
      ["Frequência genotípica", "Proporção de cada genótipo na população."],
      ["Hardy-Weinberg", "Modelo de referência que prevê frequências genotípicas p², 2pq e q² sob condições ideais."],
      ["Deriva genética", "Mudança aleatória de frequências alélicas, mais forte em populações pequenas."],
      ["Tamanho efetivo", "Número idealizado de reprodutores que explica a intensidade de deriva e endogamia."],
      ["Variância aditiva", "Parte da variância genética associada a efeitos médios transmitidos dos alelos."],
      ["Variância ambiental", "Parte da variação fenotípica causada por diferenças de ambiente e manejo."],
      ["Herdabilidade", "Proporção da variância fenotípica explicada por variância genética aditiva."],
      ["Acurácia", "Grau de confiança em uma estimativa genética, dependente de quantidade e qualidade da informação."],
      ["Repetibilidade", "Correlação esperada entre medidas repetidas do mesmo animal."],
      ["Intensidade de seleção", "Força da seleção aplicada ao escolher proporção menor ou maior de animais como pais."],
      ["Intervalo de geração", "Tempo médio entre nascimento dos pais selecionados e nascimento de seus descendentes."],
      ["Diferencial de seleção", "Diferença entre a média dos selecionados e a média da população."],
      ["Ganho genético", "Mudança esperada no mérito genético médio após seleção."],
      ["Correlação genética", "Associação entre efeitos genéticos de duas características."],
      ["Resposta correlacionada", "Mudança em uma característica causada pela seleção aplicada em outra."],
      ["Limiar", "Ponto em uma escala subjacente que transforma variação contínua em resposta categórica."],
      ["Parentesco", "Grau esperado de compartilhamento genético por ancestralidade."],
      ["Endogamia", "Aumento de homozygose por acasalamento entre aparentados."],
      ["Matriz A", "Matriz de parentesco baseada em pedigree."],
      ["Consanguinidade", "Sinônimo prático de endogamia, usado para indicar aumento de homozigose por parentesco."],
      ["Heterose", "Superioridade do cruzado em relação à média dos grupos parentais."],
      ["EBV", "Valor genético estimado de um animal para uma característica."],
      ["DEP", "Diferença esperada na progênie; em geral corresponde a metade do EBV aditivo."],
      ["Modelo misto", "Modelo que combina efeitos fixos e aleatórios, útil para avaliação genética."],
      ["Efeito fixo", "Efeito sistemático estimado diretamente, como fazenda, sexo, lote ou estação de nascimento."],
      ["Efeito aleatório", "Efeito tratado como amostra de uma população de efeitos, como animal ou ambiente permanente."],
      ["Variância residual", "Parte da variação não explicada pelos efeitos incluídos no modelo."],
      ["BLUP", "Preditor linear não viesado usado para estimar efeitos aleatórios, como valor genético."],
      ["BLUE", "Estimador linear não viesado usado para efeitos fixos em modelos lineares e mistos."],
      ["Modelo animal", "Modelo de avaliação que usa dados de animais e parentesco entre eles."],
      ["SNP", "Variação de uma base no DNA usada como marcador molecular."],
      ["Call rate", "Proporção de genótipos observados sem dados faltantes."],
      ["Missing rate", "Proporção de genótipos ausentes em um marcador ou animal genotipado."],
      ["MAF", "Frequência do alelo menos comum em um marcador."],
      ["Matriz G", "Matriz de parentesco estimada com marcadores genômicos."],
      ["GWAS", "Estudo de associação genômica ampla entre marcadores e fenótipo."],
      ["GBLUP", "Avaliação genômica que usa matriz G em vez de matriz A."],
      ["Predição genômica", "Predição de mérito genético usando muitos marcadores distribuídos pelo genoma."],
      ["Validação cruzada", "Estratégia de testar predição em dados separados dos usados para ajuste, avaliando capacidade preditiva."]
    ];
    el.innerHTML = '<input class="glossary-search" type="search" placeholder="Buscar termo, sigla ou conceito" aria-label="Buscar no glossário" aria-controls="glossary-results"><div class="glossary-results" id="glossary-results" role="status" aria-live="polite"></div>';
    var input = el.querySelector('input');
    var results = el.querySelector('.glossary-results');
    function draw() {
      var q = input.value.toLowerCase();
      var filtered = items.filter(function (item) { return (item[0] + ' ' + item[1]).toLowerCase().indexOf(q) >= 0; });
      results.innerHTML = filtered.map(function (item) {
        return '<article class="glossary-item"><h3>' + item[0] + '</h3><p>' + item[1] + '</p></article>';
      }).join('') || '<p>Nenhum termo encontrado.</p>';
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
})();
