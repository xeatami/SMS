import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getRoleFromToken, getUsernameFromToken, logout } from "../services/AuthService"
import PropTypes from "prop-types"
import "../css/Sidebar.css"
import logoutIcon from "../assets/logout.svg"

const Sidebar = ({ isAuthenticated, setIsAuthenticated, isOpen, toggleSidebar }) => {
    const [userRole, setUserRole] = useState(null) // Хранит роль пользователя
    const [username, setUsername] = useState("") // Хранит имя пользователя

    Sidebar.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired, // Состояние аутентификации
        setIsAuthenticated: PropTypes.func.isRequired, // Функция для изменения состояния аутентификации
        isOpen: PropTypes.bool.isRequired, // Состояние видимости боковой панели
        toggleSidebar: PropTypes.func.isRequired, // Функция для переключения видимости боковой панели
    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (isAuthenticated) {
                const role = await getRoleFromToken() // Получение роли пользователя из токена
                const name = getUsernameFromToken() // Получение имени пользователя из токена
                setUserRole(role) // Установка роли пользователя
                setUsername(name) // Установка имени пользователя
            }
        }

        fetchUserDetails() // Вызов функции для получения данных пользователя
    }, [isAuthenticated]) // Зависимость от состояния аутентификации

    const handleLogout = async () => {
        await logout() // Вызов функции выхода
        setIsAuthenticated(false) // Установка состояния аутентификации в ложное
    }

    return (
        <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
            <button className="sidebar__toggle-button" onClick={toggleSidebar}>
                {isOpen ? "❌" : "➡️"} {/* Кнопка для открытия/закрытия боковой панели */}
            </button>
            {isOpen && (
                <div className="sidebar__content">
                    <h2 className="sidebar__title">Логотип</h2>
                    <nav>
                        <ul className="sidebar__nav-list">
                            <li className="sidebar__nav-item">
                                <Link to="/" className="sidebar__nav-link">🏠 Главная</Link>
                            </li>
                            {isAuthenticated ? (
                                <>
                                    {(userRole === "TEACHER" || userRole === "ADMIN") && (
                                        <>
                                            <li className="sidebar__nav-item">
                                                <Link to="/students" className="sidebar__nav-link">👨‍🎓 Студенты</Link>
                                            </li>
                                            <li className="sidebar__nav-item">
                                                <Link to="/courses" className="sidebar__nav-link">📚 Курсы</Link>
                                            </li>
                                            <li className="sidebar__nav-item">
                                                <Link to="/addStudent" className="sidebar__nav-link">➕ Добавить Студента</Link>
                                            </li>
                                            <li className="sidebar__nav-item">
                                                <Link to="/addCourse" className="sidebar__nav-link">➕ Добавить Курс</Link>
                                            </li>
                                        </>
                                    )}
                                    {userRole === "ADMIN" && (
                                        <li className="sidebar__nav-item">
                                            <Link to="/adminPage" className="sidebar__nav-link">🛠️ Управление</Link>
                                        </li>
                                    )}
                                    <li className="sidebar__nav-item">
                                        <Link to="#contact" className="sidebar__nav-link">📞 Связаться с нами</Link>
                                    </li>
                                    <li className="sidebar__nav-item">
                                        <Link to="#support" className="sidebar__nav-link">🆘 Техническая Поддержка</Link>
                                    </li>
                                    <li className="sidebar__nav-item">
                                        <Link to="/userProfile" className="sidebar__nav-link">🧑‍💻 Личный Кабинет</Link>
                                    </li>
                                    <li className="sidebar__nav-item">
                                        <div className="sidebar__profile">
                                            <p className="sidebar__profile-info">Пользователь: {username}</p>
                                            <div className="sidebar__icon-container" onClick={handleLogout}>
                                                <span role="img" aria-label="Выйти" className="sidebar__nav-link">
                                                    <img src={logoutIcon} className="sidebar__icon" alt="Выйти" />Выйти
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                </>
                            ) : (
                                <li className="sidebar__nav-item">
                                    <Link to="/auth" className="sidebar__nav-link">🔑 Вход</Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                    <div className="sidebar__social-media">
                        <Link to="#Wk">Wk</Link>
                        <Link to="#Telegram">Telegram</Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Sidebar