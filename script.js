// Firebase imports from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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



// Function to get progress bar color based on percentage
const getProgressBarColor = (percentage) => {
  if (percentage <= 30) {
    return '#e74c3c'; // Red
  } else if (percentage > 30 && percentage < 70) {
    return '#EEBB1B'; // Secondary color
  } else if (percentage >= 70 && percentage <= 100) {
    return '#46C0B2'; // Primary color
  }
};



// Function to create a case card
const createCaseCard = (caseData, caseId) => {
  const { title, imagesPublic, collectedAmount, requiredAmount, status } = caseData;
  
  // Convert string values to numbers
  const raisedStr = caseData.collectedAmount;    
  const goalStr = caseData.requiredAmount;       
  const raised = Number(raisedStr.replace(/,/g, ""));
  const goal = Number(goalStr.replace(/,/g, ""));
  
  const percentage = goal > 0 ? (raised / goal) * 100 : 0;

  
  // Get progress bar color
  const progressBarColor = getProgressBarColor(percentage);
  
  // Get image source
  const imageSrc = caseData.imagesPublic && caseData.imagesPublic.length > 0 ? caseData.imagesPublic[0] : createPlaceholderImage();
  
  // Create card element
  const card = document.createElement('div');
  card.className = 'Cases-card';
  
  // Set progress indicator text
  const progressText = `${Math.round(percentage)}%`;
  
  card.innerHTML = `
    <div class="Cases-image">
      <img src="${createPlaceholderImage()}" alt="${title}" class="Cases-img">
      <div class="progress-indicator">${progressText}</div>
    </div>
    <div class="Cases-content">
      <h3 class="Cases-title">${title}</h3>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${percentage}%; background: ${progressBarColor}"></div>
      </div>
      <div class="Cases-details">
        <span class="raised">Raised - Rs ${raised}</span>
        <span class="goal">Goal - Rs ${goal}</span>
      </div>
      <a href="donation.html" class="donate-btn">
        <span>Donate Now</span>
        <span class="donate-arrow">→</span>
      </a>
    </div>
  `;
  
  // Load real image in background
  const img = card.querySelector('.Cases-img');
  if (imageSrc !== createPlaceholderImage()) {
    const realImg = new Image();
    realImg.src = imageSrc;
    
    realImg.onload = () => {
      img.src = imageSrc;
    };
    
    realImg.onerror = () => {
      img.src = createPlaceholderImage();
    };
  }
  
  return card;
};




// Function to fetch and render processing cases
const fetchAndRenderProcessingCases = async () => {
  const casesCardsWrapper = document.getElementById('cases-cards-wrapper');
  const loaderContainer = document.getElementById('loader-container');
  
  // Show loader and hide cards wrapper
  loaderContainer.style.display = 'flex';
  casesCardsWrapper.style.display = 'none';
  
  try {
    const querySnapshot = await getDocs(collection(db, "allCases"));
    
    if (querySnapshot.empty) {
      console.log("No cases found");
      // Hide loader and show cards wrapper
      loaderContainer.style.display = 'none';
      casesCardsWrapper.style.display = 'flex';
      casesCardsWrapper.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">No processing cases found.</p>';
      return;
    }
    
    // Clear existing cards
    casesCardsWrapper.innerHTML = '';
    
    // Filter and render processing cases
    querySnapshot.forEach((doc) => {
      const caseData = doc.data();
      const caseId = doc.id;
    
      if (caseData.status === "processing") {
        const card = createCaseCard(caseData, caseId);
        casesCardsWrapper.appendChild(card);
      }
    });
    
    // Hide loader and show cards wrapper
    loaderContainer.style.display = 'none';
    casesCardsWrapper.style.display = 'flex';
    
    // If no processing cases found
    if (casesCardsWrapper.children.length === 0) {
      casesCardsWrapper.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">No processing cases found.</p>';
    }
    
  } catch (error) {
    console.error("Error fetching cases:", error);
    // Hide loader and show cards wrapper
    loaderContainer.style.display = 'none';
    casesCardsWrapper.style.display = 'flex';
    casesCardsWrapper.innerHTML = '<p style="text-align: center; color: #e74c3c; padding: 40px;">Error loading cases. Please try again later.</p>';
  }
};



  






















// ===================== HOME PAGE SPECIFIC LOGIC =====================



