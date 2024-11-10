import axios from "axios";
import { jwtDecode as jwtDec } from "jwt-decode";

const REST_API_URL = "http://localhost:8080/auth";

/**
 * Логин пользователя
 *
 * @param {Object} loginRequest - данные для входа
 * @returns {Promise<string>} - токен аутентификации
 * @throws {Error} - ошибка при аутентификации
 */
export const login = async (loginRequest) => {
    try {
        const response = await axios.post(`${REST_API_URL}/login`, loginRequest);
        const token = response.data;
        localStorage.setItem("token", token);
        return token;
    } catch (error) {
        throw error.response.data;
    }
};

/**
 * Выход пользователя
 *
 * @returns {Object} - сообщение о выходе
 */
export const logout = async () => {
    localStorage.removeItem("token");
    return { message: "Вы вышли из системы" };
};

/**
 * Получение имени пользователя из токена
 *
 * @returns {string|null} - имя пользователя или null
 */
export const getUsernameFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decodedToken = jwtDec(token);
    return decodedToken.sub || null;
};

/**
 * Получение роли пользователя из токена
 *
 * @returns {string|null} - роль или null
 */
export const getRoleFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decodedToken = jwtDec(token);
    return decodedToken.role || null;
};