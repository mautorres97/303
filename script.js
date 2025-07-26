// Initialize navigation after DOM loads
function initializeNavigation() {
    // DOM Elements
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const buyTicketsBtn = document.getElementById('buy-tickets');

    console.log('Hamburger element:', hamburger);
    console.log('Nav menu element:', navMenu);

    // Mobile Navigation Toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked!');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log('Hamburger has active class:', hamburger.classList.contains('active'));
            console.log('Nav menu has active class:', navMenu.classList.contains('active'));
        });

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Handle keyboard navigation
        document.addEventListener('keydown', function(e) {
            // Close mobile menu with Escape key
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    } else {
        console.error('Hamburger or nav-menu not found!');
    }
}


// Enlaces a Boletia ahora son enlaces <a> directos, no necesitan JavaScript

// Navbar scroll effect
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.event-card, .contact-form, .contact-info').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Preload critical assets
function preloadAssets() {
    // Preload Google Fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'style';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&display=swap';
    document.head.appendChild(fontLink);
}

// WebP detection
function checkWebP(callback) {
    const webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation first
    initializeNavigation();
    
    preloadAssets();
    
    // Check WebP support
    checkWebP(function(support) {
        if (!support) {
            document.documentElement.classList.add('no-webp');
        }
    });
    
    // Add loading class to body
    document.body.classList.add('loaded');
});


// Performance optimization: Debounce scroll event
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

// Apply debounced scroll handler
const debouncedScrollHandler = debounce(function() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.borderBottom = '1px solid #404040';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.borderBottom = '1px solid #303030';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add smooth reveal animation on page load
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
    
    // Ensure hero background is fully loaded
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.opacity = window.innerWidth <= 480 ? '0.5' : '0.4';
    }
});

// Initialize page with opacity 0
document.body.style.opacity = '0';

// Preload hero background image
const heroImage = new Image();
heroImage.onload = function() {
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.opacity = window.innerWidth <= 480 ? '0.5' : '0.4';
    }
};

// Determine which image to preload based on screen size
if (window.innerWidth <= 480) {
    heroImage.src = 'assets/images/_DSC0935 copia.jpg';
} else {
    heroImage.src = 'assets/images/RMMedios-150.jpg';
}
