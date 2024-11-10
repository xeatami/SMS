package com.studentmanagement.dto;

import com.studentmanagement.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO для пользователя
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id; // Идентификатор пользователя
    private String username; // Имя пользователя
    private String firstName; // Имя
    private String lastName; // Фамилия
    private String email; // Email
    private Role role; // Роль пользователя
}