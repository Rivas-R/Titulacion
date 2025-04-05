document.addEventListener('DOMContentLoaded', function() {
    const documentosItems = document.querySelectorAll('.Documento-item');
    const pdfIcon = '../../img/pdf.png';
    
    // Crear modal para visualizar PDF
    const modal = document.createElement('div');
    modal.className = 'pdf-modal';
    modal.innerHTML = `
        <div class="pdf-modal-content">
            <div class="pdf-modal-header">
                <span class="pdf-modal-title">Visualizador de PDF</span>
                <span class="pdf-modal-close">&times;</span>
            </div>
            <iframe class="pdf-modal-iframe"></iframe>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Cerrar modal
    modal.querySelector('.pdf-modal-close').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Función para configurar los eventos de un item
    function setupDocumentItem(item) {
        const header = item.querySelector('.documento-header');
        const content = item.querySelector('.documento-content');
        const icon = item.querySelector('.icon');
        let fileInput = content.querySelector('.file-input') || content.querySelector('input[type="file"]');
        
        // Funcionalidad de abrir/cerrar
        header.addEventListener('click', function() {
            content.classList.toggle('active');
            icon.classList.toggle('rotated');
        });
        
        // Manejar la selección de archivos
        function handleFileInputChange() {
            const file = this.files[0];
            
            if (file) {
                // Validar que sea PDF
                if (file.type !== 'application/pdf') {
                    alert('Por favor, sube solo archivos PDF');
                    this.value = '';
                    return;
                }
                
                // Validar tamaño máximo (2.5MB)
                const maxSize = 2.5 * 1024 * 1024;
                if (file.size > maxSize) {
                    alert('El archivo excede el tamaño máximo de 2.5MB');
                    this.value = '';
                    return;
                }
                
                // Crear vista previa del PDF
                const previewHTML = `
                    <div class="pdf-preview-container" data-pdf-url="${URL.createObjectURL(file)}">
                        <div class="pdf-preview-left">
                            <img src="${pdfIcon}" class="pdf-icon" alt="PDF Icon">
                        </div>
                        <div class="pdf-preview-center">
                            <span class="pdf-name">${file.name}</span>
                        </div>
                        <div class="pdf-preview-right">
                            <span class="pdf-remove">Eliminar</span>
                        </div>
                    </div>
                `;
                
                // Reemplazar contenido
                content.innerHTML = previewHTML;
                
                // Asignar eventos
                
                content.querySelector('.pdf-remove').addEventListener('click', (e) => {
                    e.stopPropagation();
                    resetFileInput(item);
                });
                
                // Hacer click en el contenedor también abre el PDF
                content.querySelector('.pdf-preview-container').addEventListener('click', (e) => {
                    if (!e.target.closest('.pdf-actions')) {
                        showPDF(URL.createObjectURL(file), file.name);
                    }
                });
            }
        }
        
        // Asignar evento change al input file
        if (fileInput) {
            fileInput.addEventListener('change', handleFileInputChange);
        }
        
        // Hacer clickeable todo el área de contenido
        content.addEventListener('click', function(e) {
            const currentFileInput = content.querySelector('.file-input') || content.querySelector('input[type="file"]');
            if (!content.querySelector('.pdf-preview-container') && e.target === this && currentFileInput) {
                currentFileInput.click();
            }
        });
    }
    
    // Inicializar todos los items
    documentosItems.forEach(item => {
        setupDocumentItem(item);
    });
    
    function showPDF(url, filename) {
        const iframe = modal.querySelector('.pdf-modal-iframe');
        modal.querySelector('.pdf-modal-title').textContent = filename;
        iframe.src = url;
        modal.style.display = 'flex';
    }
    
    function resetFileInput(item) {
        const content = item.querySelector('.documento-content');
        
        // Restaurar el estado inicial con el ícono de subir
        content.innerHTML = `
            <div class="upload-icon-container">
                <img src="../../img/subir.png" alt="Subir archivo" class="upload-icon">
            </div>
            <input type="file" class="file-input" accept=".pdf">
        `;
        
        // Volver a configurar los eventos para este item
        setupDocumentItem(item);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault(); // Evita que el enlace recargue la página
            
            // Remueve la clase 'active' de todos los elementos
            navItems.forEach(nav => nav.classList.remove("active"));

            // Agrega la clase 'active' al elemento seleccionado
            this.classList.add("active");
        });
    });
});
