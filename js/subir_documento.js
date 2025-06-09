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
          <label for="${docType}-upload" class="upload-label">
            <span class="file-info">Seleccionar archivo PDF (max 2.5MB)</span>
          </label>
        </div>
        <div class="uploaded-display" style="display:none;">
          <span class="file-name"></span>
          <span class="remove-file">× Eliminar</span>
        </div>
      </div>
    `;
    
    // 获取DOM元素
    const fileInput = uploadArea.querySelector('.file-input');
    const uploadControls = uploadArea.querySelector('.upload-controls');
    const uploadedDisplay = uploadArea.querySelector('.uploaded-display');
    const fileNameDisplay = uploadArea.querySelector('.file-name');
    const removeBtn = uploadArea.querySelector('.remove-file');
    const validationMsg = uploadArea.querySelector('.file-validation');
    const dropZone = uploadArea.querySelector('.drop-zone');

    // 处理文件选择/拖放的通用函数
    function handleFiles(file) {
      // 验证PDF格式
      if (file.type !== 'application/pdf') {
        validationMsg.textContent = 'Error: Solo se permiten archivos PDF';
        return false;
      }
      
      // 验证文件大小 (2.5MB)
      if (file.size > 2621440) {
        validationMsg.textContent = 'Error: El archivo excede 2.5MB';
        return false;
      }
      
      // 验证通过
      validationMsg.textContent = '';
      
      // 更新UI
      uploadControls.classList.add('hidden');
      fileNameDisplay.textContent = file.name;
      uploadedDisplay.style.display = 'flex';
      
      // 这里可以添加实际的文件上传逻辑
      uploadFile(file, uploadArea);
      
      return true;
    }

    // 点击选择文件
    fileInput.addEventListener('change', function(e) {
      if (this.files.length > 0) {
        handleFiles(this.files[0]);
        this.value = ''; // 重置input以便重复选择相同文件
      }
    });
    
    // 拖放功能 - 阻止默认行为
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, preventDefaults, false);
      document.body.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // 高亮拖放区域
    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
      dropZone.classList.add('highlight');
    }
    
    function unhighlight() {
      dropZone.classList.remove('highlight');
    }
    
    // 处理拖放文件
    dropZone.addEventListener('drop', function(e) {
      const dt = e.dataTransfer;
      const files = dt.files;
      
      if (files.length > 0) {
        if (handleFiles(files[0])) {
          fileInput.files = files; // 同步到文件输入
        }
      }
    });
    
    // 移除文件按钮
    removeBtn.addEventListener('click', function() {
      fileInput.value = '';
      uploadControls.classList.remove('hidden');
      uploadedDisplay.style.display = 'none';
      validationMsg.textContent = '';
    });
  }
  
  // 文件上传函数 (模拟)
  function uploadFile(file, uploadArea) {
    console.log(`Subiendo ${file.name}...`);
    // 这里替换为实际的上传逻辑
  }
});