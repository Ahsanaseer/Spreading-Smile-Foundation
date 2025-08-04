// ===================== BACK TO TOP BUTTON LOGIC =====================
document.addEventListener('footerLoaded', function() {
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

  // ===================== DONATE BUTTON LOGIC =====================
  // Donate Now button logic (for .js class)
  const donateButtons = document.querySelectorAll('.js');
  donateButtons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      if (btn.tagName === 'A' && btn.getAttribute('href')) return;
      window.location.href = 'donation.html';
    });
  });
});
  