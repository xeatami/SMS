package com.studentmanagement.controller;

import com.studentmanagement.dto.LoginRequestDTO;
import com.studentmanagement.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Контроллер для аутентификации пользователей
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    /**
     * Логин пользователя
     *
     * @param loginRequestDto данные для входа
     * @return ResponseEntity с JWT токеном при успешной аутентификации
     */
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO loginRequestDto) {
        return authService.login(loginRequestDto);
    }
}