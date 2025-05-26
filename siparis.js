document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.order-form');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const name = document.querySelector('#name').value.trim();
      const phone = document.querySelector('#phone').value.trim();
      const product = document.querySelector('#product').value;
      const date = document.querySelector('#date').value;
  
      if (!name || !phone || !product || !date) {
        alert("Lütfen tüm zorunlu alanları doldurunuz.");
        return;
      }
  
      // Bilgileri localStorage ile geçici olarak sakla
      localStorage.setItem('fayscake_order', JSON.stringify({
        name, phone, product, date
      }));
  
      // Ödeme sayfasına yönlendir
      window.location.href = "odeme.html";
    });
  });
  