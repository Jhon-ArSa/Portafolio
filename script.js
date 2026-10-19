// ===== Inicialización =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Inicializar todos los componentes
    initNavigation();
    initThemeToggle();
    initTypingEffect();
    initScrollAnimations();
    initSkillBars();
    initCounters();
    initScrollToTop();
    initContactForm();
    createParticles();
    
    // Inicializar sistema de semanas
    initWeeksTabs();
    initProgressBar();
    initWeeksKeyboardNavigation();
}

// ===== Navegación =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect para navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Toggle menú móvil
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Highlight active section en navegación
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== Tema Claro/Oscuro =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Cargar tema guardado
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

// ===== Efecto de Escritura (Typing) =====
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const texts = [
        'Desarrollador Full Stack',
        'Creador de Experiencias Web',
        'Solucionador de Problemas',
        'Entusiasta del Código Limpio'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pausa antes de borrar
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pausa antes de escribir nuevo texto
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

// ===== Animaciones al Scroll =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observar elementos
    const elementsToAnimate = document.querySelectorAll(
        '.about-content, .stat-card, .skill-category, .project-card, .timeline-item, .contact-content, .week-card, .weeks-stats-container'
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===== Barras de Habilidades =====
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

// ===== Contadores Animados =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
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
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// ===== Botón Scroll to Top =====
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
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

// ===== Formulario de Contacto =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener valores del formulario
        const formData = {
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value
        };
        
        // Aquí puedes agregar la lógica para enviar el formulario
        // Por ejemplo, usando fetch() para enviar a un servidor
        
        console.log('Formulario enviado:', formData);
        
        // Mostrar mensaje de éxito
        showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
        
        // Limpiar formulario
        form.reset();
    });
}

