// ===============================================
// Abuja Chamber of Commerce
// Directory Page
// WDD 231
// Author: Emmanuel Eze
// ===============================================

const url = "data/members.json";

const cards = document.querySelector("#members");

const gridBtn = document.querySelector("#gridView");
const listBtn = document.querySelector("#listView");

// -----------------------------------------------
// Load Member Data
// -----------------------------------------------

async function getMembers() {

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch member data.");
        }

        const data = await response.json();

        displayMembers(data);

    } catch (error) {

        console.error(error);

        cards.innerHTML =
            "<p>Unable to load the Chamber directory.</p>";
    }

}

// -----------------------------------------------
// Display Member Cards
// -----------------------------------------------

function displayMembers(members) {

    cards.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("section");
        card.classList.add("member-card");

        // Company Name

        const name = document.createElement("h3");
        name.textContent = member.name;

        // Tagline

        const tagline = document.createElement("p");
        tagline.className = "tagline";
        tagline.textContent = member.tagline;

        // Divider

        const hr = document.createElement("hr");

        // Logo

        const logo = document.createElement("img");
        logo.src = `images/members/${member.image}`;
        logo.alt = `${member.name} logo`;
        logo.loading = "lazy";
        logo.width = 120;
        logo.height = 120;

        // Contact Container

        const info = document.createElement("div");
        info.classList.add("member-info");

        info.innerHTML = `
            <p><strong>Email:</strong><br>${member.email}</p>

            <p><strong>Phone:</strong><br>${member.phone}</p>

            <p>
                <strong>Website:</strong><br>
                <a href="${member.website}"
                   target="_blank"
                   rel="noopener">
                   Visit Website
                </a>
            </p>

            <p><strong>Address:</strong><br>${member.address}</p>
        `;

        // Membership Badge

        const badge = document.createElement("span");

        badge.classList.add("badge");

        switch (member.membership) {

            case 3:

                badge.classList.add("gold");
                badge.textContent = "★★★★★ Gold Member";

                break;

            case 2:

                badge.classList.add("silver");
                badge.textContent = "★★★ Silver Member";

                break;

            default:

                badge.classList.add("member");
                badge.textContent = "★ Chamber Member";

        }

        // Card Body

        const body = document.createElement("div");
        body.classList.add("card-body");

        body.appendChild(logo);
        body.appendChild(info);

        // Build Card

        card.appendChild(name);
        card.appendChild(tagline);
        card.appendChild(hr);
        card.appendChild(body);
        card.appendChild(badge);

        cards.appendChild(card);

    });

}

// -----------------------------------------------
// Toggle Views
// -----------------------------------------------

gridBtn.addEventListener("click", () => {

    cards.classList.add("grid-view");
    cards.classList.remove("list-view");

});

listBtn.addEventListener("click", () => {

    cards.classList.add("list-view");
    cards.classList.remove("grid-view");

});

// -----------------------------------------------

getMembers();