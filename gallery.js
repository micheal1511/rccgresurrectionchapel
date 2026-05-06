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

// Gallery Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const videoItems = document.querySelectorAll('.video-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.dataset.filter;
        
        // Filter gallery items
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.dataset.category === filterValue) {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                    item.style.visibility = 'visible';
                    item.style.position = 'relative';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    item.classList.add('hidden');
                }, 300);
            }
        });
        
        // Filter video items
        videoItems.forEach(item => {
            if (filterValue === 'all' || item.dataset.category === filterValue) {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                    item.style.visibility = 'visible';
                    item.style.position = 'relative';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    item.classList.add('hidden');
                }, 300);
            }
        });
        
        // Scroll to appropriate section
        if (filterValue === 'photos' || filterValue === 'all') {
            document.getElementById('photosSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (filterValue === 'videos') {
            document.getElementById('videosSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (filterValue === 'events') {
            document.getElementById('eventsSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxMedia = document.getElementById('lightboxMedia');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxMeta = document.getElementById('lightboxMeta');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

// Sample gallery data for lightbox
const galleryData = [
    {
        type: 'image',
        src: 'church-img1.jpg',
        title: 'Church Exterior',
        description: 'Our Church Exterior Angle On a Sunday Service',
        category: 'Sunday Service',
        date: 'November 15, 2024',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img2.jpg',
        title: 'Pst & Pst mrs Oluwatosin',
        description: 'Pst & Pst mrs incharge of area headquater',
        category: 'Sunday Service',
        date: 'January 4, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img3.jpg',
        title: 'Sunday Service Worship',
        description: 'Our congregation in powerful worship during Sunday service',
        category: 'Sunday Service',
        date: 'January 4, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'light-up.png',
        title: 'Solar Project',
        description: 'Be a partner of this light up the church project',
        category: '####',
        date: '#### ##, ####',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img4.jpg',
        title: 'Thanksgiving Service',
        description: 'Our Church during 1st thanksgiving service of the year 2026',
        category: 'Sunday Service',
        date: 'January 4, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img5.jpg',
        title: 'Thanksgiving Service',
        description: 'Our Church during 1st thanksgiving service of the year 2026',
        category: 'Sunday Service',
        date: 'January 4, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img6.jpg',
        title: 'Child Dedication Service',
        description: 'Child dedication of Mr & Mrs Adebisi',
        category: 'Sunday Service',
        date: 'January 4, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img7.jpg',
        title: 'Child Dedication Service',
        description: 'Child dedication of Mr & Mrs Adebisi',
        category: 'Sunday Service',
        date: 'January 4, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img8.jpg',
        title: 'Child Dedication Service',
        description: 'Child dedication of Mr & Mrs Adebisi',
        category: 'Sunday Service',
        date: 'January 4, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img9.jpg',
        title: 'Church Congregation',
        description: 'Church congregation during 1st thanksgiving sunday of the year',
        category: 'Sunday Service',
        date: 'January 4, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img10.jpg',
        title: 'Testimony',
        description: 'Sharing God\'s healing power and miracles',
        category: 'Sunday Service',
        date: 'January 4, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img11.jpg',
        title: 'Testimony',
        description: 'Sharing God\'s healing power and miracles',
        category: 'Sunday Service',
        date: 'January 4, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img12.jpg',
        title: 'Testimony',
        description: 'Sharing God\'s healing power and miracles',
        category: 'Sunday Service',
        date: 'January 4, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img13.jpg',
        title: 'Testimony',
        description: 'Sharing God\'s healing power and miracles',
        category: 'Sunday Service',
        date: 'January 4, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img14.jpg',
        title: 'Testimony',
        description: 'Sharing God\'s healing power and miracles',
        category: 'Sunday Service',
        date: 'January 4, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img15.jpg',
        title: 'Testimony',
        description: 'Sharing God\'s healing power and miracles',
        category: 'Sunday Service',
        date: 'January 4, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img16.jpg',
        title: 'Pst mrs Oluwatosin',
        description: 'Pst mrs incharge of area headquater',
        category: 'Sunday Service',
        date: 'January 4, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img17.jpg',
        title: 'Pst Oluwatosin',
        description: 'Pst incharge of area headquater',
        category: 'Sunday Service',
        date: 'January 4, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img18.jpg',
        title: 'Testimony',
        description: 'Sharing God\'s healing power and miracles',
        category: 'Sunday Service',
        date: 'January 4, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img19.jpeg',
        title: 'Pst. E.A Adeboye',
        description: 'The General Overseer Rccg World World wide',
        category: 'Events',
        date: '#### #, ####',
        photographer: 'RCCG Media Team'
    },
    {
        type: 'image',
        src: 'church-img20.jpg',
        title: 'Pst. David Erivona',
        description: 'Pst incharge of Oyo Province 13 (Picp)',
        category: 'Events',
        date: '#### #, ####',
        photographer: 'Province Media Team'
    },
    {
        type: 'image',
        src: 'church-img21.png',
        title: 'Pst. Majekodunmi Babalola',
        description: 'Pst incharge of Zonal Headquarters (Picz)',
        category: 'Events',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img22.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img23.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img24.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img25.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img26.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img27.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img28.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img29.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img30.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img31.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img32.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img33.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img34.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img35.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img36.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img37.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img38.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img39.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img40.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img41.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img42.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img43.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img44.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img45.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img46.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img47.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img48.png',
        title: 'Christmas Edition 2025',
        description: 'Christmas Edition 21st December 2025',
        category: 'Sunday Service',
        date: 'December 21, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img49.jpg',
        title: 'Church Exterior',
        description: 'Our Church Exterior Angle On a Sunday Service',
        category: 'Sunday Service',
        date: 'September 18, 2023',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img50.jpg',
        title: 'Church Exterior',
        description: 'Our Church Exterior Angle On a Sunday Service',
        category: 'Sunday Service',
        date: 'September 18, 2023',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img51.jpg',
        title: 'Church Full-shot',
        description: 'Church Full-shot from back of auditorium',
        category: 'Sunday Service',
        date: 'September 7, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img52.jpg',
        title: 'Thanksgiving Service',
        description: 'Our Church during 1st thanksgiving service of the year 2025',
        category: 'Sunday Service',
        date: 'January 5, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img53.jpg',
        title: 'Thanksgiving Service',
        description: 'Our Church during 1st thanksgiving service of the year 2025',
        category: 'Sunday Service',
        date: 'January 5, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img54.jpg',
        title: 'Thanksgiving Service',
        description: 'Our Church during 1st thanksgiving service of the year 2025',
        category: 'Sunday Service',
        date: 'January 5, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img55.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration of Pst. Oluwatosin',
        category: 'Event',
        date: 'June 22, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img56.jpg',
        title: 'Family Weekend 2024',
        description: 'Family Weekend Edition December 2024',
        category: 'Sunday Service',
        date: 'November, 2024',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img57.jpg',
        title: 'Family Weekend 2024',
        description: 'Family Weekend Edition December 2024',
        category: 'Sunday Service',
        date: 'November, 2024',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img58.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img59.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img60.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img61.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img62.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img63.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img64.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img65.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img66.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img67.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img68.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img69.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img70.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img71.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img72.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img73.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img74.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img75.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img76.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img77.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img78.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img79.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img80.jpg',
        title: 'Birthday Celebration',
        description: 'Birthday Celebration Of Pst. Mrs Oluwatosin & Obanimi',
        category: 'Event',
        date: 'January 11, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img81.jpg',
        title: 'Thanksgiving Service',
        description: 'Our Church during 1st thanksgiving service of the year 2025',
        category: 'Sunday Service',
        date: 'January 5, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img82.jpg',
        title: 'Thanksgiving Service',
        description: 'Our Church during 1st thanksgiving service of the year 2025',
        category: 'Sunday Service',
        date: 'January 5, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img83.jpg',
        title: 'Thanksgiving Service',
        description: 'Our Church during 1st thanksgiving service of the year 2025',
        category: 'Sunday Service',
        date: 'January 5, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img84.jpg',
        title: 'Thanksgiving Service',
        description: 'Our Church during 1st thanksgiving service of the year 2025',
        category: 'Sunday Service',
        date: 'January 5, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img85.jpg',
        title: 'Church Full-Shot',
        description: 'Church Full-shot from front of auditorium',
        category: 'Sunday Service',
        date: 'August 24, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img86.jpg',
        title: 'Family Weekend 2025',
        description: 'Family Weekend Edition December 2025',
        category: 'Sunday Service',
        date: 'November 16, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img87.jpg',
        title: 'Family Weekend 2025',
        description: 'Family Weekend Edition December 2025',
        category: 'Sunday Service',
        date: 'November 16, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img88.jpg',
        title: 'Family Weekend 2025',
        description: 'Family Weekend Edition December 2025',
        category: 'Sunday Service',
        date: 'November 16, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img89.jpg',
        title: 'Family Weekend 2025',
        description: 'Family Weekend Edition December 2025',
        category: 'Sunday Service',
        date: 'November 16, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img90.jpg',
        title: 'Family Weekend 2025',
        description: 'Family Weekend Edition December 2025',
        category: 'Sunday Service',
        date: 'November 16, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img91.jpg',
        title: 'Family Weekend 2025',
        description: 'Family Weekend Edition December 2025',
        category: 'Sunday Service',
        date: 'November 16, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img92.jpg',
        title: 'Family Weekend 2025',
        description: 'Family Weekend Edition December 2025',
        category: 'Sunday Service',
        date: 'November 16, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img93.jpg',
        title: 'Family Weekend 2025',
        description: 'Family Weekend Edition December 2025',
        category: 'Sunday Service',
        date: 'November 16, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img94.jpg',
        title: 'Family Weekend 2025',
        description: 'Family Weekend Edition December 2025',
        category: 'Sunday Service',
        date: 'November 16, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img95.jpg',
        title: 'Family Weekend 2025',
        description: 'Family Weekend Edition December 2025',
        category: 'Sunday Service',
        date: 'November 16, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img96.jpg',
        title: 'Family Weekend 2025',
        description: 'Family Weekend Edition December 2025',
        category: 'Sunday Service',
        date: 'November 16, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img97.jpg',
        title: 'Family Weekend 2025',
        description: 'Family Weekend Edition December 2025',
        category: 'Sunday Service',
        date: 'November 16, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img98.jpg',
        title: 'Family Weekend 2025',
        description: 'Family Weekend Edition December 2025',
        category: 'Sunday Service',
        date: 'November 16, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img99.jpg',
        title: 'Family Weekend 2025',
        description: 'Family Weekend Edition December 2025',
        category: 'Sunday Service',
        date: 'November 16, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img100.jpg',
        title: 'Family Weekend 2025',
        description: 'Family Weekend Edition December 2025',
        category: 'Sunday Service',
        date: 'November 16, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img101.jpg',
        title: 'Family Weekend 2025',
        description: 'Family Weekend Edition December 2025',
        category: 'Sunday Service',
        date: 'November 16, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img102.jpg',
        title: 'Family Weekend 2025',
        description: 'Family Weekend Edition December 2025',
        category: 'Sunday Service',
        date: 'November 16, 2025',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img103.jpg',
        title: 'Youth Sunday',
        description: 'Youth Sunday January 18 2026 Edition',
        category: 'Sunday Service',
        date: 'January 18, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img104.jpg',
        title: 'Youth Sunday',
        description: 'Youth Sunday January 18 2026 Edition',
        category: 'Sunday Service',
        date: 'January 18, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img105.jpg',
        title: 'Youth Sunday',
        description: 'Youth Sunday January 18 2026 Edition',
        category: 'Sunday Service',
        date: 'January 18, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img106.jpg',
        title: 'Youth Sunday',
        description: 'Youth Sunday January 18 2026 Edition',
        category: 'Sunday Service',
        date: 'January 18, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img107.jpg',
        title: 'Youth Sunday',
        description: 'Youth Sunday January 18 2026 Edition',
        category: 'Sunday Service',
        date: 'January 18, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img108.jpg',
        title: 'Youth Sunday',
        description: 'Youth Sunday January 18 2026 Edition',
        category: 'Sunday Service',
        date: 'January 18, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img109.jpg',
        title: 'Youth Sunday',
        description: 'Youth Sunday January 18 2026 Edition',
        category: 'Sunday Service',
        date: 'January 18, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img110.jpg',
        title: 'Youth Sunday',
        description: 'Youth Sunday January 18 2026 Edition',
        category: 'Sunday Service',
        date: 'January 18, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img111.jpg',
        title: 'Offering Flyer',
        description: '#### ####### ###### #####',
        category: '### ###',
        date: '### ##, ####',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img112.jpg',
        title: 'Tithe Flyer',
        description: '#### ####### ###### #####',
        category: '### ###',
        date: '### ##, ####',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img113.jpg',
        title: 'Youth Sunday',
        description: 'Youth Sunday January 18 2026 Edition',
        category: 'Sunday Service',
        date: 'January 18, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img114.jpg',
        title: 'Youth Sunday',
        description: 'Youth Sunday January 18 2026 Edition',
        category: 'Sunday Service',
        date: 'January 18, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img115.jpg',
        title: 'Youth Sunday',
        description: 'Youth Sunday January 18 2026 Edition',
        category: 'Sunday Service',
        date: 'January 18, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img116.jpg',
        title: 'Youth Sunday',
        description: 'Youth Sunday January 18 2026 Edition',
        category: 'Sunday Service',
        date: 'January 18, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img117.jpg',
        title: 'Youth Sunday',
        description: 'Youth Sunday January 18 2026 Edition',
        category: 'Sunday Service',
        date: 'January 18, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img118.jpg',
        title: 'Youth Sunday',
        description: 'Youth Sunday January 18 2026 Edition',
        category: 'Sunday Service',
        date: 'January 18, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img119.jpg',
        title: 'Youth Sunday',
        description: 'Youth Sunday January 18 2026 Edition',
        category: 'Sunday Service',
        date: 'January 18, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img120.jpg',
        title: 'Youth Sunday',
        description: 'Youth Sunday January 18 2026 Edition',
        category: 'Sunday Service',
        date: 'January 18, 2026',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img121.jpg',
        title: 'Resurrection Chapel 2011',
        description: '#### ####### ###### #####',
        category: '### ###',
        date: '### ##, ####',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img122.jpg',
        title: 'Resurrection Chapel 2011',
        description: '#### ####### ###### #####',
        category: '### ###',
        date: '### ##, ####',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img123.jpg',
        title: 'Resurrection Chapel 2011',
        description: '#### ####### ###### #####',
        category: '### ###',
        date: '### ##, ####',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img124.jpg',
        title: 'Resurrection Chapel 2011',
        description: '#### ####### ###### #####',
        category: '### ###',
        date: '### ##, ####',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img125.jpg',
        title: 'Resurrection Chapel 2011',
        description: '#### ####### ###### #####',
        category: '### ###',
        date: '### ##, ####',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img126.jpg',
        title: 'Resurrection Chapel 2011',
        description: '#### ####### ###### #####',
        category: '### ###',
        date: '### ##, ####',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img127.jpg',
        title: 'Resurrection Chapel 2011',
        description: '#### ####### ###### #####',
        category: '### ###',
        date: '### ##, ####',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img128.jpg',
        title: 'Resurrection Chapel 2011',
        description: '#### ####### ###### #####',
        category: '### ###',
        date: '### ##, ####',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img129.jpg',
        title: 'Resurrection Chapel 2011',
        description: '#### ####### ###### #####',
        category: '### ###',
        date: '### ##, ####',
        photographer: 'Church Media Team'
    },
    {
        type: 'image',
        src: 'church-img130.jpg',
        title: 'Resurrection Chapel 2011',
        description: '#### ####### ###### #####',
        category: '### ###',
        date: '### ##, ####',
        photographer: 'Church Media Team'
    }
];

let currentLightboxIndex = 0;

// Open lightbox when clicking on gallery images
document.querySelectorAll('.gallery-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        if (index < galleryData.length) {
            currentLightboxIndex = index;
            openLightbox(currentLightboxIndex);
        }
    });
});

