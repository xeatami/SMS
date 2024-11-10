package com.studentmanagement.dto;

import com.studentmanagement.entity.Role;
import lombok.Data;

/**
 * DTO для регистрации нового пользователя
 */
@Data
public class RegisterRequestDTO {
    private String username; // Имя пользователя
    private String firstName; // Имя
    private String lastName; // Фамилия
    private Role role; // Роль пользователя
    private String email; // Email
}