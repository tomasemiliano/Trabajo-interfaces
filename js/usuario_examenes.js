document.addEventListener("DOMContentLoaded", () => {
  const materiaSelect = document.getElementById("materia");
  const campos = document.getElementById("campos-adicionales");
  const formExamen = document.getElementById("form-examen");
  const notaLabel = document.getElementById("notaLabel");
  const notaInput = document.getElementById("nota");

  materiaSelect.addEventListener("change", () => {
    campos.style.display = materiaSelect.value ? "block" : "none";
  });

  const estadoSelect = document.getElementById("estado");
  estadoSelect.addEventListener("change", () => {
    if (estadoSelect.value === "hecho") {
      notaLabel.style.display = "block";
      notaInput.style.display = "block";
    } else {
      notaLabel.style.display = "none";
      notaInput.style.display = "none";
    }
  });

  formExamen.addEventListener("submit", (e) => {
    e.preventDefault();
    const materia = materiaSelect.value;
    const estado = estadoSelect.value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const temas = document.getElementById("temas").value;
    const nota = notaInput.value;

    let texto = `${fecha} ${hora} - ${temas}`;
    if (estado === "hecho" && nota) {
      texto += ` (Nota: ${nota})`;
    }

    const estadoClase = `estado ${estado}`;
    const nuevoItem = document.createElement("li");
    nuevoItem.innerHTML = `<span class="${estadoClase}">${texto}</span> <button class="btn-subir">Subir nota</button>`;

    const contenedor = document.getElementById(materia);
    const lista = contenedor.querySelector(".exam-list");
    lista.appendChild(nuevoItem);

    formExamen.reset();
    campos.style.display = "none";
    notaLabel.style.display = "none";
    notaInput.style.display = "none";
  });
});

