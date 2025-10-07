// Reusable Animation System for NGO Website
// This file provides smooth scroll-triggered animations for all pages

// Animation configuration
const ANIMATION_CONFIG = {
  // Intersection Observer options
  observerOptions: {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  },
  
  // Animation types and their default settings
  animations: {
    fadeInUp: {
      initial: { opacity: '0', transform: 'translateY(30px)' },
      final: { opacity: '1', transform: 'translateY(0)' },
      duration: '0.6s',
      easing: 'ease-out'
    },
    fadeInLeft: {
      initial: { opacity: '0', transform: 'translateX(-30px)' },
      final: { opacity: '1', transform: 'translateX(0)' },
      duration: '0.6s',
      easing: 'ease-out'
    },
    fadeInRight: {
      initial: { opacity: '0', transform: 'translateX(30px)' },
      final: { opacity: '1', transform: 'translateX(0)' },
      duration: '0.6s',
      easing: 'ease-out'
    },
    fadeIn: {
      initial: { opacity: '0' },
      final: { opacity: '1' },
      duration: '0.8s',
      easing: 'ease-out'
    },
    scaleIn: {
      initial: { opacity: '0', transform: 'scale(0.9)' },
      final: { opacity: '1', transform: 'scale(1)' },
      duration: '0.5s',
      easing: 'ease-out'
    }
  }
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeScrollAnimations();
  initializeStaggeredAnimations();
  initializeCounterAnimations();
});

// Main function to initialize scroll-triggered animations
function initializeScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationType = element.dataset.animation || 'fadeInUp';
        const delay = element.dataset.delay || '0';
        
        // Apply animation with delay
        setTimeout(() => {
          animateElement(element, animationType);
        }, parseInt(delay));
        
        // Unobserve the element after animation
        observer.unobserve(element);
      }
    });
  }, ANIMATION_CONFIG.observerOptions);

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach(element => {
    // Set initial state
    const animationType = element.dataset.animation || 'fadeInUp';
    setInitialAnimationState(element, animationType);
    
    // Start observing
    observer.observe(element);
  });
}

// Set initial animation state for elements
function setInitialAnimationState(element, animationType) {
  const animation = ANIMATION_CONFIG.animations[animationType];
  if (animation) {
    Object.assign(element.style, animation.initial);
    element.style.transition = `all ${animation.duration} ${animation.easing}`;
  }
}

// Animate element to final state
function animateElement(element, animationType) {
  const animation = ANIMATION_CONFIG.animations[animationType];
  if (animation) {
    Object.assign(element.style, animation.final);
  }
}

// Initialize staggered animations for grids and lists
function initializeStaggeredAnimations() {
  const staggeredContainers = document.querySelectorAll('[data-stagger]');
  
  staggeredContainers.forEach(container => {
    const items = container.querySelectorAll('[data-stagger-item]');
    const staggerDelay = parseInt(container.dataset.staggerDelay) || 150;
    
    items.forEach((item, index) => {
      item.dataset.delay = (index * staggerDelay).toString();
      item.dataset.animate = 'true';
      item.dataset.animation = item.dataset.animation || 'fadeInUp';
    });
  });
}

// Initialize counter animations for statistics
function initializeCounterAnimations() {
  const counters = document.querySelectorAll('[data-counter]');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.target);
        const duration = parseInt(counter.dataset.duration) || 2000;
        
        animateCounter(counter, target, duration);
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

// Animate counter from 0 to target value
function animateCounter(element, target, duration) {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// Utility function to add animations to elements programmatically
function addAnimationToElement(element, animationType = 'fadeInUp', delay = 0) {
  element.dataset.animate = 'true';
  element.dataset.animation = animationType;
  element.dataset.delay = delay.toString();
  
  // Set initial state
  setInitialAnimationState(element, animationType);
  
  // Create new observer for this element
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          animateElement(element, animationType);
        }, delay);
        observer.unobserve(element);
      }
    });
  }, ANIMATION_CONFIG.observerOptions);
  
  observer.observe(element);
}

// Page-specific animation initializers
function initializeHomePageAnimations() {
  // Hero section elements
  const heroElements = document.querySelectorAll('.services-section h1, .services-section p, .services-section .btn');
  heroElements.forEach((element, index) => {
    addAnimationToElement(element, 'fadeInUp', index * 150);
  });
  
  // Service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    addAnimationToElement(card, 'fadeInUp', index * 150);
  });
  
  // Section titles
  const sectionTitles = document.querySelectorAll('.section-title, .about-title, .contact-title');
  sectionTitles.forEach(title => {
    addAnimationToElement(title, 'fadeInUp', 0);
  });
  
  // Team cards
  const teamCards = document.querySelectorAll('.team-card, .director-card');
  teamCards.forEach((card, index) => {
    addAnimationToElement(card, 'fadeInUp', index * 150);
  });
  
  // Event cards
  const eventCards = document.querySelectorAll('.event-card');
  eventCards.forEach((card, index) => {
    addAnimationToElement(card, 'fadeInUp', index * 150);
  });
  
  // Contact info cards
  const contactCards = document.querySelectorAll('.contact-info-card');
  contactCards.forEach((card, index) => {
    addAnimationToElement(card, 'fadeInUp', index * 150);
  });
}

