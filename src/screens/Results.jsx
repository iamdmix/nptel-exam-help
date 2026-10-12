import { formatTime } from '../lib/quiz'

export default function Results({ report, mode, onRetryWrong, onHome }) {
  const { score, total, accuracy, byWeek, incorrect } = report
  const elapsedSec = report.elapsedSec ?? 0
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Results Summary</h1>
      <p className="text-slate-500 mb-6 capitalize">{mode.replace('_', ' ')} completed</p>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {score}/{total}
          </div>
          <div className="text-xs text-slate-500 mt-1">Total Score</div>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center">
          <div
            className={`text-3xl font-bold ${
              accuracy >= 70 ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'
            }`}
          >
            {accuracy}%
          </div>
          <div className="text-xs text-slate-500 mt-1">Accuracy</div>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center">
          <div className="text-3xl font-bold">{formatTime(elapsedSec)}</div>
          <div className="text-xs text-slate-500 mt-1">Time Taken</div>
        </div>
      </div>

      <h2 className="font-semibold mb-3">Week-by-Week Performance</h2>
      {report.pending > 0 && (
        <p className="mb-3 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-3 text-sm text-amber-800 dark:text-amber-300">
          ⏳ {report.pending} question(s) from unverified weeks were excluded from scoring (answer
          key pending).
        </p>
      )}
      <div className="space-y-2 mb-8">
        {Object.entries(byWeek)
          .sort((a, b) => a[0] - b[0])
          .map(([week, s]) => {
            const pct = Math.round((s.correct / s.total) * 100)
            return (
              <div key={week} className="flex items-center gap-3">
                <span className="w-14 text-sm text-slate-500">Wk {week}</span>
                <div className="flex-1 h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full ${pct >= 70 ? 'bg-green-500' : pct >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-12 text-sm text-right font-mono">
                  {s.correct}/{s.total}
                </span>
              </div>
            )
          })}
      </div>

      {incorrect.length > 0 && (
        <>
          <h2 className="font-semibold mb-3">
            Review Incorrect Answers ({incorrect.length})
          </h2>
          <div className="space-y-3 mb-8">
            {incorrect.map(({ q, chosen }) => (
              <div
                key={q.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-sm"
              >
                <div className="text-xs font-mono text-slate-500 mb-1">{q.weekTitle}</div>
                <div className="font-medium mb-2">{q.question}</div>
                <div className="text-red-600 dark:text-red-400">
                  Your answer: {chosen.length ? chosen.join(', ') : '— (unanswered)'}
                </div>
                <div className="text-green-600 dark:text-green-400">
                  Correct: {(q.answer || []).join(', ')}
                </div>
                <div className="mt-1 text-slate-600 dark:text-slate-400">{q.explanation}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        {incorrect.length > 0 && (
          <button
            onClick={onRetryWrong}
            className="flex-1 py-3 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600"
          >
            🔄 Re-attempt {incorrect.length} Incorrect
          </button>
        )}
        <button
          onClick={onHome}
          className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
        >
          ← Back to Courses
        </button>
      </div>
    </div>
  )
}
