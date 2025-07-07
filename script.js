// Dream On Festival 2025 - Enhanced JavaScript with Loading Screen and AOS

$(document).ready(function() {
    // Initialize loading screen first
    initLoadingScreen();
});

// LOADING SCREEN INITIALIZATION - OTIMIZADA
function initLoadingScreen() {
    const loadingScreen = $('#loading-screen');
    
    // Simulate loading for only 1.5 seconds (reduced from 3)
    setTimeout(() => {
        // Add bounce effect and fade out
        loadingScreen.addClass('fade-out');
        
        // Remove loading screen after animation
        setTimeout(() => {
            loadingScreen.remove();
            
            // Initialize all other components after loading
            initAllComponents();
        }, 600); // Reduced from 800
    }, 1500); // Reduced from 3000
}

// INITIALIZE ALL COMPONENTS
function initAllComponents() {
    // Initialize AOS with optimized settings
    AOS.init({
        duration: 600, // Reduced from 800
        easing: 'ease-out-cubic',
        once: true,
        mirror: false,
        offset: 30, // Reduced from 50
        delay: 0,
        anchorPlacement: 'top-bottom'
    });
    
    initNavigation();
    initHeroSlider();
    initInteractiveParticles();
    initCountdown();
    initFloatingElements();
    initMagneticButtons();
    initArtistModals();
    initPhotoModals();
    initMobileShimmer();
    initPhotoStrip();
    initPerformanceOptimizations();
    initTypewriterEffect();
}

// Enhanced Navigation with smooth morphing
function initNavigation() {
    const header = $('#header');
    const mobileMenuBtn = $('#mobile-menu-btn');
    const closeMenuBtn = $('#close-menu-btn');
    const mobileMenu = $('#mobile-menu');
    const navLinks = $('.nav-link, .mobile-nav-link');

    // Header scroll effect with throttling
    let ticking = false;
    function updateHeader() {
        if ($(window).scrollTop() > 80) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
        }
        ticking = false;
    }

    $(window).scroll(function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // Enhanced mobile menu toggle
    mobileMenuBtn.click(function() {
        mobileMenu.addClass('active');
        $('body').css('overflow', 'hidden');
        
        // Animate hamburger to X
        const spans = $(this).find('span');
        spans.eq(0).css('transform', 'rotate(45deg) translate(5px, 5px)');
        spans.eq(1).css('opacity', '0');
        spans.eq(2).css('transform', 'rotate(-45deg) translate(7px, -6px)');
    });

    closeMenuBtn.click(function() {
        closeMobileMenu();
    });

    function closeMobileMenu() {
        mobileMenu.removeClass('active');
        $('body').css('overflow', 'auto');
        
        // Reset hamburger
        const spans = mobileMenuBtn.find('span');
        spans.css({
            'transform': '',
            'opacity': ''
        });
    }

    // Close mobile menu when clicking outside
    mobileMenu.click(function(e) {
        if (e.target === this) {
            closeMobileMenu();
        }
    });

    // Enhanced smooth scroll for navigation links
    navLinks.click(function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        const targetOffset = $(target).offset().top - 70;
        
        $('html, body').animate({
            scrollTop: targetOffset
        }, 800, 'easeInOutCubic');

        // Close mobile menu if open
        closeMobileMenu();
    });

    // Active nav link highlighting
    $(window).scroll(function() {
        const scrollPos = $(window).scrollTop() + 120;
        
        $('section[id]').each(function() {
            const section = $(this);
            const sectionTop = section.offset().top;
            const sectionHeight = section.outerHeight();
            const sectionId = section.attr('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.removeClass('active');
                $(`.nav-link[href="#${sectionId}"], .mobile-nav-link[href="#${sectionId}"]`).addClass('active');
            }
        });
    });
}

// CORRIGIDO: Enhanced Hero Slider - Funciona no Mobile e Desktop
function initHeroSlider() {
    let currentSlide = 0;
    const isMobile = $(window).width() <= 768;
    
    // Seleciona as imagens corretas baseado no dispositivo
    const slides = isMobile ? $('.hero-slide.mobile') : $('.hero-slide.desktop');
    const totalSlides = slides.length;
    
    console.log(`Dispositivo: ${isMobile ? 'Mobile' : 'Desktop'}, Total de slides: ${totalSlides}`);

    function showSlide(index) {
        // Remove active de todos os slides
        $('.hero-slide').removeClass('active');
        
        // Adiciona active apenas no slide correto
        if (isMobile) {
            $('.hero-slide.mobile').eq(index).addClass('active');
        } else {
            $('.hero-slide.desktop').eq(index).addClass('active');
        }
        
        console.log(`Mostrando slide ${index + 1} de ${totalSlides}`);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Inicializa o primeiro slide
    showSlide(0);
    
    // Auto-advance slides a cada 3 segundos
    setInterval(nextSlide, 3000);
    
    // Recarrega o slider se a tela for redimensionada
    $(window).resize(function() {
        const newIsMobile = $(window).width() <= 768;
        if (newIsMobile !== isMobile) {
            location.reload(); // Recarrega a página para reinicializar o slider
        }
    });
}

// REDUCED Interactive Particles System
function initInteractiveParticles() {
    const heroSection = $('.hero-section');
    const particlesContainer = $('<div class="hero-particles"></div>');
    heroSection.append(particlesContainer);
    
    const particleCount = 15; // Reduced from 25
    const particles = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = $('<div class="particle"></div>');
        particle.css({
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 6 + 's',
            animationDuration: (4 + Math.random() * 6) + 's'
        });
        
        particlesContainer.append(particle);
        particles.push(particle);
    }
    
    // Mouse interaction with particles (simplified)
    let mouseX = 0, mouseY = 0;
    
    heroSection.mousemove(function(e) {
        const rect = this.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        mouseY = ((e.clientY - rect.top) / rect.height) * 100;
        
        particles.forEach((particle, index) => {
            if (index % 3 === 0) { // Only affect every 3rd particle for performance
                const particleX = parseFloat(particle.css('left'));
                const particleY = parseFloat(particle.css('top'));
                
                const distance = Math.sqrt(
                    Math.pow(mouseX - particleX, 2) + Math.pow(mouseY - particleY, 2)
                );
                
                if (distance < 12) {
                    const angle = Math.atan2(mouseY - particleY, mouseX - particleX);
                    const force = (12 - distance) / 12;
                    
                    particle.css({
                        transform: `translate(${-Math.cos(angle) * force * 15}px, ${-Math.sin(angle) * force * 15}px) scale(${1 + force * 0.5})`,
                        opacity: 0.7 + force * 0.3
                    });
                }
            }
        });
    });
    
    heroSection.mouseleave(function() {
        particles.forEach(particle => {
            particle.css({
                transform: '',
                opacity: ''
            });
        });
    });
}

// TYPEWRITER EFFECT SUAVIZADO para Hero Title
function initTypewriterEffect() {
    const title = $('.hero-title');
    const text = 'DREAM ON';
    let index = 0;
    
    title.text('');
    
    function typeWriter() {
        if (index < text.length) {
            title.text(title.text() + text.charAt(index));
            index++;
            setTimeout(typeWriter, 80); // Reduced from 150 to 80 - mais suave
        }
    }
    
    // Start typewriter effect immediately after loading screen
    setTimeout(typeWriter, 200); // Reduced from 500 to 200
}

// MAGNETIC BUTTONS EFFECT
function initMagneticButtons() {
    $('.btn-primary, .btn-secondary, .ticket-btn').each(function() {
        const button = $(this);
        
        button.mousemove(function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = Math.max(rect.width, rect.height);
            
            if (distance < maxDistance) {
                const strength = (maxDistance - distance) / maxDistance;
                const moveX = (x / maxDistance) * 8 * strength;
                const moveY = (y / maxDistance) * 8 * strength;
                
                button.css({
                    transform: `translate(${moveX}px, ${moveY}px) scale(${1 + strength * 0.05})`
                });
            }
        });
        
        button.mouseleave(function() {
            button.css({
                transform: ''
            });
        });
    });
}

// Enhanced Countdown Timer
function initCountdown() {
    const targetDate = new Date('2025-09-14T18:00:00-03:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Animate number changes
            animateNumber('#days', days, 3);
            animateNumber('#hours', hours, 2);
            animateNumber('#minutes', minutes, 2);
            animateNumber('#seconds', seconds, 2);
        } else {
            $('#days, #hours, #minutes, #seconds').text('00');
        }
    }

    function animateNumber(selector, newValue, padding) {
        const element = $(selector);
        const currentValue = parseInt(element.text()) || 0;
        const paddedValue = String(newValue).padStart(padding, '0');
        
        if (currentValue !== newValue) {
            element.addClass('updating');
            element.css({
                transform: 'scale(1.1)',
                color: 'var(--dream-silver)'
            });
            
            setTimeout(() => {
                element.text(paddedValue);
                element.css({
                    transform: 'scale(1)',
                    color: 'var(--dream-gold)'
                });
                element.removeClass('updating');
            }, 150);
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// REDUCED Floating Elements
function initFloatingElements() {
    const elements = $('.floating-element');
    
    elements.each(function(index) {
        const element = $(this);
        const randomDelay = Math.random() * 2;
        const randomDuration = 6 + Math.random() * 6;
        
        element.css({
            'animation-delay': randomDelay + 's',
            'animation-duration': randomDuration + 's'
        });
    });

    // Enhanced mouse interaction
    elements.hover(
        function() {
            $(this).css({
                'animation-play-state': 'paused',
                'transform': 'scale(1.3) rotate(90deg)',
                'opacity': '1'
            });
        },
        function() {
            $(this).css({
                'animation-play-state': 'running',
                'transform': '',
                'opacity': ''
            });
        }
    );
}

// Enhanced Artist Modals
function initArtistModals() {
    const modal = $('#artist-modal');
    const modalBody = $('#modal-body');
    const closeBtn = $('.modal-close');

    const artistData = {
        'mystic-owl': {
            name: 'Mystic Owl',
            genre: 'Progressive House',
            time: '22:30 - Palco Principal',
            bio: 'Mystic Owl é um dos principais nomes da cena progressive house mundial. Com mais de 15 anos de carreira, já se apresentou nos maiores festivais do planeta.',
            image: 'https://images.pexels.com/photos/1694980/pexels-photo-1694980.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
            social: {
                instagram: '@mysticowl',
                facebook: 'MysticOwlOfficial',
                spotify: 'Mystic Owl'
            }
        },
        'luna-frequency': {
            name: 'Luna Frequency',
            genre: 'Techno',
            time: '21:00 - Palco Eletrônico',
            bio: 'Luna Frequency representa a nova geração do techno brasileiro. Suas produções já foram lançadas por grandes selos internacionais.',
            image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
            social: {
                instagram: '@lunafrequency',
                facebook: 'LunaFrequencyOfficial',
                spotify: 'Luna Frequency'
            }
        },
        'astral-tribe': {
            name: 'Astral Tribe',
            genre: 'Deep House',
            time: '20:00 - Palco Chill',
            bio: 'Astral Tribe cria paisagens sonoras únicas que transportam o público para outras dimensões através do deep house mais sofisticado.',
            image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
            social: {
                instagram: '@astraltribe',
                facebook: 'AstralTribeMusic',
                spotify: 'Astral Tribe'
            }
        },
        'quantum-beats': {
            name: 'Quantum Beats',
            genre: 'Psytrance',
            time: '23:30 - Palco Principal',
            bio: 'Quantum Beats é referência no psytrance brasileiro, conhecido por seus sets energéticos que conectam terra e cosmos.',
            image: 'https://images.pexels.com/photos/1644924/pexels-photo-1644924.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
            social: {
                instagram: '@quantumbeats',
                facebook: 'QuantumBeatsOfficial',
                spotify: 'Quantum Beats'
            }
        },
        'cosmic-shaman': {
            name: 'Cosmic Shaman',
            genre: 'Ambient',
            time: '19:00 - Palco Chill',
            bio: 'Cosmic Shaman é um dos pioneiros da música ambient no Brasil, criando experiências sonoras transcendentais.',
            image: 'https://images.pexels.com/photos/1644889/pexels-photo-1644889.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
            social: {
                instagram: '@cosmicshaman',
                facebook: 'CosmicShamanMusic',
                spotify: 'Cosmic Shaman'
            }
        },
        'digital-druid': {
            name: 'Digital Druid',
            genre: 'Drum & Bass',
            time: '21:30 - Palco Eletrônico',
            bio: 'Digital Druid combina elementos orgânicos com beats eletrônicos pesados, criando um som único no drum & bass.',
            image: 'https://images.pexels.com/photos/1644925/pexels-photo-1644925.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
            social: {
                instagram: '@digitaldruid',
                facebook: 'DigitalDruidDnB',
                spotify: 'Digital Druid'
            }
        },
        'neon-oracle': {
            name: 'Neon Oracle',
            genre: 'Synthwave',
            time: '22:00 - Palco Retrô',
            bio: 'Neon Oracle traz de volta os sons dos anos 80 com uma roupagem moderna, criando a trilha sonora perfeita para viagens no tempo.',
            image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
            social: {
                instagram: '@neonoracle',
                facebook: 'NeonOracleMusic',
                spotify: 'Neon Oracle'
            }
        },
        'stellar-voyage': {
            name: 'Stellar Voyage',
            genre: 'Trance',
            time: '00:30 - Palco Principal',
            bio: 'Stellar Voyage é conhecido por seus sets épicos de trance que levam o público em jornadas cósmicas inesquecíveis.',
            image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
            social: {
                instagram: '@stellarvoyage',
                facebook: 'StellarVoyageTrance',
                spotify: 'Stellar Voyage'
            }
        }
    };

    $('.artist-card').click(function() {
        const artistId = $(this).data('artist');
        const artist = artistData[artistId];
        
        if (artist) {
            const modalContent = `
                <div class="text-center">
                    <img src="${artist.image}" alt="${artist.name}" class="w-40 h-40 rounded-full mx-auto mb-6 border-3 border-dream-gold shadow-xl">
                    <h3 class="text-3xl font-mono text-dream-gold mb-3">${artist.name}</h3>
                    <p class="text-dream-silver mb-2 text-lg">${artist.genre}</p>
                    <p class="text-white mb-6 font-semibold">${artist.time}</p>
                    <p class="text-gray-300 mb-8 leading-relaxed max-w-md mx-auto">${artist.bio}</p>
                    <div class="flex justify-center gap-6 flex-wrap">
                        <a href="#" class="text-dream-gold hover:text-dream-silver transition-all duration-300 flex items-center gap-2 bg-dream-accent px-3 py-2 rounded-full">
                            📱 ${artist.social.instagram}
                        </a>
                        <a href="#" class="text-dream-gold hover:text-dream-silver transition-all duration-300 flex items-center gap-2 bg-dream-accent px-3 py-2 rounded-full">
                            👤 ${artist.social.facebook}
                        </a>
                        <a href="#" class="text-dream-gold hover:text-dream-silver transition-all duration-300 flex items-center gap-2 bg-dream-accent px-3 py-2 rounded-full">
                            🎵 ${artist.social.spotify}
                        </a>
                    </div>
                </div>
            `;
            
            modalBody.html(modalContent);
            modal.fadeIn(300);
            $('body').css('overflow', 'hidden');
        }
    });

    // Close modal
    closeBtn.click(function() {
        modal.fadeOut(300);
        $('body').css('overflow', 'auto');
    });

    $(window).click(function(e) {
        if (e.target === modal[0]) {
            modal.fadeOut(300);
            $('body').css('overflow', 'auto');
        }
    });
}

// Enhanced Photo Modals
function initPhotoModals() {
    const photoModal = $('#photo-modal');
    const modalPhoto = $('#modal-photo');
    const closeBtn = $('.modal-close');

    $('.strip-photo, .grid-photo, .gallery-image').click(function() {
        const src = $(this).attr('src');
        const alt = $(this).attr('alt');
        
        modalPhoto.attr('src', src).attr('alt', alt);
        photoModal.fadeIn(300);
        $('body').css('overflow', 'hidden');
    });

    // Close modal
    closeBtn.click(function() {
        photoModal.fadeOut(300);
        $('body').css('overflow', 'auto');
    });

    $(window).click(function(e) {
        if (e.target === photoModal[0]) {
            photoModal.fadeOut(300);
            $('body').css('overflow', 'auto');
        }
    });
}

// Enhanced Mobile Shimmer Effect
function initMobileShimmer() {
    if ($(window).width() <= 768) {
        let currentButton = 0;
        
        function applyShimmer() {
            $('#btn-primary, #btn-secondary').removeClass('shimmer');
            
            if (currentButton === 0) {
                $('#btn-primary').addClass('shimmer');
            } else {
                $('#btn-secondary').addClass('shimmer');
            }
            
            currentButton = (currentButton + 1) % 2;
        }
        
        applyShimmer();
        setInterval(applyShimmer, 3000);
    }
}

// Enhanced Photo Strip Scroll Animation
function initPhotoStrip() {
    const stripPhotos = $('.strip-photo');
    
    if (stripPhotos.length > 0) {
        let ticking = false;
        
        function checkPhotoVisibility() {
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();
            
            stripPhotos.each(function(index) {
                const photo = $(this);
                const photoTop = photo.offset().top;
                const photoCenter = photoTop + photo.outerHeight() / 2;
                
                const visibilityStart = scrollTop + windowHeight * 0.8;
                const visibilityEnd = scrollTop + windowHeight * 0.2;
                
                if (photoCenter < visibilityStart && photoCenter > visibilityEnd) {
                    setTimeout(() => {
                        photo.addClass('visible');
                    }, index * 100);
                } else {
                    photo.removeClass('visible');
                }
            });
            
            ticking = false;
        }
        
        $(window).on('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(checkPhotoVisibility);
                ticking = true;
            }
        });
        
        checkPhotoVisibility();
    }
}

// Enhanced Performance Optimizations
function initPerformanceOptimizations() {
    // Add will-change property to animated elements
    $('.artist-card, .ticket-card, .gallery-image').addClass('will-change-transform');
    $('.floating-element, .particle').addClass('will-change-transform');
    
    // Remove will-change after animations complete
    setTimeout(() => {
        $('.will-change-transform').removeClass('will-change-transform');
    }, 6000);

    // Preload critical images
    const criticalImages = [
        'https://images.pexels.com/photos/1540319/pexels-photo-1540319.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
        'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
        'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
        'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=768&h=1024&fit=crop',
        'https://images.pexels.com/photos/1694980/pexels-photo-1694980.jpeg?auto=compress&cs=tinysrgb&w=768&h=1024&fit=crop',
        'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=768&h=1024&fit=crop'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Optimize scroll performance
    let scrollTimeout;
    $(window).scroll(function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            // Scroll ended
        }, 100);
    });
}

// Add custom easing functions
$.easing.easeInOutCubic = function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
};

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    .updating {
        animation: numberFlip 0.3s ease;
    }
    
    @keyframes numberFlip {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); color: var(--dream-silver); }
        100% { transform: scale(1); color: var(--dream-gold); }
    }
    
    .shimmer {
        position: relative;
        overflow: hidden;
    }
    
    .shimmer::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        animation: shimmer 1.5s ease-in-out;
    }
    
    @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
    }
`;
document.head.appendChild(style);