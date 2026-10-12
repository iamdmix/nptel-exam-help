// Minimal hash router used so every screen has its own URL and the browser
// Back button / mobile swipe-back gesture navigate through the app.
//   #/                    -> course selection
//   #/course/<courseId>   -> quiz configuration for a course
//   #/quiz/<courseId>     -> active quiz session
//   #/results/<courseId>  -> results summary

export function parseHash() {
  const h = window.location.hash.replace(/^#\/?/, '')
  if (!h) return { screen: 'courses' }
  const parts = h.split('/')
  if (parts[0] === 'course' && parts[1]) return { screen: 'config', courseId: parts[1] }
  if (parts[0] === 'quiz' && parts[1]) return { screen: 'quiz', courseId: parts[1] }
  if (parts[0] === 'results' && parts[1]) return { screen: 'results', courseId: parts[1] }
  return { screen: 'courses' }
}

export function navigate(route) {
  const segment = route.screen === 'config' ? 'course' : route.screen
  const target = route.screen === 'courses' ? '#/' : `#/${segment}/${route.courseId}`
  if (window.location.hash === target) return
  window.location.hash = target
}
