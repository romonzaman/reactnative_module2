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
