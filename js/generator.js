const generatorForm = document.getElementById("generatorForm");

const travelType = document.getElementById("travelType");
const budgetRange = document.getElementById("budgetRange");

const generatorResult = document.getElementById("generatorResult");
const wishlistList = document.getElementById("wishlistList");

// DISPLAY WISHLIST
function displayWishlist() {

  wishlistList.innerHTML = "";

  const savedWishlist =
    JSON.parse(localStorage.getItem("travelnest_wishlist")) || [];

  savedWishlist.forEach(function (item) {

    const wishlistCard = document.createElement("article");

    wishlistCard.classList.add("wishlist-item");

   wishlistCard.innerHTML = `
  <h3>${item.name}</h3>

  <p>${item.country}</p>

  <button class="remove-btn">
    Remove
  </button>
`;

    wishlistList.appendChild(wishlistCard);
    const removeButton =
  wishlistCard.querySelector(".remove-btn");

removeButton.addEventListener("click", function () {

  const updatedWishlist =
    savedWishlist.filter(function (savedItem) {

      return savedItem.name !== item.name;

    });

  localStorage.setItem(
    "travelnest_wishlist",
    JSON.stringify(updatedWishlist)
  );

  displayWishlist();

});

  });

}

displayWishlist();

// GENERATE RANDOM DESTINATION
generatorForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const selectedType = travelType.value;
  const selectedBudget = budgetRange.value;

  const filteredDestinations = destinations.filter(function (destination) {

    const matchesType =
      selectedType === "all" ||
      destination.type.toLowerCase() === selectedType.toLowerCase();

    const matchesBudget =
  selectedBudget === "all" ||
  destination.budget.toLowerCase() === selectedBudget.toLowerCase();

    return matchesType && matchesBudget;

  });

  if (filteredDestinations.length === 0) {

    generatorResult.innerHTML = `
      <h2>No Destination Found</h2>
      <p>Please try different options.</p>
    `;

    return;

  }

  // RANDOM DESTINATION
  const randomIndex =
    Math.floor(Math.random() * filteredDestinations.length);

  const selectedDestination =
    filteredDestinations[randomIndex];

  generatorResult.classList.add("result-animation");

  generatorResult.innerHTML = `
    <img
      src="${selectedDestination.image}"
      alt="${selectedDestination.name}"
    >

    <h2>${selectedDestination.name}</h2>

    <p>${selectedDestination.country}</p>

    <p>${selectedDestination.description}</p>

    <button class="btn" id="saveWishlistBtn">
      Save to Wishlist
    </button>
  `;

  // SAVE TO WISHLIST
  const saveWishlistBtn =
    document.getElementById("saveWishlistBtn");

  saveWishlistBtn.addEventListener("click", function () {

    let wishlist =
      JSON.parse(localStorage.getItem("travelnest_wishlist")) || [];

    wishlist.push(selectedDestination);

    localStorage.setItem(
      "travelnest_wishlist",
      JSON.stringify(wishlist)
    );

    displayWishlist();

  });

});