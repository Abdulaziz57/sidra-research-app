package Sidra.sidra_research_application.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class DecisionTreeController {

    @GetMapping("/decisionTree")
    public String showDecisionTree() {
        return "decisionTree"; // Matches `src/main/resources/templates/decisionTree.html` if using Thymeleaf
    }
}