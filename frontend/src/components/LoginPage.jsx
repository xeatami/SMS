import { useEffect, useState } from "react"
import { login } from "../services/AuthService"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

const LoginPage = ({ setIsAuthenticated }) => {
    LoginPage.propTypes = {
        setIsAuthenticated: PropTypes.func.isRequired, // Проверка, что передается функция для установки состояния аутентификации
    }

    const [formData, setFormData] = useState({
        username: "", // Имя пользователя
        password: "", // Пароль
    })
    const [message, setMessage] = useState("") // Сообщение о статусе входа
    const [isSuccess, setIsSuccess] = useState(false) // Успешность входа
    const navigate = useNavigate() // Хук для навигации

    useEffect(() => {
        const token = localStorage.getItem("token") // Проверка наличия токена в локальном хранилище
        if (token) {
            setIsAuthenticated(true) // Установка состояния аутентификации
            navigate("/") // Переход на главную страницу
        } else {
            setIsAuthenticated(false) // Если токена нет, установить аутентификацию как ложную
        }
    }, [setIsAuthenticated, navigate]) // Зависимости для useEffect

    const handleChange = (e) => {
        const { name, value } = e.target // Получение имени и значения поля
        setFormData({
            ...formData,
            [name]: value, // Обновление состояния формы
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault() // Предотвращение перезагрузки страницы
        try {
            const token = await login(formData) // Вход в систему
            localStorage.setItem("token", token) // Сохранение токена в локальном хранилище
            setMessage("Успешный вход!") // Сообщение об успешном входе
            setIsSuccess(true) // Установка статуса успешного входа
            setIsAuthenticated(true) // Установка состояния аутентификации
            navigate("/") // Переход на главную страницу
        } catch (error) {
            setMessage(error.message || "Ошибка входа!") // Сообщение об ошибке
            setIsSuccess(false) // Установка статуса неуспешного входа
        }
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center">Вход</h2>
            {message && (
                <div className={`alert ${isSuccess ? "alert-success" : "alert-danger"}`}>
                    {message} {/* Отображение сообщения об успехе или ошибке */}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Имя пользователя</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange} // Обработка изменения поля
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange} // Обработка изменения поля
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Войти</button>
            </form>
        </div>
    )
}

export default LoginPage