/* =====================================================
TASK 23 : BASIC SETUP
Objective:
Start the JavaScript file with a console message and page-load alert.
Why:
Beginners can immediately see that the script is connected to the HTML page.
Lab Task Satisfied:
console.log("Welcome to Community Portal") and window.onload alert.
===================================================== */
console.log("Welcome to Community Portal");

window.onload = function () {
    alert("Welcome to the Local Community Event Portal!");
};

/* =====================================================
TASK 24 : VARIABLES
Objective:
Create constants and a mutable seat variable using template literals.
Why:
Variables store reusable data and template literals make messages readable.
Lab Task Satisfied:
const eventName, const eventDate, let availableSeats, and template literals.
===================================================== */
const eventName = "Music Festival";
const eventDate = "2026-07-15";
let availableSeats = 30;
console.log(`${eventName} is scheduled on ${eventDate} with ${availableSeats} seats.`);

/* =====================================================
TASK 30 : OBJECTS AND CLASSES
Objective:
Create an Event class with properties and an availability method.
Why:
Classes group related event data and behavior in one beginner-friendly structure.
Lab Task Satisfied:
class Event with name, date, location, category, seats, and checkAvailability().
===================================================== */
class Event {
    constructor(name, date, location, category, seats, image) {
        this.name = name;
        this.date = date;
        this.location = location;
        this.category = category;
        this.seats = seats;
        this.image = image;
    }

    checkAvailability() {
        return this.seats > 0;
    }
}

/* =====================================================
TASK 31 : ARRAY METHODS
Objective:
Use push(), filter(), map(), find(), and some() with event data.
Why:
Array methods are common tools for managing lists in JavaScript applications.
Lab Task Satisfied:
All required array methods appear in the event setup and rendering flow.
===================================================== */
const communityEvents = [];

function addEvent(event) {
    communityEvents.push(event);
}

/* =====================================================
TASK 28 : FUNCTIONS
Objective:
Create reusable functions for adding events, registering users, and filtering.
Why:
Functions keep the code organized and prevent repeated logic.
Lab Task Satisfied:
addEvent(), registerUser(), and filterEventsByCategory().
===================================================== */
addEvent(new Event("Music Festival", "2026-07-15", "Central Park", "music", 30, "images/event1.jpg"));
addEvent(new Event("Sports Meet", "2026-07-18", "Community Stadium", "sports", 20, "images/event2.jpg"));
addEvent(new Event("Workshop", "2026-07-20", "Learning Hall", "education", 25, "images/event3.jpg"));
addEvent(new Event("Food Carnival", "2026-07-22", "Town Square", "food", 40, "images/event4.jpg"));
addEvent(new Event("Book Fair", "2026-07-25", "Public Library", "literature", 15, "images/event5.jpg"));

const eventNames = communityEvents.map((event) => event.name);
const foundWorkshop = communityEvents.find((event) => event.name === "Workshop");
const hasSeats = communityEvents.some((event) => event.seats > 0);
console.log("Event names:", eventNames);
console.log("Found workshop:", foundWorkshop);
console.warn("At least one event has seats:", hasSeats);

/* =====================================================
TASK 29 : CLOSURES
Objective:
Create a private registration counter.
Why:
Closures let a function remember data without exposing it globally.
Lab Task Satisfied:
createRegistrationCounter() tracks total registrations.
===================================================== */
function createRegistrationCounter() {
    let totalRegistrations = 0;
    return function () {
        totalRegistrations += 1;
        return totalRegistrations;
    };
}

const countRegistration = createRegistrationCounter();

/* =====================================================
TASK 25 : CONDITIONALS
Objective:
Only display future events that still have seats.
Why:
Users should not register for past or full events.
Lab Task Satisfied:
if/else logic filters future events and events having seats.
===================================================== */
function getDisplayableEvents(events) {
    const today = new Date();
    return events.filter((event) => {
        if (new Date(event.date) > today && event.checkAvailability()) {
            return true;
        } else {
            console.warn(`${event.name} is hidden because it is past or full.`);
            return false;
        }
    });
}

function filterEventsByCategory(category) {
    const futureEvents = getDisplayableEvents(communityEvents);
    if (category === "all") {
        return futureEvents;
    }
    return futureEvents.filter((event) => event.category === category);
}

/* =====================================================
TASK 26 AND TASK 32 : LOOPS AND DOM MANIPULATION
Objective:
Render event cards dynamically using forEach() and DOM methods.
Why:
Dynamic rendering makes the interface update when filters, seats, or searches change.
Lab Task Satisfied:
forEach(), querySelector(), querySelectorAll(), createElement(), and appendChild().
===================================================== */
const eventCardsContainer = document.querySelector("#eventCards");

