package com.studentmanagement.mapper;

import com.studentmanagement.dto.GradeDTO;
import com.studentmanagement.entity.Grade;
import com.studentmanagement.entity.Student;
import com.studentmanagement.entity.Course;
import org.springframework.stereotype.Component;

/**
 * Маппер для преобразования Grade и GradeDTO
 */
@Component
public class GradeMapper {

    public Grade toEntity(GradeDTO gradeDTO, Student student, Course course) {
        if (gradeDTO == null) {
            return null;
        }

        Grade grade = new Grade();
        grade.setId(gradeDTO.getId());
        grade.setValue(gradeDTO.getValue());
        grade.setDate(gradeDTO.getDate());
        grade.setStudent(student);
        grade.setCourse(course);
        return grade;
    }

    public GradeDTO toDTO(Grade grade) {
        if (grade == null) {
            return null;
        }

        return new GradeDTO(
                grade.getId(),
                grade.getValue(),
                grade.getDate(),
                grade.getStudent() != null ? grade.getStudent().getId() : null,
                grade.getCourse() != null ? grade.getCourse().getId() : null
        );
    }
}