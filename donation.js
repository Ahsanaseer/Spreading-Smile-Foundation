// Navbar and mobile menu logic
document.addEventListener('DOMContentLoaded', function() {
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
          let html = node.textContent.replace(new RegExp('('+keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')+')', 'gi'), '<mark class=\"search-highlight\">$1</mark>');
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
        // If it's an anchor, let it work as a link
        if (btn.tagName === 'A' && btn.getAttribute('href')) return;
        window.location.href = 'donation.html';
      });
    });
  });

  const donateButtons = document.querySelectorAll(".js");

  donateButtons.forEach(function(btn) {
      btn.addEventListener("click", function() {
      window.location.href = "/donation.html";
      });
  });