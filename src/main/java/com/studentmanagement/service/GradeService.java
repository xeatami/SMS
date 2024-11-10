package com.studentmanagement.service;

import com.studentmanagement.dto.GradeDTO;
import com.studentmanagement.entity.Grade;
import com.studentmanagement.entity.Student;
import com.studentmanagement.entity.Course;
import com.studentmanagement.mapper.GradeMapper;
import com.studentmanagement.repository.GradeRepository;
import com.studentmanagement.repository.StudentRepository;
import com.studentmanagement.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Сервис для работы с оценками
 */
@Service
@RequiredArgsConstructor
public class GradeService {

    private final GradeRepository gradeRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final GradeMapper gradeMapper;

    public List<GradeDTO> findAll() {
        return gradeRepository.findAll().stream()
                .map(gradeMapper::toDTO)
                .collect(Collectors.toList());
    }

    public GradeDTO findById(Long id) {
        Grade grade = gradeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Оценка не найдена с ID " + id));
        return gradeMapper.toDTO(grade);
    }

    public List<GradeDTO> findGradesByStudentId(Long studentId) {
        return gradeRepository.findByStudentId(studentId).stream()
                .map(gradeMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<GradeDTO> findGradesByCourseId(Long courseId) {
        return gradeRepository.findByCourseId(courseId).stream()
                .map(gradeMapper::toDTO)
                .collect(Collectors.toList());
    }

    public GradeDTO save(GradeDTO gradeDTO) {
        Student student = studentRepository.findById(gradeDTO.getStudentId())
                .orElseThrow(() -> new RuntimeException("Студент не найден с ID " + gradeDTO.getStudentId()));
        Course course = courseRepository.findById(gradeDTO.getCourseId())
                .orElseThrow(() -> new RuntimeException("Курс не найден с ID " + gradeDTO.getCourseId()));

        Grade grade = new Grade();
        grade.setValue(gradeDTO.getValue());
        grade.setDate(gradeDTO.getDate());
        grade.setStudent(student);
        grade.setCourse(course);

        return gradeMapper.toDTO(gradeRepository.save(grade));
    }

    public GradeDTO update(Long id, GradeDTO gradeDTO) {
        Grade grade = gradeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Оценка не найдена с ID " + id));

        Student student = studentRepository.findById(gradeDTO.getStudentId())
                .orElseThrow(() -> new RuntimeException("Студент не найден с ID " + gradeDTO.getStudentId()));
        Course course = courseRepository.findById(gradeDTO.getCourseId())
                .orElseThrow(() -> new RuntimeException("Курс не найден с ID " + gradeDTO.getCourseId()));

        grade.setValue(gradeDTO.getValue());
        grade.setDate(gradeDTO.getDate());
        grade.setStudent(student);
        grade.setCourse(course);

        return gradeMapper.toDTO(gradeRepository.save(grade));
    }

    public void delete(Long id) {
        if (!gradeRepository.existsById(id)) {
            throw new RuntimeException("Оценка не найдена с ID " + id);
        }
        gradeRepository.deleteById(id);
    }
}