const menu = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav-list");

if (menu && nav) {
    menu.addEventListener("click", () => {
        const isOpen = menu.getAttribute("aria-expanded") === "true";

        menu.setAttribute("aria-expanded", String(!isOpen));
        nav.classList.toggle("open");
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 640) {
            nav.classList.remove("open");
            menu.setAttribute("aria-expanded", "false");
        }
    });
}

const year = document.querySelector("#year");

if (year) {
    year.textContent = new Date().getFullYear();
}