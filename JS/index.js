  function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('show');
  }
  let currentIndex = 0;
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const sliderWrapper = document.querySelector(".slider-wrapper");

  function showSlide(index) {
    sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((_, i) => {
      dots[i].classList.toggle("active-dot", i === index);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  setInterval(nextSlide, 5000);
  showSlide(currentIndex);

  const authModal = document.getElementById("auth-modal");
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const showSignup = document.getElementById("show-signup");
  const showLogin = document.getElementById("show-login");
  const authTitle = document.getElementById("auth-title");

  // Toggle forms
  function switchTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');

  if (tab === 'login') {
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
  } else {
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
  }
}

  // Handle login & signup (mocked, just hides modal)
  loginForm.onsubmit = (e) => {
    e.preventDefault();
    authModal.style.display = "none";
  };

  signupForm.onsubmit = (e) => {
    e.preventDefault();
    authModal.style.display = "none";
  };function closeModal() {
    document.getElementById("authContainer").style.display = "none";
  }
