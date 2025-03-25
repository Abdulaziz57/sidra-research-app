// admin-approved-script.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = 'https://afwwtswpibkgpmnwojtc.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmd3d0c3dwaWJrZ3BtbndvanRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4ODE4MjMsImV4cCI6MjA1ODQ1NzgyM30.Y5-yeOVZ1YAroX5Y8G3tisCy-DCbvIErZ0hrDixgRNs"
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", async function () {
  const backButton = document.querySelector(".nav-item");

  backButton.addEventListener("click", function () {
    window.history.back();
  });

  const tableBody = document.getElementById("applications-table");

  const { data, error } = await supabase
    .from("research_applications")
    .select("*");

  if (error) {
    console.error("Error fetching approved applications:", error);
    tableBody.innerHTML = "<tr><td colspan='5'>Error loading data.</td></tr>";
    return;
  }

  if (!data || data.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='5'>No approved applications found.</td></tr>";
    return;
  }

  data.forEach((app) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${app.id || "-"}</td>
      <td>${app.applicant_name || "-"}</td>
      <td>${app.title || "-"}</td>
      <td>${app.status}</td>
      <td>${app.submitted_at ? new Date(app.submitted_at).toLocaleString() : "-"}</td>
    `;
    tableBody.appendChild(row);
  });
});
