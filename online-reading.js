// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');

// Toggle mobile menu
mobileMenuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    
    // Change icon based on menu state
    if (mobileNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (!mobileNav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
        mobileNav.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
    });
});

// Add hover effect to reading cards
document.querySelectorAll('.reading-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('empty-card')) {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('empty-card')) {
            this.style.transform = 'translateY(-5px) scale(1)';
        } else {
            this.style.transform = 'none';
        }
    });
});

// Add click animation to reading cards
document.querySelectorAll('.reading-card:not(.empty-card)').forEach(card => {
    card.addEventListener('click', function(e) {
        // Add click animation
        this.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // For empty links, prevent default and show message
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            
            // Create and show a temporary message
            const message = document.createElement('div');
            message.textContent = 'Resource coming soon!';
            message.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: var(--primary-blue);
                color: white;
                padding: 15px 25px;
                border-radius: 8px;
                z-index: 10000;
                font-weight: bold;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                animation: fadeInOut 2s ease forwards;
            `;
            
            document.body.appendChild(message);
            
            // Add animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
                    10% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    90% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                message.remove();
                style.remove();
            }, 2000);
        }
    });
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
    }
    
    // Tab key navigation - focus trap for mobile menu
    if (mobileNav.classList.contains('active')) {
        const focusableElements = mobileNav.querySelectorAll('a, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });
});