document.addEventListener("DOMContentLoaded", function () {
    // Get all radio inputs and the continue button
    const radioInputs = document.querySelectorAll(
      'input[type="radio"][name="projectOption"]',
    );
    const continueButton = document.getElementById("continueButton");
  
    // Define destination URLs for each option
    const destinations = {
      option1: "/clinical-practice-guidelines",
      option2: "/clinical-outcomes-measurement",
      option3: "/research-department",
      option4: "/product-evaluation",
      option5: "/case-reports",
      option6: "/service-effectiveness",
      option7: "/quality-improvement",
    };
  
    let selectedOption = null;
  
    // Add event listeners to all radio inputs
    radioInputs.forEach((input) => {
      input.addEventListener("change", function () {
        // Show the continue button when an option is selected
        continueButton.style.display = "flex";
  
        // Store the selected option ID
        selectedOption = this.id;
      });
    });
  
    // Add click event listener to continue button
    continueButton.addEventListener("click", function () {
      if (selectedOption) {
        // Navigate to the appropriate destination based on the selected option
        const destination = destinations[selectedOption] || "/";
  
        // For demonstration purposes, alert the destination
        // In a real implementation, you would use:
        // window.location.href = destination;
        alert(`Navigating to: ${destination}`);
      }
    });
  
    // Add click event listener to back button
    const backButton = document.querySelector(".back-button");
    backButton.addEventListener("click", function () {
      // For demonstration purposes
      alert("Going back to previous page");
      // In a real implementation, you would use:
      // window.history.back();
    });
  });
  