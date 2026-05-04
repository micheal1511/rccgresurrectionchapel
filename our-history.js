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

// Timeline Navigation
const timelineButtons = document.querySelectorAll('.timeline-btn');
const timelineItems = document.querySelectorAll('.timeline-item');

timelineButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        timelineButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const year = this.dataset.year;
        
        // Scroll to corresponding timeline item
        const targetItem = document.querySelector(`.timeline-item[data-year="${year}"]`);
        if (targetItem) {
            window.scrollTo({
                top: targetItem.offsetTop - 150,
                behavior: 'smooth'
            });
            
            // Highlight the timeline item
            timelineItems.forEach(item => item.classList.remove('highlighted'));
            targetItem.classList.add('highlighted');
            
            // Remove highlight after 2 seconds
            setTimeout(() => {
                targetItem.classList.remove('highlighted');
            }, 2000);
        }
    });
});

// Timeline scroll animations
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Highlight corresponding timeline button
            const year = entry.target.dataset.year;
            const correspondingButton = document.querySelector(`.timeline-btn[data-year="${year}"]`);
            if (correspondingButton && !correspondingButton.classList.contains('active')) {
                // Add temporary highlight
                correspondingButton.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
                correspondingButton.style.borderColor = 'var(--secondary-gold)';
                
                setTimeout(() => {
                    correspondingButton.style.backgroundColor = '';
                    correspondingButton.style.borderColor = '';
                }, 2000);
            }
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '-100px'
});

// Observe all timeline items
timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Number counting animation for statistics
const statNumbers = document.querySelectorAll('.stat-number');

function animateStatistics() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        const current = parseInt(stat.textContent);
        const increment = target / 100;
        let count = current;
        
        const timer = setInterval(() => {
            count += increment;
            stat.textContent = Math.floor(count);
            
            if (count >= target) {
                stat.textContent = target.toLocaleString();
                clearInterval(timer);
            }
        }, 20);
    });
}

// Trigger statistics animation when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStatistics();
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

// Observe statistics section
const statisticsSection = document.querySelector('.statistics');
if (statisticsSection) {
    statsObserver.observe(statisticsSection);
}

// Timeline item click effects
timelineItems.forEach(item => {
    item.addEventListener('click', function() {
        const marker = this.querySelector('.marker-circle');
        marker.style.transform = 'scale(1.5)';
        marker.style.boxShadow = '0 0 0 8px rgba(212, 175, 55, 0.3)';
        
        setTimeout(() => {
            marker.style.transform = 'scale(1.2)';
            marker.style.boxShadow = '0 0 0 6px rgba(212, 175, 55, 0.2)';
        }, 300);
    });
});

// Detail section hover effects
const detailSections = document.querySelectorAll('.detail-section');
detailSections.forEach(section => {
    section.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.detail-icon');
        if (icon) {
            icon.style.transform = 'rotate(15deg) scale(1.1)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    section.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.detail-icon');
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
    
    // Arrow key navigation for timeline
    if (document.activeElement.classList.contains('timeline-btn')) {
        const currentIndex = Array.from(timelineButtons).indexOf(document.activeElement);
        
        if (e.key === 'ArrowRight' && currentIndex < timelineButtons.length - 1) {
            e.preventDefault();
            timelineButtons[currentIndex + 1].focus();
            timelineButtons[currentIndex + 1].click();
        }
        
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            e.preventDefault();
            timelineButtons[currentIndex - 1].focus();
            timelineButtons[currentIndex - 1].click();
        }
    }
});

// Initialize page with loaded state
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for transition effects
    document.body.classList.add('loaded');
    
    // Set active timeline button based on scroll position
    function updateActiveTimelineButton() {
        const scrollPosition = window.scrollY + 200;
        
        for (let i = timelineItems.length - 1; i >= 0; i--) {
            const item = timelineItems[i];
            if (item.offsetTop <= scrollPosition) {
                const year = item.dataset.year;
                timelineButtons.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.year === year) {
                        btn.classList.add('active');
                    }
                });
                break;
            }
        }
    }
    
    // Update timeline button on scroll
    window.addEventListener('scroll', updateActiveTimelineButton);
    
    // Initial update
    updateActiveTimelineButton();
    
    // Set focus to main content for screen readers
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus();
    }
    
    // Add scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-gold) 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 100;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
});

// Add CSS for highlighted timeline items
const style = document.createElement('style');
style.textContent = `
    .timeline-item.highlighted .timeline-content {
        box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
        border: 2px solid var(--secondary-gold);
    }
    
    .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    }
`;
document.head.appendChild(style);

// Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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