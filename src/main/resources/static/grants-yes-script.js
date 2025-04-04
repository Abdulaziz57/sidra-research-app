document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const fileInput = document.getElementById("fileUpload");
  const uploadBox = document.querySelector(".upload-box");
  const uploadText = document.querySelector(".upload-text");
  const backButton = document.querySelector(".back-button");
  const submitButton = document.querySelector(".submit-button");
  const darkToggle = document.getElementById("darkModeToggle");

  const fileListContainer = document.createElement("div");
  fileListContainer.className = "file-list";
  uploadBox.parentNode.insertBefore(fileListContainer, uploadBox.nextSibling);

  let selectedFiles = [];

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

    // Prevent duplicates
    selectedFiles = [...selectedFiles, ...newFiles].filter(
      (file, index, self) =>
        self.findIndex((f) => f.name === file.name) === index
    );

    updateFileList();
  });

  // Update file list UI
  function updateFileList() {
    fileListContainer.innerHTML = "";

    if (selectedFiles.length > 0) {
      uploadText.textContent = `${selectedFiles.length} file(s) selected`;
      uploadBox.style.borderColor = "#036269";
      uploadText.style.color =
        document.body.classList.contains("dark") ? "#eee" : "#000";
    } else {
      uploadText.textContent = "⬆ Upload Documents";
      uploadBox.style.borderColor = "rgba(0, 0, 0, 0.1)";
      uploadText.style.color = "rgba(0, 0, 0, 0.27)";
    }

    selectedFiles.forEach((file, i) => {
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
        selectedFiles.splice(i, 1);
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
    if (selectedFiles.length === 0) {
      alert("Please upload the required documents before submitting.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    try {
      // Send files to backend for processing
      const response = await fetch("http://localhost:5050/upload", {
        method: "POST",
        body: formData,
      });


      if (response.ok) {
        fileInput.value = "";
        selectedFiles = [];
        updateFileList();

        // Redirect to thank you page
        window.location.href = "thankYouPage.html";
      } else {
        alert("Failed to submit documents.");
      }
    } catch (error) {
      console.error("Error submitting files:", error);
      alert("An error occurred while submitting documents.");
    }
  });

  // Dark mode toggle
  darkToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    updateFileList(); // Refresh colors
  });
});