function openLightbox(index) {
    const item = galleryData[index];
    
    lightboxMedia.innerHTML = '';
    if (item.type === 'image') {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.title;
        lightboxMedia.appendChild(img);
    }
    
    lightboxTitle.textContent = item.title;
    lightboxDescription.textContent = item.description;
    
    lightboxMeta.innerHTML = `
        <span><i class="far fa-calendar"></i> ${item.date}</span>
        <span><i class="fas fa-tag"></i> ${item.category}</span>
        <span><i class="fas fa-camera"></i> ${item.photographer}</span>
    `;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = galleryData.length - 1;
    } else if (currentLightboxIndex >= galleryData.length) {
        currentLightboxIndex = 0;
    }
    
    openLightbox(currentLightboxIndex);
}

// Event listeners for lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
lightboxNext.addEventListener('click', () => navigateLightbox(1));

// Close lightbox when clicking outside content
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    }
});

// Video Modal Functionality
const videoModal = document.getElementById('videoModal');
const videoModalClose = document.getElementById('videoModalClose');
const videoPlayer = document.getElementById('videoPlayer');
const videoTitle = document.getElementById('videoTitle');
const videoDescription = document.getElementById('videoDescription');

// Sample video data
const videoData = [
    {
        id: 'video1',
        title: 'Church ad',
        description: 'Church ad from Resurrection Media',
        embedCode: '<iframe width="100%" height="100%" src="church-vid1.mp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
        id: 'video2',
        title: 'Prayer of General Overseer',
        description: 'Prayer of General Overseer during 2025 73rd Annual Convention',
        embedCode: '<iframe width="100%" height="100%" src="church-vid2.mp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
        id: 'video3',
        title: '####',
        description: '#############',
        embedCode: '<iframe width="100%" height="100%" src="church-vid3.mp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
        id: 'video4',
        title: '####',
        description: '#############',
        embedCode: '<iframe width="100%" height="100%" src="church-vid4.mp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
        id: 'video5',
        title: '####',
        description: '#############',
        embedCode: '<iframe width="100%" height="100%" src="church-vid5.mp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
        id: 'video6',
        title: '####',
        description: '#############',
        embedCode: '<iframe width="100%" height="100%" src="church-vid6.mp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
        id: 'video7',
        title: '####',
        description: '#############',
        embedCode: '<iframe width="100%" height="100%" src="church-vid7.mp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
        id: 'video8',
        title: 'Ministration',
        description: '#############',
        embedCode: '<iframe width="100%" height="100%" src="church-vid8.mp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
        id: 'video9',
        title: '#############',
        description: 'Celebrating the birth of our Savior Jesus Christ',
        embedCode: '<iframe width="100%" height="100%" src="church-vid9.mp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
        id: 'video10',
        title: 'Ministration',
        description: '#############',
        embedCode: '<iframe width="100%" height="100%" src="church-vid10.mp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    }
];

// Open video modal when clicking on play buttons
document.querySelectorAll('.play-button').forEach((button, index) => {
    button.addEventListener('click', () => {
        if (index < videoData.length) {
            openVideoModal(index);
        }
    });
});

// Also open video modal when clicking on video cards
document.querySelectorAll('.video-card').forEach((card, index) => {
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.play-button') && index < videoData.length) {
            openVideoModal(index);
        }
    });
});

