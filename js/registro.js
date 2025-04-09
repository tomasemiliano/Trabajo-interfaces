// Esperamos la carga del DOM
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector(".form");

    // Interceptamos el formulario para validar los datos
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Limpiamos errores previos si los hay
        const inputs = form.querySelectorAll("input");
        inputs.forEach(input => {
            input.classList.remove("input-error");
            const errorDiv = document.getElementById(`error-${input.id}`);
            if (errorDiv) errorDiv.textContent = "";
        });

        // Validación de datos
        let isValid = true;
        const camposObligatorios = [
            "nombre", "apellido", "tipoDocumento", "numeroDocumento", "fecha", "telefono", "sexo",
            "identidadGenero", "situacionFamiliar", "hijos", "padre", "madre", "familiares", "calle",
            "numero", "localidad", "codigoPostal", "usuario", "email", "contraseña", "repetirContraseña"
        ];

        camposObligatorios.forEach(id => {
            const input = document.getElementById(id);
            if (!input.value.trim()) {
                mostrarError(input, "Este campo es obligatorio.");
                isValid = false;
            }
            if (input.id === "email") validarEmail(input);
        });

        const contraseñaInput = document.getElementById("contraseña");
        const repetirContraseñaInput = document.getElementById("repetirContraseña");
        const contraseña = contraseñaInput.value;
        const repetirContraseña = repetirContraseñaInput.value;

        const erroresContraseña = validarContraseñaFuerte(contraseña);
        if (erroresContraseña.length > 0) {
            mostrarError(contraseñaInput, erroresContraseña.join(" "));
            isValid = false;
        }

        if (contraseña && repetirContraseña && contraseña !== repetirContraseña) {
            mostrarError(repetirContraseñaInput, "Las contraseñas no coinciden.");
            isValid = false;
        }

        // Si todo está bien, guarda y redirige al inicio
        if (isValid) {
            const usuario = {
                nombre: document.getElementById("nombre").value.trim(),
                apellido: document.getElementById("apellido").value.trim(),
                usuario: document.getElementById("usuario").value.trim(),
                email: document.getElementById("email").value.trim(),
                contraseña: contraseña // no guardar asi
            };

            localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));
            window.location.href = "Inicio_usuario.html";
        }
    });

    // Funciones auxiliares
    function mostrarError(input, mensaje) {
        input.classList.add("input-error");
        const errorDiv = document.getElementById(`error-${input.id}`);
        if (errorDiv) errorDiv.textContent = mensaje;
    }

    function validarContraseñaFuerte(contraseña) {
        const requisitos = [
            { regex: /.{8,}/, mensaje: "Debe tener al menos 8 caracteres." },
            { regex: /[A-Z]/, mensaje: "Debe contener al menos una letra mayúscula." },
            { regex: /[a-z]/, mensaje: "Debe contener al menos una letra minúscula." },
            { regex: /[0-9]/, mensaje: "Debe contener al menos un número." },
            { regex: /[^A-Za-z0-9]/, mensaje: "Debe contener al menos un símbolo especial." }
        ];

        return requisitos
            .filter(req => !req.regex.test(contraseña))
            .map(req => req.mensaje);
    }

    function validarEmail(emailInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            mostrarError(emailInput, "El email no es válido.");
        }
    }
});
