import { useState } from 'react'

export default function CourseSelect({ courses, onSelect }) {
  const [q, setQ] = useState('')
  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(q.toLowerCase()) ||
      c.code.toLowerCase().includes(q.toLowerCase())
  )
  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Choose a Course</h1>
      <p className="text-slate-500 mb-4">Pick a course to start practicing.</p>
      <input
        type="search"
        placeholder="Search courses by title or code…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="w-full mb-6 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />
      {filtered.length === 0 && (
        <p className="text-slate-500">No courses match “{q}”.</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c)}
            className="text-left rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-blue-500 hover:shadow-lg transition"
          >
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400">{c.code}</span>
            <h2 className="mt-1 font-semibold text-lg">{c.title}</h2>
            <p className="mt-2 text-sm text-slate-500">
              {c.weeks.length} weeks ·{' '}
              {c.weeks.reduce((n, w) => n + w.questions.length, 0)} questions
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
