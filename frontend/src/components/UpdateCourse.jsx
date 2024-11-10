import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCourseById, updateCourse } from "../services/CourseService"
import "../css/UpdateCourse.css"

const UpdateCourse = () => {
    const [title, setTitle] = useState("") // Состояние для хранения названия курса
    const [description, setDescription] = useState("") // Состояние для хранения описания курса
    const [teacher, setTeacher] = useState("") // Состояние для хранения имени преподавателя
    const { id } = useParams() // Получение ID курса из параметров маршрута
    const navigate = useNavigate() // Хук для навигации
    const [error, setError] = useState("") // Состояние для хранения сообщений об ошибках

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await getCourseById(id) // Запрос на получение курса по ID
                const course = response.data
                setTitle(course.title) // Установка названия курса
                setDescription(course.description) // Установка описания курса
                setTeacher(course.teacher) // Установка имени преподавателя
            } catch {
                setError("Ошибка загрузки курса. Попробуйте позже.") // Сообщение об ошибке при загрузке
            }
        }

        fetchCourse() // Вызов функции для получения информации о курсе
    }, [id]) // Зависимость от ID курса

    const handleUpdateCourse = async (e) => {
        e.preventDefault() // Предотвращение перезагрузки страницы
        const updatedCourse = { title, description, teacher } // Объект с обновлённой информацией о курсе

        try {
            await updateCourse(id, updatedCourse) // Запрос на обновление курса
            navigate("/courses") // Перенаправление на страницу со списком курсов
        } catch {
            setError("Ошибка обновления курса. Попробуйте снова.") // Сообщение об ошибке при обновлении
        }
    }

    return (
        <div className="edit-course-container">
            <div className="edit-course-card">
                <h2 className="edit-course-title">Редактировать курс</h2>
                {error && <div className="edit-course-alert">{error}</div>} {/* Отображение сообщения об ошибке */}
                <form onSubmit={handleUpdateCourse}>
                    <div className="edit-course-form-group">
                        <label className="edit-course-form-label">Название:</label>
                        <input
                            type="text"
                            className="edit-course-form-control"
                            placeholder="Введите название курса"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} // Обработка изменения названия
                            required
                        />
                    </div>
                    <div className="edit-course-form-group">
                        <label className="edit-course-form-label">Описание:</label>
                        <textarea
                            className="edit-course-form-control"
                            placeholder="Введите описание курса"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} // Обработка изменения описания
                            required
                            maxLength={4096} // Максимальная длина описания
                        />
                        <div className="text-muted">
                            {description.length} / 4096 {/* Отображение количества введённых символов */}
                        </div>
                    </div>
                    <div className="edit-course-form-group">
                        <label className="edit-course-form-label">Преподаватель:</label>
                        <input
                            type="text"
                            className="edit-course-form-control"
                            placeholder="Введите имя преподавателя"
                            value={teacher}
                            onChange={(e) => setTeacher(e.target.value)} // Обработка изменения имени преподавателя
                            required
                        />
                    </div>
                    <button type="submit" className="edit-course-btn">Обновить курс</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateCourse