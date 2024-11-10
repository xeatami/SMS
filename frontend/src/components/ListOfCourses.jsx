import React, { useEffect, useState } from "react"
import { deleteCourseById, listOfCourses } from "../services/CourseService"
import { useNavigate } from "react-router-dom"
import "../css/ListOfCourses.css"

const ListOfCourses = () => {
    const [courses, setCourses] = useState([]) // Список курсов
    const [searchQuery, setSearchQuery] = useState("") // Поисковый запрос
    const [expandedCourseId, setExpandedCourseId] = useState(null) // ID развернутого курса
    const navigate = useNavigate() // Хук для навигации

    useEffect(() => {
        loadCourses() // Загрузка курсов при монтировании компонента
    }, [])

    // Функция для загрузки курсов
    const loadCourses = async () => {
        try {
            const response = await listOfCourses()
            if (Array.isArray(response.data)) {
                setCourses(response.data) // Установка курсов
            } else {
                console.error("Ожидали получить массив, а получили:", response.data)
                setCourses([])
            }
        } catch (error) {
            console.error("Ошибка при загрузке курсов:", error)
            setCourses([])
        }
    }

    // Функция для управления студентами курса
    const manageStudents = (courseId) => {
        navigate(`/manageCourse/${courseId}`)
    }

    // Функция для редактирования курса
    const updateCourse = (id) => {
        navigate(`/updateCourse/${id}`)
    }

    // Функция для удаления курса
    const deleteCourse = async (id) => {
        try {
            await deleteCourseById(id)
            setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id)) // Обновление списка курсов
        } catch (error) {
            console.error("Ошибка при удалении курса:", error)
        }
    }

    // Функция для переключения описания курса
    const toggleDescription = (id) => {
        setExpandedCourseId(expandedCourseId === id ? null : id)
    }

    // Фильтрация курсов по названию
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="list-courses-container mt-5">
            <h2 className="text-center">Список курсов</h2>
            <div className="d-flex justify-content-end mb-3">
                <input 
                    type="text" 
                    placeholder="Поиск по названию курса"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Обработка изменения поискового поля
                    className="form-control w-25"
                />
            </div>
            <table className="list-courses-table table table-striped table-bordered">
                <thead>
                    <tr>
                        <th style={{ width: "25%" }}>Название курса</th>
                        <th style={{ width: "20%" }}>Преподаватель</th>
                        <th style={{ width: "40%" }}>Описание</th>
                        <th style={{ width: "15%" }}>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map(course => (
                            <React.Fragment key={course.id}>
                                <tr className="course-row">
                                    <td>{course.title}</td>
                                    <td>{course.teacher}</td>
                                    <td>
                                        <button 
                                            className="btn btn-link" 
                                            onClick={() => toggleDescription(course.id)} // Переключение описания курса
                                        >
                                            {expandedCourseId === course.id ? "Свернуть" : "Развернуть"}
                                        </button>
                                    </td>
                                    <td>
                                        <div className="button-group">
                                            <button 
                                                className="list-courses-btn list-courses-btn-info btn-sm mx-1" 
                                                onClick={() => manageStudents(course.id)}
                                            >
                                                Управление студентами
                                            </button>
                                            <button 
                                                className="list-courses-btn list-courses-btn-warning btn-sm mx-1" 
                                                onClick={() => updateCourse(course.id)}
                                            >
                                                Редактировать
                                            </button>
                                            <button 
                                                className="list-courses-btn list-courses-btn-danger btn-sm mx-1" 
                                                onClick={() => deleteCourse(course.id)}
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {expandedCourseId === course.id && (
                                    <tr>
                                        <td colSpan="4" className="course-description">
                                            {course.description} {/* Отображение описания курса */}
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">Курсы отсутствуют</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ListOfCourses