// ===== Notificaciones =====
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: var(--primary-color);
        color: var(--bg-primary);
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== Partículas Animadas =====
function createParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: var(--primary-color);
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: float ${duration}s ${delay}s infinite ease-in-out;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Agregar animación CSS si no existe
    if (!document.getElementById('particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0) translateX(0); }
                25% { transform: translateY(-20px) translateX(10px); }
                50% { transform: translateY(-40px) translateX(-10px); }
                75% { transform: translateY(-20px) translateX(10px); }
            }
            
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== Smooth Scroll para Enlaces Internos =====
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

// ===== Prevenir comportamiento por defecto de enlaces de ejemplo =====
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// ===== Filtro Interactivo de Semanas =====
function initWeeksFilter() {
    const tabButtons = document.querySelectorAll('.week-tab-btn');
    const weekCards = document.querySelectorAll('.week-card');
    
    if (!tabButtons.length || !weekCards.length) return;
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetWeek = btn.getAttribute('data-week');
            
            // Actualizar estado de los botones
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filtrar las tarjetas de cada semana
            weekCards.forEach(card => {
                const cardWeek = card.getAttribute('data-week');
                if (targetWeek === 'all' || cardWeek === targetWeek) {
                    card.classList.remove('is-hidden');
                    // Asegurar que sea visible con animación
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 50);
                } else {
                    card.classList.add('is-hidden');
                }
            });
            
            // Si seleccionó una semana específica, hacer scroll suave hacia ella
            if (targetWeek !== 'all') {
                const targetCard = document.getElementById(`semana-${targetWeek}`);
                if (targetCard) {
                    const navHeight = document.getElementById('navbar') ? document.getElementById('navbar').offsetHeight : 80;
                    const cardPosition = targetCard.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                    window.scrollTo({
                        top: cardPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===== Versión del Sílabo Oficial para Sincronización Automática =====
const WEEKS_DATA_VERSION = 'v3_silabo_oficial';

// ===== Datos del Sílabo Oficial de las 7 Semanas de Clase =====
const DEFAULT_WEEKS_DATA = [
    {
        id: "1",
        number: "01",
        title: "Semana 01: Exposición de Sílabo, Fundamentos de Tecnologías Web y Visual Studio Code",
        duration: "6 Horas • Fundamentos & Entorno",
        status: "completed",
        description: "Exposición de sílabo y prueba de diagnóstico. Fundamentos de las tecnologías web y soluciones web (sistema web, aplicación web, sitio web y página web). Tecnologías web básicas, lenguajes y gráficos. Funcionamiento de la web: DNS, Protocolo TCP/IP, Protocolo HTTP. Roles en el desarrollo de Aplicaciones para Internet (frontend, backend, fullstack). Herramienta de desarrollo Visual Studio Code y portafolio educativo.",
        topics: [
            { icon: "fas fa-chalkboard-teacher", name: "Exposición de Sílabo & Diagnóstico" },
            { icon: "fas fa-globe", name: "Soluciones Web (Sistemas, Apps, Sitios, Páginas)" },
            { icon: "fas fa-network-wired", name: "Funcionamiento Web (DNS, TCP/IP, HTTP)" },
            { icon: "fas fa-users-cog", name: "Roles (Frontend, Backend, Fullstack)" },
            { icon: "fas fa-laptop-code", name: "Visual Studio Code (UI, Extensiones, Atajos)" },
            { icon: "fab fa-github", name: "Repositorio GitHub & Portafolio Educativo" }
        ],
        tasks: [
            "Exposición detallada del sílabo de la asignatura y desarrollo de la prueba de diagnóstico.",
            "Explicación y análisis de los fundamentos de las tecnologías web y tipos de soluciones web.",
            "Estudio del funcionamiento de la arquitectura web: resolución DNS, Protocolo TCP/IP y Protocolo HTTP.",
            "Diferenciación de roles en desarrollo: desarrollador frontend, desarrollador backend y desarrollador fullstack.",
            "Laboratorio 01A: Visual Studio Code - Elementos de interfaz de usuario, extensiones esenciales y atajos de teclado.",
            "Configuración del repositorio de código en GitHub y estructuración del portafolio educativo."
        ],
        deliverable: {
            title: "Laboratorio 01A - VSC Interfaz, Extensiones, Atajos y Repositorio GitHub",
            status: "Evaluado (20/20)",
            notes: "Entorno de desarrollo configurado en VS Code con atajos y extensiones, repositorio GitHub enlazado y portafolio educativo inicializado."
        },
        image: ""
    },
    {
        id: "2",
        number: "02",
        title: "Semana 02: Marcado HTML5 / XML, Árbol DOM y Hojas de Estilos CSS3 (Flexbox & Responsive)",
        duration: "12 Horas • HTML5 & CSS3",
        status: "completed",
        description: "Construcción de páginas con Lenguaje de Marcado de Hipertexto HTML y Lenguaje de Marcado Extensible XML bajo el estándar Open Web Platform. Estructura HTML y XML, etiquetas principales de HTML5, árbol DOM (árbol de nodos, renderizado y ciclo de vida de la página web), optimización SEO y compatibilidad entre navegadores. Diseño con CSS3: sintaxis, block / inline / inline-block, unidades absolutas y relativas, Flexbox, Grid layout, tipos de position, diseño fluido y diseño web responsivo.",
        topics: [
            { icon: "fab fa-html5", name: "HTML5 & XML (Open Web Platform)" },
            { icon: "fas fa-sitemap", name: "Árbol DOM (Nodos, Renderizado, Ciclo de Vida)" },
            { icon: "fas fa-search", name: "Optimización SEO & Compatibilidad entre Navegadores" },
            { icon: "fab fa-css3-alt", name: "CSS3 (Sintaxis, Display, Unidades Absolutas/Relativas)" },
            { icon: "fas fa-arrows-alt", name: "Flexbox, Grid Layout & Tipos Position" },
            { icon: "fas fa-mobile-alt", name: "Diseño Fluido y Diseño Web Responsivo" }
        ],
        tasks: [
            "Construcción de documentos web estructurados con HTML5 y marcado extensible XML.",
            "Comprensión del Árbol DOM: análisis de nodos, proceso de renderizado del árbol y ciclo de vida de la página web.",
            "Implementación de técnicas de optimización para motores de búsqueda (SEO) y validación de compatibilidad cross-browser.",
            "Dominio de CSS3: sintaxis, modelos display (block, inline, inline-block), unidades relativas (rem, em, %) y absolutas (px).",
            "Manejo de esquemas de posicionamiento CSS (static, relative, absolute, fixed, sticky) y Grid layout.",
            "Laboratorio 02A: Maquetación con diseño Flexbox, diseño fluido y diseño web responsivo."
        ],
        deliverable: {
            title: "Laboratorio 02A - Diseño Flexbox, Diseño Fluido y Diseño Responsivo",
            status: "Evaluado (20/20)",
            notes: "Página web responsiva estructurada en HTML5/CSS3 con maquetación flexible en Flexbox, diseño fluido y buenas prácticas SEO."
        },
        image: ""
    },
    {
        id: "3",
        number: "03",
        title: "Semana 03: Desarrollo Front-End con Librerías CSS (Bootstrap & Tailwind CSS) y Application UI",
        duration: "18 Horas • Bootstrap & Tailwind",
        status: "completed",
        description: "Desarrollo de páginas web Front-End con librerías y frameworks CSS. Implementación de Bootstrap (Layout y Components) y Tailwind CSS: Tipografía (Font, Line, Text), Backgrounds, Bordes, Efectos, Tablas y Spacing. Layout con contenedores, columnas, breaks, boxes, display y position. Flexbox utilitario (básico, direction, wrap, grow, shrink). Componentes de Application UI: Avatars, Badges, Dropdowns, Buttons, Button Groups, shells, heading, data display, lists, forms, feedback, navigation, overlays, layouts y components.",
        topics: [
            { icon: "fab fa-bootstrap", name: "Bootstrap (Layout & Components)" },
            { icon: "fas fa-wind", name: "Tailwind CSS (Utility-First Architecture)" },
            { icon: "fas fa-font", name: "Tipografía (Font, Line, Text, Background, Borders, Effects)" },
            { icon: "fas fa-th-large", name: "Layout & Flexbox (Container, Columns, Direction, Wrap)" },
            { icon: "fas fa-layer-group", name: "Application UI (Avatars, Badges, Dropdowns, Buttons)" },
            { icon: "fas fa-window-restore", name: "Application UI (Shells, Lists, Forms, Navigation, Overlays)" }
        ],
        tasks: [
            "Desarrollo de páginas web Front-End estructuradas con la librería CSS Bootstrap (Layout y Components).",
            "Configuración y desarrollo Front-End con Tailwind CSS aplicando el paradigma de utilidades.",
            "Estilizado avanzado: tipografía (font, line, text), fondos, bordes, efectos visuales, tablas y espaciados (spacing).",
            "Maquetación responsiva con containers, columnas, display y utilidades flexbox (direction, wrap, grow, shrink).",
            "Construcción de elementos de Application UI: Avatars, Badges, Dropdowns, Botones individuales y en grupo.",
            "Desarrollo de interfaces completas: shells, encabezados, data display, listas, formularios, feedback, navegación y overlays.",
            "Práctica Calificada 03: Desarrollo de un sitio web completo con CSS avanzado (Bootstrap y Tailwind)."
        ],
        deliverable: {
            title: "Práctica Calificada 03 - Desarrollo de un Sitio Web con CSS (Bootstrap & Tailwind)",
            status: "Evaluado (20/20)",
            notes: "Sitio web Front-End desarrollado integrando componentes de Bootstrap y diseño utility-first de Tailwind CSS con Application UI."
        },
        image: ""
    },
    {
        id: "4",
        number: "04",
        title: "Semana 04: Front-End con Javascript y Typescript, Manejo del DOM y Animaciones con Canvas",
        duration: "24 Horas • JS, TS, DOM & Canvas",
        status: "completed",
        description: "Desarrollo Front-End con Javascript y Typescript. Estudio de motores Javascript, variables y operadores. Tipos de datos: Números, Strings, Objetos y métodos, Booleanos y otros. Estructuras de control y bucles. Funciones avanzadas: sintaxis, invocación, funciones anónimas, función objeto, funciones flecha, funciones auto-invocadas (IIFE) y closures. Manejo del DOM con Javascript (métodos, propiedades, elementos y estilos) y gráficos/animaciones con la API Canvas de HTML5.",
        topics: [
            { icon: "fab fa-js-square", name: "Motores Javascript, Variables, Operadores & Tipos" },
            { icon: "fas fa-code", name: "Typescript & Estructuras de Control / Bucles" },
            { icon: "fas fa-code-branch", name: "Funciones (Anónimas, Flecha, Objeto, IIFE, Closures)" },
            { icon: "fas fa-mouse-pointer", name: "Manejo del DOM (Métodos, Propiedades, Elementos, Estilos)" },
            { icon: "fas fa-palette", name: "HTML5 Canvas (Métodos Gráficos 2D)" },
            { icon: "fas fa-play-circle", name: "Animaciones y Gráficos Dinámicos con Canvas" }
        ],
        tasks: [
            "Comprensión de motores Javascript, tipado con Typescript, declaración de variables y operadores.",
            "Manejo de tipos de datos primitivos y complejos: Números, Strings, Objetos con métodos y Booleanos.",
            "Implementación de lógica mediante estructuras condicionales, bucles y control de flujo.",
            "Desarrollo de funciones: sintaxis e invocación, funciones flecha, funciones anónimas, funciones objeto, IIFE y closures.",
            "Manipulación dinámica del DOM con Javascript: acceso a nodos, modificación de atributos, estilos y eventos.",
            "Laboratorio 04: Desarrollo de una animación y gráficos interactivos con Javascript y HTML5 Canvas."
        ],
        deliverable: {
            title: "Laboratorio 04 - Desarrollo de una Animación con Javascript y Canvas",
            status: "Evaluado (20/20)",
            notes: "Animación interactiva desarrollada en Canvas con lógica Javascript/Typescript, funciones avanzadas y manipulación del DOM."
        },
        image: ""
    },
    {
        id: "5",
        number: "05",
        title: "Semana 05: Desarrollo Front-End con Framework JS (Client Side Rendering, Componentes, Props & Children)",
        duration: "30 Horas • Framework JS (React)",
        status: "completed",
        description: "Desarrollo de aplicaciones Front-End con Framework JS. Estructura y operación del Framework bajo el enfoque Client Side Rendering (CSR). Gestión de dependencias y herramientas de creación de proyectos (Vite/npm). Desarrollo basado en componentes modulares utilizando sintaxis JSX, comunicación de componentes con PROPS y composición con CHILDREN. Utilización de estilos en Framework JS: Styles inline, Style Sheets, Styles Modules, Styled Components y Frameworks CSS.",
        topics: [
            { icon: "fab fa-react", name: "Estructura y Operación de Framework JS (Client Side Rendering)" },
            { icon: "fas fa-tools", name: "Gestión de Dependencias & Herramientas de Creación" },
            { icon: "fas fa-cubes", name: "Desarrollo Basado en Componentes & JSX" },
            { icon: "fas fa-exchange-alt", name: "Comunicación de Componentes: PROPS & CHILDREN" },
            { icon: "fas fa-paint-brush", name: "Estilos: Inline, Style Sheets & Styles Modules" },
            { icon: "fas fa-layer-group", name: "Styles Components & Frameworks CSS" }
        ],
        tasks: [
            "Configuración del entorno de proyecto con Client Side Rendering (CSR) y gestor de paquetes.",
            "Estructuración de aplicaciones web mediante desarrollo modular basado en componentes con JSX.",
            "Implementación de pasaje y lectura de datos unidireccional utilizando propiedades (PROPS).",
            "Manejo de composición y anidamiento jerárquico de componentes mediante la propiedad CHILDREN.",
            "Aplicación de estilos en componentes: estilos inline, hojas de estilo globales, Style Modules y styled components.",
            "Laboratorio 05A: Pasar datos con props y children y mostrarlos dinámicamente en un componente hijo."
        ],
        deliverable: {
            title: "Laboratorio 05A - Pasar Datos con Props y Children y Mostrar en Componente Hijo",
            status: "Evaluado (20/20)",
            notes: "Aplicación en Framework JS estructurada en componentes modulares con paso de datos por props, children y CSS Modules."
        },
        image: ""
    },
    {
        id: "6",
        number: "06",
        title: "Semana 06: Eventos, Renderizado Condicional / Iterativo, Routing y Consumo de APIs (Axios)",
        duration: "6 Horas • Eventos & Consumo de APIs",
        status: "completed",
        description: "Desarrollo de aplicaciones con eventos, condicionales y bucles en Framework JS. Control de eventos de usuario, renderizado condicional y renderizado iterativo (listas dinámicas con keys únicas). Manejo de formularios interactivos y enrutamiento de la aplicación (Routing). Consumo de APIs RESTful: Promesas, sintaxis Async / Await, obtención y mapeo de datos de una API externa utilizando la librería Axios.",
        topics: [
            { icon: "fas fa-bolt", name: "Eventos de Usuario en Framework JS" },
            { icon: "fas fa-toggle-on", name: "Renderizado Condicional & Renderizado Iterativo" },
            { icon: "fas fa-route", name: "Formularios Interactivos & Routing (Enrutamiento)" },
            { icon: "fas fa-hourglass-half", name: "Consumo de APIs: Promesas & Async / Await" },
            { icon: "fas fa-cloud-download-alt", name: "Obtención y Mapeo de Datos de una API" },
            { icon: "fas fa-plug", name: "Integración con la Librería Axios" }
        ],
        tasks: [
            "Captura y manejo de eventos sintéticos del Framework JS en botones, inputs y formularios.",
            "Implementación de renderizado condicional de componentes y renderizado iterativo de colecciones de datos.",
            "Configuración de formularios controlados y sistema de navegación/enrutamiento (Routing) entre vistas.",
            "Programación asíncrona mediante promesas y sintaxis Async/Await para llamadas de red.",
            "Conexión, obtención y procesamiento de datos provenientes de APIs REST externas mediante la librería Axios.",
            "Laboratorio 06A: Eventos y renderizado condicional e iterativo consumiendo datos en tiempo real de una API."
        ],
        deliverable: {
            title: "Laboratorio 06A - Eventos y Renderizado Condicional e Iterativo con Datos de una API",
            status: "Evaluado (20/20)",
            notes: "Módulo con captura de eventos, rutas, renderizado condicional e iterativo con consumo asíncrono de API externa vía Axios."
        },
        image: ""
    },
    {
        id: "7",
        number: "07",
        title: "Semana 07: Uso de Hooks Estándar, Hooks Personalizados y Evaluación de Logro 01",
        duration: "6 Horas • Hooks & Evaluación 01",
        status: "completed",
        description: "Uso exhaustivo de Hooks en Framework JS: useState, useEffect, useContext, useRef, useReducer, useCallback y useMemo. Abstracción y creación de Hooks Personalizados (Custom Hooks) para reutilización de lógica de negocio entre componentes. Consolidación de aprendizajes y sustentación de la Evaluación de Logro 01 de la asignatura.",
        topics: [
            { icon: "fas fa-anchor", name: "Hooks Básicos: useState & useEffect" },
            { icon: "fas fa-project-diagram", name: "Gestión de Estado: useContext & useReducer" },
            { icon: "fas fa-compass", name: "Manejo de Referencias: useRef" },
            { icon: "fas fa-tachometer-alt", name: "Optimización y Rendimiento: useCallback & useMemo" },
            { icon: "fas fa-magic", name: "Hooks Personalizados (Custom Hooks)" },
            { icon: "fas fa-award", name: "Evaluación de Logro 01" }
        ],
        tasks: [
            "Implementación de estado reactivo y control de efectos secundarios con `useState` y `useEffect`.",
            "Manejo de estado global con `useContext` y gestión de flujos de estado complejos mediante `useReducer`.",
            "Acceso directo a elementos del DOM y persistencia mutable sin re-renderizado con `useRef`.",
            "Optimización de rendimiento mediante memorización de funciones con `useCallback` y cálculos costosos con `useMemo`.",
            "Creación y aplicación de Hooks Personalizados (Custom Hooks) reutilizables.",
            "Laboratorio 06 / 07: Uso de hooks estándar y personalizados en componentes funcionales.",
            "Sustentación y aprobación de la Evaluación de Logro 01 de la asignatura."
        ],
        deliverable: {
            title: "Laboratorio 06 / 07 - Uso de Hooks Estándar, Hooks Personalizados & Evaluación de Logro 01",
            status: "Evaluado (20/20)",
            notes: "Implementación integral de hooks reactivos (useState, useEffect, useReducer, Custom Hooks) y aprobación de la Evaluación de Logro 01."
        },
        image: ""
    }
];

// Variable global para filtro activo
let currentWeekFilter = 'all';
let currentModalImages = []; // Array de imágenes (Base64 o URLs) en el modal de edición

// Normalizar lista de imágenes de una semana (compatibilidad con 'image' y 'images')
function normalizeWeekImages(week) {
    if (!week) return [];
    if (Array.isArray(week.images) && week.images.length > 0) {
        return week.images.filter(img => typeof img === 'string' && img.trim() !== '');
    }
    if (week.image && typeof week.image === 'string' && week.image.trim() !== '') {
        return [week.image.trim()];
    }
    return [];
}

// ===== GESTOR PRINCIPAL DE SEMANAS Y ADMINISTRACIÓN =====
function initWeeksManager() {
    // 1. Obtener datos o inicializar
    getWeeksData();

    // 2. Renderizar Semanas y Controles
    renderWeeks(currentWeekFilter);

    // 3. Inicializar Eventos de Autenticación Admin
    initAdminAuth();

    // 4. Inicializar Eventos de Modal de Edición
    initWeekEditModalEvents();

    // 5. Inicializar Visor Lightbox de Imágenes
    initLightboxEvents();
}

// Obtener datos desde localStorage o cargar los predeterminados
function getWeeksData() {
    const saved = localStorage.getItem('portfolio_weeks_data');

    if (!saved) {
        localStorage.setItem('portfolio_weeks_data', JSON.stringify(DEFAULT_WEEKS_DATA));
        localStorage.setItem('portfolio_weeks_version', WEEKS_DATA_VERSION);
        return DEFAULT_WEEKS_DATA;
    }

    try {
        const parsed = JSON.parse(saved);
        // Garantizar que cada semana cuente con su array images normalizado
        let needsMigration = false;
        parsed.forEach(w => {
            if (!Array.isArray(w.images)) {
                w.images = normalizeWeekImages(w);
                needsMigration = true;
            }
        });
        if (needsMigration) {
            localStorage.setItem('portfolio_weeks_data', JSON.stringify(parsed));
        }
        return parsed;
    } catch (e) {
        console.error('Error al parsear semanas desde localStorage, usando datos por defecto.', e);
        localStorage.setItem('portfolio_weeks_data', JSON.stringify(DEFAULT_WEEKS_DATA));
        return DEFAULT_WEEKS_DATA;
    }
}

// Guardar array de semanas en localStorage
function saveWeeksData(weeks) {
    localStorage.setItem('portfolio_weeks_data', JSON.stringify(weeks));
    renderWeeks(currentWeekFilter);
}

// Verificar si el modo administrador está activo en la sesión actual
function isAdminLoggedIn() {
    return sessionStorage.getItem('portfolio_admin_auth') === 'true';
}

// Establecer estado de la sesión de administrador
function setAdminLoggedIn(status) {
    sessionStorage.setItem('portfolio_admin_auth', status ? 'true' : 'false');
    updateAdminUI();
    renderWeeks(currentWeekFilter);
}

// Actualizar elementos visuales del Admin
function updateAdminUI() {
    const isLogged = isAdminLoggedIn();
    const adminNavBtn = document.getElementById('adminNavBtn');
    const adminActionBar = document.getElementById('adminActionBar');
    const adminTriggerText = document.getElementById('adminTriggerText');
    const btnAdminManage = document.getElementById('btnAdminManage');

    if (adminNavBtn) {
        if (isLogged) {
            adminNavBtn.classList.add('active');
            adminNavBtn.innerHTML = '<i class="fas fa-lock-open"></i> <span class="admin-nav-text">Admin Activo</span>';
            adminNavBtn.title = 'Modo Administrador Activo (Haz clic para salir)';
        } else {
            adminNavBtn.classList.remove('active');
            adminNavBtn.innerHTML = '<i class="fas fa-user-shield"></i> <span class="admin-nav-text">Admin</span>';
            adminNavBtn.title = 'Acceso de Administrador';
        }
    }

    if (adminActionBar) {
        adminActionBar.style.display = isLogged ? 'flex' : 'none';
    }

    if (btnAdminManage) {
        if (isLogged) {
            btnAdminManage.classList.add('active');
            if (adminTriggerText) adminTriggerText.textContent = 'Panel Admin Activo';
        } else {
            btnAdminManage.classList.remove('active');
            if (adminTriggerText) adminTriggerText.textContent = 'Administrar Semanas';
        }
    }
}

// Renderizar métricas, tabs y tarjetas
function renderWeeks(filter = 'all') {
    currentWeekFilter = filter;
    const weeks = getWeeksData();
    const isAdmin = isAdminLoggedIn();

    // Actualizar Progreso y Métricas
    const totalWeeks = weeks.length;
    const completedWeeks = weeks.filter(w => w.status === 'completed').length;
    const percent = totalWeeks > 0 ? Math.round((completedWeeks / totalWeeks) * 100) : 0;

    const progressPercentEl = document.querySelector('.weeks-progress-percent');
    const progressBarEl = document.querySelector('.weeks-progress-bar');
    if (progressPercentEl) progressPercentEl.textContent = `${percent}% Completado`;
    if (progressBarEl) progressBarEl.style.width = `${percent}%`;

    const metricItems = document.querySelectorAll('.metric-item');
    if (metricItems.length >= 4) {
        const val1 = metricItems[0].querySelector('.metric-value');
        const val3 = metricItems[2].querySelector('.metric-value');
        const val4 = metricItems[3].querySelector('.metric-value');
        if (val1) val1.textContent = `${completedWeeks} / ${totalWeeks}`;
        if (val3) val3.textContent = `${totalWeeks}`;
        if (val4) val4.textContent = `${percent}%`;
    }

    // Renderizar Tabs de Filtrado
    const weeksTabsContainer = document.getElementById('weeksTabs');
    if (weeksTabsContainer) {
        let tabsHtml = `
            <button class="week-tab-btn ${filter === 'all' ? 'active' : ''}" data-week="all">
                <i class="fas fa-th-large"></i> Todas las Semanas
            </button>
        `;

        weeks.forEach(w => {
            tabsHtml += `
                <button class="week-tab-btn ${filter === w.id ? 'active' : ''}" data-week="${w.id}">
                    <i class="fas fa-calendar-day"></i> Semana ${w.number || w.id}
                </button>
            `;
        });

        weeksTabsContainer.innerHTML = tabsHtml;

        // Asignar eventos de clic a los botones de tabs
        weeksTabsContainer.querySelectorAll('.week-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-week');
                renderWeeks(target);

                if (target !== 'all') {
                    const targetCard = document.getElementById(`semana-${target}`);
                    if (targetCard) {
                        const navHeight = document.getElementById('navbar') ? document.getElementById('navbar').offsetHeight : 80;
                        const cardPos = targetCard.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                        window.scrollTo({ top: cardPos, behavior: 'smooth' });
                    }
                }
            });
        });
    }

    // Renderizar Tarjetas de cada Semana
    const weeksGrid = document.getElementById('weeksGrid');
    if (!weeksGrid) return;

    const filteredWeeks = filter === 'all' ? weeks : weeks.filter(w => w.id === filter);

    if (filteredWeeks.length === 0) {
        weeksGrid.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary); background: var(--bg-secondary); border-radius: var(--border-radius-lg);">
                <i class="fas fa-folder-open" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--primary-color);"></i>
                <p>No se encontraron semanas para mostrar.</p>
            </div>
        `;
        return;
    }

    let cardsHtml = '';

    filteredWeeks.forEach(w => {
        const isCompleted = w.status === 'completed';
        const isInProgress = w.status === 'in-progress';
        const statusClass = isCompleted ? 'completed' : (isInProgress ? 'in-progress' : 'pending');
        const statusLabel = isCompleted ? 'Completada' : (isInProgress ? 'En Progreso' : 'Pendiente');
        const statusIcon = isCompleted ? 'fa-check-circle' : (isInProgress ? 'fa-spinner fa-spin' : 'fa-hourglass-start');

        // Renderizado de imágenes de evidencia (soporta 1 o múltiples fotos)
        const weekImages = normalizeWeekImages(w);
        let imageHtml = '';
        if (weekImages.length > 0) {
            if (weekImages.length === 1) {
                imageHtml = `
                    <div class="week-gallery-container">
                        <div class="week-gallery-grid count-1">
                            <div class="week-gallery-item" onclick="openWeekGalleryModal('${w.id}', 0)" title="Clic para ampliar evidencia">
                                <img src="${weekImages[0]}" alt="${escapeHtml(w.title)}" class="week-gallery-img" loading="lazy">
                                <div class="week-gallery-overlay">
                                    <i class="fas fa-search-plus"></i>
                                    <span>Clic para ampliar evidencia gráfica</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                const gridClass = weekImages.length === 2 ? 'count-2' : (weekImages.length === 3 ? 'count-3' : 'count-many');
                let itemsHtml = '';
                weekImages.forEach((imgSrc, imgIdx) => {
                    itemsHtml += `
                        <div class="week-gallery-item" onclick="openWeekGalleryModal('${w.id}', ${imgIdx})" title="Ver evidencia #${imgIdx + 1}">
                            <span class="week-gallery-badge">#${imgIdx + 1}</span>
                            <img src="${imgSrc}" alt="${escapeHtml(w.title)} - Foto #${imgIdx + 1}" class="week-gallery-img" loading="lazy">
                            <div class="week-gallery-overlay">
                                <i class="fas fa-search-plus"></i>
                                <span>Ver #${imgIdx + 1}</span>
                            </div>
                        </div>
                    `;
                });

                imageHtml = `
                    <div class="week-gallery-container">
                        <div class="week-gallery-header">
                            <span class="week-gallery-count-badge">
                                <i class="fas fa-images"></i> ${weekImages.length} Evidencias Fotográficas
                            </span>
                            <span class="week-gallery-hint">Haz clic en cualquier imagen para ampliar</span>
                        </div>
                        <div class="week-gallery-grid ${gridClass}">
                            ${itemsHtml}
                        </div>
                    </div>
                `;
            }
        }

        // Renderizado de tags / temas
        let topicsHtml = '';
        if (Array.isArray(w.topics)) {
            topicsHtml = w.topics.map(t => {
                const name = typeof t === 'string' ? t : (t.name || '');
                const icon = (typeof t === 'object' && t.icon) ? t.icon : 'fas fa-tag';
                return `<span class="week-tag"><i class="${icon}"></i> ${escapeHtml(name)}</span>`;
            }).join('');
        }

        // Renderizado de tareas
        let tasksHtml = '';
        if (Array.isArray(w.tasks)) {
            tasksHtml = w.tasks.map(task => `
                <li><i class="fas fa-check"></i> ${task}</li>
            `).join('');
        }

        // Acciones de administrador en la tarjeta
        let adminCardActions = '';
        if (isAdmin) {
            adminCardActions = `
                <div class="week-admin-actions">
                    <button class="week-admin-btn edit" onclick="openEditWeekModal('${w.id}')" title="Editar esta semana">
                        <i class="fas fa-pen"></i> Editar
                    </button>
                    <button class="week-admin-btn delete" onclick="deleteWeek('${w.id}')" title="Eliminar semana">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }

        cardsHtml += `
            <article class="week-card fade-in visible" data-week="${w.id}" id="semana-${w.id}">
                <div class="week-card-header">
                    <div class="week-badge-group">
                        <span class="week-pill"><i class="fas fa-calendar-check"></i> Semana ${escapeHtml(w.number || w.id)}</span>
                        <span class="week-status ${statusClass}"><i class="fas ${statusIcon}"></i> ${statusLabel}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.8rem; flex-wrap: wrap;">
                        <span class="week-duration"><i class="far fa-clock"></i> ${escapeHtml(w.duration || '4 Horas')}</span>
                        ${adminCardActions}
                    </div>
                </div>

                <div class="week-card-body">
                    <h3 class="week-title">${escapeHtml(w.title)}</h3>
                    <p class="week-description">${escapeHtml(w.description)}</p>

                    ${imageHtml}

                    ${topicsHtml ? `
                    <div class="week-block">
                        <h4 class="week-block-title"><i class="fas fa-tags"></i> Temas Tratados:</h4>
                        <div class="week-tags">${topicsHtml}</div>
                    </div>
                    ` : ''}

                    ${tasksHtml ? `
                    <div class="week-block">
                        <h4 class="week-block-title"><i class="fas fa-tasks"></i> Actividades y Prácticas Realizadas:</h4>
                        <ul class="week-tasks">${tasksHtml}</ul>
                    </div>
                    ` : ''}

                    ${w.deliverable ? `
                    <div class="week-deliverable">
                        <div class="deliverable-top">
                            <div class="deliverable-info">
                                <i class="fas fa-file-code deliverable-icon"></i>
                                <div>
                                    <span class="deliverable-badge">Entregable de la Semana</span>
                                    <h5 class="deliverable-title">${escapeHtml(w.deliverable.title || 'Entregable de Laboratorio')}</h5>
                                </div>
                            </div>
                            <span class="deliverable-status verified"><i class="fas fa-check-double"></i> ${escapeHtml(w.deliverable.status || 'Evaluado')}</span>
                        </div>
                        ${w.deliverable.notes ? `<p class="deliverable-notes">${escapeHtml(w.deliverable.notes)}</p>` : ''}
                    </div>
                    ` : ''}
                </div>
            </article>
        `;
    });

    weeksGrid.innerHTML = cardsHtml;
}

// Utilidad simple para escapar HTML
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== EVENTOS DE AUTENTICACIÓN ADMIN =====
function initAdminAuth() {
    const adminNavBtn = document.getElementById('adminNavBtn');
    const btnAdminManage = document.getElementById('btnAdminManage');
    const adminAuthModal = document.getElementById('adminAuthModal');
    const closeAuthModal = document.getElementById('closeAuthModal');
    const cancelAuthBtn = document.getElementById('cancelAuthBtn');
    const submitAuthBtn = document.getElementById('submitAuthBtn');
    const adminPasswordInput = document.getElementById('adminPasswordInput');
    const authErrorMessage = document.getElementById('authErrorMessage');
    const btnLogoutAdmin = document.getElementById('btnLogoutAdmin');
    const btnResetWeeks = document.getElementById('btnResetWeeks');
    const btnAddNewWeek = document.getElementById('btnAddNewWeek');

    function openAuthModal() {
        if (isAdminLoggedIn()) {
            // Si ya está logueado, al pulsar el botón pregunta si desea salir
            if (confirm('El Modo Administrador ya está activo. ¿Deseas cerrar la sesión de administrador?')) {
                setAdminLoggedIn(false);
                showAdminToast('Sesión de administrador cerrada.', 'info');
            }
            return;
        }
        if (adminAuthModal) {
            adminAuthModal.style.display = 'flex';
            if (adminPasswordInput) {
                adminPasswordInput.value = '';
                adminPasswordInput.focus();
            }
            if (authErrorMessage) authErrorMessage.style.display = 'none';
        }
    }

    function closeAuth() {
        if (adminAuthModal) adminAuthModal.style.display = 'none';
    }

    function tryLogin() {
        const pass = adminPasswordInput ? adminPasswordInput.value.trim() : '';
        // Contraseña por defecto: admin
        if (pass === 'admin') {
            setAdminLoggedIn(true);
            closeAuth();
            showAdminToast('¡Modo Administrador activado exitosamente!', 'success');
        } else {
            if (authErrorMessage) {
                authErrorMessage.textContent = 'Contraseña incorrecta. Recuerda que la contraseña por defecto es: admin';
                authErrorMessage.style.display = 'block';
            }
        }
    }

    if (adminNavBtn) adminNavBtn.addEventListener('click', openAuthModal);
    if (btnAdminManage) btnAdminManage.addEventListener('click', openAuthModal);
    if (closeAuthModal) closeAuthModal.addEventListener('click', closeAuth);
    if (cancelAuthBtn) cancelAuthBtn.addEventListener('click', closeAuth);
    if (submitAuthBtn) submitAuthBtn.addEventListener('click', tryLogin);

    if (adminPasswordInput) {
        adminPasswordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                tryLogin();
            }
        });
    }

    if (btnLogoutAdmin) {
        btnLogoutAdmin.addEventListener('click', () => {
            setAdminLoggedIn(false);
            showAdminToast('Has salido del Modo Administrador.', 'info');
        });
    }

    if (btnResetWeeks) {
        btnResetWeeks.addEventListener('click', () => {
            if (confirm('¿Estás seguro de restaurar las 7 semanas a su contenido original por defecto?')) {
                localStorage.setItem('portfolio_weeks_data', JSON.stringify(DEFAULT_WEEKS_DATA));
                renderWeeks(currentWeekFilter);
                showAdminToast('Semanas restauradas a valores predeterminados.', 'success');
            }
        });
    }

    if (btnAddNewWeek) {
        btnAddNewWeek.addEventListener('click', () => {
            openEditWeekModal(null);
        });
    }

    // Inicializar visualización según sesión guardada
    updateAdminUI();
}

// Renderizar miniaturas de imágenes en el modal de edición
function renderModalImagePreviews() {
    const previewContainer = document.getElementById('imagePreviewContainer');
    const previewGrid = document.getElementById('imagePreviewGrid');
    const previewCount = document.getElementById('previewCount');

    if (!previewContainer || !previewGrid) return;

    if (currentModalImages.length === 0) {
        previewContainer.style.display = 'none';
        previewGrid.innerHTML = '';
        if (previewCount) previewCount.textContent = '0';
        return;
    }

    previewContainer.style.display = 'block';
    if (previewCount) previewCount.textContent = currentModalImages.length.toString();

    let gridHtml = '';
    currentModalImages.forEach((imgSrc, index) => {
        gridHtml += `
            <div class="preview-thumb-card">
                <img src="${imgSrc}" alt="Evidencia #${index + 1}">
                <span class="preview-thumb-badge">#${index + 1}</span>
                <button type="button" class="btn-remove-thumb" onclick="removeModalImage(${index})" title="Eliminar imagen #${index + 1}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    });
    previewGrid.innerHTML = gridHtml;
}

