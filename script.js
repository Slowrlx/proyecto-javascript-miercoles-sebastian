const students = [];

document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);

    let hasError = false;

    // Resetear mensajes de error
    document.getElementById("errorName").textContent = "";
    document.getElementById("errorLastName").textContent = "";
    document.getElementById("errorGrade").textContent = "";

    // Validaciones en español
    if (!name) {
        document.getElementById("errorName").textContent = "El nombre es obligatorio.";
        hasError = true;
    }

    if (!lastName) {
        document.getElementById("errorLastName").textContent = "El apellido es obligatorio.";
        hasError = true;
    }

    if (isNaN(grade) || grade < 1 || grade > 7) {
        document.getElementById("errorGrade").textContent = "La nota debe estar entre 1 y 7.";
        hasError = true;
    }

    if (hasError) return;

    const student = { name, lastName, grade };
    students.push(student);
    addStudentToTable(student);
    calcularPromedio();
    this.reset();
});

const tableBody = document.querySelector("#studentTable tbody");

function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade}</td>
    `;
    tableBody.appendChild(row);
}

function calcularPromedio() {
    const averageDiv = document.getElementById("average");

    if (students.length === 0) {
        averageDiv.textContent = "Promedio General del Curso: N/A";
        return;
    }

    const total = students.reduce((sum, student) => sum + student.grade, 0);
    const prom = total / students.length;
    averageDiv.textContent = "Promedio General del Curso: " + prom.toFixed(2);
}
