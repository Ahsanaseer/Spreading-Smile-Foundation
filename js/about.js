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

// Get DOM elements
const directorCardsContainer = document.getElementById('director-cards-container');
const loaderContainer = document.getElementById('directors-loader-container');

// Placeholder image path
const createPlaceholderImage = () => {
  return "Picrures All/placeholder-img.png";
};

// Function to create a director card
const createDirectorCard = (directorData, index) => {
  const { pictureUrl, fullName, designation, quote } = directorData;
  
  // Use provided image or placeholder
  const imageSrc = pictureUrl && pictureUrl.trim() !== '' ? pictureUrl : createPlaceholderImage();
  
  // Create card element
  const card = document.createElement('div');
  card.className = 'director-card';
  card.setAttribute('data-stagger-item', 'true');
  
  card.innerHTML = `
    <img src="${createPlaceholderImage()}" alt="${fullName}" class="director-img" data-src="${imageSrc}">
    <div class="director-card-body">
      <h2 class="director-name">${fullName || 'Director'}</h2>
      <h3 class="director-role">${designation || 'Director'}</h3>
      <p class="director-description">${quote || ''}</p>
    </div>
  `;
  
  // Load real image in background
  const img = card.querySelector('.director-img');
  const realImageSrc = img.getAttribute('data-src');
  
  if (realImageSrc && realImageSrc !== createPlaceholderImage()) {
    const tempImg = new Image();
    tempImg.onload = () => {
      img.src = realImageSrc;
    };
    tempImg.onerror = () => {
      console.warn(`Failed to load image for ${fullName}: ${realImageSrc}`);
      // Keep placeholder on error
    };
    tempImg.src = realImageSrc;
  }
  
  return card;
};

// Function to fetch and render directors
const fetchAndRenderDirectors = async () => {
  // Show loader and hide containers
  loaderContainer.style.display = 'flex';
  directorCardsContainer.style.display = 'none';
  
  try {
    console.log('Fetching directors data from Firebase...');
    
    // Fetch directorsData document from config collection
    const directorsDataDoc = await getDoc(doc(db, 'config', 'directorsData'));
    
    if (!directorsDataDoc.exists()) {
      console.log('No directorsData document found');
      loaderContainer.style.display = 'none';
      directorCardsContainer.style.display = 'flex';
      directorCardsContainer.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; min-height: 200px; width: 100%;"><p style="text-align: center; color: #666; padding: 40px; font-size: 1.1rem;">No directors found!</p></div>';
      return;
    }
    
    const directorsData = directorsDataDoc.data();
    console.log('Directors data fetched:', directorsData);
    
    // Clear existing cards
    directorCardsContainer.innerHTML = '';
    
    // Collect all director arrays
    const directors = [];
    
    // Iterate through all fields in the document
    Object.keys(directorsData).forEach((key) => {
      const fieldValue = directorsData[key];
      
      // Check if the field is an array with at least 5 elements (0-4 indices)
      if (Array.isArray(fieldValue) && fieldValue.length >= 5) {
        const pictureUrl = fieldValue[0] || '';
        const fullName = fieldValue[1] || '';
        const designation = fieldValue[2] || '';
        const quote = fieldValue[3] || '';
        const position = fieldValue[4] !== undefined ? Number(fieldValue[4]) : 999; // Default to 999 if position not provided
        
        // Only add if we have at least a name
        if (fullName && fullName.trim() !== '') {
          directors.push({
            pictureUrl,
            fullName,
            designation,
            quote,
            position
          });
        }
      }
    });
    
    if (directors.length === 0) {
      console.log('No valid directors found in data');
      loaderContainer.style.display = 'none';
      directorCardsContainer.style.display = 'flex';
      directorCardsContainer.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; min-height: 200px; width: 100%;"><p style="text-align: center; color: #666; padding: 40px; font-size: 1.1rem;">No directors found!</p></div>';
      return;
    }
    
    // Sort by position number (ascending order)
    directors.sort((a, b) => a.position - b.position);
    
    console.log(`Rendering ${directors.length} directors`);
    
    // Render sorted director cards
    directors.forEach((director, index) => {
      const card = createDirectorCard(director, index);
      directorCardsContainer.appendChild(card);
    });
    
    // Hide loader and show containers
    loaderContainer.style.display = 'none';
    directorCardsContainer.style.display = 'flex';
    
  } catch (error) {
    console.error('Error fetching directors:', error);
    loaderContainer.style.display = 'none';
    directorCardsContainer.style.display = 'flex';
    directorCardsContainer.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; min-height: 200px; width: 100%;"><p style="text-align: center; color: #e74c3c; padding: 40px; font-size: 1.1rem;">Error loading directors! Please try again later.</p></div>';
  }
};

// Member Reviews slider logic for about.html - dynamically loaded from Firebase
let members = [];

// Current member index for slider (scoped outside function)
let currentMember = 0;
let sliderInitialized = false;

