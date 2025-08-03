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
// Arrow navigation for testimonials
const testimonialPrevBtn = document.getElementById('testimonialPrev');
const testimonialNextBtn = document.getElementById('testimonialNext');
if (testimonialPrevBtn) {
    testimonialPrevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        showSlide(currentSlide);
    });
}
if (testimonialNextBtn) {
    testimonialNextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        showSlide(currentSlide);
    });
}
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
// Sticky CTA - Removed since hero section no longer exists
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
// Consultation Popup Functionality
const consultationPopup = document.getElementById('consultationPopup');
const consultationClose = document.getElementById('consultationClose');
const consultationForm = document.getElementById('consultationForm');
const cancelConsultation = document.getElementById('cancelConsultation');
// Function to open consultation popup
function openConsultationPopup() {
    consultationPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
}
// Function to close consultation popup
function closeConsultationPopup() {
    consultationPopup.classList.remove('active');
    document.body.style.overflow = '';
}
// CTA Button Actions - Updated to open consultation popup
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent.includes('Book Free Consultation') || 
        button.textContent.includes('Book Consultation') ||
        button.textContent.includes('Get Started') || 
        button.textContent.includes('Start Free Trial')) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openConsultationPopup();
        });
    }
});
// Close popup events
consultationClose.addEventListener('click', closeConsultationPopup);
cancelConsultation.addEventListener('click', closeConsultationPopup);
// Close popup when clicking overlay
consultationPopup.addEventListener('click', (e) => {
    if (e.target === consultationPopup || e.target.classList.contains('consultation-overlay')) {
        closeConsultationPopup();
    }
});
// Close popup with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && consultationPopup.classList.contains('active')) {
        closeConsultationPopup();
    }
});
// Form submission handling
consultationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(consultationForm);
    const data = Object.fromEntries(formData.entries());
    
    // Get selected subjects
    const subjects = Array.from(consultationForm.querySelectorAll('input[name="subjects"]:checked'))
        .map(checkbox => checkbox.value);
    data.subjects = subjects;
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'grade'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
        alert('Please fill in all required fields.');
        return;
    }
    
    if (subjects.length === 0) {
        alert('Please select at least one subject of interest.');
        return;
    }
    
    // Show success message (replace with actual form submission)
    alert('Thank you for your interest! We will contact you within 24 hours to schedule your free consultation.');
    
    // Reset form and close popup
    consultationForm.reset();
    closeConsultationPopup();
    
    // Here you would typically send the data to your backend
    console.log('Consultation form data:', data);
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
// Debounce function available for future use
// window.addEventListener('scroll', debounce(someFunction, 10));
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
    
    // Keyboard navigation for testimonial arrows
    if (e.target.classList.contains('testimonial-arrow')) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.target.click();
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
    
    // Add ARIA labels to testimonial arrows
    if (testimonialPrevBtn) {
        testimonialPrevBtn.setAttribute('aria-label', 'Previous testimonial');
        testimonialPrevBtn.setAttribute('tabindex', '0');
    }
    
    if (testimonialNextBtn) {
        testimonialNextBtn.setAttribute('aria-label', 'Next testimonial');
        testimonialNextBtn.setAttribute('tabindex', '0');
    }
    
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
// Interactive Roadmap with Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const checkpoints = document.querySelectorAll('.checkpoint');
    const popup = document.getElementById('roadmapPopup');
    const popupClose = document.getElementById('popupClose');
    const popupIcon = document.querySelector('.popup-icon');
    const popupTitle = document.querySelector('.popup-title');
    const popupDescription = document.querySelector('.popup-description');
    const progressFill = document.querySelector('.progress-fill');
    const stepNumber = document.querySelector('.step-number');
    
    let currentActiveCheckpoint = null;
    
    // Checkpoint data
    const checkpointData = {
        0: { icon: '📋', title: 'Initial Assessment', description: 'Comprehensive evaluation of your current academic level, learning style, and goals to create your personalized roadmap.' },
        1: { icon: '🤖', title: 'AI Mentor Matching', description: 'Our advanced AI algorithm analyzes your profile and matches you with the perfect mentor based on expertise, teaching style, and compatibility.' },
        2: { icon: '📝', title: 'Personalized Planning', description: 'Work with your mentor to create a detailed study plan tailored to your schedule, goals, and learning preferences.' },
        3: { icon: '📚', title: 'Active Learning', description: 'Engage in regular 1:1 sessions, interactive lessons, and hands-on practice with continuous guidance and support.' },
        4: { icon: '📊', title: 'Progress Tracking', description: 'Monitor your improvement with detailed analytics, regular assessments, and milestone celebrations along your journey.' },
        5: { icon: '🎯', title: 'Academic Success', description: 'Achieve your academic goals with improved grades, enhanced confidence, and skills that last a lifetime.' }
    };
    
    // Initialize checkpoints with entrance animation
    checkpoints.forEach((checkpoint, index) => {
        checkpoint.style.opacity = '0';
        checkpoint.style.transform = 'translateY(20px)';
        checkpoint.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Staggered entrance animation
        setTimeout(() => {
            checkpoint.style.opacity = '1';
            checkpoint.style.transform = 'translateY(0)';
        }, index * 200);
        
        // Add click event for popup
        checkpoint.addEventListener('click', (e) => {
            e.preventDefault();
            const step = parseInt(checkpoint.dataset.step);
            showPopup(step, checkpoint);
        });
        
        // Add touch support for mobile
        checkpoint.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const step = parseInt(checkpoint.dataset.step);
            showPopup(step, checkpoint);
        });
    });
    
    // Show popup function
    function showPopup(step, clickedCheckpoint) {
        // Close any existing popup first
        if (currentActiveCheckpoint && currentActiveCheckpoint !== clickedCheckpoint) {
            currentActiveCheckpoint.classList.remove('active');
        }
        
        // Set current active checkpoint
        currentActiveCheckpoint = clickedCheckpoint;
        clickedCheckpoint.classList.add('active');
        
        // Get checkpoint data
        const data = checkpointData[step];
        
        // Update popup content
        popupIcon.textContent = data.icon;
        popupTitle.textContent = data.title;
        popupDescription.textContent = data.description;
        stepNumber.textContent = step + 1;
        
        // Update progress bar
        const progressPercentage = ((step + 1) / 6) * 100;
        progressFill.style.width = progressPercentage + '%';
        
        // Show popup
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Add pulse effect to clicked checkpoint
        clickedCheckpoint.style.animation = 'checkpointPulse 0.6s ease-in-out';
        setTimeout(() => {
            clickedCheckpoint.style.animation = '';
        }, 600);
    }
    
    // Close popup function
    function closePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Remove active state from checkpoint
        if (currentActiveCheckpoint) {
            currentActiveCheckpoint.classList.remove('active');
            currentActiveCheckpoint = null;
        }
    }
    
    // Close popup events
    popupClose.addEventListener('click', closePopup);
    
    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });
    
    // Add checkpoint pulse animation
    const roadmapStyle = document.createElement('style');
    roadmapStyle.textContent = `
        @keyframes checkpointPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.15); }
            100% { transform: scale(1); }
        }
        
        .checkpoint.active .checkpoint-icon {
            background: var(--primary-color) !important;
            color: var(--white) !important;
            border-color: var(--primary-color) !important;
            box-shadow: 0 12px 35px rgba(32, 178, 170, 0.4) !important;
        }
        
        .checkpoint.active .checkpoint-label {
            background: var(--primary-color) !important;
            color: var(--white) !important;
            border-color: var(--primary-color) !important;
        }
        
        .checkpoint.active .checkpoint-pulse {
            animation: pulse 1.5s infinite !important;
        }
    `;
    document.head.appendChild(roadmapStyle);
    
    // Auto-play pulse animation on page load
    setTimeout(() => {
        checkpoints.forEach((checkpoint, index) => {
            setTimeout(() => {
                checkpoint.querySelector('.checkpoint-pulse').style.animation = 'pulse 2s infinite';
            }, index * 300);
        });
    }, 1000);
});
console.log('Scoreazy Mentorship Landing Page loaded successfully!');
// Movie Night Swiper Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Check if Swiper is loaded and swiper element exists
    if (typeof Swiper !== 'undefined' && document.querySelector('.movie-night .swiper')) {
        var movieSwiper = new Swiper(".movie-night .swiper", {
            effect: "cards",
            grabCursor: true,
            initialSlide: 2,
            speed: 500,
            loop: true,
            rotate: true,
            mousewheel: {
                invert: false,
            },
            // Add keyboard navigation
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            // Add accessibility
            a11y: {
                prevSlideMessage: 'Previous movie',
                nextSlideMessage: 'Next movie',
                firstSlideMessage: 'This is the first movie',
                lastSlideMessage: 'This is the last movie',
            },
        });
        
        console.log('Movie Night Swiper initialized successfully!');
    } else {
        console.warn('Swiper library not loaded or swiper element not found');
    }
});