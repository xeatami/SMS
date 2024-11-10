package com.studentmanagement.controller;

import com.studentmanagement.dto.GradeDTO;
import com.studentmanagement.service.GradeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Контроллер для управления оценками
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/grades")
public class GradeController {

    private final GradeService gradeService;

    /**
     * Получить все оценки
     *
     * @return список оценок
     */
    @GetMapping
    public List<GradeDTO> getAllGrades() {
        return gradeService.findAll();
    }

    /**
     * Получить оценку по ID
     *
     * @param id идентификатор оценки
     * @return оценка с указанным ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<GradeDTO> getGradeById(@PathVariable Long id) {
        GradeDTO gradeDTO = gradeService.findById(id);
        return ResponseEntity.ok(gradeDTO);
    }

    /**
     * Получить оценки студента по его ID
     *
     * @param id идентификатор студента
     * @return список оценок студента
     */
    @GetMapping("/student/{id}")
    public List<GradeDTO> getGradesForStudent(@PathVariable Long id) {
        return gradeService.findGradesByStudentId(id);
    }

    /**
     * Получить оценки курса по его ID
     *
     * @param id идентификатор курса
     * @return список оценок курса
     */
    @GetMapping("/course/{id}")
    public List<GradeDTO> getGradesForCourse(@PathVariable Long id) {
        return gradeService.findGradesByCourseId(id);
    }

    /**
     * Создать новую оценку
     *
     * @param gradeDTO данные оценки
     * @return созданная оценка
     */
    @PostMapping
    public ResponseEntity<GradeDTO> createGrade(@RequestBody GradeDTO gradeDTO) {
        GradeDTO createdGrade = gradeService.save(gradeDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdGrade);
    }

    /**
     * Обновить оценку
     *
     * @param id идентификатор оценки
     * @param gradeDTO обновленные данные оценки
     * @return обновленная оценка
     */
    @PutMapping("/{id}")
    public ResponseEntity<GradeDTO> updateGrade(@PathVariable Long id, @RequestBody GradeDTO gradeDTO) {
        GradeDTO updatedGrade = gradeService.update(id, gradeDTO);
        return ResponseEntity.ok(updatedGrade);
    }

    /**
     * Удалить оценку
     *
     * @param id идентификатор оценки
     * @return ответ без содержимого
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrade(@PathVariable Long id) {
        gradeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}