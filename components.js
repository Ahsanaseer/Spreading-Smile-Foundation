// ===================== REUSABLE COMPONENTS FOR NGO WEBSITE =====================
// Optimized component system for Spreading Smile Foundation

// Navigation Component
function createNavigation(currentPage = '') {
  return `
    <!-- Navbar Start -->
    <nav class="navbar">
        <div class="navbar-mobile-left">
            <button class="hamburger-btn" id="hamburger-btn" aria-label="Open navigation menu">
                <span class="hamburger-bar"></span>
                <span class="hamburger-bar"></span>
                <span class="hamburger-bar"></span>
            </button>
        </div>
        <div class="navbar-center">
            <img src="Picrures All/logo-wob.png" alt="Spreading Smile Foundation Logo" class="logo">
        </div>
        <div class="navbar-mobile-right">
            <button class="main-search-btn-mobile" id="main-search-btn">
                <!-- Search Icon -->
                <svg width="28" height="28" fill="none" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="13" cy="13" r="10"/>
                    <line x1="23" y1="23" x2="18.65" y2="18.65"/>
                </svg>
            </button>
        </div>
        <div class="navbar-desktop-right">
            <div class="navbar-right">
                <div class="info-block">
                    <span class="info-icon">
                        <!-- Location Icon -->
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="12" fill="var(--primary-color)"/>
                            <path d="M12 17.5C12 17.5 7 13.28 7 10A5 5 0 0117 10C17 13.28 12 17.5 12 17.5Z" stroke="#fff" stroke-width="1.5"/>
                            <circle cx="12" cy="10" r="1.5" fill="#fff"/>
                        </svg>
                    </span>
                    <div class="info-text">
                        <span class="info-label">Location:</span>
                        <span class="info-value">Lahore, Pakistan</span>
                    </div>
                </div>
                <div class="navbar-separator"></div>
                <div class="info-block">
                    <span class="info-icon">
                        <!-- Phone Icon -->
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="12" fill="var(--primary-color)"/>
                            <path d="M15.05 14.44a10.57 10.57 0 01-5.49-5.49l1.64-1.64a.75.75 0 00.18-.77l-.65-2A.75.75 0 0010 4H7.25a.75.75 0 00-.75.75c0 6.8 5.52 12.25 12.25 12.25a.75.75 0 00.75-.75v-2.75a.75.75 0 00-.53-.72l-2-.65a.75.75 0 00-.77.18l-1.64 1.64z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                    <div class="info-text">
                        <span class="info-label">Call us any time:</span>
                        <span class="info-value">+923213214884</span>
                    </div>
                </div>
            </div>
        </div>
         <!-- Animated Search Bar (hidden by default, shown on search icon click) -->
    <div class="main-search-bar-container" id="main-search-bar-container-mobile">
        <input type="text" class="main-search-bar" id="mobile-search-input" name="mobile-search" placeholder="Search...">
    </div>
    </nav>
    <!-- Navbar End -->
  
    <!-- Mobile Menu Start -->
    <div class="mobile-menu" id="mobile-menu">
        <button class="mobile-menu-close-btn" id="mobile-menu-close-btn" aria-label="Close menu">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        </button>
        <ul class="mobile-nav-links">
            <li><a href="/" class="nav-link ${currentPage === 'index.html' ? 'active' : ''}">Home</a></li>
            <li><a href="events.html" class="nav-link ${currentPage === 'events.html' ? 'active' : ''}">Events</a></li>
            <li><a href="about.html" class="nav-link ${currentPage === 'about.html' ? 'active' : ''}">About Us</a></li>
            <li><a href="contact.html" class="nav-link ${currentPage === 'contact.html' ? 'active' : ''}">Contact Us</a></li>
            <li><a href="donation.html" class="js nav-link ${currentPage === 'donation.html' ? 'active' : ''}">Donate Now</a></li>
        </ul>
    </div>
    <!-- Mobile Menu End -->
  
    <!-- Main Navbar Row Start (Green Rectangle) -->
    <div class="main-navbar-row">
        <div class="main-nav-bar">
            <ul class="main-nav-links">
                <li><a href="/" class="nav-link ${currentPage === 'index.html' ? 'active' : ''}">Home</a></li>
                <li><a href="events.html" class="nav-link ${currentPage === 'events.html' ? 'active' : ''}">Events</a></li>
                <li><a href="about.html" class="nav-link ${currentPage === 'about.html' ? 'active' : ''}">About Us</a></li>
                <li><a href="contact.html" class="nav-link ${currentPage === 'contact.html' ? 'active' : ''}">Contact Us</a></li>
            </ul>
        </div>
        <div class="main-nav-actions">
          <div class="search-dropdown">
            <button class="main-search-btn-desktop" id="main-search-btn-desktop">
                <!-- Search Icon -->
                <svg width="28" height="28" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="13" cy="13" r="10"/>
                    <line x1="23" y1="23" x2="18.65" y2="18.65"/>
                </svg>
            </button>
            <div class="main-search-bar-container" id="main-search-bar-container-desktop">
              <input type="text" class="main-search-bar" id="desktop-search-input" name="desktop-search" placeholder="Search...">
            </div>
          </div>
          <button href="#" class="js button" style="--clr: #7808d0">
              <span class="button__icon-wrapper">
                  <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="button__icon-svg" width="10">
                      <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor"></path>
                  </svg>
                  <svg viewBox="0 0 14 15" fill="none" width="10" xmlns="http://www.w3.org/2000/svg" class="button__icon-svg button__icon-svg--copy">
                      <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor"></path>
                  </svg>
              </span>
              <span class="button__text">Donate Now</span>
          </button>
        </div>
    </div>
    <!-- Main Navbar Row End -->
  `;
}

