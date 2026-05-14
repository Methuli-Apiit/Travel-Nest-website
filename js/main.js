// Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });
}

// Newsletter form with localStorage
const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");
const newsletterMessage = document.getElementById("newsletterMessage");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = newsletterEmail.value.trim();

    if (email === "") {
      newsletterMessage.textContent = "Please enter your email address.";
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      newsletterMessage.textContent = "Please enter a valid email address.";
      return;
    }

    localStorage.setItem("travelnest_newsletter_email", email);

    newsletterMessage.textContent = "Thank you for subscribing to TravelNest!";
    newsletterForm.reset();
  });
}
// Auto-rotating travel quotes on Home Page
const quoteText = document.getElementById("quoteText");

const travelQuotes = [
  "Adventure begins where your comfort zone ends.",
  "Collect moments, not things.",
  "Travel makes you richer in memories.",
  "Discover new places and create unforgettable stories.",
  "Your next journey starts with one simple plan."
];

let quoteIndex = 0;

if (quoteText) {
  setInterval(function () {
    quoteIndex++;

    if (quoteIndex >= travelQuotes.length) {
      quoteIndex = 0;
    }

    quoteText.textContent = travelQuotes[quoteIndex];
  }, 3000);
}

// Destination of the Day
const destinationOfDay = document.getElementById("destinationOfDay");

const dailyDestinations = [
  {
    name: "Ella, Sri Lanka",
    image: "images/ella.jpg",
    description: "A peaceful hill-country destination with waterfalls, tea plantations and mountain views."
  },
  {
    name: "Bali, Indonesia",
    image: "images/bali.jpg",
    description: "A tropical island famous for beaches, temples, rice terraces and relaxing resorts."
  },
  {
    name: "Paris, France",
     image: "images/paris.jpg",
    description: "A romantic city known for the Eiffel Tower, museums, cafés and beautiful streets."
  },
  {
    name: "Tokyo, Japan",
    image: "images/tokyo.jpg",
    description: "A modern city with technology, culture, food, shopping and historic temples."
  },
  {
    name: "Maldives",
    image: "images/maldives.jpg",
    description: "A luxury beach destination with clear blue water, coral reefs and peaceful resorts."
  }
];

if (destinationOfDay) {
  const today = new Date();
  const dayNumber = today.getDate();
  const selectedDestination = dailyDestinations[dayNumber % dailyDestinations.length];

  destinationOfDay.innerHTML = `
  <img
    src="${selectedDestination.image}"
    alt="${selectedDestination.name}"
    class="destination-day-image"
  >

  <h3>${selectedDestination.name}</h3>

  <p>${selectedDestination.description}</p>
`;
  
}
// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {

  window.addEventListener("load", function () {

    navigator.serviceWorker.register("service-worker.js")
      .then(function () {
        console.log("Service Worker Registered");
      });

  });

}
// SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {

  const windowHeight = window.innerHeight;

  revealElements.forEach(function (element) {

    const elementTop =
      element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }

  });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();