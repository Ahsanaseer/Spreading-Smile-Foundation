// Privacy Policy Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth scrolling for internal links
    initSmoothScrolling();
    
    // Initialize print functionality
    initPrintFunctionality();
    
    // Initialize accessibility features
    initAccessibility();
});

// =================================================SMOOTH SCROLLING==============================================================================
function initSmoothScrolling() {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// =================================================PRINT FUNCTIONALITY==============================================================================
function initPrintFunctionality() {
    // Create fixed print link in bottom-right corner
    const printLink = document.createElement('a');
    printLink.href = '#';
    printLink.className = 'print-link-fixed';
    printLink.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6,9 6,2 18,2 18,9"></polyline>
            <path d="M6,18H4a2,2,0,0,1-2-2V11a2,2,0,0,1,2-2H20a2,2,0,0,1,2,2v5a2,2,0,0,1-2,2H18"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
        </svg>
        Print Policy
    `;
    
    printLink.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 12px 20px;
        margin-bottom: 100px;
        border-radius: 25px;
        text-decoration: none;
        font-size: 14px;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(70, 192, 178, 0.3);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    
    printLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.print();
    });
    
    printLink.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.background = 'var(--secondary-color)';
    });
    
    printLink.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'var(--primary-color)';
    });
    
    document.body.appendChild(printLink);
    
    // Print styles
    const printStyles = document.createElement('style');
    printStyles.textContent = `
        @media print {
            body * {
                visibility: hidden;
            }
            .privacy-section, .privacy-section * {
                visibility: visible;
            }
            .privacy-section {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                background: white !important;
            }
            .print-link-fixed {
                display: none !important;
            }
            .privacy-heading {
                background: white !important;
                box-shadow: none !important;
            }
            .privacy-content {
                background: white !important;
                box-shadow: none !important;
            }
        }
    `;
    document.head.appendChild(printStyles);
}

// =================================================ACCESSIBILITY FEATURES==============================================================================
function initAccessibility() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#privacy-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ARIA labels and roles
    const privacyContent = document.querySelector('.privacy-content');
    if (privacyContent) {
        privacyContent.setAttribute('id', 'privacy-content');
        privacyContent.setAttribute('role', 'main');
        privacyContent.setAttribute('aria-label', 'Privacy Policy Content');
    }
    
    // Add ARIA labels to headings
    const headings = document.querySelectorAll('.privacy-section-item h2');
    headings.forEach((heading, index) => {
        heading.setAttribute('id', `section-${index + 1}`);
        heading.setAttribute('aria-level', '2');
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or return to home
            if (window.location.pathname.includes('privacy.html')) {
                window.location.href = 'index.html';
            }
        }
    });
}

// =================================================COPY TO CLIPBOARD FUNCTIONALITY==============================================================================
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        return new Promise((resolve, reject) => {
            if (document.execCommand('copy')) {
                textArea.remove();
                resolve();
            } else {
                textArea.remove();
                reject();
            }
        });
    }
}

// =================================================CONTACT EMAIL COPY FUNCTIONALITY==============================================================================
document.addEventListener('DOMContentLoaded', function() {
    const emailLink = document.querySelector('.contact-info a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.textContent;
            
            copyToClipboard(email).then(() => {
                // Show success message
                const toast = document.createElement('div');
                toast.textContent = 'Email copied to clipboard!';
                toast.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--primary-color);
                    color: white;
                    padding: 12px 20px;
                    border-radius: 8px;
                    z-index: 10000;
                    font-size: 14px;
                    font-weight: 500;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    animation: slideInRight 0.3s ease;
                `;
                
                document.body.appendChild(toast);
                
                setTimeout(() => {
                    toast.style.animation = 'slideOutRight 0.3s ease';
                    setTimeout(() => {
                        document.body.removeChild(toast);
                    }, 300);
                }, 2000);
            }).catch(() => {
                // Fallback: open email client
                window.location.href = this.href;
            });
        });
    }
});

// =================================================ANIMATION STYLES==============================================================================
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(animationStyles);
