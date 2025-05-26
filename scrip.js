// DOM yüklendikten sonra çalışacak kodlar
document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Testimonial slider için değişkenler
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    const totalSlides = testimonialCards.length;
    
    // Slider fonksiyonları
    function updateSlider() {
        if (testimonialSlider) {
            const slideWidth = testimonialCards[0].offsetWidth + 32; // 32 is the gap
            testimonialSlider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    // Slider butonları için event listener'lar
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Otomatik slider (5 saniyede bir)
    let sliderInterval = setInterval(nextSlide, 5000);
    
    // Mouse slider üzerine geldiğinde otomatik geçişi durdur
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', function() {
            clearInterval(sliderInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', function() {
            sliderInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Animasyonlu karakterler için rastgele hareket
    const characters = document.querySelectorAll('.character');
    
    function moveCharacter(character) {
        const maxX = window.innerWidth - 100;
        const maxY = window.innerHeight - 100;
        
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;
        
        character.style.transition = 'transform 10s ease-in-out';
        character.style.transform = `translate(${newX}px, ${newY}px)`;
    }
    
    characters.forEach(character => {
        // Başlangıçta rastgele pozisyon
        const initialX = Math.random() * (window.innerWidth - 100);
        const initialY = Math.random() * (window.innerHeight - 100);
        character.style.transform = `translate(${initialX}px, ${initialY}px)`;
        
        // Her 10-15 saniyede bir hareket et
        setInterval(() => {
            moveCharacter(character);
        }, 10000 + Math.random() * 5000);
    });
    
    // Newsletter form gönderimi
    const newsletterForm = document.querySelector('.newsletter form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Burada gerçek bir API çağrısı yapılabilir
            alert(`${email} adresiniz bültenimize kaydedildi. Teşekkürler!`);
            emailInput.value = '';
        });
    }
    
    // Sayfa kaydırma animasyonu
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Mobil menüyü kapat
                    if (menu.classList.contains('active')) {
                        menu.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Sayfa yüklendiğinde ürün görselleri için fallback
    const productImages = document.querySelectorAll('.product-image');
    
    productImages.forEach(image => {
        const bgImage = getComputedStyle(image).backgroundImage;
        
        // Eğer resim yüklenemezse veya bulunamazsa
        if (bgImage === 'none' || bgImage.includes('missing')) {
            image.style.backgroundColor = '#FFB6C1';
            
            // Placeholder ikon oluştur
            const placeholderIcon = document.createElement('div');
            placeholderIcon.textContent = '🍰';
            placeholderIcon.style.fontSize = '40px';
            placeholderIcon.style.display = 'flex';
            placeholderIcon.style.alignItems = 'center';
            placeholderIcon.style.justifyContent = 'center';
            placeholderIcon.style.height = '100%';
            
            image.appendChild(placeholderIcon);
        }
    });
    
    // Sayfanın yüklenmesini takip edip animasyon ekleyin
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // CSS animasyonlarını tarayıcı desteğine göre kontrol edin
    function supportsAnimation() {
        const el = document.createElement('div');
        return typeof el.style.animation !== 'undefined';
    }
    
    if (!supportsAnimation()) {
        document.body.classList.add('no-animation');
    }
});

// Pencere boyutu değiştiğinde responsive düzenlemeler
window.addEventListener('resize', function() {
    // Responsive menü kontrolü
    const menu = document.querySelector('.menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (window.innerWidth > 768 && menu.classList.contains('active')) {
        menu.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
    }
    
    // Slider pozisyonunu güncelle
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialSlider && testimonialCards.length > 0) {
        const currentSlide = parseInt(testimonialSlider.getAttribute('data-current') || 0);
        const slideWidth = testimonialCards[0].offsetWidth + 32; // 32 is the gap
        testimonialSlider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

    }

    // Testimonial slider kullanımı için data-current attribute ekle
if (testimonialSlider) {
    testimonialSlider.setAttribute('data-current', '0');
    
    // Slider işlemi
    function updateSlider() {
        const slideWidth = testimonialCards[0].offsetWidth + 32; // 32 is the gap
        testimonialSlider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        testimonialSlider.setAttribute('data-current', currentSlide);
    }
}

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
  
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("comment-form");
    const nameInput = document.getElementById("comment-name");
    const commentInput = document.getElementById("comment-text");
    const container = document.getElementById("comments-container");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();

        if (name && comment) {
            const commentBox = document.createElement("div");
            commentBox.className = "comment";
            commentBox.innerHTML = `<strong>${name}</strong><p>${comment}</p>`;
            container.prepend(commentBox);

            nameInput.value = "";
            commentInput.value = "";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("comment-form");
    const nameInput = document.getElementById("comment-name");
    const commentInput = document.getElementById("comment-text");
    const container = document.getElementById("comments-container");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();

        if (name && comment) {
            const commentBox = document.createElement("div");
            commentBox.className = "comment";
            commentBox.innerHTML = `<strong>${name}</strong><p>${comment}</p>`;
            container.prepend(commentBox);

            nameInput.value = "";
            commentInput.value = "";
        }
    });
});



});
// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // Comment Section Logic
    const commentForm = document.getElementById('comment-form');
    const commentNameInput = document.getElementById('comment-name');
    const commentTextInput = document.getElementById('comment-text');
    const commentsContainer = document.getElementById('comments-container');

    if (commentForm && commentsContainer) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            const name = commentNameInput.value.trim();
            const commentText = commentTextInput.value.trim();

            if (name && commentText) {
                const newCommentDiv = document.createElement('div');
                newCommentDiv.classList.add('comment');
                newCommentDiv.innerHTML = `
                    <p><strong>${name}:</strong> ${commentText}</p>
                `;
                commentsContainer.prepend(newCommentDiv); // Add new comment to the top

                // Clear form fields
                commentNameInput.value = '';
                commentTextInput.value = '';
            } else {
                alert('Lütfen adınızı ve yorumunuzu girin.'); // Alert if fields are empty
            }
        });
    }

    // Testimonials Slider Logic
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;

    const showTestimonial = (index) => {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        if (testimonialCards.length === 0) return;

        if (index >= testimonialCards.length) {
            currentIndex = 0; // Loop back to the beginning
        } else if (index < 0) {
            currentIndex = testimonialCards.length - 1; // Loop to the end
        } else {
            currentIndex = index;
        }

        const offset = -currentIndex * 100; // Each card takes 100% width
        testimonialsSlider.style.transform = `translateX(${offset}%)`;
    };

    if (prevBtn && nextBtn && testimonialsSlider) {
        prevBtn.addEventListener('click', () => {
            showTestimonial(currentIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            showTestimonial(currentIndex + 1);
        });

        // Initialize slider to show the first testimonial
        showTestimonial(0);
    }
});