/**
 * Decision Tree Interactive Functionality
 * Handles checkbox selection, navigation, and form submission
 */

document.addEventListener("DOMContentLoaded", function () {
    // Get DOM elements
    const optionItems = document.querySelectorAll(".option-item");
    const backButton = document.querySelector(".back-button");
    const continueButton = document.querySelector(".continue-button");
    const checkboxes = document.querySelectorAll(".checkbox-square");
  
    // Track the currently selected option
    let selectedOption = null;
  
    /**
     * Handle option selection
     * Implements radio button-like behavior with toggle functionality
     */
    optionItems.forEach((option) => {
      option.addEventListener("click", function () {
        const isCurrentlySelected = this.classList.contains("selected");
  
        // Clear all selections first
        optionItems.forEach((item) => {
          item.classList.remove("selected");
          item.querySelector(".checkbox-square").classList.remove("checked");
          item.setAttribute("aria-checked", "false");
        });
  
        // If clicking on an already selected option, unselect it
        if (isCurrentlySelected) {
          selectedOption = null;
          continueButton.classList.add("hidden");
          console.log("Option unselected");
        } else {
          // Otherwise, select the clicked option
          this.classList.add("selected");
          this.querySelector(".checkbox-square").classList.add("checked");
          this.setAttribute("aria-checked", "true");
  
          // Store the selected option
          selectedOption = this.classList.contains("yes-option") ? "yes" : "no";
  
          // Show the continue button
          continueButton.classList.remove("hidden");
  
          console.log("Selected option:", selectedOption);
        }
      });
    });
  
    /**
     * Handle back button click
     * Navigates back to previous step
     */
    backButton.addEventListener("click", function () {
      console.log("Navigating back to previous step...");
  
      // Add clicked class for visual feedback
      this.classList.add("clicked");
  
      // Remove clicked class after animation completes
      setTimeout(() => {
        this.classList.remove("clicked");
      }, 200);
  
      // Clear current selection
      optionItems.forEach((item) => {
        item.classList.remove("selected");
        item.querySelector(".checkbox-square").classList.remove("checked");
        item.setAttribute("aria-checked", "false");
      });
  
      // Hide continue button
      continueButton.classList.add("hidden");
      selectedOption = null;
  
      // Here you would implement actual navigation logic
      // For demonstration, we'll just alert
      //alert("Going back to previous step");
      window.location.href = "grant-no-path.html";
    });
  
    /**
     * Handle continue button click
     * Proceeds to next step based on selection
     */
    continueButton.addEventListener("click", function () {
      if (!selectedOption) {
        alert("Please select an option before continuing");
        return;
      }
  
      console.log("Continuing with selection:", selectedOption);
  
      // Add clicked class for visual feedback
      this.classList.add("clicked");
  
      // Remove clicked class after animation completes
      setTimeout(() => {
        this.classList.remove("clicked");
      }, 200);
  
      // Simulate proceeding to next step
      if (selectedOption === "yes") {
        //alert("Proceeding to animal study path...");
        // Here you would navigate to the next step or show additional fields
        window.location.href = "dt-animal-no.html";
      } else {
        //alert("Proceeding to non-animal study path...");
        // Here you would navigate to the alternative path
        window.location.href = "dt-animal-yes.html";
      }
    });
  
    /**
     * Add keyboard accessibility
     * Allows using keyboard to navigate and select options
     */
    optionItems.forEach((option) => {
      // Handle keyboard events
      option.addEventListener("keydown", function (e) {
        // Select option on Enter or Space
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.click();
        }
      });
    });
  
    /**
     * Initialize the component
     * Sets up initial state and accessibility attributes
     */
    function initializeComponent() {
      // Set initial aria-checked state
      optionItems.forEach((option) => {
        option.setAttribute("aria-checked", "false");
      });
  
      // Ensure continue button is hidden initially
      continueButton.classList.add("hidden");
  
      console.log("Decision tree component initialized");
    }
  
    // Initialize the component
    initializeComponent();
  });
  