package com.studentmanagement.controller;

import com.studentmanagement.dto.CourseDTO;
import com.studentmanagement.dto.StudentDTO;
import com.studentmanagement.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Контроллер для управления курсами
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;

    /**
     * Получить все курсы
     *
     * @return список курсов
     */
    @GetMapping
    public List<CourseDTO> getAllCourses() {
        return courseService.findAll();
    }

    /**
     * Получить курс по ID
     *
     * @param id идентификатор курса
     * @return курс с указанным ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<CourseDTO> getCourseById(@PathVariable Long id) {
        CourseDTO courseDTO = courseService.findById(id);
        return ResponseEntity.ok(courseDTO);
    }

    /**
     * Получить студентов, назначенных на курс
     *
     * @param id идентификатор курса
     * @return список студентов
     */
    @GetMapping("/{id}/students")
    public List<StudentDTO> getAssignedStudents(@PathVariable Long id) {
        return courseService.listOfAssignedStudents(id);
    }

    /**
     * Получить студентов, не назначенных на курс
     *
     * @param id идентификатор курса
     * @return список студентов
     */
    @GetMapping("/{id}/students/unassigned")
    public List<StudentDTO> getUnassignedStudents(@PathVariable Long id) {
        return courseService.listOfUnassignedStudents(id);
    }

    /**
     * Создать новый курс
     *
     * @param courseDTO данные курса
     * @return созданный курс
     */
    @PostMapping
    public ResponseEntity<CourseDTO> createCourse(@RequestBody CourseDTO courseDTO) {
        CourseDTO createdCourse = courseService.save(courseDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCourse);
    }

    /**
     * Обновить курс
     *
     * @param id идентификатор курса
     * @param courseDTO обновленные данные курса
     * @return обновленный курс
     */
    @PutMapping("/{id}")
    public ResponseEntity<CourseDTO> updateCourse(@PathVariable Long id, @RequestBody CourseDTO courseDTO) {
        CourseDTO updatedCourse = courseService.update(id, courseDTO);
        return ResponseEntity.ok(updatedCourse);
    }

    /**
     * Удалить курс
     *
     * @param id идентификатор курса
     * @return ответ без содержимого
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Добавить студента на курс
     *
     * @param courseId идентификатор курса
     * @param id идентификатор студента
     * @return ответ без содержимого
     */
    @PostMapping("/{courseId}/students/{id}")
    public ResponseEntity<Void> addStudentToCourse(@PathVariable Long courseId, @PathVariable Long id) {
        courseService.addStudentToCourse(courseId, id);
        return ResponseEntity.ok().build();
    }

    /**
     * Удалить студента с курса
     *
     * @param courseId идентификатор курса
     * @param id идентификатор студента
     * @return ответ без содержимого
     */
    @DeleteMapping("/{courseId}/students/{id}")
    public ResponseEntity<Void> removeStudentFromCourse(@PathVariable Long courseId, @PathVariable Long id) {
        courseService.removeStudentFromCourse(courseId, id);
        return ResponseEntity.ok().build();
    }
}