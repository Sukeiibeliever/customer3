function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('show');
  }
  const modal = document.getElementById('registerModal');
    const openBtns = document.querySelectorAll('.register-btn');
    const closeBtn = document.querySelector('.cancel-btn');

    openBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.style.display = 'block';
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    document.getElementById('registerForm').addEventListener('submit', function(e) {
      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        e.preventDefault();
        alert("Please verify you're not a robot.");
      } else {
        e.preventDefault();
        alert("Registration successful!");
        modal.style.display = 'none';
        this.reset();
        grecaptcha.reset();
      }
    });
