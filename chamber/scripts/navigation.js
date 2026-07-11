// ==========================================
// WDD 231 Chamber Project
// Responsive Navigation
// Author: Emmanuel Eze
// ==========================================

const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#primaryNav");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.innerHTML = isOpen ? "✕" : "☰";

    menuButton.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close Menu" : "Open Menu"
    );

});