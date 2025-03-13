package Sidra.sidra_research_application.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.ui.Model;

@Controller
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public String handleError(HttpServletRequest request, Model model) {
        Integer statusCode = (Integer) request.getAttribute("jakarta.servlet.error.status_code");

        System.out.println("Custom Error Controller Triggered: Status Code = " + statusCode);

        if (statusCode != null && statusCode == 404) {
            return determine404Page();
        }
        return "error/generic"; // A fallback error page for other errors
    }

    /**
     * Determines the correct 404 page based on user roles.
     */
    private String determine404Page() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && auth.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("APPROLE_Researcher"))) {
            return "error/404-researcher"; // Researcher-specific 404 page
        }

        if (auth != null && auth.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("APPROLE_Admin"))) {
            return "error/404-admin"; // Admin-specific 404 page
        }

        return "error/404"; // Default 404 page for guests or unknown roles
    }

    public String getErrorPath() {
        return "/error";
    }
}
