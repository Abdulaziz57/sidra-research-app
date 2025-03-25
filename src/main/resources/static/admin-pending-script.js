document.addEventListener("DOMContentLoaded", function () {
  const backButton = document.querySelector(".nav-item");
  // Go back button
  backButton.addEventListener("click", function () {
      window.history.back(); // Uses browser history to go back
});
});