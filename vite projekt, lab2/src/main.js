"use strict"

//Lägger till variabler.
let courses = [];
let filteredCourses = [];
let currentSort = "";
let sortAscending = true;

//Hämta JSON
async function fetchCourses() {
  try {
    const response = await fetch("https://webbutveckling.miun.se/files/ramschema.json");

    if (!response.ok) {
      throw new Error("Fel vid hämtning av data");
    }

    courses = await response.json();
    filteredCourses = courses;
    renderTable(filteredCourses);

  } catch (error) {
    console.error("Något gick fel:", error);
  }
}

//Skriv ut tabell
function renderTable(data) {
  const tableBody = document.getElementById("courseTable");
  tableBody.innerHTML = "";

  data.forEach(course => {
    const row = document.createElement("tr");

     row.innerHTML = `
     <td>${course.code}</td>
     <td>${course.coursename}</td>
     <td>${course.progression}</td>
     `;

     tableBody.appendChild(row);
  });
}

//Sortering
function sortCourses(property) {

  if (currentSort === property) {
    sortAscending = !sortAscending;
  } else {
    sortAscending = true;
  }

  currentSort = property;

  filteredCourses.sort((a, b) => {
    if (a[property] < b[property]) return sortAscending ? -1 : 1;
    if (a[property] > b[property]) return sortAscending ? 1 : -1;
    return 0;
  });

  renderTable(filteredCourses);
}

//Filtrering
function filteredCourses(searchTerm) {
  searchTerm = searchTerm.toLowerCase();

  filteredCourses = courses.filter(course =>
    course.code.toLowerCase().includes(searchTerm) ||
    course.coursename.toLowerCase().includes(searchTerm) ||
    course.progression.toLowerCase().includes(searchTerm)
  );

  renderTable(filteredCourses);

}

//Eventlisteners
document.getElementById("sortCode").addEventListener("click", () => {
  sortCourses("code");
});

document.getElementById("sortname").addEventListener("click", () => {
  sortCourses("coursename");
});

document.getElementById("sortProgression").addEventListener("click", () => {
  sortCourses("progression");
});

document.getElementById("search").addEventListener("input", (e) => {
  filteredCourses(e.target.value);
});

//Kör när sidan laddas
fetchCourses();