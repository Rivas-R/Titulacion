// Filas de tabla de alumnos desplegables
function toggleDetails(row) {
    // Find the next sibling row (which contains the details)
    let detailsRow = row.nextElementSibling;

    // Check if it has the class "row-details"
    if (detailsRow && detailsRow.classList.contains("row-details")) {
        // Toggle visibility
        detailsRow.style.display = detailsRow.style.display === "table-row" ? "none" : "table-row";
    }
}

// Mostrar archivo PDF
function showPDF() {
    document.getElementById("pdfOverlay").style.display = "flex";
    console.log("Show pdf");
}

// Cerrar archivo PDF
function closePDF(event) {
    let overlay = document.getElementById("pdfOverlay");
    
    // If the user clicks outside the PDF container, close the overlay
    if (event.target === overlay) {
        overlay.style.display = "none";
    }
}

// Añade evento cuando se da click afuera del archivo pdf para que se cierre
document.getElementById("pdfOverlay").addEventListener("click", closePDF);
console.log("FInal aaaa");