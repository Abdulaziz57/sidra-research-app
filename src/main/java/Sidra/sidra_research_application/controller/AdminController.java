package Sidra.sidra_research_application.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/admin")
public class AdminController {

    /**
     * This means the GET request to "/admin" (no trailing slash)
     * will return the "admin" view.
     */
    @GetMapping
    public String adminHome() {
        // Looks for "admin.html" in src/main/resources/templates
        return "adminPage";
    }
}



