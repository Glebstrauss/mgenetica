const LOCALE_STORAGE_KEY = 'mgenetica-locale'
const SUPPORTED_LOCALES = ['pt-BR', 'en', 'es']

const MESSAGES = {
  'pt-BR': {
    locales: { 'pt-BR': 'PT', en: 'EN', es: 'ES' },
    status: {
      syncing: 'Sincronizando com o Appwrite…',
      restoringSession: 'Restaurando sessão…',
      sessionVerified: 'Sessão verificada.',
      unlockFlow: 'Entre para desbloquear o fluxo completo.',
      loginSuccess: 'Sessão iniciada com sucesso.',
      signupSuccess: 'Conta criada e sessão iniciada.',
      sessionClosed: 'Sessão encerrada.',
      enterCourses: 'Entre para acessar os cursos.',
      enterCoursePage: 'Entre para acessar esta página do curso.',
      notAdmin: 'Usuário atual não está na lista de administradores.',
      runningChecks: 'Executando checks de sistema…',
      checksDone: 'Checks de sistema concluídos.',
      checksFailed: 'Falha ao executar checks de sistema.',
      progressSaved: 'Progresso salvo com sucesso.',
      progressUnavailable: 'Sessão iniciada, mas o progresso ainda não pôde ser carregado.',
      profileSaved: 'Perfil atualizado com sucesso.'
    },
    authErrors: {
      emailExists: 'Este e-mail já existe. Entre com a conta existente.',
      invalidCredentials: 'E-mail ou senha inválidos.',
      originBlocked: 'Host atual não está liberado no Appwrite Web Platform. Adicione a URL publicada antes de testar login.',
      loopback127Blocked: '127.0.0.1 não está registrado no Appwrite Web Platform. Abra o app com localhost:5173 ou registre 127.0.0.1 como Web platform.',
      network: 'Falha de rede ao falar com Appwrite.',
      sessionRejected: 'Sessão recusada pelo Appwrite. Atualize a página e entre novamente.',
      servicesUnavailable: 'Os serviços de aprendizagem estão temporariamente indisponíveis. Tente novamente em instantes.',
      generic: 'Não foi possível autenticar.'
    },
    common: {
      brandName: 'MGenética',
      brandTagline: 'Melhoramento animal, do conceito ao código',
      home: 'Home',
      courses: 'Cursos',
      signIn: 'Entrar',
      openCourses: 'Abrir cursos',
      admin: 'Admin',
      learnerArea: 'Cursos',
      profile: 'Perfil',
      logout: 'Sair',
      back: 'Voltar',
      openLiveUrl: 'Abrir URL live',
      openFile: 'Abrir arquivo',
      available: 'Disponível',
      active: 'Ativo',
      draft: 'Rascunho',
      reading: 'Leitura',
      status: 'Status',
      skipToContent: 'Pular para conteúdo',
      dedicatedCourse: 'Curso dedicado'
    },
    localeSwitcher: { label: 'Idioma' },
    home: {
      signIn: 'Entrar',
      signInAria: 'Entrar na plataforma',
      openCatalogAria: 'Abrir cursos',
      openAdminAria: 'Abrir painel admin',
      logoutAria: 'Fazer logout',
      eyebrow: 'Educação aplicada · Melhoramento animal',
      headline: 'Genética para decidir no campo.',
      description: 'Estude genética quantitativa e genômica em uma trilha prática guiada por R.',
      ctaLogin: 'Entrar para abrir trilha',
      ctaSignup: 'Criar conta',
      brandMeta1: 'Conteúdo técnico claro.',
      brandMeta2: 'Trilha prática com código.',
      benefitsAria: 'Pilares da plataforma',
      benefits: {
        reproducible: { title: 'R reproduzível', copy: 'Exemplos e roteiros prontos para estudar com evidência.' },
        science: { title: 'Ciência aplicada', copy: 'Conteúdo técnico claro, focado em decisão no campo.' },
        access: { title: 'Acesso único', copy: 'Conta única para trilha, quizzes e progresso do curso.' }
      },
      learner: {
        label: 'Cursos',
        heading: 'A trilha fica disponível após o login',
        copy: 'Use a área do aluno para abrir os cursos, revisar conteúdos e acessar cada página dedicada.',
        openCourses: 'Abrir cursos',
        logout: 'Sair da conta'
      },
      trustAria: 'Pilares de confiança da MGenética',
      trust: {
        rigor: { title: 'Rigor científico', copy: 'Conteúdo baseado em genética quantitativa, estatística e aplicação no campo.' },
        clarity: { title: 'Linguagem clara', copy: 'Explicações diretas, sem excesso de jargão e com interpretação curta.' },
        practice: { title: 'Prática reproduzível', copy: 'Scripts e dados simulados para estudar sem depender de bases externas.' }
      }
    },
    authPage: {
      brandName: 'Acesso',
      brandTagline: 'Entre para abrir a trilha de aprendizagem',
      eyebrow: 'Acesso à plataforma',
      heading: 'Entre ou crie conta para continuar.',
      copy: 'O acesso fica fora da home pública. Use esta página para abrir a trilha, continuar seus estudos e acompanhar o progresso.'
    },
    authPanel: {
      connectedTitle: 'Conta conectada',
      defaultTitle: 'Acesse sua conta',
      connectedCopy: 'Olá, {name}. Você está pronto para continuar.',
      defaultCopy: 'Entre para salvar progresso, abrir quizzes e usar a trilha completa.',
      tabLogin: 'Entrar',
      tabSignup: 'Criar conta',
      loginNote: 'Use seu e-mail e senha para retomar a trilha.',
      signupNote: 'Crie uma conta para testar a experiência completa de aprendizado.',
      name: 'Nome',
      namePlaceholder: 'Seu nome',
      email: 'E-mail',
      emailPlaceholder: 'voce@exemplo.com',
      password: 'Senha',
      loading: 'Processando…',
      createAccount: 'Criar conta',
      alreadyHaveAccount: 'Já tenho conta',
      wantCreateAccount: 'Quero criar conta',
      activeSession: 'Sessão ativa',
      activeCopy: 'Você pode continuar lendo o módulo e abrir quizzes com a sessão atual.'
    },
    catalog: {
      brandName: 'Cursos',
      brandTagline: 'Acesse os módulos dedicados da trilha',
      backHomeAria: 'Voltar para a home',
      openAdminAria: 'Abrir painel admin',
      logoutAria: 'Fazer logout',
      label: 'Trilha',
      heading: 'Cursos com página dedicada',
      progressOverview: '{tracked} módulos com progresso salvo, {passed} aprovados, média {average}%.',
      notStarted: 'Sem progresso',
      progressChip: '{percent}% completo',
      passed: 'Aprovado',
      coursesAria: 'Cursos disponíveis',
      openCourseAria: 'Abrir {title}',
      openPage: 'Abrir página do curso'
    },
    account: {
      brandName: 'Perfil',
      brandTagline: 'Dados, inscrições e progresso',
      open: 'Gerenciar perfil',
      openAria: 'Abrir perfil do aluno',
      profileLabel: 'Cadastro',
      heading: 'Dados do aluno',
      copy: 'Atualize seus dados de cadastro e acompanhe os cursos inscritos nesta conta.',
      name: 'Nome',
      namePlaceholder: 'Seu nome',
      email: 'E-mail',
      accountId: 'ID da conta',
      emailVerified: 'E-mail verificado',
      registeredAt: 'Cadastro',
      yes: 'Sim',
      no: 'Não',
      saveProfile: 'Salvar perfil',
      saving: 'Salvando…',
      profileSaved: 'Perfil atualizado.',
      profileSaveError: 'Não foi possível salvar o perfil.',
      coursesLabel: 'Cursos inscritos',
      coursesHeading: 'Sua trilha e progresso',
      progressOverview: '{tracked} módulos com progresso salvo, {passed} aprovados, média {average}%.',
      tracked: 'Módulos com progresso',
      passed: 'Aprovados',
      average: 'Média',
      courseProgress: '{percent}% concluído',
      continueCourse: 'Continuar módulo',
      startCourse: 'Iniciar módulo'
    },
    adminPage: {
      brandTagline: 'Painel de controle do sistema',
      label: 'Controle',
      heading: 'Saúde, autenticação e backend',
      copy: 'Este painel valida configuração do Appwrite, sessão atual, funções publicadas e smoke checks de aprendizagem.',
      runChecks: 'Executar checks',
      runningChecks: 'Executando checks…',
      session: 'Sessão',
      noUser: 'Sem usuário autenticado',
      appwrite: 'Appwrite',
      project: 'Projeto',
      requiredConfigTitle: 'Configuração exigida no Appwrite',
      requiredConfigCopy: 'Para liberar o resumo administrativo real, configure estas variáveis na função mgenetica_admin_fn.',
      adminEmailsCopy: 'Lista de e-mails admin separados por vírgula.',
      adminApiKeyCopy: 'Chave admin recomendada para resumo de usuários e funções.',
      fallbackApiKeyCopy: 'Fallback aceito pela função admin se a chave dedicada não existir.',
      currentStatus: 'Current status: adminApiConfigured = {configured}; adminEmailsConfigured = {adminEmailsConfigured}',
      learnersTracked: 'Alunos com progresso',
      modulesTracked: 'Módulos rastreados',
      averageProgress: 'Progresso médio',
      averageProgressValue: '{percent}%',
      modulesPassed: 'Módulos aprovados',
      reportTitle: 'Último relatório',
      noChecks: 'Nenhum check executado ainda.'
    },
    coursePage: {
      dedicatedPage: 'Página dedicada do curso',
      backToCatalog: 'Voltar aos cursos',
      catalog: 'Cursos',
      studyTitle: 'Como estudar este módulo',
      moduleMetaQuiz: 'Quiz',
      contextEyebrow: 'Contexto',
      contextTitle: 'O problema antes da fórmula',
      centralConcept: 'Conceito central',
      equationEyebrow: 'Equação',
      equationTitle: 'A equação do melhorista',
      equationCopy: 'O ganho genético anual depende da intensidade de seleção, da acurácia, da variância genética aditiva e do intervalo de geração.',
      symbols: { symbol: 'Símbolo', meaning: 'Significado', increase: 'Como aumentar' },
      practicalTip: 'Dica prática',
      interpretationEyebrow: 'Interpretação',
      interpretationTitle: 'Como ler os resultados',
      warning: 'Atenção:',
      evidenceEyebrow: 'Evidência',
      evidenceTitle: 'Caminho de evidência',
      exerciseEyebrow: 'Exercício',
      exerciseTitle: 'Exercício proposto',
      checkpointEyebrow: 'Checkpoint',
      checkpointTitle: 'Antes do quiz',
      summaryEyebrow: 'Resumo',
      summaryTitle: 'O que levar deste módulo',
      actionEyebrow: 'Ação',
      actionTitle: 'Depois do quiz',
      progressEyebrow: 'Progresso',
      progressTitle: 'Seu estado neste módulo',
      progressPercent: 'Percentual atual',
      progressPercentValue: '{percent}% concluído',
      progressAssessment: 'Estado do quiz',
      progressAttempts: 'Tentativas',
      progressAttemptsValue: '{count} tentativas',
      progressPassed: 'Quiz concluído com aprovação.',
      progressReview: 'Ainda precisa revisar e reenviar o quiz.',
      progressPending: 'Ainda sem envio.',
      progressEmpty: 'Nenhum progresso salvo neste módulo.',
      afterQuizCopy: 'Use o quiz para validar leitura, cálculo e decisão técnica antes de avançar.',
      openQuiz: 'Abrir quiz',
      closingEyebrow: 'Fechamento',
      closingTitle: 'Antes de trocar de página',
      closingCopy: 'Feche o módulo quando pergunta, leitura, exercício e quiz apontarem para a mesma interpretação.',
      index: 'Índice',
      allModules: 'Todos os cursos',
      nextCourse: 'Próximo curso',
      next: 'Próximo',
      nextCatalogFallback: 'Veja os próximos cursos',
      constructionEyebrow: 'Status',
      constructionTitle: 'Conteúdo em construção',
      constructionCopy: 'Esta página já está dedicada ao curso, mas o conteúdo completo ainda será preenchido na próxima etapa da trilha.',
      openCourse: 'Voltar ao curso'
    },
    quiz: {
      label: 'Quiz',
      title: 'Quiz do módulo',
      description: 'Responda as questões formativas do módulo atual.',
      loading: 'Carregando quiz…',
      loadError: 'Não foi possível carregar o quiz deste módulo.',
      submitError: 'Não foi possível enviar o quiz.',
      servicesUnavailable: 'Os serviços de quiz ou progresso estão temporariamente indisponíveis.',
      sessionRequired: 'Sua sessão expirou ou não foi aceita. Atualize a página e entre novamente.',
      backToCourse: 'Voltar ao módulo',
      submit: 'Enviar respostas',
      submitting: 'Enviando…',
      errorLabel: 'Erro:',
      progressTitle: 'Progresso do quiz',
      progressCopy: '{answered} de {total} questões respondidas.',
      passMarkTitle: 'Nota de corte',
      passMarkCopy: 'Você precisa de {passMark} acertos em {total} questões.',
      questionLabel: 'Questão {index}',
      resultEyebrow: 'Resultado',
      resultTitle: 'Resultado do envio',
      passState: 'Pontuação suficiente para avançar.',
      failState: 'Revise o módulo e tente novamente.',
      score: 'Pontuação: {score}/{total}',
      progressSaved: 'Resultado salvo no seu progresso.'
    }
  },
  en: {
    locales: { 'pt-BR': 'PT', en: 'EN', es: 'ES' },
    status: {
      syncing: 'Syncing with Appwrite…', restoringSession: 'Restoring session…', sessionVerified: 'Session verified.', unlockFlow: 'Sign in to unlock the full flow.', loginSuccess: 'Session started successfully.', signupSuccess: 'Account created and session started.', sessionClosed: 'Session closed.', enterCourses: 'Sign in to access the courses.', enterCoursePage: 'Sign in to access this course page.', notAdmin: 'Current user is not in the admin allowlist.', runningChecks: 'Running system checks…', checksDone: 'System checks completed.', checksFailed: 'Failed to run system checks.', progressSaved: 'Progress saved successfully.', progressUnavailable: 'Signed in, but progress could not be loaded yet.', profileSaved: 'Profile updated successfully.'
    },
    authErrors: {
      emailExists: 'This email already exists. Sign in with the existing account.', invalidCredentials: 'Invalid email or password.', originBlocked: 'Current host is not allowed in the Appwrite Web Platform. Add the published URL before testing login.', loopback127Blocked: '127.0.0.1 is not registered in the Appwrite Web Platform. Open the app with localhost:5173 or register 127.0.0.1 as a Web platform.', network: 'Network failure while talking to Appwrite.', sessionRejected: 'Appwrite did not accept the current session. Refresh and sign in again.', servicesUnavailable: 'Learning services are temporarily unavailable. Please try again in a moment.', generic: 'Could not authenticate.'
    },
    common: { brandName: 'MGenética', brandTagline: 'Animal breeding, from concept to code', home: 'Home', courses: 'Courses', signIn: 'Sign in', openCourses: 'Open courses', admin: 'Admin', learnerArea: 'Courses', profile: 'Profile', logout: 'Sign out', back: 'Back', openLiveUrl: 'Open live site', openFile: 'Open file', available: 'Available', active: 'Active', draft: 'Draft', reading: 'Reading', status: 'Status', skipToContent: 'Skip to content', dedicatedCourse: 'Dedicated course' },
    localeSwitcher: { label: 'Language' },
    home: {
      signIn: 'Sign in', signInAria: 'Sign in to the platform', openCatalogAria: 'Open courses', openAdminAria: 'Open admin panel', logoutAria: 'Sign out', eyebrow: 'Applied education · Animal breeding', headline: 'Genetics for field decisions.', description: 'Study quantitative genetics and genomics through a practical learning path guided by R.', ctaLogin: 'Sign in to open path', ctaSignup: 'Create account', brandMeta1: 'Clear technical content.', brandMeta2: 'Practical path with code.', benefitsAria: 'Platform pillars',
      benefits: { reproducible: { title: 'Reproducible R', copy: 'Ready scripts and examples for evidence-based study.' }, science: { title: 'Applied science', copy: 'Clear technical content focused on field decisions.' }, access: { title: 'Single access', copy: 'One account for path, quizzes and progress.' } },
      learner: { label: 'Courses', heading: 'Learning path unlocks after login', copy: 'Use Courses to open course pages, review content, and track progress.', openCourses: 'Open courses', logout: 'Sign out' },
      trustAria: 'MGenética trust pillars',
      trust: { rigor: { title: 'Scientific rigor', copy: 'Content grounded in quantitative genetics, statistics and field use.' }, clarity: { title: 'Clear language', copy: 'Direct explanations, concise interpretation, low jargon.' }, practice: { title: 'Reproducible practice', copy: 'Scripts and simulated data for study without outside databases.' } }
    },
    authPage: { brandName: 'Access', brandTagline: 'Sign in to open path', eyebrow: 'Platform access', heading: 'Sign in or create account.', copy: 'Use this page to open path, continue studying, and track your progress.' },
    authPanel: { connectedTitle: 'Connected account', defaultTitle: 'Access your account', connectedCopy: 'Hello, {name}. Ready to continue.', defaultCopy: 'Sign in to save progress, open quizzes, and use full path.', tabLogin: 'Sign in', tabSignup: 'Create account', loginNote: 'Use your email and password to resume path.', signupNote: 'Create an account to try full learning experience.', name: 'Name', namePlaceholder: 'Your name', email: 'Email', emailPlaceholder: 'you@example.com', password: 'Password', loading: 'Processing…', createAccount: 'Create account', alreadyHaveAccount: 'I have an account', wantCreateAccount: 'Create account instead', activeSession: 'Active session', activeCopy: 'You can keep reading and open quizzes with current session.' },
    catalog: { brandName: 'Courses', brandTagline: 'Open course pages from the learning path', backHomeAria: 'Back to home', openAdminAria: 'Open admin panel', logoutAria: 'Sign out', label: 'Learning path', heading: 'Courses', progressOverview: '{tracked} courses with saved progress, {passed} passed, {average}% average.', notStarted: 'No progress', progressChip: '{percent}% complete', passed: 'Passed', coursesAria: 'Available courses', openCourseAria: 'Open course page for {title}', openPage: 'Open course page' },
    account: { brandName: 'Profile', brandTagline: 'Data, enrollments, and progress', open: 'Manage profile', openAria: 'Open student profile', profileLabel: 'Registration', heading: 'Student data', copy: 'Update your registration data and manage enrolled courses for this account.', name: 'Name', namePlaceholder: 'Your name', email: 'Email', accountId: 'Account ID', emailVerified: 'Email verified', registeredAt: 'Registered', yes: 'Yes', no: 'No', saveProfile: 'Save profile', saving: 'Saving…', profileSaved: 'Profile updated.', profileSaveError: 'Could not save profile.', coursesLabel: 'Enrolled courses', coursesHeading: 'Your path and progress', progressOverview: '{tracked} modules with saved progress, {passed} passed, {average}% average.', tracked: 'Tracked modules', passed: 'Passed', average: 'Average', courseProgress: '{percent}% complete', continueCourse: 'Continue module', startCourse: 'Start module' },
    adminPage: { brandTagline: 'System control panel', label: 'Control', heading: 'System health, authentication, and backend', copy: 'This panel validates Appwrite configuration, the current session, published functions, and learner smoke checks.', runChecks: 'Run diagnostics', runningChecks: 'Running diagnostics…', session: 'Session', noUser: 'No authenticated user', appwrite: 'Appwrite', project: 'Project', requiredConfigTitle: 'Required Appwrite setup', requiredConfigCopy: 'To unlock the real admin summary, configure these variables in the mgenetica_admin_fn function.', adminEmailsCopy: 'Comma-separated list of admin email addresses.', adminApiKeyCopy: 'Recommended admin key for user and function summaries.', fallbackApiKeyCopy: 'Fallback accepted by the admin function if the dedicated key is missing.', currentStatus: 'Current status: adminApiConfigured = {configured}; adminEmailsConfigured = {adminEmailsConfigured}', learnersTracked: 'Learners with progress', modulesTracked: 'Tracked modules', averageProgress: 'Average progress', averageProgressValue: '{percent}%', modulesPassed: 'Passed modules', reportTitle: 'Latest report', noChecks: 'No diagnostics have been run yet.' },
    coursePage: { dedicatedPage: 'Course page', backToCatalog: 'Back to courses', catalog: 'Courses', studyTitle: 'How to approach this module', moduleMetaQuiz: 'Quiz', contextEyebrow: 'Context', contextTitle: 'The problem before the formula', centralConcept: 'Central concept', equationEyebrow: 'Equation', equationTitle: 'The breeder’s equation', equationCopy: 'Annual genetic gain depends on selection intensity, accuracy, additive genetic variance, and generation interval.', symbols: { symbol: 'Symbol', meaning: 'Meaning', increase: 'How to improve it' }, practicalTip: 'Practical note', interpretationEyebrow: 'Interpretation', interpretationTitle: 'How to read the results', warning: 'Note:', evidenceEyebrow: 'Evidence', evidenceTitle: 'Evidence path', exerciseEyebrow: 'Exercise', exerciseTitle: 'Suggested exercise', checkpointEyebrow: 'Checkpoint', checkpointTitle: 'Before the quiz', summaryEyebrow: 'Summary', summaryTitle: 'What to take away from this module', actionEyebrow: 'Action', actionTitle: 'After the quiz', progressEyebrow: 'Progress', progressTitle: 'Your status in this module', progressPercent: 'Current percent', progressPercentValue: '{percent}% complete', progressAssessment: 'Quiz state', progressAttempts: 'Attempts', progressAttemptsValue: '{count} attempts', progressPassed: 'Quiz passed.', progressReview: 'Review the module and submit again.', progressPending: 'No submission yet.', progressEmpty: 'No saved progress for this module yet.', afterQuizCopy: 'Use the quiz to confirm reading, calculation, and technical decision before moving on.', openQuiz: 'Open quiz', closingEyebrow: 'Closeout', closingTitle: 'Before leaving this page', closingCopy: 'Close the module when the question, reading, exercise, and quiz all support the same interpretation.', index: 'Index', allModules: 'All courses', nextCourse: 'Next course', next: 'Next', nextCatalogFallback: 'See the next courses', constructionEyebrow: 'Status', constructionTitle: 'Content under construction', constructionCopy: 'This page is already reserved for the course, but the full lesson content will be added in the next stage of the learning path.', openCourse: 'Back to course' },
    quiz: { label: 'Quiz', title: 'Module quiz', description: 'Answer the formative questions for the current module.', loading: 'Loading quiz…', loadError: 'Could not load the quiz for this module.', submitError: 'Could not submit the quiz.', servicesUnavailable: 'Quiz or progress services are temporarily unavailable.', sessionRequired: 'Your session expired or was not accepted. Refresh and sign in again.', backToCourse: 'Back to module', submit: 'Submit answers', submitting: 'Submitting…', errorLabel: 'Error:', progressTitle: 'Quiz progress', progressCopy: '{answered} of {total} questions answered.', passMarkTitle: 'Pass mark', passMarkCopy: 'You need {passMark} correct answers out of {total}.', questionLabel: 'Question {index}', resultEyebrow: 'Result', resultTitle: 'Submission result', passState: 'Enough points to move forward.', failState: 'Review the module and try again.', score: 'Score: {score}/{total}', progressSaved: 'Result saved to your progress.' }
  },
  es: {
    locales: { 'pt-BR': 'PT', en: 'EN', es: 'ES' },
    status: { syncing: 'Sincronizando con Appwrite…', restoringSession: 'Restaurando sesión…', sessionVerified: 'Sesión verificada.', unlockFlow: 'Inicia sesión para desbloquear el flujo completo.', loginSuccess: 'Sesión iniciada con éxito.', signupSuccess: 'Cuenta creada y sesión iniciada.', sessionClosed: 'Sesión cerrada.', enterCourses: 'Inicia sesión para acceder a los cursos.', enterCoursePage: 'Inicia sesión para acceder a esta página del curso.', notAdmin: 'El usuario actual no está en la lista de administradores.', runningChecks: 'Ejecutando verificaciones del sistema…', checksDone: 'Verificaciones del sistema completadas.', checksFailed: 'No se pudieron ejecutar las verificaciones del sistema.', progressSaved: 'Progreso guardado correctamente.', progressUnavailable: 'La sesión se inició, pero el progreso aún no pudo cargarse.', profileSaved: 'Perfil actualizado correctamente.' },
    authErrors: { emailExists: 'Este correo ya existe. Inicia sesión con la cuenta existente.', invalidCredentials: 'Correo o contraseña no válidos.', originBlocked: 'El host actual no está permitido en Appwrite Web Platform. Agrega la URL publicada antes de probar el login.', loopback127Blocked: '127.0.0.1 no está registrado en Appwrite Web Platform. Abre la app con localhost:5173 o registra 127.0.0.1 como plataforma web.', network: 'Fallo de red al comunicarse con Appwrite.', sessionRejected: 'Appwrite no aceptó la sesión actual. Actualiza la página e inicia sesión otra vez.', servicesUnavailable: 'Los servicios de aprendizaje están temporalmente no disponibles. Inténtalo de nuevo en un momento.', generic: 'No fue posible autenticar.' },
    common: { brandName: 'MGenética', brandTagline: 'Mejoramiento animal, del concepto al código', home: 'Inicio', courses: 'Cursos', signIn: 'Entrar', openCourses: 'Abrir cursos', admin: 'Admin', learnerArea: 'Cursos', profile: 'Perfil', logout: 'Salir', back: 'Volver', openLiveUrl: 'Abrir sitio publicado', openFile: 'Abrir archivo', available: 'Disponible', active: 'Activo', draft: 'Borrador', reading: 'Lectura', status: 'Estado', skipToContent: 'Saltar al contenido', dedicatedCourse: 'Curso dedicado' },
    localeSwitcher: { label: 'Idioma' },
    home: { signIn: 'Entrar', signInAria: 'Entrar a la plataforma', openCatalogAria: 'Abrir cursos', openAdminAria: 'Abrir panel admin', logoutAria: 'Cerrar sesión', eyebrow: 'Educación aplicada · Mejoramiento animal', headline: 'Genética para decidir en campo.', description: 'Estudia genética cuantitativa y genómica con una ruta práctica guiada por R.', ctaLogin: 'Entrar para abrir ruta', ctaSignup: 'Crear cuenta', brandMeta1: 'Contenido técnico claro.', brandMeta2: 'Ruta práctica con código.', benefitsAria: 'Pilares de la plataforma', benefits: { reproducible: { title: 'R reproducible', copy: 'Ejemplos y guiones listos para estudiar con evidencia.' }, science: { title: 'Ciencia aplicada', copy: 'Contenido técnico claro, enfocado en decisiones de campo.' }, access: { title: 'Acceso único', copy: 'Una sola cuenta para ruta, cuestionarios y progreso.' } }, learner: { label: 'Cursos', heading: 'La ruta se abre después del acceso', copy: 'Usa Cursos para abrir cursos y revisar cada página.', openCourses: 'Abrir cursos', logout: 'Salir de la cuenta' }, trustAria: 'Pilares de confianza de MGenética', trust: { rigor: { title: 'Rigor científico', copy: 'Contenido basado en genética cuantitativa, estadística y uso en campo.' }, clarity: { title: 'Lenguaje claro', copy: 'Explicaciones directas, interpretación breve, poca jerga.' }, practice: { title: 'Práctica reproducible', copy: 'Scripts y datos simulados para estudiar sin bases externas.' } } },
    authPage: { brandName: 'Acceso', brandTagline: 'Entra para abrir la ruta', eyebrow: 'Acceso a la plataforma', heading: 'Entra o crea una cuenta.', copy: 'Usa esta página para abrir la ruta, seguir estudiando y revisar tu progreso.' },
    authPanel: { connectedTitle: 'Cuenta conectada', defaultTitle: 'Accede a tu cuenta', connectedCopy: 'Hola, {name}. Ya puedes continuar.', defaultCopy: 'Entra para guardar tu progreso, abrir cuestionarios y usar la ruta completa.', tabLogin: 'Entrar', tabSignup: 'Crear cuenta', loginNote: 'Usa tu correo y contraseña para retomar la ruta.', signupNote: 'Crea una cuenta para probar la experiencia completa.', name: 'Nombre', namePlaceholder: 'Tu nombre', email: 'Correo', emailPlaceholder: 'tu@ejemplo.com', password: 'Contraseña', loading: 'Procesando…', createAccount: 'Crear cuenta', alreadyHaveAccount: 'Ya tengo cuenta', wantCreateAccount: 'Crear cuenta en su lugar', activeSession: 'Sesión activa', activeCopy: 'Puedes seguir leyendo y abrir cuestionarios con la sesión actual.' },
    catalog: { brandName: 'Cursos', brandTagline: 'Abre páginas de curso de la ruta', backHomeAria: 'Volver al inicio', openAdminAria: 'Abrir panel admin', logoutAria: 'Cerrar sesión', label: 'Ruta', heading: 'Cursos', progressOverview: '{tracked} cursos con progreso guardado, {passed} aprobados, promedio {average}%.', notStarted: 'Sin progreso', progressChip: '{percent}% completado', passed: 'Aprobado', coursesAria: 'Cursos disponibles', openCourseAria: 'Abrir página del curso {title}', openPage: 'Abrir página del curso' },
    account: { brandName: 'Perfil', brandTagline: 'Datos, inscripciones y progreso', open: 'Gestionar perfil', openAria: 'Abrir perfil del estudiante', profileLabel: 'Registro', heading: 'Datos del estudiante', copy: 'Actualiza tus datos y gestiona los cursos inscritos en esta cuenta.', name: 'Nombre', namePlaceholder: 'Tu nombre', email: 'Correo', accountId: 'ID de cuenta', emailVerified: 'Correo verificado', registeredAt: 'Registro', yes: 'Sí', no: 'No', saveProfile: 'Guardar perfil', saving: 'Guardando…', profileSaved: 'Perfil actualizado.', profileSaveError: 'No fue posible guardar el perfil.', coursesLabel: 'Cursos inscritos', coursesHeading: 'Tu ruta y progreso', progressOverview: '{tracked} módulos con progreso guardado, {passed} aprobados, promedio {average}%.', tracked: 'Módulos con progreso', passed: 'Aprobados', average: 'Promedio', courseProgress: '{percent}% completado', continueCourse: 'Continuar módulo', startCourse: 'Iniciar módulo' },
    adminPage: { brandTagline: 'Panel de control del sistema', label: 'Control', heading: 'Salud del sistema, autenticación y backend', copy: 'Este panel valida la configuración de Appwrite, la sesión actual, las funciones publicadas y las verificaciones del entorno de aprendizaje.', runChecks: 'Ejecutar diagnósticos', runningChecks: 'Ejecutando diagnósticos…', session: 'Sesión', noUser: 'Sin usuario autenticado', appwrite: 'Appwrite', project: 'Proyecto', requiredConfigTitle: 'Configuración requerida de Appwrite', requiredConfigCopy: 'Para habilitar el resumen administrativo real, configura estas variables en la función mgenetica_admin_fn.', adminEmailsCopy: 'Lista de correos admin separada por comas.', adminApiKeyCopy: 'Clave admin recomendada para el resumen de usuarios y funciones.', fallbackApiKeyCopy: 'Fallback aceptado por la función admin si la clave dedicada no existe.', currentStatus: 'Estado actual: adminApiConfigured = {configured}; adminEmailsConfigured = {adminEmailsConfigured}', learnersTracked: 'Estudiantes con progreso', modulesTracked: 'Módulos rastreados', averageProgress: 'Progreso promedio', averageProgressValue: '{percent}%', modulesPassed: 'Módulos aprobados', reportTitle: 'Último informe', noChecks: 'Aún no se ejecutó ningún diagnóstico.' },
    coursePage: { dedicatedPage: 'Página del curso', backToCatalog: 'Volver a cursos', catalog: 'Cursos', studyTitle: 'Cómo abordar este módulo', moduleMetaQuiz: 'Cuestionario', contextEyebrow: 'Contexto', contextTitle: 'El problema antes de la fórmula', centralConcept: 'Concepto central', equationEyebrow: 'Ecuación', equationTitle: 'La ecuación del mejorista', equationCopy: 'La ganancia genética anual depende de la intensidad de selección, la precisión, la varianza genética aditiva y el intervalo generacional.', symbols: { symbol: 'Símbolo', meaning: 'Significado', increase: 'Cómo mejorarlo' }, practicalTip: 'Nota práctica', interpretationEyebrow: 'Interpretación', interpretationTitle: 'Cómo leer los resultados', warning: 'Nota:', evidenceEyebrow: 'Evidencia', evidenceTitle: 'Ruta de evidencia', exerciseEyebrow: 'Ejercicio', exerciseTitle: 'Ejercicio sugerido', checkpointEyebrow: 'Checkpoint', checkpointTitle: 'Antes del cuestionario', summaryEyebrow: 'Resumen', summaryTitle: 'Qué llevarte de este módulo', actionEyebrow: 'Acción', actionTitle: 'Después del cuestionario', progressEyebrow: 'Progreso', progressTitle: 'Tu estado en este módulo', progressPercent: 'Porcentaje actual', progressPercentValue: '{percent}% completado', progressAssessment: 'Estado del cuestionario', progressAttempts: 'Intentos', progressAttemptsValue: '{count} intentos', progressPassed: 'Cuestionario aprobado.', progressReview: 'Revisa el módulo y envíalo de nuevo.', progressPending: 'Sin envío todavía.', progressEmpty: 'Todavía no hay progreso guardado para este módulo.', afterQuizCopy: 'Usa el cuestionario para confirmar lectura, cálculo y decisión técnica antes de avanzar.', openQuiz: 'Abrir cuestionario', closingEyebrow: 'Cierre', closingTitle: 'Antes de salir de esta página', closingCopy: 'Cierra el módulo cuando la pregunta, la lectura, el ejercicio y el cuestionario apunten a la misma interpretación.', index: 'Índice', allModules: 'Todos los cursos', nextCourse: 'Siguiente curso', next: 'Siguiente', nextCatalogFallback: 'Ve los próximos cursos', constructionEyebrow: 'Estado', constructionTitle: 'Contenido en construcción', constructionCopy: 'Esta página ya está reservada para el curso, pero el contenido completo se agregará en la siguiente etapa de la ruta.', openCourse: 'Volver al curso' },
    quiz: { label: 'Cuestionario', title: 'Cuestionario del módulo', description: 'Responde las preguntas formativas del módulo actual.', loading: 'Cargando cuestionario…', loadError: 'No fue posible cargar el cuestionario de este módulo.', submitError: 'No fue posible enviar el cuestionario.', servicesUnavailable: 'Los servicios de cuestionario o progreso están temporalmente no disponibles.', sessionRequired: 'Tu sesión expiró o no fue aceptada. Actualiza la página e inicia sesión otra vez.', backToCourse: 'Volver al módulo', submit: 'Enviar respuestas', submitting: 'Enviando…', errorLabel: 'Error:', progressTitle: 'Progreso del cuestionario', progressCopy: '{answered} de {total} preguntas respondidas.', passMarkTitle: 'Nota de corte', passMarkCopy: 'Necesitas {passMark} respuestas correctas de {total}.', questionLabel: 'Pregunta {index}', resultEyebrow: 'Resultado', resultTitle: 'Resultado del envío', passState: 'Puntos suficientes para avanzar.', failState: 'Revisa el módulo e inténtalo otra vez.', score: 'Puntuación: {score}/{total}', progressSaved: 'Resultado guardado en tu progreso.' }
  }
}

