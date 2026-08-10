import { loadApartments, formatNaira } from "./modules/data.js";

const grid = document.querySelector("#apartment-grid");
const search = document.querySelector("#search");
const type = document.querySelector("#type-filter");
const price = document.querySelector("#max-price");
const count = document.querySelector("#result-count");
const favOnly = document.querySelector("#favorites-only");
const modal = document.querySelector("#details-modal");
const body = document.querySelector("#modal-body");

let data = [];
let favorites = JSON.parse(localStorage.getItem("eco-favorites") || "[]");

function save() {
    localStorage.setItem("eco-favorites", JSON.stringify(favorites));
}

function toggle(id) {
    favorites = favorites.includes(id)
        ? favorites.filter(x => x !== id)
        : [...favorites, id];

    save();
    render();
}

function card(x) {
    const saved = favorites.includes(x.id);

    return `
        <article class="card">
            <div class="card-media">
                <img
                    src="./images/apartment-${x.id}.svg"
                    alt="${x.name} exterior illustration"
                    width="800"
                    height="500"
                    loading="lazy"
                >

                <button
                    class="favorite ${saved ? "saved" : ""}"
                    type="button"
                    data-favorite="${x.id}"
                    aria-label="${saved ? "Remove" : "Save"} ${x.name}"
                >
                    ${saved ? "♥" : "♡"}
                </button>
            </div>

            <div class="card-body">
                <h3>${x.name}</h3>

                <p class="card-location">
                    ${x.location}
                </p>

                <div class="card-meta">
                    <span class="meta">
                        <strong>Type:</strong> ${x.type}
                    </span>

                    <span class="meta">
                        <strong>Guests:</strong> ${x.guests}
                    </span>

                    <span class="meta">
                        <strong>Feature:</strong> ${x.amenity}
                    </span>

                    <span class="meta">
                        <strong>Rate:</strong> ${formatNaira(x.price)}
                    </span>
                </div>

                <button
                    class="btn secondary details"
                    type="button"
                    data-details="${x.id}"
                >
                    View details
                </button>
            </div>
        </article>
    `;
}

function render() {
    const q = search.value.trim().toLowerCase();
    const t = type.value;
    const p = Number(price.value) || Infinity;

    const filtered = data.filter(
        x =>
            `${x.name} ${x.location} ${x.amenity}`
                .toLowerCase()
                .includes(q) &&
            (!t || x.type === t) &&
            x.price <= p &&
            (!favOnly.checked || favorites.includes(x.id))
    );

    count.textContent = `${filtered.length} ${
        filtered.length === 1 ? "property" : "properties"
    } shown`;

    grid.innerHTML = filtered.length
        ? filtered.map(card).join("")
        : `
            <div class="empty">
                <h3>No stays match those filters.</h3>
                <p>Try another search or clear a filter.</p>
            </div>
        `;

    document.querySelectorAll("[data-favorite]").forEach(button => {
        button.addEventListener("click", () =>
            toggle(Number(button.dataset.favorite))
        );
    });

    document.querySelectorAll("[data-details]").forEach(button => {
        button.addEventListener("click", () =>
            details(Number(button.dataset.details))
        );
    });
}

function details(id) {
    const x = data.find(v => v.id === id);

    if (!x) {
        return;
    }

    body.innerHTML = `
        <h2 id="modal-title">${x.name}</h2>

        <p>
            <strong>Location:</strong> ${x.location}
        </p>

        <p>
            <strong>Type:</strong> ${x.type}
        </p>

        <p>
            <strong>Guests:</strong> ${x.guests}
        </p>

        <p>
            <strong>Eco feature:</strong> ${x.amenity}
        </p>

        <p>
            <strong>Nightly rate:</strong> ${formatNaira(x.price)}
        </p>

        <p>
            Comfortable short-stay accommodation designed around
            practical comfort and more responsible living.
        </p>

        <a class="btn" href="./contact.html">
            Request this stay
        </a>
    `;

    modal.showModal();
}

document
    .querySelector("#modal-close")
    .addEventListener("click", () => modal.close());

modal.addEventListener("click", event => {
    if (event.target === modal) {
        modal.close();
    }
});

[search, type, price, favOnly].forEach(element => {
    element.addEventListener("input", render);
    element.addEventListener("change", render);
});

async function init() {
    try {
        data = await loadApartments();
        render();
    } catch (error) {
        console.error(error);

        grid.innerHTML = `
            <div class="empty">
                <h3>We couldn't load the stays.</h3>
                <p>Please refresh and try again.</p>
            </div>
        `;
    }
}

init();