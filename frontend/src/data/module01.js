const baseModule01 = {
  title: 'Módulo 01 — Introdução ao Melhoramento Animal',
  description: 'Objetivos do melhoramento, a equação do melhorista e os fatores que determinam o ganho genético.',
  badge: 'MÓDULO 01 · FUNDAMENTOS',
  meta: ['⏱ ~25 min', 'Nível: Introdutório'],
  readingRhythm:
    'Leia primeiro para entender a pergunta, rode o script para gerar evidência e só então avance para exercício e quiz.',
  sessionPlan: {
    title: 'Plano curto de sessão',
    copy:
      'Use este módulo em uma sessão fechada: entre com uma pergunta, produza uma evidência no script e saia com uma decisão técnica curta.',
    steps: [
      { title: 'Pergunta', copy: 'Defina o que precisa ficar mais claro antes de ler.' },
      { title: 'Evidência', copy: 'Rode ou revise o trecho principal em R.' },
      { title: 'Decisão', copy: 'Escreva uma consequência técnica antes de sair.' }
    ]
  },
  technicalScan: {
    title: 'Leia a parte técnica em três passagens',
    copy:
      'Não tente resolver fórmula, código e tabela ao mesmo tempo. Primeiro localize o conceito, depois execute ou acompanhe o script, e por fim interprete a saída como evidência.',
    steps: [
      { title: 'Fórmula', copy: 'Identifique quais termos mudam a decisão.' },
      { title: 'Código', copy: 'Veja qual parâmetro foi simulado ou comparado.' },
      { title: 'Tabela', copy: 'Leia a diferença que sustenta a interpretação.' }
    ]
  },
  introParagraphs: [
    'Imagine um rebanho de bovinos de corte com média de peso ao sobreano de 280 kg. O produtor seleciona os animais mais pesados para reprodução. Após alguns anos, o rebanho pesa, em média, 295 kg. O que aconteceu? Os genes que contribuem para maior peso ficaram mais frequentes na população. Essa mudança dirigida na média genotípica de uma população ao longo das gerações é o que chamamos de melhoramento genético animal.',
    'O alvo não é um animal campeão individual — é a população. O que importa é quanto a média genética muda de geração em geração.'
  ],
  centralConcept:
    'Melhoramento animal é a alteração intencional da frequência de alelos favoráveis em uma população, por meio de seleção e acasalamento dirigidos, com o objetivo de deslocar a média genotípica na direção desejada.',
  equation: 'ΔG = i × rTI × σA / L',
  equationNote:
    'Para seleção massal (com base apenas no fenótipo do próprio animal), a acurácia r ≈ √h², então ΔG = i × h² × σP — a simplificação mais comum nos livros.',
  symbols: [
    ['i', 'Intensidade de seleção (função do % selecionado)', 'Selecionar proporção menor'],
    ['r', 'Acurácia da avaliação genética', 'Mais filhos, melhor método'],
    ['σA', 'Desvio padrão genético aditivo', 'Manter diversidade'],
    ['L', 'Intervalo de geração médio (anos)', 'Usar reprodutores mais jovens']
  ],
  scriptLab: {
    title: 'Laboratório do script',
    copy:
      'Use o script para testar como intensidade de seleção e herdabilidade mudam o ganho genético esperado. A página renderiza os trechos principais; o arquivo completo permite repetir a simulação fora do navegador.',
    items: [
      {
        title: 'Roteiro R',
        copy: 'Abrir o script R completo do Módulo 01',
        assetPath: 'course-assets/modulo01.R'
      },
      {
        title: 'Saída gerada',
        copy: 'Abrir o CSV simulado gerado pelo Módulo 01',
        assetPath: 'course-assets/modulo01_simulado.csv'
      },
      {
        title: 'O que alterar',
        copy: 'Troque o corte de seleção de 20% para 10% e compare S, delta_G e o ganho acumulado.'
      },
      {
        title: 'O que interpretar',
        copy: 'Explique se o aumento de ganho justifica selecionar menos animais quando diversidade e intervalo de gerações também importam.'
      }
    ]
  },
  codeBlocks: [
    {
      label: 'selecao-basica',
      title: 'Seleção básica',
      code: '#| label: selecao-basica\nset.seed(101)\n\n# Parâmetros populacionais\nn     <- 1000   # animais\nmu    <- 300    # média inicial (kg)\nh2    <- 0.35   # herdabilidade\nvp    <- 900    # variância fenotípica (σP = 30 kg)\nva    <- h2 * vp\nve    <- vp - va\n\n# Gera população base\na <- rnorm(n, 0, sqrt(va))   # valores genéticos\ne <- rnorm(n, 0, sqrt(ve))   # desvios ambientais\np <- mu + a + e              # fenótipos\n\n# Seleciona top 20%\nsel      <- p >= quantile(p, 0.80)\nS        <- mean(p[sel]) - mean(p)   # diferencial de seleção\ndelta_G  <- h2 * S\n\ncat("Média da população:      ", round(mean(p), 2), "kg\\n")\ncat("Média dos selecionados:  ", round(mean(p[sel]), 2), "kg\\n")\ncat("Diferencial (S):         ", round(S, 2), "kg\\n")\ncat("Ganho genético (ΔG):     ", round(delta_G, 2), "kg\\n")'
    },
    {
      label: 'progressao-geracoes',
      title: 'Progressão por gerações',
      code: '#| label: progressao-geracoes\n# Simula 5 gerações de seleção\nn_ger      <- 5\nmed_ger    <- numeric(n_ger + 1)\nmed_ger[1] <- mean(p)\n\nfor (g in seq_len(n_ger)) {\n  p_nova <- (med_ger[1] + delta_G * g) + rnorm(n, 0, sqrt(va)) + rnorm(n, 0, sqrt(ve))\n  med_ger[g + 1] <- mean(p_nova)\n}\n\nresultado <- data.frame(\n  Geração         = 0:n_ger,\n  Média_kg        = round(med_ger, 2),\n  Ganho_acumulado = round(med_ger - med_ger[1], 2)\n)\nprint(resultado)'
    },
    {
      label: 'efeito-herdabilidade',
      title: 'Efeito da herdabilidade',
      code: '#| label: efeito-herdabilidade\n# Como a herdabilidade afeta o ganho genético?\nh2_vals <- c(0.10, 0.20, 0.35, 0.50, 0.70)\ncat("\\n--- Ganho genético para diferentes h² (S fixo) ---\\n")\nfor (h in h2_vals) {\n  cat(sprintf("h² = %.2f  →  ΔG = %.2f kg  (%.1f%% da média)\\n",\n              h, h * S, 100 * h * S / mu))\n}'
    }
  ],
  interpretation: [
    'O ganho acumulado aumenta aproximadamente de forma linear a cada geração — porque a intensidade de seleção foi mantida constante e a variância genética não foi reduzida (sem endogamia nessa simulação simples).',
    'Com h² = 0,35 e seleção do top 20%, o ganho por geração é ~4,5 kg — aproximadamente 1,5% da média por geração.',
    'Características de baixa herdabilidade (fertilidade, sobrevivência) respondem muito mais lentamente à seleção direta.'
  ],
  warning:
    'A equação do melhorista pressupõe que a variância genética permanece constante ao longo das gerações. Na prática, seleção intensa e endogamia reduzem essa variância — o ganho real tende a desacelerar.',
  evidencePath:
    'Antes do exercício, conecte três pontos: qual pergunta o módulo abriu, qual saída do script sustenta a resposta e qual decisão técnica fica mais clara.',
  practiceContract:
    'Antes de seguir, compare duas intensidades de seleção e escreva qual decisão aumenta ganho sem ignorar intervalo de gerações e variância disponível.',
  exercises: [
    'Modifique o código para selecionar os top 10% em vez de 20%. Como S e ΔG mudam?',
    'Mantenha a intensidade original, mas altere h2 para 0,15 (característica de reprodução). Qual é o ganho esperado?',
    'Se L = 5 anos (touro usado por 5 anos), qual é o ganho genético anual usando a equação ΔG/L?'
  ],
  checkpoint:
    'Revise a pergunta biológica, rode o trecho principal em R e escreva uma frase ligando o resultado à decisão de seleção. Depois avance para o quiz com essa frase em mente.',
  takeaways: [
    'Ganho genético depende de variação disponível, intensidade de seleção, acurácia e intervalo entre gerações.',
    'A equação do melhorista é mais útil quando vira uma comparação entre decisões possíveis de seleção.'
  ],
  afterQuiz:
    'Se o resultado do quiz não refletir sua interpretação, volte ao trecho em R e ao exercício proposto. Se estiver consistente, avance mantendo uma frase técnica registrada.',
  closeCheck:
    'Feche o módulo quando a leitura, o código e o quiz sustentarem a mesma conclusão. Se algum ponto ficou aberto, volte pelo índice ou pela busca antes de avançar.',
  returnNote:
    'Antes de trocar de página, registre se este módulo levou a avanço, revisão ou consulta. Use essa decisão para escolher o próximo clique no índice.',
  nextModule: {
    href: 'modulo02-bases-da-genetica-quantitativa.html',
    title: 'Bases da Genética Quantitativa'
  }
}

