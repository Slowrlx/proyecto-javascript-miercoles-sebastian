const students = [];
let editingIndex = null; // Índice del estudiante que se está editando

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

    if (editingIndex !== null) {
        // Estamos editando un estudiante
        students[editingIndex] = student;
        updateTable();
        editingIndex = null;
    } else {
        // Estamos agregando un nuevo estudiante
        students.push(student);
        addStudentToTable(student);
    }

    calcularPromedio();
    this.reset();
});

const tableBody = document.querySelector("#studentTable tbody");

function addStudentToTable(student) {
    const index = students.indexOf(student);

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade}</td>
        <td> 
            <button class="delete">Eliminar</button>
            <button class="modify">Editar</button>
        </td>
    `;
    row.querySelector(".delete").addEventListener("click", function () {
        deleteEstudiante(student, row);
    });

    row.querySelector(".modify").addEventListener("click", function () {
        startEditing(student, index);
    });

    tableBody.appendChild(row);
}

function deleteEstudiante(student, row) {
    const index = students.indexOf(student);
    if (index > -1) {
        students.splice(index, 1);
        row.remove();
        calcularPromedio();
    }
}

function startEditing(student, index) {
    document.getElementById("name").value = student.name;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("grade").value = student.grade;
    editingIndex = index;
}

function updateTable() {
    // Limpiar tabla y volver a agregar todos los estudiantes
    tableBody.innerHTML = "";
    students.forEach(student => addStudentToTable(student));
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