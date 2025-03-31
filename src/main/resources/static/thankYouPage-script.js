document.addEventListener("DOMContentLoaded", function () {
    const homeButton = document.getElementById("home-button");
  
    homeButton.addEventListener("click", function () {
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
  
      alert(JSON.stringify(allData, null, 2));
  
      // Optionally clear localStorage after confirmation
      localStorage.clear();
  
      // Redirect to home (uncomment this if needed)
      window.location.href = "/researcher";
    });
  });
  