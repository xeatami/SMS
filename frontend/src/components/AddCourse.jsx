import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addCourse, listOfCourses } from "../services/CourseService"

const AddCourse = () => {
    const [title, setTitle] = useState("") // Состояние для названия курса
    const [description, setDescription] = useState("") // Состояние для описания курса
    const [teacher, setTeacher] = useState("") // Состояние для имени преподавателя
    const [message, setMessage] = useState("") // Состояние для сообщений об ошибках или успехе
    const [isSuccess, setIsSuccess] = useState(false) // Состояние для определения успешности операции

    const navigator = useNavigate() // Хук для навигации

    const saveCourse = async (e) => {
        e.preventDefault() // Предотвращение перезагрузки страницы

        // Проверка на пустые значения
        if (!title.trim() || !teacher.trim()) {
            setMessage("Название и имя преподавателя не могут быть пустыми.")
            setIsSuccess(false)
            return
        }

        // Проверка на существование курса с таким же названием
        const courses = await listOfCourses()
        const courseExists = courses.data.some(course => course.title.toLowerCase() === title.toLowerCase())

        if (courseExists) {
            setMessage("Курс с таким названием уже существует.")
            setIsSuccess(false)
            return
        }

        const course = { title, description, teacher } // Объект с данными нового курса
        console.log("Добавлен новый курс")
        console.log(course)

        try {
            await addCourse(course) // Запрос на добавление нового курса
            setMessage("Курс успешно добавлен!") // Уведомление об успешном добавлении
            setIsSuccess(true)
            navigator("/courses") // Перенаправление на страницу со списком курсов
        } catch (error) {
            setMessage("Ошибка при добавлении курса: " + error.message) // Сообщение об ошибке
            setIsSuccess(false)
        }
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center">Добавить курс</h2>
            {message && (
                <div className={`alert ${isSuccess ? "alert-success" : "alert-danger"}`}>
                    {message} {/* Отображение сообщения об успехе или ошибке */}
                </div>
            )}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <form onSubmit={saveCourse}>
                                <div className="form-group mb-3">
                                    <label className="form-label">Название:</label>
                                    <input
                                        type="text"
                                        placeholder="Введите название курса"
                                        name="title"
                                        value={title}
                                        className="form-control"
                                        onChange={e => setTitle(e.target.value)} // Обработка изменения названия
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label">Описание:</label>
                                    <textarea
                                        placeholder="Введите описание курса"
                                        name="description"
                                        value={description}
                                        className="form-control"
                                        onChange={e => setDescription(e.target.value)} // Обработка изменения описания
                                        maxLength={4096} // Максимальная длина описания
                                    />
                                    <div className="text-muted">
                                        {description.length} / 4096 {/* Отображение количества введённых символов */}
                                    </div>
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label">Преподаватель:</label>
                                    <input
                                        type="text"
                                        placeholder="Введите имя преподавателя"
                                        name="teacher"
                                        value={teacher}
                                        className="form-control"
                                        onChange={e => setTeacher(e.target.value)} // Обработка изменения имени преподавателя
                                    />
                                </div>
                                <div className="d-grid mt-4">
                                    <button type="submit" className="btn btn-primary">Добавить</button> {/* Кнопка для отправки формы */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCourse