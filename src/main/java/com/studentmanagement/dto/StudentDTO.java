package com.studentmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

/**
 * DTO для студента
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {
    private Long id; // Идентификатор студента
    private String firstName; // Имя студента
    private String lastName; // Фамилия студента
    private LocalDate birthDate; // Дата рождения
    private String email; // Email студента
    private Set<CourseDTO> courses; // Курсы, назначенные студенту
}