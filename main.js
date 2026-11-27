import { studentData } from "./data/students.js";
import { initializeStudentCopy } from "./features/studentCopy.js";
import { initializeStudentSearch } from "./features/studentSearch.js";

const students = studentData.students

const studentsContainer = document.querySelector("#students-container");
const totalStudents = document.querySelector("#total-students");
const searchInput = document.querySelector("#searchInput");

const renderStudents = (students) => {
    totalStudents.textContent = students.length
    if(students.length === 0){
        studentsContainer.innerHTML = "<h3 class='not-found'>No students found.</h3>";
    }else{
    studentsContainer.innerHTML = students.map(({id, name, department})=> `
        <div class="student-card">
        <button class="copy-btn" data-id= "${id}">
          <img src="./assets/copy.png">
        </button>
        <span>${id}</span>
        <h3>${name}</h3>
        <p>${department}</p>
        </div>
    `).join("")
    }
}

renderStudents(students);
initializeStudentSearch(students, renderStudents, searchInput);
initializeStudentCopy(students)