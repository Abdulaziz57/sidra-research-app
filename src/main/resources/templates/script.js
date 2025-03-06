document.addEventListener("DOMContentLoaded", function () {
    // Get all radio inputs and the continue button
    const radioInputs = document.querySelectorAll(
      'input[type="radio"][name="projectOption"]',
    );
    const continueButton = document.getElementById("continueButton");
    var loc = window.location.pathname;
    var dir = loc.substring(0, loc.lastIndexOf('/'));
    // Define destination URLs for each option
    const destinations = {
      option1: dir+"/clinical-practice-guidelines"+".html",
      option2: dir+"/clinical-outcomes-measurement"+".html",
      option3: dir+"/research-department"+".html",
      option4: dir+"/product-evaluation"+".html",
      option5: dir+"/case-reports"+".html",
      option6: dir+"/service-effectiveness"+".html",
      option7: dir+"/quality-improvement"+".html",
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
        window.location.href = destination;
        //alert(`Navigating to: ${destination}`);
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
  