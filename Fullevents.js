// Firebase imports from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCgYJmsDvgZeGD-Gq2yzXMPKhSs8YmmitQ",
  authDomain: "spreading-smile-foundation.firebaseapp.com",
  projectId: "spreading-smile-foundation",
  storageBucket: "spreading-smile-foundation.appspot.com",
  messagingSenderId: "232128085724",
  appId: "1:232128085724:web:3733b285474fd63f38c05e",
  measurementId: "G-ZC6Y3KJMLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Predefined NGO summaries for random selection
const ngoSummaries = [
  "Spreading Smile Foundation is dedicated to bring hope to communities community service initiatives.",
  "We are committed to make a positive impact in society through community development programs.",
  "Our foundation works tirelessly to support underprivileged communities for a better tomorrow.",
  "Spreading Smile Foundation focuses on empowering communities through humanitarian assistance.",
  "We believe in the power of collective action to create lasting positive change in society.",
  "Our mission is to serve humanity with integrity, and dedication to build stronger communities.",
  "Spreading Smile Foundation strives to address humanity innovative programs and community partnerships.",
  "We are passionate about creating opportunities for growth and development in communities.",
  "Our foundation is committed to fostering hope, dignity, and empowerment through humanitarian initiatives.",
  "Spreading Smile Foundation works to create opportunities for all community members.",
  "We focus on sustainable community development through education, healthcare, and social welfare programs.",
  "Our organization is dedicated to serve humanity with genuine care for communities.",
  "This NGO believes in the transformative power of community service and charitable giving.",
  "We work towards creating a more equitable society through community engagement.",
  "Our foundation is committed to build resilient communities through our development programs."
];

// Get DOM elements
const loadingContainer = document.getElementById("loading-container");
const errorContainer = document.getElementById("error-container");
const eventDetailsContainer = document.getElementById("event-details-container");

// Get event ID from URL query string
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('id');

// Global variables for carousel
let currentSlide = 0;
let slides = [];
let dots = [];
let totalSlides = 0;

// Placeholder image path
const createPlaceholderImage = () => {
  return "Picrures All/placeholder-img.png";
};

// Format date function
const formatDate = (dateString) => {
  if (!dateString) return "Date not available";
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
};

// Format time function
const formatTime = (timeString) => {
  if (!timeString) return "Time not available";
  return timeString;
};



// Create carousel images
const createCarouselImages = (images) => {
  const carouselImages = document.getElementById('carousel-images');
  const carouselDots = document.getElementById('carousel-dots');
  
  // Clear existing content
  carouselImages.innerHTML = '';
  carouselDots.innerHTML = '';
  
  if (!images || images.length === 0) {
    // Add placeholder image
    const placeholderImg = document.createElement('img');
    placeholderImg.src = createPlaceholderImage();
    placeholderImg.alt = "Event Image";
    placeholderImg.className = "carousel-image";
    carouselImages.appendChild(placeholderImg);
    
    // Add single dot
    const dot = document.createElement('button');
    dot.className = "carousel-dot active";
    dot.onclick = () => goToSlide(0);
    carouselDots.appendChild(dot);
    
    slides = [placeholderImg];
    dots = [dot];
    totalSlides = 1;
  } else {
    // Add all images
    images.forEach((imageSrc, index) => {
      const img = document.createElement('img');
      img.src = imageSrc;
      img.alt = `Event Image ${index + 1}`;
      img.className = "carousel-image";
      carouselImages.appendChild(img);
      
      // Create dot
      const dot = document.createElement('button');
      dot.className = index === 0 ? "carousel-dot active" : "carousel-dot";
      dot.onclick = () => goToSlide(index);
      carouselDots.appendChild(dot);
      
      slides.push(img);
      dots.push(dot);
    });
    
    totalSlides = slides.length;
  }
};

