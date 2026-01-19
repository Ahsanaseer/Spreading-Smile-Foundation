// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


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

// Initialize Firestore
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

// Function to fetch volunteer program title and update page heading
async function fetchAndUpdateVolunteerPageTitle() {
    try {

        // Fetch config document from Firestore
        const configDoc = await getDoc(doc(db, 'config', 'volunteerDeadline'));

        if (!configDoc.exists()) {
            // Set fallback title
            updatePageTitle('Volunteer Program Winter 25\'');
            return;
        }

        const configData = configDoc.data();
        const title = configData.title;

        if (!title) {
            // Set fallback title
            updatePageTitle('Volunteer Program Winter 25\'');
            return;
        }


        // Update the page title
        updatePageTitle(title);

    } catch (error) {
        console.error('Error fetching volunteer title for page:', error);
        // Set fallback title on error
        updatePageTitle('Volunteer Program Winter 25\'');
    }
}

// Helper function to update page title
function updatePageTitle(title) {
    const pageHeading = document.querySelector('.contact-page-heading h1');
    if (pageHeading) {
        // Update the heading with the fetched title
        pageHeading.textContent = title;
    } else {
    }
}

// Function to check deadline from Firestore
async function checkDeadlineFromFirestore() {
    try {

        // Fetch deadline from Firestore
        const configDoc = await getDoc(doc(db, 'config', 'volunteerDeadline'));

        if (!configDoc.exists()) {
            return { isDeadlinePassed: false, error: 'No deadline document found' };
        }

        const deadlineStr = configDoc.data().deadline;

        if (!deadlineStr) {
            return { isDeadlinePassed: false, error: 'No deadline field found' };
        }

        // Parse deadline string
        const deadlineDate = parseDeadlineString(deadlineStr);
        if (!deadlineDate) {
            return { isDeadlinePassed: false, error: 'Failed to parse deadline' };
        }

        // Get current Pakistan time
        const currentTime = getCurrentPakistanTime();


        // Compare times
        const isDeadlinePassed = currentTime.getTime() > deadlineDate.getTime();

        if (isDeadlinePassed) {
        } else {
        }

        return { isDeadlinePassed, deadlineDate, currentTime };

    } catch (error) {
        console.error('Error checking deadline from Firestore:', error);
        return { isDeadlinePassed: false, error: error.message };
    }
}

// Function to show deadline passed message
function showDeadlinePassedMessage() {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: 'Poppins', Arial, sans-serif; text-align: center; background: #f8f9fa; padding: 20px;">
                <h1 style="color: #dc3545; margin-bottom: 20px; font-size: 2.5rem; font-weight: 600;">Deadline has passed</h1>
                <p style="color: #6c757d; font-size: 1.2rem; margin-bottom: 15px; max-width: 600px;">The volunteer program registration deadline has already passed.</p>
                <p style="color: #6c757d; font-size: 1.1rem; max-width: 600px;">We are no longer accepting new applications for this program.</p>
            </div>
        `;
    }
}

// Function to show success message after form submission
function showSuccessMessage() {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: 'Poppins', Arial, sans-serif; text-align: center; background: #f8f9fa; padding: 20px;">
                <h1 style="color: #28a745; margin-bottom: 20px; font-size: 2.5rem; font-weight: 600;">Thank you for taking the time to fill out our form!</h1>
                <p style="color: #6c757d; font-size: 1.2rem; margin-bottom: 15px; max-width: 600px;">We appreciate your interest and will get back to you soon.</p>
                <div style="margin-top: 30px; padding: 20px; background: #f0f8f7; border-radius: 10px; border-left: 4px solid #46C0B2; max-width: 500px;">
                    <p style="color: #333; font-size: 1rem; margin: 0;"><strong>What's next?</strong></p>
                    <p style="color: #666; font-size: 0.9rem; margin: 10px 0 0 0;">Check your email for detailed information about the program and next steps.</p>
                </div>
            </div>
        `;
    }
}

// Main function to check deadline on page load
async function checkDeadlineOnLoad() {
    const result = await checkDeadlineFromFirestore();

    if (result.isDeadlinePassed) {
        showDeadlinePassedMessage();
        return false; // Don't load the form
    } else {
        return true; // Load the form normally
    }
}

// Get form elements
const form = document.getElementById('volunteerForm');
const submitBtn = document.querySelector('.send-msg-btn');
const submitBtnText = document.querySelector('.send-msg-btn-text');

// Call the deadline check when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    // First, fetch and update the volunteer program title
    await fetchAndUpdateVolunteerPageTitle();

    const shouldLoadForm = await checkDeadlineOnLoad();
    if (!shouldLoadForm) {
        return; // Stop here if deadline has passed
    }

    // Continue with normal form initialization if deadline hasn't passed
    initializeFormInteractions();
});

