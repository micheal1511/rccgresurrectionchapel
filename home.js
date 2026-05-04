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

// Live Time Display
function updateLiveTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    
    const timeString = `${displayHours}:${minutes}:${seconds} ${ampm}`;
    const liveTimeElement = document.getElementById('liveTime');
    
    if (liveTimeElement) {
        liveTimeElement.textContent = timeString;
    }
}

// Update time immediately and then every second
updateLiveTime();
setInterval(updateLiveTime, 1000);

// Animate statistics on scroll
const statNumbers = document.querySelectorAll('.stat-number, .family-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElement = entry.target;
            const targetNumber = parseInt(numberElement.textContent.replace(/[^0-9]/g, ''));
            const currentNumber = parseInt(numberElement.textContent.replace(/[^0-9]/g, ''));
            
            // Only animate if it's not already at the target
            if (currentNumber < targetNumber) {
                animateNumber(numberElement, 0, targetNumber, 2000);
            }
            statsObserver.unobserve(numberElement);
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '50px'
});

// Observe all statistic numbers
statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace('.0', '') + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1).replace('.0', '') + 'K';
        }
        return num.toLocaleString();
    };
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = formatNumber(current);
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = formatNumber(end);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Program card hover effects
document.querySelectorAll('.program-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px)';
        const icon = this.querySelector('.program-icon');
        if (icon) {
            icon.style.transform = 'rotate(15deg) scale(1.1)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-10px)';
        const icon = this.querySelector('.program-icon');
        if (icon) {
            icon.style.transform = 'rotate(0) scale(1)';
        }
    });
});

// Donation card click to copy account number
document.querySelectorAll('.donation-account').forEach(account => {
    account.addEventListener('click', function() {
        const accountNumber = this.querySelector('p:nth-child(2)')?.textContent || 
                              this.querySelector('p:nth-child(1)')?.textContent;
        if (accountNumber) {
            const number = accountNumber.replace('Account No:', '').trim();
            navigator.clipboard.writeText(number).then(() => {
                // Show copied message
                const originalHtml = this.innerHTML;
                this.innerHTML = '<p style="color: var(--secondary-gold); font-weight: bold;">Copied to clipboard!</p>';
                
                setTimeout(() => {
                    this.innerHTML = originalHtml;
                }, 1500);
            }).catch(err => {
                console.log('Failed to copy: ', err);
            });
        }
    });
});

// Step card click effects
document.querySelectorAll('.step-card').forEach(step => {
    step.addEventListener('click', function() {
        const number = this.querySelector('.step-number');
        if (number) {
            number.style.transform = 'scale(1.2) rotate(15deg)';
            setTimeout(() => {
                number.style.transform = 'scale(1) rotate(0)';
            }, 300);
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

// Initialize page with loaded state
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for transition effects
    document.body.classList.add('loaded');
    
    // Add smooth scroll for anchor links
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
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
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

// Add hover effect for app buttons
document.querySelectorAll('.app-btn, .read-online').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-3px) scale(1)';
    });
});

  // by itself text
    const typingEffect = document.getElementById("typing-effect");
    const textArray = [
      "Welcome to the Redeemed Christian Church of God Resurrection Chapel Official Website...",
      "Motto: The Gathering of Champions, Where victory is sure.",
      "Jesus Christ the same yesterday, today, and forever."
    ];
    let textIndex = 0;
    let charIndex = 0;
  
    function typeText() {
      if (charIndex < textArray[textIndex].length) {
        typingEffect.innerText = textArray[textIndex].substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeText, 50);
      } else {
        setTimeout(deleteText, 1000);
      }
    }
  
    function deleteText() {
      if (charIndex > 0) {
        typingEffect.innerText = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteText, 30);
      } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(typeText, 500);
      }
    }
  
    typeText();
    
    // enter by itself
          const elements = document.querySelectorAll('.animate-on-scroll');

            const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                entry.target.classList.add('show');
                }
            });
            }, {
            threshold: 0.15,
            });

            elements.forEach((element) => {
            observer.observe(element);
            });