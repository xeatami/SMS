package com.studentmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

/**
 * Сущность для оценки
 */
@Data
@NoArgsConstructor
@Entity
@Table(name = "grades")
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double value; // Значение оценки
    private LocalDate date; // Дата оценки

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student; // Студент, которому выставлена оценка

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course; // Курс, к которому относится оценка
}