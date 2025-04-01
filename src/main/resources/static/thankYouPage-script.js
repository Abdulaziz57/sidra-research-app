import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = 'https://afwwtswpibkgpmnwojtc.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmd3d0c3dwaWJrZ3BtbndvanRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4ODE4MjMsImV4cCI6MjA1ODQ1NzgyM30.Y5-yeOVZ1YAroX5Y8G3tisCy-DCbvIErZ0hrDixgRNs";
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", function () {
  const homeButton = document.getElementById("home-button");

  homeButton.addEventListener("click", async function () {
    const allData = {
      grantSubmission: localStorage.getItem("grantSubmission"),
      question1: localStorage.getItem("question1"),
      question2: localStorage.getItem("question2"),
      question3: localStorage.getItem("question3"),
      dt: localStorage.getItem("dt-question-selection"),
      grant: localStorage.getItem("grant-question-selection"),
      grantNo: localStorage.getItem("grant-no-selection"),
      grantNoYes: localStorage.getItem("grant-no-yes-selection"),
      grantNoNo: localStorage.getItem("grant-no-no-selection"),
    };
    const decisionFlow = 
    `DT: ${localStorage.getItem("dt-question-selection")} --> ` +
    `Grant: ${localStorage.getItem("grant-question-selection")} --> ` +
    `GrantNo: ${localStorage.getItem("grant-no-selection")} --> ` +
    `GrantNoYes: ${localStorage.getItem("grant-no-yes-selection")} --> ` +
    `GrantNoNo: ${localStorage.getItem("grant-no-no-selection")}`;

    // 🔁 Example mapping (customize based on actual logic)
    const newRecord = {
      status: "PENDING", // default on submit
      user_email: localStorage.getItem("user_email") || "test@example.com",
      LPI_name: localStorage.getItem("LPI_name") || allData.question1,
      Project_name: localStorage.getItem("Project_name") || allData.question2,
      Project_type: localStorage.getItem("Project_type") || decisionFlow,
      Department: localStorage.getItem("Department") || allData.question3,
      submitted_at: new Date().toISOString(),
    };

    // 📤 Insert to Supabase
    const { data, error } = await supabase
      .from("research_applications")
      .insert([newRecord]);

    if (error) {
      alert("❌ Error submitting application: " + error.message);
      console.error(error);
      return;
    }
    localStorage.clear();
    window.location.href = "/researcher"; // Redirect to home
  });
});
