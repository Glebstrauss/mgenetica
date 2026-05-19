export const module01 = {
  title: 'Módulo 01 — Introdução ao Melhoramento Animal',
  description: 'Objetivos do melhoramento, a equação do melhorista e os fatores que determinam o ganho genético.',
  badge: 'MÓDULO 01 · FUNDAMENTOS',
  meta: ['⏱ ~25 min', 'Nível: Introdutório'],
  objectives: [
    'O que é melhoramento animal e qual é o seu objetivo biológico',
    'A equação do melhorista: ΔG = i × r × σA / L',
    'Como cada componente da equação afeta o ganho genético anual',
    'Simular resposta à seleção ao longo de gerações com R'
  ],
  orientation: ['Leitura', 'Simulação em R', 'Interpretação'],
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
        href: '../scripts/modulo01.R'
      },
      {
        title: 'Saída gerada',
        copy: 'Abrir o CSV simulado gerado pelo Módulo 01',
        href: '../data/modulo01_simulado.csv'
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
      code: `#| label: selecao-basica
set.seed(101)

# Parâmetros populacionais
n     <- 1000   # animais
mu    <- 300    # média inicial (kg)
h2    <- 0.35   # herdabilidade
vp    <- 900    # variância fenotípica (σP = 30 kg)
va    <- h2 * vp
ve    <- vp - va

# Gera população base
a <- rnorm(n, 0, sqrt(va))   # valores genéticos
e <- rnorm(n, 0, sqrt(ve))   # desvios ambientais
p <- mu + a + e              # fenótipos

# Seleciona top 20%
sel      <- p >= quantile(p, 0.80)
S        <- mean(p[sel]) - mean(p)   # diferencial de seleção
delta_G  <- h2 * S

cat("Média da população:      ", round(mean(p), 2), "kg\\n")
cat("Média dos selecionados:  ", round(mean(p[sel]), 2), "kg\\n")
cat("Diferencial (S):         ", round(S, 2), "kg\\n")
cat("Ganho genético (ΔG):     ", round(delta_G, 2), "kg\\n")`
    },
    {
      label: 'progressao-geracoes',
      title: 'Progressão por gerações',
      code: `#| label: progressao-geracoes
# Simula 5 gerações de seleção
n_ger      <- 5
med_ger    <- numeric(n_ger + 1)
med_ger[1] <- mean(p)

for (g in seq_len(n_ger)) {
  p_nova <- (med_ger[1] + delta_G * g) + rnorm(n, 0, sqrt(va)) + rnorm(n, 0, sqrt(ve))
  med_ger[g + 1] <- mean(p_nova)
}

resultado <- data.frame(
  Geração         = 0:n_ger,
  Média_kg        = round(med_ger, 2),
  Ganho_acumulado = round(med_ger - med_ger[1], 2)
)
print(resultado)`
    },
    {
      label: 'efeito-herdabilidade',
      title: 'Efeito da herdabilidade',
      code: `#| label: efeito-herdabilidade
# Como a herdabilidade afeta o ganho genético?
h2_vals <- c(0.10, 0.20, 0.35, 0.50, 0.70)
cat("\\n--- Ganho genético para diferentes h² (S fixo) ---\\n")
for (h in h2_vals) {
  cat(sprintf("h² = %.2f  →  ΔG = %.2f kg  (%.1f%% da média)\\n",
              h, h * S, 100 * h * S / mu))
}`
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
};
