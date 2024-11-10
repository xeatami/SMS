package com.studentmanagement.mapper;

import com.studentmanagement.dto.CourseDTO;
import com.studentmanagement.entity.Course;
import org.springframework.stereotype.Component;

/**
 * Маппер для преобразования Course и CourseDTO
 */
@Component
public class CourseMapper {

    public Course toEntity(CourseDTO courseDTO) {
        if (courseDTO == null) {
            return null;
        }

        Course course = new Course();
        course.setId(courseDTO.getId());
        course.setTitle(courseDTO.getTitle());
        course.setDescription(courseDTO.getDescription());
        course.setTeacher(courseDTO.getTeacher());
        return course;
    }

    public CourseDTO toDTO(Course course) {
        if (course == null) {
            return null;
        }

        return new CourseDTO(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getTeacher()
        );
    }
}