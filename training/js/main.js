document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Header scroll effect with blur
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.webkitBackdropFilter = 'blur(20px)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.webkitBackdropFilter = 'blur(20px)';
        }
    });
    
    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            const link = document.querySelector('.nav-link[href*="' + sectionId + '"]');
            if (!link) {
//                console.log('Link not found for section ' + sectionId);
                return;
            }
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    //    // Form submission with validation
    //    const contactForm = document.getElementById('contactForm');
    //    if (contactForm) {
    //        contactForm.addEventListener('submit', function(e) {
    //            e.preventDefault();
    //
    //            // Add subtle animation to button
    //            const submitButton = this.querySelector('button[type="submit"]');
    //            submitButton.style.transform = 'scale(0.98)';
    //            setTimeout(() => {
    //                submitButton.style.transform = 'scale(1)';
    //            }, 200);
    //
    //            setTimeout(() => {
    //                alert('Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.');
    //                contactForm.reset();
    //            }, 300);
    //        });
    //    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add subtle parallax effect to hero section
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                heroSection.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
            }
        });
    }
    
    // Add subtle hover effects to cards
    const cards = document.querySelectorAll('.course-card, .price-card, .benefit-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        });
    });
});
