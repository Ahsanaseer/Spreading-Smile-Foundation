// Firebase imports from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

// Function to parse deadline string and convert to Date object
function parseDeadlineString(deadlineStr) {
    try {
        // Expected format: "09/10/2025 12:45" (Day/Month/Year Time in 24-hour format)
        const [datePart, timePart] = deadlineStr.split(' ');
        const [day, month, year] = datePart.split('/');
        const [hours, minutes] = timePart.split(':');
        
        // Create date in Pakistan timezone (UTC+5)
        // Note: JavaScript Date constructor uses local timezone, so we need to adjust
        const deadlineDate = new Date(year, month - 1, day, hours, minutes);
        
        // Convert to Pakistan timezone (UTC+5)
        const pakistanOffset = 5 * 60; // 5 hours in minutes
        const utcTime = deadlineDate.getTime() + (deadlineDate.getTimezoneOffset() * 60000);
        const pakistanTime = new Date(utcTime + (pakistanOffset * 60000));
        
        return pakistanTime;
    } catch (error) {
        console.error('Error parsing deadline string:', error);
        return null;
    }
}

// Function to get current Pakistan time
function getCurrentPakistanTime() {
    const now = new Date();
    const pakistanOffset = 5 * 60; // 5 hours in minutes
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const pakistanTime = new Date(utcTime + (pakistanOffset * 60000));
    return pakistanTime;
}

// Function to fetch volunteer program title and update banner
async function fetchAndUpdateVolunteerTitle() {
    try {
        console.log('--- Fetching Volunteer Program Title from Firestore ---');
        
        // Fetch config document from Firestore
        const configDoc = await getDoc(doc(db, 'config', 'volunteerDeadline'));
        
        if (!configDoc.exists()) {
            console.log('No config document found in Firestore');
            // Set fallback title
            updateBannerTitle('Winter 2025 Volunteer Program');
            return;
        }
        
        const configData = configDoc.data();
        const title = configData.title;
        
        if (!title) {
            console.log('No title field found in document');
            // Set fallback title
            updateBannerTitle('Winter 2025 Volunteer Program');
            return;
        }
        
        console.log('Fetched title:', title);
        
        // Update the banner title
        updateBannerTitle(title);
        
    } catch (error) {
        console.error('Error fetching volunteer title:', error);
        // Set fallback title on error
        updateBannerTitle('Winter 2025 Volunteer Program');
    }
}

// Helper function to update banner title
function updateBannerTitle(title) {
    const announcementTitle = document.querySelector('.announcement-title');
    if (announcementTitle) {
        // Format: "Our [title] is Live!"
        announcementTitle.textContent = `Our ${title} is Live!`;
        console.log('✅ Banner title updated successfully:', `Our ${title} is Live!`);
    } else {
        console.log('❌ Banner title element not found');
    }
}

// Function to check deadline from Firestore
async function checkDeadlineFromFirestore() {
    try {
        console.log('--- Checking Deadline from Firestore for Banner ---');
        
        // Fetch deadline from Firestore
        const configDoc = await getDoc(doc(db, 'config', 'volunteerDeadline'));
        
        if (!configDoc.exists()) {
            console.log('No deadline document found in Firestore');
            return { isDeadlinePassed: false, error: 'No deadline document found' };
        }
        
        const deadlineStr = configDoc.data().deadline;
        console.log('Fetched deadline string:', deadlineStr);
        
        if (!deadlineStr) {
            console.log('No deadline field found in document');
            return { isDeadlinePassed: false, error: 'No deadline field found' };
        }
        
        // Parse deadline string
        const deadlineDate = parseDeadlineString(deadlineStr);
        if (!deadlineDate) {
            console.log('Failed to parse deadline string');
            return { isDeadlinePassed: false, error: 'Failed to parse deadline' };
        }
        
        // Get current Pakistan time
        const currentTime = getCurrentPakistanTime();
        
        console.log('Deadline Date (Pakistan time):', deadlineDate.toLocaleString());
        console.log('Current Time (Pakistan time):', currentTime.toLocaleString());
        
        // Compare times
        const isDeadlinePassed = currentTime.getTime() > deadlineDate.getTime();
        
        if (isDeadlinePassed) {
            console.log('❌ Deadline has passed! Banner should be hidden.');
        } else {
            console.log('✅ Deadline is not passed, banner should be shown.');
        }
        
        return { isDeadlinePassed, deadlineDate, currentTime };
        
    } catch (error) {
        console.error('Error checking deadline from Firestore:', error);
        return { isDeadlinePassed: false, error: error.message };
    }
}