// Footer Component
function createFooter() {
  return `
   <!-- Footer Start -->
   <footer class="footer">
    <div class="footer-main">
      <div class="footer-col footer-brand">
        <img src="Picrures All/logo-wob.png" alt="Spreading Smile Foundation Logo" class="footer-logo">
        <p class="footer-desc">This Foundation basically targets the needy people who are not begging but working hard for their family and self respect.</p>
        <button href="#" class="js button" style="--clr: #7808d0">
          <span class="button__icon-wrapper">
              <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="button__icon-svg" width="10">
                  <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor"></path>
              </svg>
              <svg viewBox="0 0 14 15" fill="none" width="10" xmlns="http://www.w3.org/2000/svg" class="button__icon-svg button__icon-svg--copy">
                  <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor"></path>
              </svg>
          </span>
          <span class="button__text">Donate Now</span>
      </button>
      <button class="btn">
        <span>Follow Us</span>
        <ul>
          <li>
            <a href="https://www.linkedin.com/company/spreading-smile-foundation/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <!-- LinkedIn Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/spreadingsmilefoundation?igsh=MXB2djYyc3pqOWgzcQ==" target="_blank" rel="noopener" aria-label="Instagram">
              <!-- Instagram Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi bi-instagram" viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
              </svg>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/share/1Uz6nfkK3j/" target="_blank" rel="noopener" aria-label="Facebook">
              <!-- Facebook Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi bi-facebook" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
              </svg>
            </a>
          </li>
        </ul>
      </button>
      </div>
      <div class="footer-col footer-links">
        <h3 class="footer-title">Quick Links</h3>
        <div class="footer-underline"></div>
        <ul class="footer-quicklinks-list" style="list-style: none; padding-left: 0;">
          <li><a href="/" class="footer-link"><span class="footer-link-arrow">↗</span> Home</a></li>
          <li><a href="about.html" class="footer-link"><span class="footer-link-arrow">↗</span> About Us</a></li>
          <li><a href="https://drive.google.com/file/d/12Zm9fDo8LpN6B6ZZqCCZPBcf278xRp6_/view?usp=drivesdk" class="footer-link" target="_blank"><span class="footer-link-arrow">↗</span> Privacy policy</a></li>
          <li><a href="contact.html" class="footer-link"><span class="footer-link-arrow">↗</span> Contact Us</a></li>
        </ul>
      </div>
      <div class="footer-col footer-links">
        <h3 class="footer-title">Our Service</h3>
        <div class="footer-underline"></div>
        <ul>
          <li><a href="donation.html" class="footer-link"><span class="footer-link-arrow">↗</span> Give Donation</a></li>
          <li><a href="events.html" class="footer-link"><span class="footer-link-arrow">↗</span> Our Events</a></li>
          <li><a href="index.html#cases-section" class="footer-link"><span class="footer-link-arrow">↗</span> Current Cases</a></li>
          <li><a href="bloodDonorForm.html" class="footer-link"><span class="footer-link-arrow">↗</span> Donate Blood Now</a></li>
          <li><a href="#" class="footer-link"><span class="footer-link-arrow">↗</span> Our Campaign</a></li>
        </ul>
      </div>
      <div class="footer-col footer-contact">
        <div class="footer-contact-box">
          <h3 class="footer-title">Contact Us</h3>
          <div class="footer-contact-info">
            <div class="footer-contact-row">
              <span class="footer-contact-icon-phone">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="14" cy="14" r="12" fill="var(--primary-color)"/><path d="M15.05 14.44a10.57 10.57 0 01-5.49-5.49l1.64-1.64a.75.75 0 00.18-.77l-.65-2A.75.75 0 0010 4H7.25a.75.75 0 00-.75.75c0 6.8 5.52 12.25 12.25 12.25a.75.75 0 00.75-.75v-2.75a.75.75 0 00-.53-.72l-2-.65a.75.75 0 00-.77.18l-1.64 1.64z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              <div>
                <div class="footer-contact-label">Call us any time:</div>
                <div class="footer-contact-value">+923213214884</div>
              </div>
            </div>
            <div class="footer-contact-row">
              <span class="footer-contact-icon-mail">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="12" fill="var(--primary-color)"/>
                          <rect x="6" y="8" width="12" height="8" rx="2" stroke="#fff" stroke-width="1.5"/>
                          <path d="M6 8l6 5 6-5" stroke="#fff" stroke-width="1.5"/>
                </svg>
              </span>
              <div>
                <div class="footer-contact-label">Email us any time:</div>
                <div class="footer-contact-value">spreadingsmile<br>foundation@gmail.com</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2024 Spreading Smile Foundation. All rights reserved.</span>
    </div>
  </footer>
  <!-- Footer End -->
  
  <!-- Back to Top Button Start -->
    <div id="back-to-top" class="back-to-top-btn" aria-label="Back to Top">
      <svg class="back-to-top-progress" width="64" height="64" viewBox="0 0 64 64">
        <circle class="back-to-top-bg" cx="32" cy="32" r="28" fill="none" stroke="#eee" stroke-width="6"/>
        <circle class="back-to-top-bar" cx="32" cy="32" r="28" fill="none" stroke="#46C0B2" stroke-width="6" stroke-linecap="round" stroke-dasharray="176" stroke-dashoffset="176" transform="rotate(-90 32 32)"/>
      </svg>
      <span class="back-to-top-arrow">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#46C0B2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 13 12 7 18 13"/>
          <line x1="12" y1="7" x2="12" y2="19"/>
        </svg>
      </span>
    </div>
  <!-- Back to Top Button End -->
  `;
}