// Function to initialize form interactions
function initializeFormInteractions() {
    // Add interactive functionality for conditional fields
    // Show/hide institute and education fields based on student selection
    const isStudentInputs = document.querySelectorAll('input[name="isStudent"]');
    const instituteCard = document.getElementById('instituteCard');
    const educationCard = document.getElementById('educationCard');

    isStudentInputs.forEach(input => {
        input.addEventListener('change', function () {
            if (this.value === 'Yes') {
                instituteCard.style.display = 'block';
                educationCard.style.display = 'block';
                document.getElementById('instituteName').required = true;
                document.getElementById('educationDetails').required = true;
            } else {
                instituteCard.style.display = 'none';
                educationCard.style.display = 'none';
                document.getElementById('instituteName').required = false;
                document.getElementById('educationDetails').required = false;
                document.getElementById('instituteName').value = '';
                document.getElementById('educationDetails').value = '';
            }
        });
    });

    // Show/hide past experience details based on past experience selection
    const pastExperienceInputs = document.querySelectorAll('input[name="pastExperience"]');
    const pastExperienceDetailsCard = document.getElementById('pastExperienceDetailsCard');

    pastExperienceInputs.forEach(input => {
        input.addEventListener('change', function () {
            if (this.value === 'Yes') {
                pastExperienceDetailsCard.style.display = 'block';
                document.getElementById('pastExperienceDetails').required = true;
            } else {
                pastExperienceDetailsCard.style.display = 'none';
                document.getElementById('pastExperienceDetails').required = false;
                document.getElementById('pastExperienceDetails').value = '';
            }
        });
    });

    // Clear form functionality (enhanced version)
    const clearFormBtn = document.getElementById('clearFormBtn');
    if (clearFormBtn) {
        clearFormBtn.addEventListener('click', function () {
            document.getElementById('volunteerForm').reset();
            instituteCard.style.display = 'none';
            educationCard.style.display = 'none';
            pastExperienceDetailsCard.style.display = 'none';
            document.getElementById('instituteName').required = false;
            document.getElementById('educationDetails').required = false;
            document.getElementById('pastExperienceDetails').required = false;
        });
    }
}


// Helper functions
const getRadioValue = (name) => {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : "";
};


const showLoading = () => {
    if (submitBtn && submitBtnText) {
        submitBtn.disabled = true;
        submitBtnText.textContent = "Submitting...";
    }
};

const hideLoading = () => {
    if (submitBtn && submitBtnText) {
        submitBtn.disabled = false;
        submitBtnText.textContent = "Submit";
    }
};

const resetForm = () => {
    if (form) {
        form.reset();
        // Hide conditional fields
        const instituteCard = document.getElementById('instituteCard');
        const educationCard = document.getElementById('educationCard');
        const pastExperienceDetailsCard = document.getElementById('pastExperienceDetailsCard');

        if (instituteCard) instituteCard.style.display = 'none';
        if (educationCard) educationCard.style.display = 'none';
        if (pastExperienceDetailsCard) pastExperienceDetailsCard.style.display = 'none';

        // Reset required attributes
        const instituteName = document.getElementById('instituteName');
        const educationDetails = document.getElementById('educationDetails');
        const pastExperienceDetails = document.getElementById('pastExperienceDetails');

        if (instituteName) instituteName.required = false;
        if (educationDetails) educationDetails.required = false;
        if (pastExperienceDetails) pastExperienceDetails.required = false;
    }
};

const showToast = (message) => {
    // Use global toast manager
    if (window.toastManager) {
        window.toastManager.show(message, 'info');
    } else {
        // Fallback to legacy method
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.style.display = 'flex';
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.style.display = 'none';
                }, 300);
            }, 3500);
        }
    }
};

