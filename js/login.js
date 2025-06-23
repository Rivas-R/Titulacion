document.querySelectorAll('.login-items li').forEach(item => {
  item.addEventListener('click', function() {
    // 如果已经是激活状态则不处理
    if (this.classList.contains('active')) return;
    
    // 更新选项卡状态
    document.querySelectorAll('.login-items li').forEach(li => {
      li.classList.remove('active');
    });
    this.classList.add('active');
    
    // 切换表单
    const formType = this.getAttribute('data-form');
    document.querySelectorAll('.login-datos').forEach(form => {
      form.classList.remove('active');
    });
    document.getElementById(`${formType}-form`).classList.add('active');
  });
});
// 切换登录/身份验证表单
document.getElementById('toggle-identificar').addEventListener('click', function(e) {
  e.preventDefault();
  
  // 隐藏所有登录相关元素
  document.querySelector('.forms-container').style.display = 'none';
  document.querySelector('.login-items').style.display = 'none';
  document.querySelector('.identificar').style.display = 'none';
  document.querySelector('.boton').style.display = 'none'; // 新增：隐藏Entrar按钮
  
  // 显示身份验证表单
  document.querySelector('.identificacion-form').style.display = 'block';
});

// 返回登录表单
document.getElementById('volver-login').addEventListener('click', function(e) {
  e.preventDefault();
  
  // 显示登录相关元素
  document.querySelector('.forms-container').style.display = 'block';
  document.querySelector('.login-items').style.display = 'flex';
  document.querySelector('.identificar').style.display = 'block';
  document.querySelector('.boton').style.display = 'block'; // 新增：显示Entrar按钮
  
  // 隐藏身份验证表单
  document.querySelector('.identificacion-form').style.display = 'none';
});

// 身份验证表单提交（保持不变）
document.getElementById('submit-identificacion').addEventListener('click', function(e) {
  e.preventDefault();
  
  // 获取表单数据
  const nombre = document.querySelector('.identificacion-form input[type="text"]:nth-of-type(1)').value;
  const curp = document.querySelector('.identificacion-form input[type="text"]:nth-of-type(2)').value;
  const archivo = document.querySelector('.identificacion-form input[type="file"]').files[0];
  
  // 简单验证
  if (!nombre || !curp || !archivo) {
    alert('Por favor complete todos los campos');
    return;
  }
  
  // 验证PDF文件
  if (archivo.type !== 'application/pdf') {
    alert('Solo se permiten archivos PDF');
    return;
  }
  
  // 验证文件大小 (2.5MB)
  if (archivo.size > 2621440) {
    alert('El archivo excede el tamaño máximo de 2.5MB');
    return;
  }
  
  // 这里添加实际提交逻辑
  console.log('Enviando datos:', { nombre, curp, archivo });
  alert('Solicitud enviada. Nos pondremos en contacto con usted.');
});