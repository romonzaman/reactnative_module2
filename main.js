// main.js
import { students as originalStudents } from "./data.js"
import {
  calculateAverage,
  addStudent,
  getTopPerformers,
  getSummary,
  updateScore,
  printAllStudents,
  getAllAverages,
} from "./functions.js"

// 1) calculateAverage
console.log(calculateAverage(24, originalStudents))
console.log(calculateAverage(45, originalStudents))

// 2) addStudent (returns a new array)
const { message: addMsg, students: studentsAfterAdd } = addStudent(
  "Emma",
  [78, 82, 85],
  originalStudents
)
console.log(addMsg)
// show that originalStudents is unchanged
console.log(
  "Original length:",
  originalStudents.length,
  "New length:",
  studentsAfterAdd.length
)

// 3) getTopPerformers
console.log(getTopPerformers(originalStudents, 80))

// 4) getSummary
console.log(getSummary(originalStudents))

// 5) updateScore (returns new array)
const updateResult = updateScore(24, 1, 85, originalStudents) // update Lina's 2nd score (index 1)
if (typeof updateResult === "string") console.log(updateResult)
else console.log(updateResult.message)

// 6) printAllStudents
printAllStudents(originalStudents)

// 7) getAllAverages
console.log("📈 Student Averages:")
for (const { name, average } of getAllAverages(originalStudents)) {
  console.log(`${name}: ${average}`)
}
