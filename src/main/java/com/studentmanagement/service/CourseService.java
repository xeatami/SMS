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
import java.util.stream.Collectors;

/**
 * Сервис для работы с курсами
 */
@Service
@RequiredArgsConstructor
public class CourseService {

    private final StudentMapper studentMapper;
    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;
    private final CourseMapper courseMapper;

    public List<CourseDTO> findAll() {
        return courseRepository.findAll().stream()
                .map(courseMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CourseDTO findById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Курс не найден с ID " + id));
        return courseMapper.toDTO(course);
    }

    public List<StudentDTO> listOfAssignedStudents(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Курс не найден с ID " + courseId));
        return course.getStudents().stream()
                .map(studentMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CourseDTO save(CourseDTO courseDTO) {
        Course course = courseMapper.toEntity(courseDTO);
        return courseMapper.toDTO(courseRepository.save(course));
    }

    public CourseDTO update(Long id, CourseDTO courseDTO) {
        if (!courseRepository.existsById(id)) {
            throw new RuntimeException("Курс не найден с ID " + id);
        }
        Course course = courseMapper.toEntity(courseDTO);
        course.setId(id);
        return courseMapper.toDTO(courseRepository.save(course));
    }

    public void delete(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new RuntimeException("Курс не найден с ID " + id);
        }
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Курс не найден с ID " + id));
        for (Student student : course.getStudents()) {
            student.getCourses().remove(course);
            studentRepository.save(student);
        }
        courseRepository.deleteById(id);
    }

    public List<StudentDTO> listOfUnassignedStudents(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Курс не найден с ID " + courseId));
        List<Student> allStudents = studentRepository.findAll();
        List<Student> unassignedStudents = allStudents.stream()
                .filter(student -> !course.getStudents().contains(student))
                .toList();
        return unassignedStudents.stream()
                .map(studentMapper::toDTO)
                .collect(Collectors.toList());
    }

    public void addStudentToCourse(Long courseId, Long studentId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Курс не найден с ID " + courseId));
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Студент не найден с ID " + studentId));
        course.getStudents().add(student);
        courseRepository.save(course);
    }

    public void removeStudentFromCourse(Long courseId, Long studentId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Курс не найден с ID " + courseId));
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Студент не найден с ID " + studentId));
        course.getStudents().remove(student);
        courseRepository.save(course);
    }
}