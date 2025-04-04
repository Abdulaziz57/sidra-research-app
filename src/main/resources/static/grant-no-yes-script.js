/**
 * Decision Tree JavaScript Functionality
 * Handles user interactions with the decision tree interface
 */

document.addEventListener("DOMContentLoaded", function () {
    // Get DOM elements
    const checkboxes = document.querySelectorAll(".checkbox-input");
    const optionItems = document.querySelectorAll(".option-item");
    const backButton = document.querySelector(".back-button");
    const continueButton = document.querySelector(".continue-button");
  
    // State management
    let selectedOption = null;
  
    // Initialize the UI
    initializeUI();
  
    /**
     * Initialize the UI and set up event listeners
     */
    function initializeUI() {
      // Add event listeners to checkboxes
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", handleCheckboxChange);
      });
  
      // Add event listener to back button
      backButton.addEventListener("click", handleBackButtonClick);
  
      // Add event listener to continue button
      continueButton.addEventListener("click", handleContinueButtonClick);
    }
  
    /**
     * Handle checkbox change
     * @param {Event} event - The change event
     */
    function handleCheckboxChange(event) {
      const checkbox = event.target;
      const optionValue = checkbox.value;
  
      // If this checkbox is being checked
      if (checkbox.checked) {
        // Uncheck all other checkboxes
        checkboxes.forEach((cb) => {
          if (cb !== checkbox) {
            cb.checked = false;
          }
        });
  
        // Update selected option
        selectedOption = optionValue;
  
        // Show continue button
        continueButton.style.display = "block";
      } else {
        // This checkbox is being unchecked
        selectedOption = null;
  
        // Hide continue button
        continueButton.style.display = "none";
      }
  
      // Log selection (for debugging)
      console.log(`Selected option: ${selectedOption}`);
    }
  
    /**
     * Handle back button click
     */
    function handleBackButtonClick() {
      // Add visual feedback
      backButton.classList.add("clicked");
      setTimeout(() => {
        backButton.classList.remove("clicked");
      }, 200);
  
      // Example: Navigate back to previous page
      console.log("Back button clicked");
      //alert("Going back to previous page");
      localStorage.setItem("grant-no-yes-selection", null);
      window.location.href = "grant-no-path.html";
    }
  
    /**
     * Handle continue button click
     */
    function handleContinueButtonClick() {
      // Add visual feedback
      continueButton.classList.add("clicked");
      setTimeout(() => {
        continueButton.classList.remove("clicked");
      }, 200);
  
      // Navigate based on selection
      if (selectedOption === "yes") {
        console.log("Navigating to YES path");
        localStorage.setItem("grant-no-yes-selection", "yes");

        //alert("You selected YES - navigating to the YES path");
        window.location.href = "dt-interventional-yes.html"; // Uncomment and update with actual path
      } else if (selectedOption === "no") {
        console.log("Navigating to NO path");
        //alert("You selected NO - navigating to the NO path");
        localStorage.setItem("grant-no-yes-selection", "no");
        window.location.href = "dt-interventional-no.html"; // Uncomment and update with actual path
      }
    }
  });
  