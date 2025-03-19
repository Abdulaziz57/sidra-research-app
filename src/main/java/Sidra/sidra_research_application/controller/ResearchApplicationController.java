package Sidra.sidra_research_application.controller;

import Sidra.sidra_research_application.entity.ResearchApplication;
import Sidra.sidra_research_application.entity.User;
import Sidra.sidra_research_application.repository.ResearchApplicationRepository;
import Sidra.sidra_research_application.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/applications")
public class ResearchApplicationController {

    private final ResearchApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    public ResearchApplicationController(ResearchApplicationRepository applicationRepository, UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/debug")
    public ResponseEntity<?> debugUser(@AuthenticationPrincipal OidcUser oidcUser) {
        return ResponseEntity.ok(Map.of(
            "email", oidcUser.getEmail(),
            "authorities", oidcUser.getAuthorities()
        ));
    }


    /**
     * Fetch applications for the logged-in user (Researcher).
     */
    @GetMapping("/my")
    public ResponseEntity<List<ResearchApplication>> getUserApplications(@AuthenticationPrincipal OidcUser oidcUser) {
        if (oidcUser == null) {
            System.out.println("❌ User is not authenticated!");
            return ResponseEntity.status(401).build();
        }

        System.out.println("✅ OIDC User Attributes: " + oidcUser.getAttributes());

        // Try different ways to extract the email
        String email = oidcUser.getAttribute("email"); // Default email claim
        if (email == null) {
            email = oidcUser.getAttribute("preferred_username"); // Sometimes it's stored under this key
        }
        if (email == null) {
            email = oidcUser.getAttribute("upn"); // Azure-specific User Principal Name
        }

        if (email == null) {
            System.out.println("❌ No email found in OIDC user attributes!");
            return ResponseEntity.status(400).body(null);
        }

        System.out.println("✅ Authenticated User Email: " + email);

        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            System.out.println("❌ No user found for email: " + email);
            return ResponseEntity.status(404).body(null);
        }

        List<ResearchApplication> applications = applicationRepository.findByUserId(user.get().getId());
        System.out.println("✅ Found " + applications.size() + " applications for user: " + email);
        return ResponseEntity.ok(applications);
    }



    /**
     * Allow a Researcher to submit a new application.
     */
    @PostMapping("/submit")
    public ResponseEntity<ResearchApplication> submitApplication(@AuthenticationPrincipal OidcUser oidcUser) {
        String email = oidcUser.getEmail();
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty() || !user.get().getRole().equals("Researcher")) {
            return ResponseEntity.status(403).build();
        }

        ResearchApplication application = new ResearchApplication(user.get(), ResearchApplication.Status.PENDING);
        ResearchApplication savedApplication = applicationRepository.save(application);

        return ResponseEntity.ok(savedApplication);
    }

    /**
     * Fetch all applications (Admins only).
     */
    @GetMapping("/all")
    public ResponseEntity<List<ResearchApplication>> getAllApplications(@AuthenticationPrincipal OidcUser oidcUser) {
        String email = oidcUser.getEmail();
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty() || !user.get().getRole().equals("Admin")) {
            return ResponseEntity.status(403).build();
        }

        return ResponseEntity.ok(applicationRepository.findAll());
    }

    /**
     * Allow Admins to update the status of an application.
     */
    @PutMapping("/{id}/update")
    public ResponseEntity<ResearchApplication> updateApplicationStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @AuthenticationPrincipal OidcUser oidcUser) {

        String email = oidcUser.getEmail();
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty() || !user.get().getRole().equals("Admin")) {
            return ResponseEntity.status(403).build();
        }

        Optional<ResearchApplication> applicationOpt = applicationRepository.findById(id);
        if (applicationOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        ResearchApplication application = applicationOpt.get();
        try {
            ResearchApplication.Status newStatus = ResearchApplication.Status.valueOf(status.toUpperCase());
            application.setStatus(newStatus);
            applicationRepository.save(application);
            return ResponseEntity.ok(application);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
