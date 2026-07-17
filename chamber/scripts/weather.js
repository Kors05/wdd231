// ==========================================
// WDD 231 Chamber Project
// weather.js
// Abuja Chamber of Commerce
// ==========================================

const API_KEY = "d7bfd04e426af0bc2b584cc737d3e719";

const LAT = 9.0765;
const LON = 7.3986;

// Current Weather API
const CURRENT_URL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

// 5-Day Forecast API
const FORECAST_URL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

async function loadWeather() {
    try {

        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(CURRENT_URL),
            fetch(FORECAST_URL)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Unable to retrieve weather data.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {
        console.error("Weather Error:", error);

        document.querySelector("#current-temp").textContent = "--";

        document.querySelector("#weather-description").textContent =
            "Weather unavailable";

        document.querySelector("#forecast").innerHTML =
            "<p>Forecast unavailable.</p>";
    }
}

function displayCurrentWeather(data) {

    document.querySelector("#current-temp").textContent =
        Math.round(data.main.temp);

    document.querySelector("#weather-description").textContent =
        capitalize(data.weather[0].description);

}

function displayForecast(data) {

    const forecastContainer =
        document.querySelector("#forecast");

    forecastContainer.innerHTML = "";

    // Select approximately 24-hour intervals
    const indexes = [7, 15, 23];

    indexes.forEach(index => {

        if (!data.list[index]) return;

        const item = data.list[index];

        const date = new Date(item.dt_txt);

        const day = date.toLocaleDateString("en-US", {
            weekday: "short"
        });

        const card = document.createElement("div");

        card.className = "forecast-day";

        card.innerHTML = `
            <strong>${day}</strong>
            <p>${Math.round(item.main.temp)}°C</p>
        `;

        forecastContainer.appendChild(card);

    });

}

function capitalize(text) {

    return text.replace(/\b\w/g, letter => letter.toUpperCase());

}

loadWeather();