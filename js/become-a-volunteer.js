// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById('volunteerForm');
const submitBtn = document.querySelector('.send-msg-btn');
const submitBtnText = document.querySelector('.send-msg-btn-text');

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

            // Submit to Firebase - Collection: "allVolunteersSummer25"
            const docRef = await addDoc(collection(db, "allVolunteersSummer25"), volunteerData);
            await updateDoc(docRef, { id: docRef.id });
            
            // Show success toast
            showToast('Form Submitted Successfully!');
            
            // Reset form
            resetForm();
            
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

// Add interactive functionality for conditional fields
document.addEventListener('DOMContentLoaded', function() {
    // Show/hide institute and education fields based on student selection
    const isStudentInputs = document.querySelectorAll('input[name="isStudent"]');
    const instituteCard = document.getElementById('instituteCard');
    const educationCard = document.getElementById('educationCard');
    
    isStudentInputs.forEach(input => {
        input.addEventListener('change', function() {
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
        input.addEventListener('change', function() {
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
        clearFormBtn.addEventListener('click', function() {
            document.getElementById('volunteerForm').reset();
            instituteCard.style.display = 'none';
            educationCard.style.display = 'none';
            pastExperienceDetailsCard.style.display = 'none';
            document.getElementById('instituteName').required = false;
            document.getElementById('educationDetails').required = false;
            document.getElementById('pastExperienceDetails').required = false;
        });
    }
});