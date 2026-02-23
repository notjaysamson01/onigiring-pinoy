document.addEventListener("DOMContentLoaded", () => {
  // --------------------------
  // Elements
  // --------------------------
  const header = document.getElementById("siteHeader");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("#menu a");
  const hamburgerMenu = document.getElementById("menu");

  // Modals
  const orderModal = document.getElementById("orderModal");
  const accountModal = document.getElementById("accountModal");
  const reviewModal = document.getElementById("reviewModal");

  const accountBtn = document.querySelector(".account-btn");
  const accountClose = document.querySelector(".close-account");
  const switchModeElem = document.getElementById("switchMode");
  const formTitle = document.getElementById("formTitle");
  const switchText = document.getElementById("switchText");
  let isLogin = true;

  // --------------------------
  // Helper Functions
  // --------------------------
  function showSection(targetId) {
    sections.forEach(section => {
      section.classList.toggle("hidden", section.id !== targetId);
    });

    // Header visibility
    header.style.display = targetId === "home" ? "none" : "block";

    // Update active link
    navLinks.forEach(link => link.classList.remove("active"));
    const activeLink = document.querySelector(`#menu a[href="#${targetId}"]`);
    if (activeLink) activeLink.classList.add("active");

    // Close hamburger menu (mobile)
    hamburgerMenu.classList.remove("active");
  }

  function openModal(modal) {
    modal.style.display = "flex";
  }

  function closeModal(modal) {
    modal.style.display = "none";
  }

  function toggleAccountMode() {
    isLogin = !isLogin;

    if (isLogin) {
      formTitle.textContent = "Login";
      switchText.innerHTML = `Don't have an account? <span id="switchMode">Sign Up</span>`;
    } else {
      formTitle.textContent = "Sign Up";
      switchText.innerHTML = `Already have an account? <span id="switchMode">Login</span>`;
    }

    // Re-attach listener after innerHTML change
    document.getElementById("switchMode").addEventListener("click", toggleAccountMode);
  }

  // --------------------------
  // Initial Setup
  // --------------------------
  sections.forEach(section => {
    if (section.id !== "home") section.classList.add("hidden");
  });
  

  // --------------------------
  // Navigation Links
  // --------------------------
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1).toLowerCase();
      showSection(targetId);
    });
  });

  // --------------------------
  // Hamburger toggle
  // --------------------------
  window.toggleMenu = () => {
    hamburgerMenu.classList.toggle("active");
  };

  // --------------------------
  // Order Modal
  // --------------------------
  window.openModal = () => openModal(orderModal);
  window.closeModal = () => closeModal(orderModal);

  window.addEventListener("click", e => {
    if (e.target === orderModal) closeModal(orderModal);
    if (e.target === reviewModal) closeModal(reviewModal);
    if (e.target === accountModal) closeModal(accountModal);
  });

  document.getElementById("orderForm").addEventListener("submit", e => {
    const tinapang = parseInt(document.querySelector('[name="tinapang_qty"]').value) || 0;
    const adobo = parseInt(document.querySelector('[name="adobo_qty"]').value) || 0;
    const longganisa = parseInt(document.querySelector('[name="longganisa_qty"]').value) || 0;

    if (tinapang === 0 && adobo === 0 && longganisa === 0) {
      alert("Please order at least one item.");
      e.preventDefault();
    }
    if (tinapang > 100 || adobo > 100 || longganisa > 100) {
      alert("Patay gutom ka ba? 100 lang ang pwede orderin!");
      e.preventDefault();
    }
  });

  // --------------------------
  // Account Modal
  // --------------------------
  accountBtn.addEventListener("click", () => openModal(accountModal));
  accountClose.addEventListener("click", () => closeModal(accountModal));
  switchModeElem.addEventListener("click", toggleAccountMode);

  // --------------------------
  // Review Modal
  // --------------------------
  document.querySelectorAll(".review-btn").forEach(btn => {
    btn.addEventListener("click", () => openModal(reviewModal));
  });

  document.querySelector(".close-review").addEventListener("click", () => closeModal(reviewModal));

  document.getElementById("reviewForm").addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you for your review!");
    reviewModal.style.display = "none";
    e.target.reset();
  });
});