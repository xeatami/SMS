import axiosInstance from "../configs/axios.config";

const REST_API_URL = "/grades";

/**
 * Получить все оценки
 * 
 * @returns {Promise} Промис с ответом от сервера
 */
export const listOfGrades = () => axiosInstance.get(REST_API_URL);

/**
 * Получить оценку по ID
 * 
 * @param {number} id - Идентификатор оценки
 * @returns {Promise} Промис с ответом от сервера
 */
export const getGradeById = (id) => axiosInstance.get(`${REST_API_URL}/${id}`);

/**
 * Создать новую оценку
 * 
 * @param {Object} gradeDTO - Данные оценки
 * @returns {Promise} Промис с ответом от сервера
 */
export const createGrade = (gradeDTO) => axiosInstance.post(REST_API_URL, gradeDTO);

/**
 * Обновить существующую оценку
 * 
 * @param {number} id - Идентификатор оценки
 * @param {Object} gradeDTO - Обновленные данные оценки
 * @returns {Promise} Промис с ответом от сервера
 */
export const updateGrade = (id, gradeDTO) => axiosInstance.put(`${REST_API_URL}/${id}`, gradeDTO);

/**
 * Удалить оценку по ID
 * 
 * @param {number} id - Идентификатор оценки
 * @returns {Promise} Промис с ответом от сервера
 */
export const deleteGradeById = (id) => axiosInstance.delete(`${REST_API_URL}/${id}`);

/**
 * Получить оценки студента по его ID
 * 
 * @param {number} studentId - Идентификатор студента
 * @returns {Promise} Промис с ответом от сервера
 */
export const getGradesForStudent = (studentId) => axiosInstance.get(`${REST_API_URL}/student/${studentId}`);

/**
 * Получить оценки курса по его ID
 * 
 * @param {number} courseId - Идентификатор курса
 * @returns {Promise} Промис с ответом от сервера
 */
export const getGradesForCourse = (courseId) => axiosInstance.get(`${REST_API_URL}/course/${courseId}`);