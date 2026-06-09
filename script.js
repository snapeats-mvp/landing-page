/* ============================================
   FONCTIONNALITÉS JAVASCRIPT - LANDING PAGE
   ============================================ */

// Smooth scroll animation
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Intersection Observer for scroll animations
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

// Handle page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeScrollAnimations();
    
    // Handle form submission
    handleFormSubmission();
    
    // Navbar smooth behavior
    setupNavigation();
    
    // Video autoplay backup
    ensureVideoAutoplay();
});

// Initialize scroll animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.section-title, .benefit-card, .team-card, .audience-card, .step-card'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Handle form submission
function handleFormSubmission() {
    const forms = document.querySelectorAll('.cta-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '✓ Inscription envoyée...';
                
                // Formspree handles the actual submission
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 2000);
            }
        });
    });
}

// Setup navigation with active state
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                smoothScroll(href.substring(1));
                
                // Update active state
                navLinks.forEach(l => l.style.color = 'var(--dark-text)');
                this.style.color = 'var(--primary-color)';
            }
        });
    });
}

// Ensure video autoplay with sound toggle
function ensureVideoAutoplay() {
    const video = document.querySelector('.hero-video-element');
    if (video) {
        // Try to autoplay
        video.play().catch(function() {
            // Autoplay failed, user will need to interact
            console.log('Autoplay prevented - user interaction required');
        });
        
        // Ensure muted attribute
        video.muted = true;
    }
}

// Parallax effect on hero (if needed)
function addParallaxEffect() {
    window.addEventListener('scroll', function() {
        const heroVideo = document.querySelector('.hero-video-background');
        if (heroVideo && window.scrollY < window.innerHeight) {
            const scrolled = window.scrollY;
            heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Add scroll animations on window load
window.addEventListener('load', function() {
    addParallaxEffect();
});

// Intersection Observer fallback for older browsers
if ('IntersectionObserver' in window === false) {
    const animatedElements = document.querySelectorAll('.section-title, .benefit-card, .team-card');
    animatedElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}

// Utility: Log page info (debug)
console.log('SnapEats Landing Page - Loaded Successfully ✓');

// ============================================
// CAROUSEL FUNCTIONALITY - HOW IT WORKS
// ============================================

let currentStep = 1;
const totalSteps = 3;

function nextStep() {
    if (currentStep < totalSteps) {
        goToStep(currentStep + 1);
    } else {
        // Loop back to first step
        goToStep(1);
    }
}

function previousStep() {
    if (currentStep > 1) {
        goToStep(currentStep - 1);
    } else {
        // Loop to last step
        goToStep(totalSteps);
    }
}

function goToStep(stepNumber) {
    // Validate step number
    if (stepNumber < 1 || stepNumber > totalSteps) return;

    // Hide all steps
    for (let i = 1; i <= totalSteps; i++) {
        const stepElement = document.getElementById(`step-${i}`);
        const indicator = document.querySelectorAll('.indicator')[i - 1];

        if (i === stepNumber) {
            // Show current step
            stepElement.classList.add('active');
            stepElement.classList.remove('prev-step');
            indicator.classList.add('active');
        } else if (i < stepNumber) {
            // Previous steps (come from left)
            stepElement.classList.remove('active');
            stepElement.classList.add('prev-step');
            indicator.classList.remove('active');
        } else {
            // Next steps (go to right)
            stepElement.classList.remove('active', 'prev-step');
            indicator.classList.remove('active');
        }
    }

    currentStep = stepNumber;
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    // Only trigger if carousel is in view
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        if (event.key === 'ArrowRight') {
            nextStep();
        } else if (event.key === 'ArrowLeft') {
            previousStep();
        }
    }
});
