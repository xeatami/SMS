package com.studentmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * Сущность курса
 */
@Data
@NoArgsConstructor
@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String title; // Название курса

    @Column(length = 4096)
    private String description; // Описание курса

    private String teacher; // Преподаватель

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Grade> grades = new HashSet<>();

    @ManyToMany(mappedBy = "courses")
    private Set<Student> students = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Course course)) return false;
        return Objects.equals(id, course.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}