import { flattenQuestions } from './data'

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function buildSession({ course, weekNumbers, order, limit, mode, layout }) {
  const pool = flattenQuestions(course).filter((q) => weekNumbers.includes(q.week))
  let selected = order === 'randomized' ? shuffle(pool) : pool
  if (limit && limit !== 'all') selected = selected.slice(0, Number(limit))
  return {
    mode, // 'practice' | 'instant' | 'mock'
    layout: layout === 'scroll' ? 'scroll' : 'paged',
    course,
    questions: selected,
    answers: {},
    flags: new Set(),
    graded: {}, // qid -> boolean correct (filled immediately in practice/instant)
    currentIndex: 0,
    startedAt: Date.now(),
    // mock duration: 1 minute per question, minimum 10 minutes
    durationSec: mode === 'mock' ? Math.max(600, selected.length * 60) : null,
  }
}

export function isCorrect(q, chosen) {
  if (!q.answer || q.answer.length === 0) return null // no answer key yet (unverified)
  const a = [...q.answer].sort().join('|')
  const c = [...(chosen || [])].sort().join('|')
  return a === c && c.length > 0
}

export function gradeSession(session) {
  const results = session.questions.map((q) => {
    const chosen = session.answers[q.id] || []
    const correct = isCorrect(q, chosen) // null when the answer key is pending
    return { q, chosen, correct, flagged: session.flags.has(q.id) }
  })
  const gradable = results.filter((r) => r.correct !== null)
  const score = gradable.filter((r) => r.correct).length
  const total = gradable.length
  const byWeek = {}
  for (const r of results) {
    const w = (byWeek[r.q.week] = byWeek[r.q.week] || { total: 0, correct: 0, pending: 0 })
    if (r.correct === null) w.pending++
    else {
      w.total++
      if (r.correct) w.correct++
    }
  }
  return {
    results,
    score,
    total,
    pending: results.length - gradable.length,
    accuracy: total ? Math.round((score / total) * 100) : 0,
    byWeek,
    incorrect: results.filter((r) => r.correct === false),
  }
}

export function formatTime(sec) {
  sec = Math.max(0, Math.floor(sec))
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  return h > 0
    ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    : `${m}:${String(s).padStart(2, '0')}`
}
