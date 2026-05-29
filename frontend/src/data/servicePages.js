const SERVICE_PAGES = {
  consultoria: {
    route: 'consultoria',
    shortTitle: 'Consultoria',
    navTitle: 'Consultoria',
    tagline: 'Dados, selecao e acasalamento com criterio tecnico',
    kicker: 'Consultoria tecnica · melhoramento animal',
    title: 'Dados de rebanho transformados em decisao',
    description: 'Consultoria para propriedades, criadores, associacoes e organizacoes que precisam organizar registros, interpretar dados zootecnicos e transformar selecao, acasalamento e avaliacao genetica em rotina tecnica.',
    teaser: 'Diagnostico, dados e rotina de decisao para programas de melhoramento.',
    proofTitle: 'Porta de entrada',
    proofCopy: 'Todo projeto comeca por diagnostico. Sem dados minimos ou objetivo claro, o melhor servico e estruturar coleta antes de prometer analise.',
    primaryActions: [
      { label: 'Preparar triagem', anchor: 'triagem-tecnica' },
      { label: 'Ver pacotes', anchor: 'pacotes-de-consultoria' },
      { label: 'Treinar equipe', route: 'treinamentos' }
    ],
    bullets: ['Diagnostico tecnico', 'Organizacao de dados', 'Plano de selecao'],
    sections: [
      {
        id: 'para-quem',
        label: 'Foco',
        title: 'Para quem e',
        copy: 'A consultoria e seletiva porque melhoramento genetico depende de dados, objetivo e rotina. Projeto certo reduz decisao subjetiva; projeto errado apenas gera relatorio caro.',
        cards: [
          { title: 'Produtores e propriedades', copy: 'Organizar registros, definir criterios de selecao e transformar dados acumulados em decisao pratica.' },
          { title: 'Associacoes e nucleos', copy: 'Revisar qualidade de dados, padronizar coleta e apoiar programas de selecao com linguagem comum.' },
          { title: 'Cooperativas e equipes tecnicas', copy: 'Alinhar diagnostico, coleta, indicadores e treinamento de campo em fluxo replicavel.' }
        ]
      },
      {
        id: 'problemas',
        label: 'Gargalos',
        title: 'Problemas que resolve',
        copy: 'O foco nao e vender genetica abstrata. O foco e remover gargalos que impedem decisao tecnica.',
        cards: [
          { title: 'Dados dispersos', copy: 'Planilhas, anotacoes, pedigree e informacoes produtivas sem padrao comum.' },
          { title: 'Selecao subjetiva', copy: 'Escolha de animais baseada apenas em aparencia, tradicao ou impressao isolada.' },
          { title: 'Acasalamento sem criterio', copy: 'Falta de rotina para controlar parentesco, risco de endogamia e objetivo de selecao.' },
          { title: 'Indicadores pouco usados', copy: 'Registros existem, mas nao viram ranking, diagnostico, decisao ou aprendizado da equipe.' }
        ]
      },
      {
        id: 'pacotes-de-consultoria',
        label: 'Escopo',
        title: 'Pacotes de consultoria',
        copy: 'Cada pacote tem fronteira clara. Projetos maiores so avancam depois do diagnostico.',
        cards: [
          { title: '1 · Diagnostico genetico/zootecnico', copy: 'Avalia dados disponiveis, pedigree, registros produtivos, inconsistencias, gargalos e potencial de implementacao.' },
          { title: '2 · Organizacao de dados e coleta', copy: 'Estrutura campos minimos, padroes de registro, rotina de conferencia e responsaveis por coleta.' },
          { title: '3 · Programa de selecao e acasalamento', copy: 'Define objetivo de selecao, caracteristicas prioritarias, criterios de descarte, reposicao e acasalamento.' },
          { title: '4 · Analise de dados e relatorio tecnico', copy: 'Limpa, padroniza e resume registros zootecnicos, genealogicos ou produtivos quando houver base suficiente.' }
        ]
      },
      {
        id: 'metodo',
        label: 'Metodo',
        title: 'Como funciona',
        copy: 'Primeiro requisito, depois dado, depois analise. Otimizar analise sem arrumar dado e erro caro.',
        steps: ['Triagem', 'Diagnostico', 'Proposta', 'Execucao', 'Treinamento']
      },
      {
        id: 'triagem-tecnica',
        label: 'Entrada',
        title: 'Triagem tecnica',
        copy: 'Use este roteiro para preparar o primeiro contato. Ele evita reuniao vaga e acelera decisao sobre escopo.',
        cards: [
          { title: 'Contexto', copy: 'Especie, raca, sistema de producao, numero aproximado de animais e localizacao.' },
          { title: 'Objetivo', copy: 'Qual decisao precisa melhorar: selecao, descarte, reposicao, acasalamento, relatorio, coleta ou treinamento.' },
          { title: 'Dados disponiveis', copy: 'Planilhas, software, pedigree, pesagens, medidas, producao, reproducao, morfologia, genotipos ou avaliacoes externas.' },
          { title: 'Rotina atual', copy: 'Quem coleta, com que frequencia, quais campos sao obrigatorios e onde surgem inconsistencias.' }
        ]
      },
      {
        id: 'limites',
        label: 'Limites',
        title: 'Limites tecnicos',
        copy: 'MGenetica atua em melhoramento genetico animal, dados zootecnicos, selecao, acasalamento e capacitacao. Nao oferece aconselhamento genetico humano, interpretacao clinica, promessa de ganho sem dados ou avaliacao oficial sem base tecnica adequada.'
      }
    ],
    nextStep: {
      title: 'Proximo passo',
      copy: 'Se o problema e aplicar melhoramento em dados reais, comece pela triagem. Se o problema e alinhar equipe antes de mexer na base, comece por treinamento institucional.',
      actions: [
        { label: 'Preparar triagem', anchor: 'triagem-tecnica' },
        { label: 'Ver treinamentos', route: 'treinamentos' },
        { label: 'Estudar fundamentos', route: 'catalog' }
      ]
    }
  },
  treinamentos: {
    route: 'treinamentos',
    shortTitle: 'Treinamentos',
    navTitle: 'Treinamentos',
    tagline: 'Capacitacao institucional em melhoramento genetico animal',
    kicker: 'Treinamento institucional · equipes, turmas e parceiros',
    title: 'Capacite a equipe antes de exigir decisao melhor',
    description: 'Treinamentos fechados para universidades, grupos de estudo, cooperativas, associacoes, empresas e equipes tecnicas que precisam entender melhoramento genetico animal com linguagem aplicada, exemplos e criterios de decisao.',
    teaser: 'Aulas, oficinas e cursos fechados para alinhar linguagem tecnica.',
    proofTitle: 'Treinamento bom',
    proofCopy: 'Muda a pergunta, a coleta e a interpretacao da equipe. Aula bonita sem mudanca de rotina e entretenimento tecnico.',
    primaryActions: [
      { label: 'Montar proposta', anchor: 'proposta-sob-demanda' },
      { label: 'Ver formatos', anchor: 'formatos' },
      { label: 'Ver consultoria', route: 'consultoria' }
    ],
    bullets: ['Oficinas praticas', 'Cursos fechados', 'Material reutilizavel'],
    sections: [
      {
        id: 'para-quem',
        label: 'Publico',
        title: 'Para quem e',
        copy: 'Treinamento institucional serve quando varias pessoas precisam usar a mesma linguagem tecnica antes de aplicar dados, selecionar animais ou revisar um programa.',
        cards: [
          { title: 'Universidades e grupos de estudo', copy: 'Minicursos, aulas abertas, oficinas e trilhas aplicadas para formacao complementar.' },
          { title: 'Associacoes e cooperativas', copy: 'Capacitacao para padronizar conceitos, coleta, interpretacao de DEP e criterios de selecao.' },
          { title: 'Empresas e equipes tecnicas', copy: 'Treinamento pratico para alinhar rotina, indicadores, dados e comunicacao com produtores.' }
        ]
      },
      {
        id: 'formatos',
        label: 'Formatos',
        title: 'Formatos',
        copy: 'Formato muda conforme objetivo. Curso longo nao resolve protocolo simples; palestra curta nao resolve problema de analise.',
        cards: [
          { title: 'Aula tecnica', copy: '2 horas para introduzir tema, alinhar conceitos e abrir discussao aplicada.' },
          { title: 'Oficina pratica', copy: '4 a 8 horas com exercicios, exemplos e leitura guiada de dados ou indicadores.' },
          { title: 'Minicurso', copy: '12 a 20 horas para cobrir fundamentos, aplicacao e atividade avaliativa.' },
          { title: 'Curso fechado', copy: 'Turma institucional com carga horaria, material, avaliacao e certificado de participacao.' }
        ]
      },
      {
        id: 'temas',
        label: 'Temas',
        title: 'Temas possiveis',
        copy: 'Cada tema pode ser basico, intermediario ou aplicado ao contexto da instituicao.',
        cards: [
          { title: 'Fundamentos', copy: 'Herdabilidade, DEP, valor genetico, acuracia, endogamia, selecao e acasalamento.' },
          { title: 'Dados', copy: 'Organizacao de registros, qualidade de dados, campos minimos, padronizacao e indicadores.' },
          { title: 'Analise', copy: 'R para dados zootecnicos, estatistica aplicada, visualizacoes e interpretacao.' },
          { title: 'Avaliacao', copy: 'Introducao ao BLUP, modelos mistos, ranking, genomica aplicada e limites de interpretacao.' }
        ]
      },
      {
        id: 'metodo',
        label: 'Metodo',
        title: 'Metodo',
        copy: 'Conceito, exemplo, pratica e decisao. A diferenca e que o contexto vem da instituicao.',
        steps: ['Objetivo', 'Diagnostico de turma', 'Conteudo', 'Pratica', 'Fechamento']
      },
      {
        id: 'proposta-sob-demanda',
        label: 'Proposta',
        title: 'Proposta sob demanda',
        copy: 'Para montar proposta, reuna as informacoes abaixo. Isso evita orcamento generico e reduz retrabalho.',
        cards: [
          { title: 'Instituicao', copy: 'Tipo de organizacao, publico participante e numero estimado de pessoas.' },
          { title: 'Objetivo', copy: 'O que a turma precisa fazer melhor depois: interpretar DEP, organizar dados, usar R, selecionar, acasalar ou comunicar resultado.' },
          { title: 'Formato', copy: 'On-line, presencial, hibrido, aula unica, oficina, minicurso ou curso fechado.' },
          { title: 'Carga horaria', copy: 'Faixa desejada, datas possiveis, necessidade de certificado e atividade avaliativa.' }
        ]
      },
      {
        id: 'limites',
        label: 'Fronteira',
        title: 'Quando vira consultoria',
        copy: 'Se a demanda exige analisar dados proprios, revisar pedigree, emitir diagnostico de base real ou recomendar acasalamento especifico, o escopo deixa de ser treinamento e passa para consultoria tecnica.'
      }
    ],
    nextStep: {
      title: 'Proximo passo',
      copy: 'Se a equipe ainda nao fala a mesma lingua tecnica, comece por treinamento. Se ja existe base de dados e decisao pendente, va para consultoria.',
      actions: [
        { label: 'Montar proposta', anchor: 'proposta-sob-demanda' },
        { label: 'Solicitar consultoria', route: 'consultoria', anchor: 'triagem-tecnica' },
        { label: 'Ver curso aberto', route: 'catalog' }
      ]
    }
  }
}

function getServicePage(route) {
  return SERVICE_PAGES[route] || SERVICE_PAGES.consultoria
}

function getServicePages() {
  return [SERVICE_PAGES.consultoria, SERVICE_PAGES.treinamentos]
}

export { getServicePage, getServicePages }