function initializeAboutPageAnimations() {
  // About hero elements
  const aboutHeroElements = document.querySelectorAll('.about-title, .about-text-content');
  aboutHeroElements.forEach((element, index) => {
    addAnimationToElement(element, 'fadeInUp', index * 150);
  });
  
  // Director cards
  const directorCards = document.querySelectorAll('.director-card');
  directorCards.forEach((card, index) => {
    addAnimationToElement(card, 'fadeInUp', index * 150);
  });
  
  // Team member cards
  const memberCards = document.querySelectorAll('.member-card');
  memberCards.forEach((card, index) => {
    addAnimationToElement(card, 'fadeInUp', index * 150);
  });
  
  // Stats section
  const statsItems = document.querySelectorAll('.stat-item');
  statsItems.forEach((item, index) => {
    addAnimationToElement(item, 'fadeInUp', index * 150);
  });
}

function initializeEventsPageAnimations() {
  // Events hero
  const eventsHeroElements = document.querySelectorAll('.events-header h1');
  eventsHeroElements.forEach((element, index) => {
    addAnimationToElement(element, 'fadeInUp', index * 150);
  });
  
  // Event cards
  const eventCards = document.querySelectorAll('.event-card');
  eventCards.forEach((card, index) => {
    addAnimationToElement(card, 'fadeInUp', index * 150);
  });
  
  // Event details
  const eventDetails = document.querySelectorAll('.event-details');
  eventDetails.forEach((detail, index) => {
    addAnimationToElement(detail, 'fadeInUp', index * 150);
  });
}

function initializeContactPageAnimations() {
  // Contact hero
  const contactHeroElements = document.querySelectorAll('.contact-page-heading h1');
  contactHeroElements.forEach((element, index) => {
    addAnimationToElement(element, 'fadeInUp', index * 150);
  });
  
  // Contact info cards
  const contactInfoCards = document.querySelectorAll('.contact-info-card');
  contactInfoCards.forEach((card, index) => {
    addAnimationToElement(card, 'fadeInUp', index * 150);
  });
  
  // Contact form
  const contactForm = document.querySelector('.contact-form-container');
  if (contactForm) addAnimationToElement(contactForm, 'fadeInUp', 150);
  
  // Contact content
  const contactContent = document.querySelector('.contact-form-content');
  if (contactContent) addAnimationToElement(contactContent, 'fadeInUp', 0);
}

function initializeDonationPageAnimations() {
  // Donation hero
  const donationHeroElements = document.querySelectorAll('.donateus-title, .donateus-desc');
  donationHeroElements.forEach((element, index) => {
    addAnimationToElement(element, 'fadeInUp', index * 150);
  });
  
  // Payment method cards
  const paymentCards = document.querySelectorAll('.payment-method-card');
  paymentCards.forEach((card, index) => {
    addAnimationToElement(card, 'fadeInUp', index * 150);
  });
  
  // Account details
  const accountDetails = document.querySelectorAll('.account-details');
  accountDetails.forEach((detail, index) => {
    addAnimationToElement(detail, 'fadeInUp', index * 150);
  });
}

function initializeBloodDonationPageAnimations() {
  // Form hero
  const formHeroElements = document.querySelectorAll('.contact-page-heading h1, .form-description');
  formHeroElements.forEach((element, index) => {
    addAnimationToElement(element, 'fadeInUp', index * 150);
  });
  
  // Form sections
  const formSections = document.querySelectorAll('.form-section');
  formSections.forEach((section, index) => {
    addAnimationToElement(section, 'fadeInUp', index * 150);
  });
  
  // Form fields
  const formFields = document.querySelectorAll('.form-group');
  formFields.forEach((field, index) => {
    addAnimationToElement(field, 'fadeInUp', index * 100);
  });
}

// Auto-detect page and initialize appropriate animations
function initializePageAnimations() {
  const currentPage = getCurrentPageFromURL();
  
  switch(currentPage) {
    case 'index':
    case 'home':
      initializeHomePageAnimations();
      break;
    case 'about':
      initializeAboutPageAnimations();
      break;
    case 'events':
      initializeEventsPageAnimations();
      break;
    case 'contact':
      initializeContactPageAnimations();
      break;
    case 'donation':
      initializeDonationPageAnimations();
      break;
    case 'bloodDonorForm':
      initializeBloodDonationPageAnimations();
      break;
    default:
      // Fallback: initialize basic animations
      initializeScrollAnimations();
  }
}

// Helper function to detect current page from URL
function getCurrentPageFromURL() {
  const path = window.location.pathname;
  if (path.includes('about.html')) return 'about';
  if (path.includes('events.html')) return 'events';
  if (path.includes('eventsdetail.html')) return 'events';
  if (path.includes('contact.html')) return 'contact';
  if (path.includes('donation.html')) return 'donation';
  if (path.includes('bloodDonorForm.html')) return 'bloodDonorForm';
  return 'index';
}

// Initialize page-specific animations
document.addEventListener('DOMContentLoaded', function() {
  // Small delay to ensure all elements are rendered
  setTimeout(initializePageAnimations, 100);
});

// Export functions for use in other scripts
window.AnimationSystem = {
  addAnimationToElement,
  initializeScrollAnimations,
  initializeStaggeredAnimations,
  initializeCounterAnimations
};
