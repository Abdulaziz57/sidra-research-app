package Sidra.sidra_research_application.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AuthController {

    @GetMapping("/api/user-info")
    public Map<String, String> getUserInfo(@AuthenticationPrincipal OidcUser oidcUser) {
        if (oidcUser == null || oidcUser.getEmail() == null) {
            throw new RuntimeException("User email not found. Please log in again.");
        }
        return Map.of("email", oidcUser.getEmail());
    }
}
