document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  const fileInput = document.getElementById("fileUpload");
  const uploadBox = document.querySelector(".upload-box");
  const uploadText = document.querySelector(".upload-text");
  const backButton = document.querySelector(".back-button");
  const submitButton = document.querySelector(".submit-button");
  var loc = window.location.pathname;
  var dir = loc.substring(0, loc.lastIndexOf("/"));

  let selectedFiles = [];

  // Open file selector when clicking on the upload box
  uploadBox.addEventListener("click", function () {
    fileInput.click();
  });

  // Handle file selection
  fileInput.addEventListener("change", function (event) {
    selectedFiles = Array.from(event.target.files);

    // Update UI with selected file count
    if (selectedFiles.length === 1) {
      uploadText.textContent = `Selected: ${selectedFiles[0].name}`;
    } else {
      uploadText.textContent = `Selected: ${selectedFiles.length} files`;
    }

    // Change upload box style
    uploadBox.style.borderColor = "#036269";
    uploadText.style.color = "#000";
  });

  // Go back button
  backButton.addEventListener("click", function () {
    window.location.href = dir + "/grant-question.html";
  });

  // Submit button
  submitButton.addEventListener("click", async function () {
    if (selectedFiles.length === 0) {
      alert("Please upload the required documents before submitting.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      // Send files to backend for processing
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Documents submitted successfully!");
        fileInput.value = "";
        selectedFiles = [];
        uploadText.textContent = "⬆ Upload Documents";
        uploadBox.style.borderColor = "rgba(0, 0, 0, 0.1)";
        uploadText.style.color = "rgba(0, 0, 0, 0.27)";
      } else {
        alert("Failed to submit documents.");
      }
    } catch (error) {
      console.error("Error submitting files:", error);
      alert("An error occurred while submitting documents.");
    }
  });
});