// Member Reviews slider logic
const members = [
    {
        name: 'Kashmala',
        img: 'Picrures All/kashmala.jpeg',
        desc: `Spreading Smile Foundation holds a special place in my heart for the incredible work they do in uplifting underprivileged communities. Their commitment to education, healthcare, and social support has a profound impact, transforming lives and offering a brighter future. They bring hope to those who need it most, ensuring that everyone has access to essential resources. Witnessing their work firsthand is both humbling and inspiring.`
    },
    {
        name: 'Ghusharib',
        img: 'Picrures All/ghusharib.jpeg',
        desc: `Spreading Smile Foundation is committed to creating lasting change for those who need it the most. Focused on supporting specially-abled children, the elderly in care homes, and families in need, the organization works relentlessly to provide education, healthcare, and community empowerment. Their programs are designed to be sustainable and tailored to the specific needs of each group they serve.`
    },
    {
        name: 'Hamnah',
        img: 'Picrures All/hamnah.jpeg',
        desc: `I am Hamna Irfan, a psychologist and a proud member of this incredible NGO. What makes this organization special is its commitment to transforming lives, spreading positivity, and restoring hope to those who need it most. One of its most inspiring initiatives is the volunteer program, which empowers youth by boosting their skills, confidence, and helping them achieve their dreams. It brings together passionate individuals dedicated to serving humanity.`
    },
    {
        name: 'Esha',
        img: 'Picrures All/Esha.jpg',
        desc: 'Spreading Smile Foundation has profoundly impacted me. Working with them, I\'ve realized that hope still exists. Despite the challenges we face, there are good people in society who are eager to make a difference. This belief in humanity gives me hope. The NGO truly cares for its donors and takes responsibility for delivering aid to those in genuine need. My experience with this organization has been transformative, helping me grow personally.'
    },
    {
        name: 'Hamza',
        img: 'Picrures All/Hamza.jpeg',
        desc: `Being part of Spreading Smiles Foundation for two years has been incredibly rewarding. I started as a volunteer in the 2023 Ramadan Program, inspired by the organization's dedication and transparency. This led me to join the team, where I've seen passionate individuals working hard to bring joy. The team welcomed me from the start, and the selection process was merit-based. Volunteering has allowed me to make a real difference, whether through outreach or simple acts of kindness.`
    }
];

// Placeholder image path
const createPlaceholderImage = () => {
    return "Picrures All/placeholder-img.png";
};

document.addEventListener('DOMContentLoaded', function() {
  // Fetch and render processing cases
  fetchAndRenderProcessingCases();
  
  let currentMember = 0;
  const memberName = document.getElementById('member-name');
  const memberDesc = document.getElementById('member-desc');
  const memberImg = document.getElementById('member-img');
  const prevBtn = document.getElementById('member-prev-btn');
  const nextBtn = document.getElementById('member-next-btn');

  function updateMember(idx, direction = 'right') {
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

  // Video modal functionality
  const playBtn = document.getElementById('yt-video-btn');
  const videoOverlay = document.getElementById('video-overlay');
  const closeBtn = document.getElementById('close-btn');
  const youtubeFrame = document.getElementById('youtube-frame');

  if (playBtn && videoOverlay && closeBtn && youtubeFrame) {
      playBtn.addEventListener('click', () => {
          videoOverlay.style.display = 'flex';
          youtubeFrame.src = "https://www.youtube.com/embed/mlzBAI8u1-8?autoplay=1";
      });

      closeBtn.addEventListener('click', () => {
          videoOverlay.style.display = 'none';
          youtubeFrame.src = "";
      });
  }
  // Cases cards navigation functionality
  const casesLeftBtn = document.getElementById('casesleft');
  const casesRightBtn = document.getElementById('casesright');
  const casesCardsWrapper = document.getElementById('cases-cards-wrapper');

  if (casesLeftBtn && casesRightBtn && casesCardsWrapper) {
      casesLeftBtn.addEventListener('click', () => {
          const cardWidth = 380 + 24; // card width + gap
          casesCardsWrapper.scrollBy({
              left: -cardWidth,
              behavior: 'smooth'
          });
      });

      casesRightBtn.addEventListener('click', () => {
          const cardWidth = 380 + 24; // card width + gap
          casesCardsWrapper.scrollBy({
              left: cardWidth,
              behavior: 'smooth'
          });
      });
  }
});

// Blood form function
function bloodformfunc() {
  window.location.href = "bloodDonorForm.html";
}