// Mobile menu toggle
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('show');
}

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-count').forEach(span => span.textContent = count);
}

// Render cart on cart.html
function renderCart() {
  const container = document.getElementById('cart-items-container');
  const totalPriceEl = document.getElementById('total-price');
  if (!container || !totalPriceEl) return;

  container.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <div class="item-details">
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
        <p>$${item.price.toFixed(2)}</p>
        <div class="quantity-control">
          <button onclick="changeQuantity(${index}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${index}, 1)">+</button>
        </div>
        <button class="remove" onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    container.appendChild(itemDiv);
  });

  totalPriceEl.textContent = total.toFixed(2);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function changeQuantity(index, delta) {
  if (cart[index]) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    renderCart();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// Add to cart
document.addEventListener('click', function (e) {
  if (e.target && e.target.classList.contains('add-to-cart')) {
    const button = e.target;
    const item = {
      name: button.dataset.name,
      desc: button.dataset.desc,
      img: button.dataset.img,
      price: parseFloat(button.dataset.price),
      quantity: 1
    };

    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${item.name} added to cart!`);
  }
});

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

// Proceed to checkout
document.addEventListener('DOMContentLoaded', () => {
  const checkoutBtn = document.getElementById('checkout-button');
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
    } else {
      alert('Thank you for your order!');
      cart = [];
      localStorage.removeItem('cart');
      updateCartCount();
      window.location.href = 'shop.html'; // Redirect back to shop
    }
  });
  
});

// Weather system
const apiKey = '689384ca5d1ada634f4a23b26e7f465f'; // Replace with actual API key

function getWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchWeatherData);
  } else {
    const desc = document.getElementById('weather-description');
    if (desc) desc.textContent = 'Geolocation not supported.';
  }
}

async function fetchWeatherData(position) {
  try {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    const weather = data.weather[0].description;
    const temp = data.main.temp;
    recommendMenu(temp, weather);
  } catch (err) {
    console.error('Weather error:', err);
    const desc = document.getElementById('weather-description');
    if (desc) desc.textContent = 'Unable to retrieve weather data.';
  }
}

function recommendMenu(temp, weatherDescription) {
  const weatherDesc = document.getElementById('weather-description');
  const menuEl = document.getElementById('recommended-menu');
  if (!weatherDesc || !menuEl) return;

  weatherDesc.innerHTML = `Current Weather: ${weatherDescription} ${getWeatherEmoji(weatherDescription)}, ${temp}°C`;

  let menuItems = [];
  if (temp > 25) {
    menuItems = [
      { name: 'Iced Latte', img: 'images/iced-latte.jpg', description: 'Cool and refreshing' },
      { name: 'Cold Brew', img: 'images/cold-brew.jpg', description: 'Smooth and energizing' }
    ];
  } else if (temp > 15) {
    menuItems = [
      { name: 'Cappuccino', img: 'images/cappuccino.jpg', description: 'Creamy and comforting' },
      { name: 'Hot Mocha', img: 'images/hot-mocha.jpg', description: 'Chocolatey delight' }
    ];
  } else {
    menuItems = [
      { name: 'Hot Chocolate', img: 'images/hot-chocolate.jpg', description: 'Rich and warm' },
      { name: 'Espresso', img: 'images/espresso.jpg', description: 'Strong and intense' }
    ];
  }

  menuEl.innerHTML = '';
  menuItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
    `;
    menuEl.appendChild(div);
  });
}

function getWeatherEmoji(desc) {
  desc = desc.toLowerCase();
  if (desc.includes('sun')) return '☀️';
  if (desc.includes('cloud')) return '☁️';
  if (desc.includes('rain')) return '🌧️';
  if (desc.includes('snow')) return '❄️';
  return '🌡️';
}

// Initialize on page load
window.onload = function () {
  try {
    if (document.getElementById('cart-items-container')) {
      renderCart();
    }
    if (document.querySelector('.product-grid')) {
      getWeather();
    }
    updateCartCount();
  } catch (err) {
    console.error('Initialization error:', err);
  }
};
