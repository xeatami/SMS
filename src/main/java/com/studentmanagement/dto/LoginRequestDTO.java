package com.studentmanagement.dto;

import lombok.Data;

/**
 * DTO для запроса логина
 */
@Data
public class LoginRequestDTO {
    private String username; // Имя пользователя
    private String password; // Пароль
}