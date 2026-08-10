const form = document.querySelector("#booking-form");
const checkIn = document.querySelector("#check-in");
const checkOut = document.querySelector("#check-out");
const status = document.querySelector("#form-status");

function validateDates() {
    if (
        checkIn.value &&
        checkOut.value &&
        checkOut.value <= checkIn.value
    ) {
        checkOut.setCustomValidity(
            "Check-out must be after check-in."
        );

        return false;
    }

    checkOut.setCustomValidity("");

    return true;
}

checkIn.addEventListener("change", validateDates);
checkOut.addEventListener("change", validateDates);

form.addEventListener("submit", event => {
    if (!validateDates()) {
        event.preventDefault();

        status.hidden = false;
        status.textContent =
            "Please choose a valid check-out date.";
    }
});