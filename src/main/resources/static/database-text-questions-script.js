document.addEventListener("DOMContentLoaded", function () {
  const backButton = document.getElementById("backButton");
  const submitButton = document.getElementById("submitButton");

  const question1 = document.getElementById("question1");
  const question2 = document.getElementById("question2");
  const question3 = document.getElementById("question3");

  const loc = window.location.pathname;
  const dir = loc.substring(0, loc.lastIndexOf("/"));

  backButton.addEventListener("click", function () {
    localStorage.setItem("question1", null);
    localStorage.setItem("question2", null);
    localStorage.setItem("question3", null);
    window.location.href = dir + "/decisionTree.html";
  });

  submitButton.addEventListener("click", function () {
    const q1 = question1.value.trim();
    const q2 = question2.value.trim();
    const q3 = question3.value.trim();

    if (!q1 || !q2 || !q3) {
      alert("Please fill in all fields before continuing.");
      return;
    }

    // ✅ Save to localStorage
    localStorage.setItem("question1", q1);
    localStorage.setItem("question2", q2);
    localStorage.setItem("question3", q3);

    // ✅ Navigate to next step
    window.location.href = dir + "grant-question.html";
  });
});
