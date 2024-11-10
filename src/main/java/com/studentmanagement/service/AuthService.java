package com.studentmanagement.service;

import com.studentmanagement.dto.LoginRequestDTO;
import com.studentmanagement.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Сервис для аутентификации
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    /**
     * Логин с проверкой учетных данных
     *
     * @param loginRequestDto данные для входа
     * @return ResponseEntity с JWT токеном или сообщением об ошибке
     */
    public ResponseEntity<String> login(LoginRequestDTO loginRequestDto) {
        try {
            UsernamePasswordAuthenticationToken authRequest =
                    new UsernamePasswordAuthenticationToken(loginRequestDto.getUsername(), loginRequestDto.getPassword());

            Authentication authentication = authenticationManager.authenticate(authRequest);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtUtil.generateToken(authentication);

            return ResponseEntity.ok(token);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Пользователь не найден");
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Неверные учетные данные");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка на сервере");
        }
    }
}