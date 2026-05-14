const budgetForm = document.getElementById("budgetForm");

const destinationInput = document.getElementById("destination");
const daysInput = document.getElementById("days");
const dailyBudgetInput = document.getElementById("dailyBudget");

const budgetOutput = document.getElementById("budgetOutput");
const progressBar = document.getElementById("progressBar");

budgetForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const destination = destinationInput.value.trim();

  const days = Number(daysInput.value);

  const dailyBudget = Number(dailyBudgetInput.value);

  // VALIDATION
  if (
    destination === "" ||
    days <= 0 ||
    dailyBudget <= 0
  ) {

    budgetOutput.innerHTML = `
      <p>Please fill all fields correctly.</p>
    `;

    progressBar.style.width = "0%";

    return;
  }

  // TOTAL COST
  const totalCost = days * dailyBudget;

  // BUDGET STATUS
  let budgetStatus = "";

  let progressWidth = "";

  if (dailyBudget < 50) {
    budgetStatus = "Low Budget";
    progressWidth = "35%";
  }

  else if (dailyBudget >= 50 && dailyBudget <= 150) {
    budgetStatus = "Moderate Budget";
    progressWidth = "70%";
  }

  else {
    budgetStatus = "Luxury Budget";
    progressWidth = "100%";
  }

  // DISPLAY RESULTS
  budgetOutput.innerHTML = `
    <h3>${destination}</h3>

    <p><strong>Trip Duration:</strong> ${days} days</p>

    <p><strong>Daily Budget:</strong> $${dailyBudget}</p>

    <p><strong>Estimated Total Cost:</strong> $${totalCost}</p>

    <p><strong>Budget Type:</strong> ${budgetStatus}</p>
  `;

  // ANIMATE PROGRESS BAR
  progressBar.style.width = progressWidth;

  // SAVE TO LOCALSTORAGE
  const tripData = {
    destination,
    days,
    dailyBudget,
    totalCost,
    budgetStatus
  };

  localStorage.setItem(
    "travelnest_budget",
    JSON.stringify(tripData)
  );

});