// Image Modal Component
function createImageModal() {
  return `
    <!-- Image Modal Pop-up -->
    <div id="image-modal" class="image-modal">
      <div class="image-modal-content">
        <button class="image-modal-close" aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <img id="modal-image" class="modal-image" src="" alt="">
      </div>
    </div>
  `;
}

// Toast Notification Component
function createToastContainer() {
  return `
    <!-- Toast Container -->
    <div id="toast-container" class="toast-container"></div>
  `;
}

// ===================== COMPONENT INITIALIZATION FUNCTIONS =====================

// Function to load components into page
function loadComponents(currentPage = '') {
  // Load navigation
  const navContainer = document.querySelector('#nav-container');
  if (navContainer) {
    navContainer.innerHTML = createNavigation(currentPage);
    initializeNavigation();
  }

  // Load footer
  const footerContainer = document.querySelector('#footer-container');
  if (footerContainer) {
    footerContainer.innerHTML = createFooter();
    initializeFooter();
  }

  // Load image modal
  const modalContainer = document.querySelector('#modal-container');
  if (modalContainer) {
    modalContainer.innerHTML = createImageModal();
    initializeImageModal();
  }

  // Load toast container
  const toastContainer = document.querySelector('#toast-container');
  if (toastContainer) {
    toastContainer.innerHTML = createToastContainer();
  }
}

