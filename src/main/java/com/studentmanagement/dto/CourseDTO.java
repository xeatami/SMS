package com.studentmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO для курса
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseDTO {
    private Long id; // Идентификатор курса
    private String title; // Название курса
    private String description; // Описание курса
    private String teacher; // Преподаватель
}