// Function to fetch and populate members from Firebase
const fetchAndPopulateMembers = async () => {
  const loaderContainer = document.getElementById('member-reviews-loader-container');
  const memberReviewCard = document.getElementById('member-review-card');
  const memberReviewsNav = document.getElementById('member-reviews-nav');
  
  // Show loader and hide content
  if (loaderContainer) loaderContainer.style.display = 'flex';
  if (memberReviewCard) memberReviewCard.style.display = 'none';
  if (memberReviewsNav) memberReviewsNav.style.display = 'none';
  
  try {
    console.log('Fetching volunteers data from Firebase...');
    
    // Fetch volunteersData document from config collection
    const volunteerDataDoc = await getDoc(doc(db, 'config', 'volunteersData'));
    
    if (!volunteerDataDoc.exists()) {
      console.log('No volunteersData document found');
      if (loaderContainer) loaderContainer.style.display = 'none';
      if (memberReviewCard) memberReviewCard.style.display = 'flex';
      return;
    }
    
    const volunteerData = volunteerDataDoc.data();
    console.log('Volunteer data fetched:', volunteerData);
    
    // Clear existing members
    members = [];
    
    // Iterate through all fields in the document
    Object.keys(volunteerData).forEach((key) => {
      const fieldValue = volunteerData[key];
      
      // Check if the field is an array with at least 4 elements (0-3 indices)
      // Structure: 0: picture URL, 1: name, 2: quote, 3: position
      if (Array.isArray(fieldValue) && fieldValue.length >= 4) {
        const pictureUrl = fieldValue[0] || '';
        const name = fieldValue[1] || '';
        const quote = fieldValue[2] || '';
        const position = fieldValue[3] !== undefined ? Number(fieldValue[3]) : 999; // Default to 999 if position not provided
        
        // Only add if we have at least a name
        if (name && name.trim() !== '') {
          members.push({
            name,
            img: pictureUrl && pictureUrl.trim() !== '' ? pictureUrl : createPlaceholderImage(),
            desc: quote,
            position: position
          });
        }
      }
    });
    
    if (members.length === 0) {
      console.log('No valid volunteers found in data');
      if (loaderContainer) loaderContainer.style.display = 'none';
      if (memberReviewCard) memberReviewCard.style.display = 'flex';
      return;
    }
    
    // Sort by position number (ascending order)
    members.sort((a, b) => a.position - b.position);
    
    console.log(`Loaded ${members.length} volunteers`);
    console.log('Members data:', members);
    
    // Hide loader and show content
    if (loaderContainer) loaderContainer.style.display = 'none';
    if (memberReviewCard) {
      memberReviewCard.removeAttribute('style');
    }
    if (memberReviewsNav) {
      memberReviewsNav.removeAttribute('style');
    }
    
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      // Initialize the slider with first member
      initializeMemberSlider();
    }, 100);
    
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    console.error('Error details:', error.message, error.stack);
    if (loaderContainer) loaderContainer.style.display = 'none';
    if (memberReviewCard) {
      memberReviewCard.removeAttribute('style');
    }
    if (memberReviewsNav) {
      memberReviewsNav.removeAttribute('style');
    }
    
    // Fallback: initialize with empty array or default
    setTimeout(() => {
      initializeMemberSlider();
    }, 100);
  }
};

// Function to initialize member slider
const initializeMemberSlider = () => {
  if (members.length === 0) {
    console.log('No members to display');
    return;
  }
  
  const memberName = document.getElementById('member-name');
  const memberDesc = document.getElementById('member-desc');
  const memberImg = document.getElementById('member-img');
  const prevBtn = document.getElementById('member-prev-btn');
  const nextBtn = document.getElementById('member-next-btn');

  if (!memberName || !memberDesc || !memberImg) {
    console.log('Member review elements not found');
    return;
  }

  // Reset to first member
  currentMember = 0;

  // Display first member
  memberName.textContent = members[0].name;
  memberDesc.textContent = members[0].desc || '';
  
  // Load first image
  const firstImg = new Image();
  firstImg.onload = () => {
    memberImg.src = members[0].img;
    memberImg.alt = members[0].name;
    memberImg.classList.remove('loading');
    memberImg.classList.add('slide-in');
  };
  firstImg.onerror = () => {
    memberImg.src = createPlaceholderImage();
    memberImg.alt = members[0].name;
    memberImg.classList.remove('loading');
    memberImg.classList.add('slide-in');
  };
  memberImg.src = createPlaceholderImage();
  memberImg.alt = members[0].name;
  memberImg.classList.add('loading');
  firstImg.src = members[0].img;

  function updateMember(idx, direction = 'right') {
    if (!memberImg || !memberName || !memberDesc || members.length === 0) return;
    
    // Animate out
    memberImg.classList.remove('slide-in');
    memberImg.classList.add(direction === 'right' ? 'slide-left' : 'slide-right');
    
    setTimeout(() => {
      // Update text content immediately
      memberName.textContent = members[idx].name;
      memberDesc.textContent = members[idx].desc || '';
      
      // Show placeholder while loading new image
      memberImg.src = createPlaceholderImage();
      memberImg.alt = members[idx].name;
      memberImg.classList.add('loading');
      
      // Load the actual image in background
      const realImg = new Image();
      realImg.src = members[idx].img;
      
      realImg.onload = () => {
        // Smoothly replace placeholder with actual image
        memberImg.src = members[idx].img;
        memberImg.classList.remove('loading');
      };
      
      realImg.onerror = () => {
        // Fallback to placeholder if image fails to load
        memberImg.src = createPlaceholderImage();
        memberImg.classList.remove('loading');
      };
      
      // Animate in
      memberImg.classList.remove('slide-left', 'slide-right');
      memberImg.classList.add('slide-in');
    }, 400);
  }

  // Only add event listeners once
  if (!sliderInitialized && prevBtn && nextBtn && members.length > 0) {
    prevBtn.addEventListener('click', () => {
      currentMember = (currentMember - 1 + members.length) % members.length;
      updateMember(currentMember, 'left');
    });
    
    nextBtn.addEventListener('click', () => {
      currentMember = (currentMember + 1) % members.length;
      updateMember(currentMember, 'right');
    });
    
    sliderInitialized = true;
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('About page loaded - fetching directors data...');
  fetchAndRenderDirectors();
  
  // Fetch and populate members from Firebase
  fetchAndPopulateMembers();
});
