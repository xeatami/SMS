package com.studentmanagement.dto;

import lombok.Data;

/**
 * DTO для запроса изменения пароля
 */
@Data
public class ChangePasswordRequest {
    private String currentPassword; // Текущий пароль
    private String newPassword; // Новый пароль
}