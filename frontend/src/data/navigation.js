const LEARNER_NAV_ITEMS = Object.freeze([
  { id: 'home', labelKey: 'common.home', route: { screen: 'home' }, icon: 'compass' },
  { id: 'courses', labelKey: 'common.courses', route: { screen: 'catalog' }, icon: 'book' },
  { id: 'profile', labelKey: 'common.profile', route: { screen: 'account' }, icon: 'user' },
])

const ROUTE_LABELS = Object.freeze({
  home: 'Home',
  auth: 'Sign in',
  catalog: 'Courses',
  account: 'Profile',
  course: 'Course page',
  quiz: 'Quiz',
})

export { LEARNER_NAV_ITEMS, ROUTE_LABELS }
