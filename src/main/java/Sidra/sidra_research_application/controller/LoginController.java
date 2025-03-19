package Sidra.sidra_research_application.controller;

import Sidra.sidra_research_application.entity.User;
import Sidra.sidra_research_application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @Autowired
    private UserService userService;

    @GetMapping("/login-success")
    public String loginSuccess(@AuthenticationPrincipal OidcUser oidcUser) {
        String email = oidcUser.getEmail();
        String name = oidcUser.getFullName();

        // Save user if they don't exist in PostgreSQL
        if (!userService.existsByEmail(email)) {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(name);
            userService.saveUser(newUser);
        }

        // Redirect based on role
        if (oidcUser.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("APPROLE_Admin"))) {
            return "redirect:/admin";
        } else if (oidcUser.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("APPROLE_Researcher"))) {
            return "redirect:/researcher";
        }

        return "redirect:/";
    }
}
