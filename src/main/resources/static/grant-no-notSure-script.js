/**
 * IRB Determination Page JavaScript
 * Handles file uploads, form submission, and backend integration.
 */

document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const uploadDropzone = document.getElementById("upload-dropzone");
  const fileInput = document.getElementById("file-upload");
  const fileList = document.getElementById("file-list");
  const backButton = document.getElementById("back-button");
  const submitButton = document.getElementById("submit-button");
  const fileListContainer = document.createElement("div"); // Container for selected files
  let uploadedFiles = [];

  // Append file list container below upload box
  fileListContainer.className = "file-list";
  uploadDropzone.parentNode.insertBefore(fileListContainer, uploadDropzone.nextSibling);

  /**
   * Prevent file input from opening twice
   */
  uploadDropzone.addEventListener("click", function (event) {
    event.stopPropagation(); // Stop event from bubbling
    if (document.activeElement !== fileInput) {
      fileInput.value = ""; // Reset input to allow re-selection
      fileInput.click();
    }
  });

  /**
   * Handle file selection
   */
  fileInput.addEventListener("change", function (e) {
    if (!e.target.files.length) return;
    const newFiles = Array.from(e.target.files);

    // Prevent duplicate files
    uploadedFiles = [...uploadedFiles, ...newFiles].filter(
      (file, index, self) =>
        self.findIndex((f) => f.name === file.name) === index
    );

    updateFileList();
  });

  /**
   * Handle drag and drop events
   */
  uploadDropzone.addEventListener("dragover", function (e) {
    e.preventDefault();
    uploadDropzone.style.backgroundColor = "#f0f0f0";
    uploadDropzone.style.borderColor = "rgba(0, 128, 128, 0.96)";
  });

  uploadDropzone.addEventListener("dragleave", function (e) {
    e.preventDefault();
    uploadDropzone.style.backgroundColor = "#fff";
    uploadDropzone.style.borderColor = "#878787";
  });

  uploadDropzone.addEventListener("drop", function (e) {
    e.preventDefault();
    uploadDropzone.style.backgroundColor = "#fff";
    uploadDropzone.style.borderColor = "#878787";

    const files = e.dataTransfer.files;
    if (files.length) {
      uploadedFiles = [...uploadedFiles, ...Array.from(files)].filter(
        (file, index, self) =>
          self.findIndex((f) => f.name === file.name) === index
      );
      updateFileList();
    }
  });

  /**
   * Update the displayed file list
   */
  function updateFileList() {
    fileListContainer.innerHTML = ""; // Clear previous list

    if (uploadedFiles.length > 0) {
      uploadedFiles.forEach((file, index) => {
        const fileItem = document.createElement("div");
        fileItem.className = "file-item";
        fileItem.textContent = file.name;

        // Remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "✖";
        removeButton.className = "remove-file";
        removeButton.onclick = function () {
          uploadedFiles.splice(index, 1);
          updateFileList();
        };

        fileItem.appendChild(removeButton);
        fileListContainer.appendChild(fileItem);
      });
    }
  }

  /**
   * Handle back button click
   */
  backButton.addEventListener("click", function () {
    this.classList.add("clicked");
    setTimeout(() => {
      this.classList.remove("clicked");
      window.location.href = "grant-no-path.html";
    }, 200);
  });

  /**
   * Handle submit button click - Sends files to the server
   */
  submitButton.addEventListener("click", async function () {
    this.classList.add("clicked");

    setTimeout(async () => {
      this.classList.remove("clicked");

      if (uploadedFiles.length === 0) {
        alert("Please upload at least one document before submitting.");
        return;
      }

      const formData = new FormData();
      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });

      try {
        // Send files to backend for processing
        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          //alert(`Successfully submitted ${uploadedFiles.length} document(s).`);
          uploadedFiles = [];
          updateFileList();
          window.location.href = "thankYouPage.html";
        } else {
          alert("Failed to submit documents.");
        }
      } catch (error) {
        console.error("Error submitting files:", error);
        alert("An error occurred while submitting documents.");
      }
    }, 200);
  });

  /**
   * Initialize the page
   */
  function init() {
    console.log("IRB Determination page initialized");
  }

  init();
});
