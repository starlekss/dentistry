// Микроанимации и Intersection Observer для появления блоков
document.addEventListener('DOMContentLoaded', function() {
    
    // Наблюдатель за появлением элементов
    const animatedElements = document.querySelectorAll('.service-card, .photo-card, .testimonial-card, .journey-card, .number-block');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Горизонтальный скролл мышкой для уникальной секции
    const scrollContainer = document.getElementById('journeyScroll');
    if (scrollContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
            scrollContainer.style.cursor = 'grabbing';
        });
        
        window.addEventListener('mouseup', () => {
            isDown = false;
            scrollContainer.style.cursor = 'grab';
        });
        
        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 1.2;
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
        
        scrollContainer.style.cursor = 'grab';
    }
    
    // Микроанимация для кнопок (пульсация при наведении)
    const btns = document.querySelectorAll('.btn');
    btns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.2s ease';
        });
    });
    
    // Плавный скролл для якорных ссылок (если будут)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== "#" && href !== "") {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    console.log('Dentalis сайт загружен с микроанимациями');
});