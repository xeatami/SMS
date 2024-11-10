import axiosInstance from "../configs/axios.config";

const REST_API_URL = "/courses";

/**
 * Получить все курсы
 * 
 * @returns {Promise} Промис с ответом от сервера
 */
export const listOfCourses = () => axiosInstance.get(REST_API_URL);

/**
 * Получить курс по ID
 * 
 * @param {number} id - Идентификатор курса
 * @returns {Promise} Промис с ответом от сервера
 */
export const getCourseById = (id) => axiosInstance.get(`${REST_API_URL}/${id}`);

/**
 * Добавить новый курс
 * 
 * @param {Object} course - Данные курса
 * @returns {Promise} Промис с ответом от сервера
 */
export const addCourse = (course) => axiosInstance.post(REST_API_URL, course);

/**
 * Обновить существующий курс
 * 
 * @param {number} id - Идентификатор курса
 * @param {Object} course - Обновленные данные курса
 * @returns {Promise} Промис с ответом от сервера
 */
export const updateCourse = (id, course) => axiosInstance.put(`${REST_API_URL}/${id}`, course);

/**
 * Удалить курс по ID
 * 
 * @param {number} id - Идентификатор курса
 * @returns {Promise} Промис с ответом от сервера
 */
export const deleteCourseById = (id) => axiosInstance.delete(`${REST_API_URL}/${id}`);

/**
 * Получить студентов, назначенных на курс
 * 
 * @param {number} courseId - Идентификатор курса
 * @returns {Promise} Промис с ответом от сервера
 */
export const listOfAssignedStudents = (courseId) => axiosInstance.get(`${REST_API_URL}/${courseId}/students`);

/**
 * Получить студентов, не назначенных на курс
 * 
 * @param {number} courseId - Идентификатор курса
 * @returns {Promise} Промис с ответом от сервера
 */
export const listOfUnassignedStudents = (courseId) => axiosInstance.get(`${REST_API_URL}/${courseId}/students/unassigned`);

// export const assignStudentToCourse = (courseId, studentId) => {
//     return axiosInstance.post(`${REST_API_URL}/${courseId}/students/${studentId}`);
// };

// export const unassignStudentFromCourse = (courseId, studentId) => {
//     return axiosInstance.delete(`${REST_API_URL}/${courseId}/students/${studentId}`);
// };