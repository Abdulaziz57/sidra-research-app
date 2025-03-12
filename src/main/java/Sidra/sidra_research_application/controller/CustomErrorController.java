package Sidra.sidra_research_application.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import jakarta.servlet.http.HttpServletRequest;

@Controller
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public String handleError(HttpServletRequest request) {
        Integer statusCode = (Integer) request.getAttribute("jakarta.servlet.error.status_code");

        System.out.println("Custom Error Controller Triggered: Status Code = " + statusCode);

        if (statusCode != null && statusCode == 404) {
            return "error/404"; // Should match `src/main/resources/templates/error/404.html`
        }
        return "error/generic"; // A fallback error page
    }

    public String getErrorPath() {
        return "/error";
    }
}
