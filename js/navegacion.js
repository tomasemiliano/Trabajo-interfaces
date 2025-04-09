// Navegación de la sidebar
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".menu-link");
  
    links.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("data-target");
        if (target) {
          window.location.href = target;
        }
      });
    });
  });
  