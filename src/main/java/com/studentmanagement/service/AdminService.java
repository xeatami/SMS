package com.studentmanagement.service;

import com.studentmanagement.dto.RegisterRequestDTO;
import com.studentmanagement.dto.UserDTO;
import com.studentmanagement.entity.MyUser;
import com.studentmanagement.mapper.UserMapper;
import com.studentmanagement.repository.MyUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

/**
 * Сервис для управления пользователями
 */
@Service
@RequiredArgsConstructor
public class AdminService {

    private final MyUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final UserMapper userMapper;

    /**
     * Получить всех пользователей
     *
     * @return Список пользователей
     */
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Создать нового пользователя
     *
     * @param registerRequestDto Данные для регистрации
     * @return Созданный пользователь
     */
    @Transactional
    public UserDTO createUser(RegisterRequestDTO registerRequestDto) {
        String generatedPassword = generateRandomPassword();
        MyUser newUser = MyUser.builder()
                .username(registerRequestDto.getUsername())
                .firstName(registerRequestDto.getFirstName())
                .lastName(registerRequestDto.getLastName())
                .email(registerRequestDto.getEmail())
                .role(registerRequestDto.getRole())
                .password(passwordEncoder.encode(generatedPassword))
                .build();

        newUser = userRepository.save(newUser);

        try {
            String emailContent = emailService.buildWelcomeEmail(newUser.getUsername(), generatedPassword);
            emailService.sendEmail(newUser.getEmail(), "Добро пожаловать в нашу систему!", emailContent);
        } catch (Exception e) {
            deleteUser(newUser.getId()); // Удаляем пользователя в случае неудачи
            throw new RuntimeException("Пользователь создан, но отправка письма не удалась. Пользователь был удален.", e);
        }

        return userMapper.toDTO(newUser); // Возвращаем DTO
    }

    /**
     * Обновить пользователя
     *
     * @param id Идентификатор пользователя
     * @param userDetails Данные для обновления
     * @return Обновленный пользователь
     */
    public UserDTO updateUser(Long id, MyUser userDetails) {
        MyUser user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
        user.setUsername(userDetails.getUsername());
        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEmail(userDetails.getEmail());
        user.setRole(userDetails.getRole());
        return userMapper.toDTO(userRepository.save(user));
    }

    /**
     * Удалить пользователя
     *
     * @param id Идентификатор пользователя
     */
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    /**
     * Создать случайный пароль
     *
     * @return Случайный пароль
     */
    private String generateRandomPassword() {
        int length = 8;
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder password = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            password.append(chars.charAt(random.nextInt(chars.length())));
        }
        return password.toString();
    }
}