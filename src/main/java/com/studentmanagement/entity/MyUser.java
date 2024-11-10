package com.studentmanagement.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

/**
 * Сущность для пользователя
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Идентификатор

    @Column(nullable = false, unique = true)
    private String username; // Имя пользователя

    @Column(nullable = false)
    private String password; // Пароль

    @Column(nullable = false)
    private String firstName; // Имя

    @Column(nullable = false)
    private String lastName; // Фамилия

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role; // Роль пользователя

    @Column(nullable = false, unique = true)
    private String email; // Email
}