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

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.ignoringRequestMatchers("/logout"))
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/login", "/css/**").permitAll()
                .requestMatchers("/admin/**").hasAuthority("APPROLE_Admin")
                .requestMatchers("/researcher/**").hasAuthority("APPROLE_Researcher")
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
                .loginPage("/login")
                .userInfoEndpoint(userInfo -> userInfo.oidcUserService(oidcUserService()))
                .successHandler((request, response, authentication) -> {
                    String targetUrl = "/login";
                    if (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("APPROLE_Admin"))) {
                        targetUrl = "/admin";
                    } else if (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("APPROLE_Researcher"))) {
                        targetUrl = "/researcher";
                    }
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

    @Bean
    public OidcUserService oidcUserService() {
        return new OidcUserService() {
            @Override
            public OidcUser loadUser(OidcUserRequest userRequest) {
                OidcUser oidcUser = super.loadUser(userRequest);

                // Extract roles from the "roles" claim
                List<String> roles = oidcUser.getClaims().containsKey("roles")
                        ? (List<String>) oidcUser.getClaims().get("roles")
                        : List.of();

                // Map roles to authorities
                Collection<GrantedAuthority> mappedAuthorities = roles.stream()
                        .map(role -> new SimpleGrantedAuthority("APPROLE_" + role))
                        .collect(Collectors.toList());

                return new DefaultOidcUser(mappedAuthorities, oidcUser.getIdToken(), oidcUser.getUserInfo());
            }
        };
    }
}

