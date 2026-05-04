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

// Mission point click effects
document.querySelectorAll('.mission-point').forEach(point => {
    point.addEventListener('click', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'translateY(-10px) scale(1)';
        }, 150);
    });
});

// Add number counting animation for mission points
function animateMissionPoints() {
    const points = document.querySelectorAll('.mission-point');
    
    points.forEach((point, index) => {
        const numberSpan = point.querySelector('.point-number span');
        if (numberSpan) {
            // Animate the number
            numberSpan.style.transform = 'scale(0)';
            setTimeout(() => {
                numberSpan.style.transform = 'scale(1)';
                numberSpan.style.transition = 'transform 0.5s ease';
            }, 100 * (index + 1));
        }
    });
}

// Vision quote animation
const visionQuote = document.querySelector('.vision-quote');
if (visionQuote) {
    visionQuote.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    visionQuote.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// Info item hover effects
document.querySelectorAll('.info-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.info-icon');
        if (icon) {
            icon.style.transform = 'rotate(15deg) scale(1.1)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.info-icon');
        if (icon) {
            icon.style.transform = 'rotate(0) scale(1)';
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

// Scroll animation for mission points
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const missionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate the point icon
            const icon = entry.target.querySelector('.point-icon');
            if (icon) {
                setTimeout(() => {
                    icon.style.transform = 'rotate(15deg) scale(1.1)';
                    setTimeout(() => {
                        icon.style.transform = 'rotate(0) scale(1)';
                    }, 300);
                }, 300);
            }
        }
    });
}, observerOptions);

// Observe all mission points
document.querySelectorAll('.mission-point').forEach(point => {
    missionObserver.observe(point);
});

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for transition effects
    document.body.classList.add('loaded');
    
    // Animate mission points
    animateMissionPoints();
    
    // Set focus to main content for screen readers
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus();
    }
    
    // Add click effect to vision commitment
    const visionCommitment = document.querySelector('.vision-commitment');
    if (visionCommitment) {
        visionCommitment.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
});

// Smooth scroll for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add parallax effect to mission statement
window.addEventListener('scroll', () => {
    const missionStatement = document.querySelector('.mission-statement');
    if (missionStatement) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.1;
        missionStatement.style.transform = `translateY(${rate}px)`;
    }
});

// Add print styles functionality
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + P for print preview
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
});