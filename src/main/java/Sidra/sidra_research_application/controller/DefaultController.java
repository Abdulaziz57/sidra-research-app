package Sidra.sidra_research_application.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DefaultController {

    @GetMapping("/default")
    public String defaultPage() {
        return "default"; // Ensure this corresponds to a valid Thymeleaf HTML or other view.
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login"; // Ensure this is a valid view for the login page.
    }
}
