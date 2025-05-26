document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.payment-form');
    const summary = document.getElementById('order-summary');
  
    const orderData = JSON.parse(localStorage.getItem('fayscake_order'));
    if (orderData) {
      summary.innerHTML = `📦 <strong>${orderData.product}</strong> ürünü için <strong>${orderData.name}</strong> adına <strong>${orderData.date}</strong> tarihinde teslim edilecek.`;
    }
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert("Ödemeniz başarıyla alındı! Teşekkür ederiz. 🎉");
      localStorage.removeItem('fayscake_order');
      window.location.href = "index.html";
    });
  });
  