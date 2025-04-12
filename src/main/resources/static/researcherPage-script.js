import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = 'https://afwwtswpibkgpmnwojtc.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmd3d0c3dwaWJrZ3BtbndvanRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4ODE4MjMsImV4cCI6MjA1ODQ1NzgyM30.Y5-yeOVZ1YAroX5Y8G3tisCy-DCbvIErZ0hrDixgRNs";
const supabase = createClient(supabaseUrl, supabaseKey);

// Get user email from Spring Boot backend
async function getUserEmail() {
  const res = await fetch("/api/user/email");
  const data = await res.json();
  return data.email;
}

// Fetch user's applications
async function fetchApplications(email) {
  const { data, error } = await supabase
    .from("research_applications")
    .select("*")
    .eq("user_email", email);

  if (error) {
    console.error("❌ Failed to fetch applications:", error);
    return [];
  }
  return data;
}

// Render application cards
function renderApplications(apps) {
  const container = document.getElementById("applications-container");
  container.innerHTML = "";

  if (apps.length === 0) {
    container.innerHTML = "<p>No applications found.</p>";
    return;
  }

  apps.forEach((app) => {
    const card = document.createElement("div");
    card.className = "app-card";

    const submittedAt = app.submitted_at
      ? new Date(app.submitted_at).toLocaleDateString()
      : "N/A";

    const statusClass = app.status?.toLowerCase() || "pending";

    card.innerHTML = `
      <div>
        <h4>${app.Project_name || "Untitled Project"}</h4>
        <p>Submitted on: ${submittedAt}</p>
      </div>
      <span class="status ${statusClass}">${app.status}</span>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const button = document.getElementById("start-application");
  button.addEventListener("click", () => {
    window.location.href = "/decisionTree.html";
  });

  try {
    const email = await getUserEmail();
    const apps = await fetchApplications(email);
    renderApplications(apps);
  } catch (err) {
    alert("⚠️ Failed to load dashboard. Please login again.");
  }
});

document.getElementById("refresh-btn").addEventListener("click", () => window.location.reload());