function renderEventCards(events) {
    eventCardsContainer.innerHTML = "";

    events.forEach((event) => {
        const card = document.createElement("article");
        card.className = "eventCard";

        const image = document.createElement("img");
        image.src = event.image;
        image.alt = `${event.name} image`;

        const title = document.createElement("h3");
        title.textContent = event.name;

        const date = document.createElement("p");
        date.textContent = `Date: ${event.date}`;

        const location = document.createElement("p");
        location.textContent = `Location: ${event.location}`;

        const seats = document.createElement("p");
        seats.textContent = `Available Seats: ${event.seats}`;

        const button = document.createElement("button");
        button.textContent = "Register Button";
        button.disabled = !event.checkAvailability();
        button.onclick = function () {
            registerUser(event.name);
        };

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(date);
        card.appendChild(location);
        card.appendChild(seats);
        card.appendChild(button);
        eventCardsContainer.appendChild(card);
    });
}

renderEventCards(getDisplayableEvents(communityEvents));

/* =====================================================
TASK 33 : EVENT HANDLING
Objective:
Handle click, change, blur, double-click, keyup, and keydown events.
Why:
Events make the page interactive and responsive to user actions.
Lab Task Satisfied:
onclick, onchange, onblur, ondblclick, keyup, and keydown.
===================================================== */
document.querySelector("#eventFilter").onchange = function (event) {
    const selectedCategory = event.target.value;
    localStorage.setItem("preferredEventType", selectedCategory);
    renderEventCards(filterEventsByCategory(selectedCategory));
};

document.querySelector("#eventSearch").onkeydown = function (event) {
    const searchText = event.target.value.toLowerCase();
    const matchingEvents = getDisplayableEvents(communityEvents).filter((item) =>
        item.name.toLowerCase().includes(searchText)
    );
    renderEventCards(matchingEvents);
};

document.querySelector("#phone").onblur = function () {
    validatePhone();
};

document.querySelectorAll(".galleryImage").forEach((image) => {
    image.ondblclick = function () {
        image.classList.toggle("enlarged");
    };
});

document.querySelector("#feedbackText").addEventListener("keyup", function () {
    document.querySelector("#charCount").textContent = `Characters Typed: ${this.value.length}`;
});

/* =====================================================
TASK 34 : FORM VALIDATION
Objective:
Validate name, email, phone, and message with inline errors.
Why:
Validation prevents incomplete or incorrect data from being submitted.
Lab Task Satisfied:
event.preventDefault() and inline error messages.
===================================================== */
const registrationForm = document.querySelector("#registrationForm");

function validatePhone() {
    const phone = document.querySelector("#phone").value.trim();
    const phoneError = document.querySelector("#phoneError");
    const validPhone = /^[0-9]{10}$/.test(phone);
    phoneError.textContent = validPhone ? "" : "Enter a valid 10 digit phone number.";
    return validPhone;
}

function validateForm() {
    let isValid = true;
    const name = document.querySelector("#fullName").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    document.querySelector("#nameError").textContent = "";
    document.querySelector("#emailError").textContent = "";
    document.querySelector("#messageError").textContent = "";

    if (name.length < 2) {
        document.querySelector("#nameError").textContent = "Name must contain at least 2 characters.";
        isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.querySelector("#emailError").textContent = "Enter a valid email address.";
        isValid = false;
    }

    if (!validatePhone()) {
        isValid = false;
    }

    if (message.length < 5) {
        document.querySelector("#messageError").textContent = "Message must contain at least 5 characters.";
        isValid = false;
    }

    return isValid;
}

/* =====================================================
TASK 27 AND TASK 40 : ERROR HANDLING AND AJAX REGISTRATION
Objective:
Use try/catch/finally and simulate an AJAX POST registration.
Why:
Real applications must handle successful and failed submissions gracefully.
Lab Task Satisfied:
try, catch, finally, POST-style data handling, setTimeout(), success, and failed messages.
===================================================== */
function registerUser(selectedEventName) {
    const output = document.querySelector("#registrationOutput");
    try {
        const selectedEvent = communityEvents.find((event) => event.name === selectedEventName);
        if (!selectedEvent || selectedEvent.seats <= 0) {
            throw new Error("No seats available for this event.");
        }
        selectedEvent.seats -= 1;
        availableSeats = selectedEvent.seats;
        const total = countRegistration();
        output.textContent = `Registration Successful for ${selectedEvent.name}. Total registrations: ${total}`;
        renderEventCards(filterEventsByCategory(document.querySelector("#eventFilter").value));
    } catch (error) {
        output.textContent = "Registration Failed";
        console.error(error.message);
    } finally {
        console.log("Registration process finished.");
    }
}

registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const output = document.querySelector("#registrationOutput");

    if (!validateForm()) {
        output.textContent = "Registration Failed";
        return;
    }

    output.textContent = "Submitting registration...";
    const formData = new FormData(registrationForm);
    console.log("POST form data:", Object.fromEntries(formData.entries()));

    setTimeout(function () {
        registerUser(document.querySelector("#eventType option:checked").textContent);
    }, 1000);
});

/* =====================================================
TASK 35 : LOCAL STORAGE
Objective:
Store, retrieve, and clear the preferred event type.
Why:
Local storage remembers a user's preference after page reload.
Lab Task Satisfied:
Store preferred event type, retrieve on reload, and clear localStorage/sessionStorage.
===================================================== */
const savedPreference = localStorage.getItem("preferredEventType");
if (savedPreference) {
    document.querySelector("#eventFilter").value = savedPreference;
    document.querySelector("#eventType").value = savedPreference;
    renderEventCards(filterEventsByCategory(savedPreference));
}

document.querySelector("#clearPreferences").onclick = function () {
    localStorage.clear();
    sessionStorage.clear();
    document.querySelector("#eventFilter").value = "all";
    document.querySelector("#eventType").value = "";
    renderEventCards(getDisplayableEvents(communityEvents));
    console.warn("Local storage and session storage were cleared.");
};

/* =====================================================
TASK 36 : GEOLOCATION API
Objective:
Use navigator.geolocation.getCurrentPosition() with options and errors.
Why:
Location support allows future nearby-event features.
Lab Task Satisfied:
enableHighAccuracy:true, timeout:5000, maximumAge:0, and error cases.
===================================================== */
document.querySelector("#findEventsBtn").onclick = function () {
    if (!navigator.geolocation) {
        document.querySelector("#locationOutput").textContent = "Geolocation is not supported.";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function (position) {
            document.querySelector("#latitude").textContent = position.coords.latitude;
            document.querySelector("#longitude").textContent = position.coords.longitude;
            document.querySelector("#accuracy").textContent = `${position.coords.accuracy} meters`;
        },
        function (error) {
            let message = "Unable to fetch location.";
            if (error.code === error.PERMISSION_DENIED) {
                message = "Permission Denied";
            } else if (error.code === error.TIMEOUT) {
                message = "Timeout";
            } else if (error.code === error.POSITION_UNAVAILABLE) {
                message = "Position Unavailable";
            }
            document.querySelector("#locationOutput").textContent = message;
            console.error(message);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
};

/* =====================================================
TASK 37 : VIDEO EVENTS
Objective:
Use oncanplay to show when the promo video is ready.
Why:
Users should receive feedback when media is ready to play.
Lab Task Satisfied:
oncanplay displays "Video Ready To Play".
===================================================== */
document.querySelector("#promoVideo").oncanplay = function () {
    document.querySelector("#videoStatus").textContent = "Video Ready To Play";
};

/* =====================================================
TASK 38 : FETCH API
Objective:
Fetch mock event data using .then() and .catch().
Why:
Fetch demonstrates how front-end applications request server data.
Lab Task Satisfied:
Fetches https://jsonplaceholder.typicode.com/posts using then/catch.
===================================================== */
fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => {
        console.log("Fetch API received posts:", posts.slice(0, 3));
    })
    .catch((error) => {
        console.error("Fetch API failed:", error);
    });

/* =====================================================
TASK 39 : ASYNC/AWAIT
Objective:
Rewrite the fetch process using async and await with a loading spinner.
Why:
async/await often reads more like step-by-step code for beginners.
Lab Task Satisfied:
Loading spinner message and async/await fetch implementation.
===================================================== */
async function loadMockEvents() {
    const spinner = document.createElement("p");
    spinner.textContent = "Loading mock events...";
    spinner.id = "loadingSpinner";
    document.querySelector("#events").appendChild(spinner);

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const posts = await response.json();
        console.log("Async/Await received posts:", posts.slice(0, 3));
    } catch (error) {
        console.error("Async/Await fetch failed:", error);
    } finally {
        spinner.remove();
    }
}

loadMockEvents();

/* =====================================================
TASK 41 : DEBUGGING
Objective:
Use console.log(), console.warn(), and console.error() throughout the project.
Why:
Debugging messages help beginners understand application flow and errors.
Lab Task Satisfied:
All three console methods are used in setup, filtering, fetch, storage, and registration.
===================================================== */
console.log("Debugging setup complete.");

/* =====================================================
TASK 42 : JQUERY
Objective:
Use jQuery for a click handler and fade effects.
Why:
The lab requires jQuery alongside modern JavaScript.
Lab Task Satisfied:
$('#registerBtn').click() plus fadeIn() and fadeOut() on event cards.
===================================================== */
$(document).ready(function () {
    $("#registerBtn").click(function () {
        $(".eventCard").fadeOut(150).fadeIn(250);
    });
});
