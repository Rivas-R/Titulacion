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