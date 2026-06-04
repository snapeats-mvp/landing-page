/* ============================================
   FONCTIONNALITÉS JAVASCRIPT
   ============================================ */

// Fonction pour scroller vers une section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Gestion du formulaire CTA avec Formspree
document.addEventListener('DOMContentLoaded', function() {
    const ctaForm = document.getElementById('cta-form');
    
    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            const submitBtn = ctaForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';
            
            // Formspree gère la soumission automatiquement
            // Le bouton revient à la normale après quelques secondes
            setTimeout(function() {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Ajouter des animations au scroll
    addScrollAnimations();
    
    // Ajouter les événements de navigation
    addNavigation();
});

// Fonction pour afficher un message de succès
function showSuccessMessage(message) {
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = message;
    successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        font-weight: 600;
        animation: slideInRight 0.5s ease;
        z-index: 3000;
    `;
    
    document.body.appendChild(successMsg);
    
    // Retirer après 3 secondes
    setTimeout(function() {
        successMsg.remove();
    }, 3000);
}

// Ajouter des animations au scroll
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animer les cartes au scroll
    const elements = document.querySelectorAll('.story-card, .feature-card, .persona-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Ajouter les événements de navigation
function addNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const sectionId = this.getAttribute('href').substring(1);
                scrollToSection(sectionId);
            }
        });
    });
}

// Animation au scroll (slideInRight)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);