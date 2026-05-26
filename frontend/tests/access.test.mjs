import test from 'node:test'
import assert from 'node:assert/strict'
import { buildRouteHash, legacyPathToHash, parseRouteHash, routeNeedsAdmin, routeNeedsAuth } from '../src/lib/access.mjs'

test('parseRouteHash protects known learner routes', () => {
  assert.deepEqual(parseRouteHash('#catalog'), { screen: 'catalog', authMode: 'login', selectedCourseId: null, showQuiz: false })
  assert.deepEqual(parseRouteHash('#account'), { screen: 'account', authMode: 'login', selectedCourseId: null, showQuiz: false })
  assert.deepEqual(parseRouteHash('#course/module-01'), { screen: 'course', authMode: 'login', selectedCourseId: 'module-01', showQuiz: false })
  assert.deepEqual(parseRouteHash('#quiz/module-01'), { screen: 'course', authMode: 'login', selectedCourseId: 'module-01', showQuiz: true })
})

test('buildRouteHash round-trips protected routes', () => {
  const route = { screen: 'course', authMode: 'login', selectedCourseId: 'module-03', showQuiz: true }
  assert.equal(buildRouteHash(route), 'quiz/module-03')
  assert.deepEqual(parseRouteHash('#' + buildRouteHash(route)), route)
})

test('guard helpers classify access correctly', () => {
  assert.equal(routeNeedsAuth(parseRouteHash('#auth')), false)
  assert.equal(routeNeedsAuth(parseRouteHash('#catalog')), true)
  assert.equal(routeNeedsAuth(parseRouteHash('#account')), true)
  assert.equal(routeNeedsAuth(parseRouteHash('#quiz/module-01')), true)
  assert.equal(routeNeedsAdmin(parseRouteHash('#admin')), true)
  assert.equal(routeNeedsAuth(parseRouteHash('#admin')), true)
  assert.equal(routeNeedsAdmin(parseRouteHash('#course/module-01')), false)
})

test('legacyPathToHash maps former Quarto entry points to learner routes', () => {
  assert.equal(legacyPathToHash('/mgenetica/plataforma.html'), 'auth')
  assert.equal(legacyPathToHash('/mgenetica/modules/'), 'catalog')
  assert.equal(legacyPathToHash('/mgenetica/en/modules/'), 'catalog')
  assert.equal(legacyPathToHash('/mgenetica/es/modules/'), 'catalog')
})

test('legacyPathToHash maps former module pages to course routes', () => {
  assert.equal(
    legacyPathToHash('/mgenetica/modules/modulo01-revisao-de-genetica-basica.html'),
    'course/module-01',
  )
  assert.equal(
    legacyPathToHash('/mgenetica/en/modules/modulo21-projeto-final-pipeline-completo-de-selecao.html'),
    'course/module-21',
  )
  assert.equal(
    legacyPathToHash('/mgenetica/es/modules/modulo10-selecao-e-ganho-genetico.html'),
    'course/module-10',
  )
})

test('legacyPathToHash ignores unrelated paths', () => {
  assert.equal(legacyPathToHash('/mgenetica/assets/index.js'), null)
  assert.equal(legacyPathToHash('/mgenetica/'), null)
})