// Carousel functions
function showSlide(n) {
  if (totalSlides === 0) return;
  
  const carousel = document.getElementById('carousel-images');
  currentSlide = (n + totalSlides) % totalSlides;
  
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function changeSlide(direction) {
  showSlide(currentSlide + direction);
}

function goToSlide(n) {
  showSlide(n);
}

// Make functions globally available
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;

// Auto-advance carousel every 5 seconds
let autoAdvanceInterval;

const startAutoAdvance = () => {
  autoAdvanceInterval = setInterval(() => {
    changeSlide(1);
  }, 5000);
};

const stopAutoAdvance = () => {
  if (autoAdvanceInterval) {
    clearInterval(autoAdvanceInterval);
  }
};

// Touch/swipe support for mobile
let startX = 0;
let endX = 0;

const setupTouchSupport = () => {
  const carousel = document.getElementById('carousel-images');
  
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });
};

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = startX - endX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      changeSlide(1); // Swipe left - next
    } else {
      changeSlide(-1); // Swipe right - previous
    }
  }
}

// Fetch event data from Firestore
const fetchEventData = async () => {
  if (!eventId) {
    showError("No event ID provided in the URL. Please select an event from the events page.");
    return;
  }

  try {
    const eventDoc = await getDoc(doc(db, "allEvents", eventId));
    
    if (!eventDoc.exists()) {
      showError("Event not found. The event may have been removed or the ID is incorrect.");
      return;
    }

    const eventData = eventDoc.data();
    displayEventData(eventData);
    
  } catch (error) {
    console.error("Error fetching event:", error);
    showError("Error loading event data. Please check your internet connection and try again.");
  }
};

// Display event data
const displayEventData = (eventData) => {
  // Update page title
  document.title = `${eventData.title || 'Event'} - Spreading Smile Foundation`;
  
  // Update header
  document.getElementById('event-title').textContent = eventData.title || 'Event Title';
  
  // Create subtitle with random NGO summary as fallback
  let subtitle = eventData.subtitle;
  
  // If no custom subtitle, use random NGO summary instead of description
  if (!subtitle) {
    const randomIndex = Math.floor(Math.random() * ngoSummaries.length);
    subtitle = ngoSummaries[randomIndex];
  }
  
  document.getElementById('event-subtitle').textContent = subtitle;
  
  // Update event info
  document.getElementById('event-date').textContent = formatDate(eventData.date);
  document.getElementById('event-time').textContent = formatTime(eventData.time);
  document.getElementById('event-venue').textContent = eventData.address || 'Venue not available';
  
  // Update description
  const descriptionElement = document.getElementById('event-description');
  if (eventData.description) {
    // Split description into paragraphs
    const paragraphs = eventData.description.split('\n').filter(p => p.trim());
    descriptionElement.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
  } else {
    descriptionElement.innerHTML = '<p>No description available for this event.</p>';
  }
  
  // Update hashtags if available
  if (eventData.hashtags && eventData.hashtags.length > 0) {
    const hashtagsElement = document.getElementById('event-hashtags');
    hashtagsElement.innerHTML = eventData.hashtags.map(tag => 
      `<span class="hashtag">#${tag}</span>`
    ).join('');
  }
  
  // Create carousel images
  createCarouselImages(eventData.imagesPublic);
  
  // Initialize carousel
  showSlide(0);
  setupTouchSupport();
  startAutoAdvance();
  
  // Show event details
  loadingContainer.style.display = 'none';
  eventDetailsContainer.style.display = 'block';
};

// Show error
const showError = (message) => {
  loadingContainer.style.display = 'none';
  errorContainer.style.display = 'block';
  
  const errorMessage = document.getElementById('error-message');
  if (errorMessage) {
    errorMessage.textContent = message;
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (!eventId) {
    showError("No event ID provided in the URL. Please select an event from the events page.");
    return;
  }
  
  fetchEventData();
});

// Pause auto-advance on hover
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carousel-images');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoAdvance);
    carousel.addEventListener('mouseleave', startAutoAdvance);
  }
});