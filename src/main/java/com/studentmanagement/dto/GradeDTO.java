package com.studentmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO для оценки
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GradeDTO {
    private Long id; // Идентификатор оценки
    private Double value; // Значение оценки
    private LocalDate date; // Дата оценки
    private Long studentId; // Идентификатор студента
    private Long courseId; // Идентификатор курса
}