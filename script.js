document.addEventListener("DOMContentLoaded", () => {
  // ===== NAVIGATION & SECTION DISPLAY =====
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  function showSection(targetId) {
    sections.forEach(sec => {
      sec.classList.toggle("active", sec.id === targetId);
      sec.classList.toggle("hidden", sec.id !== targetId);
    });
    navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${targetId}`));
    document.getElementById("mobileMenu").classList.remove("active");
  }

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      showSection(targetId);
    });
  });

  // Show home by default
  showSection("home");

  // ===== FADE-IN ANIMATION =====
  const fadeEls = document.querySelectorAll(".fade-in");
  fadeEls.forEach((el, i) => setTimeout(() => el.classList.add("show"), i * 200));

  // ===== MOBILE MENU =====
  window.toggleMobileMenu = function () {
    document.getElementById("mobileMenu").classList.toggle("active");
  };

  document.querySelectorAll('.menu-mobile a').forEach(link => {
    link.addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('active'));
  });

  // ===== CART LOGIC =====
  const cartItems = document.getElementById('cartItems');
  const totalCount = document.getElementById('totalCount');
  const totalPrice = document.getElementById('totalPrice');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  let cart = [];

  function updateCart() {
    cartItems.innerHTML = '';
    let totalItems = 0;
    let total = 0;

    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} x${item.qty} - ₱${(item.price * item.qty).toFixed(2)}`;
      cartItems.appendChild(li);
      totalItems += item.qty;
      total += item.price * item.qty;
    });

    totalCount.textContent = totalItems;
    totalPrice.textContent = total.toFixed(2);
  }

  addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);
    const qtyInput = card.querySelector('.quantity');
    const qty = parseInt(qtyInput.value);

    // Check quantity limit
    if (isNaN(qty) || qty < 1) {
      alert("Please enter a valid quantity (1-100).");
      return;
    }
    if (qty > 100) {
      alert("You cannot order more than 100 units of a product.");
      return; // Stop adding to cart
    }

    // Check if item already exists in cart
    const existing = cart.find(item => item.name === name);
    if (existing) {
      if (existing.qty + qty > 100) {
        alert("You cannot have more than 100 units of this product in your cart.");
        return;
      }
      existing.qty += qty;
    } else {
      cart.push({ name, price, qty });
    }

    updateCart(); // Update cart display
  });
});

