// Intersection Observer para animações
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Se for um item com contador, inicia a animação
            if (entry.target.classList.contains('stat-item')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observa todos os elementos com classe fade-up
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));
});

// Função para animar contadores
function animateCounter(element) {
    const counter = element.querySelector('.counter');
    if (!counter || counter.classList.contains('animated')) return;
    
    counter.classList.add('animated');
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
}

// Smooth scroll para âncoras (se houver)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Adiciona classe ao scroll para efeitos adicionais
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Adiciona classe baseada na direção do scroll
    if (scrollTop > lastScrollTop) {
        document.body.classList.add('scrolling-down');
        document.body.classList.remove('scrolling-up');
    } else {
        document.body.classList.add('scrolling-up');
        document.body.classList.remove('scrolling-down');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

// Preloader das imagens (opcional)
function preloadImages() {
    const images = [
        'https://page.gensparksite.com/v1/base64_upload/db6ba1527193a5cc3ba80a09df20725c',
        'https://page.gensparksite.com/v1/base64_upload/a679ccb435fbf82744749cb928a212a8',
        'https://page.gensparksite.com/v1/base64_upload/5864a2d1f9844515bf47ed7e5ed22059'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Inicia o preload quando a página carregar
window.addEventListener('load', preloadImages);

// Adiciona efeito de hover nos benefícios
document.addEventListener('DOMContentLoaded', () => {
    const benefitItems = document.querySelectorAll('.benefit-item');
    
    benefitItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Função para detectar se o usuário está em mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustes específicos para mobile
if (isMobile()) {
    // Reduz as animações em mobile para melhor performance
    document.documentElement.style.setProperty('--animation-duration', '0.4s');
}

// Redimensionamento da janela
window.addEventListener('resize', () => {
    // Recalcula se necessário
    if (isMobile()) {
        document.documentElement.style.setProperty('--animation-duration', '0.4s');
    } else {
        document.documentElement.style.setProperty('--animation-duration', '0.6s');
    }
});

console.log('🏆 MIC Camisas de Time - Página Sobre Nós carregada com sucesso!');