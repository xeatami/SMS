package com.studentmanagement.repository;

import com.studentmanagement.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Репозиторий для работы с оценками
 */
@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {
    List<Grade> findByStudentId(Long studentId); // Найти оценки по идентификатору студента
    List<Grade> findByCourseId(Long courseId); // Найти оценки по идентификатору курса
}