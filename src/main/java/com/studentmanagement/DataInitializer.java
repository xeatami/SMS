package com.studentmanagement;

import com.studentmanagement.entity.MyUser;
import com.studentmanagement.entity.Role;
import com.studentmanagement.repository.MyUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Инициализатор данных для заполнения базы данных начальными данными
 */
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final MyUserRepository userRepository; // Репозиторий для работы с пользователями
    private final BCryptPasswordEncoder passwordEncoder; // Кодировщик паролей

    /**
     * Метод, который выполняется при запуске приложения
     *
     * @param args Аргументы командной строки
     */
    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) { // Проверяем, есть ли пользователи в базе данных
            MyUser adminUser = MyUser.builder()
                    .username("admin") // Имя пользователя
                    .password(passwordEncoder.encode("root")) // Закодированный пароль
                    .firstName("Admin") // Имя
                    .lastName("User") // Фамилия
                    .role(Role.ADMIN) // Роль пользователя
                    .email("admin@example.com") // Email
                    .build();
            userRepository.save(adminUser); // Сохраняем пользователя в базе данных
        }
    }
}