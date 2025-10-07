// Member Reviews slider logic for about.html
const members = [
    {
        name: 'Ume Habiba',
        img: 'Picrures All/umehabiba.jpg',
        desc: `Working for humanity is a noble pursuit that transcends borders and boundaries. It's about dedicating oneself to the greater good, promoting equality, and protecting human rights that i have seen while working with spreading amile foundation. By serving humanity, we can create a brighter future for generations to come.`
    },
    {
        name: 'Fawaz',
        img: 'Picrures All/fawaz.jpg',
        desc: `I am truly impressed by the incredible work that Spreading Smile Foundation is doing to support those in need. The team’s commitment to making a difference is evident in their transparent approach, compassionate service, and the tangible changes they bring to people's lives. Seeing the smiles they create and the hope they restore is truly heartwarming. Keep up the amazing work.`
    },
    {
        name: 'Laiba',
        img: 'Picrures All/laiba.jpg',
        desc: `I had the privilege of working with Spreading Smile Foundation, an NGO that has left an indelible mark on my life. My tenure with the organization was a transformative journey that not only honed my skills but also instilled in me a sense of purpose and fulfillment.
The foundation provided me with a platform to develop my leadership qualities, teamwork, and communication skills. 
Every case was thoroughly verified, and the team's enthusiasm and dedication to their work were palpable.
 I am grateful for the opportunity to have worked with such a reputable organization and highly recommend them to anyone looking to make a meaningful difference in the lives of others`
    },
    {
        name: 'Muneeb',
        img: 'Picrures All/muneeb.jpg',
        desc: `Working with Spreading Smile Foundation is a truly fulfilling experience. The passion and dedication of the team make every task feel meaningful and I am constantly inspired by the impact we are making.`
    }
];

// Placeholder image path
const createPlaceholderImage = () => {
    return "Picrures All/placeholder-img.png";
};

document.addEventListener('DOMContentLoaded', function() {
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
          // Update text content immediately
          memberName.textContent = members[idx].name;
          memberDesc.textContent = members[idx].desc;
          
          // Show placeholder while loading new image
          memberImg.src = createPlaceholderImage();
          memberImg.alt = members[idx].name;
          memberImg.classList.add('loading');
          
          // Load the actual image in background
          const realImg = new Image();
          realImg.src = members[idx].img;
          
          realImg.onload = () => {
              // Smoothly replace placeholder with actual image
              memberImg.src = members[idx].img;
              memberImg.classList.remove('loading');
          };
          
          realImg.onerror = () => {
              // Fallback to placeholder if image fails to load
              memberImg.src = createPlaceholderImage();
              memberImg.classList.remove('loading');
          };
          
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
});
