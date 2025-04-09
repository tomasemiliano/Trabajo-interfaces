function toggleForm() {
    const form = document.getElementById("materiaForm");
    form.style.display = form.style.display === "none" || form.style.display === "" ? "block" : "none";
}

function toggleCamposEstado() {
    const estado = document.getElementById("estado").value;
    document.getElementById("regularizacionGroup").classList.add("hidden");
    document.getElementById("notaGroup").classList.add("hidden");

    if (estado === "regular") {
        document.getElementById("regularizacionGroup").classList.remove("hidden");
    } else if (estado === "final") {
        document.getElementById("notaGroup").classList.remove("hidden");
    }
}

function agregarMateria() {
    const materia = document.getElementById("materia").value;
    const estado = document.getElementById("estado").value;
    const fecha = document.getElementById("fecha").value;
    const nota = document.getElementById("nota").value;

    if (!materia || !estado) {
        alert("Completá materia y estado.");
        return;
    }

    let materiasGuardadas = JSON.parse(localStorage.getItem("materias")) || [];
    if (!materiasGuardadas.includes(materia)) {
        materiasGuardadas.push(materia);
        localStorage.setItem("materias", JSON.stringify(materiasGuardadas));
    } //FUNCION PROXIMA AGREGAR LAS MATERIAS QUE ELIJA EL USUARIO

    let detalle = "";
    const div = document.createElement("div");
    div.className = "materia-item";

    if (estado === "regular") {
        if (!fecha) return alert("Ingresá la fecha de regularización.");
        const fechaFinal = new Date(fecha);
        fechaFinal.setFullYear(fechaFinal.getFullYear() + 2);
        detalle = `Regular (vence: ${fechaFinal.toLocaleDateString()})`;
        div.innerHTML = `<span><strong>${materia}:</strong> ${detalle}</span>
        <button class="delete-btn" onclick="eliminar(this, 'regular')">Borrar</button>`;
        document.getElementById("regularesContainer").appendChild(div);
    } else if (estado === "final") {
        if (!nota) return alert("Ingresá la nota del final.");
        detalle = `Final aprobado con nota: ${nota}`;
        div.innerHTML = `<span><strong>${materia}:</strong> ${detalle}</span>
        <button class="delete-btn" onclick="eliminar(this, 'final', ${nota})">Borrar</button>`;
        document.getElementById("finalesContainer").appendChild(div);
        notasFinales.push(parseFloat(nota));
        calcularPromedio();
    }

    // Limpiar
    document.getElementById("materia").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("nota").value = "";
    toggleCamposEstado();
}

let notasFinales = [];

function calcularPromedio() {
    const promedio = notasFinales.reduce((a, b) => a + b, 0) / notasFinales.length;
    const container = document.getElementById("promedioContainer");
    container.textContent = `Promedio de finales aprobados: ${promedio.toFixed(2)}`;
}

function eliminar(btn, tipo, nota = null) {
    const item = btn.parentElement;
    item.remove();
    if (tipo === "final" && nota !== null) {
        notasFinales = notasFinales.filter(n => n !== nota);
        calcularPromedio();
    }
}