// Function to control banner visibility based on deadline
async function controlBannerVisibility() {
    const banner = document.getElementById('volunteer-announcement');
    if (!banner) {
        console.log('Banner element not found');
        return;
    }
    
    // First, fetch and update the volunteer program title
    await fetchAndUpdateVolunteerTitle();
    
    const result = await checkDeadlineFromFirestore();
    
    if (result.isDeadlinePassed) {
        // Hide banner if deadline has passed
        banner.style.display = 'none';
        console.log('Banner hidden - deadline has passed');
    } else {
        // Show banner if deadline hasn't passed (use flex to match original CSS)
        banner.style.display = 'flex';
        console.log('Banner shown - deadline has not passed');
    }
}



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
  const { title, imagesPublic, collectedAmount, requiredAmount, status, description } = caseData;
  
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
        <span class="donate-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
      </a>
    </div>
  `;
  
  // Load real image in background
  const img = card.querySelector('.Cases-img');
  
  // Add click functionality to image
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    const finalImageSrc = imageSrc !== createPlaceholderImage() ? imageSrc : createPlaceholderImage();
    const imageAlt = title || 'Case Image';
    openImageModal(finalImageSrc, imageAlt);
  });
  
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




// Function to fetch and render processing cases with cache busting
const fetchAndRenderProcessingCases = async (forceRefresh = false) => {
  const casesCardsWrapper = document.getElementById('cases-cards-wrapper');
  const loaderContainer = document.getElementById('loader-container');
  
  // Show loader and hide cards wrapper
  loaderContainer.style.display = 'flex';
  casesCardsWrapper.style.display = 'none';
  
  try {
    // Add cache busting timestamp
    const cacheBuster = `?t=${Date.now()}&r=${Math.random()}`;
    console.log(`Fetching cases with cache buster: ${cacheBuster}`);
    
    // Force fresh data by disabling cache and using timestamp
    const querySnapshot = await getDocs(collection(db, "allCases"));
    
    if (querySnapshot.empty) {
      console.log("No cases found");
      // Hide loader and show cards wrapper
      loaderContainer.style.display = 'none';
      casesCardsWrapper.style.display = 'flex';
      casesCardsWrapper.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; min-height: 200px; width: 100%;"><p style="text-align: center; color: #666; padding: 40px; font-size: 1.1rem;">No processing cases found!</p></div>';
      return;
    }
    
    // Clear existing cards
    casesCardsWrapper.innerHTML = '';
    
    // Collect all processing cases with their percentages for sorting
    const processingCases = [];
    querySnapshot.forEach((doc) => {
      const caseData = doc.data();
      const caseId = doc.id;
    
      if (caseData.status === "processing") {
        // Calculate percentage for sorting
        const raisedStr = caseData.collectedAmount;    
        const goalStr = caseData.requiredAmount;       
        const raised = Number(raisedStr.replace(/,/g, ""));
        const goal = Number(goalStr.replace(/,/g, ""));
        const percentage = goal > 0 ? (raised / goal) * 100 : 0;
        
        processingCases.push({
          caseData,
          caseId,
          percentage
        });
      }
    });
    
    // Sort cases by percentage (0% to 100%)
    processingCases.sort((a, b) => a.percentage - b.percentage);
    
    // Render sorted cases
    processingCases.forEach(({ caseData, caseId }) => {
      const card = createCaseCard(caseData, caseId);
      casesCardsWrapper.appendChild(card);
    });
    
    // Hide loader and show cards wrapper
    loaderContainer.style.display = 'none';
    casesCardsWrapper.style.display = 'flex';
    
    // If no processing cases found
    if (casesCardsWrapper.children.length === 0) {
      casesCardsWrapper.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; min-height: 200px; width: 100%;"><p style="text-align: center; color: #666; padding: 40px; font-size: 1.1rem;">No processing cases found!</p></div>';
    }
    
  } catch (error) {
    console.error("Error fetching cases:", error);
    // Hide loader and show cards wrapper
    loaderContainer.style.display = 'none';
    casesCardsWrapper.style.display = 'flex';
    casesCardsWrapper.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; min-height: 200px; width: 100%;"><p style="text-align: center; color: #e74c3c; padding: 40px; font-size: 1.1rem;">Error loading cases! Please try again later.</p></div>';
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

// Cache busting and refresh mechanisms
let lastRefreshTime = 0;
const REFRESH_INTERVAL = 30000; // 30 seconds minimum between refreshes

// Function to check if we should refresh data
const shouldRefreshData = () => {
  const now = Date.now();
  return (now - lastRefreshTime) > REFRESH_INTERVAL;
};

// Function to force refresh cases data
const forceRefreshCases = () => {
  if (shouldRefreshData()) {
    console.log('Force refreshing cases data...');
    lastRefreshTime = Date.now();
    fetchAndRenderProcessingCases(true);
  }
};

// Page visibility API - refresh when page becomes visible
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    console.log('Page became visible, refreshing cases...');
    forceRefreshCases();
  }
});

// Refresh on page focus
window.addEventListener('focus', () => {
  console.log('Window focused, refreshing cases...');
  forceRefreshCases();
});

// Refresh on page load/reload
window.addEventListener('load', () => {
  console.log('Page loaded, refreshing cases...');
  forceRefreshCases();
});

// Additional mobile-specific refresh triggers
if ('ontouchstart' in window) {
  // Mobile device detected - add touch refresh
  document.addEventListener('touchstart', () => {
    if (shouldRefreshData()) {
      console.log('Mobile touch detected, refreshing cases...');
      forceRefreshCases();
    }
  });
}

// Refresh when user scrolls to cases section
const casesSection = document.getElementById('cases-section');
if (casesSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && shouldRefreshData()) {
        console.log('Cases section visible, refreshing...');
        forceRefreshCases();
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(casesSection);
}

// Periodic refresh every 2 minutes
setInterval(() => {
  if (shouldRefreshData()) {
    console.log('Periodic refresh triggered');
    forceRefreshCases();
  }
}, 120000); // 2 minutes

// Periodic banner visibility check every 5 minutes
setInterval(() => {
  console.log('Periodic banner visibility check triggered');
  controlBannerVisibility();
}, 300000); // 5 minutes

document.addEventListener('DOMContentLoaded', function() {
  // Control banner visibility based on deadline
  controlBannerVisibility();
  
  // Fetch and render processing cases with cache busting
  fetchAndRenderProcessingCases(true);
  
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

// Volunteer form function with deadline check
async function volunteerFormFunc() {
  try {
    console.log("🔄 Checking deadline before redirecting to volunteer form...");
    
    const result = await checkDeadlineFromFirestore();
    
    if (result.isDeadlinePassed) {
      console.log("❌ Deadline has passed! Cannot access volunteer form.");
      // Show error message
      if (window.toastManager) {
        window.toastManager.show("❌ Deadline has passed! Cannot access volunteer form.", "error", 5000);
      } else {
        alert("❌ Deadline has passed! Cannot access volunteer form.");
      }
      return; // Don't redirect
    } else {
      console.log("✅ Deadline is not passed, redirecting to volunteer form...");
      window.location.href = "become-a-volunteer.html";
    }
    
  } catch (error) {
    console.error("❌ Error checking deadline:", error);
    console.log("⚠️ Allowing form access due to error");
    // Show warning but still allow navigation
    if (window.toastManager) {
      window.toastManager.show("⚠️ Unable to check deadline. Proceeding to volunteer form...", "warning", 3000);
    } else {
      alert("⚠️ Unable to check deadline. Proceeding to volunteer form...");
    }
    // Small delay then redirect
    setTimeout(() => {
      window.location.href = "become-a-volunteer.html";
    }, 1000);
  }
}

// Make functions globally accessible
window.volunteerFormFunc = volunteerFormFunc;
window.bloodformfunc = bloodformfunc;

// Image Modal Functionality
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.querySelector('.image-modal-close');

// Function to open modal with image
function openImageModal(imageSrc, imageAlt) {
  modalImage.src = imageSrc;
  modalImage.alt = imageAlt;
  imageModal.classList.add('show');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Function to close modal
function closeImageModal() {
  imageModal.classList.remove('show');
  document.body.style.overflow = ''; // Restore scrolling
}

// Event listeners for modal
if (modalClose) {
  modalClose.addEventListener('click', closeImageModal);
}

if (imageModal) {
  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
      closeImageModal();
    }
  });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && imageModal.classList.contains('show')) {
    closeImageModal();
  }
});

