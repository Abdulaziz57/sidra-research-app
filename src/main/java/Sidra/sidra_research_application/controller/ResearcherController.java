package Sidra.sidra_research_application.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/researcher")
@PreAuthorize("hasAuthority('APPROLE_Researcher')") 
public class ResearcherController {

    @GetMapping("")
    public String researcherHome() {
        return "researcherPage";
    }
}

