document.addEventListener("DOMContentLoaded", function () {
    // Get elements
    const fileInput = document.getElementById("fileUpload");
    const uploadBox = document.querySelector(".upload-box");
    const uploadText = document.querySelector(".upload-text");
    const backButton = document.querySelector(".back-button");
    const submitButton = document.querySelector(".submit-button");
    var loc = window.location.pathname;
    var dir = loc.substring(0, loc.lastIndexOf('/'));
    // Selected files array
    let selectedFiles = [];
  
    // Add click event to upload box
    uploadBox.addEventListener("click", function () {
      fileInput.click();
    });
  
    // Handle file selection
    fileInput.addEventListener("change", function (event) {
      const files = event.target.files;
  
      if (files.length > 0) {
        selectedFiles = Array.from(files);
  
        // Update upload text to show selected files
        if (selectedFiles.length === 1) {
          uploadText.textContent = `Selected: ${selectedFiles[0].name}`;
        } else {
          uploadText.textContent = `Selected: ${selectedFiles.length} files`;
        }
  
        // Change upload box style to indicate files are selected
        uploadBox.style.borderColor = "#036269";
        uploadText.style.color = "#000";
      }
    });
  
    // Add event listener to back button
    backButton.addEventListener("click", function () {
      // Navigate back
      //alert("Going back to previous page");
      // In a real implementation, you would use:
      window.location.href = dir+"/grant-question.html";
    });
  
    // Add event listener to submit button
    submitButton.addEventListener("click", function () {
      if (selectedFiles.length === 0) {
        alert("Please upload the required documents before submitting.");
        return;
      }
  
      // In a real implementation, you would handle the file upload here
      alert(
        `Submitting ${selectedFiles.length} files. In a real implementation, this would upload the files to the server.`,
      );
  
      // Simulate successful submission
      setTimeout(() => {
        alert("Documents submitted successfully!");
        // Reset the form
        fileInput.value = "";
        selectedFiles = [];
        uploadText.textContent = "⬆ Upload Documents";
        uploadBox.style.borderColor = "rgba(0, 0, 0, 0.1)";
        uploadText.style.color = "rgba(0, 0, 0, 0.27)";
      }, 1000);
    });
  });
  