window.removeModalImage = function(index) {
    if (index >= 0 && index < currentModalImages.length) {
        currentModalImages.splice(index, 1);
        renderModalImagePreviews();
    }
};

// ===== MODAL DE EDICIÓN Y CARGA DE MÚLTIPLES IMÁGENES =====
function initWeekEditModalEvents() {
    const editModal = document.getElementById('weekEditModal');
    const closeEditModal = document.getElementById('closeEditModal');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const weekEditForm = document.getElementById('weekEditForm');
    const editImageFileInput = document.getElementById('editImageFileInput');
    const editImageUrlInput = document.getElementById('editImageUrlInput');
    const btnAddImageUrl = document.getElementById('btnAddImageUrl');
    const btnRemoveAllImages = document.getElementById('btnRemoveAllImages');
    const dropzone = document.getElementById('imageDropzone');

    function closeModal() {
        if (editModal) editModal.style.display = 'none';
        currentModalImages = [];
        renderModalImagePreviews();
    }

    if (closeEditModal) closeEditModal.addEventListener('click', closeModal);
    if (cancelEditBtn) cancelEditBtn.addEventListener('click', closeModal);

    // Procesar archivos de imagen con compresión Canvas
    function processImageFiles(fileList) {
        const files = Array.from(fileList).filter(f => f.type && f.type.startsWith('image/'));
        if (files.length === 0) {
            showAdminToast('Por favor selecciona archivos de imagen válidos (PNG, JPG, WebP).', 'error');
            return;
        }

        let processedCount = 0;
        const total = files.length;
        const addedCount = total;

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = function(evt) {
                const img = new Image();
                img.onload = function() {
                    // Redimensionar automáticamente si excede 1200px para almacenamiento seguro en localStorage
                    const maxDim = 1200;
                    let width = img.width;
                    let height = img.height;
                    if (width > maxDim || height > maxDim) {
                        if (width > height) {
                            height = Math.round((height * maxDim) / width);
                            width = maxDim;
                        } else {
                            width = Math.round((width * maxDim) / height);
                            height = maxDim;
                        }
                    }
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    const compressed = canvas.toDataURL('image/jpeg', 0.82);
                    currentModalImages.push(compressed);

                    processedCount++;
                    if (processedCount === total) {
                        renderModalImagePreviews();
                        showAdminToast(`Se agregaron ${addedCount} imagen(es) con éxito. Total: ${currentModalImages.length}`, 'success');
                        if (editImageFileInput) editImageFileInput.value = '';
                    }
                };
                img.src = evt.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    // Input de archivos (soporta selección múltiple)
    if (editImageFileInput) {
        editImageFileInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files.length > 0) {
                processImageFiles(e.target.files);
            }
        });
    }

    // Drag and Drop en Dropzone
    if (dropzone) {
        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropzone.classList.add('drag-over');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropzone.classList.remove('drag-over');
            });
        });

        dropzone.addEventListener('drop', (e) => {
            if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                processImageFiles(e.dataTransfer.files);
            }
        });
    }

    // Agregar imagen mediante URL o ruta
    function addImageUrlFromInput() {
        if (!editImageUrlInput) return;
        const url = editImageUrlInput.value.trim();
        if (!url) return;
        currentModalImages.push(url);
        renderModalImagePreviews();
        editImageUrlInput.value = '';
        showAdminToast('Imagen agregada a la lista correctamente.', 'success');
    }

    if (btnAddImageUrl) {
        btnAddImageUrl.addEventListener('click', addImageUrlFromInput);
    }

    if (editImageUrlInput) {
        editImageUrlInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addImageUrlFromInput();
            }
        });
    }

    // Quitar todas las imágenes
    if (btnRemoveAllImages) {
        btnRemoveAllImages.addEventListener('click', function() {
            if (currentModalImages.length === 0) return;
            if (confirm('¿Deseas quitar todas las imágenes seleccionadas de esta semana?')) {
                currentModalImages = [];
                renderModalImagePreviews();
                if (editImageUrlInput) editImageUrlInput.value = '';
                if (editImageFileInput) editImageFileInput.value = '';
                showAdminToast('Todas las imágenes fueron eliminadas.', 'info');
            }
        });
    }

    // Guardar formulario
    if (weekEditForm) {
        weekEditForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const weekId = document.getElementById('editWeekId').value;
            const weekNumber = document.getElementById('editWeekNumber').value.trim();
            const weekDuration = document.getElementById('editWeekDuration').value.trim();
            const weekStatus = document.getElementById('editWeekStatus').value;
            const weekTitle = document.getElementById('editWeekTitle').value.trim();
            const weekDesc = document.getElementById('editWeekDesc').value.trim();
            const rawTopics = document.getElementById('editWeekTopics').value;
            const rawTasks = document.getElementById('editWeekTasks').value;
            const delivTitle = document.getElementById('editDeliverableTitle').value.trim();
            const delivStatus = document.getElementById('editDeliverableStatus').value.trim();
            const delivNotes = document.getElementById('editDeliverableNotes').value.trim();

            // Procesar topics
            const topics = rawTopics.split(',')
                .map(t => t.trim())
                .filter(t => t !== '')
                .map(t => ({ icon: 'fas fa-check-circle', name: t }));

            // Procesar tasks
            const tasks = rawTasks.split('\n')
                .map(t => t.trim())
                .filter(t => t !== '');

            const weeks = getWeeksData();

            if (weekId) {
                // Modificar semana existente
                const index = weeks.findIndex(w => w.id === weekId);
                if (index !== -1) {
                    weeks[index] = {
                        ...weeks[index],
                        number: weekNumber,
                        duration: weekDuration,
                        status: weekStatus,
                        title: weekTitle,
                        description: weekDesc,
                        topics: topics.length > 0 ? topics : weeks[index].topics,
                        tasks: tasks.length > 0 ? tasks : weeks[index].tasks,
                        deliverable: {
                            title: delivTitle || 'Entregable de Laboratorio',
                            status: delivStatus || 'Evaluado',
                            notes: delivNotes
                        },
                        images: [...currentModalImages],
                        image: currentModalImages[0] || ''
                    };
                    showAdminToast(`Semana ${weekNumber} actualizada correctamente.`, 'success');
                }
            } else {
                // Crear nueva semana
                const newId = (weeks.length + 1).toString();
                const newWeek = {
                    id: newId,
                    number: weekNumber || (weeks.length + 1 < 10 ? '0' + (weeks.length + 1) : (weeks.length + 1).toString()),
                    duration: weekDuration || '4 Horas • Laboratorio',
                    status: weekStatus,
                    title: weekTitle,
                    description: weekDesc,
                    topics: topics,
                    tasks: tasks,
                    deliverable: {
                        title: delivTitle || 'Entregable de Laboratorio',
                        status: delivStatus || 'Evaluado',
                        notes: delivNotes
                    },
                    images: [...currentModalImages],
                    image: currentModalImages[0] || ''
                };
                weeks.push(newWeek);
                showAdminToast(`Nueva Semana agregada exitosamente.`, 'success');
            }

            try {
                saveWeeksData(weeks);
            } catch (err) {
                console.error('Error al guardar semanas:', err);
                showAdminToast('El almacenamiento local está lleno. Intenta reducir la cantidad o resolución de imágenes.', 'error');
            }
            closeModal();
        });
    }
}

