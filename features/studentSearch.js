export const initializeStudentSearch = (
  students,
  renderStudents,
  searchInput,
) => {
  
searchInput.addEventListener("input", (e) => {
  if (searchInput.value === "") {
    renderStudents(students);
  }
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchStudents(searchInput.value);
  }
});

const searchStudents = (query) => {
  const formattedQuery = query.toLowerCase();
  const numericQuery = Number(query);

  let filteredStudents;

  if (!Number.isNaN(numericQuery) && query.trim() !== "") {
    filteredStudents = students.filter(({ id }) => id === numericQuery);
  } else {
    filteredStudents = students.filter(
      ({ name, department }) =>
        name.toLowerCase().includes(formattedQuery) ||
        department.toLowerCase().includes(formattedQuery),
    );
  }

  renderStudents(filteredStudents);
};

};


