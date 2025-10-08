// ===================== CONTACT PAGE SPECIFIC LOGIC =====================
document.addEventListener('DOMContentLoaded', function() {

  // ===================== CONTACT FORM AJAX + TOAST LOGIC =====================
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      fetch('PHPMailer/sendMail.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.text())
      .then(data => {
        showToast(data.includes('Successfully') ? 'Message Sent Successfully!' : 'Failed to Send!');
        if (data.includes('Successfully')) form.reset();
      })
      .catch(() => {
        showToast('Error sending message!');
      });
    });
  }

  function showToast(message) {
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
        setTimeout(() => {
          toast.classList.add('show');
        }, 10);
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => { toast.style.display = 'none'; }, 300);
        }, 3500);
      }
    }
  }
});
