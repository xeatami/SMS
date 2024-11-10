package com.studentmanagement.service;

import com.studentmanagement.dto.UserDTO;
import com.studentmanagement.entity.MyUser;
import com.studentmanagement.mapper.UserMapper;
import com.studentmanagement.repository.MyUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Сервис для управления профилями пользователей
 */
@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final MyUserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    /**
     * Получить профиль пользователя по имени пользователя
     *
     * @param username Имя пользователя
     * @return Профиль пользователя
     */
    public UserDTO getUserProfileByUsername(String username) {
        MyUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
        return userMapper.toDTO(user);
    }

    /**
     * Обновить профиль пользователя по имени пользователя
     *
     * @param username Имя пользователя
     * @param userDTO Данные для обновления профиля
     * @return Обновленный профиль пользователя
     */
    public UserDTO updateUserProfile(String username, UserDTO userDTO) {
        MyUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));

        // Обновление полей профиля
        user.setUsername(userDTO.getUsername());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setRole(userDTO.getRole());

        return userMapper.toDTO(userRepository.save(user));
    }

    /**
     * Изменить пароль пользователя по имени пользователя
     *
     * @param username Имя пользователя
     * @param currentPassword Текущий пароль
     * @param newPassword Новый пароль
     */
    public void changePassword(String username, String currentPassword, String newPassword) {
        MyUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));

        // Проверка текущего пароля
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Неверный текущий пароль");
        }

        // Установка нового пароля и сохранение
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}