import axiosInstance from "../configs/axios.config";

const REST_API_URL = "/admin/users";

/**
 * Получить всех пользователей
 * 
 * @returns {Promise} Промис с ответом от API, содержащим список пользователей
 */
export const getAllUsers = () => axiosInstance.get(REST_API_URL);

/**
 * Создать нового пользователя
 * 
 * @param {Object} user - Данные нового пользователя
 * @returns {Promise} Промис с ответом от API, содержащим созданного пользователя
 */
export const createUser = (user) => axiosInstance.post(REST_API_URL, user);

/**
 * Обновить существующего пользователя
 * 
 * @param {number} id - Идентификатор пользователя
 * @param {Object} user - Данные для обновления пользователя
 * @returns {Promise} Промис с ответом от API, содержащим обновленного пользователя
 */
export const updateUser = (id, user) => axiosInstance.put(`${REST_API_URL}/${id}`, user);

/**
 * Удалить пользователя по ID
 * 
 * @param {number} id - Идентификатор пользователя
 * @returns {Promise} Промис с ответом от API
 */
export const deleteUserById = (id) => axiosInstance.delete(`${REST_API_URL}/${id}`);