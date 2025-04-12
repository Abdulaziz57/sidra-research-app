document.addEventListener("DOMContentLoaded", function () {
  const yesCheckbox = document.getElementById("yes");
  const noCheckbox = document.getElementById("no");
  const continueButton = document.getElementById("continueButton");
  const backButton = document.querySelector(".back-button");

  const checkboxes = [yesCheckbox, noCheckbox];
  const loc = window.location.pathname;
  const dir = loc.substring(0, loc.lastIndexOf("/"));

  let selectedOption = null;


  function handleCheckboxChange(changedCheckbox) {
    if (changedCheckbox.checked) {
      // Uncheck the other checkbox
      checkboxes.forEach((cb) => {
        if (cb !== changedCheckbox) cb.checked = false;
      });

      selectedOption = changedCheckbox.id;
      continueButton.classList.remove("hidden");
    } else {
      // If both unchecked, hide continue button
      const anyChecked = checkboxes.some((cb) => cb.checked);
      if (!anyChecked) {
        selectedOption = null;
        continueButton.classList.add("hidden");
      }
    }
  }

  // Listen for checkbox changes
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      handleCheckboxChange(checkbox);
    });
  });

  // Handle continue click
  continueButton.addEventListener("click", function () {
    if (selectedOption === "yes") {
      localStorage.setItem("grant-question-selection", "yes");
      window.location.href = dir + "/grant-yes-path.html";
    } else if (selectedOption === "no") {
      localStorage.setItem("grant-question-selection", "no");
      window.location.href = dir + "/grant-no-path.html";
    }
  });

  // Handle back click
  backButton.addEventListener("click", function () {
    localStorage.setItem("grant-question-selection", null);
    window.location.href = dir + "/database-text-questions.html";
  });
});
