function toggleDetails(row) {
    // Find the next sibling row (which contains the details)
    let detailsRow = row.nextElementSibling;

    // Check if it has the class "row-details"
    if (detailsRow && detailsRow.classList.contains("row-details")) {
        // Toggle visibility
        detailsRow.style.display = detailsRow.style.display === "table-row" ? "none" : "table-row";
    }
}

// Show the PDF overlay
function showPDF() {
    document.getElementById("pdfOverlay").style.display = "flex";
    console.log("Show pdf");
}

function closePDF(event) {
    let overlay = document.getElementById("pdfOverlay");
    
    // If the user clicks outside the PDF container, close the overlay
    if (event.target === overlay) {
        overlay.style.display = "none";
    }
}

// Add event listener for closing when clicking outside
document.getElementById("pdfOverlay").addEventListener("click", closePDF);
console.log("FInal aaaa");