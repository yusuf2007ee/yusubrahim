// Simple elegant interactions for the website

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dr. Yusuf Ibrahim - Computational Linguist website loaded');
    
    // Add subtle animation to profile image on load
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.style.opacity = '0';
        profileImg.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            profileImg.style.transition = 'all 0.6s ease';
            profileImg.style.opacity = '1';
            profileImg.style.transform = 'scale(1)';
        }, 100);
    }
    
    // Add hover effects to expertise items
    const expertiseItems = document.querySelectorAll('.expertise-item');
    expertiseItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add hover effects to link items
    const linkItems = document.querySelectorAll('.link-item');
    linkItems.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Add subtle animation to sections when they come into view
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Set initial state for sections
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
    
    // Smooth scroll for anchor links (if we add any in the future)
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
    
    // Add current year to footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('footer p');
    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
    
    // Add loading animation for PDF download
    const downloadBtn = document.querySelector('a[download]');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // Add a small delay to show the download has started
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 1000);
        });
    }
});

// Add a simple console greeting
console.log(`
%cDr. Yusuf Ibrahim - Computational Linguist
%cSpecializing in NLP for Low-Resource Languages
%cyibrahim@abu.edu.ng | +2347037627128
`, 
'color: #667eea; font-size: 16px; font-weight: bold;',
'color: #4a5568; font-size: 14px;',
'color: #718096; font-size: 12px;'
);
