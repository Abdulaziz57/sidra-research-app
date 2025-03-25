document.addEventListener("DOMContentLoaded", function () {
    const backButton = document.querySelector(".back-button");
    // Go back button
    backButton.addEventListener("click", function () {
        window.history.back(); // Uses browser history to go back
  });
});