// Abrir modal para editar o crear semana
window.openEditWeekModal = function(weekId) {
    const editModal = document.getElementById('weekEditModal');
    const weekModalTitle = document.getElementById('weekModalTitle');
    const editWeekId = document.getElementById('editWeekId');
    const editWeekNumber = document.getElementById('editWeekNumber');
    const editWeekDuration = document.getElementById('editWeekDuration');
    const editWeekStatus = document.getElementById('editWeekStatus');
    const editWeekTitle = document.getElementById('editWeekTitle');
    const editWeekDesc = document.getElementById('editWeekDesc');
    const editWeekTopics = document.getElementById('editWeekTopics');
    const editWeekTasks = document.getElementById('editWeekTasks');
    const editDeliverableTitle = document.getElementById('editDeliverableTitle');
    const editDeliverableStatus = document.getElementById('editDeliverableStatus');
    const editDeliverableNotes = document.getElementById('editDeliverableNotes');
    const editImageUrlInput = document.getElementById('editImageUrlInput');
    const editImageFileInput = document.getElementById('editImageFileInput');

    if (!editModal) return;

    if (editImageFileInput) editImageFileInput.value = '';
    if (editImageUrlInput) editImageUrlInput.value = '';

    if (weekId) {
        // Cargar datos de la semana a editar
        const weeks = getWeeksData();
        const week = weeks.find(w => w.id === weekId);
        if (!week) return;

        if (weekModalTitle) weekModalTitle.innerHTML = `<i class="fas fa-edit"></i> Modificar Semana ${week.number || week.id}`;
        if (editWeekId) editWeekId.value = week.id;
        if (editWeekNumber) editWeekNumber.value = week.number || '';
        if (editWeekDuration) editWeekDuration.value = week.duration || '';
        if (editWeekStatus) editWeekStatus.value = week.status || 'completed';
        if (editWeekTitle) editWeekTitle.value = week.title || '';
        if (editWeekDesc) editWeekDesc.value = week.description || '';

        // Formatear topics
        if (editWeekTopics) {
            if (Array.isArray(week.topics)) {
                editWeekTopics.value = week.topics.map(t => typeof t === 'string' ? t : t.name).join(', ');
            } else {
                editWeekTopics.value = '';
            }
        }

        // Formatear tasks
        if (editWeekTasks) {
            if (Array.isArray(week.tasks)) {
                editWeekTasks.value = week.tasks.join('\n');
            } else {
                editWeekTasks.value = '';
            }
        }

        // Entregable
        if (week.deliverable) {
            if (editDeliverableTitle) editDeliverableTitle.value = week.deliverable.title || '';
            if (editDeliverableStatus) editDeliverableStatus.value = week.deliverable.status || '';
            if (editDeliverableNotes) editDeliverableNotes.value = week.deliverable.notes || '';
        } else {
            if (editDeliverableTitle) editDeliverableTitle.value = '';
            if (editDeliverableStatus) editDeliverableStatus.value = '';
            if (editDeliverableNotes) editDeliverableNotes.value = '';
        }

        // Cargar imágenes
        currentModalImages = [...normalizeWeekImages(week)];
        renderModalImagePreviews();
    } else {
        // Nueva semana
        const weeks = getWeeksData();
        const nextNum = weeks.length + 1;
        const nextStr = nextNum < 10 ? '0' + nextNum : nextNum.toString();

        if (weekModalTitle) weekModalTitle.innerHTML = `<i class="fas fa-plus-circle"></i> Agregar Nueva Semana`;
        if (editWeekId) editWeekId.value = '';
        if (editWeekNumber) editWeekNumber.value = nextStr;
        if (editWeekDuration) editWeekDuration.value = '4 Horas • Laboratorio';
        if (editWeekStatus) editWeekStatus.value = 'completed';
        if (editWeekTitle) editWeekTitle.value = `Semana ${nextStr}: `;
        if (editWeekDesc) editWeekDesc.value = '';
        if (editWeekTopics) editWeekTopics.value = '';
        if (editWeekTasks) editWeekTasks.value = '';
        if (editDeliverableTitle) editDeliverableTitle.value = `Laboratorio ${nextStr} - `;
        if (editDeliverableStatus) editDeliverableStatus.value = 'Evaluado (20/20)';
        if (editDeliverableNotes) editDeliverableNotes.value = '';
        currentModalImages = [];
        renderModalImagePreviews();
    }

    editModal.style.display = 'flex';
};

