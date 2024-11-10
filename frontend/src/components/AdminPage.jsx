import { useEffect, useState } from "react"
import { getAllUsers, createUser, updateUser, deleteUserById } from "../services/AdminService"
import "../css/AdminPage.css"

/**
 * Компонент для управления пользователями
 *
 * @component
 * @returns {JSX.Element} Страница для управления пользователями
 */
const AdminPage = () => {
    const [users, setUsers] = useState([]) // Список пользователей
    const [user, setUser] = useState({ username: "", firstName: "", lastName: "", email: "", role: "" }) // Данные о пользователе
    const [editingUserId, setEditingUserId] = useState(null) // ID редактируемого пользователя

    const roleTranslations = {
        ADMIN: "Администратор",
        TEACHER: "Учитель"
    }

    useEffect(() => {
        fetchUsers() // Загрузка пользователей при загрузке компонента
    }, [])

    // Функция для получения всех пользователей
    const fetchUsers = async () => {
        try {
            const response = await getAllUsers()
            setUsers(response.data) // Установка пользователей
        } catch (error) {
            console.error("Ошибка при получении пользователей", error)
        }
    }

    // Обработчик изменения полей ввода
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value }) // Обновление данных пользователя
    }

    // Обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault() // Отмена отправки формы
        try {
            if (editingUserId) {
                await updateUser(editingUserId, user) // Обновляем пользователя
            } else {
                await createUser(user) // Создаем нового пользователя
            }
            resetForm() // Сбрасываем форму
            fetchUsers() // Загружаем обновленный список пользователей
        } catch (error) {
            console.error("Ошибка при сохранении пользователя", error)
        }
    }

    // Функция для сброса формы
    const resetForm = () => {
        setUser({ username: "", firstName: "", lastName: "", email: "", role: "" }) // Сбрасываем данные
        setEditingUserId(null) // Сбрасываем ID редактируемого пользователя
    }

    // Обработчик редактирования пользователя
    const handleEdit = (user) => {
        setUser(user) // Устанавливаем данные пользователя в форму
        setEditingUserId(user.id) // Устанавливаем ID редактируемого пользователя
    }

    // Обработчик удаления пользователя
    const handleDelete = async (id) => {
        try {
            await deleteUserById(id) // Удаляем пользователя по ID
            fetchUsers() // Загружаем обновленный список пользователей
        } catch (error) {
            console.error("Ошибка при удалении пользователя", error)
        }
    }

    return (
        <div className="user-management">
            <h1 className="user-management__title">Управление пользователями</h1>
            <form className="user-management__form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="username" 
                    value={user.username} 
                    onChange={handleInputChange} 
                    placeholder="Имя пользователя" 
                    required 
                    className="user-management__input" 
                />
                <input 
                    type="text" 
                    name="firstName" 
                    value={user.firstName} 
                    onChange={handleInputChange} 
                    placeholder="Имя" 
                    required 
                    className="user-management__input" 
                />
                <input 
                    type="text" 
                    name="lastName" 
                    value={user.lastName} 
                    onChange={handleInputChange} 
                    placeholder="Фамилия" 
                    required 
                    className="user-management__input" 
                />
                <input 
                    type="email" 
                    name="email" 
                    value={user.email} 
                    onChange={handleInputChange} 
                    placeholder="Email" 
                    required 
                    className="user-management__input" 
                />
                <select 
                    name="role" 
                    value={user.role} 
                    onChange={handleInputChange} 
                    required 
                    className="user-management__select"
                >
                    <option value="">Выберите роль</option>
                    <option value="ADMIN">Администратор</option>
                    <option value="TEACHER">Учитель</option>
                </select>
                <button type="submit" className="user-management__button">
                    {editingUserId ? "Обновить пользователя" : "Зарегистрировать пользователя"}
                </button>
                {editingUserId && (
                    <button type="button" className="user-management__cancel-button" onClick={resetForm}>
                        Отмена
                    </button>
                )}
            </form>

            <h2 className="user-management__subtitle">Существующие пользователи</h2>
            <div className="user-management__list">
                {users.map((user) => (
                    <div key={user.id} className="user-management__card">
                        <div className="user-management__card-info">
                            {user.firstName} {user.lastName} — {roleTranslations[user.role] || user.role}
                        </div>
                        <div className="user-management__card-actions">
                            <button className="user-management__edit-button" onClick={() => handleEdit(user)}>Редактировать</button>
                            <button className="user-management__delete-button" onClick={() => handleDelete(user.id)}>Удалить</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminPage