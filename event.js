// Firebase imports from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCgYJmsDvgZeGD-Gq2yzXMPKhSs8YmmitQ",
  authDomain: "spreading-smile-foundation.firebaseapp.com",
  projectId: "spreading-smile-foundation",
  storageBucket: "spreading-smile-foundation.appspot.com",
  messagingSenderId: "232128085724",
  appId: "1:232128085724:web:3733b285474fd63f38c05e",
  measurementId: "G-ZC6Y3KJMLY"
};
document.getElementById("events-container").style.display="none";
const loader = document.getElementById("loader");

loader.style.display = "block";
//  Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const fetchEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "allEvents"));
    const container = document.getElementById("events-container");

    querySnapshot.forEach((doc) => {
      const event = doc.data();
      console.log(event);
      const eventHTML = `
        <div class="event-box">
          <img src="${event.imagesPublic[0]}" alt="Event Image" class="event-image" />
          <h3 class="event-title">${event.title}</h3>
          <p class="event-address">${event.address}</p>
        </div>
      `;

      container.innerHTML += eventHTML;
      loader.style.display = "none";
      document.getElementById("events-container").style.display="flex";
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    alert("Error fetching events:", error);
  }
};





fetchEvents();