// Eliminar semana
window.deleteWeek = function(weekId) {
    if (!isAdminLoggedIn()) return;
    if (confirm('¿Estás seguro de eliminar esta semana del registro?')) {
        let weeks = getWeeksData();
        weeks = weeks.filter(w => w.id !== weekId);
        saveWeeksData(weeks);
        showAdminToast('Semana eliminada correctamente.', 'info');
    }
};

// ===== VISOR DE IMÁGENES LIGHTBOX CON NAVEGACIÓN =====
let currentLightboxGallery = [];
let currentLightboxIndex = 0;
let currentLightboxCaption = '';

function initLightboxEvents() {
    const lightboxModal = document.getElementById('imageLightboxModal');
    const closeBtn = document.getElementById('closeLightboxBtn');
    const prevBtn = document.getElementById('lightboxPrevBtn');
    const nextBtn = document.getElementById('lightboxNextBtn');

    function closeLightbox() {
        if (lightboxModal) lightboxModal.style.display = 'none';
        currentLightboxGallery = [];
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (lightboxModal) {
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === lightboxModal) closeLightbox();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(-1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(1);
        });
    }

    window.addEventListener('keydown', function(e) {
        if (!lightboxModal || lightboxModal.style.display !== 'flex') return;
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    });
}

function navigateLightbox(direction) {
    if (currentLightboxGallery.length <= 1) return;
    currentLightboxIndex = (currentLightboxIndex + direction + currentLightboxGallery.length) % currentLightboxGallery.length;
    renderLightboxCurrentSlide();
}