checkoutBtn.addEventListener('click', () => {
    if (!currentUser) {
      alert("You must be logged in to checkout!");
      authContainer.style.display = 'block';
      signupForm.style.display = 'block';
      loginForm.style.display = 'none';
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    let summary = cart.map(item => `${item.name} x${item.qty} - ₱${(item.price * item.qty).toFixed(2)}`).join('\n');
    alert(`Checkout Summary:\n\n${summary}\n\nTotal Items: ${totalCount.textContent}\nTotal Price: ₱${totalPrice.textContent}`);

    const orderText = cart.map(item => `${item.name} x${item.qty}`).join(', ');
    if (!currentUser.orders) currentUser.orders = [];
    currentUser.orders.push(`${new Date().toLocaleDateString()}: ${orderText} (Total ₱${totalPrice.textContent})`);
    localStorage.setItem('users', JSON.stringify(users));

    renderOrders();
    cart = [];
    updateCart();
  });

  // ===== USER LOGIN / SIGNUP =====
  const loginSignUpBtn = document.getElementById('loginSignUpBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const authContainer = document.getElementById('authContainer');
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');
  const userPanel = document.getElementById('userPanel');
  const userNameDisplay = document.getElementById('userNameDisplay');
  const displayUsername = document.getElementById('displayUsername');
  const editUsernameBtn = document.getElementById('editUsernameBtn');
  const editUsernameSection = document.getElementById('editUsernameSection');
  const newUsernameInput = document.getElementById('newUsername');
  const saveUsernameBtn = document.getElementById('saveUsernameBtn');
  const currentPasswordInput = document.getElementById('currentPassword');
  const newPasswordInput = document.getElementById('newPassword');
  const changePasswordBtn = document.getElementById('changePasswordBtn');
  const ordersList = document.getElementById('ordersList');
  const favoritesList = document.getElementById('favoritesList');
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let currentUser = null;

  loginSignUpBtn.addEventListener('click', () => {
    authContainer.style.display = 'block';
    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
  });

  document.getElementById('toLogin').addEventListener('click', () => {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
  });
  document.getElementById('toSignup').addEventListener('click', () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  });

  document.getElementById('signupBtn').addEventListener('click', () => {
    const username = document.getElementById('signupUsername').value.trim().toLowerCase();
    const password = document.getElementById('signupPassword').value;
    if (!username || !password) return alert("Enter username and password");
    if (users.some(u => u.username.toLowerCase() === username)) return alert("Username already exists");

    const newUser = { username, password, orders: [], favorites: [] };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    loginUser(newUser);
  });

  document.getElementById('loginBtn').addEventListener('click', () => {
    const username = document.getElementById('loginUsername').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    const user = users.find(u => u.username.toLowerCase() === username && u.password === password);
    if (!user) return alert("Invalid username or password");
    loginUser(user);
  });

  function loginUser(user) {
    currentUser = user;
    authContainer.style.display = 'none';
    loginSignUpBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    userPanel.style.display = 'block';
    userNameDisplay.textContent = user.username;
    displayUsername.textContent = user.username;
    renderOrders();
    renderFavorites();
    alert(`Logged in as ${user.username}`);
  }

  logoutBtn.addEventListener('click', () => {
    currentUser = null;
    userPanel.style.display = 'none';
    loginSignUpBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    userNameDisplay.textContent = '';
    displayUsername.textContent = '';
    ordersList.innerHTML = '';
    favoritesList.innerHTML = '';
    alert("Logged out successfully");
  });

  editUsernameBtn.addEventListener('click', () => {
    editUsernameSection.style.display = 'block';
    newUsernameInput.value = currentUser.username;
  });

  saveUsernameBtn.addEventListener('click', () => {
    const newName = newUsernameInput.value.trim();
    if (!newName) return alert("Username cannot be empty");
    if (users.some(u => u.username.toLowerCase() === newName.toLowerCase() && u !== currentUser)) return alert("Username already taken");
    currentUser.username = newName;
    localStorage.setItem('users', JSON.stringify(users));
    userNameDisplay.textContent = newName;
    displayUsername.textContent = newName;
    editUsernameSection.style.display = 'none';
    alert("Username updated!");
  });

  changePasswordBtn.addEventListener('click', () => {
    const currentPass = currentPasswordInput.value;
    const newPass = newPasswordInput.value;
    if (!currentPass || !newPass) return alert("Fill in both password fields");
    if (currentPass !== currentUser.password) return alert("Current password incorrect");
    currentUser.password = newPass;
    localStorage.setItem('users', JSON.stringify(users));
    currentPasswordInput.value = '';
    newPasswordInput.value = '';
    alert("Password updated successfully!");
  });

  function renderOrders() {
    ordersList.innerHTML = '';
    if (!currentUser.orders || currentUser.orders.length === 0) return ordersList.innerHTML = '<li>No orders yet.</li>';
    currentUser.orders.forEach(order => {
      const li = document.createElement('li');
      li.textContent = order;
      ordersList.appendChild(li);
    });
  }

  function renderFavorites() {
    favoritesList.innerHTML = '';
    if (!currentUser.favorites || currentUser.favorites.length === 0) return favoritesList.innerHTML = '<li>No favorites yet.</li>';
    currentUser.favorites.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      favoritesList.appendChild(li);
    });
  }

  // ===== REVIEW MODAL =====
  const reviewModal = document.getElementById("reviewModal");
  const reviewBtn = document.querySelector(".review-btn");
  const closeReview = document.querySelector(".close-review");
  const reviewForm = document.getElementById("reviewForm");

  reviewBtn.addEventListener("click", () => {
    if (!currentUser) {
      alert("You must be logged in to write a review!");
      authContainer.style.display = "block";
      signupForm.style.display = "block";
      loginForm.style.display = "none";
      return;
    }
    const reviewName = document.getElementById("reviewName");
    reviewName.value = currentUser.username;
    reviewName.readOnly = true;
    reviewModal.style.display = "flex";
  });

  closeReview.addEventListener("click", () => reviewModal.style.display = "none");
  window.addEventListener("click", e => { if (e.target === reviewModal) reviewModal.style.display = "none"; });

  reviewForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("reviewName").value.trim();
    const rating = parseInt(document.getElementById("reviewRating").value);
    const text = document.getElementById("reviewText").value.trim();
    if (!name || !rating || !text) return;
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push({ name, rating, text, date: new Date().toLocaleDateString() });
    localStorage.setItem("reviews", JSON.stringify(reviews));
    reviewForm.reset();
    reviewModal.style.display = "none";
    renderReviews();
    alert("Thank you for your review!");
  });

  function renderReviews() {
    const reviewsList = document.getElementById("reviewsList");
    reviewsList.innerHTML = "";
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    if (reviews.length === 0) return reviewsList.innerHTML = "<p>No reviews yet. Be the first to review!</p>";
    reviews.forEach(review => {
      const div = document.createElement("div");
      div.classList.add("review-item");
      const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
      div.innerHTML = `<div class="review-stars">${stars}</div><p><strong>${review.name}</strong> - <em>${review.date}</em></p><p>${review.text}</p><hr>`;
      reviewsList.appendChild(div);
    });
  }

  renderReviews();
});