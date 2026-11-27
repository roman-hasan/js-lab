export const initializeStudentCopy = (students) => {
     const studentsContainer = document.querySelector("#students-container");

    studentsContainer.addEventListener("click", (e) => {
    const copyButton = e.target.closest(".copy-btn");

    if (!copyButton) return;

    const studentId = Number(copyButton.dataset.id);
    const selectedStudent = students.find(
        (student) => student.id === studentId
    );
    navigator.clipboard.writeText(String(selectedStudent.id));
});
}