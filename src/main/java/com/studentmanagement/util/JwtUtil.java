package com.studentmanagement.util;

import com.studentmanagement.service.Impl.UserServiceImpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * Утилита для работы с JWT
 */
@Component
public class JwtUtil {
    @Value("${secret_key}")
    private String jwtKey; // Секретный ключ для подписи токена
    @Value("${lifetime}")
    private int lifetime; // Время жизни токена в миллисекундах

    /**
     * Генерация JWT-токена
     *
     * @param auth Аутентификация пользователя
     * @return Сгенерированный токен
     */
    public String generateToken(Authentication auth) {
        UserServiceImpl userDetails = (UserServiceImpl) auth.getPrincipal();
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("role", userDetails.getRole().name())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + lifetime))
                .signWith(SignatureAlgorithm.HS256, jwtKey)
                .compact();
    }

    /**
     * Получение имени пользователя из токена
     *
     * @param token JWT-токен
     * @return Имя пользователя или null, если токен недействителен
     */
    public String getNameFromToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(jwtKey)
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (Exception e) {
            System.err.println("Invalid token: " + e.getMessage());
            return null;
        }
    }
}