// ===================== NAVIGATION INITIALIZATION =====================
function initializeNavigation() {
  // Mobile menu toggle
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');

  // Search functionality for both mobile and desktop
  const searchBtnMobile = document.getElementById('main-search-btn');
  const searchBtnDesktop = document.getElementById('main-search-btn-desktop');
  const searchBarContainerMobile = document.getElementById('main-search-bar-container-mobile');
  const searchBarContainerDesktop = document.getElementById('main-search-bar-container-desktop');

  // Toggle mobile menu
  if (hamburgerBtn && mobileMenu) {
      hamburgerBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          mobileMenu.classList.toggle('open');
      });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
      if (!e.target.closest('.mobile-menu') && !e.target.closest('.hamburger-btn')) {
          if (mobileMenu) mobileMenu.classList.remove('open');
      }
  });

  // Close mobile menu on close button click
  if (mobileMenuCloseBtn && mobileMenu) {
      mobileMenuCloseBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          mobileMenu.classList.remove('open');
      });
  }

  // Hide mobile menu if resizing above 768px
  window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && mobileMenu) {
          mobileMenu.classList.remove('open');
      }
  });

  // Search bar toggle function
  function toggleSearchBar(container) {
      container.classList.toggle('open');
      if (container.classList.contains('open')) {
          container.querySelector('input').focus();
      }
  }

  // Close search bars when clicking outside
  document.addEventListener('click', function(e) {
      if (!e.target.closest('.main-search-bar-container') && 
          !e.target.closest('.main-search-btn-desktop')) {
          if (searchBarContainerMobile) searchBarContainerMobile.classList.remove('open');
          if (searchBarContainerDesktop) searchBarContainerDesktop.classList.remove('open');
      }
  });

  // Attach to both search buttons
  [
    { btn: searchBtnMobile, container: searchBarContainerMobile },
    { btn: searchBtnDesktop, container: searchBarContainerDesktop }
  ].forEach(function(ref) {
    if (ref.btn && ref.container) {
      ref.btn.addEventListener('click', function(e) {
        e.stopPropagation();
        // If bar is open, perform search; if not, open it
        if (ref.container.classList.contains('open')) {
          const input = ref.container.querySelector('.main-search-bar');
          if (input) handleSearch(input);
        } else {
          ref.container.classList.add('open');
          const input = ref.container.querySelector('input');
          if (input) input.focus();
        }
      });
    }
  });

  // Utility to remove previous highlights
  function removeHighlights() {
    document.querySelectorAll('.search-highlight').forEach(function(el) {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });
    const noResults = document.getElementById('search-no-results');
    if (noResults) noResults.remove();
  }

  // Highlight all matches in the body
  function highlightAll(keyword) {
    if (!keyword) return 0;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node) {
        if (!node.parentElement) return NodeFilter.FILTER_REJECT;
        const tag = node.parentElement.tagName;
        if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(tag)) return NodeFilter.FILTER_REJECT;
        if (node.parentElement.closest('.main-search-bar-container,.back-to-top-btn')) return NodeFilter.FILTER_REJECT;
        if (window.getComputedStyle(node.parentElement).display === 'none') return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let found = 0;
    let nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }
    nodes.forEach(function(node) {
      const idx = node.textContent.toLowerCase().indexOf(keyword.toLowerCase());
      if (idx !== -1 && node.textContent.trim() !== '') {
        let html = node.textContent.replace(new RegExp('('+keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')+')', 'gi'), '<mark class="search-highlight">$1</mark>');
        const span = document.createElement('span');
        span.innerHTML = html;
        node.parentNode.replaceChild(span, node);
        found++;
      }
    });
    return found;
  }

  function scrollToFirstHighlight() {
    const first = document.querySelector('.search-highlight');
    if (first) {
      first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function showNoResults() {
    removeHighlights();
    const msg = document.createElement('div');
    msg.id = 'search-no-results';
    msg.textContent = 'No results found!';
    msg.style.position = 'fixed';
    msg.style.top = '20px';
    msg.style.left = '50%';
    msg.style.transform = 'translateX(-50%)';
    msg.style.background = '#ffe066';
    msg.style.color = '#222';
    msg.style.padding = '12px 32px';
    msg.style.borderRadius = '24px';
    msg.style.fontWeight = 'bold';
    msg.style.zIndex = 5000;
    msg.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
    document.body.appendChild(msg);
    setTimeout(() => { if (msg.parentNode) msg.parentNode.removeChild(msg); }, 2000);
  }

  function handleSearch(input) {
    removeHighlights();
    const keyword = input.value.trim();
    if (!keyword) return;
    const found = highlightAll(keyword);
    if (found > 0) {
      scrollToFirstHighlight();
    } else {
      showNoResults();
    }
  }

  // Attach to all search bars and their buttons
  document.querySelectorAll('.main-search-bar').forEach(function(input) {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        handleSearch(input);
      }
    });
    input.addEventListener('input', function() {
      if (!input.value.trim()) removeHighlights();
    });
  });

  // Donate Now button logic (for .js class)
  const donateButtons = document.querySelectorAll('.js');
  donateButtons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      if (btn.tagName === 'A' && btn.getAttribute('href')) return;
      window.location.href = 'donation.html';
    });
  });

  // Navigation highlighting logic
  let currentPath = window.location.pathname;
  let currentPage = '';
  
  // Determine current page based on path (handle both .html and clean paths)
  if (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('/')) {
    currentPage = 'index.html';
  } else if (currentPath.includes('about') || currentPath.includes('about.html')) {
    currentPage = 'about.html';
  } else if (currentPath.includes('contact') || currentPath.includes('contact.html')) {
    currentPage = 'contact.html';
  } else if (currentPath.includes('donation') || currentPath.includes('donation.html')) {
    currentPage = 'donation.html';
  } else if (currentPath.includes('events') || currentPath.includes('events.html') || currentPath.includes('eventsdetail.html')) {
    currentPage = 'events.html';
  } else {
    // Fallback: try to extract filename from path
    const pathParts = currentPath.split('/');
    currentPage = pathParts[pathParts.length - 1] || 'index.html';
  }

  const navLinks = document.querySelectorAll('.nav-link');
  const homeNav = Array.from(navLinks).find(link => {
    const href = link.getAttribute('href');
    return href === 'index.html' || href === '/' || href === './index.html';
  });
  const fromNav = sessionStorage.getItem('fromNavHome') === 'true';

  // Remove active class from all nav links
  navLinks.forEach(link => link.classList.remove('active'));

  // Highlight Home if navigated from another page
  if ((currentPage === 'index.html') && fromNav && homeNav) {
    homeNav.classList.add('active');
    sessionStorage.removeItem('fromNavHome');
    return;
  }

  // Highlight the correct link for current page
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      // Normalize href to match current page
      let normalizedHref = href;
      if (href === 'index.html' || href === '/' || href === './index.html') {
        normalizedHref = 'index.html';
      }
      
      if (normalizedHref === currentPage) {
        link.classList.add('active');
      }
    }
  });

  // Set sessionStorage on Home link click
  if (homeNav) {
    homeNav.addEventListener('click', function() {
      sessionStorage.setItem('fromNavHome', 'true');
    });
  }
}

