import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Supabase setup
const supabaseUrl = 'https://afwwtswpibkgpmnwojtc.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmd3d0c3dwaWJrZ3BtbndvanRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4ODE4MjMsImV4cCI6MjA1ODQ1NzgyM30.Y5-yeOVZ1YAroX5Y8G3tisCy-DCbvIErZ0hrDixgRNs";
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", async function () {
  // Redirects
  const approvedCard = document.querySelector(".approved-applications-card");
  const rejectedCard = document.querySelector(".rejected-applications-card");
  const pendingCard = document.querySelector(".new-applications-card");
  const totalCard = document.querySelector(".total-applications-card");

  if (approvedCard) approvedCard.addEventListener("click", () => window.location.href = "/admin-approved.html");
  if (rejectedCard) rejectedCard.addEventListener("click", () => window.location.href = "/admin-rejected.html");
  if (pendingCard) pendingCard.addEventListener("click", () => window.location.href = "/admin-pending.html");
  if (totalCard) totalCard.addEventListener("click", () => window.location.href = "/admin-all.html");

  // Fetch application counts
  const { data, error } = await supabase.from("research_applications").select("status");

  if (error) {
    console.error("Error fetching application statuses:", error);
    return;
  }

  const counts = {
    APPROVED: 0,
    PENDING: 0,
    REJECTED: 0,
  };

  data.forEach(app => {
    if (counts[app.status] !== undefined) {
      counts[app.status]++;
    }
  });

  // Display the counts
  document.querySelector(".approved-applications-card .stat-number").textContent = counts.APPROVED;
  document.querySelector(".rejected-applications-card .stat-number").textContent = counts.REJECTED;
  document.querySelector(".new-applications-card .stat-number").textContent = counts.PENDING;
  document.querySelector(".total-applications-card .stat-number").textContent =
    counts.APPROVED + counts.REJECTED + counts.PENDING;
});
