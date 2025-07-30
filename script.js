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

  // Member Reviews slider logic
  const members = [
      {
          name: 'Kashmala',
          img: 'Picrures All/kashmala.jpeg',
          desc: `Spreading Smile Foundation holds a special place in my heart for the incredible work they do in uplifting underprivileged communities. Their commitment to education, healthcare, and social support has a profound impact, transforming lives and offering a brighter future. They bring hope to those who need it most, ensuring that everyone has access to essential resources. Witnessing their work firsthand is both humbling and inspiring.`
      },
      {
          name: 'Ghusharib',
          img: 'Picrures All/ghusharib.jpeg',
          desc: `Spreading Smile Foundation is committed to creating lasting change for those who need it the most. Focused on supporting specially-abled children, the elderly in care homes, and families in need, the organization works relentlessly to provide education, healthcare, and community empowerment. Their programs are designed to be sustainable and tailored to the specific needs of each group they serve.`
      },
      {
          name: 'Hamnah',
          img: 'Picrures All/hamnah.jpeg',
          desc: `I am Hamna Irfan, a psychologist and a proud member of this incredible NGO. What makes this organization special is its commitment to transforming lives, spreading positivity, and restoring hope to those who need it most. One of its most inspiring initiatives is the volunteer program, which empowers youth by boosting their skills, confidence, and helping them achieve their dreams. It brings together passionate individuals dedicated to serving humanity.`
      },
      {
          name: 'Esha',
          img: 'Picrures All/Esha.jpeg',
          desc: 'Spreading Smile Foundation has profoundly impacted me. Working with them, I\'ve realized that hope still exists. Despite the challenges we face, there are good people in society who are eager to make a difference. This belief in humanity gives me hope. The NGO truly cares for its donors and takes responsibility for delivering aid to those in genuine need. My experience with this organization has been transformative, helping me grow personally.'
      },
      {
          name: 'Hamza',
          img: 'Picrures All/Hamza.jpeg',
          desc: `Being part of Spreading Smiles Foundation for two years has been incredibly rewarding. I started as a volunteer in the 2023 Ramadan Program, inspired by the organization's dedication and transparency. This led me to join the team, where I've seen passionate individuals working hard to bring joy. The team welcomed me from the start, and the selection process was merit-based. Volunteering has allowed me to make a real difference, whether through outreach or simple acts of kindness.`
      }
  ];

  let currentMember = 0;
  const memberName = document.getElementById('member-name');
  const memberDesc = document.getElementById('member-desc');
  const memberImg = document.getElementById('member-img');
  const prevBtn = document.getElementById('member-prev-btn');
  const nextBtn = document.getElementById('member-next-btn');

  function updateMember(idx, direction = 'right') {
      // Animate out
      memberImg.classList.remove('slide-in');
      memberImg.classList.add(direction === 'right' ? 'slide-left' : 'slide-right');
      
      setTimeout(() => {
          memberName.textContent = members[idx].name;
          memberDesc.textContent = members[idx].desc;
          memberImg.src = members[idx].img;
          memberImg.alt = members[idx].name;
          
          // Animate in
          memberImg.classList.remove('slide-left', 'slide-right');
          memberImg.classList.add('slide-in');
      }, 400);
  }

  if (memberImg && prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
          currentMember = (currentMember - 1 + members.length) % members.length;
          updateMember(currentMember, 'left');
      });
      
      nextBtn.addEventListener('click', () => {
          currentMember = (currentMember + 1) % members.length;
          updateMember(currentMember, 'right');
      });
      
      // Initial state
      memberImg.classList.add('slide-in');
  }

  

  // Video modal functionality
  const playBtn = document.getElementById('yt-video-btn');
  const videoOverlay = document.getElementById('video-overlay');
  const closeBtn = document.getElementById('close-btn');
  const youtubeFrame = document.getElementById('youtube-frame');

  if (playBtn && videoOverlay && closeBtn && youtubeFrame) {
      playBtn.addEventListener('click', () => {
          videoOverlay.style.display = 'flex';
          youtubeFrame.src = "https://www.youtube.com/embed/mlzBAI8u1-8?autoplay=1";
      });

      closeBtn.addEventListener('click', () => {
          videoOverlay.style.display = 'none';
          youtubeFrame.src = "";
      });
  }
});
// Blood form function
function bloodformfunc() {
  window.open("https://docs.google.com/forms/d/e/1FAIpQLSflgKyuquG50HCYIfz11DtpTEGbl6r2UZ4VvDPRaUaN_jVCXg/viewform", "_blank");
}

  const donateButtons = document.querySelectorAll(".js");

    donateButtons.forEach(function(btn) {
        btn.addEventListener("click", function() {
        window.location.href = "/donation.html";
        });
    });

// ===================== BACK TO TOP BUTTON LOGIC =====================
(function() {
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
})();

// ===================== SEARCH FUNCTIONALITY =====================
(function() {
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

  // Attach to both search buttons
  [
    { btn: document.getElementById('main-search-btn'), container: document.getElementById('main-search-bar-container-mobile') },
    { btn: document.getElementById('main-search-btn-desktop'), container: document.getElementById('main-search-bar-container-desktop') }
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
})();


document.addEventListener('DOMContentLoaded', function() {
  // Get the current path and determine the current page
  const currentPath = window.location.pathname;
  let currentPage = '';
  
  // Determine current page based on path
  if (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('/')) {
    currentPage = 'index.html';
  } else if (currentPath.includes('about.html')) {
    currentPage = 'about.html';
  } else if (currentPath.includes('contact.html')) {
    currentPage = 'contact.html';
  } else if (currentPath.includes('donation.html')) {
    currentPage = 'donation.html';
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
});