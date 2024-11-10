package com.studentmanagement.repository;


import com.studentmanagement.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Репозиторий для работы с курсами
 */
@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
}
