document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bloodDonationForm');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const chronicIllnessesDetails = document.getElementById('chronicIllnessesDetails');
    const lastDonationCard = document.getElementById('lastDonationCard');
    const chronicIllnessesContainer = document.getElementById('chronicIllnessesContainer');
    const clearFormBtn = document.getElementById('clearFormBtn');

    // Handle chronic illnesses radio buttons
    const chronicIllnessesRadios = document.querySelectorAll('input[name="chronicIllnesses"]');
    chronicIllnessesRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                chronicIllnessesContainer.style.display = 'block';
                chronicIllnessesDetails.required = true;
            } else {
                chronicIllnessesContainer.style.display = 'none';
                chronicIllnessesDetails.required = false;
                chronicIllnessesDetails.value = '';
            }
        });
    });

    // Handle previous donation radio buttons
    const previousDonationRadios = document.querySelectorAll('input[name="previousDonation"]');
    previousDonationRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                lastDonationCard.style.display = 'block';
                const lastDonationInput = lastDonationCard.querySelector('input[name="lastDonationDate"]');
                lastDonationInput.required = true;
            } else {
                lastDonationCard.style.display = 'none';
                const lastDonationInput = lastDonationCard.querySelector('input[name="lastDonationDate"]');
                lastDonationInput.required = false;
                lastDonationInput.value = '';
            }
        });
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                // Handle multiple values (like checkboxes)
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }

        // Validate form
        if (validateForm(data)) {
            // Simulate form submission
            submitForm(data);
        }
    });

    // Clear form functionality
    clearFormBtn.addEventListener('click', function() {
        // Reset form
        form.reset();
        
        // Hide conditional fields
        chronicIllnessesContainer.style.display = 'none';
        lastDonationCard.style.display = 'none';
        
        // Clear any custom styling
        document.querySelectorAll('.radio-custom, .checkbox-custom').forEach(element => {
            element.style.borderColor = '#e0e0e0';
            element.style.backgroundColor = 'transparent';
        });
        
        // Remove checkmarks
        document.querySelectorAll('.checkbox-custom::after').forEach(element => {
            element.style.display = 'none';
        });
        
        // Show success message
        showToast('Form cleared successfully!', 'success');
    });

    // Form validation
    function validateForm(data) {
        const requiredFields = [
            'fullName', 'contactNumber', 'address', 'age', 
            'gender', 'bloodGroup', 'emergencyDonations', 
            'contactMethod', 'weightHeight', 'previousDonation',
            'chronicIllnesses', 'transportRequired', 'emergencyContact', 'consent'
        ];

        for (let field of requiredFields) {
            if (!data[field] || (Array.isArray(data[field]) && data[field].length === 0)) {
                showToast('Please fill in all required fields.', 'error');
                return false;
            }
        }

        // Validate age
        const age = parseInt(data.age);
        if (age < 18 || age > 65) {
            showToast('Age must be between 18 and 65 years.', 'error');
            return false;
        }

        // Validate contact number
        const contactRegex = /^[0-9+\-\s()]+$/;
        if (!contactRegex.test(data.contactNumber)) {
            showToast('Please enter a valid contact number.', 'error');
            return false;
        }

        // Validate at least one contact method is selected
        if (!Array.isArray(data.contactMethod) || data.contactMethod.length === 0) {
            showToast('Please select at least one preferred contact method.', 'error');
            return false;
        }

        return true;
    }

    // Submit form
    function submitForm(data) {
        // Show loading state
        const submitBtn = form.querySelector('.send-msg-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        submitBtn.querySelector('span').textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.disabled = false;

            // Show success message
            showToast('Registration submitted successfully! We will contact you soon.', 'success');
            
            // Reset form
            form.reset();
            
            // Hide conditional fields
            chronicIllnessesContainer.style.display = 'none';
            lastDonationCard.style.display = 'none';
            
            // Clear any custom styling
            document.querySelectorAll('.radio-custom, .checkbox-custom').forEach(element => {
                element.style.borderColor = '#e0e0e0';
                element.style.backgroundColor = 'transparent';
            });
            
            // Remove checkmarks
            document.querySelectorAll('.checkbox-custom::after').forEach(element => {
                element.style.display = 'none';
            });

            console.log('Form data:', data);
        }, 2000);
    }

    // Toast notification function
    function showToast(message, type = 'success') {
        toastMessage.textContent = message;
        
        // Update toast styling based on type
        if (type === 'error') {
            toast.style.backgroundColor = '#e74c3c';
        } else {
            toast.style.backgroundColor = '#333';
        }

        // Show toast
        toast.style.display = 'flex';
        toast.classList.add('show');

        // Hide toast after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.style.display = 'none';
            }, 300);
        }, 5000);
    }

    // Initialize form state
    function initializeForm() {
        // Hide conditional fields initially
        chronicIllnessesContainer.style.display = 'none';
        lastDonationCard.style.display = 'none';
        
        // Set up radio button styling
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', function() {
                // Remove checked state from other radios in same group
                const name = this.name;
                document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
                    const custom = r.nextElementSibling;
                    if (r !== this) {
                        custom.style.borderColor = '#e0e0e0';
                        custom.style.backgroundColor = 'transparent';
                        custom.style.setProperty('--after-display', 'none');
                    }
                });
                
                // Style the selected radio
                const custom = this.nextElementSibling;
                custom.style.borderColor = 'var(--primary-color)';
                custom.style.backgroundColor = 'var(--primary-color)';
                custom.style.setProperty('--after-display', 'block');
            });
        });

        // Set up checkbox styling
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const custom = this.nextElementSibling;
                if (this.checked) {
                    custom.style.borderColor = 'var(--primary-color)';
                    custom.style.backgroundColor = 'var(--primary-color)';
                } else {
                    custom.style.borderColor = '#e0e0e0';
                    custom.style.backgroundColor = 'transparent';
                }
            });
        });
    }

    // Initialize form
    initializeForm();
});
