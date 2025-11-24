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
    return Promise.resolve();
  }

  try {
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
  } catch (error) {
    console.error('Error controlling banner visibility:', error);
  }
}

// ================== NEWS BANNER FUNCTIONALITY ==================

// Store news data globally for popup
let currentNewsContent = '';
let currentNewsHeading = '';
let currentNewsSubHeading = '';

// Function to fetch news data from Firestore
async function fetchNewsData() {
  try {
    console.log('--- Fetching News Data from Firestore ---');

    // Fetch config document from Firestore
    const configDoc = await getDoc(doc(db, 'config', 'newsDeadline'));

    if (!configDoc.exists()) {
      console.log('No newsDeadline document found in Firestore');
      return null;
    }

    const configData = configDoc.data();
    const deadline = configData.deadline;
    const news = configData.news;
    const heading = configData.heading || ''; // Default if not provided
    const subHeading = configData['sub-heading'] || ''; // Optional field

    if (!deadline || !news) {
      console.log('Missing deadline or news field in document');
      return null;
    }

    console.log('Fetched news data:', { deadline, newsLength: news.length, heading, subHeading });

    return { deadline, news, heading, subHeading };

  } catch (error) {
    console.error('Error fetching news data:', error);
    return null;
  }
}

// Function to check news deadline from Firestore
async function checkNewsDeadline() {
  try {
    console.log('--- Checking News Deadline from Firestore ---');

    const newsData = await fetchNewsData();

    if (!newsData) {
      console.log('No news data available');
      return { isDeadlinePassed: true, error: 'No news data' };
    }

    const deadlineStr = newsData.deadline;
    console.log('Fetched deadline string:', deadlineStr);

    // Parse deadline string
    const deadlineDate = parseDeadlineString(deadlineStr);
    if (!deadlineDate) {
      console.log('Failed to parse deadline string');
      return { isDeadlinePassed: true, error: 'Failed to parse deadline' };
    }

    // Get current Pakistan time
    const currentTime = getCurrentPakistanTime();

    console.log('Deadline Date (Pakistan time):', deadlineDate.toLocaleString());
    console.log('Current Time (Pakistan time):', currentTime.toLocaleString());

    // Compare times
    const isDeadlinePassed = currentTime.getTime() > deadlineDate.getTime();

    if (isDeadlinePassed) {
      console.log('❌ News deadline has passed! Banner should be hidden.');
    } else {
      console.log('✅ News deadline is not passed, banner should be shown.');
      return { isDeadlinePassed, deadlineDate, currentTime, news: newsData.news, heading: newsData.heading, subHeading: newsData.subHeading };
    }

  } catch (error) {
    console.error('Error checking news deadline from Firestore:', error);
    return { isDeadlinePassed: true, error: error.message };
  }
}

// Function to control news banner visibility based on deadline
async function controlNewsBannerVisibility() {
  const banner = document.getElementById('news-banner');
  if (!banner) {
    console.log('News banner element not found');
    return Promise.resolve();
  }

  try {
    const result = await checkNewsDeadline();

    if (result.isDeadlinePassed) {
      // Hide banner if deadline has passed
      banner.style.display = 'none';
      console.log('News banner hidden - deadline has passed');
    } else {
      // Show banner if deadline hasn't passed and populate title
      const newsTitle = document.getElementById('news-title');
      if (newsTitle && result.news) {
        // Use first 50 characters as title or full news if short
        const titleText = result.news.length > 50
          ? result.news.substring(0, 50) + '...'
          : result.news;
        newsTitle.textContent = titleText;

        // Store full news data for popup
        currentNewsContent = result.news;
        currentNewsHeading = result.heading || '';
        currentNewsSubHeading = result.subHeading || '';
      }

      banner.style.display = 'flex';
      console.log('News banner shown - deadline has not passed');
    }
  } catch (error) {
    console.error('Error controlling news banner visibility:', error);
    // Hide banner on error
    banner.style.display = 'none';
  }
}

// Function to open news popup
function openNewsPopup() {
  const modal = document.getElementById('news-modal');
  const modalBody = document.getElementById('news-modal-body');

  if (!modal || !modalBody) {
    console.log('News modal elements not found');
    return;
  }

  // Build HTML only for fields that have content
  let popupHTML = '';

  // Add heading if it exists
  if (currentNewsHeading && currentNewsHeading.trim() !== '') {
    popupHTML += `<h2 style="margin-top: 0; color: var(--primary-color); font-size: 1.8rem; margin-bottom: 12px;">${currentNewsHeading}</h2>`;
  }

  // Add sub-heading if it exists
  if (currentNewsSubHeading && currentNewsSubHeading.trim() !== '') {
    popupHTML += `<h3 style="margin-top: 8px; color: #666; font-size: 1.2rem; font-weight: 500; margin-bottom: 20px;">${currentNewsSubHeading}</h3>`;
  }

  // Add news content if it exists
  if (currentNewsContent && currentNewsContent.trim() !== '') {
    popupHTML += `<div style="white-space: pre-wrap; word-wrap: break-word;">${currentNewsContent}</div>`;
  }

  // Inject the built HTML
  modalBody.innerHTML = popupHTML;

  // Show modal with animation
  modal.classList.add('show');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling

  console.log('News popup opened');
}

// Function to close news popup
function closeNewsPopup() {
  const modal = document.getElementById('news-modal');

  if (!modal) {
    console.log('News modal element not found');
    return;
  }

  // Hide modal with animation
  modal.classList.remove('show');
  document.body.style.overflow = ''; // Restore scrolling

  console.log('News popup closed');
}

// Function to close news banner
function closeNewsBanner() {
  const banner = document.getElementById('news-banner');
  if (banner) {
    banner.style.display = 'none';
    console.log('News banner closed by user');
  }
}

// Make functions globally accessible
window.openNewsPopup = openNewsPopup;
window.closeNewsPopup = closeNewsPopup;
window.closeNewsBanner = closeNewsBanner;

// Event listener for clicking outside the modal to close it
document.addEventListener('click', (e) => {
  const modal = document.getElementById('news-modal');
  if (modal && e.target === modal) {
    closeNewsPopup();
  }
});

// Event listener for ESC key to close modal
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('news-modal');
  if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
    closeNewsPopup();
  }
});






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
      return Promise.resolve();
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

    return Promise.resolve();

  } catch (error) {
    console.error("Error fetching cases:", error);
    // Hide loader and show cards wrapper
    loaderContainer.style.display = 'none';
    casesCardsWrapper.style.display = 'flex';
    casesCardsWrapper.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; min-height: 200px; width: 100%;"><p style="text-align: center; color: #e74c3c; padding: 40px; font-size: 1.1rem;">Error loading cases! Please try again later.</p></div>';
    return Promise.resolve();
  }
};


























// ===================== HOME PAGE SPECIFIC LOGIC =====================



// Member Reviews slider logic
// Members array - will be populated dynamically from Firebase
let members = [];

// Placeholder image path
const createPlaceholderImage = () => {
  return "Picrures All/placeholder-img.png";
};

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

// Current member index for slider (scoped outside function)
let currentMember = 0;
let sliderInitialized = false;

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
  console.log('Periodic volunteer banner visibility check triggered');
  controlBannerVisibility();
}, 300000); // 5 minutes

// Periodic news banner visibility check every 5 minutes
setInterval(() => {
  console.log('Periodic news banner visibility check triggered');
  controlNewsBannerVisibility();
}, 300000); // 5 minutes

// Unified loading system
let loadingComponents = {
  bannerVisibility: false,
  newsBannerVisibility: false,
  casesLoaded: false,
  navbarLoaded: false,
  imagesLoaded: false
};

// Function to check if all components are loaded
function checkAllComponentsLoaded() {
  const allLoaded = Object.values(loadingComponents).every(loaded => loaded === true);
  if (allLoaded) {
    console.log('🎉 All components loaded! Showing content...');

    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      document.body.classList.add('all-content-loaded');
      document.body.style.overflow = ''; // Restore scrolling
    }, 200);
  }
}

// Function to mark component as loaded
function markComponentLoaded(componentName) {
  loadingComponents[componentName] = true;
  console.log(`✅ ${componentName} loaded`);
  checkAllComponentsLoaded();
}

// Function to wait for all images to load
function waitForImages() {
  const images = document.querySelectorAll('img');
  let loadedCount = 0;
  const totalImages = images.length;

  if (totalImages === 0) {
    markComponentLoaded('imagesLoaded');
    return;
  }

  images.forEach(img => {
    if (img.complete) {
      loadedCount++;
    } else {
      img.addEventListener('load', () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          markComponentLoaded('imagesLoaded');
        }
      });
      img.addEventListener('error', () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          markComponentLoaded('imagesLoaded');
        }
      });
    }
  });

  if (loadedCount === totalImages) {
    markComponentLoaded('imagesLoaded');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Check if this is the home page
  const isHomePage = document.body.classList.contains('home-page');

  if (isHomePage) {
    console.log('🚀 Starting unified loading system for home page...');

    // Mark navbar as loaded (it's already in DOM)
    markComponentLoaded('navbarLoaded');

    // Control volunteer banner visibility based on deadline
    controlBannerVisibility().then(() => {
      markComponentLoaded('bannerVisibility');
    }).catch(() => {
      // Fallback if banner control fails
      markComponentLoaded('bannerVisibility');
    });

    // Control news banner visibility based on deadline
    controlNewsBannerVisibility().then(() => {
      markComponentLoaded('newsBannerVisibility');
    }).catch(() => {
      // Fallback if news banner control fails
      markComponentLoaded('newsBannerVisibility');
    });

    // Fetch and render processing cases with cache busting
    fetchAndRenderProcessingCases(true).then(() => {
      markComponentLoaded('casesLoaded');
    }).catch(() => {
      // Fallback if cases fail to load
      markComponentLoaded('casesLoaded');
    });

    // Wait for images to load
    waitForImages();

    // Fallback timeout - show content after 5 seconds regardless
    setTimeout(() => {
      console.log('⏰ Fallback timeout reached - showing content');
      Object.keys(loadingComponents).forEach(key => {
        loadingComponents[key] = true;
      });
      checkAllComponentsLoaded();
    }, 5000);
  } else {
    console.log('📄 Non-home page detected - loading normally');
  }

  // Fetch and populate members from Firebase (only on home page)
  if (isHomePage) {
    fetchAndPopulateMembers();
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

