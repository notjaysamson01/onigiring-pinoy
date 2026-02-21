document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    // Hide all sections except home initially
    sections.forEach(section => {
        if(section.id !== "home") section.classList.add("hidden");
    });

    // Add click events
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);

            sections.forEach(section => {
                if(section.id === targetId) {
                    section.classList.remove("hidden");
                    section.querySelectorAll(".fade-in").forEach((el, i) =>
                        setTimeout(() => el.classList.add("show"), i * 150)
                    );
                } else {
                    section.classList.add("hidden");
                    section.querySelectorAll(".fade-in").forEach(el => el.classList.remove("show"));
                }
            });

            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // Trigger fade-in for Home section
    sections[0].querySelectorAll(".fade-in").forEach((el, i) =>
        setTimeout(() => el.classList.add("show"), i * 150)
    );
});