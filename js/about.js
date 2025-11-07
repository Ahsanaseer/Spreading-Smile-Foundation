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

// =================================================OUR TEAM SECTION FUNCTIONALITY==============================================================================
// Function to create a team member card
const createTeamMemberCard = (memberData) => {
  const { pictureUrl, fullName, designation, quote } = memberData;
  
  // Use provided image or placeholder
  const imageSrc = pictureUrl && pictureUrl.trim() !== '' ? pictureUrl : createPlaceholderImage();
  
  // Create card element
  const card = document.createElement('div');
  card.className = 'team-member-card';
  
  card.innerHTML = `
    <div class="team-member-image">
      <img src="${createPlaceholderImage()}" alt="${fullName}" class="team-member-img" data-src="${imageSrc}">
    </div>
    <div class="team-member-info">
      <h2 class="team-member-name">${fullName || 'Team Member'}</h2>
      <p class="team-member-role">${designation || 'Member'}</p>
      <p class="team-member-description">${quote || ''}</p>
    </div>
  `;
  
  // Load real image in background
  const img = card.querySelector('.team-member-img');
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

// Function to fetch and render team members
const fetchAndRenderTeamMembers = async () => {
  // Get DOM elements for team section
  const teamGridContainer = document.getElementById('team-grid-container');
  const teamLoaderContainer = document.getElementById('team-loader-container');
  
  if (!teamGridContainer || !teamLoaderContainer) {
    console.log('Team section elements not found');
    return;
  }
  
  // Show loader and hide grid
  teamLoaderContainer.style.display = 'flex';
  teamGridContainer.style.display = 'none';
  
  try {
    console.log('Fetching team data from Firebase...');
    
    // Fetch membersData document from config collection
    const membersDataDoc = await getDoc(doc(db, 'config', 'membersData'));
    
    if (!membersDataDoc.exists()) {
      console.log('No membersData document found');
      teamLoaderContainer.style.display = 'none';
      teamGridContainer.style.display = 'grid';
      teamGridContainer.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; min-height: 200px; width: 100%; grid-column: 1 / -1;"><p style="text-align: center; color: #666; padding: 40px; font-size: 1.1rem;">No team members found!</p></div>';
      return;
    }
    
    const membersData = membersDataDoc.data();
    console.log('Team data fetched:', membersData);
    
    // Clear existing cards
    teamGridContainer.innerHTML = '';
    
    // Collect all team member arrays
    const teamMembers = [];
    
    // Iterate through all fields in the document
    Object.keys(membersData).forEach((key) => {
      const fieldValue = membersData[key];
      
      // Check if the field is an array with at least 5 elements (0-4 indices)
      if (Array.isArray(fieldValue) && fieldValue.length >= 5) {
        const pictureUrl = fieldValue[0] || '';
        const fullName = fieldValue[1] || '';
        const designation = fieldValue[2] || '';
        const quote = fieldValue[3] || '';
        const position = fieldValue[4] !== undefined ? Number(fieldValue[4]) : 999; // Default to 999 if position not provided
        
        // Only add if we have at least a name
        if (fullName && fullName.trim() !== '') {
          teamMembers.push({
            pictureUrl,
            fullName,
            designation,
            quote,
            position
          });
        }
      }
    });
    
    if (teamMembers.length === 0) {
      console.log('No valid team members found in data');
      teamLoaderContainer.style.display = 'none';
      teamGridContainer.style.display = 'grid';
      teamGridContainer.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; min-height: 200px; width: 100%; grid-column: 1 / -1;"><p style="text-align: center; color: #666; padding: 40px; font-size: 1.1rem;">No team members found!</p></div>';
      return;
    }
    
    // Sort by position number (ascending order)
    teamMembers.sort((a, b) => a.position - b.position);
    
    console.log(`Rendering ${teamMembers.length} team members`);
    
    // Render sorted team member cards
    teamMembers.forEach((member) => {
      const card = createTeamMemberCard(member);
      teamGridContainer.appendChild(card);
    });
    
    // Hide loader and show grid
    teamLoaderContainer.style.display = 'none';
    teamGridContainer.style.display = 'grid';
    
  } catch (error) {
    console.error('Error fetching team members:', error);
    teamLoaderContainer.style.display = 'none';
    teamGridContainer.style.display = 'grid';
    teamGridContainer.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; min-height: 200px; width: 100%; grid-column: 1 / -1;"><p style="text-align: center; color: #e74c3c; padding: 40px; font-size: 1.1rem;">Error loading team members! Please try again later.</p></div>';
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('About page loaded - fetching directors data...');
  fetchAndRenderDirectors();
  
  // Fetch and render team members
  fetchAndRenderTeamMembers();
});
