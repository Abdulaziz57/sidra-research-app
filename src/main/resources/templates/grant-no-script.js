document.addEventListener("DOMContentLoaded", function () {
    // Get checkbox elements
    const yesCheckbox = document.getElementById("yes");
    const noCheckbox = document.getElementById("no");
    const notSureCheckbox = document.getElementById("not-sure");
    const continueButton = document.getElementById("continueButton");
    const backButton = document.querySelector(".back-button");
    var loc = window.location.pathname;
    var dir = loc.substring(0, loc.lastIndexOf('/'));
    // Function to handle checkbox changes
    function handleCheckboxChange(selectedCheckbox, otherCheckboxes) {
      // If this checkbox is checked
      if (selectedCheckbox.checked) {
        // Uncheck the other checkboxes
        otherCheckboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });
        // Show the continue button
        continueButton.style.display = "flex";
      } else {
        // If no checkbox is checked, hide the continue button
        if (
          !yesCheckbox.checked &&
          !noCheckbox.checked &&
          !notSureCheckbox.checked
        ) {
          continueButton.style.display = "none";
        }
      }
    }
  
    // Add event listeners to checkboxes
    yesCheckbox.addEventListener("change", function () {
      handleCheckboxChange(yesCheckbox, [noCheckbox, notSureCheckbox]);
    });
  
    noCheckbox.addEventListener("change", function () {
      handleCheckboxChange(noCheckbox, [yesCheckbox, notSureCheckbox]);
    });
  
    notSureCheckbox.addEventListener("change", function () {
      handleCheckboxChange(notSureCheckbox, [yesCheckbox, noCheckbox]);
    });
  
    // Add event listener to continue button
    continueButton.addEventListener("click", function () {
      if (yesCheckbox.checked) {
        // Navigate to the "Yes" destination
        alert("Navigating to Human-Subject Research path");
        // In a real implementation, you would use:
        // window.location.href = "/human-subject-path";
      } else if (noCheckbox.checked) {
        // Navigate to the "No" destination
        alert("Navigating to Non-Human-Subject Research path");
        // In a real implementation, you would use:
        // window.location.href = "/non-human-subject-path";
      } else if (notSureCheckbox.checked) {
        // Navigate to the "Not Sure" destination
        alert("Navigating to Information/Help page");
        // In a real implementation, you would use:
        // window.location.href = "/research-help-path";
      }
    });
  
    // Add event listener to back button
    backButton.addEventListener("click", function () {
      // Navigate back
      //alert("Going back to previous page");
      // In a real implementation, you would use:
      window.location.href = dir+"/grant-question.html";
    });
  });
  