function emptyRoute() {
  return { screen: 'home', authMode: 'login', selectedCourseId: null, showQuiz: false }
}

function parseRouteHash(hash) {
  const clean = String(hash || '').replace(/^#/, '').trim()
  if (!clean) return emptyRoute()
  if (clean === 'auth' || clean === 'login') return { screen: 'auth', authMode: 'login', selectedCourseId: null, showQuiz: false }
  if (clean === 'signup') return { screen: 'auth', authMode: 'signup', selectedCourseId: null, showQuiz: false }
  if (clean === 'catalog') return { screen: 'catalog', authMode: 'login', selectedCourseId: null, showQuiz: false }
  if (clean === 'account') return { screen: 'account', authMode: 'login', selectedCourseId: null, showQuiz: false }
  if (clean === 'admin') return { screen: 'admin', authMode: 'login', selectedCourseId: null, showQuiz: false }
  if (clean === 'consultoria') return { screen: 'consultoria', authMode: 'login', selectedCourseId: null, showQuiz: false }
  if (clean === 'treinamentos') return { screen: 'treinamentos', authMode: 'login', selectedCourseId: null, showQuiz: false }
  if (clean.indexOf('course/') === 0) {
    const selectedCourseId = clean.slice('course/'.length) || null
    return selectedCourseId ? { screen: 'course', authMode: 'login', selectedCourseId, showQuiz: false } : emptyRoute()
  }
  if (clean.indexOf('quiz/') === 0) {
    const selectedCourseId = clean.slice('quiz/'.length) || null
    return selectedCourseId ? { screen: 'course', authMode: 'login', selectedCourseId, showQuiz: true } : emptyRoute()
  }
  return emptyRoute()
}

function buildRouteHash(route) {
  if (route.showQuiz && route.selectedCourseId) return 'quiz/' + route.selectedCourseId
  if (route.screen === 'auth') return route.authMode === 'signup' ? 'signup' : 'auth'
  if (route.screen === 'catalog') return 'catalog'
  if (route.screen === 'account') return 'account'
  if (route.screen === 'admin') return 'admin'
  if (route.screen === 'consultoria') return 'consultoria'
  if (route.screen === 'treinamentos') return 'treinamentos'
  if (route.screen === 'course' && route.selectedCourseId) return 'course/' + route.selectedCourseId
  return ''
}

const LEGACY_MODULE_SLUGS = new Map([
  ['modulo01-revisao-de-genetica-basica.html', 'module-01'],
  ['modulo02-modos-de-acao-genica.html', 'module-02'],
  ['modulo03-genetica-de-populacoes-i-frequencias-alelicas-e-genotipicas.html', 'module-03'],
  ['modulo04-hardy-weinberg-alelos-multiplos-e-genes-ligados-ao-sexo.html', 'module-04'],
  ['modulo05-fatores-que-alteram-frequencias-genicas.html', 'module-05'],
  ['modulo06-valores-e-medias-fenotipo-genotipo-e-ambiente.html', 'module-06'],
  ['modulo07-nocoes-de-genetica-quantitativa.html', 'module-07'],
  ['modulo08-componentes-de-variancia.html', 'module-08'],
  ['modulo09-herdabilidade-e-repetibilidade.html', 'module-09'],
  ['modulo10-selecao-e-ganho-genetico.html', 'module-10'],
  ['modulo11-correlacoes-geneticas-fenotipicas-e-ambientais.html', 'module-11'],
  ['modulo12-caracteristicas-de-limiar.html', 'module-12'],
  ['modulo13-endogamia-e-parentesco.html', 'module-13'],
  ['modulo14-cruzamentos-heterose-e-complementaridade.html', 'module-14'],
  ['modulo15-avaliacao-genetica-dep-ebv-e-ranking-de-animais.html', 'module-15'],
  ['modulo16-modelos-lineares-e-modelos-mistos.html', 'module-16'],
  ['modulo17-blup-e-modelo-animal.html', 'module-17'],
  ['modulo18-genomica-marcadores-snp-e-dados-moleculares.html', 'module-18'],
  ['modulo19-controle-de-qualidade-de-dados-genomicos.html', 'module-19'],
  ['modulo20-matrizes-genomicas-gwas-e-predicao-genomica.html', 'module-20'],
  ['modulo21-projeto-final-pipeline-completo-de-selecao.html', 'module-21'],
])

function legacyPathToHash(pathname) {
  const normalizedPath = String(pathname || '').replace(/\/+/g, '/').replace(/\/+$/, '/')
  if (/\/plataforma\.html$/.test(normalizedPath)) return 'auth'
  if (/\/consultoria\.html$/.test(normalizedPath)) return 'consultoria'
  if (/\/treinamentos\.html$/.test(normalizedPath)) return 'treinamentos'
  if (/\/(en\/|es\/)?modules\/?$/.test(normalizedPath)) return 'catalog'

  const filename = normalizedPath.split('/').filter(Boolean).pop()
  const moduleId = LEGACY_MODULE_SLUGS.get(filename)
  return moduleId ? 'course/' + moduleId : null
}

function routeNeedsAuth(route) {
  return route.screen === 'catalog' || route.screen === 'course' || route.screen === 'account' || route.screen === 'admin' || Boolean(route.showQuiz)
}

function routeNeedsAdmin(route) {
  return route.screen === 'admin'
}

export { buildRouteHash, emptyRoute, legacyPathToHash, parseRouteHash, routeNeedsAdmin, routeNeedsAuth }
