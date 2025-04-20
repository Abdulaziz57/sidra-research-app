import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = 'https://afwwtswpibkgpmnwojtc.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmd3d0c3dwaWJrZ3BtbndvanRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4ODE4MjMsImV4cCI6MjA1ODQ1NzgyM30.Y5-yeOVZ1YAroX5Y8G3tisCy-DCbvIErZ0hrDixgRNs";
const supabase = createClient(supabaseUrl, supabaseKey);

let submissionSuccessful = false;

async function getUserEmailFromBackend() {
  try {
    const response = await fetch("/api/user/email");
    if (!response.ok) throw new Error("Could not retrieve user info.");

    const result = await response.json();
    if (!result.email) throw new Error("User email not found.");

    return result.email;
  } catch (err) {
    alert("⚠️ Error: " + err.message + " Please log in again.");
    throw err;
  }
}



document.addEventListener("DOMContentLoaded", async function () {


async function getUserEmailFromBackend() {
  try {
    const response = await fetch("/api/user/email");
    if (!response.ok) throw new Error("Could not retrieve user info.");

    const result = await response.json();
    if (!result.email) throw new Error("User email not found.");

    return result.email;
  } catch (err) {
    alert("⚠️ Error: " + err.message + " Please log in again.");
    throw err;
  }
}

  const homeButton = document.getElementById("home-button");



  // Collect all form-related data from localStorage
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

  // Build decisionFlow string
  const decisionFlow =
    `DT: ${allData.dt} --> ` +
    `Grant: ${allData.grant} --> ` +
    `GrantNo: ${allData.grantNo} --> ` +
    `GrantNoYes: ${allData.grantNoYes} --> ` +
    `GrantNoNo: ${allData.grantNoNo}`;


    const email = await getUserEmailFromBackend();
    const now = new Date();
    const submitted_at = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')},${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;


    // Construct the record
    const newRecord = {
      status: "PENDING",
      user_email: email,
      LPI_name: localStorage.getItem("LPI_name") || allData.question1,
      Project_name: localStorage.getItem("Project_name") || allData.question2,
      Project_type: localStorage.getItem("Project_type") || decisionFlow,
      Department: localStorage.getItem("Department") || allData.question3,
      submitted_at: submitted_at,
    };
    console.log("New Record:", newRecord);

  // Attempt to insert the record
  const { data, error } = await supabase
    .from("research_applications")
    .insert([newRecord]);

  if (error) {
    alert("❌ Error submitting application: " + error.message);
    console.error(error);
  } else {
    submissionSuccessful = true;
    localStorage.clear();
  }

  // Navigation waits for Home button click
  homeButton.addEventListener("click", function () {
    if (submissionSuccessful) {
      window.location.href = "/researcher";
    } else {
      alert("⚠️ Submission was not successful. Please try again.");
    }
  });
});
