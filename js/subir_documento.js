document.addEventListener('DOMContentLoaded', function() {
  // 存储已上传文件状态 {类型: 是否上传}
  const uploadedFiles = {
    curp: false,
    acta: false // 出生证明文件状态
    // 可添加其他必传文件类型
  };

  // 初始化所有文档项
  document.querySelectorAll('.documento-item').forEach(item => {
    const abrirIcon = item.querySelector('.icon.abrir'); // 展开图标
    const uploadArea = item.querySelector('.upload-area'); // 上传区域
    
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
    const docType = item.getAttribute('data-doc-type'); // 获取文件类型
    const uploadArea = item.querySelector('.upload-area');
    const isRequired = item.classList.contains('required'); // 是否必传
    
    // 上传区域HTML结构
    uploadArea.innerHTML = `
      <div class="upload-form" data-doc-type="${docType}">
        <div class="upload-controls drop-zone">
          <input type="file" id="${docType}-upload" accept=".pdf" class="file-input">
          <label for="${docType}-upload" class="upload-label">
            <span class="file-info">Seleciona un archivo PDF (Maximo 2.5MB)</span>
            ${isRequired ? '<span class="required-marker">* obligatorio</span>' : ''}
          </label>
          <div class="file-validation"></div> <!-- 验证信息显示 -->
        </div>
        <div class="uploaded-display" style="display:none;">
          <span class="file-name"></span> <!-- 文件名显示 -->
          <span class="remove-file">× Borrar</span> <!-- 删除按钮 -->
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

    // 处理文件上传
    function handleFiles(file) {
      // 验证PDF格式
      if (file.type !== 'application/pdf') {
        validationMsg.textContent = 'Error：Solo se permiten archivos PDF';
        return false;
      }
      
      // 验证文件大小 (2.5MB)
      if (file.size > 2621440) {
        validationMsg.textContent = 'Error：El archivo excede el tamaño máximo de 2.5MB';
        return false;
      }
      
      // 验证通过
      validationMsg.textContent = '';
      
      // 更新UI
      uploadControls.classList.add('hidden');
      fileNameDisplay.textContent = file.name;
      uploadedDisplay.style.display = 'flex';
      
      // 标记为已上传
      uploadedFiles[docType] = true;
      updateContinueButton();
      
      // 实际文件上传逻辑
      uploadFile(file, uploadArea);
      
      return true;
    }

    // 处理文件删除
    function handleFileRemove() {
      fileInput.value = '';
      uploadControls.classList.remove('hidden');
      uploadedDisplay.style.display = 'none';
      validationMsg.textContent = '';
      
      // 标记为未上传
      uploadedFiles[docType] = false;
      updateContinueButton();
    }

    // 文件选择事件
    fileInput.addEventListener('change', function(e) {
      if (this.files.length > 0) {
        handleFiles(this.files[0]);
        this.value = ''; // 重置input
      }
    });
    
    // 删除文件按钮
    removeBtn.addEventListener('click', handleFileRemove);
  }
  
  // 更新继续按钮状态
  function updateContinueButton() {
    const continueBtn = document.querySelector('.continuar-button');
    const errorDiv = document.querySelector('.validation-error');
    
    // 检查所有必传文档是否已上传
    const missingFiles = Object.entries(uploadedFiles)
      .filter(([key, uploaded]) => {
        const item = document.querySelector(`[data-doc-type="${key}"].required`);
        return item && !uploaded; // 找出未上传的必传文件
      })
      .map(([key, _]) => {
        const item = document.querySelector(`[data-doc-type="${key}"].required`);
        return item.querySelector('.text').textContent; // 获取文件名称
      });
    
    // 更新按钮状态和错误提示
    if (missingFiles.length > 0) {
      continueBtn.disabled = true;
      errorDiv.style.display = 'block';
      errorDiv.textContent = `Este documento es obligatorio: ${missingFiles.join('、')}`;
    } else {
      continueBtn.disabled = false;
      errorDiv.style.display = 'none';
    }
  }

  // 继续按钮点击事件
  document.querySelector('.continuar-button').addEventListener('click', function(e) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    
    // 所有必传文件已上传，跳转到下一页
    window.location.href = '../estudiante/s_revicion.html';
  });

  // 初始化按钮状态
  updateContinueButton();
});

