// Animations for DS AI Solutions

document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect for hero section
    const typewriterElement = document.querySelector('.typewriter');
    
    if (typewriterElement) {
        const words = JSON.parse(typewriterElement.getAttribute('data-text'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100; // Speed in milliseconds
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Remove a character
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Faster when deleting
            } else {
                // Add a character
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100; // Normal speed when typing
            }
            
            // Word is complete
            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at the end of the word
                isDeleting = true;
                typeSpeed = 1000; // Pause before starting to delete
            } 
            // Word is deleted
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; // Move to next word
                typeSpeed = 500; // Pause before typing next word
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start the typing effect
        setTimeout(type, 1000);
    }

    // Fade-in animations for sections
    function fadeInOnScroll() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .team-member');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            // Element is in viewport
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Apply initial styles for fade-in animation
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .team-member');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on page load
    fadeInOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', fadeInOnScroll);
    
    // Number counter animation for stats
    function animateNumbers() {
        const statItems = document.querySelectorAll('.stat-item h3');
        
        statItems.forEach(item => {
            const target = parseInt(item.textContent.replace(/\+/g, '').trim());
            let startValue = 0;
            const duration = 2000; // milliseconds
            const interval = 50; // update interval
            const increment = target / (duration / interval);
            
            const counter = setInterval(() => {
                startValue += increment;
                
                if (startValue >= target) {
                    item.textContent = `${Math.floor(target)}+`;
                    clearInterval(counter);
                } else {
                    item.textContent = `${Math.floor(startValue)}+`;
                }
            }, interval);
        });
    }
    
    // Animate numbers when they come into view
    function checkForNumberAnimation() {
        const statsSection = document.querySelector('.stats-container');
        if (!statsSection) return;
        
        const statsSectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (statsSectionTop < windowHeight - 100 && !statsSection.classList.contains('animated')) {
            statsSection.classList.add('animated');
            animateNumbers();
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkForNumberAnimation);
    
    // Initial check
    checkForNumberAnimation();
});