function renderLightboxCurrentSlide() {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const prevBtn = document.getElementById('lightboxPrevBtn');
    const nextBtn = document.getElementById('lightboxNextBtn');
    const thumbsContainer = document.getElementById('lightboxThumbs');

    if (!lightboxImage || currentLightboxGallery.length === 0) return;

    lightboxImage.src = currentLightboxGallery[currentLightboxIndex];
    if (lightboxCaption) {
        lightboxCaption.textContent = currentLightboxCaption || 'Evidencia de Laboratorio';
    }

    if (lightboxCounter) {
        lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxGallery.length}`;
        lightboxCounter.style.display = currentLightboxGallery.length > 1 ? 'inline-block' : 'none';
    }

    if (prevBtn) prevBtn.style.display = currentLightboxGallery.length > 1 ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = currentLightboxGallery.length > 1 ? 'flex' : 'none';

    // Miniaturas inferiores para saltar directamente a una imagen
    if (thumbsContainer) {
        if (currentLightboxGallery.length > 1) {
            thumbsContainer.style.display = 'flex';
            let thumbsHtml = '';
            currentLightboxGallery.forEach((src, idx) => {
                const activeClass = idx === currentLightboxIndex ? 'active' : '';
                thumbsHtml += `
                    <div class="lightbox-thumb-item ${activeClass}" onclick="setLightboxIndex(${idx})" title="Ver imagen #${idx + 1}">
                        <img src="${src}" alt="Thumb #${idx + 1}">
                    </div>
                `;
            });
            thumbsContainer.innerHTML = thumbsHtml;
        } else {
            thumbsContainer.style.display = 'none';
            thumbsContainer.innerHTML = '';
        }
    }
}

window.setLightboxIndex = function(index) {
    if (index >= 0 && index < currentLightboxGallery.length) {
        currentLightboxIndex = index;
        renderLightboxCurrentSlide();
    }
};

// Abrir lightbox para una semana específica
window.openWeekGalleryModal = function(weekId, initialIndex = 0) {
    const weeks = getWeeksData();
    const week = weeks.find(w => w.id === weekId);
    if (!week) return;

    const images = normalizeWeekImages(week);
    if (images.length === 0) return;

    currentLightboxGallery = images;
    currentLightboxIndex = (initialIndex >= 0 && initialIndex < images.length) ? initialIndex : 0;
    currentLightboxCaption = `Semana ${week.number || week.id}: ${week.title}`;

    const lightboxModal = document.getElementById('imageLightboxModal');
    if (lightboxModal) {
        lightboxModal.style.display = 'flex';
        renderLightboxCurrentSlide();
    }
};

// Abrir imagen en lightbox (soporta array de imágenes o URL individual)
window.openImageLightbox = function(srcOrArray, captionOrIndex, optionalCaption) {
    if (Array.isArray(srcOrArray)) {
        currentLightboxGallery = srcOrArray;
        currentLightboxIndex = typeof captionOrIndex === 'number' ? captionOrIndex : 0;
        currentLightboxCaption = optionalCaption || '';
    } else if (typeof srcOrArray === 'string') {
        currentLightboxGallery = [srcOrArray];
        currentLightboxIndex = 0;
        currentLightboxCaption = typeof captionOrIndex === 'string' ? captionOrIndex : '';
    } else {
        return;
    }

    const lightboxModal = document.getElementById('imageLightboxModal');
    if (lightboxModal) {
        lightboxModal.style.display = 'flex';
        renderLightboxCurrentSlide();
    }
};

// Toast flotante
function showAdminToast(message, type = 'success') {
    const container = document.getElementById('adminToastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `admin-toast ${type}`;
    const icon = type === 'success' ? 'fa-check-circle' : (type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle');
    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${escapeHtml(message)}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ===== Console Message =====
console.log('%c¡Hola Developer! 👋', 'color: #64ffda; font-size: 20px; font-weight: bold;');
console.log('%cModo Admin disponible: Contraseña predeterminada "admin"', 'color: #64ffda; font-size: 13px;');



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
            activePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });
}

// ===== Animación de la barra de progreso total =====
function initProgressBar() {
    const progressBar = document.querySelector('.progress-bar-fill');
    
    if (!progressBar) return;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // La barra ya tiene el width en el HTML, pero podemos animarla desde 0
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

// ===== Agregar navegación por teclado =====
function initWeeksKeyboardNavigation() {
    const weekButtons = document.querySelectorAll('.week-nav-btn');
    let currentIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        // Solo funciona si estamos en la sección de semanas
        const weeksSection = document.getElementById('semanas');
        if (!weeksSection) return;
        
        const rect = weeksSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (!isInView) return;
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            
            if (e.key === 'ArrowRight') {
                currentIndex = Math.min(currentIndex + 1, weekButtons.length - 1);
            } else {
                currentIndex = Math.max(currentIndex - 1, 0);
            }
            
            weekButtons[currentIndex].click();
        }
    });
}

// ===== Funciones de semanas ya integradas en initializeApp() de arriba =====
