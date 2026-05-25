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
  if (route.screen === 'course' && route.selectedCourseId) return 'course/' + route.selectedCourseId
  return ''
}

function routeNeedsAuth(route) {
  return route.screen === 'catalog' || route.screen === 'course' || route.screen === 'account' || route.screen === 'admin' || Boolean(route.showQuiz)
}

function routeNeedsAdmin(route) {
  return route.screen === 'admin'
}

export { buildRouteHash, emptyRoute, parseRouteHash, routeNeedsAdmin, routeNeedsAuth }
