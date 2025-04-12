document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-application");

    if (!startButton) {
        console.error("❌ Start New Application button not found!");
        return;
    }

    startButton.addEventListener("click", function () {
        console.log("✅ Redirecting to Decision Tree...");

        // Change this URL if the file is in a different folder
        window.location.href = "/decisionTree.html";
    });
});
