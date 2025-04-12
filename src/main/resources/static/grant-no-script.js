document.addEventListener("DOMContentLoaded", function () {
  // Get checkbox elements
  const yesCheckbox = document.getElementById("yes");
  const noCheckbox = document.getElementById("no");
  const notSureCheckbox = document.getElementById("not-sure");
  const continueButton = document.getElementById("continueButton");
  const backButton = document.querySelector(".back-button");

  const checkboxes = [yesCheckbox, noCheckbox, notSureCheckbox];
  const loc = window.location.pathname;
  const dir = loc.substring(0, loc.lastIndexOf('/'));

  // Function to handle checkbox selection
  function handleCheckboxChange(selectedCheckbox) {
    if (selectedCheckbox.checked) {
      // Uncheck all other checkboxes
      checkboxes.forEach((cb) => {
        if (cb !== selectedCheckbox) cb.checked = false;
      });

      // Show the continue button
      continueButton.classList.remove("hidden");
    } else {
      // Hide continue button if none are selected
      const anyChecked = checkboxes.some((cb) => cb.checked);
      if (!anyChecked) {
        continueButton.classList.add("hidden");
      }
    }
  }

  // Add event listeners to checkboxes
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      handleCheckboxChange(checkbox);
    });
  });

  // Add event listener to continue button
  continueButton.addEventListener("click", function () {
    if (yesCheckbox.checked) {
      localStorage.setItem("grant-no-selection", "yes");
      window.location.href = dir + "/grant-no-yes-path.html";
    } else if (noCheckbox.checked) {
      localStorage.setItem("grant-no-selection", "no");
      window.location.href = dir + "/grant-no-no-path.html";
    } else if (notSureCheckbox.checked) {
      localStorage.setItem("grant-no-selection", "not-sure");
      window.location.href = dir + "/grant-no-notSure-path.html";
    }
  });

  // Add event listener to back button
  backButton.addEventListener("click", function () {
    localStorage.setItem("grant-no-selection", null);
    window.location.href = dir + "/grant-question.html";
  });
});
