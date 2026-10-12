import { useEffect, useMemo, useRef, useState } from 'react'
import { isCorrect, formatTime } from '../lib/quiz'

function StatusDot({ state }) {
  const colors = {
    unanswered: 'bg-slate-200 dark:bg-slate-700',
    answered: 'bg-blue-500',
    correct: 'bg-green-500',
    incorrect: 'bg-red-500',
    pending: 'bg-slate-400 dark:bg-slate-500',
  }
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[state]}`} />
}

export default function Quiz({ session, setSession, onFinish }) {
  const { questions, answers, flags, graded, currentIndex, mode } = session
  const q = questions[currentIndex]
  const chosen = answers[q.id] || []
  const gradedThis = graded[q.id] !== undefined
  const instant = mode !== 'mock'
  const bottomRef = useRef(null)

  // Track elapsed seconds in state so renders stay pure
  const timerState = useRef({})
  const [elapsedSec, setElapsedSec] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setElapsedSec((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const remainingSec = session.durationSec ? session.durationSec - elapsedSec : null

  useEffect(() => {
    if (remainingSec !== null && remainingSec <= 0 && !timerState.current.submitted) {
      timerState.current.submitted = true
      onFinish()
    }
  }, [remainingSec, onFinish])

  const answerCount = questions.filter(
    (qq) => (answers[qq.id] || []).length > 0
  ).length
  const progress = Math.round((answerCount / questions.length) * 100)

  const statusOf = useMemo(
    () => (qq) => {
      if (!qq.answer || qq.answer.length === 0) return 'pending'
      if (graded[qq.id] !== undefined) return graded[qq.id] ? 'correct' : 'incorrect'
      if ((answers[qq.id] || []).length > 0) return 'answered'
      return 'unanswered'
    },
    [answers, graded]
  )

  const setAnswers = (next) => setSession((s) => ({ ...s, answers: { ...s.answers, [q.id]: next } }))

  const pick = (opt) => {
    if (instant && gradedThis) return
    if (q.type === 'multiple_choice') {
      const next = chosen.includes(opt) ? chosen.filter((o) => o !== opt) : [...chosen, opt]
      setAnswers(next)
    } else {
      setAnswers([opt])
      if (instant) {
        const c = isCorrect(q, [opt])
        if (c !== null) setSession((s) => ({ ...s, graded: { ...s.graded, [q.id]: c } }))
      }
    }
  }

  const checkMulti = () => {
    if (!instant || gradedThis) return
    const c = isCorrect(q, chosen)
    if (c !== null) setSession((s) => ({ ...s, graded: { ...s.graded, [q.id]: c } }))
  }

  const goto = (i) => setSession((s) => ({ ...s, currentIndex: Math.max(0, Math.min(questions.length - 1, i)) }))
  const toggleFlag = () =>
    setSession((s) => {
      const f = new Set(s.flags)
      if (f.has(q.id)) f.delete(q.id)
      else f.add(q.id)
      return { ...s, flags: f }
    })

  const correctOptions = q.answer || []
  const showExplanation = instant && gradedThis
  const selectedButUngraded = instant && q.type === 'multiple_choice' && chosen.length > 0 && !gradedThis

  return (
    <div className="max-w-3xl mx-auto">
      {/* Timer & progress bar */}
      <div className="flex items-center justify-between gap-4 mb-2 text-sm">
        <span className="font-medium">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <span className="text-slate-500">{progress}% completed</span>
        <span
          className={`font-mono font-medium ${
            remainingSec !== null && remainingSec < 60 ? 'text-red-500' : ''
          }`}
        >
          {remainingSec !== null ? `⏳ ${formatTime(remainingSec)} left` : `⏱ ${formatTime(elapsedSec)}`}
        </span>
      </div>
      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 mb-6 overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-1">
          <span className="text-xs font-mono text-slate-500">{q.weekTitle}</span>
          <button
            onClick={toggleFlag}
            className={`shrink-0 text-sm px-3 py-1 rounded-lg border transition ${
              flags.has(q.id)
                ? 'bg-amber-400 text-white border-amber-400'
                : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            aria-label="Flag question"
          >
            {flags.has(q.id) ? '🚩 Flagged' : '⚑ Flag'}
          </button>
        </div>
        <h2 className="font-semibold text-lg leading-relaxed mb-4">{q.question}</h2>

        {q.context && (
          <details className="mb-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
            <summary className="cursor-pointer select-none px-4 py-2.5 text-sm font-semibold">
              📄 Read the passage
            </summary>
            <div className="px-4 pb-4 text-sm whitespace-pre-line leading-relaxed text-slate-700 dark:text-slate-300">
              {q.context}
            </div>
          </details>
        )}

        {q.answer && q.answer.length === 0 ? (
          <div className="rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-4 text-sm text-amber-800 dark:text-amber-300">
            ⏳ <span className="font-semibold">Answer key pending.</span> This question is from an
            unverified week — options and the accepted answer will be added once the official
            solutions are released.
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-500 mb-3">
              {q.type === 'multiple_choice' ? 'Select all that apply' : 'Select one answer'}
            </p>
            <div className="space-y-2">
          {q.options.map((opt) => {
            const isPicked = chosen.includes(opt)
            const isCorrectOpt = correctOptions.includes(opt)
            let cls =
              'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            if (showExplanation && isCorrectOpt)
              cls = 'border-green-500 bg-green-50 dark:bg-green-950/40 text-green-800 dark:text-green-300'
            else if (showExplanation && isPicked)
              cls = 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300'
            else if (isPicked) cls = 'border-blue-500 bg-blue-50 dark:bg-blue-950/40'
            return (
              <button
                key={opt}
                onClick={() => pick(opt)}
                disabled={showExplanation}
                className={`w-full text-left px-4 py-3 rounded-xl border transition ${cls}`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                      q.type === 'multiple_choice' ? 'rounded-md' : ''
                    } ${
                      isPicked
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-slate-400 dark:border-slate-500'
                    }`}
                  >
                    {isPicked ? '✓' : ''}
                  </span>
                  {opt}
                  {showExplanation && isCorrectOpt && <span className="ml-auto">✅</span>}
                  {showExplanation && isPicked && !isCorrectOpt && <span className="ml-auto">❌</span>}
                </span>
              </button>
            )
          })}
            </div>
          </>
        )}

        {selectedButUngraded && (
          <button
            onClick={checkMulti}
            className="mt-4 w-full py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700"
          >
            Check Answer
          </button>
        )}

        {showExplanation && (
          <div className="mt-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/40 p-4 text-sm">
            <div className="font-semibold mb-1">
              {graded[q.id] ? '✅ Correct!' : '❌ Incorrect — correct answer: ' + correctOptions.join(', ')}
            </div>
            <p className="text-slate-700 dark:text-slate-300">{q.explanation}</p>
          </div>
        )}
      </div>

      {/* Prev / Next */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => goto(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          ← Prev
        </button>
        {currentIndex === questions.length - 1 ? (
          <button
            onClick={onFinish}
            className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700"
          >
            {mode === 'mock' ? 'Submit Test' : 'Finish & Results →'}
          </button>
        ) : (
          <button
            onClick={() => goto(currentIndex + 1)}
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            Next →
          </button>
        )}
      </div>

      {/* Question navigation grid */}
      <div className="mt-8" ref={bottomRef}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold">Question Navigator</h3>
          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
            <span><StatusDot state="unanswered" /> Unanswered</span>
            <span><StatusDot state="answered" /> Answered</span>
            <span><StatusDot state="pending" /> Key pending</span>
            {instant && (
              <>
                <span><StatusDot state="correct" /> Correct</span>
                <span><StatusDot state="incorrect" /> Incorrect</span>
              </>
            )}
            <span>🚩 Flagged</span>
          </div>
        </div>
        <div className="grid grid-cols-8 sm:grid-cols-12 gap-1.5">
          {questions.map((qq, i) => {
            const st = statusOf(qq)
            return (
              <button
                key={qq.id}
                onClick={() => goto(i)}
                title={`Q${i + 1}`}
                className={`relative py-2 rounded-lg text-xs font-medium border transition ${
                  i === currentIndex
                    ? 'ring-2 ring-blue-500 border-blue-500'
                    : 'border-slate-200 dark:border-slate-800'
                } ${
                  st === 'correct'
                    ? 'bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300'
                    : st === 'incorrect'
                      ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300'
                      : st === 'answered'
                        ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                        : 'bg-white dark:bg-slate-900'
                }`}
              >
                {i + 1}
                {flags.has(qq.id) && (
                  <span className="absolute top-0.5 right-0.5 text-[8px]">🚩</span>
                )}
              </button>
            )
          })}
        </div>
        {mode !== 'mock' && (
          <p className="mt-3 text-xs text-slate-500">
            Live score: {questions.filter((qq) => graded[qq.id]).length} correct /{' '}
            {questions.filter((qq) => graded[qq.id] !== undefined).length} evaluated
          </p>
        )}
      </div>
    </div>
  )
}
