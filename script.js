document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#menu a");

    // Hide all sections except home initially
    sections.forEach(section => {
        if (section.id !== "home") {
            section.classList.add("hidden");
        }
    });

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const targetId = link.getAttribute("href").substring(1);

            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.remove("hidden");
                } else {
                    section.classList.add("hidden");
                }
            });

            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            // Close hamburger after click (mobile)
            document.getElementById("menu").classList.remove("active");
        });
    });


    // Trigger fade-in for Home section
    sections[0].querySelectorAll(".fade-in").forEach((el, i) =>
        setTimeout(() => el.classList.add("show"), i * 150)
    );
});

function openModal() {
    document.getElementById("orderModal").style.display = "block";
}

function closeModal() {
    document.getElementById("orderModal").style.display = "none";
}

// Close when clicking outside modal
window.onclick = function(event) {
    const modal = document.getElementById("orderModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById("orderForm").addEventListener("submit", function(e) {

    const tinapang = parseInt(document.querySelector('[name="tinapang_qty"]').value) || 0;
    const adobo = parseInt(document.querySelector('[name="adobo_qty"]').value) || 0;
    const longganisa = parseInt(document.querySelector('[name="longganisa_qty"]').value) || 0;

    if (tinapang === 0 && adobo === 0 && longganisa === 0) {
        alert("Please order at least one item.");
        e.preventDefault();
    }
    if (tinapang > 100 || adobo > 100 || longganisa > 100) {
         alert("patay gutom ka ba? 100 lang ang pwede orderin!");
        e.preventDefault();
    }
});

function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function() {

  const accountBtn = document.querySelector(".account-btn");
  const modal = document.getElementById("accountModal");
  const closeBtn = document.querySelector(".close-account");
  const switchMode = document.getElementById("switchMode");
  const formTitle = document.getElementById("formTitle");
  const switchText = document.getElementById("switchText");

  let isLogin = true;

  // Open modal
  accountBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Switch Login / Sign Up
  switchMode.addEventListener("click", () => {
    isLogin = !isLogin;

    if (isLogin) {
      formTitle.textContent = "Login";
      switchText.innerHTML = `Don't have an account? <span id="switchMode">Sign Up</span>`;
    } else {
      formTitle.textContent = "Sign Up";
      switchText.innerHTML = `Already have an account? <span id="switchMode">Login</span>`;
    }

    // Re-select switchMode after innerHTML change
    document.getElementById("switchMode").addEventListener("click", arguments.callee);
  });

});

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const reviewModal = document.getElementById("reviewModal");
  const reviewBtns = document.querySelectorAll(".review-btn");
  const closeReview = document.querySelector(".close-review");
  const reviewForm = document.getElementById("reviewForm");

  // Open review modal
  reviewBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      reviewModal.style.display = "flex";
    });
  });

  // Close review modal when clicking "×"
  closeReview.addEventListener("click", () => {
    reviewModal.style.display = "none";
  });

  // Close review modal when clicking outside the modal content
  window.addEventListener("click", (e) => {
    if (e.target === reviewModal) {
      reviewModal.style.display = "none";
    }
  });

  // Submit review form
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for your review!");
    reviewModal.style.display = "none";
    reviewForm.reset();
  });
});