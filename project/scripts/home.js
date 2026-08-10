import { loadApartments } from "./modules/data.js";

const count = document.querySelector("#property-count");

async function init() {
    try {
        const data = await loadApartments();

        count.textContent = `${data.length} carefully selected stays`;
    } catch (error) {
        console.error(error);

        count.textContent = "Our curated stays";
    }
}

init();