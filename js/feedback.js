const feedbackForm = document.getElementById("feedbackForm");

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userMessage = document.getElementById("userMessage");

const feedbackMessage = document.getElementById("feedbackMessage");

// FEEDBACK FORM
feedbackForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const name = userName.value.trim();
  const email = userEmail.value.trim();
  const message = userMessage.value.trim();

  // VALIDATION
  if (
    name === "" ||
    email === "" ||
    message === ""
  ) {

    feedbackMessage.textContent =
      "Please fill all fields.";

    return;
  }

  if (
    !email.includes("@") ||
    !email.includes(".")
  ) {

    feedbackMessage.textContent =
      "Please enter a valid email address.";

    return;
  }

  // SAVE TO LOCALSTORAGE
  const feedbackData = {
    name,
    email,
    message
  };

  localStorage.setItem(
    "travelnest_feedback",
    JSON.stringify(feedbackData)
  );

  feedbackMessage.textContent =
    "Thank you for your feedback!";

  feedbackForm.reset();

});

// FAQ ACCORDION
const faqQuestions =
  document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

  question.addEventListener("click", function () {

    const answer =
      question.nextElementSibling;

    answer.classList.toggle("show-answer");

  });

});