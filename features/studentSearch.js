export const initializeStudentSearch = (
  students,
  renderStudents,
  searchInput,
) => {
  const suggestionsContainer = document.querySelector("#suggestions-container");

  let selectedIndex = -1;
  let filteredStudents = [];

  suggestionsContainer.addEventListener("click", (e) => {
    const suggestionItem = e.target.closest(".suggestion-item");

    if (!suggestionItem) return;

    const studentName = suggestionItem.querySelector("h4").textContent.trim();
    searchInput.value = studentName;

    filteredStudents = searchStudents(searchInput.value);
    renderStudents(filteredStudents);

    suggestionsContainer.classList.remove("active");
    selectedIndex = -1;

    searchInput.focus();
    searchInput.select();
  });

  searchInput.addEventListener("input", () => {
    selectedIndex = -1;

    if (searchInput.value === "") {
      renderStudents(students);
    }

    filteredStudents = searchStudents(searchInput.value);
    renderSuggestions(filteredStudents);
  });

  const renderSuggestions = (filteredStudents) => {
    suggestionsContainer.innerHTML = filteredStudents
      .map(
        ({ id, name, department }) => `
          <div class="suggestion-item">
            <span>${id}</span>
            <h4>${name}</h4>
            <p>${department}</p>
          </div>
        `,
      )
      .join("");

    suggestionsContainer.classList.toggle(
      "active",
      searchInput.value.trim() !== "" && filteredStudents.length > 0,
    );
  };

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      filteredStudents = searchStudents(searchInput.value);
      renderStudents(filteredStudents);
      suggestionsContainer.classList.remove("active");
      selectedIndex = -1;
    }

    if (e.key === "Escape") {
      suggestionsContainer.classList.remove("active");
      selectedIndex = -1;
    }

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (filteredStudents.length === 0) return;

      if (e.key === "ArrowDown") {
        if (selectedIndex < filteredStudents.length - 1) {
          selectedIndex++;
          searchInput.value = filteredStudents[selectedIndex].name;
        }
      } else {
        if (selectedIndex > 0) {
          selectedIndex--;
          searchInput.value = filteredStudents[selectedIndex].name;
        }
      }

      const suggestionItems = suggestionsContainer.querySelectorAll(".suggestion-item");

      suggestionItems.forEach((item) => {
        item.classList.remove("selected");
      });

      const selectedItem = suggestionItems[selectedIndex];
      selectedItem.classList.add("selected");

      selectedItem.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  });

  document.addEventListener("click", (e) => {
    if (
      !searchInput.contains(e.target) &&
      !suggestionsContainer.contains(e.target)
    ) {
      suggestionsContainer.classList.remove("active");
      selectedIndex = -1;
    }
  });

  const searchStudents = (query) => {
    const formattedQuery = query.trim().toLowerCase();
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

    return filteredStudents;
  };
};
