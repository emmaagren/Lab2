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

