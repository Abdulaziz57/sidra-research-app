import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = 'https://afwwtswpibkgpmnwojtc.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmd3d0c3dwaWJrZ3BtbndvanRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4ODE4MjMsImV4cCI6MjA1ODQ1NzgyM30.Y5-yeOVZ1YAroX5Y8G3tisCy-DCbvIErZ0hrDixgRNs";
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", async function () {
  const backButton = document.querySelector(".back-button");
  if (backButton) {
    backButton.addEventListener("click", () => window.history.back());
  }
  document.getElementById("refresh-btn").addEventListener("click", () => window.location.reload());

  const tableHeader = document.getElementById("applications-header");
  const tableBody = document.getElementById("applications-table");

  const { data, error } = await supabase.from("research_applications").select("*");

  if (error || !data) {
    tableBody.innerHTML = "<tr><td colspan='100%'>Error loading data.</td></tr>";
    console.error("Fetch Error:", error);
    return;
  }

  if (data.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='100%'>No applications found.</td></tr>";
    return;
  }

  // Dynamically generate headers
  const keys = Object.keys(data[0]);
  const headerRow = document.createElement("tr");
  keys.forEach(key => {
    const th = document.createElement("th");
    th.textContent = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");
    headerRow.appendChild(th);
  });
  tableHeader.appendChild(headerRow);

  // Rows
  data.forEach((app) => {
    const row = document.createElement("tr");

    keys.forEach(key => {
      const cell = document.createElement("td");

      if (key === "status") {
        const statusOptions = ["APPROVED", "PENDING", "REJECTED"];
        const dropdown = document.createElement("select");
        dropdown.classList.add("status-dropdown");

        statusOptions.forEach((opt) => {
          const option = document.createElement("option");
          option.value = opt;
          option.textContent = opt;
          if (app.status === opt) option.selected = true;
          dropdown.appendChild(option);
        });

        dropdown.addEventListener("change", async () => {
          const { error: updateError } = await supabase
            .from("research_applications")
            .update({ status: dropdown.value })
            .eq("id", app.id);

          if (updateError) {
            alert("Failed to update status.");
            console.error(updateError);
          } else {
            alert("Status updated.");
          }
        });

        cell.appendChild(dropdown);
      } else {
        const value = app[key];
        cell.textContent = value instanceof Date
          ? new Date(value).toLocaleString()
          : value || "-";
      }

      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
});
