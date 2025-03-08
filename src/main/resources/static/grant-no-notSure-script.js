/**
 * IRB Determination Page JavaScript
 * Handles file uploads and form submission
 */

document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const uploadDropzone = document.getElementById("upload-dropzone");
    const fileInput = document.getElementById("file-upload");
    const fileList = document.getElementById("file-list");
    const backButton = document.getElementById("back-button");
    const submitButton = document.getElementById("submit-button");
    var loc = window.location.pathname;
    var dir = loc.substring(0, loc.lastIndexOf('/'));
    // Array to store uploaded files
    let uploadedFiles = [];
  
    /**
     * Handle file selection
     */
    fileInput.addEventListener("change", function (e) {
      const files = e.target.files;
      handleFiles(files);
    });
  
    /**
     * Handle drag and drop events
     */
    uploadDropzone.addEventListener("dragover", function (e) {
      e.preventDefault();
      e.stopPropagation();
      uploadDropzone.style.backgroundColor = "#f0f0f0";
      uploadDropzone.style.borderColor = "rgba(0, 128, 128, 0.96)";
    });
  
    uploadDropzone.addEventListener("dragleave", function (e) {
      e.preventDefault();
      e.stopPropagation();
      uploadDropzone.style.backgroundColor = "#fff";
      uploadDropzone.style.borderColor = "#878787";
    });
  
    uploadDropzone.addEventListener("drop", function (e) {
      e.preventDefault();
      e.stopPropagation();
      uploadDropzone.style.backgroundColor = "#fff";
      uploadDropzone.style.borderColor = "#878787";
  
      const files = e.dataTransfer.files;
      handleFiles(files);
    });
  
    /**
     * Handle click on upload box
     */
    uploadDropzone.addEventListener("click", function () {
      fileInput.click();
    });
  
    /**
     * Process the selected files
     */
    function handleFiles(files) {
      if (files.length === 0) return;
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
  
        // Check if file is already in the list
        if (
          uploadedFiles.some((f) => f.name === file.name && f.size === file.size)
        ) {
          showNotification(`File "${file.name}" is already added.`, "warning");
          continue;
        }
  
        // Check file type (optional)
        const validTypes = [
          ".pdf",
          ".doc",
          ".docx",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        const fileType = file.type || getExtension(file.name);
  
        if (
          !validTypes.includes(fileType) &&
          !validTypes.includes("." + getExtension(file.name))
        ) {
          showNotification(
            `File "${file.name}" is not a supported document type.`,
            "error",
          );
          continue;
        }
  
        // Add file to array
        uploadedFiles.push(file);
  
        // Create file item in the list
        addFileToList(file);
      }
  
      // Reset file input
      fileInput.value = "";
    }
  
    /**
     * Add file to the visual list
     */
    function addFileToList(file) {
      const fileItem = document.createElement("div");
      fileItem.className = "file-item";
      fileItem.dataset.fileName = file.name;
  
      const fileName = document.createElement("span");
      fileName.className = "file-name";
      fileName.textContent = file.name;
  
      const removeButton = document.createElement("button");
      removeButton.className = "file-remove";
      removeButton.innerHTML = "✕";
      removeButton.setAttribute("aria-label", "Remove file");
      removeButton.addEventListener("click", function () {
        removeFile(file.name);
      });
  
      fileItem.appendChild(fileName);
      fileItem.appendChild(removeButton);
      fileList.appendChild(fileItem);
    }
  
    /**
     * Remove file from the list
     */
    function removeFile(fileName) {
      // Remove from array
      uploadedFiles = uploadedFiles.filter((file) => file.name !== fileName);
  
      // Remove from DOM
      const fileItem = fileList.querySelector(`[data-file-name="${fileName}"]`);
      if (fileItem) {
        fileItem.remove();
      }
    }
  
    /**
     * Get file extension
     */
    function getExtension(filename) {
      return filename.split(".").pop().toLowerCase();
    }
  
    /**
     * Show notification (simple alert for now)
     */
    function showNotification(message, type) {
      alert(message);
      // In a real implementation, you might want to use a toast notification system
    }
  
    /**
     * Handle back button click
     */
    backButton.addEventListener("click", function () {
      // Add visual feedback
      this.classList.add("clicked");
  
      setTimeout(() => {
        this.classList.remove("clicked");
        // In a real implementation, you would navigate back
        // For now, just show an alert
        //alert("Going back to previous page");
        window.location.href = dir+"/grant-no-path.html";
      }, 200);
    });
  
    /**
     * Handle submit button click
     */
    submitButton.addEventListener("click", function () {
      // Add visual feedback
      this.classList.add("clicked");
  
      setTimeout(() => {
        this.classList.remove("clicked");
  
        // Validate form
        if (uploadedFiles.length === 0) {
          showNotification(
            "Please upload at least one document before submitting.",
            "error",
          );
          return;
        }
  
        // In a real implementation, you would submit the files to a server
        // For now, just show success message
        showNotification(
          `Successfully submitted ${uploadedFiles.length} document(s).`,
          "success",
        );
  
        // Clear the form after successful submission
        uploadedFiles = [];
        fileList.innerHTML = "";
      }, 200);
    });
  
    /**
     * Initialize the page
     */
    function init() {
      console.log("IRB Determination page initialized");
    }
  
    // Initialize the page
    init();
  });
  