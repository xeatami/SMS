import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode as jwtDec } from "jwt-decode"
import PropTypes from "prop-types";

/**
 * Проверка истечения токена.
 * @param {string} token - JWT токен.
 * @returns {boolean} - true, если токен истек, иначе false.
 */
const isTokenExpired = (token) => {
    if (!token) return true;
    const decoded = jwtDec(token);
    return decoded.exp < Math.floor(Date.now() / 1000); // Проверка времени истечения в секундах
};

/**
 * Компонент для защиты маршрутов.
 * Проверяет наличие токена и разрешенные роли пользователя.
 *
 * @param {Object} props - Свойства компонента.
 * @param {React.Element} props.element - Элемент, который будет отображаться, если доступ разрешен.
 * @param {Array<string>} props.allowedRoles - Массив ролей, которым разрешён доступ к этому элементу.
 * @returns {React.Element} - Перенаправление на страницу аутентификации или защищённый элемент.
 */
const ProtectedRoute = ({ element, allowedRoles }) => {
    const [redirect, setRedirect] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token || isTokenExpired(token)) {
            localStorage.removeItem("token"); // Удаляем недействительный токен
            setRedirect(true); // Устанавливаем состояние для перенаправления
            return;
        }

        try {
            const decodedToken = jwtDec(token);
            const roles = decodedToken.role || [];
            const hasAccess = allowedRoles.some(role => roles.includes(role));
            if (!hasAccess) {
                setRedirect(true); // Устанавливаем состояние для перенаправления
            }
        } catch {
            localStorage.removeItem("token"); // Удаляем токен при ошибке декодирования
            setRedirect(true); // Устанавливаем состояние для перенаправления
        }
    }, [token, allowedRoles]);

    if (redirect) {
        return <Navigate to="/auth" replace />; // Выполняем перенаправление
    }

    return element; // Возвращаем защищённый элемент, если доступ разрешен
};

ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;