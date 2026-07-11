// ==========================================
// WDD 231 Chamber Project
// Dark Mode Toggle
// Author: Emmanuel Eze
// ==========================================

const modeButton = document.querySelector("#modeButton");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    body.classList.add("dark");
    modeButton.textContent = "☀️";
} else {
    modeButton.textContent = "🌙";
}

// Toggle theme
modeButton.addEventListener("click", () => {

    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        modeButton.textContent = "☀️";

    } else {

        localStorage.setItem("theme", "light");

        modeButton.textContent = "🌙";

    }

});