function openVideoModal(index) {
    const video = videoData[index];
    
    videoPlayer.innerHTML = video.embedCode;
    videoTitle.textContent = video.title;
    videoDescription.textContent = video.description;
    
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    videoModal.classList.remove('active');
    document.body.style.overflow = 'hidden';
    
    // Stop video playback
    const iframe = videoPlayer.querySelector('iframe');
    if (iframe) {
        const src = iframe.src;
        iframe.src = '';
        setTimeout(() => {
            iframe.src = src="false.mp4";
        }, 100);
    }
}

// Event listeners for video modal
videoModalClose.addEventListener('click', closeVideoModal);

// Close video modal when clicking outside content
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        closeVideoModal();
    }
});

// Keyboard navigation for video modal
document.addEventListener('keydown', (e) => {
    if (videoModal.classList.contains('active') && e.key === 'Escape') {
        closeVideoModal();
    }
});

// Initialize page with animations
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for transition effects
    document.body.classList.add('loaded');
    
    // Animate gallery items on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add bounce animation to cards
                if (entry.target.classList.contains('gallery-card')) {
                    entry.target.style.animation = 'bounceIn 0.6s ease';
                }
            }
        });
    }, observerOptions);
    
    // Observe all gallery items
    document.querySelectorAll('.gallery-item, .video-item, .event-card').forEach(item => {
        galleryObserver.observe(item);
    });
    
    // Set focus to main content for screen readers
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus();
    }
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3) translateY(100px);
            }
            50% {
                opacity: 0.9;
                transform: scale(1.05);
            }
            80% {
                opacity: 1;
                transform: scale(0.95);
            }
            100% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        
        .gallery-card, .video-card, .event-card {
            // opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
    `;
    document.head.appendChild(style);
});

// Smooth scroll for filter navigation
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.dataset.filter;
        let targetSection;
        
        switch(filter) {
            case 'photos':
                targetSection = document.getElementById('photosSection');
                break;
            case 'videos':
                targetSection = document.getElementById('videosSection');
                break;
            case 'events':
                targetSection = document.getElementById('eventsSection');
                break;
            default:
                targetSection = document.querySelector('.gallery-container');
        }
        
        if (targetSection) {
            const offset = 100;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effect to category tags
document.querySelectorAll('.category-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.2s ease';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});