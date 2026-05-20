import test from 'node:test'
import assert from 'node:assert/strict'
import { buildRouteHash, parseRouteHash, routeNeedsAdmin, routeNeedsAuth } from '../src/lib/access.mjs'

test('parseRouteHash protects known learner routes', () => {
  assert.deepEqual(parseRouteHash('#catalog'), { screen: 'catalog', authMode: 'login', selectedCourseId: null, showQuiz: false })
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
  assert.equal(routeNeedsAuth(parseRouteHash('#quiz/module-01')), true)
  assert.equal(routeNeedsAdmin(parseRouteHash('#admin')), true)
  assert.equal(routeNeedsAdmin(parseRouteHash('#course/module-01')), false)
})
