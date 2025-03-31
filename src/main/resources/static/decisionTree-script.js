document.addEventListener("DOMContentLoaded", function () {
  // Get all radio inputs and the continue button
  const radioInputs = document.querySelectorAll(
    'input[type="radio"][name="projectOption"]',
  );
  const continueButton = document.getElementById("continueButton");
  var loc = window.location.pathname;
  var dir = loc.substring(0, loc.lastIndexOf("/"));

  // Define destination URLs for each option
  const destinations = {
    option1: dir + "/wrongDepartmentPage-path" + ".html",
    option2: dir +  "/wrongDepartmentPage-path" + ".html",
    option3: dir + "/database-text-questions" + ".html",
    option4: dir + "/database-text-questions" + ".html",
    option5: dir + "/database-text-questions" + ".html",
    option6: dir +  "/wrongDepartmentPage-path" + ".html",
    option7: dir +  "/wrongDepartmentPage-path" + ".html",
  };

  let selectedOption = null;

  // Add event listeners to all radio inputs
  radioInputs.forEach((input) => {
    input.addEventListener("change", function () {
      // Show the continue button when an option is selected
      continueButton.style.display = "flex";

      // Store the selected option ID
      selectedOption = this.id;
      localStorage.setItem("dt-question-selection", selectedOption);

    });
  });

  // Add click event listener to continue button
  continueButton.addEventListener("click", function () {
    if (selectedOption) {
      // Get the base destination based on the selected option
      const baseDestination = destinations[selectedOption] || "/";

      // Append the selected option as a URL parameter
      // Check if the URL already has parameters
      const hasParams = baseDestination.includes("?");
      const paramConnector = hasParams ? "&" : "?";

      // Create the final destination URL with the option parameter
      const destination = `${baseDestination}${paramConnector}option=${selectedOption}`;

      // Navigate to the destination
      window.location.href = destination;
    }
  });

  // Add click event listener to back button
  const backButton = document.querySelector(".back-button");
  if (backButton) {
    backButton.addEventListener("click", function () {
      // Go back to the previous page
      localStorage.setItem("dt-question-selection", null);
      window.location.href = dir + "/researcher";
    });
  }
});
