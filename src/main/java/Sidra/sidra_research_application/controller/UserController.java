package Sidra.sidra_research_application.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/email")
    public ResponseEntity<?> getUserEmail(@AuthenticationPrincipal OidcUser oidcUser) {
        if (oidcUser == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }

        String email = oidcUser.getAttribute("email");
        if (email == null) email = oidcUser.getAttribute("preferred_username");
        if (email == null) email = oidcUser.getAttribute("upn");

        if (email == null) {
            return ResponseEntity.status(400).body(Map.of("error", "Email not found"));
        }

        return ResponseEntity.ok(Map.of("email", email));
    }
}
