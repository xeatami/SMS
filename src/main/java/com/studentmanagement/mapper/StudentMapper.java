package com.studentmanagement.mapper;

import com.studentmanagement.dto.CourseDTO;
import com.studentmanagement.dto.StudentDTO;
import com.studentmanagement.entity.Student;
import com.studentmanagement.entity.Course;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

/**
 * Маппер для преобразования Student и StudentDTO
 */
@Component
public class StudentMapper {

    public Student toEntity(StudentDTO studentDTO) {
        if (studentDTO == null) {
            return null;
        }

        Student student = new Student();
        student.setId(studentDTO.getId());
        student.setFirstName(studentDTO.getFirstName());
        student.setLastName(studentDTO.getLastName());
        student.setBirthDate(studentDTO.getBirthDate());
        student.setEmail(studentDTO.getEmail());

        if (studentDTO.getCourses() != null) {
            student.setCourses(studentDTO.getCourses().stream()
                    .map(courseDTO -> {
                        Course course = new Course();
                        course.setId(courseDTO.getId());
                        course.setTitle(courseDTO.getTitle());
                        course.setDescription(courseDTO.getDescription());
                        course.setTeacher(courseDTO.getTeacher());
                        return course;
                    })
                    .collect(Collectors.toSet()));
        }

        return student;
    }

    public StudentDTO toDTO(Student student) {
        if (student == null) {
            return null;
        }

        return new StudentDTO(
                student.getId(),
                student.getFirstName(),
                student.getLastName(),
                student.getBirthDate(),
                student.getEmail(),
                student.getCourses() != null ?
                        student.getCourses().stream()
                                .map(course -> new CourseDTO(course.getId(), course.getTitle(), course.getDescription(), course.getTeacher()))
                                .collect(Collectors.toSet()) : null
        );
    }
}