const module01Overrides = {
  en: {
    title: 'Module 01 — Introduction to Animal Breeding',
    description: 'Breeding goals, the breeder’s equation and the factors that determine genetic gain.',
    badge: 'MODULE 01 · FOUNDATIONS',
    meta: ['⏱ ~25 min', 'Level: Introductory'],
    readingRhythm: 'Read first to understand the question, run the script to generate evidence and only then move on to the exercise and quiz.',
    sessionPlan: {
      title: 'Short session plan',
      copy: 'Use this module in a focused session: enter with one question, produce one piece of evidence in the script and leave with one short technical decision.',
      steps: [
        { title: 'Question', copy: 'Define what needs to become clearer before reading.' },
        { title: 'Evidence', copy: 'Run or review the main R section.' },
        { title: 'Decision', copy: 'Write one technical consequence before leaving.' }
      ]
    },
    technicalScan: {
      title: 'Read the technical part in three passes',
      copy: 'Do not try to solve formula, code and table at the same time. First locate the concept, then execute or follow the script, and finally interpret the output as evidence.',
      steps: [
        { title: 'Formula', copy: 'Identify which terms change the decision.' },
        { title: 'Code', copy: 'See which parameter was simulated or compared.' },
        { title: 'Table', copy: 'Read the difference that supports the interpretation.' }
      ]
    },
    introParagraphs: [
      'Imagine a beef cattle herd with an average yearling weight of 280 kg. The producer selects the heaviest animals for reproduction. After a few years, the herd weighs 295 kg on average. What happened? The genes that contribute to higher weight became more frequent in the population. This directed shift in the genotypic mean of a population across generations is what we call animal genetic improvement.',
      'The target is not an individual champion animal — it is the population. What matters is how much the genetic mean changes from one generation to the next.'
    ],
    centralConcept: 'Animal breeding is the intentional change in the frequency of favorable alleles in a population, through directed selection and mating, with the goal of shifting the genotypic mean in the desired direction.',
    equationNote: 'For mass selection (based only on the animal’s own phenotype), accuracy r ≈ √h², so ΔG = i × h² × σP — the most common simplification in textbooks.',
    symbols: [
      ['i', 'Selection intensity (function of the % selected)', 'Select a smaller proportion'],
      ['r', 'Accuracy of the genetic evaluation', 'More offspring, better method'],
      ['σA', 'Additive genetic standard deviation', 'Maintain diversity'],
      ['L', 'Average generation interval (years)', 'Use younger breeders']
    ],
    scriptLab: {
      title: 'Script laboratory',
      copy: 'Use the script to test how selection intensity and heritability change expected genetic gain. The page renders the main excerpts; the full file lets you repeat the simulation outside the browser.',
      items: [
        { title: 'R script', copy: 'Open the full R script for Module 01', assetPath: 'course-assets/modulo01.R' },
        { title: 'Generated output', copy: 'Open the simulated CSV generated by Module 01', assetPath: 'course-assets/modulo01_simulado.csv' },
        { title: 'What to change', copy: 'Change the selection cutoff from 20% to 10% and compare S, delta_G and cumulative gain.' },
        { title: 'What to interpret', copy: 'Explain whether the gain increase justifies selecting fewer animals when diversity and generation interval also matter.' }
      ]
    },
    codeBlocks: baseModule01.codeBlocks.map((block, index) => ({
      ...block,
      title: ['Basic selection', 'Generation progression', 'Effect of heritability'][index]
    })),
    interpretation: [
      'Cumulative gain increases almost linearly across generations because selection intensity was kept constant and genetic variance was not reduced in this simple simulation.',
      'With h² = 0.35 and top-20% selection, gain per generation is about 4.5 kg, roughly 1.5% of the mean per generation.',
      'Traits with low heritability, such as fertility and survival, respond much more slowly to direct selection.'
    ],
    warning: 'The breeder’s equation assumes that genetic variance remains constant across generations. In practice, intense selection and inbreeding reduce this variance, so real gain tends to slow down.',
    evidencePath: 'Before the exercise, connect three points: which question opened the module, which script output supports the answer and which technical decision becomes clearer.',
    practiceContract: 'Before moving on, compare two selection intensities and write which decision increases gain without ignoring generation interval and available variance.',
    exercises: [
      'Modify the code to select the top 10% instead of 20%. How do S and ΔG change?',
      'Keep the original intensity, but change h2 to 0.15 for a reproductive trait. What is the expected gain?',
      'If L = 5 years, what is the annual genetic gain using the ΔG/L equation?'
    ],
    checkpoint: 'Review the biological question, run the main R section and write one sentence linking the result to the selection decision. Then move to the quiz with that sentence in mind.',
    takeaways: [
      'Genetic gain depends on available variation, selection intensity, accuracy and the interval between generations.',
      'The breeder’s equation is most useful when it becomes a comparison among possible selection decisions.'
    ],
    afterQuiz: 'If the quiz result does not match your interpretation, return to the R excerpt and the proposed exercise. If it is consistent, move on while keeping one technical sentence recorded.',
    closeCheck: 'Close the module when reading, code and quiz support the same conclusion. If any point remains open, go back through the index or search before moving forward.',
    returnNote: 'Before changing the page, record whether this module led to progress, review or consultation. Use that decision to choose the next click in the index.',
    nextModule: { ...baseModule01.nextModule, title: 'Foundations of Quantitative Genetics' }
  },
  es: {
    title: 'Módulo 01 — Introducción al Mejoramiento Animal',
    description: 'Objetivos del mejoramiento, la ecuación del mejorista y los factores que determinan la ganancia genética.',
    badge: 'MÓDULO 01 · FUNDAMENTOS',
    meta: ['⏱ ~25 min', 'Nivel: Introductorio'],
    readingRhythm: 'Lee primero para entender la pregunta, ejecuta el script para generar evidencia y solo después avanza al ejercicio y al quiz.',
    sessionPlan: {
      title: 'Plan corto de sesión',
      copy: 'Usa este módulo en una sesión cerrada: entra con una pregunta, produce una evidencia en el script y sal con una decisión técnica breve.',
      steps: [
        { title: 'Pregunta', copy: 'Define qué debe quedar más claro antes de leer.' },
        { title: 'Evidencia', copy: 'Ejecuta o revisa el tramo principal en R.' },
        { title: 'Decisión', copy: 'Escribe una consecuencia técnica antes de salir.' }
      ]
    },
    technicalScan: {
      title: 'Lee la parte técnica en tres pasadas',
      copy: 'No intentes resolver fórmula, código y tabla al mismo tiempo. Primero ubica el concepto, luego ejecuta o sigue el script y por último interpreta la salida como evidencia.',
      steps: [
        { title: 'Fórmula', copy: 'Identifica qué términos cambian la decisión.' },
        { title: 'Código', copy: 'Observa qué parámetro fue simulado o comparado.' },
        { title: 'Tabla', copy: 'Lee la diferencia que sostiene la interpretación.' }
      ]
    },
    introParagraphs: [
      'Imagina un rebaño de bovinos de carne con peso promedio al año de 280 kg. El productor selecciona los animales más pesados para reproducción. Después de algunos años, el rebaño pesa en promedio 295 kg. ¿Qué ocurrió? Los genes que contribuyen a mayor peso se volvieron más frecuentes en la población. Ese cambio dirigido en la media genotípica de una población a lo largo de las generaciones es lo que llamamos mejoramiento genético animal.',
      'El objetivo no es un animal campeón individual, sino la población. Lo importante es cuánto cambia la media genética de una generación a otra.'
    ],
    centralConcept: 'El mejoramiento animal es el cambio intencional de la frecuencia de alelos favorables en una población, mediante selección y apareamientos dirigidos, con el objetivo de desplazar la media genotípica en la dirección deseada.',
    equationNote: 'Para selección masal, basada solo en el fenotipo del propio animal, la precisión r ≈ √h², entonces ΔG = i × h² × σP, la simplificación más común en los libros.',
    symbols: [
      ['i', 'Intensidad de selección (función del % seleccionado)', 'Seleccionar una proporción menor'],
      ['r', 'Precisión de la evaluación genética', 'Más hijos, mejor método'],
      ['σA', 'Desvío estándar genético aditivo', 'Mantener diversidad'],
      ['L', 'Intervalo generacional promedio (años)', 'Usar reproductores más jóvenes']
    ],
    scriptLab: {
      title: 'Laboratorio del script',
      copy: 'Usa el script para probar cómo la intensidad de selección y la heredabilidad cambian la ganancia genética esperada. La página muestra los fragmentos principales; el archivo completo permite repetir la simulación fuera del navegador.',
      items: [
        { title: 'Guion R', copy: 'Abrir el script R completo del Módulo 01', assetPath: 'course-assets/modulo01.R' },
        { title: 'Salida generada', copy: 'Abrir el CSV simulado generado por el Módulo 01', assetPath: 'course-assets/modulo01_simulado.csv' },
        { title: 'Qué cambiar', copy: 'Cambia el corte de selección de 20% a 10% y compara S, delta_G y la ganancia acumulada.' },
        { title: 'Qué interpretar', copy: 'Explica si el aumento de ganancia justifica seleccionar menos animales cuando la diversidad y el intervalo generacional también importan.' }
      ]
    },
    codeBlocks: baseModule01.codeBlocks.map((block, index) => ({
      ...block,
      title: ['Selección básica', 'Progresión por generaciones', 'Efecto de la heredabilidad'][index]
    })),
    interpretation: [
      'La ganancia acumulada aumenta casi de forma lineal en cada generación porque la intensidad de selección se mantuvo constante y la varianza genética no se redujo en esta simulación simple.',
      'Con h² = 0,35 y selección del 20% superior, la ganancia por generación es de aproximadamente 4,5 kg, cerca del 1,5% de la media por generación.',
      'Las características con baja heredabilidad, como fertilidad y supervivencia, responden mucho más lentamente a la selección directa.'
    ],
    warning: 'La ecuación del mejorista supone que la varianza genética permanece constante a lo largo de las generaciones. En la práctica, la selección intensa y la endogamia reducen esa varianza, por lo que la ganancia real tiende a desacelerarse.',
    evidencePath: 'Antes del ejercicio, conecta tres puntos: qué pregunta abrió el módulo, qué salida del script sostiene la respuesta y qué decisión técnica queda más clara.',
    practiceContract: 'Antes de seguir, compara dos intensidades de selección y escribe qué decisión aumenta la ganancia sin ignorar el intervalo generacional y la varianza disponible.',
    exercises: [
      'Modifica el código para seleccionar el 10% superior en lugar del 20%. ¿Cómo cambian S y ΔG?',
      'Mantén la intensidad original, pero cambia h2 a 0,15 para una característica reproductiva. ¿Cuál es la ganancia esperada?',
      'Si L = 5 años, ¿cuál es la ganancia genética anual usando la ecuación ΔG/L?'
    ],
    checkpoint: 'Revisa la pregunta biológica, ejecuta el tramo principal en R y escribe una frase que vincule el resultado con la decisión de selección. Después avanza al quiz con esa frase en mente.',
    takeaways: [
      'La ganancia genética depende de la variación disponible, la intensidad de selección, la precisión y el intervalo entre generaciones.',
      'La ecuación del mejorista es más útil cuando se convierte en una comparación entre decisiones posibles de selección.'
    ],
    afterQuiz: 'Si el resultado del quiz no refleja tu interpretación, vuelve al fragmento en R y al ejercicio propuesto. Si es consistente, avanza dejando registrada una frase técnica.',
    closeCheck: 'Cierra el módulo cuando la lectura, el código y el quiz sostengan la misma conclusión. Si algún punto quedó abierto, vuelve por el índice o la búsqueda antes de avanzar.',
    returnNote: 'Antes de cambiar de página, registra si este módulo llevó a avance, revisión o consulta. Usa esa decisión para elegir el siguiente clic en el índice.',
    nextModule: { ...baseModule01.nextModule, title: 'Bases de la Genética Cuantitativa' }
  }
}

function getModule01(locale) {
  if (!module01Overrides[locale]) return baseModule01
  return { ...baseModule01, ...module01Overrides[locale] }
}

const module01 = baseModule01

export { getModule01, module01 }
