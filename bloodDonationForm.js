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

const form = document.getElementById('bloodDonationForm');
const contactMethodInput = document.querySelectorAll('input[name="contactMethod"]');
const consentInput = document.getElementById('consent');
const submitBtn = document.querySelector('.send-msg-btn');
const submitBtnText = document.querySelector('.send-msg-btn-text');

// Helper functions
const getRadioValue = (name) => {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : "";
};

const getCheckboxValues = (checkboxes) => {
    let selected = [];
    checkboxes.forEach(cb => {
        if (cb.checked) selected.push(cb.value);
    });
    return selected.join(", ");
};

const formatYesNo = (value) => {
    if (!value) return "";
    const lowerValue = value.toLowerCase();
    if (lowerValue === "yes") return "Yes";
    if (lowerValue === "no") return "No";
    return value; // Return original if not yes/no
};

const formatGender = (value) => {
    if (!value) return "";
    const lowerValue = value.toLowerCase();
    if (lowerValue === "male") return "Male";
    if (lowerValue === "female") return "Female";
    return value; // Return original for other gender options
};

const formatPreferredContactMethod = (contactMethods) => {
    if (!contactMethods) return "";
    
    const methods = contactMethods.split(", ").map(method => method.trim());
    const phoneSelected = methods.includes("phone");
    const whatsappSelected = methods.includes("whatsapp");
    
    if (phoneSelected && whatsappSelected) {
        return "Phone, Whatsapp";
    } else if (phoneSelected) {
        return "Phone";
    } else if (whatsappSelected) {
        return "Whatsapp";
    }
    return "";
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
        const lastDonationCard = document.getElementById('lastDonationCard');
        const chronicIllnessesContainer = document.getElementById('chronicIllnessesContainer');
        const lastDonationDate = document.getElementById('lastDonationDate');
        const chronicIllnessesDetails = document.getElementById('chronicIllnessesDetails');
        
        if (lastDonationCard) lastDonationCard.style.display = 'none';
        if (chronicIllnessesContainer) chronicIllnessesContainer.style.display = 'none';
        if (lastDonationDate) lastDonationDate.required = false;
        if (chronicIllnessesDetails) chronicIllnessesDetails.required = false;
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
                'fullName', 'contactNumber', 'address', 'age', 
                'emergencyContact'
            ];
            
            for (let field of requiredFields) {
                const element = document.getElementById(field);
                if (!element || !element.value.trim()) {
                    throw new Error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                }
            }

            // Validate radio button selections
            const requiredRadios = ['gender', 'bloodGroup', 'emergencyDonations', 'previousDonation', 'chronicIllnesses', 'transportRequired'];
            for (let radio of requiredRadios) {
                const value = getRadioValue(radio);
                if (!value) {
                    throw new Error(`Please select ${radio.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                }
            }

            // Validate that at least one contact method is selected
            const checkedContactMethods = Array.from(contactMethodInput).filter(cb => cb.checked);
            if (checkedContactMethods.length === 0) {
                throw new Error('Please select at least one contact method');
            }

            // Validate consent
            if (!consentInput || !consentInput.checked) {
                throw new Error('Please provide consent to continue');
            }

            // Collect and process form data according to exact specifications
            const rawData = {
                fullName: document.getElementById('fullName').value.trim(),
                contactNumber: document.getElementById('contactNumber').value.trim(),
                address: document.getElementById('address').value.trim(),
                age: document.getElementById('age').value.trim(),
                gender: getRadioValue('gender'),
                bloodGroup: getRadioValue('bloodGroup'),
                weightHeight: document.getElementById('weightHeight').value.trim(),
                chronicIllnesses: getRadioValue('chronicIllnesses'),
                chronicIllnessesDetails: document.getElementById('chronicIllnessesDetails').value.trim(),
                donatedBefore: getRadioValue('previousDonation'),
                donatedBeforeDate: document.getElementById('lastDonationDate').value,
                emergencyDonations: getRadioValue('emergencyDonations'),
                preferredContactMethod: getCheckboxValues(contactMethodInput),
                consent: consentInput.checked,
                emergencyContact: document.getElementById('emergencyContact').value.trim(),
                transportRequired: getRadioValue('transportRequired'),
                timestamp: new Date().toISOString()
            };

            // Process data according to exact specifications
            const donorData = {
                fullName: rawData.fullName,
                contactNumber: rawData.contactNumber,
                address: rawData.address,
                age: parseInt(rawData.age), // Store as integer
                gender: formatGender(rawData.gender), // Format gender with proper capitalization
                bloodGroup: rawData.bloodGroup,
                weightHeight: rawData.weightHeight,
                chronicIllnesses: formatYesNo(rawData.chronicIllnesses), // Format Yes/No
                illnessDetails: rawData.chronicIllnessesDetails,
                donatedBefore: formatYesNo(rawData.donatedBefore), // Format Yes/No
                lastDonationDate: rawData.donatedBeforeDate,
                emergencyDonations: formatYesNo(rawData.emergencyDonations), // Format Yes/No
                preferredContactMethod: formatPreferredContactMethod(rawData.preferredContactMethod), // Format contact method
                consent: formatYesNo(rawData.consent ? "yes" : "no"), // Format consent as Yes/No
                emergencyContact: rawData.emergencyContact,
                requiresTransport: formatYesNo(rawData.transportRequired), // Change field name and format
                availableForEmergency: formatYesNo(rawData.emergencyDonations), // Change field name and format
                timestamp: rawData.timestamp
            };

            // Submit to Firebase
            const docRef = await addDoc(collection(db, "allBloodDonors"), donorData);
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
    // Show/hide last donation date based on previous donation selection
    const previousDonationInputs = document.querySelectorAll('input[name="previousDonation"]');
    const lastDonationCard = document.getElementById('lastDonationCard');
    
    previousDonationInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value === 'yes') {
                lastDonationCard.style.display = 'block';
                document.getElementById('lastDonationDate').required = true;
            } else {
                lastDonationCard.style.display = 'none';
                document.getElementById('lastDonationDate').required = false;
                document.getElementById('lastDonationDate').value = '';
            }
        });
    });

    // Show/hide chronic illnesses details based on chronic illnesses selection
    const chronicIllnessesInputs = document.querySelectorAll('input[name="chronicIllnesses"]');
    const chronicIllnessesContainer = document.getElementById('chronicIllnessesContainer');
    
    chronicIllnessesInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value === 'yes') {
                chronicIllnessesContainer.style.display = 'block';
                document.getElementById('chronicIllnessesDetails').required = true;
            } else {
                chronicIllnessesContainer.style.display = 'none';
                document.getElementById('chronicIllnessesDetails').required = false;
                document.getElementById('chronicIllnessesDetails').value = '';
            }
        });
    });

    // Clear form functionality (enhanced version)
    const clearFormBtn = document.getElementById('clearFormBtn');
    if (clearFormBtn) {
        clearFormBtn.addEventListener('click', function() {
            document.getElementById('bloodDonationForm').reset();
            lastDonationCard.style.display = 'none';
            chronicIllnessesContainer.style.display = 'none';
            document.getElementById('lastDonationDate').required = false;
            document.getElementById('chronicIllnessesDetails').required = false;
        });
    }
});