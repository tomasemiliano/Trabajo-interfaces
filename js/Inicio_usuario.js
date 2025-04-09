document.addEventListener('DOMContentLoaded', () => {
    const listaExamenes = document.getElementById("lista-examenes");
  
    // Recuperar usuario del localStorage
    const usuario = JSON.parse(localStorage.getItem("usuarioRegistrado"));
  
    // Muestra los examenes
    if (usuario && usuario.examenes && Array.isArray(usuario.examenes)) {
      const pendientes = usuario.examenes.filter(ex => ex.estado === "pendiente");
  
      if (pendientes.length > 0) {
        pendientes.forEach(examen => {
          const li = document.createElement("li");
          li.textContent = `${examen.materia} - ${examen.fecha}`;
          listaExamenes.appendChild(li);
        });
      } else {
        listaExamenes.innerHTML = "<li>No hay exámenes pendientes.</li>";
      }
    } else {
      listaExamenes.innerHTML = "<li>No hay exámenes cargados.</li>";
    }
  
    
    
  });
  