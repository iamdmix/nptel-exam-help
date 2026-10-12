import { useCallback, useEffect, useState } from 'react'
import { loadCourses } from './lib/data'
import { buildSession, gradeSession } from './lib/quiz'
import { parseHash, navigate } from './lib/router'
import CourseSelect from './screens/CourseSelect'
import QuizConfig from './screens/QuizConfig'
import Quiz from './screens/Quiz'
import Results from './screens/Results'

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const [courses, setCourses] = useState(null)
  const [error, setError] = useState(null)
  const [route, setRoute] = useState(() => parseHash())
  const [session, setSession] = useState(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    loadCourses()
      .then((d) => setCourses(d.courses))
      .catch((e) => setError(e.message))
  }, [])

  // Keep route in sync with browser history (back/forward/swipe)
  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Guard deep links without an in-memory session (e.g. page refresh mid-quiz).
  // Always re-parse the LIVE location.hash so explicit user navigation that is
  // racing this effect isn't hijacked (e.g. results -> home).
  useEffect(() => {
    if (!courses) return
    const h = parseHash()
    if (h.screen === 'courses' || !h.courseId) return
    const course = courses.find((c) => c.id === h.courseId)
    if (!course) {
      window.location.replace('#/')
      return
    }
    if (
      (h.screen === 'quiz' && (!session || session.course.id !== h.courseId)) ||
      (h.screen === 'results' && (!session?.report || session.course.id !== h.courseId))
    ) {
      window.location.replace(`#/course/${h.courseId}`)
    }
  }, [route, courses, session])

  // Trigger the navigation to results once the report is attached to the session
  useEffect(() => {
    if (session?.justFinished && route.screen === 'quiz') {
      navigate({ screen: 'results', courseId: session.course.id })
    } else if (session?.justFinished && route.screen === 'results') {
      setSession((s) => (s?.justFinished ? { ...s, justFinished: false } : s))
    }
  }, [session, route.screen])

  const course =
    courses && route.courseId ? courses.find((c) => c.id === route.courseId) : null

  const startQuiz = useCallback((c, cfg) => {
    setSession(buildSession({ course: c, ...cfg }))
    navigate({ screen: 'quiz', courseId: c.id })
  }, [])

  const finishQuiz = useCallback(() => {
    setSession((s) => {
      if (!s || s.report) return s
      const report = {
        ...gradeSession(s),
        elapsedSec: Math.floor((Date.now() - s.startedAt) / 1000),
      }
      return { ...s, report, justFinished: true }
    })
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      <header className="sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
          <button
            className="flex items-center gap-2 font-bold text-lg"
            onClick={() => {
              navigate({ screen: 'courses' })
            }}
          >
            <span className="text-xl">📘</span> NPTEL Exam Help
          </button>
          <button
            className="rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
          >
            {dark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 pb-24">
        {error && <p className="text-red-500">Error loading data: {error}</p>}
        {!courses && !error && <p className="text-slate-500">Loading courses…</p>}
        {courses && route.screen === 'courses' && (
          <CourseSelect
            courses={courses}
            onSelect={(c) => navigate({ screen: 'config', courseId: c.id })}
          />
        )}
        {courses && route.screen === 'config' && course && (
          <QuizConfig course={course} onStart={startQuiz} />
        )}
        {route.screen === 'quiz' && session && (
          <Quiz session={session} setSession={setSession} onFinish={finishQuiz} />
        )}
        {route.screen === 'results' && session?.report && (
          <Results
            report={session.report}
            mode={session.mode}
            onRetryWrong={() => {
              const wrong = session.report.results.filter((r) => !r.correct).map((r) => r.q)
              if (wrong.length) {
                setSession({
                  mode: 'practice',
                  layout: session.layout,
                  course: session.course,
                  questions: wrong,
                  answers: {},
                  flags: new Set(),
                  graded: {},
                  currentIndex: 0,
                  startedAt: Date.now(),
                  durationSec: null,
                })
                navigate({ screen: 'quiz', courseId: session.course.id })
              }
            }}
            onHome={() => {
              navigate({ screen: 'courses' })
            }}
          />
        )}
      </main>
    </div>
  )
}
