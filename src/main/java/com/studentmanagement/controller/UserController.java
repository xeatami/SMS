package com.studentmanagement.controller;

import com.studentmanagement.dto.RegisterRequestDTO;
import com.studentmanagement.dto.UserDTO;
import com.studentmanagement.entity.MyUser;
import com.studentmanagement.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Контроллер для управления пользователями
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/users")
public class UserController {

    private final AdminService adminService;

    /**
     * Получить всех пользователей
     *
     * @return список пользователей
     */
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    /**
     * Создать нового пользователя
     *
     * @param registerRequestDto данные для регистрации
     * @return созданный пользователь
     */
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody RegisterRequestDTO registerRequestDto) {
        try {
            UserDTO newUser = adminService.createUser(registerRequestDto);
            return ResponseEntity.ok(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Обработка ошибок
        }
    }

    /**
     * Обновить пользователя
     *
     * @param id идентификатор пользователя
     * @param user обновленные данные пользователя
     * @return обновленный пользователь
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody MyUser user) {
        try {
            UserDTO updatedUser = adminService.updateUser(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(null); // Пользователь не найден
        }
    }

    /**
     * Удалить пользователя
     *
     * @param id идентификатор пользователя
     * @return ответ без содержимого
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            adminService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(404).build(); // Пользователь не найден
        }
    }
}