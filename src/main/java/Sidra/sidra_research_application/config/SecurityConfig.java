package Sidra.sidra_research_application.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/", "/index.html", "/css/**").permitAll()
                .requestMatchers("/admin/**").hasAuthority("APPROLE_Admin")
                .requestMatchers("/researcher/**").hasAuthority("APPROLE_Researcher")
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo
                    // Call the custom OidcUserService method defined below
                    .oidcUserService(oidcUserService())
                )
                .successHandler((request, response, authentication) -> {
                    // Example of a role-based redirect:
                    if (authentication.getAuthorities().stream()
                            .anyMatch(a -> a.getAuthority().equals("APPROLE_Admin"))) {
                        response.sendRedirect("/admin");
                    } else if (authentication.getAuthorities().stream()
                            .anyMatch(a -> a.getAuthority().equals("APPROLE_Researcher"))) {
                        response.sendRedirect("/researcher");
                    } else {
                        response.sendRedirect("/");
                    }
                })
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
            );
        return http.build();
    }

    /**
     * A private helper method that returns a custom OIDC UserService,
     * which maps Azure Entra roles to Spring authorities.
     */
    private OidcUserService oidcUserService() {
        return new OidcUserService() {
            @Override
            public OidcUser loadUser(OidcUserRequest userRequest) {
                // Load the user from the default implementation first
                OidcUser oidcUser = super.loadUser(userRequest);

                // Extract roles from the "roles" claim
                List<String> roles = oidcUser.getClaims().containsKey("roles")
                        ? (List<String>) oidcUser.getClaims().get("roles")
                        : List.of();

                // Prefix them with "APPROLE_" so we can do .hasAuthority("APPROLE_Admin") etc.
                Collection<GrantedAuthority> mappedAuthorities = roles.stream()
                        .map(role -> new SimpleGrantedAuthority("APPROLE_" + role))
                        .collect(Collectors.toList());

                // Return a DefaultOidcUser with the new authorities
                return new DefaultOidcUser(mappedAuthorities, oidcUser.getIdToken(), oidcUser.getUserInfo());
            }
        };
    }
}

