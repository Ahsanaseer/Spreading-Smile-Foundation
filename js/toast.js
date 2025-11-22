// Global Toast Notification System
class ToastManager {
    constructor() {
        this.toasts = [];
        this.container = null;
        this.init();
    }

    init() {
        // Create toast container if it doesn't exist
        this.container = document.getElementById('toast-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    }

    show(message, type = 'info', duration = 3500) {
        const toast = this.createToast(message, type);
        this.container.appendChild(toast);
        this.toasts.push(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto-dismiss
        const timeoutId = setTimeout(() => {
            this.hide(toast);
        }, duration);

        // Store timeout ID for pause/resume functionality
        toast.timeoutId = timeoutId;

        // Pause on hover/focus
        toast.addEventListener('mouseenter', () => {
            if (toast.timeoutId) {
                clearTimeout(toast.timeoutId);
            }
        });

        toast.addEventListener('mouseleave', () => {
            toast.timeoutId = setTimeout(() => {
                this.hide(toast);
            }, duration);
        });

        // Close button functionality
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hide(toast);
            });

            // Keyboard support
            closeBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.hide(toast);
                }
            });
        }

        return toast;
    }

    hide(toast) {
        if (!toast) return;

        // Add swipe-out animation class
        toast.classList.add('swipe-out');
        toast.classList.remove('show');
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            
            // Remove from toasts array
            const index = this.toasts.indexOf(toast);
            if (index > -1) {
                this.toasts.splice(index, 1);
            }

            // Clear timeout
            if (toast.timeoutId) {
                clearTimeout(toast.timeoutId);
            }
        }, 400);
    }

    createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.setAttribute('data-type', type);

        // SVG cross icon
        const crossIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
        
        toast.innerHTML = `
            <div class="toast-content">
                ${message}
            </div>
            <button class="toast-close" aria-label="Close notification" tabindex="0">${crossIcon}</button>
        `;

        return toast;
    }

    getIcon(type) {
        switch (type) {
            case 'success':
                return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M15.795 8.342l-5.909 9.545a1 1 0 0 1-1.628 0l-3.182-4.909a1 1 0 0 1 1.629-1.165l2.556 3.953L14.165 7.51a1 1 0 0 1 1.63 1.165z"></path>
                </svg>`;
            case 'error':
                return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                </svg>`;
            default:
                return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                </svg>`;
        }
    }

    // Legacy support for existing showToast function
    static legacyShow(message) {
        if (!window.toastManager) {
            window.toastManager = new ToastManager();
        }
        return window.toastManager.show(message, 'info');
    }
}

// Initialize global toast manager
window.toastManager = new ToastManager();

// Legacy function for backward compatibility
window.showToast = ToastManager.legacyShow;
