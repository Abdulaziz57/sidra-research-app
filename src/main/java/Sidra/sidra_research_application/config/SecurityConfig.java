package Sidra.sidra_research_application.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/login", "/css/**").permitAll() // Allow public access
                .requestMatchers("/admin/**").hasAuthority("APPROLE_Admin")
                .requestMatchers("/researcher/**").hasAuthority("APPROLE_Researcher")
                .requestMatchers("/api/applications/my").hasAuthority("APPROLE_Researcher")
                .requestMatchers("/api/applications/submit").hasAuthority("APPROLE_Researcher")
                .requestMatchers("/api/applications/all").hasAuthority("APPROLE_Admin")
                .requestMatchers("/api/applications/*/update").hasAuthority("APPROLE_Admin") // Fixed pattern issue
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
                .loginPage("/login")
                .userInfoEndpoint(userInfo -> userInfo.oidcUserService(oidcUserService()))
                .defaultSuccessUrl("/default", true)
                .successHandler((request, response, authentication) -> {
                    String targetUrl = determineTargetUrl(authentication.getAuthorities());
                    response.sendRedirect(targetUrl);
                })
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=http://localhost:9191/")
                .invalidateHttpSession(true)
                .clearAuthentication(true)
                .deleteCookies("JSESSIONID")
            );

        return http.build();
    }

    private String determineTargetUrl(Collection<? extends GrantedAuthority> authorities) {
        if (authorities.stream().anyMatch(a -> a.getAuthority().equals("APPROLE_Admin"))) {
            return "/admin";
        } else if (authorities.stream().anyMatch(a -> a.getAuthority().equals("APPROLE_Researcher"))) {
            return "/researcher";
        }
        return "/default";
    }

    @Bean
    public OidcUserService oidcUserService() {
        return new OidcUserService() {
            @Override
            public OidcUser loadUser(OidcUserRequest userRequest) {
                OidcUser oidcUser = super.loadUser(userRequest);

                System.out.println("✅ OIDC User Claims: " + oidcUser.getClaims());

                String email = (String) Optional.ofNullable(oidcUser.getAttribute("email")).orElse("Unknown Email");

                List<String> roles = Optional.ofNullable((List<String>) oidcUser.getClaims().get("roles"))
                        .orElse(List.of());

                Collection<GrantedAuthority> mappedAuthorities = roles.stream()
                        .map(role -> new SimpleGrantedAuthority("APPROLE_" + role))
                        .collect(Collectors.toList());

                return new DefaultOidcUser(mappedAuthorities, oidcUser.getIdToken(), oidcUser.getUserInfo());
            }
        };
    }
}
