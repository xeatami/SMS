import { useEffect, useState } from "react"
import { getUserProfile, updateUserProfile, changePassword } from "../services/UserProfileService"
import { useNavigate } from "react-router-dom"
import "../css/UserProfile.css"

const UserProfile = () => {
    const [user, setUser] = useState({ username: "", firstName: "", lastName: "", email: "" }) // Состояние для данных пользователя
    const [loading, setLoading] = useState(true) // Состояние загрузки данных
    const [error, setError] = useState(null) // Состояние для хранения ошибок
    const [currentPassword, setCurrentPassword] = useState("") // Текущий пароль
    const [newPassword, setNewPassword] = useState("") // Новый пароль
    const navigate = useNavigate() // Хук для навигации

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userProfile = await getUserProfile() // Запрос на получение профиля пользователя
                setUser(userProfile) // Установка данных профиля
            } catch (err) {
                setError(err.message || "Не удалось загрузить профиль.") // Сообщение об ошибке
            } finally {
                setLoading(false) // Установка состояния загрузки в ложное
            }
        }

        fetchUserProfile() // Вызов функции для загрузки профиля
    }, [])

    const handleUpdateProfile = async (e) => {
        e.preventDefault() // Предотвращение перезагрузки страницы
        try {
            await updateUserProfile(user) // Запрос на обновление профиля пользователя
            localStorage.removeItem("token") // Удаление токена из локального хранилища
            alert("Профиль успешно обновлен! Пожалуйста, авторизуйтесь.") // Уведомление об успешном обновлении
            navigate("/auth") // Перенаправление на страницу аутентификации
        } catch (err) {
            setError(err.message || "Не удалось обновить профиль.") // Сообщение об ошибке
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault() // Предотвращение перезагрузки страницы
        try {
            await changePassword(currentPassword, newPassword) // Запрос на изменение пароля
            localStorage.removeItem("token") // Удаление токена из локального хранилища
            alert("Пароль успешно изменен! Пожалуйста, авторизуйтесь.") // Уведомление об успешном изменении пароля
            navigate("/auth") // Перенаправление на страницу аутентификации
        } catch (err) {
            setError(err.message || "Не удалось изменить пароль.") // Сообщение об ошибке
        }
    }

    if (loading) return <p>Загрузка...</p> // Индикатор загрузки
    if (error) return <p style={{ color: "red" }}>{error}</p> // Отображение сообщения об ошибке

    return (
        <div className="user-profile">
            <h1 className="user-profile__title">Профиль пользователя</h1>
            <form className="user-profile__form" onSubmit={handleUpdateProfile}>
                <div className="form-group">
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })} // Обработка изменения имени пользователя
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">Имя:</label>
                    <input
                        id="firstName"
                        type="text"
                        value={user.firstName}
                        onChange={(e) => setUser({ ...user, firstName: e.target.value })} // Обработка изменения имени
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Фамилия:</label>
                    <input
                        id="lastName"
                        type="text"
                        value={user.lastName}
                        onChange={(e) => setUser({ ...user, lastName: e.target.value })} // Обработка изменения фамилии
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })} // Обработка изменения электронной почты
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn-update-profile">Обновить профиль</button> {/* Кнопка для отправки формы обновления профиля */}
            </form>

            <h2 className="user-profile__subtitle">Сменить пароль</h2>
            <form className="user-profile__form" onSubmit={handleChangePassword}>
                <div className="form-group">
                    <label htmlFor="currentPassword">Текущий пароль:</label>
                    <input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)} // Обработка изменения текущего пароля
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">Новый пароль:</label>
                    <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} // Обработка изменения нового пароля
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn-change-password">Сменить пароль</button> {/* Кнопка для отправки формы смены пароля */}
            </form>
        </div>
    )
}

export default UserProfile