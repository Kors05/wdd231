const memberURL = "data/members.json";

async function loadSpotlights() {
    try {
        const response = await fetch(memberURL);

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members = await response.json();

        // Gold = 3, Silver = 2
        const qualifiedMembers = members.filter(member =>
            member.membership === 2 || member.membership === 3
        );

        shuffle(qualifiedMembers);

        const selected = qualifiedMembers.slice(0, 3);

        displaySpotlights(selected);

    } catch (error) {
        console.error(error);
    }
}

function displaySpotlights(members) {

    const container = document.querySelector("#spotlight-container");

    container.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("section");

        card.className = "spotlight-card";

        const level = member.membership === 3 ? "Gold" : "Silver";

        card.innerHTML = `
            <img src="images/members/${member.image}"
                 alt="${member.name} Logo"
                 loading="lazy">

            <h3>${member.name}</h3>

            <p><strong>${member.tagline}</strong></p>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>
                <a href="${member.website}" target="_blank">
                    Visit Website
                </a>
            </p>

            <span class="membership ${level.toLowerCase()}">
                ${level} Member
            </span>
        `;

        container.appendChild(card);

    });

}

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
}

loadSpotlights();