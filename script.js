document.addEventListener("DOMContentLoaded", function() {
    console.log("Onigiring Pinoy website loaded successfully!");});
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    // Hide all sections except home at first
    sections.forEach(section => {if(section.id !== "home") section.style.display = "none";});

    // Add click events to nav links
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // prevent default anchor scrollconst targetId = link.getAttribute("href").substring(1);sections.forEach(section => {if(section.id === targetId) section.style.display = "block";
            const targetId = link.getAttribute("href").substring(1);
            sections.forEach(section => {
                if(section.id === targetId) section.style.display = "block";
                else section.style.display = "none";
            });
        });
    });});

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    // Show only Home at start
    sections.forEach(section => {
        if(section.id !== "home") section.classList.add("hidden");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);

            sections.forEach(section => {
                if(section.id === targetId) {
                    // Fade in target section
                    section.classList.remove("hidden");
                } else {
                    // Fade out other sections
                    section.classList.add("hidden");
                }
            });

            // Highlight active nav link
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });
});

const fadeOutDuration = 500; // match CSS transition duration

sections.forEach(section => {
    if(section.id !== targetId) {
        section.classList.add("hidden");
    } else {
        setTimeout(() => {
            section.classList.remove("hidden");
        }, fadeOutDuration);
    }
});
