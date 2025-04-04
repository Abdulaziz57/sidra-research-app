document.addEventListener("DOMContentLoaded", function () {
    // Click handlers for each card
    const approvedCard = document.querySelector(".approved-applications-card");
    const rejectedCard = document.querySelector(".rejected-applications-card");
    const pendingCard = document.querySelector(".new-applications-card");
  
    if (approvedCard) {
      approvedCard.addEventListener("click", function () {
        window.location.href = "/admin-approved.html";
      });
    }
  
    if (rejectedCard) {
      rejectedCard.addEventListener("click", function () {
        window.location.href = "/admin-rejected.html";
      });
    }
  
    if (pendingCard) {
      pendingCard.addEventListener("click", function () {
        window.location.href = "/admin-pending.html";
      });
    }
  });
  