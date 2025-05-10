document.addEventListener('DOMContentLoaded', function() {
    const documentosItems = document.querySelectorAll('.Documento-item');
    const pdfIcon = '../../img/pdf.png';
    
    // Botones de documentos
    const btnPrimeraRevision = document.querySelector('.lista-documentos .revision-button');
    const btnSegundaRevision = document.querySelector('.lista-documentos .segunda-revision-button');
    const btnRechazar = document.querySelector('.lista-documentos .rechazar-button');
    const btnContinuarDocumentos = document.querySelector('.lista-documentos .Documento-button');
    
    // Botones de pago
    const btnPrimeraRevisionPago = document.querySelector('.lista-pago .revision-button-pago');
    const btnSegundaRevisionPago = document.querySelector('.lista-pago .segunda-revision-button-pago');
    const btnRechazarPago = document.querySelector('.lista-pago .rechazar-button-pago');
    const btnContinuarPagos = document.querySelector('.lista-pago .Documento-button');
    
    // Deshabilitar botones inicialmente
    if (btnPrimeraRevision) {
        btnPrimeraRevision.disabled = true;
        btnPrimeraRevision.style.opacity = '0.5';
    }
    if (btnSegundaRevision) {
        btnSegundaRevision.disabled = true;
        btnSegundaRevision.style.opacity = '0.5';
        btnSegundaRevision.style.display = 'none';
    }
    if (btnRechazar) {
        btnRechazar.disabled = true;
        btnRechazar.style.opacity = '0.5';
    }
    if (btnContinuarDocumentos) {
        btnContinuarDocumentos.disabled = true;
        btnContinuarDocumentos.style.opacity = '0.5';
    }
    
    // Deshabilitar botones de pago inicialmente
    if (btnPrimeraRevisionPago) {
        btnPrimeraRevisionPago.disabled = true;
        btnPrimeraRevisionPago.style.opacity = '0.5';
    }
    if (btnSegundaRevisionPago) {
        btnSegundaRevisionPago.disabled = true;
        btnSegundaRevisionPago.style.opacity = '0.5';
        btnSegundaRevisionPago.style.display = 'none';
    }
    if (btnRechazarPago) {
        btnRechazarPago.disabled = true;
        btnRechazarPago.style.opacity = '0.5';
    }
    if (btnContinuarPagos) {
        btnContinuarPagos.disabled = true;
        btnContinuarPagos.style.opacity = '0.5';
    }

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
    
    // Estado de revisión para cada documento
    const documentosEstado = new Map();
    
    // Variables para rastrear el estado de los botones continuar
    let documentosRevisados = false;
    let pagosRevisados = false;

    // Función para verificar si todos los documentos están subidos
    function verificarDocumentos() {
        const documentosRequeridos = Array.from(document.querySelectorAll('.lista-documentos .Documento-item')).filter(item => {
            const headerText = item.querySelector('.documento-header p').textContent;
            return !headerText.includes('Fotografías') && !item.querySelector('.buttons-container');
        });

        let todosSubidos = true;

        documentosRequeridos.forEach(item => {
            const contenido = item.querySelector('.documento-content');
            if (!contenido.querySelector('.pdf-preview-container')) {
                todosSubidos = false;
            }
        });

        if (btnPrimeraRevision) {
            btnPrimeraRevision.disabled = !todosSubidos;
            btnPrimeraRevision.style.opacity = todosSubidos ? '1' : '0.5';
        }
        
        if (btnRechazar && todosSubidos) {
            btnRechazar.disabled = false;
            btnRechazar.style.opacity = '1';
        }
    }

    // Función para verificar el pago
    function verificarPago() {
        const pagoItem = document.querySelector('.lista-pago .Documento-item');
        if (!pagoItem) return;

        const contenido = pagoItem.querySelector('.documento-content');
        const pagoSubido = contenido.querySelector('.pdf-preview-container') !== null;

        // Habilitar/deshabilitar botones de revisión según el estado del pago
        if (btnPrimeraRevisionPago) {
            btnPrimeraRevisionPago.disabled = !pagoSubido;
            btnPrimeraRevisionPago.style.opacity = pagoSubido ? '1' : '0.5';
        }
        
        if (btnRechazarPago) {
            btnRechazarPago.disabled = !pagoSubido;
            btnRechazarPago.style.opacity = pagoSubido ? '1' : '0.5';
        }
        
        // Si no hay pago subido, asegurarse de que el botón de segunda revisión esté oculto
        if (btnSegundaRevisionPago) {
            if (!pagoSubido) {
                btnSegundaRevisionPago.style.display = 'none';
                btnSegundaRevisionPago.disabled = true;
                btnSegundaRevisionPago.style.opacity = '0.5';
            }
        }
    }
    
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
                
                // Verificar documentos después de subir
                if (item.closest('.lista-documentos')) {
                    verificarDocumentos();
                } else if (item.closest('.lista-pago')) {
                    verificarPago();
                }
                
                // Asignar eventos
                content.querySelector('.pdf-remove').addEventListener('click', (e) => {
                    e.stopPropagation();
                    resetFileInput(item);
                    // Verificar documentos después de eliminar
                    if (item.closest('.lista-documentos')) {
                        verificarDocumentos();
                    } else if (item.closest('.lista-pago')) {
                        verificarPago();
                    }
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
        
        // Restaurar el estado inicial
        content.innerHTML = `
            <div class="upload-icon-container">
                <img src="../../img/subir.png" alt="Subir archivo" class="upload-icon">
            </div>
            <input type="file" class="file-input" accept=".pdf">
        `;
        
        // Volver a configurar los eventos para este item
        setupDocumentItem(item);
    }

    // Evento para el botón de primera revisión
    btnPrimeraRevision.addEventListener('click', function() {
        const headers = document.querySelectorAll('.lista-documentos .documento-header');
        
        // Ocultar todos los botones de eliminar
        const botonesEliminar = document.querySelectorAll('.pdf-remove');
        botonesEliminar.forEach(boton => {
            boton.style.display = 'none';
        });

        headers.forEach(header => {
            if (!header.querySelector('p').textContent.includes('Fotografías')) {
                const revisionIcon = header.querySelector('.revision-icon');
                if (revisionIcon) {
                    revisionIcon.src = '../../img/aceptado.png';
                    header.classList.add('show-revision');
                    documentosEstado.set(header, 'aceptado');
                }
            }
        });
        
        // Mostrar el botón de segunda revisión
        btnSegundaRevision.style.display = 'block';
        btnSegundaRevision.disabled = false;
        btnSegundaRevision.style.opacity = '1';
        
        // Deshabilitar temporalmente este botón
        this.disabled = true;
        this.style.opacity = '0.5';
    });

    // Evento para el botón de segunda revisión
    btnSegundaRevision.addEventListener('click', function() {
        const headers = document.querySelectorAll('.lista-documentos .documento-header');
        headers.forEach(header => {
            if (!header.querySelector('p').textContent.includes('Fotografías') && 
                documentosEstado.get(header) === 'aceptado') {
                const revisionIcon = header.querySelector('.revision-icon');
                if (revisionIcon) {
                    revisionIcon.src = '../../img/segunda_r.png';
                    documentosEstado.set(header, 'segunda_revision');
                }
            }
        });
        
        // Habilitar el botón continuar
        btnContinuarDocumentos.disabled = false;
        btnContinuarDocumentos.style.opacity = '1';
        
        // Deshabilitar este botón
        this.disabled = true;
        this.style.opacity = '0.5';
    });

    // Evento para el botón de rechazar documentos
    if (btnRechazar) {
        btnRechazar.addEventListener('click', function() {
            const headers = document.querySelectorAll('.lista-documentos .documento-header');
            
            // Mostrar todos los botones de eliminar nuevamente
            const botonesEliminar = document.querySelectorAll('.lista-documentos .pdf-remove');
            botonesEliminar.forEach(boton => {
                boton.style.display = 'block';
            });

            headers.forEach(header => {
                if (!header.querySelector('p').textContent.includes('Fotografías')) {
                    const revisionIcon = header.querySelector('.revision-icon');
                    if (revisionIcon) {
                        revisionIcon.src = '../../img/rechazado.png';
                        header.classList.add('show-revision');
                        documentosEstado.set(header, 'rechazado');
                    }
                }
            });
            
            // Habilitar el botón de primera revisión para permitir cambiar la decisión
            btnPrimeraRevision.disabled = false;
            btnPrimeraRevision.style.opacity = '1';
            
            // Ocultar el botón de segunda revisión
            btnSegundaRevision.style.display = 'none';
            btnSegundaRevision.disabled = true;
            
            // Deshabilitar el botón continuar
            btnContinuarDocumentos.disabled = true;
            btnContinuarDocumentos.style.opacity = '0.5';
            
            // NO deshabilitar este botón, permitir múltiples rechazos
            this.style.opacity = '1';
            
            // Resetear el estado de documentos revisados
            documentosRevisados = false;
            verificarProgreso();
        });
    }

    // Evento para el botón de primera revisión de pago
    if (btnPrimeraRevisionPago) {
        btnPrimeraRevisionPago.addEventListener('click', function() {
            const header = document.querySelector('.lista-pago .documento-header');
            const revisionIcon = header.querySelector('.revision-icon');
            
            // Ocultar el botón de eliminar del pago
            const botonEliminar = document.querySelector('.lista-pago .pdf-remove');
            if (botonEliminar) {
                botonEliminar.style.display = 'none';
            }

            if (revisionIcon) {
                revisionIcon.src = '../../img/aceptado.png';
                header.classList.add('show-revision');
                documentosEstado.set(header, 'aceptado');
            }
            
            // Mostrar el botón de segunda revisión
            if (btnSegundaRevisionPago) {
                btnSegundaRevisionPago.style.display = 'block';
                btnSegundaRevisionPago.disabled = false;
                btnSegundaRevisionPago.style.opacity = '1';
            }
            
            // Deshabilitar temporalmente este botón
            this.disabled = true;
            this.style.opacity = '0.5';
        });
    }

    // Evento para el botón de segunda revisión de pago
    if (btnSegundaRevisionPago) {
        btnSegundaRevisionPago.addEventListener('click', function() {
            const header = document.querySelector('.lista-pago .documento-header');
            if (documentosEstado.get(header) === 'aceptado') {
                const revisionIcon = header.querySelector('.revision-icon');
                if (revisionIcon) {
                    revisionIcon.src = '../../img/segunda_r.png';
                    documentosEstado.set(header, 'segunda_revision');
                }
            }
            
            // Habilitar el botón continuar
            if (btnContinuarPagos) {
                btnContinuarPagos.disabled = false;
                btnContinuarPagos.style.opacity = '1';
            }
            
            // Deshabilitar este botón
            this.disabled = true;
            this.style.opacity = '0.5';
        });
    }

    // Evento para el botón de rechazar pago
    if (btnRechazarPago) {
        btnRechazarPago.addEventListener('click', function() {
            const header = document.querySelector('.lista-pago .documento-header');
            const revisionIcon = header.querySelector('.revision-icon');
            
            // Mostrar el botón de eliminar del pago
            const botonEliminar = document.querySelector('.lista-pago .pdf-remove');
            if (botonEliminar) {
                botonEliminar.style.display = 'block';
            }

            if (revisionIcon) {
                revisionIcon.src = '../../img/rechazado.png';
                header.classList.add('show-revision');
                documentosEstado.set(header, 'rechazado');
            }
            
            // Habilitar el botón de primera revisión para permitir cambiar la decisión
            btnPrimeraRevisionPago.disabled = false;
            btnPrimeraRevisionPago.style.opacity = '1';
            
            // Ocultar el botón de segunda revisión
            btnSegundaRevisionPago.style.display = 'none';
            btnSegundaRevisionPago.disabled = true;
            
            // Deshabilitar el botón continuar
            btnContinuarPagos.disabled = true;
            btnContinuarPagos.style.opacity = '0.5';
            
            // NO deshabilitar este botón, permitir múltiples rechazos
            this.style.opacity = '1';
            
            // Resetear el estado de pagos revisados
            pagosRevisados = false;
            verificarProgreso();
        });
    }

    // Función para verificar si se puede continuar a la siguiente sección
    function verificarProgreso() {
        const seccionConstancia = document.querySelector('.constancia-section'); // Ajusta el selector según tu HTML
        if (seccionConstancia) {
            if (documentosRevisados && pagosRevisados) {
                seccionConstancia.classList.remove('disabled');
                // Si tienes un botón o enlace específico para acceder a la siguiente sección
                const btnSiguienteSeccion = document.querySelector('.btn-siguiente-seccion');
                if (btnSiguienteSeccion) {
                    btnSiguienteSeccion.disabled = false;
                    btnSiguienteSeccion.style.opacity = '1';
                }
            } else {
                seccionConstancia.classList.add('disabled');
                // Si tienes un botón o enlace específico para acceder a la siguiente sección
                const btnSiguienteSeccion = document.querySelector('.btn-siguiente-seccion');
                if (btnSiguienteSeccion) {
                    btnSiguienteSeccion.disabled = true;
                    btnSiguienteSeccion.style.opacity = '0.5';
                }
            }
        }
    }

    // Modificar el evento del botón continuar de documentos
    if (btnContinuarDocumentos) {
        btnContinuarDocumentos.addEventListener('click', function() {
            documentosRevisados = true;
            verificarProgreso();
        });
    }

    // Modificar el evento del botón continuar de pagos
    if (btnContinuarPagos) {
        btnContinuarPagos.addEventListener('click', function() {
            pagosRevisados = true;
            verificarProgreso();
        });
    }

    // Verificar estado inicial de los documentos y pago
    verificarDocumentos();
    verificarPago();
    verificarProgreso();
});
