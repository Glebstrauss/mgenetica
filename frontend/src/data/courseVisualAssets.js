const COURSE_VISUAL_ASSETS = {
  'module-01': {
    type: 'image',
    src: 'course-assets/module-01/genotipo-alelo.svg',
    title: 'Genotipo e alelo',
    alt: 'Diagrama mostrando alelos A e a em genotipos AA, Aa e aa, com quadro de Punnett para Aa por Aa.',
    caption: 'Visual tecnico: duas copias por locus, segregacao e proporcao genotipica esperada.',
    placement: 'after-concept'
  },
  'module-02': {
    type: 'image',
    src: 'course-assets/module-02/modos-de-acao.svg',
    title: 'Modos de acao genica',
    alt: 'Grafico comparando valores genotipicos para acao aditiva, dominancia e sobredominancia.',
    caption: 'Visual tecnico: comparacao entre ponto medio aditivo, desvio de dominancia e heterozigoto.',
    placement: 'after-concept'
  },
  'module-03': {
    type: 'interactive',
    src: 'course-assets/module-03/calculator.html',
    title: 'Calculadora de frequencias alelicas e genotipicas',
    alt: 'Calculadora interativa para contagens AA, Aa e aa, frequencias genotipicas e frequencias alelicas p e q.',
    caption: 'Interativo: altere as contagens dos genotipos e observe p, q e frequencias genotipicas em tempo real.',
    height: 900,
    placement: 'after-concept'
  },
  'module-04': {
    type: 'interactive',
    src: 'course-assets/module-04/hwe-calculator.html',
    title: 'Calculadora Hardy-Weinberg',
    alt: 'Calculadora interativa comparando frequencias esperadas sob Hardy-Weinberg com contagens observadas.',
    caption: 'Interativo: ajuste p e contagens observadas para comparar esperado e observado sob HWE.',
    height: 860,
    placement: 'after-concept'
  },
  'module-05': {
    type: 'image',
    src: 'course-assets/module-05/quatro-forcas.svg',
    title: 'Forcas que alteram frequencias genicas',
    alt: 'Diagrama das quatro forcas evolutivas: selecao, migracao, mutacao e deriva.',
    caption: 'Visual tecnico: quatro mecanismos capazes de alterar frequencias alelicas entre geracoes.',
    placement: 'after-concept'
  },
  'module-06': {
    type: 'image',
    src: 'course-assets/module-06/pge-decomposicao.svg',
    title: 'Decomposicao P igual G mais E',
    alt: 'Diagrama de barras decompondo fenotipo em componentes genetico e ambiental.',
    caption: 'Visual tecnico: decomposicao didatica de P = G + E em exemplos numericos.',
    placement: 'after-concept'
  },
  'module-07': {
    type: 'image',
    src: 'course-assets/module-07/poligeico-normal.svg',
    title: 'Modelo poligenico e distribuicao continua',
    alt: 'Diagrama mostrando mais loci produzindo uma distribuicao mais continua de valores geneticos.',
    caption: 'Visual tecnico: muitos loci de pequeno efeito geram escala continua de valores.',
    placement: 'after-concept'
  },
  'module-08': {
    type: 'image',
    src: 'course-assets/module-08/particao-variancia.svg',
    title: 'Particao dos componentes de variancia',
    alt: 'Barras empilhadas mostrando VP particionada em VA, VD, VI e VE.',
    caption: 'Visual tecnico: composicao de VP e efeito da variacao ambiental sobre a proporcao aditiva.',
    placement: 'after-concept'
  },
  'module-09': {
    type: 'interactive',
    src: 'course-assets/module-09/h2-calculator.html',
    title: 'Calculadora de herdabilidade e repetibilidade',
    alt: 'Calculadora interativa para h2, repetibilidade e componentes de variancia.',
    caption: 'Interativo: altere os componentes de variancia para comparar h2 e repetibilidade.',
    height: 820,
    placement: 'after-concept'
  },
  'module-10': {
    type: 'interactive',
    src: 'course-assets/module-10/selecao-calculator.html',
    title: 'Calculadora de selecao e ganho genetico',
    alt: 'Calculadora interativa para diferencial de selecao, herdabilidade, intervalo de geracao e ganho esperado.',
    caption: 'Interativo: ajuste medias, h2 e intervalo de geracao para observar resposta esperada.',
    height: 860,
    placement: 'after-concept'
  },
  'module-11': {
    type: 'image',
    src: 'course-assets/module-11/correlacoes-triangulo.svg',
    title: 'Correlacoes geneticas, fenotipicas e ambientais',
    alt: 'Diagrama triangular comparando rA, rP e rE entre duas caracteristicas.',
    caption: 'Visual tecnico: separacao entre correlacao genetica aditiva, fenotipica e ambiental.',
    placement: 'after-concept'
  },
  'module-12': {
    type: 'image',
    src: 'course-assets/module-12/curva-limiar.svg',
    title: 'Caracteristica de limiar',
    alt: 'Curva normal com limiar separando animais abaixo e acima de uma categoria observada.',
    caption: 'Visual tecnico: escala subjacente continua e corte de limiar para categorias observadas.',
    placement: 'after-concept'
  },
  'module-13': {
    type: 'image',
    src: 'course-assets/module-13/pedigree-endogamia.svg',
    title: 'Pedigree, parentesco e endogamia',
    alt: 'Pedigree pequeno destacando ancestral comum e relacao de parentesco entre animais.',
    caption: 'Visual tecnico: caminho de parentesco e interpretacao de ancestral comum em pedigree.',
    placement: 'after-concept'
  },
  'module-14': {
    type: 'image',
    src: 'course-assets/module-14/heterose-grafico.svg',
    title: 'Heterose e complementaridade',
    alt: 'Grafico comparando media parental e desempenho F1 para estimar heterose.',
    caption: 'Visual tecnico: heterose como desvio percentual em relacao a media parental.',
    placement: 'after-concept'
  },
  'module-15': {
    type: 'interactive',
    src: 'course-assets/module-15/dep-ebv-ranking.html',
    title: 'Ranking interativo por fenotipo, EBV, DEP e acuracia',
    alt: 'Tabela interativa para ordenar garanhoes por fenotipo observado, fenotipo corrigido, EBV, DEP e acuracia.',
    caption: 'Interativo: compare como o criterio de ordenacao muda a decisao de selecao.',
    height: 780,
    placement: 'after-concept'
  },
  'module-16': {
    type: 'image',
    src: 'course-assets/module-16/modelo-linear.svg',
    title: 'Modelo linear e efeitos mistos',
    alt: 'Diagrama separando observacao y em efeitos fixos, efeitos aleatorios e residuo.',
    caption: 'Visual tecnico: decomposicao da observacao em componentes do modelo.',
    placement: 'after-concept'
  },
  'module-17': {
    type: 'image',
    src: 'course-assets/module-17/blup-fluxo.svg',
    title: 'Fluxo BLUP e modelo animal',
    alt: 'Fluxo conectando fenotipo, pedigree, matriz de parentesco e estimativa EBV.',
    caption: 'Visual tecnico: informacao individual e familiar entrando no modelo animal.',
    placement: 'after-concept'
  },
  'module-18': {
    type: 'image',
    src: 'course-assets/module-18/snp-codificacao.svg',
    title: 'Codificacao de SNP',
    alt: 'Diagrama mostrando genotipos SNP codificados como 0, 1 e 2 e frequencias de alelos.',
    caption: 'Visual tecnico: transformacao de genotipos moleculares em codificacao numerica.',
    placement: 'after-concept'
  },
  'module-19': {
    type: 'image',
    src: 'course-assets/module-19/qc-fluxo.svg',
    title: 'Fluxo de controle de qualidade genomico',
    alt: 'Fluxo de filtros de qualidade genomica incluindo call rate, MAF e Hardy-Weinberg.',
    caption: 'Visual tecnico: filtros principais antes de usar dados genomicos em analise.',
    placement: 'after-concept'
  },
  'module-20': {
    type: 'image',
    src: 'course-assets/module-20/gwas-manhattan.svg',
    title: 'GWAS e Manhattan plot',
    alt: 'Grafico Manhattan com marcadores ao longo do genoma e sinal de associacao.',
    caption: 'Visual tecnico: separacao entre sinal de associacao, matriz genomica e predicao.',
    placement: 'after-concept'
  },
  'module-21': {
    type: 'image',
    src: 'course-assets/module-21/pipeline-selecao.svg',
    title: 'Pipeline completo de selecao',
    alt: 'Infografico do pipeline completo integrando fenotipo, pedigree, genomica, controle de qualidade, EBV, DEP e decisao.',
    caption: 'Visual tecnico: sintese do fluxo de dados ate a decisao final de selecao.',
    placement: 'after-concept'
  }
}

function getCourseVisualAsset(courseId) {
  return COURSE_VISUAL_ASSETS[courseId] || null
}

export { COURSE_VISUAL_ASSETS, getCourseVisualAsset }
