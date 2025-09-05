// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.episode-card, .resource-card, .feature, .contact-method');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form handling
const contactForm = document.querySelector('.contact-form form');
const newsletterForm = document.querySelector('.newsletter-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Por favor, preencha todos os campos.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor, insira um email válido.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Mensagem enviada com sucesso! Entraremos em contacto em breve.', 'success');
        this.reset();
    });
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (!email) {
            showNotification('Por favor, insira o seu email.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor, insira um email válido.', 'error');
            return;
        }
        
        showNotification('Subscrição realizada com sucesso!', 'success');
        this.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Podcast player simulation
const playButtons = document.querySelectorAll('.play-btn, .btn-outline');

playButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Toggle play/pause icon
        const icon = this.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-play')) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                showNotification('A reproduzir episódio...', 'success');
            } else {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                showNotification('Reprodução pausada.', 'info');
            }
        } else {
            showNotification('Episódio iniciado!', 'success');
        }
    });
});

// Progress bar animation
function animateProgressBar() {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 2;
            if (progress > 100) {
                progress = 100;
                clearInterval(interval);
            }
            bar.style.width = progress + '%';
        }, 1000);
    });
}

// Initialize progress bar animation after page load
window.addEventListener('load', () => {
    setTimeout(animateProgressBar, 2000);
});

// Parallax effect for hero shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Enter key to submit forms
    if (e.key === 'Enter' && e.target.matches('input, textarea')) {
        const form = e.target.closest('form');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
});

// Add hover effects for better UX
document.querySelectorAll('.btn, .episode-card, .resource-card').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = this.style.transform.replace('translateY(0)', 'translateY(-5px)');
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = this.style.transform.replace('translateY(-5px)', 'translateY(0)');
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Navbar background change
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Parallax effect
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 10);

window.addEventListener('scroll', debouncedScrollHandler); 

