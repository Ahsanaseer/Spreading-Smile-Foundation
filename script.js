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

  // Mobile search
  if (searchBtnMobile && searchBarContainerMobile) {
      searchBtnMobile.addEventListener('click', function(e) {
          e.stopPropagation();
          toggleSearchBar(searchBarContainerMobile);
      });
  }

  // Desktop search
  if (searchBtnDesktop && searchBarContainerDesktop) {
      searchBtnDesktop.addEventListener('click', function(e) {
          e.stopPropagation();
          toggleSearchBar(searchBarContainerDesktop);
      });
  }

  // Close search bars when clicking outside
  document.addEventListener('click', function(e) {
      if (!e.target.closest('.main-search-bar-container') && 
          !e.target.closest('.main-search-btn')) {
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