// ===================== FOOTER INITIALIZATION =====================
function initializeFooter() {
  const btn = document.getElementById('back-to-top');
  const progress = btn ? btn.querySelector('.back-to-top-bar') : null;
  const circleLength = 2 * Math.PI * 28; // r=28, matches SVG

  function updateBackToTop() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    let percent = docHeight > 0 ? scrollY / docHeight : 0;
    percent = Math.max(0, Math.min(1, percent));
    if (progress) {
      progress.setAttribute('stroke-dasharray', circleLength);
      progress.setAttribute('stroke-dashoffset', circleLength - percent * circleLength);
    }
    if (btn) {
      if (scrollY > 200) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
      if (percent >= 0.995) {
        btn.classList.add('full');
      } else {
        btn.classList.remove('full');
      }
    }
  }

  window.addEventListener('scroll', updateBackToTop);
  window.addEventListener('resize', updateBackToTop);
  document.addEventListener('DOMContentLoaded', updateBackToTop);

  if (btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Donate Now button logic (for .js class)
  const donateButtons = document.querySelectorAll('.js');
  donateButtons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      if (btn.tagName === 'A' && btn.getAttribute('href')) return;
      window.location.href = 'donation.html';
    });
  });
}

// ===================== IMAGE MODAL INITIALIZATION =====================
function initializeImageModal() {
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const closeBtn = document.querySelector('.image-modal-close');

  if (!modal || !modalImage || !closeBtn) return;

  // Close modal
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // Open modal with image
  function openModal(imageSrc, imageAlt) {
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  // Close button event
  closeBtn.addEventListener('click', closeModal);

  // Close on overlay click
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });

  // Make openModal globally available
  window.openImageModal = openModal;
}

