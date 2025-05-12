// Testimonial Slider
document.addEventListener('DOMContentLoaded', function() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const slideCount = testimonials.length;
    
    function showSlide(index) {
        // Handle index boundary
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;
        
        // Update current slide
        currentSlide = index;
        
        // Hide all slides and remove active class
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Show current slide
        testimonials[currentSlide].classList.add('active');
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    // Event listeners for controls
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }
    
    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto slide every 5 seconds
    let slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // Pause auto slide on hover
    const testimonialContainer = document.querySelector('.testimonials-slider');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        });
    }
    
    // Initialize slider
    showSlide(currentSlide);
});