package com.studentmanagement.service;

import com.studentmanagement.dto.CourseDTO;
import com.studentmanagement.dto.StudentDTO;
import com.studentmanagement.entity.Course;
import com.studentmanagement.entity.Student;
import com.studentmanagement.mapper.CourseMapper;
import com.studentmanagement.mapper.StudentMapper;
import com.studentmanagement.repository.CourseRepository;
import com.studentmanagement.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Сервис для работы со студентами
 */
@Service
@RequiredArgsConstructor
public class StudentService {

    private final CourseMapper courseMapper;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final StudentMapper studentMapper;

    public List<StudentDTO> findAll() {
        return studentRepository.findAll().stream()
                .map(studentMapper::toDTO)
                .collect(Collectors.toList());
    }

    public StudentDTO findById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Студент не найден с id " + id));
        return studentMapper.toDTO(student);
    }

    public StudentDTO save(StudentDTO studentDTO) {
        Student student = studentMapper.toEntity(studentDTO);
        return studentMapper.toDTO(studentRepository.save(student));
    }

    public List<CourseDTO> findAssignedCourses(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Студент не найден с id " + studentId));
        Set<Course> assignedCourses = student.getCourses(); // Получаем курсы, назначенные студенту
        return assignedCourses.stream()
                .map(courseMapper::toDTO)
                .collect(Collectors.toList());
    }

    public StudentDTO update(Long id, StudentDTO studentDTO) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Студент не найден с id " + id));
        student.setFirstName(studentDTO.getFirstName());
        student.setLastName(studentDTO.getLastName());
        student.setBirthDate(studentDTO.getBirthDate());
        student.setEmail(studentDTO.getEmail());
        return studentMapper.toDTO(studentRepository.save(student));
    }

    public void delete(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Студент не найден с id " + id);
        }
        studentRepository.deleteById(id);
    }

    public void addCourseToStudent(Long studentId, Long courseId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Студент не найден с id " + studentId));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Курс не найден с id " + courseId));
        student.getCourses().add(course);
        studentRepository.save(student);
    }

    public void removeCourseFromStudent(Long studentId, Long courseId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Студент не найден с id " + studentId));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Курс не найден с id " + courseId));
        student.getCourses().remove(course);
        studentRepository.save(student);
    }
}