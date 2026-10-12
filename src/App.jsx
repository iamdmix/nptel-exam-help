import { useEffect, useState } from 'react'
import { loadCourses } from './lib/data'
import { buildSession, gradeSession } from './lib/quiz'
import CourseSelect from './screens/CourseSelect'
import QuizConfig from './screens/QuizConfig'
import Quiz from './screens/Quiz'
import Results from './screens/Results'

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const [courses, setCourses] = useState(null)
  const [error, setError] = useState(null)
  const [view, setView] = useState({ screen: 'courses' })
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

  const startQuiz = (course, cfg) => {
    setSession(buildSession({ course, ...cfg }))
    setView({ screen: 'quiz' })
  }

  const finishQuiz = () => {
    setSession((s) => {
      const report = { ...gradeSession(s), elapsedSec: Math.floor((Date.now() - s.startedAt) / 1000) }
      setView({ screen: 'results' })
      return { ...s, report }
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      <header className="sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
          <button
            className="flex items-center gap-2 font-bold text-lg"
            onClick={() => {
              setSession(null)
              setView({ screen: 'courses' })
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
        {courses && view.screen === 'courses' && (
          <CourseSelect
            courses={courses}
            onSelect={(course) => setView({ screen: 'config', course })}
          />
        )}
        {courses && view.screen === 'config' && (
          <QuizConfig
            course={view.course}
            onBack={() => setView({ screen: 'courses' })}
            onStart={startQuiz}
          />
        )}
        {view.screen === 'quiz' && session && (
          <Quiz session={session} setSession={setSession} onFinish={finishQuiz} />
        )}
        {view.screen === 'results' && session?.report && (
          <Results
            report={session.report}
            mode={session.mode}
            onRetryWrong={() => {
              const wrong = session.report.results.filter((r) => !r.correct).map((r) => r.q)
              if (wrong.length) {
                setSession({
                  mode: 'practice',
                  course: session.course,
                  questions: wrong,
                  answers: {},
                  flags: new Set(),
                  graded: {},
                  currentIndex: 0,
                  startedAt: Date.now(),
                  durationSec: null,
                })
                setView({ screen: 'quiz' })
              }
            }}
            onHome={() => {
              setSession(null)
              setView({ screen: 'courses' })
            }}
          />
        )}
      </main>
    </div>
  )
}
