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

// Member Reviews slider logic for about.html (keeping existing functionality)
const members = [
    {
        name: 'Ume Habiba',
        img: 'Picrures All/umehabiba.jpg',
        desc: `Working for humanity is a noble pursuit that transcends borders and boundaries. It's about dedicating oneself to the greater good, promoting equality, and protecting human rights that i have seen while working with spreading amile foundation. By serving humanity, we can create a brighter future for generations to come.`
    },
    {
        name: 'Fawaz',
        img: 'Picrures All/fawaz.jpg',
        desc: `I am truly impressed by the incredible work that Spreading Smile Foundation is doing to support those in need. The team's commitment to making a difference is evident in their transparent approach, compassionate service, and the tangible changes they bring to people's lives. Seeing the smiles they create and the hope they restore is truly heartwarming. Keep up the amazing work.`
    },
    {
        name: 'Laiba',
        img: 'Picrures All/laiba.jpg',
        desc: `I had the privilege of working with Spreading Smile Foundation, an NGO that has left an indelible mark on my life. My tenure with the organization was a transformative journey that not only honed my skills but also instilled in me a sense of purpose and fulfillment.
The foundation provided me with a platform to develop my leadership qualities, teamwork, and communication skills. 
Every case was thoroughly verified, and the team's enthusiasm and dedication to their work were palpable.
 I am grateful for the opportunity to have worked with such a reputable organization and highly recommend them to anyone looking to make a meaningful difference in the lives of others`
    },
    {
        name: 'Muneeb',
        img: 'Picrures All/muneeb.jpg',
        desc: `Working with Spreading Smile Foundation is a truly fulfilling experience. The passion and dedication of the team make every task feel meaningful and I am constantly inspired by the impact we are making.`
    }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('About page loaded - fetching directors data...');
  fetchAndRenderDirectors();
  
  // Member Reviews slider logic (existing functionality)
  let currentMember = 0;
  const memberName = document.getElementById('member-name');
  const memberDesc = document.getElementById('member-desc');
  const memberImg = document.getElementById('member-img');
  const prevBtn = document.getElementById('member-prev-btn');
  const nextBtn = document.getElementById('member-next-btn');

  function updateMember(idx, direction = 'right') {
      if (!memberImg || !memberName || !memberDesc) return;
      
      // Animate out
      memberImg.classList.remove('slide-in');
      memberImg.classList.add(direction === 'right' ? 'slide-left' : 'slide-right');
      
      setTimeout(() => {
          // Update text content immediately
          memberName.textContent = members[idx].name;
          memberDesc.textContent = members[idx].desc;
          
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

  if (memberImg && prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
          currentMember = (currentMember - 1 + members.length) % members.length;
          updateMember(currentMember, 'left');
      });
      
      nextBtn.addEventListener('click', () => {
          currentMember = (currentMember + 1) % members.length;
          updateMember(currentMember, 'right');
      });
      
      // Initial state
      memberImg.classList.add('slide-in');
  }
});
