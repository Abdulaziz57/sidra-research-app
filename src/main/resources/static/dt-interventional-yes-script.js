document.addEventListener("DOMContentLoaded", function () {
    // Get elements
    const fileInput = document.getElementById("fileUpload");
    const uploadBox = document.querySelector(".upload-box");
    const uploadText = document.querySelector(".upload-text");
    const fileListContainer = document.createElement("div"); // Container for selected files
    const backButton = document.querySelector(".back-button");
    const submitButton = document.querySelector(".submit-button");

    let selectedFiles = [];

    // Append file list container below upload box
    fileListContainer.className = "file-list";
    uploadBox.parentNode.insertBefore(fileListContainer, uploadBox.nextSibling);

    // Ensure file input opens only ONCE per click
    uploadBox.addEventListener("click", function (event) {
      event.stopPropagation(); // Stop event from bubbling up
      if (document.activeElement !== fileInput) {
        fileInput.value = ""; // Reset input to allow re-selection
        fileInput.click();
      }
    });

    // Handle file selection
    fileInput.addEventListener("change", function (event) {
      if (!event.target.files.length) return;
    
      const newFiles = Array.from(event.target.files);
      const validExtensions = [".pdf", ".docx"];
      const maxSize = 25 * 1024 * 1024; // 25MB
    
      const filteredFiles = newFiles.filter((file) => {
        const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
        if (!validExtensions.includes(ext)) {
          alert(`"${file.name}" is not a supported file type. Only .pdf and .docx are allowed.`);
          return false;
        }
        if (file.size > maxSize) {
          alert(`"${file.name}" exceeds the 25MB size limit.`);
          return false;
        }
        return true;
      });
    
      selectedFiles = [...selectedFiles, ...filteredFiles].filter(
        (file, index, self) =>
          self.findIndex((f) => f.name === file.name) === index
      );
    
      updateFileList();
    });
    

    // Update file list display
    function updateFileList() {
      fileListContainer.innerHTML = ""; // Clear previous list

      if (selectedFiles.length > 0) {
        uploadText.textContent = `${selectedFiles.length} file(s) selected`;
        uploadBox.style.borderColor = "#036269";
        uploadText.style.color = "#000";

        selectedFiles.forEach((file, index) => {
          const fileItem = document.createElement("div");
          fileItem.className = "file-item";
          fileItem.textContent = file.name;

          // Create remove button
          const removeButton = document.createElement("button");
          removeButton.textContent = "✖";
          removeButton.className = "remove-file";
          removeButton.onclick = function () {
            selectedFiles.splice(index, 1);
            updateFileList();
          };

          fileItem.appendChild(removeButton);
          fileListContainer.appendChild(fileItem);
        });
      } else {
        uploadText.textContent = "⬆ Upload Documents";
        uploadBox.style.borderColor = "rgba(0, 0, 0, 0.1)";
        uploadText.style.color = "rgba(0, 0, 0, 0.27)";
      }
    }

    // Go back button
    backButton.addEventListener("click", function () {
      window.history.back(); // Uses browser history to go back
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
        const response = await fetch("http://localhost:5050/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          fileInput.value = "";
          selectedFiles = [];
          updateFileList(); // Reset UI
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
