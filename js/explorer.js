const destinationGrid = document.getElementById("destinationGrid");
const searchInput = document.getElementById("searchInput");
const continentFilter = document.getElementById("continentFilter");
const destinationModal = document.getElementById("destinationModal");
const modalDetails = document.getElementById("modalDetails");
const closeModal = document.getElementById("closeModal");

function displayDestinations(destinationList) {
  destinationGrid.innerHTML = "";

  destinationList.forEach(function (destination) {
    const card = document.createElement("article");
    card.classList.add("destination-card");

    card.innerHTML = `
      <img src="${destination.image}" alt="${destination.name}">
      <div class="destination-card-content">
        <h3>${destination.name}</h3>
        <p>${destination.country}</p>
        <button>View Details</button>
      </div>
    `;

    card.querySelector("button").addEventListener("click", function () {
      openModal(destination);
    });

    destinationGrid.appendChild(card);
  });
}

function openModal(destination) {
  modalDetails.innerHTML = `
    <h2>${destination.name}, ${destination.country}</h2>
    <p>${destination.description}</p>

    <h3>Popular Attractions</h3>
    <ul>
      ${destination.attractions.map(item => `<li>${item}</li>`).join("")}
    </ul>

    <h3>Travel Cost Comparison</h3>
    <table>
      <tr>
        <th>Budget Type</th>
        <th>Estimated Daily Cost</th>
      </tr>
      <tr>
        <td>Basic</td>
        <td>$${destination.dailyCost}</td>
      </tr>
      <tr>
        <td>Comfort</td>
        <td>$${destination.dailyCost + 40}</td>
      </tr>
      <tr>
        <td>Luxury</td>
        <td>$${destination.dailyCost + 100}</td>
      </tr>
    </table>
  `;

  destinationModal.classList.add("show-modal");
}

function filterDestinations() {
  const searchText = searchInput.value.toLowerCase();
  const selectedContinent = continentFilter.value;

  const filteredDestinations = destinations.filter(function (destination) {
    const matchesSearch = destination.name.toLowerCase().includes(searchText);
    const matchesContinent =
      selectedContinent === "all" || destination.continent === selectedContinent;

    return matchesSearch && matchesContinent;
  });

  displayDestinations(filteredDestinations);
}

searchInput.addEventListener("input", filterDestinations);
continentFilter.addEventListener("change", filterDestinations);

closeModal.addEventListener("click", function () {
  destinationModal.classList.remove("show-modal");
});

displayDestinations(destinations);