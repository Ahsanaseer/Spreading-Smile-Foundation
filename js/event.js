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

// Get DOM elements
const eventsContainer = document.getElementById("events-container");
const loaderContainer = document.getElementById("loader-container");

// Hide events and show loader initially
eventsContainer.style.display = "none";
loaderContainer.style.display = "flex";
document.getElementById("eventkiheading").style.display = "none";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Placeholder image path (your downloaded image)
const createPlaceholderImage = () => {
  return "Picrures All/placeholder-img.png"; // Change this if your image path is different
};

// Navigate to event details page
const navigateToEventDetails = (eventId) => {
  window.location.href = `eventsdetail.html?id=${eventId}`;
};

// Fetch events from Firestore
const fetchEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "allEvents"));

    if (querySnapshot.empty) {
      document.getElementById("eventkiheading").style.display = "none";
      eventsContainer.innerHTML = `
        <div style="text-align: center; width: 100%; padding: 40px;">
          <h3 style="color: #666; margin-bottom: 10px;">No events found</h3>
          <p style="color: #999;">Check your internet connection and try again.</p>
        </div>
      `;
    } else {
      querySnapshot.forEach((doc) => {
        const event = doc.data();
        const eventId = doc.id; // Get the document ID
        const imageSrc = event.imagesPublic && event.imagesPublic[0] ? event.imagesPublic[0] : null;

        // Create card
        const eventBox = document.createElement("div");
        eventBox.className = "event-box";
        eventBox.style.cursor = "pointer"; // Add pointer cursor
        eventBox.setAttribute("data-event-id", eventId); // Store event ID

        // Add click event listener
        eventBox.addEventListener("click", () => {
          navigateToEventDetails(eventId);
        });

        // Add hover effect
        eventBox.addEventListener("mouseenter", () => {
          eventBox.style.transform = "translateY(-5px)";
          eventBox.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
        });

        eventBox.addEventListener("mouseleave", () => {
          eventBox.style.transform = "translateY(0)";
          eventBox.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
        });

        // Create image element with placeholder
        const img = document.createElement("img");
        img.src = createPlaceholderImage();
        img.alt = "Event Image";
        img.className = "event-image loading";

        // Load real image in background
        if (imageSrc) {
          const realImg = new Image();
          realImg.src = imageSrc;

          realImg.onload = () => {
            img.src = imageSrc;
            img.classList.remove("loading");
          };

          realImg.onerror = () => {
            img.src = createPlaceholderImage();
            img.classList.remove("loading");
          };
        } else {
          img.classList.remove("loading");
        }

        // Event title
        const title = document.createElement("h3");
        title.className = "event-title";
        title.textContent = event.title || "Title Not Available";

        // Event address
        const address = document.createElement("p");
        address.className = "event-address";
        address.textContent = event.address || "Address not available";





        // Append elements
        eventBox.appendChild(img);
        eventBox.appendChild(title);
        eventBox.appendChild(address);
        
        eventsContainer.appendChild(eventBox);
      });
    }

    // Hide loader and show events
    loaderContainer.style.display = "none";
    eventsContainer.style.display = "flex";
    document.getElementById("eventkiheading").style.display = "block";

  } catch (error) {
    console.error("Error fetching events:", error);
    eventsContainer.innerHTML = `
      <div style="text-align: center; width: 100%; padding: 40px;">
        <h3 style="color: #e74c3c; margin-bottom: 10px;">Error loading events</h3>
        <p style="color: #999;">Please try again later or check your internet connection.</p>
      </div>
    `;
    loaderContainer.style.display = "none";
    eventsContainer.style.display = "flex";
  }
};

// Run the fetch
fetchEvents();
