// ===== MEDICARE PLUS - SIMPLE PAGE TRANSITION =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== PAGE TRANSITION ==========
    // Create overlay
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition-overlay';
    transitionOverlay.innerHTML = `
        <div class="transition-content">
            <div class="transition-spinner">
                <i class="fas fa-heartbeat"></i>
            </div>
            <div class="transition-page-name" id="transitionPageName">Loading...</div>
        </div>
    `;
    document.body.appendChild(transitionOverlay);
    
    // Page names mapping
    const pageNames = {
        'index': 'Home',
        'home': 'Home',
        'about': 'About Us',
        'products': 'Products',
        'services': 'Services',
        'testimonials': 'Testimonials',
        'contact': 'Contact Us'
    };
    
    // Get current page
    const currentPage = window.location.pathname.split('/').pop().split('.')[0] || 'index';
    
    // Function to navigate
    function navigateToPage(url, pageName) {
        const pageNameElement = document.getElementById('transitionPageName');
        if (pageNameElement) {
            pageNameElement.textContent = pageName;
        }
        transitionOverlay.classList.add('active');
        
        setTimeout(function() {
            window.location.href = url;
        }, 400);
    }
    
    // Intercept all links
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('javascript') && href !== '') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                let targetPage = href.split('/').pop().split('.')[0];
                let displayName = pageNames[targetPage] || 'MediCare Plus';
                
                navigateToPage(href, displayName);
            });
        }
    });
    
    // REMOVE OVERLAY AFTER PAGE LOADS - FIX HERE
    window.addEventListener('load', function() {
        // Small delay to ensure animation completes
        setTimeout(function() {
            transitionOverlay.classList.remove('active');
        }, 300);
    });
    
    // Also remove on pageshow (for back/forward navigation)
    window.addEventListener('pageshow', function() {
        transitionOverlay.classList.remove('active');
    });
    
    // ========== DARK/LIGHT THEME ==========
    const themeCheckbox = document.getElementById('themeCheckbox');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('medicare_theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        if (themeCheckbox) themeCheckbox.checked = true;
    } else if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        if (themeCheckbox) themeCheckbox.checked = false;
    }
    
    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('dark-theme');
                localStorage.setItem('medicare_theme', 'dark');
                showToast('🌙 Dark mode activated');
            } else {
                body.classList.remove('dark-theme');
                localStorage.setItem('medicare_theme', 'light');
                showToast('☀️ Light mode activated');
            }
        });
    }
    
    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #059669;
            color: white;
            padding: 10px 20px;
            border-radius: 40px;
            font-size: 0.85rem;
            z-index: 9999;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 10);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
    
    // ========== MOBILE MENU ==========
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                const icon = mobileMenuBtn?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            navItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    navItems.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
    
    // ========== NEWSLETTER ==========
    const subscribeBtns = document.querySelectorAll('.subscribe-btn, .newsletter-input .btn-primary');
    subscribeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const newsletterDiv = this.closest('.newsletter');
            const input = newsletterDiv?.querySelector('input[type="email"]');
            const feedback = newsletterDiv?.querySelector('.subscribe-feedback');
            
            if (input) {
                const email = input.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (email === '') {
                    if (feedback) {
                        feedback.textContent = 'Please enter email';
                        feedback.classList.add('error');
                    }
                    input.style.borderColor = '#EF4444';
                } else if (!emailRegex.test(email)) {
                    if (feedback) {
                        feedback.textContent = 'Invalid email';
                        feedback.classList.add('error');
                    }
                    input.style.borderColor = '#EF4444';
                } else {
                    if (feedback) {
                        feedback.textContent = '✓ Subscribed!';
                        feedback.classList.remove('error');
                    }
                    input.style.borderColor = '#10B981';
                    input.value = '';
                    setTimeout(() => input.style.borderColor = '#334155', 2000);
                }
                
                if (feedback) {
                    setTimeout(() => {
                        feedback.style.opacity = '0';
                        setTimeout(() => {
                            feedback.style.display = 'none';
                            feedback.style.opacity = '1';
                        }, 300);
                    }, 2000);
                }
            }
        });
    });
    
    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            contactForm.querySelectorAll('input, textarea, select').forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#EF4444';
                } else {
                    input.style.borderColor = '#e2e8f0';
                }
            });
            
            const emailInput = contactForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value.trim())) {
                    isValid = false;
                    emailInput.style.borderColor = '#EF4444';
                }
            }
            
            if (isValid) {
                alert('✅ Message sent successfully!');
                contactForm.reset();
            } else {
                alert('❌ Please fill all fields.');
            }
        });
        
        contactForm.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '#e2e8f0';
            });
        });
    }
    
    // ========== SCROLL REVEAL ==========
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .product-card, .testimonial-card, .value-card, .team-card, .about-grid, .stat-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ========== STAT COUNTER ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                statNumbers.forEach(stat => {
                    const originalText = stat.innerText;
                    const match = originalText.match(/(\d+(?:\.\d+)?)/);
                    if (match) {
                        const target = parseFloat(match[1]);
                        animateNumber(stat, target, originalText);
                    }
                });
            }
        });
    }, { threshold: 0.3 });
    
    const statsContainer = document.querySelector('.stats-banner-card');
    if (statsContainer) statsObserver.observe(statsContainer);
    
    function animateNumber(element, target, originalText) {
        let current = 0;
        const increment = target / 50;
        const hasPlus = originalText.includes('+');
        const hasPercent = originalText.includes('%');
        const hasSlash = originalText.includes('/');
        
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.innerText = originalText;
                clearInterval(interval);
            } else {
                if (hasPercent) {
                    element.innerText = Math.floor(current) + '%';
                } else if (hasSlash) {
                    element.innerText = Math.floor(current).toFixed(1) + '/5';
                } else {
                    element.innerText = Math.floor(current).toLocaleString() + (hasPlus ? '+' : '');
                }
            }
        }, 20);
    }
    
    // ========== BUTTON RIPPLE ==========
    const buttons = document.querySelectorAll('.btn-primary, .btn-outline, .social-square, .btn-emergency');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('social-square')) return;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 400);
        });
    });
    
    // ========== SOCIAL MEDIA ==========
    document.querySelectorAll('.social-square').forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Social media clicked');
        });
    });
    
    // ========== EMERGENCY BUTTON ==========
    const emergencyBtn = document.querySelector('.btn-emergency');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function() {
            alert('🚨 Emergency: +1 (234) 567-999');
        });
    }
    
    // ========== SCROLL EFFECT ==========
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.pageYOffset > 10) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        }
    });
    
    // Add ripple styles
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255,255,255,0.5);
                transform: scale(0);
                animation: rippleAnim 0.5s ease-out;
                pointer-events: none;
            }
            @keyframes rippleAnim {
                to { transform: scale(4); opacity: 0; }
            }
            .btn-primary, .btn-outline, .btn-emergency {
                position: relative;
                overflow: hidden;
            }
            .subscribe-feedback.error {
                color: #EF4444;
            }
            .subscribe-feedback:not(.error) {
                color: #10B981;
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('MediCare Plus - Ready!');
});

