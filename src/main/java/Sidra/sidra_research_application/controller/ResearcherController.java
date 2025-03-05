package Sidra.sidra_research_application.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/researcher")
public class ResearcherController {

    @GetMapping("")
    public String showResearcherPage() {
        // Return the view name "researcherPage", which corresponds
        // to researcherPage.html in /templates
        return "researcherPage";
    }
}
