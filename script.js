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

// Gestion du formulaire CTA
document.addEventListener('DOMContentLoaded', function() {
    const ctaForm = document.getElementById('cta-form');
    
    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(ctaForm);
            const submission = {
                name: String(formData.get('name') || '').trim(),
                email: String(formData.get('email') || '').trim(),
                age: String(formData.get('age') || '').trim(),
                profession: String(formData.get('profession') || '').trim()
            };

            if (!submission.name || !submission.email || !submission.age || !submission.profession) {
                showSuccessMessage('Veuillez remplir tous les champs avant l’envoi.');
                return;
            }

            // Prépare un message prêt à être envoyé par email.
            // Un vrai envoi automatique nécessite un backend ou un service comme EmailJS.
            const emailBody = [
                `Nom: ${submission.name}`,
                `Courriel: ${submission.email}`,
                `Âge: ${submission.age}`,
                `Profession: ${submission.profession}`
            ].join('\n');

            console.log('Formulaire CTA:', submission);
            console.log('Corps du courriel préparé:\n' + emailBody);

            showSuccessMessage('Merci ! Vos informations ont été enregistrées.');

            // Réinitialiser le formulaire après 2 secondes
            setTimeout(function() {
                ctaForm.reset();
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
    successMsg.textContent = `✓ ${message}`;
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
    
    // Observer tous les éléments avec la classe 'animate'
    document.querySelectorAll('.feature-card, .story-card, .persona-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Gestion de la navigation active
function addNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Retirer la classe active de tous les liens
            navLinks.forEach(l => l.style.borderBottom = 'none');
            
            // Ajouter la classe active au lien cliqué
            this.style.borderBottom = '3px solid #FF6B35';
        });
    });
}

// Animation des chiffres statistiques
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Ajouter une animation de compteur au chargement
window.addEventListener('load', function() {
    const statsElements = document.querySelectorAll('.stat-value');
    
    statsElements.forEach(el => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !el.dataset.animated) {
                    el.dataset.animated = true;
                    
                    // Extraire le chiffre du texte
                    const text = el.textContent;
                    const number = parseInt(text.match(/\d+/)[0]);
                    
                    animateCounter(el, number, 1500);
                    observer.unobserve(el);
                }
            });
        });
        
        observer.observe(el);
    });
});

// Smooth scroll pour les ancres
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

// Ajouter l'animation CSS
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
    
    @keyframes slideInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Détection du mode sombre (optionnel, basé sur les préférences système)
function initDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // L'utilisateur préfère le mode sombre
        // Vous pouvez ajouter une classe 'dark-mode' au body ici
    }
}

initDarkMode();
