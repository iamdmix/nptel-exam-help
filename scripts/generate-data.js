// Helper script to generate courses.json with sample questions.
// Run: node scripts/generate-data.js
// Real course data can be pasted into public/data/courses.json later, keeping this schema.
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'data', 'courses.json')

const WEEK_TITLES = {
  0: 'Week 0 (Prerequisites)',
  1: 'Week 1',
  2: 'Week 2',
  3: 'Week 3',
  4: 'Week 4',
  5: 'Week 5',
  6: 'Week 6',
  7: 'Week 7',
  8: 'Week 8',
  9: 'Week 9',
  10: 'Week 10',
  11: 'Week 11',
  12: 'Week 12',
}

function makeQuestions(courseTitle, week) {
  return [1, 2, 3].map((n) => {
    const id = `w${week}q${n}`
    if (n === 1) {
      return {
        id,
        type: 'single_choice',
        question: `[${courseTitle} | Week ${week}] Sample single-choice question ${n}: which option is correct?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        answer: ['Option B'],
        explanation: `Option B is correct for ${courseTitle} Week ${week} sample question ${n}. Replace this sample with your real question data.`,
      }
    }
    if (n === 2) {
      return {
        id,
        type: 'multiple_choice',
        question: `[${courseTitle} | Week ${week}] Sample multiple-choice question ${n}: select all correct options.`,
        options: ['Statement I', 'Statement II', 'Statement III', 'Statement IV'],
        answer: ['Statement I', 'Statement III'],
        explanation: `Statements I and III are correct for ${courseTitle} Week ${week} sample question ${n}. Replace this sample with your real question data.`,
      }
    }
    return {
      id,
      type: 'single_choice',
      question: `[${courseTitle} | Week ${week}] Sample single-choice question ${n}: what does this sample question test?`,
      options: ['Nothing — it is placeholder data', 'Only placeholders', 'Placeholder data again', 'All of the above'],
      answer: ['All of the above'],
      explanation: `This is placeholder content for ${courseTitle} Week ${week}. Paste your real NPTEL questions into public/data/courses.json.`,
    }
  })
}

function makeCourse(id, title, code) {
  const weeks = []
  for (let w = 0; w <= 12; w++) {
    weeks.push({
      weekNumber: w,
      title: WEEK_TITLES[w],
      questions: makeQuestions(title, w),
    })
  }
  return { id, title, code, weeks }
}

const data = {
  courses: [
    makeCourse('course-1', 'Sample NPTEL Course', 'NPTEL101'),
    makeCourse('course-2', 'Sample NPTEL Course 2', 'NPTEL102'),
  ],
}

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n')
console.log(`Wrote ${OUT} with ${data.courses.length} courses`)
