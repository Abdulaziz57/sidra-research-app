// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  
  // Dictionary of content configurations for different options
  const optionConfigurations = {
    // Option 1: Wrong Department Page - Default
    option1: {
      projectType: "Clinical Registry*",
      notificationText:
        "Your Project does NOT fall under the<br>Research Project Management Office (PMO)",
      instructionText:
        'To <strong>proceed</strong> with your project, please reach out to:<br><em class="contact-email">Clinicalregistry@sidra.org</em>',
      noteText:
        "*NB research registries should follow the research flow with an accompanying research protocol",
      contactEmail: "Clinicalregistry@sidra.org",
    },
  
    // Option 2: Clinical Outcomes Measurement
    option2: {
      projectType: "Clinical Outcomes Measurement*",
      notificationText:
        "Your Project does NOT fall under the<br>Research Project Management Office (PMO)",
      instructionText:
        'To <strong>proceed</strong> with your project, please reach out to:<br><em class="contact-email">ClinicalOutcomes@sidra.org</em>',
      noteText:
        "*NB clinical outcomes measurement should follow the clinical improvement flow",
      contactEmail: "ClinicalOutcomes@sidra.org",
    },
  
    // Option 3: Grant Question
    option3: {
      projectType: "Grant-Related Project*",
      notificationText:
        "Your Project does NOT fall under the<br>Research Project Management Office (PMO) directly",
      instructionText:
        'To <strong>proceed</strong> with your grant-related project, please reach out to:<br><em class="contact-email">Grants@sidra.org</em>',
      noteText:
        "*NB grant-related projects should follow the grant application process",
      contactEmail: "Grants@sidra.org",
    },
  
    // Option 4: Also Grant Question
    option4: {
      projectType: "Grant Application*",
      notificationText:
        "Your Project does NOT fall under the<br>Research Project Management Office (PMO) directly",
      instructionText:
        'To <strong>proceed</strong> with your grant application, please reach out to:<br><em class="contact-email">GrantApplications@sidra.org</em>',
      noteText:
        "*NB grant applications should follow the institutional grant guidelines",
      contactEmail: "GrantApplications@sidra.org",
    },
  
    // Option 5: Also Grant Question
    option5: {
      projectType: "Research Grant*",
      notificationText:
        "Your Project does NOT fall under the<br>Research Project Management Office (PMO) directly",
      instructionText:
        'To <strong>proceed</strong> with your research grant, please reach out to:<br><em class="contact-email">ResearchGrants@sidra.org</em>',
      noteText:
        "*NB research grants should follow the research funding guidelines",
      contactEmail: "ResearchGrants@sidra.org",
    },
  
    // Option 6: Service Effectiveness
    option6: {
      projectType: "Service Effectiveness*",
      notificationText:
        "Your Project does NOT fall under the<br>Research Project Management Office (PMO)",
      instructionText:
        'To <strong>proceed</strong> with your service effectiveness project, please reach out to:<br><em class="contact-email">ServiceEffectiveness@sidra.org</em>',
      noteText:
        "*NB service effectiveness projects should follow the service improvement guidelines",
      contactEmail: "ServiceEffectiveness@sidra.org",
    },
  
    // Option 7: Quality Improvement
    option7: {
      projectType: "Quality Improvement*",
      notificationText:
        "Your Project does NOT fall under the<br>Research Project Management Office (PMO)",
      instructionText:
        'To <strong>proceed</strong> with your quality improvement project, please reach out to:<br><em class="contact-email">QualityImprovement@sidra.org</em>',
      noteText:
        "*NB quality improvement projects should follow the quality improvement guidelines",
      contactEmail: "QualityImprovement@sidra.org",
    },
  
    // Default configuration if no valid option is provided
    default: {
      projectType: "Unspecified Project*",
      notificationText: "Your Project classification is unclear",
      instructionText:
        'To <strong>proceed</strong>, please return to the decision tree and select an appropriate option or contact:<br><em class="contact-email">Research@sidra.org</em>',
      noteText:
        "*NB all projects should follow the appropriate guidelines based on their classification",
      contactEmail: "Research@sidra.org",
    },
  };
  
  // Function to update page content based on selected option
  function updatePageContent(option) {
    // Get the configuration for the selected option or use default if not found
    const config =
      optionConfigurations[option] || optionConfigurations["default"];
  
    // Update the content
    const projectTypeElement = document.getElementById("project-type");
    if (projectTypeElement) {
      projectTypeElement.textContent = config.projectType;
    }
  
    const notificationTextElement = document.getElementById("notification-text");
    if (notificationTextElement) {
      notificationTextElement.innerHTML = config.notificationText;
    }
  
    const instructionTextElement = document.getElementById("instruction-text");
    if (instructionTextElement) {
      instructionTextElement.innerHTML = config.instructionText;
    }
  
    const noteTextElement = document.getElementById("note-text");
    if (noteTextElement) {
      noteTextElement.textContent = config.noteText;
    }
  
    // Update email if there's a specific element for it
    const contactEmailElement = document.getElementById("contact-email");
    if (contactEmailElement) {
      contactEmailElement.textContent = config.contactEmail;
    }
  }
  
  // Set up button event listeners
  function setupButtonListeners() {
    const backButton = document.getElementById("back-button");
    if (backButton) {
      backButton.addEventListener("click", function (e) {
        e.preventDefault();
        window.history.back();
      });
    }
  
    const homeButton = document.getElementById("home-button");
    if (homeButton) {
      homeButton.addEventListener("click", function (e) {
        e.preventDefault();
        // Navigate to the decision tree page
        var loc = window.location.pathname;
        var dir = loc.substring(0, loc.lastIndexOf("/"));
        window.location.href = dir + "/decisionTree.html";
      });
    }
  }
  
  // When the page loads
  window.onload = function () {
    // Get the option from URL parameter
    const selectedOption = getUrlParameter("option");
  
    // Update the page content based on the selected option
    updatePageContent(selectedOption);
  
    // Set up button event listeners
    setupButtonListeners();
  
    // Log for debugging
    console.log("Page loaded with option:", selectedOption);
  };
  