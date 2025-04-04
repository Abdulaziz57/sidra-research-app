document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const fileInput = document.getElementById("file-upload");
  const uploadBox = document.querySelector(".upload-box");
  const uploadText = document.querySelector(".upload-text");
  const backButton = document.getElementById("back-button");
  const submitButton = document.getElementById("submit-button");
  const darkToggle = document.getElementById("darkModeToggle");
  const fileListContainer = document.getElementById("file-list");

  let uploadedFiles = [];

  // Upload box click handler
  uploadBox.addEventListener("click", function (event) {
    event.stopPropagation();
    if (document.activeElement !== fileInput) {
      fileInput.value = "";
      fileInput.click();
    }
  });

  // Handle file selection
  fileInput.addEventListener("change", function (event) {
    if (!event.target.files.length) return;

    const newFiles = Array.from(event.target.files);

    uploadedFiles = [...uploadedFiles, ...newFiles].filter(
      (file, index, self) =>
        self.findIndex((f) => f.name === file.name) === index
    );

    updateFileList();
  });

  // Drag and drop support
  uploadBox.addEventListener("dragover", function (e) {
    e.preventDefault();
    uploadBox.style.backgroundColor = "#f0f0f0";
    uploadBox.style.borderColor = "#036269";
  });

  uploadBox.addEventListener("dragleave", function (e) {
    e.preventDefault();
    uploadBox.style.backgroundColor = "#fafafa";
    uploadBox.style.borderColor = "#ccc";
  });

  uploadBox.addEventListener("drop", function (e) {
    e.preventDefault();
    uploadBox.style.backgroundColor = "#fafafa";
    uploadBox.style.borderColor = "#ccc";

    const newFiles = Array.from(e.dataTransfer.files);

    uploadedFiles = [...uploadedFiles, ...newFiles].filter(
      (file, index, self) =>
        self.findIndex((f) => f.name === file.name) === index
    );

    updateFileList();
  });

  // Update file list UI
  function updateFileList() {
    fileListContainer.innerHTML = "";

    if (uploadedFiles.length > 0) {
      uploadText.textContent = `${uploadedFiles.length} file(s) selected`;
      uploadBox.style.borderColor = "#036269";
      uploadText.style.color =
        document.body.classList.contains("dark") ? "#eee" : "#000";
    } else {
      uploadText.textContent = "⬆ Upload Documents";
      uploadBox.style.borderColor = "rgba(0, 0, 0, 0.1)";
      uploadText.style.color = "rgba(0, 0, 0, 0.27)";
    }

    uploadedFiles.forEach((file, i) => {
      const fileItem = document.createElement("div");
      fileItem.className = "file-item";

      const nameSpan = document.createElement("span");
      nameSpan.className = "file-name";
      nameSpan.textContent = file.name;

      const removeButton = document.createElement("button");
      removeButton.textContent = "✖";
      removeButton.className = "remove-file";
      removeButton.setAttribute("aria-label", `Remove ${file.name}`);
      removeButton.addEventListener("click", () => {
        uploadedFiles.splice(i, 1);
        updateFileList();
      });

      fileItem.appendChild(nameSpan);
      fileItem.appendChild(removeButton);
      fileListContainer.appendChild(fileItem);
    });
  }

  // Back button
  backButton.addEventListener("click", function () {
    window.history.back();
  });

  // Submit button
  submitButton.addEventListener("click", async function () {
    if (uploadedFiles.length === 0) {
      alert("Please upload at least one document before submitting.");
      return;
    }

    const formData = new FormData();
    uploadedFiles.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        fileInput.value = "";
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
  });
});
