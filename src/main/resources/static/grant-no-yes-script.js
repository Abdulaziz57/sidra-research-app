

document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const checkboxes = document.querySelectorAll(".checkbox");
  const continueButton = document.querySelector(".continue-button");
  const backButton = document.querySelector(".back-button");

  // Store selected value
  let selectedOption = null;

  // Initialize UI
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const selected = event.target;

      // Uncheck others
      checkboxes.forEach((cb) => {
        if (cb !== selected) cb.checked = false;
      });

      // If one is selected, show the continue button
      if (selected.checked) {
        selectedOption = selected.value;
        continueButton.classList.remove("hidden");
      } else {
        selectedOption = null;
        continueButton.classList.add("hidden");
      }

      console.log(`Selected option: ${selectedOption}`);
    });
  });

  // Back button click
  backButton.addEventListener("click", () => {
    backButton.classList.add("clicked");
    setTimeout(() => {
      backButton.classList.remove("clicked");
    }, 200);

    localStorage.setItem("grant-no-yes-selection", null);
    window.location.href = "grant-no-path.html";
  });

  // Continue button click
  continueButton.addEventListener("click", () => {
    continueButton.classList.add("clicked");
    setTimeout(() => {
      continueButton.classList.remove("clicked");
    }, 200);

    if (selectedOption === "yes") {
      localStorage.setItem("grant-no-yes-selection", "yes");
      window.location.href = "dt-interventional-yes.html";
    } else if (selectedOption === "no") {
      localStorage.setItem("grant-no-yes-selection", "no");
      window.location.href = "dt-interventional-no.html";
    }
  });
});
