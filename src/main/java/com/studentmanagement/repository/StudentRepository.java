package com.studentmanagement.repository;

import com.studentmanagement.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Репозиторий для работы со студентами
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}