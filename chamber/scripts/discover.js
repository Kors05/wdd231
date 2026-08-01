/* ==========================================
   WDD 231 Chamber Project
   discover.js
   Author: Emmanuel Eze
========================================== */

import { places } from "../data/places.mjs";

document.addEventListener("DOMContentLoaded", () => {

    /* ===========================
       Discover Cards
    =========================== */

    const cardsContainer = document.querySelector("#discover-cards");

    if (!cardsContainer) {
        console.error("Discover cards container not found.");
        return;
    }

    places.forEach(place => {

        const card = document.createElement("article");
        card.classList.add("discover-card");

        // Title
        const title = document.createElement("h2");
        title.textContent = place.name;

        // Figure
        const figure = document.createElement("figure");

        const image = document.createElement("img");
        image.src = place.image;
        image.alt = `${place.name} in Abuja`;
        image.loading = "lazy";
        image.width = 300;
        image.height = 200;
        image.classList.add("discover-image");

        figure.appendChild(image);

        // Address
        const address = document.createElement("address");
        address.textContent = place.address;

        // Description
        const description = document.createElement("p");
        description.textContent = place.description;

        // Button
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Learn More";

        button.addEventListener("click", () => {
            alert(`Learn more about ${place.name} coming soon!`);
        });

        // Assemble Card
        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        cardsContainer.appendChild(card);

    });

    /* ===========================
       Visitor Message
    =========================== */

    const message = document.querySelector("#visit-message");

    if (message) {

        const lastVisit = Number(localStorage.getItem("lastVisit"));
        const currentVisit = Date.now();

        if (!lastVisit) {

            message.textContent =
                "Welcome! Let us know if you have any questions.";

        } else {

            const millisecondsPerDay = 1000 * 60 * 60 * 24;

            const daysBetween =
                Math.floor((currentVisit - lastVisit) / millisecondsPerDay);

            if (daysBetween < 1) {

                message.textContent =
                    "Back so soon! Awesome!";

            } else if (daysBetween === 1) {

                message.textContent =
                    "You last visited 1 day ago.";

            } else {

                message.textContent =
                    `You last visited ${daysBetween} days ago.`;

            }

        }

        localStorage.setItem("lastVisit", currentVisit);

    }

    /* ===========================
       Footer Information
    =========================== */

    const year = document.querySelector("#year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    const modified = document.querySelector("#lastModified");

    if (modified) {
        modified.textContent = document.lastModified;
    }

});