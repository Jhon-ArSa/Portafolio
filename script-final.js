// ===== Smooth Scroll ===== 
document.querySelectorAll('[data-scroll-to]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = button.getAttribute('data-scroll-to');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Copy Email to Clipboard =====
const emailBtn = document.getElementById('copyEmail');
const toCopyText = document.querySelector('.to-copy span');

if (emailBtn) {
    emailBtn.addEventListener('click', () => {
        const email = emailBtn.textContent;
        
        navigator.clipboard.writeText(email).then(() => {
            const originalText = toCopyText.textContent;
            toCopyText.textContent = '¡Copiado!';
            toCopyText.style.color = '#00ff00';
            
            setTimeout(() => {
                toCopyText.textContent = originalText;
                toCopyText.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar:', err);
        });
    });
}

// ===== Contact Scroll Buttons =====
document.querySelectorAll('.contact-scroll').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('.project-item, .awards__item, .awards__stack, .awards__ice').forEach(el => {
    observer.observe(el);
});

// ===== Project Lines Animation =====
const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const span = entry.target.querySelector('span');
            if (span) {
                span.style.animation = 'lineGrow 1.5s ease forwards';
            }
            lineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.project-line').forEach(line => {
    lineObserver.observe(line);
});

// ===== Parallax Effect for Hero Title =====
let ticking = false;

function updateParallax() {
    const scrolled = window.scrollY;
    const heroWords = document.querySelectorAll('.hero__word');
    
    heroWords.forEach((word, index) => {
        const speed = (index + 1) * 0.5;
        const yPos = -(scrolled * speed * 0.1);
        word.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ===== Nav Background on Scroll =====
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(17, 17, 17, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.background = 'linear-gradient(180deg, var(--col-black) 0%, rgba(17, 17, 17, 0.8) 70%, transparent 100%)';
        nav.style.backdropFilter = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== Cursor Follower (Optional Enhancement) =====
const cursor = document.createElement('div');
cursor.className = 'cursor';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 1px solid #aaaaaa;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s, border-color 0.2s;
    display: none;
`;

document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Mostrar cursor solo en desktop
if (window.innerWidth > 768) {
    cursor.style.display = 'block';
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// Cambiar cursor en hover de elementos interactivos
document.querySelectorAll('a, button, .project__link').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.borderColor = '#ffffff';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#aaaaaa';
    });
});

// ===== Prevent Link Default (for demo) =====
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// ===== Log Welcome Message =====
console.log('%c¡Hola! 👋', 'color: #ffffff; font-size: 20px; font-weight: bold;');
console.log('%c¿Explorando el código? Me gusta tu estilo 😎', 'color: #aaaaaa; font-size: 14px;');
console.log('%c¡Contáctame si quieres trabajar juntos!', 'color: #ffffff; font-size: 14px;');

// ===== Initialize on Load =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// ===== Lazy Load Images (if you add images later) =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Project Titles Hover Effect =====
document.querySelectorAll('.project__title').forEach(title => {
    const text = title.textContent;
    const letters = text.split('');
    title.textContent = '';
    
    letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.display = 'inline-block';
        span.style.transition = `transform 0.3s ease ${index * 0.02}s`;
        title.appendChild(span);
    });
    
    title.addEventListener('mouseenter', () => {
        title.querySelectorAll('span').forEach(span => {
            span.style.transform = 'translateY(-5px)';
        });
    });
    
    title.addEventListener('mouseleave', () => {
        title.querySelectorAll('span').forEach(span => {
            span.style.transform = 'translateY(0)';
        });
    });
});


// ===== FUNCIONALIDADES ADICIONALES INTEGRADAS =====

// ===== Sistema de Semanas Interactivo =====
function initWeeksTabs() {
    const weekButtons = document.querySelectorAll('.week-nav-btn');
    const weekPanels = document.querySelectorAll('.week-panel');
    
    weekButtons.forEach(button => {
        button.addEventListener('click', () => {
            const weekNumber = button.getAttribute('data-week');
            
            // Remover active de todos los botones
            weekButtons.forEach(btn => btn.classList.remove('active'));
            
            // Remover active de todos los paneles
            weekPanels.forEach(panel => panel.classList.remove('active'));
            
            // Agregar active al botón clickeado
            button.classList.add('active');
            
            // Agregar active al panel correspondiente
            const activePanel = document.querySelector(`.week-panel[data-week="${weekNumber}"]`);
            if (activePanel) {
                activePanel.classList.add('active');
            }
            
            // Scroll suave al contenido de la semana
            if (activePanel) {
                activePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
}

// ===== Skill Bars Animation =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ===== Animated Counters =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const prefix = element.getAttribute('data-prefix') || '';
    const suffix = element.getAttribute('data-suffix') !== null ? element.getAttribute('data-suffix') : '+';
    const duration = 1500;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = prefix + target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = prefix + Math.floor(current) + suffix;
        }
    }, 16);
}

// ===== Scroll to Top Button =====
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (!scrollTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Contact Form Handler =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value
        };
        
        console.log('Formulario enviado:', formData);
        
        showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
        
        form.reset();
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: var(--col-gray);
        color: var(--col-black);
        padding: 1.5rem 2.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-size: 1.4rem;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== Theme Toggle =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (!themeToggle) return;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        
        if (body.classList.contains('light-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ===== Progress Bar Animation =====
function initProgressBar() {
    const progressBar = document.querySelector('.progress-bar-fill');
    
    if (!progressBar) return;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observer.observe(progressBar);
}

// ===== Initialize All on Load =====
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidades de diseño minimalista
    initScrollToTop();
    initContactForm();
    initThemeToggle();
    
    // Funcionalidades de secciones específicas
    initWeeksTabs();
    initSkillBars();
    initCounters();
    initProgressBar();
    
    console.log('✅ Portafolio completamente cargado e integrado!');
});

// ===== Animations CSS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
