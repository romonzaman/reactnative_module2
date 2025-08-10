// functions.js
// All functions are exported as named exports.
// The functions never mutate the original students array — they always return new arrays or values.

// Helper: compute average of a numeric array
const _avg = (arr) =>
  Math.round(arr.reduce((a, b) => a + b, 0) / arr.length || 0)

// 1) calculateAverage(studentId, students = [])
export function calculateAverage(studentId = null, students = []) {
  if (studentId == null) return "Please provide a studentId and try again." // default param handling
  const student = students.find((s) => s.id === studentId)
  if (!student) return `Student with ID ${studentId} not found.`
  // destructuring scores and name
  const { name, scores } = student
  const average = _avg(scores)
  return `${name}'s average score is ${average}`
}

// 2) addStudent(name = 'Unknown', scores = [0,0,0], students = [])
export function addStudent(
  name = "Unknown",
  scores = [0, 0, 0],
  students = []
) {
  if (!Array.isArray(scores) || scores.length !== 3)
    return "Please provide an array of three numeric scores."
  // compute new ID (immutable — don't change original)
  const maxId = students.length ? Math.max(...students.map((s) => s.id)) : 0
  const newId = maxId + 1
  const newStudent = { id: newId, name, scores: [...scores] } // use spread for scores
  const newStudents = [...students, newStudent] // immutable addition
  return {
    message: `${name} has been added with ID ${newId}`,
    students: newStudents,
  }
}

// 3) getTopPerformers(students = [], threshold = 80)
export function getTopPerformers(students = [], threshold = 80) {
  if (!students.length) return "No students provided." // default safety
  // compute averages with map and destructuring
  const performers = students
    .map(({ id, name, scores }) => ({ id, name, average: _avg(scores) }))
    .filter((s) => s.average >= threshold)

  if (!performers.length) return `No top performers (>= ${threshold}) found.`

  // build display text
  const header = `Top Performers (${threshold}+ average):`
  const lines = performers.map((p) => `• ${p.name} - Average: ${p.average}`)
  return [header, ...lines].join("\n")
}

// 4) getSummary(students = [])
export function getSummary(students = []) {
  if (!students.length) return "No students provided."
  const totals = students.length

  // compute all averages using map + reduce
  const averages = students.map(({ scores }) => _avg(scores))
  const overallAverage = _avg(averages)

  // find highest and lowest
  const highest = Math.max(...averages)
  const lowest = Math.min(...averages)

  // find students with those averages (could be multiple)
  const highestStudents = students
    .filter((s) => _avg(s.scores) === highest)
    .map((s) => s.name)
    .join(", ")
  const lowestStudents = students
    .filter((s) => _avg(s.scores) === lowest)
    .map((s) => s.name)
    .join(", ")

  return [
    "📊 Class Summary:",
    `Total Students: ${totals}`,
    `Overall Average: ${overallAverage}`,
    `Highest Average: ${highest} (${highestStudents})`,
    `Lowest Average: ${lowest} (${lowestStudents})`,
  ].join("\n")
}

// 5) updateScore(studentId = null, scoreIndex = null, newScore = null, students = [])
export function updateScore(
  studentId = null,
  scoreIndex = null,
  newScore = null,
  students = []
) {
  if (studentId == null || scoreIndex == null || newScore == null)
    return "Please provide studentId, scoreIndex and newScore."
  // create a new students array with the updated scores (immutable)
  const updated = students.map((student) => {
    if (student.id !== studentId) return student // unchanged
    // copy scores and replace index — keep original intact
    const newScores = [...student.scores]
    if (scoreIndex < 0 || scoreIndex >= newScores.length) return student // invalid index -> no change
    newScores[scoreIndex] = newScore
    return { ...student, scores: newScores }
  })

  const updatedStudent = updated.find((s) => s.id === studentId)
  if (!updatedStudent) return `Student with ID ${studentId} not found.`
  return {
    message: `${
      updatedStudent.name
    }'s score updated. New scores: [${updatedStudent.scores.join(", ")}]`,
    students: updated,
  }
}

// 6) printAllStudents(students = [])
export function printAllStudents(students = []) {
  if (!students.length) return "No students provided."
  console.log("📋 All Students:")
  // must use for...of loop
  for (const student of students) {
    const { id, name, scores } = student // destructuring
    console.log(`${name} (ID: ${id}) - Scores: [${scores.join(", ")}]`)
  }
  return "Printed to console." // return for testing convenience
}

// 7) getAllAverages(students = [])
export function getAllAverages(students = []) {
  if (!students.length) return []
  return students.map(({ name, scores }) => ({ name, average: _avg(scores) }))
}
