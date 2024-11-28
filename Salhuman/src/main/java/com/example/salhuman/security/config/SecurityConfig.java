package com.example.salhuman.security.config;


import com.example.salhuman.security.services.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    private JWTAuthFilter jwtAuthFilter;

    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(request-> request.requestMatchers("/auth/**", "/public/**").permitAll()
                        .requestMatchers("/admin/**").hasAnyAuthority("ADMIN","MANAGER")
                        .requestMatchers("/user/**").hasAnyAuthority("USER")
                        .requestMatchers("/adminuser/**").hasAnyAuthority("ADMIN", "USER")
                        .requestMatchers("/manager/**").hasAnyAuthority("MANAGER")
                        .anyRequest().authenticated())
                .sessionManagement(manager->manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider()).addFilterBefore(
                        jwtAuthFilter, UsernamePasswordAuthenticationFilter.class
                );
        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(customUserDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

//    @Bean
//    public UserDetailsService users() {
//        UserDetails user = User.builder()
//                .username("user")
//                .password(passwordEncoder.encode("123"))
//                .roles("USER")
//                .build();
//        UserDetails admin = User.builder()
//                .username("admin")
//                .password(passwordEncoder.encode("123"))
//                .roles("USER", "ADMIN")
//                .build();
//        UserDetails employe = User.builder()
//                .username("employe")
//                .password(passwordEncoder.encode("123"))
//                .roles("USER")
//                .build();
//        UserDetails rh = User.builder()
//                .username("rh")
//                .password(passwordEncoder.encode("123"))
//                .roles("RH")
//                .build();
//        UserDetails manager = User.builder()
//                .username("manager")
//                .password(passwordEncoder.encode("123"))
//                .roles("MANAGER")
//                .build();
//        return new InMemoryUserDetailsManager(user, admin,employe,rh,manager);
//    }
}
