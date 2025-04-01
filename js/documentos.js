document.addEventListener('DOMContentLoaded', function() {
    const documentosItems = document.querySelectorAll('.Documento-item');
    const pdfIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODQgNTEyIj48cGF0aCBmaWxsPSIjZTYwYzJjIiBkPSJNMTgxLjkgMjU2LjFjLTUtMTYtNC45LTQ2LjktMi0xNjguOUMxODIuMSA0NS44IDE4Ni45IDMyIDE5MiAzMnM5LjkgMTMuOCA5LjkgNTUuMmMwIDExOS45LTEuMSAxNTMuNi0yIDE2OC44LTcgMTUtMTMgMTUuMi0xOCAyLjF6TTEyOCA5NnYxNjBjMCAxNy43IDE0LjMgMzIgMzIgMzJoMTkyYzE3LjcgMCAzMi0xNC4zIDMyLTMydi0xNjBjMC0xNy43LTE0LjMtMzItMzItMzJoLTMydi0zMmMwLTE3LjctMTQuMy0zMi0zMi0zMmgtNjRjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjMySDE2MGMtMTcuNyAwLTMyIDE0LjMtMzIgMzJ6TTE2MCAxMjhoNjR2LTMyaC02NHYzMnptMTI4IDk2YzAgOC44LTcuMiAxNi0xNiAxNkgxMTJjLTguOCAwLTE2LTcuMi0xNi0xNnYtMzJjMC04LjggNy4yLTE2IDE2LTE2aDE2MGM4LjggMCAxNiA3LjIgMTYgMTZ2MzJ6Ii8+PC9zdmc+';
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]);
    }
    
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
    
    modal.querySelector('.pdf-modal-close').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    documentosItems.forEach(item => {
        const header = item.querySelector('.documento-header');
        const content = item.querySelector('.documento-content');
        const icon = item.querySelector('.icon');
        const fileInput = content.querySelector('.file-input');
        const uploadImg = content.querySelector('img');
        
        header.addEventListener('click', function() {
            content.classList.toggle('active');
            icon.classList.toggle('rotated');
        });
        
        // Variable para controlar si ya hay un archivo subido
        let hasUploadedFile = false;
        
        fileInput.addEventListener('change', function() {
            // Si ya hay un archivo subido, no hacer nada
            if (hasUploadedFile) return;
            
            const file = this.files[0];
            
            if (file) {
                if (file.type !== 'application/pdf') {
                    alert('Por favor, sube solo archivos PDF');
                    this.value = '';
                    return;
                }
                
                const maxSize = 2.5 * 1024 * 1024;
                if (file.size > maxSize) {
                    alert('El archivo excede el tamaño máximo de 2.5MB');
                    this.value = '';
                    return;
                }
                
                const previewHTML = `
                    <div class="pdf-preview-container" data-pdf-url="${URL.createObjectURL(file)}">
                        <img src="${pdfIcon}" class="pdf-icon" alt="PDF Icon">
                        <div class="pdf-info">
                            <span class="pdf-name">${file.name}</span>
                            <span class="pdf-size">${formatFileSize(file.size)}</span>
                        </div>
                        <div class="pdf-actions">
                            <span class="pdf-view">Ver PDF</span>
                            <span class="pdf-remove">Eliminar</span>
                        </div>
                    </div>
                `;
                
                content.innerHTML = previewHTML;
                hasUploadedFile = true;
                
                content.querySelector('.pdf-view').addEventListener('click', (e) => {
                    e.stopPropagation();
                    showPDF(URL.createObjectURL(file), file.name);
                });
                
                content.querySelector('.pdf-remove').addEventListener('click', (e) => {
                    e.stopPropagation();
                    resetFileInput(content, fileInput);
                    hasUploadedFile = false;
                });
                
                content.querySelector('.pdf-preview-container').addEventListener('click', (e) => {
                    // Solo abrir PDF si se hace clic fuera de los botones
                    if (!e.target.closest('.pdf-actions')) {
                        showPDF(URL.createObjectURL(file), file.name);
                    }
                });
            }
        });
        
        content.addEventListener('click', function(e) {
            // Solo activar si no hay archivo subido y no se hizo clic en elementos hijos
            if (!hasUploadedFile && e.target === this) {
                fileInput.click();
            }
        });
    });
    
    function showPDF(url, filename) {
        const iframe = modal.querySelector('.pdf-modal-iframe');
        modal.querySelector('.pdf-modal-title').textContent = filename;
        iframe.src = url;
        modal.style.display = 'flex';
    }
    
    function resetFileInput(container, originalInput) {
        container.innerHTML = `
            <img src="../img/subir.png" alt="">
            <input type="file" class="file-input" accept=".pdf">
        `;
        
        // Reasignar eventos al nuevo input
        const newInput = container.querySelector('.file-input');
        newInput.addEventListener('change', function() {
            originalInput.dispatchEvent(new Event('change'));
        });
    }
});