// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Add fade-in animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .arrangement-card, .value-card, .contact-card, .hero-content, .section-header');
    animatedElements.forEach(el => observer.observe(el));
    
    // Smooth scrolling for navigation links (if you add them later)
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
    
    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you soon.');
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add parallax effect to hero background
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-bg-image');
    
    if (hero && heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${parallax}px)`;
        });
    }
    
    // Add floating animation delay to elements
    const floatingElements = document.querySelectorAll('.floating-element, .heart-icon');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Stagger animation for grid items
    const gridItems = document.querySelectorAll('.services-grid .service-card, .arrangements-grid .arrangement-card, .values-grid .value-card');
    gridItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add click handlers for service and arrangement cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.service-title').textContent;
            alert(`Learn more about ${title} - This would typically open a detailed page or modal.`);
        });
    });
    
    const arrangementCards = document.querySelectorAll('.arrangement-card');
    arrangementCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the order button
            if (e.target.closest('.btn')) return;
            
            const name = this.querySelector('.arrangement-name').textContent;
            const price = this.querySelector('.arrangement-price').textContent;
            alert(`${name} - ${price}\nThis would typically open a detailed view or add to cart.`);
        });
    });
    
    // Add order button functionality
    const orderButtons = document.querySelectorAll('.arrangement-card .btn-hero');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.arrangement-card');
            const name = card.querySelector('.arrangement-name').textContent;
            const price = card.querySelector('.arrangement-price').textContent;
            alert(`Added ${name} (${price}) to cart!\nThis would typically add the item to a shopping cart.`);
        });
    });
    
    // Social media links (placeholder functionality)
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const iconType = this.querySelector('i').getAttribute('data-lucide');
            alert(`This would open our ${iconType} page.`);
        });
    });
    
    // Add loading animation to form inputs
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = 'hsl(345, 65%, 75%)';
            this.style.boxShadow = '0 0 0 2px hsla(345, 65%, 75%, 0.2)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = 'hsl(32, 20%, 88%)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add scroll-triggered animations for stats
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const animateStats = function() {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const finalNumber = stat.textContent;
                const isNumber = /^\d+/.test(finalNumber);
                
                if (isNumber) {
                    const number = parseInt(finalNumber);
                    let current = 0;
                    const increment = number / 30;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            stat.textContent = finalNumber;
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current) + '+';
                        }
                    }, 50);
                }
            });
        };
        
        // Trigger animation when stats come into view
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    console.log('🌸 Bloom & Petals website loaded successfully!');
});