document.addEventListener("DOMContentLoaded", function () {
    // Get checkbox elements
    const yesCheckbox = document.getElementById("yes");
    const noCheckbox = document.getElementById("no");
    const continueButton = document.getElementById("continueButton");
    const backButton = document.querySelector(".back-button");
    var loc = window.location.pathname;
    var dir = loc.substring(0, loc.lastIndexOf('/'));
    // Function to handle checkbox changes
    function handleCheckboxChange(selectedCheckbox, otherCheckbox) {
      // If this checkbox is checked
      if (selectedCheckbox.checked) {
        // Uncheck the other checkbox
        otherCheckbox.checked = false;
        // Show the continue button
        continueButton.style.display = "block";
      } else {
        // If neither checkbox is checked, hide the continue button
        if (!otherCheckbox.checked) {
          continueButton.style.display = "none";
        }
      }
    }
  
    // Add event listeners to checkboxes
    yesCheckbox.addEventListener("change", function () {
      handleCheckboxChange(yesCheckbox, noCheckbox);
    });
  
    noCheckbox.addEventListener("change", function () {
      handleCheckboxChange(noCheckbox, yesCheckbox);
    });
  
    // Add event listener to continue button
    continueButton.addEventListener("click", function () {
      if (yesCheckbox.checked) {
        // Navigate to the "Yes" destination
        //alert("Navigating to Grant Submission Research Study path");
        // In a real implementation, you would use:
        window.location.href = dir+"/grant-yes-path.html";
      } else if (noCheckbox.checked) {
        // Navigate to the "No" destination
        //alert("Navigating to Non-Grant Research Study path");
        // In a real implementation, you would use:
        window.location.href = dir+"/grant-no-path.html";
      }
    });
  
    // Add event listener to back button
    backButton.addEventListener("click", function () {
      // Navigate back
      //alert("Going back to previous page");
      // In a real implementation, you would use:
      window.location.href = dir+"/decisionTree.html";
    });
  });
  