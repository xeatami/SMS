import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getStudentById, updateStudent } from "../services/StudentService"
import "../css/UpdateStudent.css"

const UpdateStudent = () => {
    const { id } = useParams() // Получение ID студента из параметров маршрута
    const [firstName, setFirstName] = useState("") // Состояние для имени студента
    const [lastName, setLastName] = useState("") // Состояние для фамилии студента
    const [email, setEmail] = useState("") // Состояние для электронной почты студента
    const [birthDate, setBirthDate] = useState("") // Состояние для даты рождения студента
    const [error, setError] = useState("") // Состояние для хранения сообщений об ошибках
    const [loading, setLoading] = useState(true) // Состояние загрузки данных
    const navigate = useNavigate() // Хук для навигации

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await getStudentById(id) // Запрос на получение данных студента
                const student = response.data
                setFirstName(student.firstName) // Установка имени студента
                setLastName(student.lastName) // Установка фамилии студента
                setEmail(student.email) // Установка электронной почты студента
                setBirthDate(student.birthDate) // Установка даты рождения студента
            } catch (error) {
                setError("Ошибка получения данных студента. Попробуйте снова.") // Сообщение об ошибке
                console.error(error) // Логирование ошибки в консоль
            } finally {
                setLoading(false) // Установка состояния загрузки в ложное
            }
        }

        fetchStudent() // Вызов функции для загрузки данных студента
    }, [id]) // Зависимость от ID студента

    const handleUpdateStudent = async (e) => {
        e.preventDefault() // Предотвращение перезагрузки страницы
        const updatedStudent = { firstName, lastName, email, birthDate } // Объект с обновлённой информацией о студенте

        try {
            await updateStudent(id, updatedStudent) // Запрос на обновление данных студента
            console.log("Студент успешно обновлён") // Логирование успешного обновления
            navigate("/students") // Перенаправление на страницу со списком студентов
        } catch (error) {
            setError("Ошибка обновления данных студента. Попробуйте снова.") // Сообщение об ошибке
            console.error(error) // Логирование ошибки в консоль
        }
    }

    if (loading) {
        return <div className="text-center">Загрузка...</div> // Отображение индикатора загрузки
    }

    return (
        <div className="edit-student-container">
            <div className="edit-student-card">
                <h2 className="edit-student-title">Редактировать студента</h2>
                {error && <div className="edit-student-alert">{error}</div>} {/* Отображение сообщения об ошибке */}
                <form onSubmit={handleUpdateStudent}>
                    <div className="edit-student-form-group">
                        <label className="edit-student-form-label">Имя:</label>
                        <input
                            type="text"
                            className="edit-student-form-control"
                            placeholder="Введите имя"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} // Обработка изменения имени
                            required
                        />
                    </div>
                    <div className="edit-student-form-group">
                        <label className="edit-student-form-label">Фамилия:</label>
                        <input
                            type="text"
                            className="edit-student-form-control"
                            placeholder="Введите фамилию"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)} // Обработка изменения фамилии
                            required
                        />
                    </div>
                    <div className="edit-student-form-group">
                        <label className="edit-student-form-label">Электронная почта:</label>
                        <input
                            type="email"
                            className="edit-student-form-control"
                            placeholder="Введите электронную почту"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Обработка изменения электронной почты
                            required
                        />
                    </div>
                    <div className="edit-student-form-group">
                        <label className="edit-student-form-label">Дата рождения:</label>
                        <input
                            type="date"
                            className="edit-student-form-control"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)} // Обработка изменения даты рождения
                            required
                        />
                    </div>
                    <button type="submit" className="edit-student-btn">Обновить студента</button> {/* Кнопка для отправки формы */}
                </form>
            </div>
        </div>
    )
}

export default UpdateStudent