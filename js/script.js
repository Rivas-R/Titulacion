document.getElementById("formularioSubir").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const archivoInput = document.getElementById("archivo");
    const mensaje = document.getElementById("mensaje");

    // Verifica si se seleccionó un archivo
    if (archivoInput.files.length === 0) {
        mensaje.textContent = "Por favor, selecciona un archivo PDF.";
        return;
    }

    const archivo = archivoInput.files[0];

    // Verifica si el archivo es un PDF
    if (archivo.type !== "application/pdf") {
        mensaje.textContent = "El archivo debe ser un PDF.";
        return;
    }

    // Verifica el tamaño del archivo (por ejemplo, máximo 5 MB)
    const maxSize = 5 * 1024 * 1024; // 5 MB en bytes
    if (archivo.size > maxSize) {
        mensaje.textContent = "El archivo no puede ser mayor a 5 MB.";
        return;
    }

    // Si todo está bien, muestra un mensaje de éxito
    mensaje.textContent = `Archivo "${archivo.name}" subido correctamente.`;
    mensaje.style.color = "green";

    // Aquí puedes agregar la lógica para enviar el archivo al servidor
    // Por ejemplo, usando Fetch API o XMLHttpRequest
});