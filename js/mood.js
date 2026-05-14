const soundButtons = document.querySelectorAll(".sound-btn");
const stopSound = document.getElementById("stopSound");
const soundStatus = document.getElementById("soundStatus");

const tripStatusForm = document.getElementById("tripStatusForm");
const tripDestination = document.getElementById("tripDestination");
const tripStatus = document.getElementById("tripStatus");
const trackerList = document.getElementById("trackerList");

let currentAudio = null;

const sounds = {
  beach: "audio/beach.mp3",
  forest: "audio/forest.mp3",
  city: "audio/city.mp3"
};

soundButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedSound = button.dataset.sound;

    if (currentAudio) {
      currentAudio.pause();
    }

    currentAudio = new Audio(sounds[selectedSound]);
    currentAudio.loop = true;
    currentAudio.play();

    soundStatus.textContent = `${button.textContent} is playing.`;
  });
});

stopSound.addEventListener("click", function () {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  soundStatus.textContent = "No sound is playing.";
});

function displayTracker() {
  trackerList.innerHTML = "";

  const savedTrips =
    JSON.parse(localStorage.getItem("travelnest_tracker")) || [];

  savedTrips.forEach(function (trip) {
    const trackerCard = document.createElement("article");
    trackerCard.classList.add("tracker-item");

    trackerCard.innerHTML = `
      <h3>${trip.destination}</h3>
      <p>Status: ${trip.status}</p>
    `;

    trackerList.appendChild(trackerCard);
  });
}

displayTracker();

tripStatusForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const destination = tripDestination.value.trim();
  const status = tripStatus.value;

  if (destination === "") {
    alert("Please enter a destination name.");
    return;
  }

  const trip = {
    destination,
    status
  };

  const savedTrips =
    JSON.parse(localStorage.getItem("travelnest_tracker")) || [];

  savedTrips.push(trip);

  localStorage.setItem("travelnest_tracker", JSON.stringify(savedTrips));

  tripStatusForm.reset();
  displayTracker();
});