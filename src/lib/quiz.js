export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function buildSession({ course, weekNumbers, order, limit, mode }) {
  const pool = flattenQuestions(course).filter((q) => weekNumbers.includes(q.week))
  let selected = order === 'randomized' ? shuffle(pool) : pool
  if (limit && limit !== 'all') selected = selected.slice(0, Number(limit))
  return {
    mode, // 'practice' | 'instant' | 'mock'
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
  const a = [...(q.answer || [])].sort().join('|')
  const c = [...(chosen || [])].sort().join('|')
  return a === c && c.length > 0
}

export function gradeSession(session) {
  const results = session.questions.map((q) => {
    const chosen = session.answers[q.id] || []
    const correct = isCorrect(q, chosen)
    return { q, chosen, correct, flagged: session.flags.has(q.id) }
  })
  const score = results.filter((r) => r.correct).length
  const byWeek = {}
  for (const r of results) {
    byWeek[r.q.week] = byWeek[r.q.week] || { total: 0, correct: 0 }
    byWeek[r.q.week].total++
    if (r.correct) byWeek[r.q.week].correct++
  }
  return {
    results,
    score,
    total: results.length,
    accuracy: results.length ? Math.round((score / results.length) * 100) : 0,
    byWeek,
    incorrect: results.filter((r) => !r.correct),
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