// Form submission
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // First check deadline before processing form
        const deadlineResult = await checkDeadlineFromFirestore();
        if (deadlineResult.isDeadlinePassed) {
            showDeadlinePassedMessage();
            return;
        }

        showLoading();

        try {
            // Validate required fields
            const requiredFields = [
                'email', 'fullName', 'fatherGuardianName', 'fatherOccupation',
                'contactNumber', 'age', 'city', 'address', 'skills',
                'somethingGood', 'somethingBad', 'futurePlans', 'programInterest',
                'awarenessCreation'
            ];

            for (let field of requiredFields) {
                const element = document.getElementById(field);
                if (!element || !element.value.trim()) {
                    throw new Error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                }
            }

            // Validate radio button selections
            const requiredRadios = ['gender', 'isStudent', 'lifePreference', 'pastExperience', 'attendedEvents', 'physicalOrientation'];
            for (let radio of requiredRadios) {
                const value = getRadioValue(radio);
                if (!value) {
                    throw new Error(`Please select ${radio.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                }
            }

            // Validate conditional fields if student is selected
            const isStudent = getRadioValue('isStudent');
            if (isStudent === 'Yes') {
                const instituteName = document.getElementById('instituteName');
                const educationDetails = document.getElementById('educationDetails');
                if (!instituteName || !instituteName.value.trim()) {
                    throw new Error('Please provide institute name and address');
                }
                if (!educationDetails || !educationDetails.value.trim()) {
                    throw new Error('Please provide education details');
                }
            }

            // Validate past experience details if yes is selected
            const pastExperience = getRadioValue('pastExperience');
            if (pastExperience === 'Yes') {
                const pastExperienceDetails = document.getElementById('pastExperienceDetails');
                if (!pastExperienceDetails || !pastExperienceDetails.value.trim()) {
                    throw new Error('Please provide details about your past experience');
                }
            }

            // Collect and process form data according to exact specifications
            const rawData = {
                email: document.getElementById('email').value.trim(),
                fullName: document.getElementById('fullName').value.trim(),
                fatherGuardianName: document.getElementById('fatherGuardianName').value.trim(),
                fatherOccupation: document.getElementById('fatherOccupation').value.trim(),
                gender: getRadioValue('gender'),
                contactNumber: document.getElementById('contactNumber').value.trim(),
                age: document.getElementById('age').value.trim(),
                city: document.getElementById('city').value.trim(),
                address: document.getElementById('address').value.trim(),
                isStudent: getRadioValue('isStudent'),
                instituteName: document.getElementById('instituteName').value.trim(),
                educationDetails: document.getElementById('educationDetails').value.trim(),
                skills: document.getElementById('skills').value.trim(),
                somethingGood: document.getElementById('somethingGood').value.trim(),
                somethingBad: document.getElementById('somethingBad').value.trim(),
                lifePreference: getRadioValue('lifePreference'),
                futurePlans: document.getElementById('futurePlans').value.trim(),
                programInterest: document.getElementById('programInterest').value.trim(),
                awarenessCreation: document.getElementById('awarenessCreation').value.trim(),
                pastExperience: getRadioValue('pastExperience'),
                pastExperienceDetails: document.getElementById('pastExperienceDetails').value.trim(),
                attendedEvents: getRadioValue('attendedEvents'),
                physicalOrientation: getRadioValue('physicalOrientation'),
                socialMediaLinks: document.getElementById('socialMediaLinks').value.trim(),
                timestamp: new Date().toISOString()
            };

            // Process data according to exact specifications - CASE SENSITIVE
            const volunteerData = {
                email: rawData.email,
                fullName: rawData.fullName,
                fatherGuardianName: rawData.fatherGuardianName,
                fatherOccupation: rawData.fatherOccupation,
                gender: rawData.gender,
                contactNumber: rawData.contactNumber,
                age: rawData.age, // Keep as string
                city: rawData.city,
                address: rawData.address,
                isStudent: rawData.isStudent, // Keep exact case
                instituteName: rawData.instituteName,
                educationDetails: rawData.educationDetails,
                skills: rawData.skills,
                somethingGood: rawData.somethingGood,
                somethingBad: rawData.somethingBad,
                lifePreference: rawData.lifePreference,
                futurePlans: rawData.futurePlans,
                programInterest: rawData.programInterest,
                awarenessCreation: rawData.awarenessCreation,
                pastExperience: rawData.pastExperience, // Keep exact case
                pastExperienceDetails: rawData.pastExperienceDetails,
                attendedEvents: rawData.attendedEvents, // Keep exact case
                physicalOrientation: rawData.physicalOrientation, // Keep exact case
                socialMediaLinks: rawData.socialMediaLinks,
                timestamp: rawData.timestamp
            };

            // Submit to Firebase - Collection: "allVolunteersWinter25"
            const docRef = await addDoc(collection(db, "allVolunteersSummer25"), volunteerData);
            await updateDoc(docRef, { id: docRef.id });

            // Send thank you email to the volunteer
            try {
                // Fetch volunteer program title from Firebase
                let volunteerProgramTitle = 'Winter Volunteer program 2025'; // fallback
                try {
                    const configDoc = await getDoc(doc(db, 'config', 'volunteerDeadline'));
                    if (configDoc.exists()) {
                        const configData = configDoc.data();
                        if (configData.title) {
                            volunteerProgramTitle = configData.title;
                        }
                    }
                } catch (titleError) {
                    console.error('Error fetching volunteer program title:', titleError);
                    // Use fallback title
                }



                // Validate that we have the required data for email
                if (!volunteerData.email || !volunteerData.fullName) {
                    console.error('Missing email or fullName for sending email:', {
                        email: volunteerData.email,
                        fullName: volunteerData.fullName
                    });
                    throw new Error('Missing email or fullName data');
                }

                const emailResponse = await fetch('PHPMailer/sendVolunteerEmail.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `email=${encodeURIComponent(volunteerData.email)}&fullName=${encodeURIComponent(volunteerData.fullName)}&volunteerProgramTitle=${encodeURIComponent(volunteerProgramTitle)}`
                });

                const emailResult = await emailResponse.text();

                if (emailResult.includes('successfully')) {
                } else {
                }
            } catch (emailError) {
                console.error('Email sending error:', emailError);
                // Don't fail the entire process if email fails
            }

            // Show success message instead of toast
            showSuccessMessage();

        } catch (error) {
            if (error.message.includes('Please')) {
                // Validation error
                showToast(error.message);
            } else {
                // Firebase error
                showToast('Error! Could not submit the form. Please try again.');
            }
        } finally {
            hideLoading();
        }
    });
}