function getNestedValue(target, path) {
  return path.split('.').reduce((current, part) => (current && current[part] !== undefined ? current[part] : undefined), target)
}

function interpolate(template, params = {}) {
  return String(template).replace(/\{(\w+)\}/g, (_, key) => (params[key] ?? '{' + key + '}'))
}

function normalizeLocale(locale) {
  if (SUPPORTED_LOCALES.includes(locale)) return locale
  if (String(locale || '').toLowerCase().startsWith('en')) return 'en'
  if (String(locale || '').toLowerCase().startsWith('es')) return 'es'
  return 'pt-BR'
}

function detectInitialLocale() {
  if (typeof window === 'undefined') return 'pt-BR'
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored) return normalizeLocale(stored)
  return normalizeLocale(window.navigator.language)
}

function createTranslator(locale) {
  return (key, params = {}) => {
    const normalizedLocale = normalizeLocale(locale)
    const localized = getNestedValue(MESSAGES[normalizedLocale], key)
    const fallback = getNestedValue(MESSAGES['pt-BR'], key)
    const value = localized ?? fallback ?? key
    return typeof value === 'string' ? interpolate(value, params) : value
  }
}

export { MESSAGES, SUPPORTED_LOCALES, LOCALE_STORAGE_KEY, normalizeLocale, detectInitialLocale, createTranslator }
