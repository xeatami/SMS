package com.studentmanagement.config;

import com.studentmanagement.entity.Role;
import com.studentmanagement.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Конфигурация безопасности для приложения
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter; // Фильтр для аутентификации JWT
    private final UserService userService; // Сервис для работы с пользователями

    /**
     * Кодировщик паролей
     *
     * @return Кодировщик паролей
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // BCrypt для кодирования паролей
    }

    /**
     * Менеджер аутентификации
     *
     * @param http HTTP безопасность
     * @return Менеджер аутентификации
     * @throws Exception Возможные ошибки конфигурации
     */
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(userService).passwordEncoder(passwordEncoder());
        return authenticationManagerBuilder.build();
    }

    /**
     * Конфигурация фильтров безопасности
     *
     * @param http HTTP безопасность
     * @return Фильтр безопасности
     * @throws Exception Возможные ошибки конфигурации
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // Отключение CSRF
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(new Http403ForbiddenEntryPoint()))
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(req -> req
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS).permitAll() // Разрешаем запросы OPTIONS тк в WebConfig не работает =/
                        .requestMatchers("/admin/**").hasRole(Role.ADMIN.name()) // Доступ к админским эндпоинтам только для админов
                        .anyRequest().authenticated())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // Фильтр JWT

        return http.build();
    }
}