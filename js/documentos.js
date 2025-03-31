document.addEventListener('DOMContentLoaded', function() {
    const documentosItems = document.querySelectorAll('.Documento-item');
    
    documentosItems.forEach(item => {
        const header = item.querySelector('.documento-header');
        const content = item.querySelector('.documento-content');
        const icon = item.querySelector('.icon');
        
        // Funcionalidad de abrir/cerrar
        header.addEventListener('click', function() {
            content.classList.toggle('active');
            icon.classList.toggle('rotated');
        });
        
        // Hacer todo el área de contenido clickeable
        if(content) {
            content.addEventListener('click', function(e) {
                // Solo activar si no se hizo click en el input directamente
                if(e.target.tagName !== 'INPUT') {
                    const fileInput = this.querySelector('.file-input');
                    fileInput.click();
                }
            });
            
            // Mostrar imagen previa si se selecciona archivo
            const fileInput = content.querySelector('.file-input');
            const imgPreview = content.querySelector('img');
            
            fileInput.addEventListener('change', function() {
                if(this.files && this.files[0]) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        imgPreview.src = e.target.result;
                    }
                    
                    reader.readAsDataURL(this.files[0]);
                }
            });
        }
    });
});