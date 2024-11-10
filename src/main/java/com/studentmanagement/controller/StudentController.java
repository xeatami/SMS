package com.studentmanagement.controller;

import com.studentmanagement.dto.CourseDTO;
import com.studentmanagement.dto.StudentDTO;
import com.studentmanagement.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Контроллер для управления студентами
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    /**
     * Получить всех студентов
     *
     * @return список студентов
     */
    @GetMapping
    public List<StudentDTO> getAllStudents() {
        return studentService.findAll();
    }

    /**
     * Получить студента по ID
     *
     * @param id идентификатор студента
     * @return студент с указанным ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable Long id) {
        StudentDTO studentDTO = studentService.findById(id);
        return ResponseEntity.ok(studentDTO);
    }

    /**
     * Получить курсы, назначенные студенту
     *
     * @param id идентификатор студента
     * @return список курсов
     */
    @GetMapping("/{id}/courses")
    public List<CourseDTO> getAssignedCourses(@PathVariable Long id) {
        return studentService.findAssignedCourses(id);
    }

    /**
     * Создать нового студента
     *
     * @param studentDTO данные студента
     * @return созданный студент
     */
    @PostMapping
    public ResponseEntity<StudentDTO> createStudent(@RequestBody StudentDTO studentDTO) {
        StudentDTO createdStudent = studentService.save(studentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStudent);
    }

    /**
     * Обновить студента
     *
     * @param id идентификатор студента
     * @param studentDTO обновленные данные студента
     * @return обновленный студент
     */
    @PutMapping("/{id}")
    public ResponseEntity<StudentDTO> updateStudent(@PathVariable Long id, @RequestBody StudentDTO studentDTO) {
        StudentDTO updatedStudent = studentService.update(id, studentDTO);
        return ResponseEntity.ok(updatedStudent);
    }

    /**
     * Удалить студента
     *
     * @param id идентификатор студента
     * @return ответ без содержимого
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Назначить курс студенту
     *
     * @param studentId идентификатор студента
     * @param courseId идентификатор курса
     * @return ответ без содержимого
     */
    @PostMapping("/{studentId}/courses/{courseId}")
    public ResponseEntity<Void> addCourseToStudent(@PathVariable Long studentId, @PathVariable Long courseId) {
        studentService.addCourseToStudent(studentId, courseId);
        return ResponseEntity.ok().build();
    }

    /**
     * Удалить курс у студента
     *
     * @param studentId идентификатор студента
     * @param courseId идентификатор курса
     * @return ответ без содержимого
     */
    @DeleteMapping("/{studentId}/courses/{courseId}")
    public ResponseEntity<Void> removeCourseFromStudent(@PathVariable Long studentId, @PathVariable Long courseId) {
        studentService.removeCourseFromStudent(studentId, courseId);
        return ResponseEntity.ok().build();
    }
}