// --- Episodes Data + Rendering + Search Functionality ---
document.addEventListener('DOMContentLoaded', function() {
    console.log('Search functionality initializing...');

    // If we are on episodes.html (or prototype), render the law areas dynamically
    const lawAreasRootContainer = document.querySelector('.law-areas .container');
    const isPrototype = document.body.classList.contains('prototype');

    // Data model for law areas, subdivisions, and episodes
    const episodesData = lawAreasRootContainer ? [
        {
            icon: 'fas fa-balance-scale',
            area: 'Direito Civil',
            description: 'Fundamentos e princípios do direito privado português',
            subdivisions: [
                {
                    title: 'Introdução ao Direito Civil',
                    // In prototype mode, provide multiple topics (sub-topics) each possibly with episodes
                    topics: isPrototype ? [
                        {
                            title: 'Conceitos Fundamentais',
                            description: 'Definições‑chave do Direito Civil, sujeitos de direito, relações jurídicas e factos jurídicos. Introduz a noção de capacidade, personalidade e eficácia das situações jurídicas no quotidiano. Ideal para criar bases sólidas para os restantes tópicos.',
                            speakers: [
                                {
                                    name: 'Dr. António Silva',
                                    role: 'Professor Catedrático',
                                    institution: 'Faculdade de Direito da Universidade de Lisboa',
                                    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=250&fit=crop&crop=face',
                                    fullImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=500&fit=crop&crop=face',
                                    description: 'Especialista em Direito Civil com mais de 20 anos de experiência académica e prática.'
                                },
                                {
                                    name: 'Dra. Maria Santos',
                                    role: 'Advogada e Investigadora',
                                    institution: 'Centro de Investigação Jurídica',
                                    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=250&fit=crop&crop=face',
                                    fullImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=500&fit=crop&crop=face',
                                    description: 'Doutorada em Direito Civil, autora de diversos artigos científicos na área.'
                                }
                            ],
                            items: [
                                { number: 'Ep. 01', title: 'Conceitos Fundamentais', description: 'Introdução aos conceitos básicos do Direito Civil Português', duration: '45 min', date: '15 Mar 2024', videoId: 'mCFMn0UkRt0' },
                                { number: 'Ep. 02', title: 'Pessoas e Personalidade', description: 'Personalidade jurídica e capacidade das pessoas', duration: '52 min', date: '22 Mar 2024', videoId: 'mCFMn0UkRt0' },
                                { number: 'Ep. 02a', title: 'Capacidade Jurídica', description: 'Capacidade de gozo e de exercício', duration: '36 min', date: '25 Mar 2024', videoId: 'mCFMn0UkRt0' }
                            ]
                        },
                        {
                            title: 'Estrutura do Ordenamento',
                            description: 'Como as fontes do direito se articulam: Constituição, leis, regulamentos e costume. Abordamos também a hierarquia normativa e os critérios de resolução de conflitos entre normas.',
                            speakers: [
                                {
                                    name: 'Prof. João Costa',
                                    role: 'Professor Associado',
                                    institution: 'Faculdade de Direito da Universidade do Porto',
                                    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=250&fit=crop&crop=face',
                                    fullImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=500&fit=crop&crop=face',
                                    description: 'Especialista em Teoria do Direito e Filosofia Jurídica.'
                                },
                                {
                                    name: 'Dr. Pedro Almeida',
                                    role: 'Juiz Desembargador',
                                    institution: 'Tribunal da Relação de Lisboa',
                                    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=250&fit=crop&crop=face',
                                    fullImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=500&fit=crop&crop=face',
                                    description: 'Com vasta experiência na interpretação e aplicação das fontes do direito.'
                                }
                            ],
                            items: [
                                { number: 'Ep. 02b', title: 'Fontes do Direito', description: 'Leis, costumes e princípios gerais', duration: '30 min', date: '28 Mar 2024', videoId: 'mCFMn0UkRt0' }
                            ]
                        }
                    ] : undefined,
                    items: isPrototype ? undefined : [
                        { number: 'Ep. 01', title: 'Conceitos Fundamentais', description: 'Introdução aos conceitos básicos do Direito Civil Português', duration: '45 min', date: '15 Mar 2024', videoId: 'mCFMn0UkRt0' },
                        { number: 'Ep. 02', title: 'Pessoas e Personalidade', description: 'Personalidade jurídica e capacidade das pessoas', duration: '52 min', date: '22 Mar 2024', videoId: 'mCFMn0UkRt0' },
                    ],
                },
                {
                    title: 'Direito das Obrigações',
                    topics: isPrototype ? [
                        {
                            title: 'Contratos - Parte I',
                            description: 'Formação do contrato: negociações preliminares, proposta e aceitação. Analisamos ainda os defeitos da vontade e a proteção das partes durante a formação do vínculo.',
                            speakers: [
                                {
                                    name: 'Dra. Ana Ferreira',
                                    role: 'Advogada Especialista',
                                    institution: 'Sociedade de Advogados Ferreira & Associados',
                                    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=250&fit=crop&crop=face',
                                    fullImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=500&fit=crop&crop=face',
                                    description: 'Especialista em Direito dos Contratos com 15 anos de experiência prática.'
                                },
                                {
                                    name: 'Prof. Carlos Mendes',
                                    role: 'Professor Catedrático',
                                    institution: 'Faculdade de Direito da Universidade de Coimbra',
                                    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=250&fit=crop&crop=face',
                                    fullImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=500&fit=crop&crop=face',
                                    description: 'Autor de diversos livros sobre Direito das Obrigações e Contratos.'
                                }
                            ],
                            items: [
                                { number: 'Ep. 03', title: 'Contratos - Parte I', description: 'Formação e elementos essenciais dos contratos', duration: '48 min', date: '29 Mar 2024', videoId: 'mCFMn0UkRt0' },
                                { number: 'Ep. 03a', title: 'Vícios da Vontade', description: 'Erro, dolo e coação na formação dos contratos', duration: '44 min', date: '1 Abr 2024', videoId: 'mCFMn0UkRt0' }
                            ]
                        },
                        {
                            title: 'Contratos - Parte II',
                            description: 'Efeitos, cumprimento, mora e incumprimento; resolução e outras causas de extinção. Inclui panorama prático sobre cláusulas típicas e meios de tutela do credor.',
                            speakers: [
                                {
                                    name: 'Dr. Ricardo Oliveira',
                                    role: 'Advogado e Arbitro',
                                    institution: 'Câmara de Arbitragem de Lisboa',
                                    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=250&fit=crop&crop=face',
                                    fullImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=500&fit=crop&crop=face',
                                    description: 'Especialista em resolução de litígios contratuais e arbitragem.'
                                },
                                {
                                    name: 'Dra. Sofia Martins',
                                    role: 'Professora Auxiliar',
                                    institution: 'Faculdade de Direito da Universidade Nova de Lisboa',
                                    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=250&fit=crop&crop=face',
                                    fullImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=500&fit=crop&crop=face',
                                    description: 'Investigadora em Direito das Obrigações e Responsabilidade Civil.'
                                }
                            ],
                            items: [
                                { number: 'Ep. 04', title: 'Contratos - Parte II', description: 'Execução e extinção das obrigações contratuais', duration: '55 min', date: '5 Abr 2024', videoId: 'mCFMn0UkRt0' }
                            ]
                        }
                    ] : undefined,
                    items: isPrototype ? undefined : [
                        { number: 'Ep. 03', title: 'Contratos - Parte I', description: 'Formação e elementos essenciais dos contratos', duration: '48 min', date: '29 Mar 2024', videoId: 'mCFMn0UkRt0' },
                        { number: 'Ep. 04', title: 'Contratos - Parte II', description: 'Execução e extinção das obrigações contratuais', duration: '55 min', date: '5 Abr 2024', videoId: 'mCFMn0UkRt0' },
                    ],
                },
                {
                    title: 'Direito das Coisas',
                    topics: isPrototype ? [
                        {
                            title: 'Propriedade e Posse',
                            description: 'Conceitos de propriedade, posse e tutela possessória; aquisição e perda do domínio. Exemplos do dia a dia para distinguir detenção, composse e usucapião.',
                            speakers: [
                                {
                                    name: 'Prof. Luís Pereira',
                                    role: 'Professor Catedrático',
                                    institution: 'Faculdade de Direito da Universidade de Lisboa',
                                    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
                                    fullImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop&crop=face',
                                    description: 'Especialista em Direito das Coisas e Propriedade Intelectual.'
                                },
                                {
                                    name: 'Dr. Francisco Costa',
                                    role: 'Notário',
                                    institution: 'Conservatória do Registo Predial de Lisboa',
                                    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
                                    fullImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop&crop=face',
                                    description: 'Com vasta experiência em registos prediais e propriedade imobiliária.'
                                }
                            ],
                            items: [
                                { number: 'Ep. 05', title: 'Propriedade e Posse', description: 'Conceitos fundamentais do direito de propriedade', duration: '50 min', date: '12 Abr 2024', videoId: 'mCFMn0UkRt0' },
                                { number: 'Ep. 05a', title: 'Aquisição e Perda da Propriedade', description: 'Modos de aquisição e perda do direito de propriedade', duration: '41 min', date: '16 Abr 2024', videoId: 'mCFMn0UkRt0' }
                            ]
                        }
                    ] : undefined,
                    items: isPrototype ? undefined : [
                        { number: 'Ep. 05', title: 'Propriedade e Posse', description: 'Conceitos fundamentais do direito de propriedade', duration: '50 min', date: '12 Abr 2024', videoId: 'mCFMn0UkRt0' },
                    ],
                },
            ],
        },
        {
            icon: 'fas fa-gavel',
            area: 'Direito Penal',
            description: 'Princípios e aplicação do direito penal português',
            subdivisions: [
                {
                    title: 'Introdução ao Direito Penal',
                    topics: isPrototype ? [
                        { 
                            title: 'Princípios Fundamentais', 
                            description: 'Legalidade, anterioridade, irretroatividade, necessidade e outras pedras basilares do ius puniendi. Enquadramento constitucional e implicações práticas na atuação dos tribunais.',
                            speakers: [
                                {
                                    name: 'Prof. Manuel Santos',
                                    role: 'Professor Catedrático',
                                    institution: 'Faculdade de Direito da Universidade de Coimbra',
                                    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
                                    fullImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=face',
                                    description: 'Especialista em Direito Penal e Processo Penal.'
                                },
                                {
                                    name: 'Dra. Isabel Rodrigues',
                                    role: 'Procuradora da República',
                                    institution: 'Ministério Público de Lisboa',
                                    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
                                    fullImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=800&fit=crop&crop=face',
                                    description: 'Com vasta experiência na aplicação dos princípios penais.'
                                }
                            ],
                            items: [ { number: 'Ep. 06', title: 'Princípios Fundamentais', description: 'Princípios constitucionais do direito penal', duration: '47 min', date: '19 Abr 2024', videoId: 'mCFMn0UkRt0' } ] 
                        }
                    ] : undefined,
                    items: isPrototype ? undefined : [
                        { number: 'Ep. 06', title: 'Princípios Fundamentais', description: 'Princípios constitucionais do direito penal', duration: '47 min', date: '19 Abr 2024', videoId: 'mCFMn0UkRt0' },
                    ],
                },
                {
                    title: 'Teoria do Crime',
                    topics: isPrototype ? [
                        { 
                            title: 'Tipicidade e Antijuridicidade', 
                            description: 'Estrutura do crime: tipo legal, ilicitude, causas de justificação e análise dogmática. Discutimos exemplos práticos de legítima defesa e estado de necessidade.',
                            speakers: [
                                {
                                    name: 'Dr. José Silva',
                                    role: 'Juiz Criminal',
                                    institution: 'Tribunal Judicial de Lisboa',
                                    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
                                    description: 'Especialista em teoria do crime e causas de justificação.'
                                },
                                {
                                    name: 'Prof. Ana Costa',
                                    role: 'Professora Auxiliar',
                                    institution: 'Faculdade de Direito da Universidade do Porto',
                                    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
                                    description: 'Investigadora em culpabilidade e imputabilidade penal.'
                                }
                            ],
                            items: [ { number: 'Ep. 07', title: 'Tipicidade e Antijuridicidade', description: 'Elementos objetivos do tipo penal', duration: '53 min', date: '26 Abr 2024', videoId: 'mCFMn0UkRt0' }, { number: 'Ep. 07a', title: 'Culpabilidade', description: 'Imputabilidade e dolo/culpa', duration: '39 min', date: '30 Abr 2024', videoId: 'mCFMn0UkRt0' } ] 
                        }
                    ] : undefined,
                    items: isPrototype ? undefined : [
                        { number: 'Ep. 07', title: 'Tipicidade e Antijuridicidade', description: 'Elementos objetivos do tipo penal', duration: '53 min', date: '26 Abr 2024', videoId: 'mCFMn0UkRt0' },
                    ],
                },
            ],
        },
        {
            icon: 'fas fa-building',
            area: 'Direito Administrativo',
            description: 'Relações entre a Administração Pública e os cidadãos',
            subdivisions: [
                {
                    title: 'Fundamentos do Direito Administrativo',
                    topics: isPrototype ? [
                        { 
                            title: 'Conceito e Princípios', 
                            description: 'Administração Pública, interesse público e pilares como legalidade, proporcionalidade e boa‑fé. Inclui noções de organização administrativa e tutela jurisdicional.',
                            speakers: [
                                {
                                    name: 'Prof. Miguel Alves',
                                    role: 'Professor Catedrático',
                                    institution: 'Faculdade de Direito da Universidade de Lisboa',
                                    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                                    description: 'Especialista em Direito Administrativo e Ciência Política.'
                                },
                                {
                                    name: 'Dra. Teresa Lima',
                                    role: 'Advogada Especialista',
                                    institution: 'Sociedade de Advogados Lima & Associados',
                                    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
                                    description: 'Especialista em contencioso administrativo e direito público.'
                                }
                            ],
                            items: [ { number: 'Ep. 08', title: 'Conceito e Princípios', description: 'Introdução aos princípios fundamentais', duration: '49 min', date: '3 Mai 2024', videoId: 'mCFMn0UkRt0' }, { number: 'Ep. 08a', title: 'Princípio da Legalidade', description: 'Limites e vinculação da Administração', duration: '37 min', date: '6 Mai 2024', videoId: 'mCFMn0UkRt0' } ] 
                        }
                    ] : undefined,
                    items: isPrototype ? undefined : [
                        { number: 'Ep. 08', title: 'Conceito e Princípios', description: 'Introdução aos princípios fundamentais', duration: '49 min', date: '3 Mai 2024', videoId: 'mCFMn0UkRt0' },
                    ],
                },
                {
                    title: 'Atos Administrativos',
                    topics: isPrototype ? [
                        { 
                            title: 'Formação e Validade', 
                            description: 'Ciclo de vida do ato administrativo, requisitos, eficácia e anulabilidade. Contraste entre nulidade e anulabilidade e consequências para os particulares.',
                            speakers: [
                                {
                                    name: 'Dr. Paulo Santos',
                                    role: 'Juiz Administrativo',
                                    institution: 'Tribunal Central Administrativo',
                                    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                                    description: 'Especialista em controlo jurisdicional da Administração.'
                                },
                                {
                                    name: 'Prof. Catarina Silva',
                                    role: 'Professora Auxiliar',
                                    institution: 'Faculdade de Direito da Universidade Nova de Lisboa',
                                    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
                                    description: 'Investigadora em atos administrativos e procedimento administrativo.'
                                }
                            ],
                            items: [ { number: 'Ep. 09', title: 'Formação e Validade', description: 'Elementos e requisitos dos atos administrativos', duration: '51 min', date: '10 Mai 2024', videoId: 'mCFMn0UkRt0' } ] 
                        }
                    ] : undefined,
                    items: isPrototype ? undefined : [
                        { number: 'Ep. 09', title: 'Formação e Validade', description: 'Elementos e requisitos dos atos administrativos', duration: '51 min', date: '10 Mai 2024', videoId: 'mCFMn0UkRt0' },
                    ],
                },
            ],
        },
        {
            icon: 'fas fa-landmark',
            area: 'Direito Constitucional',
            description: 'Constituição da República Portuguesa e direitos fundamentais',
            subdivisions: [
                {
                    title: 'Direitos Fundamentais',
                    topics: isPrototype ? [
                        { 
                            title: 'Direitos, Liberdades e Garantias', 
                            description: 'Catálogo de direitos na CRP, regime de restrições, reserva de lei e teste de proporcionalidade. Casos ilustrativos sobre colisão de direitos e ponderação judicial.',
                            speakers: [
                                {
                                    name: 'Prof. Rui Costa',
                                    role: 'Professor Catedrático',
                                    institution: 'Faculdade de Direito da Universidade de Coimbra',
                                    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
                                    description: 'Especialista em Direito Constitucional e Direitos Fundamentais.'
                                },
                                {
                                    name: 'Dra. Margarida Oliveira',
                                    role: 'Advogada Constitucionalista',
                                    institution: 'Sociedade de Advogados Costa & Oliveira',
                                    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
                                    description: 'Especialista em litígios constitucionais e direitos humanos.'
                                }
                            ],
                            items: [ { number: 'Ep. 10', title: 'Direitos, Liberdades e Garantias', description: 'Análise dos direitos fundamentais na CRP', duration: '54 min', date: '17 Mai 2024', videoId: 'mCFMn0UkRt0' }, { number: 'Ep. 10a', title: 'Restrições a Direitos', description: 'Reserva de lei e proporcionalidade', duration: '42 min', date: '21 Mai 2024', videoId: 'mCFMn0UkRt0' } ] 
                        }
                    ] : undefined,
                    items: isPrototype ? undefined : [
                        { number: 'Ep. 10', title: 'Direitos, Liberdades e Garantias', description: 'Análise dos direitos fundamentais na CRP', duration: '54 min', date: '17 Mai 2024', videoId: 'mCFMn0UkRt0' },
                    ],
                },
            ],
        },
        {
            icon: 'fas fa-chart-line',
            area: 'Direito Comercial',
            description: 'Direito das sociedades e atividades comerciais',
            subdivisions: [
                {
                    title: 'Direito das Sociedades',
                    topics: isPrototype ? [
                        { 
                            title: 'Sociedades Comerciais', 
                            description: 'Tipos societários, constituição e organização interna: poderes e responsabilidades dos órgãos. Inclui notas sobre deveres dos administradores e responsabilidade perante sócios e terceiros.',
                            speakers: [
                                {
                                    name: 'Prof. André Mendes',
                                    role: 'Professor Catedrático',
                                    institution: 'Faculdade de Direito da Universidade de Lisboa',
                                    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                                    description: 'Especialista em Direito das Sociedades e Direito Comercial.'
                                },
                                {
                                    name: 'Dr. Fernando Silva',
                                    role: 'Advogado Especialista',
                                    institution: 'Sociedade de Advogados Silva & Associados',
                                    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
                                    description: 'Especialista em constituição e reestruturação de sociedades.'
                                }
                            ],
                            items: [ { number: 'Ep. 11', title: 'Sociedades Comerciais', description: 'Tipos de sociedades e sua constituição', duration: '56 min', date: '24 Mai 2024', videoId: 'mCFMn0UkRt0' }, { number: 'Ep. 11a', title: 'Órgãos Sociais', description: 'Assembleia geral, administração e fiscalização', duration: '38 min', date: '28 Mai 2024', videoId: 'mCFMn0UkRt0' } ] 
                        }
                    ] : undefined,
                    items: isPrototype ? undefined : [
                        { number: 'Ep. 11', title: 'Sociedades Comerciais', description: 'Tipos de sociedades e sua constituição', duration: '56 min', date: '24 Mai 2024', videoId: 'mCFMn0UkRt0' },
                    ],
                },
            ],
        },
    ] : null;

    function createEpisodeItem(item) {
        const div = document.createElement('div');
        div.className = 'episode-item';
        const videoId = item.videoId || 'mCFMn0UkRt0'; // Default fallback video
        div.innerHTML = `
            <div class="episode-content">
                <div class="episode-text">
                    <span class="episode-number">${item.number}</span>
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <div class="episode-meta">
                        <span><i class="fas fa-clock"></i> ${item.duration}</span>
                        <span><i class="fas fa-calendar"></i> ${item.date}</span>
                    </div>
                </div>
                <div class="episode-thumbnail">
                    <div class="video-thumbnail" data-video-id="${videoId}">
                        <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg"
                             alt="Thumbnail"
                             onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'; this.onerror=function(){this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMjA0MDQwIi8+Cjx0ZXh0IHg9IjE2MCIgeT0iOTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNFRUE0NEEiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+RGlyZWl0byBFZHVjYXRpdm8gPC90ZXh0Pgo8L3N2Zz4=';}"
                             loading="lazy">
                        <div class="play-overlay">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return div;
    }

    function createSubdivisionCard(subdivision) {
        const card = document.createElement('div');
        card.className = 'subdivision-card';
        card.innerHTML = `<h3>${subdivision.title}</h3>`;
        if (isPrototype && subdivision.topics) {
            // Render topics as nested dropdowns
            const topicsContainer = document.createElement('div');
            topicsContainer.className = 'topics-accordion';
            subdivision.topics.forEach(topic => {
                const topicSection = document.createElement('div');
                topicSection.className = 'topic-section';
                const episodeCount = (topic.items || []).length;
                const topicDescription = topic.description || 'Descrição breve do tópico para contextualizar os episódios.';
                
                // Create speakers section if speakers exist
                let speakersHTML = '';
                if (topic.speakers && topic.speakers.length > 0) {
                    speakersHTML = `
                        <div class="speakers-section">
                            <h5><i class="fas fa-users"></i> Apresentadores</h5>
                            <div class="speakers-grid">
                                ${topic.speakers.map(speaker => `
                                    <div class="speaker-card">
                                        <div class="speaker-image" data-speaker-name="${speaker.name}" data-speaker-role="${speaker.role}" data-speaker-institution="${speaker.institution}" data-speaker-description="${speaker.description}" data-full-image="${speaker.fullImage || speaker.image}">
                                            <img src="${speaker.image}" alt="${speaker.name}" loading="lazy" 
                                                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDE2MCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNjAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2IiByeD0iOCIgcnk9IjgiLz4KPHRleHQgeD0iODAiIHk9IjUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5OTk5IiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPkF2YXRhcjwvdGV4dD4KPC9zdmc+'">
                                        </div>
                                        <div class="speaker-info">
                                            <h6>${speaker.name}</h6>
                                            <p class="speaker-role">${speaker.role}</p>
                                            <p class="speaker-institution">${speaker.institution}</p>
                                            <p class="speaker-description">${speaker.description}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }
                
                topicSection.innerHTML = `
                    <div class="topic-header" tabindex="0" role="button" aria-expanded="false">
                        <div class="topic-header-left">
                            <h4>${topic.title}</h4>
                            <span class="topic-meta">${episodeCount} episódio${episodeCount === 1 ? '' : 's'}</span>
                        </div>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="topic-content">
                        <p class="topic-description">${topicDescription}</p>
                        ${speakersHTML}
                        <div class="episode-list"></div>
                    </div>
                `;
                const episodeList = topicSection.querySelector('.episode-list');
                (topic.items || []).forEach(item => episodeList.appendChild(createEpisodeItem(item)));
                topicsContainer.appendChild(topicSection);
            });
            card.appendChild(topicsContainer);
        } else {
            const list = document.createElement('div');
            list.className = 'episode-list';
            (subdivision.items || []).forEach(item => list.appendChild(createEpisodeItem(item)));
            card.appendChild(list);
        }
        return card;
    }

    function renderLawAreaSection(areaData) {
        const section = document.createElement('div');
        section.className = 'law-area-section';
        section.innerHTML = `
            <div class="area-header">
                <i class="${areaData.icon}"></i>
                <div class="header-content">
                    <h2>${areaData.area}</h2>
                    <p>${areaData.description}</p>
                </div>
            </div>
            <div class="law-area-accordion-content"></div>
        `;
        const content = section.querySelector('.law-area-accordion-content');
        // render subdivisions each in its own block (no shared grid)
        areaData.subdivisions.forEach(sub => {
            const row = document.createElement('div');
            row.className = 'subdivisions-grid';
            row.appendChild(createSubdivisionCard(sub));
            content.appendChild(row);
        });
        return section;
    }

    if (lawAreasRootContainer && episodesData) {
        // Clear any server-rendered content (should be empty after our HTML change)
        lawAreasRootContainer.innerHTML = '';
        episodesData.forEach(area => lawAreasRootContainer.appendChild(renderLawAreaSection(area)));
        // In prototype mode, collapse all topics by default and attach listeners
        if (isPrototype) {
            const topicHeaders = document.querySelectorAll('.topic-header');
            topicHeaders.forEach(header => {
                const section = header.parentElement;
                header.addEventListener('click', () => {
                    const open = section.classList.toggle('open');
                    header.setAttribute('aria-expanded', open ? 'true' : 'false');
                });
                header.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        header.click();
                    }
                });
            });
        }
    }

    // Simple fuzzy match (Levenshtein distance)
    function levenshtein(a, b) {
        const matrix = [];
        let i;
        for (i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        let j;
        for (j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
        for (i = 1; i <= b.length; i++) {
            for (j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // substitution
                        matrix[i][j - 1] + 1,     // insertion
                        matrix[i - 1][j] + 1      // deletion
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    }

    function isFuzzyMatch(query, text) {
        query = query.toLowerCase();
        text = text.toLowerCase();
        if (text.includes(query)) return true;
        // Split text into words and check each word
        const words = text.split(/\s+/);
        const threshold = query.length > 6 ? 2 : 1; // more permissive for short queries
        for (const word of words) {
            if (levenshtein(query, word) <= threshold) {
                return true;
            }
        }
        // Also check the whole string with a higher threshold for long queries
        if (query.length > 6 && levenshtein(query, text) <= 3) return true;
        return false;
    }

    const searchForm = document.getElementById('episode-search-form');
    const searchInput = document.getElementById('episode-search-input');
    if (!searchForm || !searchInput) {
        console.error('Required search elements not found');
        return;
    }

    // Detect which structure: index.html (episodes-grid) or episodes.html (episode-list)
    const episodesGrid = document.querySelector('.episodes-grid');
    const episodeLists = document.querySelectorAll('.episode-list');
    const isIndex = !!episodesGrid;
    const isEpisodes = episodeLists.length > 0;

    function filterIndexEpisodes(query) {
        const episodeCards = Array.from(episodesGrid.querySelectorAll('.episode-card'));
        let anyVisible = false;
        episodeCards.forEach(card => {
            const title = card.querySelector('h3').textContent;
            const desc = card.querySelector('p').textContent;
            if (!query || isFuzzyMatch(query, title) || isFuzzyMatch(query, desc)) {
                card.style.display = '';
                anyVisible = true;
            } else {
                card.style.display = 'none';
            }
        });
        // Show/hide no results message
        let noResults = document.getElementById('no-episodes-found');
        if (!anyVisible) {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.id = 'no-episodes-found';
                noResults.className = 'no-results-message';
                noResults.innerHTML = `
                    <div style="text-align: center; padding: 3rem 1rem; color: #666;">
                        <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; color: #ccc;"></i>
                        <h3 style="margin-bottom: 0.5rem; color: #333;">Nenhum episódio encontrado</h3>
                        <p style="margin: 0; color: #666;">Tente usar termos diferentes ou verificar a ortografia.</p>
                        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; color: #999;">Pesquisa: "${query}"</p>
                    </div>
                `;
                episodesGrid.parentNode.insertBefore(noResults, episodesGrid.nextSibling);
            }
        } else if (noResults) {
            noResults.remove();
        }
    }

    // Add a container for unified search results
    let unifiedResultsContainer = null;

    function filterEpisodesPage(query) {
        let anyVisible = false;
        // Hide all no-results messages first
        document.querySelectorAll('#no-episodes-found, .no-results-message, .no-episodes-found').forEach(el => el.remove());
        // Remove previous unified results if any
        if (unifiedResultsContainer) {
            unifiedResultsContainer.remove();
            unifiedResultsContainer = null;
        }
        const lawAreas = document.querySelectorAll('.law-area-section');
        // If query is empty, show all law areas and restore all items
        if (!query) {
            if (lawAreasRootContainer) lawAreasRootContainer.style.display = '';
            lawAreas.forEach(area => {
                area.style.display = 'block';
                area.style.width = '100%';
                area.style.maxWidth = '100%';
            });
            document.querySelectorAll('.episode-item').forEach(item => item.style.display = '');
            document.querySelectorAll('.subdivision-card').forEach(card => card.style.display = '');
            const globalNoResults = document.getElementById('no-episodes-found');
            if (globalNoResults) globalNoResults.remove();
            return;
        }
        // Gather all matching episodes
        const allItems = Array.from(document.querySelectorAll('.episode-item'));
        const matches = allItems.filter(item => {
            const title = item.querySelector('h4').textContent;
            const desc = item.querySelector('p').textContent;
            return isFuzzyMatch(query, title) || isFuzzyMatch(query, desc);
        });
        // Show unified results if any
        if (matches.length > 0) {
            anyVisible = true;
            // Keep accordions visible below; just ensure they are collapsed
            if (lawAreasRootContainer) lawAreasRootContainer.style.display = '';
            lawAreas.forEach(section => {
                section.classList.remove('open');
                const header = section.querySelector('.area-header');
                if (header) header.setAttribute('aria-expanded', 'false');
            });
            // Create a container for results if not present
            unifiedResultsContainer = document.createElement('div');
            unifiedResultsContainer.className = 'law-area-section';
            unifiedResultsContainer.style.marginTop = '2rem';
            unifiedResultsContainer.innerHTML = `
                <div class="area-header">
                    <i class="fas fa-search"></i>
                    <h2>Resultados da Pesquisa (${matches.length} episódio${matches.length > 1 ? 's' : ''})</h2>
                </div>
                <div class="subdivisions-grid">
                    <div class="subdivision-card">
                        <div class="episode-list"></div>
                    </div>
                </div>
            `;
            // Append matching items to the unified list
            const unifiedList = unifiedResultsContainer.querySelector('.episode-list');
            matches.forEach(item => {
                const clonedItem = item.cloneNode(true);
                // Make sure the cloned item is visible
                clonedItem.style.display = '';
                unifiedList.appendChild(clonedItem);
            });
            // Insert the unified results after the episodes header
            const header = document.querySelector('.episodes-header');
            if (header && header.parentNode) {
                header.parentNode.insertBefore(unifiedResultsContainer, header.nextSibling);
            }
        } else {
            // If nothing visible anywhere, show a global message
            let globalNoResults = document.getElementById('no-episodes-found');
            if (!globalNoResults) {
                globalNoResults = document.createElement('div');
                globalNoResults.id = 'no-episodes-found';
                globalNoResults.className = 'no-results-message';
                globalNoResults.innerHTML = `
                    <div style="text-align: center; padding: 3rem 1rem; color: #666;">
                        <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; color: #ccc;"></i>
                        <h3 style="margin-bottom: 0.5rem; color: #333;">Nenhum episódio encontrado</h3>
                        <p style="margin: 0; color: #666;">Tente usar termos diferentes ou verificar a ortografia.</p>
                        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; color: #999;">Pesquisa: "${query}"</p>
                    </div>
                `;
                const container = document.querySelector('.law-areas .container');
                if (container) {
                    // Ensure the original dropdowns remain visible under the message
                    if (lawAreasRootContainer) lawAreasRootContainer.style.display = '';
                    // Ensure original dropdowns remain visible
                    lawAreas.forEach(area => {
                        area.style.display = 'block';
                        area.style.width = '100%';
                        area.style.maxWidth = '100%';
                    });
                    allItems.forEach(item => item.style.display = '');
                    document.querySelectorAll('.subdivision-card').forEach(card => card.style.display = '');
                    // Insert message before the dropdowns
                    container.insertBefore(globalNoResults, container.firstChild);
                }
            }
        }
    }

    function filterEpisodes(query) {
        if (isIndex) {
            filterIndexEpisodes(query);
        } else if (isEpisodes) {
            filterEpisodesPage(query);
        }
    }

    // Debounce input
    let debounceTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            filterEpisodes(this.value.trim());
        }, 200);
    });

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Search form submitted');
        filterEpisodes(searchInput.value.trim());
        // Scroll to episodes section
        const target = document.querySelector('.episodes-header') || document.querySelector('.law-areas');
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Optional: clear search on Escape
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            filterEpisodes('');
        }
    });

    console.log('Search functionality initialized successfully');
}); 

// --- Law Area Accordion ---
document.addEventListener('DOMContentLoaded', function() {
    console.log('Accordion functionality initializing...');
    const lawAreaSections = document.querySelectorAll('.law-area-section');
    console.log('Found law area sections:', lawAreaSections.length);
    
    lawAreaSections.forEach((section, idx) => {
        const header = section.querySelector('.area-header');
        if (header) {
            header.tabIndex = 0;
            header.setAttribute('role', 'button');
            header.setAttribute('aria-expanded', section.classList.contains('open'));
            
            header.addEventListener('click', function(e) {
                console.log('Header clicked:', section.querySelector('h2').textContent);
                const isCurrentlyOpen = section.classList.contains('open');
                
                if (isCurrentlyOpen) {
                    // If already open, just close it
                    section.classList.remove('open');
                    header.setAttribute('aria-expanded', 'false');
                    console.log('Section closed');
                } else {
                    // If closed, just open it (don't close others)
                    section.classList.add('open');
                    header.setAttribute('aria-expanded', 'true');
                    console.log('Section opened');
                }
            });
            
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const isCurrentlyOpen = section.classList.contains('open');
                    
                    if (isCurrentlyOpen) {
                        // If already open, just close it
                        section.classList.remove('open');
                        header.setAttribute('aria-expanded', 'false');
                    } else {
                        // If closed, just open it (don't close others)
                        section.classList.add('open');
                        header.setAttribute('aria-expanded', 'true');
                    }
                }
            });
        }
        // Ensure all sections start closed
        section.classList.remove('open');
        header.setAttribute('aria-expanded', 'false');
    });
    console.log('Accordion functionality initialized - all sections start closed');
});

// --- YouTube Player Modal Functionality ---
document.addEventListener('DOMContentLoaded', function() {
    console.log('YouTube player functionality initializing...');

    // Create YouTube modal HTML
    const youtubeModal = document.createElement('div');
    youtubeModal.className = 'youtube-modal';
    youtubeModal.innerHTML = `
        <div class="youtube-modal-content">
            <button class="youtube-modal-close">&times;</button>
            <div class="youtube-modal-loading" style="display: none;">
                <div class="loading-spinner"></div>
                <p>Carregando vídeo...</p>
            </div>
            <iframe width="100%" height="100%" src="" frameborder="0" allowfullscreen style="display: none;"></iframe>
        </div>
    `;
    document.body.appendChild(youtubeModal);

    // Create Image modal HTML
    const imageModal = document.createElement('div');
    imageModal.className = 'image-modal';
    imageModal.innerHTML = `
        <div class="image-modal-content">
            <button class="image-modal-close">&times;</button>
            <img src="" alt="Speaker Image">
            <div class="image-modal-info">
                <h4></h4>
                <p></p>
            </div>
        </div>
    `;
    document.body.appendChild(imageModal);

    // Function to open YouTube modal
    function openYouTubeModal(videoId) {
        const iframe = youtubeModal.querySelector('iframe');
        const loadingDiv = youtubeModal.querySelector('.youtube-modal-loading');

        // Show loading state
        loadingDiv.style.display = 'flex';
        iframe.style.display = 'none';

        youtubeModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Use privacy-friendly embed with additional parameters
        iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3`;

        // Handle successful load
        iframe.onload = function() {
            loadingDiv.style.display = 'none';
            iframe.style.display = 'block';
        };

        // Handle iframe load errors
        iframe.onerror = function() {
            console.warn('YouTube embed failed to load');
            loadingDiv.style.display = 'none';
            showNotification('Erro ao carregar o vídeo. Tente novamente mais tarde.', 'error');
            closeYouTubeModal();
        };
    }

    // Function to close YouTube modal
    function closeYouTubeModal() {
        const iframe = youtubeModal.querySelector('iframe');
        const loadingDiv = youtubeModal.querySelector('.youtube-modal-loading');

        iframe.src = ''; // Stop video
        iframe.style.display = 'none';
        loadingDiv.style.display = 'none';
        youtubeModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Function to open Image modal
    function openImageModal(speakerData) {
        const modalImg = imageModal.querySelector('img');
        const modalName = imageModal.querySelector('h4');
        const modalInfo = imageModal.querySelector('p');

        modalImg.src = speakerData.fullImage;
        modalName.textContent = speakerData.name;
        modalInfo.textContent = `${speakerData.role} - ${speakerData.institution}`;

        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Function to close Image modal
    function closeImageModal() {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners for video thumbnails and speaker images
    document.addEventListener('click', function(e) {
        // Handle video thumbnail clicks
        if (e.target.closest('.video-thumbnail')) {
            e.preventDefault();
            const thumbnail = e.target.closest('.video-thumbnail');
            const videoId = thumbnail.getAttribute('data-video-id');
            if (videoId) {
                openYouTubeModal(videoId);
            }
        }

        // Handle watch video button clicks
        if (e.target.closest('.watch-video-btn')) {
            e.preventDefault();
            const button = e.target.closest('.watch-video-btn');
            const videoId = button.getAttribute('data-video-id');
            if (videoId) {
                openYouTubeModal(videoId);
            }
        }

        // Handle speaker image clicks
        if (e.target.closest('.speaker-image')) {
            e.preventDefault();
            const speakerImage = e.target.closest('.speaker-image');
            const speakerData = {
                name: speakerImage.getAttribute('data-speaker-name'),
                role: speakerImage.getAttribute('data-speaker-role'),
                institution: speakerImage.getAttribute('data-speaker-institution'),
                description: speakerImage.getAttribute('data-speaker-description'),
                fullImage: speakerImage.getAttribute('data-full-image')
            };
            openImageModal(speakerData);
        }

        // Handle YouTube modal close button
        if (e.target.classList.contains('youtube-modal-close')) {
            closeYouTubeModal();
        }

        // Handle YouTube modal background click
        if (e.target.classList.contains('youtube-modal')) {
            closeYouTubeModal();
        }

        // Handle image modal close button
        if (e.target.classList.contains('image-modal-close')) {
            closeImageModal();
        }

        // Handle image modal background click
        if (e.target.classList.contains('image-modal')) {
            closeImageModal();
        }
    });

    // Keyboard support for modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (youtubeModal.classList.contains('active')) {
                closeYouTubeModal();
            }
            if (imageModal.classList.contains('active')) {
                closeImageModal();
            }
        }
    });

    console.log('YouTube player functionality initialized successfully');
    
    // Debug: Check if speaker images are loading correctly
    setTimeout(() => {
        const speakerImages = document.querySelectorAll('.speaker-image');
        console.log('Found', speakerImages.length, 'speaker images');
        speakerImages.forEach((img, index) => {
            const computedStyle = window.getComputedStyle(img);
            console.log(`Speaker ${index + 1}:`, {
                width: computedStyle.width,
                height: computedStyle.height,
                src: img.querySelector('img')?.src
            });
        });
    }, 1000);
}); 