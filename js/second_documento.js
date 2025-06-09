document.addEventListener('DOMContentLoaded', function() {
  // 初始化所有文档项
  document.querySelectorAll('.documento-item').forEach(item => {
    const abrirIcon = item.querySelector('.icon.abrir');
    const uploadArea = item.querySelector('.upload-area');
    
    abrirIcon.addEventListener('click', function() {
      // 如果区域未初始化，先创建内容
      if (!uploadArea.hasAttribute('data-initialized')) {
        initUploadArea(item);
        uploadArea.setAttribute('data-initialized', 'true');
      }
      
      // 切换展开状态
      this.classList.toggle('active');
      uploadArea.classList.toggle('active');
    });
  });

  // 初始化上传区域
  function initUploadArea(item) {
    const docType = item.getAttribute('data-doc-type');
    const uploadArea = item.querySelector('.upload-area');
    
    uploadArea.innerHTML = `
      <div class="upload-form" data-doc-type="${docType}">
        <div class="upload-controls drop-zone">
          <input type="file" id="${docType}-upload" accept=".pdf" class="file-input">
        </div>
        <div class="uploaded-display" style="display:none;">
          <span class="file-name"></span>
        </div>
      </div>
    `;
    
  }
});