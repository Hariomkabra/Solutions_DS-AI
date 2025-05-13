// Form Validation for DS AI Solutions

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Validate inputs
            let isValid = true;
            
            // Simple validation - check if fields are empty
            if (!nameInput.value.trim()) {
                markInvalid(nameInput, 'Please enter your name');
                isValid = false;
            } else {
                markValid(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                markInvalid(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                markInvalid(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                markValid(emailInput);
            }
            
            if (!subjectInput.value.trim()) {
                markInvalid(subjectInput, 'Please enter a subject');
                isValid = false;
            } else {
                markValid(subjectInput);
            }
            
            if (!messageInput.value.trim()) {
                markInvalid(messageInput, 'Please enter your message');
                isValid = false;
            } else {
                markValid(messageInput);
            }
            
            // If form is valid, submit it
            if (isValid) {
                // In a real application, you would send this to your server
                showSuccessMessage();
                contactForm.reset();
            }
        });
        
        // Add input event listeners for real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                // Remove error state when user starts typing
                this.classList.remove('invalid');
                this.classList.remove('valid');
                
                // Remove error message if it exists
                const errorElement = this.parentElement.querySelector('.error-message');
                if (errorElement) {
                    errorElement.remove();
                }
            });
            
            input.addEventListener('blur', function() {
                // Validate on blur
                if (this.id === 'email' && this.value.trim()) {
                    if (!isValidEmail(this.value)) {
                        markInvalid(this, 'Please enter a valid email address');
                    } else {
                        markValid(this);
                    }
                } else if (this.value.trim()) {
                    markValid(this);
                }
            });
        });
    }
    
    // Helper Functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function markInvalid(element, message) {
        element.classList.add('invalid');
        element.classList.remove('valid');
        
        // Remove any existing error message
        const existingError = element.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--error)';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '4px';
        
        element.parentElement.appendChild(errorElement);
    }
    
    function markValid(element) {
        element.classList.remove('invalid');
        element.classList.add('valid');
        
        // Remove any existing error message
        const existingError = element.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function showSuccessMessage() {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <div>
                    <h4>Message Sent!</h4>
                    <p>Thank you for contacting us. We'll respond shortly.</p>
                </div>
                <button class="close-notification"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'var(--success)',
            color: 'white',
            padding: '16px',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: '1000',
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Show the notification with animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Add event listener to close button
        const closeButton = notification.querySelector('.close-notification');
        closeButton.addEventListener('click', () => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
});