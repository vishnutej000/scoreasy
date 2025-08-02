// Dark Mode Toggle
const themeToggle = document.getElementById('darkmode-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeToggle(currentTheme);

themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

function updateThemeToggle(theme) {
    themeToggle.checked = theme === 'dark';
}

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Testimonials Carousel
let currentSlide = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Hide all testimonials
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current testimonial
    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
}

// Auto-rotate testimonials
function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    showSlide(currentSlide);
}

// Set up auto-rotation
setInterval(nextSlide, 5000);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Sticky CTA
const stickyCta = document.getElementById('stickyCta');
const heroSection = document.querySelector('.hero');

function handleStickyCtaVisibility() {
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight;
    
    if (scrollPosition > heroBottom + 200) {
        stickyCta.classList.add('show');
    } else {
        stickyCta.classList.remove('show');
    }
}

window.addEventListener('scroll', handleStickyCtaVisibility);

// Smooth scrolling for anchor links
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

// CTA Button Actions
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent.includes('Book Free Consultation') || 
        button.textContent.includes('Get Started') || 
        button.textContent.includes('Start Free Trial')) {
        button.addEventListener('click', () => {
            // Replace with actual booking/signup logic
            alert('Booking system integration needed. This would redirect to your booking platform.');
        });
    }
});

// Form validation (if forms are added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Intersection Observer for animations (optional enhancement)
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

// Observe elements for scroll animations
document.querySelectorAll('.benefit-card, .timeline-item, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handler
window.addEventListener('scroll', debounce(handleStickyCtaVisibility, 10));

// Accessibility: Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('dot')) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            const dots = Array.from(document.querySelectorAll('.dot'));
            const currentIndex = dots.indexOf(e.target);
            let newIndex;
            
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : dots.length - 1;
            } else {
                newIndex = currentIndex < dots.length - 1 ? currentIndex + 1 : 0;
            }
            
            dots[newIndex].focus();
            dots[newIndex].click();
        }
    }
});

// Add ARIA labels for better accessibility
document.addEventListener('DOMContentLoaded', () => {
    // Add ARIA labels to carousel dots
    dots.forEach((dot, index) => {
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        dot.setAttribute('role', 'button');
        dot.setAttribute('tabindex', '0');
    });
    
    // Add ARIA labels to FAQ items
    document.querySelectorAll('.faq-question').forEach((question, index) => {
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', `faq-answer-${index}`);
        
        const answer = question.nextElementSibling;
        answer.setAttribute('id', `faq-answer-${index}`);
    });
    
    // Update ARIA attributes when FAQ items are toggled
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const isExpanded = question.parentElement.classList.contains('active');
            question.setAttribute('aria-expanded', isExpanded);
        });
    });
});

// Team Carousel Functionality
const teamMembers = [
    { name: "Emily Kim", role: "Founder" },
    { name: "Michael Steward", role: "Creative Director" },
    { name: "Emma Rodriguez", role: "Lead Developer" },
    { name: "Julia Gimmel", role: "UX Designer" },
    { name: "Lisa Anderson", role: "Marketing Manager" },
    { name: "James Wilson", role: "Product Manager" }
];

const teamCards = document.querySelectorAll(".team-card");
const teamDots = document.querySelectorAll(".team-dot");
const memberName = document.querySelector(".member-name");
const memberRole = document.querySelector(".member-role");
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");

let currentTeamIndex = 0;
let isTeamAnimating = false;

function updateTeamCarousel(newIndex) {
    if (isTeamAnimating) return;
    isTeamAnimating = true;
    
    currentTeamIndex = (newIndex + teamCards.length) % teamCards.length;
    
    teamCards.forEach((card, i) => {
        const offset = (i - currentTeamIndex + teamCards.length) % teamCards.length;
        card.classList.remove("center", "left-1", "left-2", "right-1", "right-2", "hidden");
        
        if (offset === 0) {
            card.classList.add("center");
        } else if (offset === 1) {
            card.classList.add("right-1");
        } else if (offset === 2) {
            card.classList.add("right-2");
        } else if (offset === teamCards.length - 1) {
            card.classList.add("left-1");
        } else if (offset === teamCards.length - 2) {
            card.classList.add("left-2");
        } else {
            card.classList.add("hidden");
        }
    });
    
    teamDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentTeamIndex);
    });
    
    // Animate member info change
    if (memberName && memberRole) {
        memberName.style.opacity = "0";
        memberRole.style.opacity = "0";
        
        setTimeout(() => {
            memberName.textContent = teamMembers[currentTeamIndex].name;
            memberRole.textContent = teamMembers[currentTeamIndex].role;
            memberName.style.opacity = "1";
            memberRole.style.opacity = "1";
        }, 300);
    }
    
    setTimeout(() => {
        isTeamAnimating = false;
    }, 800);
}

// Team carousel event listeners
if (leftArrow) {
    leftArrow.addEventListener("click", () => {
        updateTeamCarousel(currentTeamIndex - 1);
    });
}

if (rightArrow) {
    rightArrow.addEventListener("click", () => {
        updateTeamCarousel(currentTeamIndex + 1);
    });
}

teamDots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        updateTeamCarousel(i);
    });
});

teamCards.forEach((card, i) => {
    card.addEventListener("click", () => {
        updateTeamCarousel(i);
    });
});

// Keyboard navigation for team carousel
document.addEventListener("keydown", (e) => {
    if (e.target.closest('.team')) {
        if (e.key === "ArrowLeft") {
            updateTeamCarousel(currentTeamIndex - 1);
        } else if (e.key === "ArrowRight") {
            updateTeamCarousel(currentTeamIndex + 1);
        }
    }
});

// Touch/swipe support for team carousel
let teamTouchStartX = 0;
let teamTouchEndX = 0;

document.addEventListener("touchstart", (e) => {
    if (e.target.closest('.team')) {
        teamTouchStartX = e.changedTouches[0].screenX;
    }
});

document.addEventListener("touchend", (e) => {
    if (e.target.closest('.team')) {
        teamTouchEndX = e.changedTouches[0].screenX;
        handleTeamSwipe();
    }
});

function handleTeamSwipe() {
    const swipeThreshold = 50;
    const diff = teamTouchStartX - teamTouchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            updateTeamCarousel(currentTeamIndex + 1);
        } else {
            updateTeamCarousel(currentTeamIndex - 1);
        }
    }
}

// Initialize team carousel
if (teamCards.length > 0) {
    updateTeamCarousel(0);
}

console.log('Scoreazy Mentorship Landing Page loaded successfully!');