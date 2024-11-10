package com.studentmanagement.controller;

import com.studentmanagement.dto.ChangePasswordRequest;
import com.studentmanagement.dto.UserDTO;
import com.studentmanagement.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * Контроллер для управления профилем пользователя
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/profile")
public class UserProfileController {

    private final UserProfileService userProfileService;

    /**
     * Получение профиля пользователя
     *
     * @param authentication Аутентификация текущего пользователя
     * @return Профиль пользователя
     */
    @GetMapping
    public ResponseEntity<UserDTO> getUserProfile(Authentication authentication) {
        String currentUsername = authentication.getName();
        UserDTO userProfile = userProfileService.getUserProfileByUsername(currentUsername);
        return ResponseEntity.ok(userProfile);
    }

    /**
     * Обновление профиля пользователя
     *
     * @param userDTO Данные пользователя для обновления
     * @param authentication Аутентификация текущего пользователя
     * @return Обновленный профиль пользователя
     */
    @PutMapping
    public ResponseEntity<UserDTO> updateUserProfile(@RequestBody UserDTO userDTO, Authentication authentication) {
        String currentUsername = authentication.getName();

        if (!currentUsername.equals(userProfileService.getUserProfileByUsername(currentUsername).getUsername())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null); // Запрещаем доступ к профилю другого пользователя
        }

        UserDTO updatedUser = userProfileService.updateUserProfile(currentUsername, userDTO);
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * Изменение пароля пользователя
     *
     * @param changePasswordRequest Запрос на изменение пароля
     * @param authentication Аутентификация текущего пользователя
     * @return Ответ без содержимого
     */
    @PutMapping("/password")
    public ResponseEntity<Void> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest, Authentication authentication) {
        String currentUsername = authentication.getName();
        userProfileService.changePassword(currentUsername, changePasswordRequest.getCurrentPassword(), changePasswordRequest.getNewPassword());
        return ResponseEntity.ok().build();
    }
}