// ===================== UTILITY FUNCTIONS =====================

// Blood form function
function bloodformfunc() {
  window.location.href = "bloodDonorForm.html";
}

// Make bloodformfunc globally available
window.bloodformfunc = bloodformfunc;

// ===================== AUTO-INITIALIZATION =====================
// Function to determine current page
function getCurrentPage() {
  let currentPath = window.location.pathname;
  let currentPage = '';
  
  if (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('/')) {
    currentPage = 'index.html';
  } else if (currentPath.includes('about') || currentPath.includes('about.html')) {
    currentPage = 'about.html';
  } else if (currentPath.includes('contact') || currentPath.includes('contact.html')) {
    currentPage = 'contact.html';
  } else if (currentPath.includes('donation') || currentPath.includes('donation.html')) {
    currentPage = 'donation.html';
  } else if (currentPath.includes('events') || currentPath.includes('events.html') || currentPath.includes('eventsdetail.html')) {
    currentPage = 'events.html';
  } else {
    const pathParts = currentPath.split('/');
    currentPage = pathParts[pathParts.length - 1] || 'index.html';
  }
  
  return currentPage;
}

// Load navbar immediately when script loads
function loadNavbarImmediately() {
  const navContainer = document.querySelector('#nav-container');
  if (navContainer) {
    const currentPage = getCurrentPage();
    navContainer.innerHTML = createNavigation(currentPage);
    initializeNavigation();
    
    // Add class to show all content once navbar is loaded
    document.body.classList.add('navbar-loaded');
  }
}

// Load remaining components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = getCurrentPage();
  
  // Load footer and other components
  const footerContainer = document.querySelector('#footer-container');
  if (footerContainer) {
    footerContainer.innerHTML = createFooter();
    initializeFooter();
  }

  // Load image modal
  const modalContainer = document.querySelector('#modal-container');
  if (modalContainer) {
    modalContainer.innerHTML = createImageModal();
    initializeImageModal();
  }

  // Load toast container
  const toastContainer = document.querySelector('#toast-container');
  if (toastContainer) {
    toastContainer.innerHTML = createToastContainer();
  }
});

// Load navbar immediately
if (document.readyState === 'loading') {
  // DOM is still loading, wait for it
  document.addEventListener('DOMContentLoaded', loadNavbarImmediately);
} else {
  // DOM is already loaded, load navbar immediately
  loadNavbarImmediately();
}
