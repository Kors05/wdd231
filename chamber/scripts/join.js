/* ==========================================
   WDD 231 Chamber Project
   join.js
   Author: Emmanuel Eze
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===========================
       Hidden Timestamp
    =========================== */

    const timestamp = document.querySelector("#timestamp");

    if (timestamp) {
        timestamp.value = new Date().toISOString();
    }

    /* ===========================
       Membership Modals
    =========================== */

    const buttons = document.querySelectorAll("[data-modal]");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const modalID = button.dataset.modal;

            const modal = document.getElementById(modalID);

            if (modal) {
                modal.showModal();
            }

        });

    });

    /* ===========================
       Close Buttons
    =========================== */

    document.querySelectorAll(".closeModal").forEach(button => {

        button.addEventListener("click", () => {

            button.closest("dialog").close();

        });

    });

    /* ===========================
       Close Modal by Clicking Outside
    =========================== */

    document.querySelectorAll("dialog").forEach(dialog => {

        dialog.addEventListener("click", (event) => {

            const rect = dialog.getBoundingClientRect();

            const inside =
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom;

            if (!inside) {
                dialog.close();
            }

        });

    });

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