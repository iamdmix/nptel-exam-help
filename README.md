# nptel-exam-help

A mobile-responsive NPTEL Exam Practice & Testing web app. Supports multiple courses, flexible quiz configurations (week-wise or combined, sequential or randomized), and three modes: **Practice**, **Instant Test**, and **Timed Mock Test**.

## Features

- Course selection screen with search/filter
- Quiz configuration: week selection (individual / multiple / all weeks 0–12), question order (sequential / randomized), pool limit (10 / 25 / 50 / all), mode selection
- Practice Mode: instant explanations, flag questions, free navigation
- Instant Test Mode: immediate right/wrong feedback with explanation and live score
- Timed Mock Test: countdown timer with auto-submit and end-of-test summary
- Question navigator grid with status colors (unanswered / answered / correct / incorrect / flagged)
- Results dashboard: score, accuracy, week-by-week analysis, review of incorrect answers, re-attempt incorrect questions
- Dark/Light mode toggle, fully mobile responsive

## Adding Your Questions

Edit `public/data/courses.json`. Each course holds Weeks 0–12; each week holds questions with this schema:

```json
{
  "id": "q1",
  "type": "single_choice",
  "question": "Sample Question Text?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": ["Option B"],
  "explanation": "Explanation for Option B."
}
```

- `type`: `single_choice`, `multiple_choice`, or `text`
- `answer`: array (for `multiple_choice`, list all correct options)
- `explanation`: shown after answering

To regenerate fresh placeholder data: `node scripts/generate-data.js`

## Run Locally (Docker)

```bash
docker compose up --build -d
```

Open http://localhost:8080

## Development

```bash
npm install
npm run dev      # dev server
npm run build    # production build to dist/
npm run lint
```
