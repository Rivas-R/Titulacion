function showUploadModal(button) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <h4 style="margin-bottom: 20px; color: #333;">Subir Línea de Pago</h4>
            
            <div class="upload-area active"> <!-- 直接激活状态 -->
                <form class="upload-form" id="uploadForm">
                    <div class="form-group">
                        <input type="file" id="fileInput" accept=".pdf" required style="display: none;">
                        <label for="fileInput" class="upload-label">
                            <span id="fileName">No se ha seleccionado archivo</span>
                            <button type="button" class="upload-btn">Seleccionar</button>
                        </label>
                    </div>

                    
                    <div style="display: flex; gap: 10px; margin-top: 15px;">
                        <button type="button" class="btn btn-primary" onclick="handleUpload()">Subir</button>
                        <button type="button" class="btn btn-secondary" onclick="closeModal(this)">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // 显示选中的文件名
    document.getElementById('fileInput').addEventListener('change', function(e) {
        const fileName = e.target.files[0]?.name || 'No se ha seleccionado archivo';
        document.getElementById('fileName').textContent = fileName;
    });

    // 关闭模态框点击外部
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
}

// 处理上传逻辑（保持不变）
function handleUpload() {
    const fileInput = document.getElementById('fileInput');
    if (!fileInput.files.length) {
        alert('Por favor, selecciona un archivo.');
        return;
    }
    const file = fileInput.files[0];
    alert(`Archivo "${file.name}" listo para subir (simulado)`);
    closeModal();
}