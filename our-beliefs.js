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
        document.body.style.overflow = 'hidden';
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
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

// Highlight Bible references on hover
document.querySelectorAll('.bible-ref').forEach(ref => {
    ref.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(212, 175, 55, 0.15)';
        this.style.color = '#8b0000';
    });
    
    ref.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'rgba(139, 0, 0, 0.05)';
        this.style.color = '#8b0000';
    });
});

// Add smooth scrolling for anchor links
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

// Section hover effects
document.querySelectorAll('.belief-section').forEach(section => {
    section.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    section.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px)';
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

// Bible reference copy functionality
document.querySelectorAll('.bible-ref').forEach(ref => {
    ref.addEventListener('click', function() {
        const text = this.textContent;
        navigator.clipboard.writeText(text).then(() => {
            // Show copied message
            const originalText = this.textContent;
            this.textContent = 'Copied!';
            this.style.backgroundColor = 'rgba(0, 128, 0, 0.2)';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = 'rgba(139, 0, 0, 0.05)';
            }, 1500);
        }).catch(err => {
            console.log('Failed to copy: ', err);
        });
    });
});

// Add scroll animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all belief sections
document.querySelectorAll('.belief-section').forEach(section => {
    observer.observe(section);
});

// Initialize page with loaded state
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for transition effects
    document.body.classList.add('loaded');
    
    // Set focus to main content for screen readers
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus();
    }
});