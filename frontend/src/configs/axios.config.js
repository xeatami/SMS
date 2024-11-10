/**
 * Конфигурация экземпляра Axios и интерсептор для токена
 * @module axiosInstance
 */

import axios from 'axios';

/**
 * Создает экземпляр клиента Axios с базовым URL и заголовками по умолчанию
 * @type {AxiosInstance}
 */
const axiosInstance = axios.create({
  /**
   * Базовый URL для запросов к API
   * @type {string}
   * @default 'http://localhost:8080'
   */
  baseURL: 'http://localhost:8080',
  /**
   * Заголовки по умолчанию для запросов к API
   * @type {object}
   * @default {'Content-Type': 'application/json'}
   */
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Получает токен аутентификации из локального хранилища
 * @function getToken
 * @returns {string|null} Токен аутентификации или null, если не найден
 */
const getToken = () => localStorage.getItem('token');

/**
 * Добавляет интерсептор для исходящих запросов, чтобы включить токен аутентификации в заголовок Authorization
 * @param {object} config - Объект конфигурации запроса
 * @param {object} error - Объект ошибки (в случае ошибки)
 * @returns {Promise} Промис, который разрешается с измененной конфигурацией запроса или отклоняется с ошибкой
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}` // Добавляем токен в заголовок
    }
    return config // Возвращаем изменённый конфиг
  },
  (error) => {
    return Promise.reject(error) // Обработка ошибки
  }
)

export default axiosInstance