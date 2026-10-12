export async function loadCourses() {
  const res = await fetch(`${import.meta.env.BASE_URL}data/courses.json`)
  if (!res.ok) throw new Error('Failed to load courses data')
  return res.json()
}

export function flattenQuestions(course) {
  return course.weeks.flatMap((w) =>
    w.questions.map((q) => ({ ...q, week: w.weekNumber, weekTitle: w.title }))
  )
}
