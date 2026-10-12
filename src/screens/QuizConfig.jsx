import { useMemo, useState } from 'react'

const LIMITS = [10, 25, 50, 'all']

export default function QuizConfig({ course, onBack, onStart }) {
  const [selectedWeeks, setSelectedWeeks] = useState(new Set())
  const [order, setOrder] = useState('sequential')
  const [limit, setLimit] = useState('all')
  const [mode, setMode] = useState('practice')

  const poolSize = useMemo(
    () =>
      course.weeks
        .filter((w) => selectedWeeks.has(w.weekNumber))
        .reduce((n, w) => n + w.questions.length, 0),
    [course, selectedWeeks]
  )

  const toggleWeek = (n) => {
    setSelectedWeeks((s) => {
      const next = new Set(s)
      if (next.has(n)) next.delete(n)
      else next.add(n)
      return next
    })
  }
  const allWeeks = selectedWeeks.size === course.weeks.length
  const toggleAll = () =>
    setSelectedWeeks(allWeeks ? new Set() : new Set(course.weeks.map((w) => w.weekNumber)))

  const weekMin = course.weeks.length ? course.weeks[0].weekNumber : 0
  const weekMax = course.weeks.length ? course.weeks[course.weeks.length - 1].weekNumber : 0
  const hasPendingWeek = course.weeks.some((w) => w.verified === false)

  const canStart = selectedWeeks.size > 0

  const start = () =>
    onStart(course, {
      weekNumbers: [...selectedWeeks].sort((a, b) => a - b),
      order,
      limit: limit === 'all' ? 'all' : Number(limit),
      mode,
    })

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="text-sm text-blue-600 dark:text-blue-400 mb-4">
        ← All courses
      </button>
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <p className="text-sm font-mono text-blue-600 dark:text-blue-400 mb-6">{course.code}</p>

      <section className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold">1. Select Weeks</h2>
          <button
            onClick={toggleAll}
            className={`text-sm px-3 py-1 rounded-lg border ${
              allWeeks
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Weeks ({weekMin}–{weekMax})
          </button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {course.weeks.map((w) => (
            <button
              key={w.weekNumber}
              onClick={() => toggleWeek(w.weekNumber)}
              title={w.verified === false ? 'Answer key pending (unverified)' : w.title}
              className={`py-2 rounded-xl border text-sm font-medium transition ${
                selectedWeeks.has(w.weekNumber)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              W{w.weekNumber}
              {w.verified === false && <span aria-hidden>⏳</span>}
            </button>
          ))}
        </div>
        {hasPendingWeek && (
          <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
            ⏳ Week 12 is unverified — its answer key is pending and its questions won't be scored.
          </p>
        )}
        <p className="mt-2 text-sm text-slate-500">
          {selectedWeeks.size} week(s) selected · {poolSize} questions in pool
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">2. Question Order</h2>
        <div className="flex gap-2">
          {['sequential', 'randomized'].map((o) => (
            <button
              key={o}
              onClick={() => setOrder(o)}
              className={`flex-1 py-2.5 rounded-xl border capitalize transition ${
                order === o
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {o === 'sequential' ? 'Sequential' : 'Randomized'}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">3. Question Pool Limit</h2>
        <div className="flex gap-2">
          {LIMITS.map((l) => (
            <button
              key={String(l)}
              onClick={() => setLimit(l)}
              className={`flex-1 py-2.5 rounded-xl border transition ${
                limit === l
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {l === 'all' ? 'All' : l}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold mb-2">4. Mode</h2>
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            {
              id: 'practice',
              name: 'Practice Mode',
              desc: 'Instant solutions, hints & free navigation',
            },
            {
              id: 'instant',
              name: 'Instant Test',
              desc: 'Immediate right/wrong feedback & live score',
            },
            {
              id: 'mock',
              name: 'Timed Mock Test',
              desc: 'Full exam timer, submit at end for results',
            },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`text-left p-4 rounded-xl border transition ${
                mode === m.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="font-semibold text-sm">{m.name}</div>
              <div className={`text-xs mt-1 ${mode === m.id ? 'text-blue-100' : 'text-slate-500'}`}>
                {m.desc}
              </div>
            </button>
          ))}
        </div>
      </section>

      <button
        onClick={start}
        disabled={!canStart}
        className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-semibold disabled:opacity-40 hover:bg-blue-700 transition"
      >
        {canStart ? 'Start Quiz →' : 'Select at least one week'}
      </button>
    </div>
  )
}
