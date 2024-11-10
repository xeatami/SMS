import axiosInstance from "../configs/axios.config";

const REST_API_URL = "/students";

/**
 * Получить всех студентов
 * 
 * @returns {Promise} Промис с ответом от сервера
 */
export const listOfStudents = () => axiosInstance.get(REST_API_URL);

/**
 * Получить студента по ID
 * 
 * @param {number} id - Идентификатор студента
 * @returns {Promise} Промис с ответом от сервера
 */
export const getStudentById = (id) => axiosInstance.get(`${REST_API_URL}/${id}`);

/**
 * Добавить нового студента
 * 
 * @param {Object} student - Данные студента
 * @returns {Promise} Промис с ответом от сервера
 */
export const addStudent = (student) => axiosInstance.post(REST_API_URL, student);

/**
 * Обновить существующего студента
 * 
 * @param {number} id - Идентификатор студента
 * @param {Object} student - Обновленные данные студента
 * @returns {Promise} Промис с ответом от сервера
 */
export const updateStudent = (id, student) => axiosInstance.put(`${REST_API_URL}/${id}`, student);

/**
 * Удалить студента по ID
 * 
 * @param {number} id - Идентификатор студента
 * @returns {Promise} Промис с ответом от сервера
 */
export const deleteStudentById = (id) => axiosInstance.delete(`${REST_API_URL}/${id}`);

/**
 * Получить курсы, назначенные студенту
 * 
 * @param {number} studentId - Идентификатор студента
 * @returns {Promise} Промис с ответом от сервера
 */
export const listOfAssignedCourses = (studentId) => axiosInstance.get(`${REST_API_URL}/${studentId}/courses`);

/**
 * Назначить курс студенту
 * 
 * @param {number} studentId - Идентификатор студента
 * @param {number} courseId - Идентификатор курса
 * @returns {Promise} Промис с ответом от сервера
 */
export const assignStudentToCourse = (studentId, courseId) => {
    return axiosInstance.post(`${REST_API_URL}/${studentId}/courses/${courseId}`);
};

/**
 * Удалить курс у студента
 * 
 * @param {number} studentId - Идентификатор студента
 * @param {number} courseId - Идентификатор курса
 * @returns {Promise} Промис с ответом от сервера
 */
export const unassignStudentFromCourse = (studentId, courseId) => {
    return axiosInstance.delete(`${REST_API_URL}/${studentId}/courses/${courseId}`);
};