import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
    listOfGrades,
    createGrade,
    updateGrade,
    deleteGradeById,
} from "../services/GradeService"
import "../css/GradesPage.css"

const GradesPage = () => {
    const { studentId, courseId } = useParams() // Получение ID студента и курса
    const [grades, setGrades] = useState([]) // Список оценок
    const [newGrade, setNewGrade] = useState({ date: "", value: "" }) // Данные для новой оценки
    const [editingGrade, setEditingGrade] = useState(null) // Оценка для редактирования
    const [errorMessage, setErrorMessage] = useState("") // Сообщение об ошибке

    useEffect(() => {
        fetchGrades() // Загрузка оценок при изменении studentId или courseId
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studentId, courseId])

    const fetchGrades = async () => {
        try {
            const response = await listOfGrades() // Получение всех оценок
            const filteredGrades = response.data.filter(grade =>
                grade.studentId === parseInt(studentId) && grade.courseId === parseInt(courseId) // Фильтрация оценок по студенту и курсу
            )
            setGrades(filteredGrades) // Установка отфильтрованных оценок
        } catch (error) {
            console.error("Ошибка при загрузке оценок:", error) // Вывод ошибки в консоль
        }
    }

    const handleAddOrUpdateGrade = async () => {
        if (!newGrade.date || newGrade.value === "") { // Проверка заполнения полей
            setErrorMessage("Пожалуйста, укажите дату и оценку.")
            return
        }

        try {
            if (editingGrade) { // Если редактирование
                await updateGrade(editingGrade.id, { ...newGrade, studentId, courseId }) // Обновление оценки
                setEditingGrade(null) // Сброс редактирования
            } else { // Если добавление
                await createGrade({ ...newGrade, studentId, courseId }) // Создание новой оценки
            }
            setNewGrade({ date: "", value: "" }) // Сброс полей
            setErrorMessage("") // Сброс сообщения об ошибке
            fetchGrades() // Обновление списка оценок
        } catch (error) {
            console.error("Ошибка при добавлении/обновлении оценки:", error) // Вывод ошибки в консоль
            setErrorMessage("Произошла ошибка при сохранении оценки.") // Установка сообщения об ошибке
        }
    }

    const handleEditGrade = (grade) => {
        setEditingGrade(grade) // Установка оценки для редактирования
        setNewGrade({ date: grade.date, value: grade.value }) // Заполнение полей данными оценки
        setErrorMessage("") // Сброс сообщения об ошибке
    }

    const handleDeleteGrade = async (id) => {
        await deleteGradeById(id) // Удаление оценки
        fetchGrades() // Обновление списка оценок
    }

    return (
        <div className="grades-page">
            <h1 className="grades-page__title">Оценки</h1>
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Отображение сообщения об ошибке */}
            <table className="grades-page__table">
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Оценка</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.length > 0 ? (
                        grades.map((grade) => (
                            <tr key={grade.id}>
                                <td>{new Date(grade.date).toLocaleDateString()}</td> {/* Форматирование даты */}
                                <td>{grade.value}</td>
                                <td>
                                    <button className="grades-page__button" onClick={() => handleEditGrade(grade)}>Редактировать</button>
                                    <button className="grades-page__button" onClick={() => handleDeleteGrade(grade.id)}>Удалить</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">Нет оценок</td> {/* Сообщение, если нет оценок */}
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="grades-page__form">
                <h2 className="grades-page__form-title">{editingGrade ? "Редактировать оценку" : "Добавить новую оценку"}</h2>
                <input
                    className="grades-page__input"
                    type="date"
                    value={newGrade.date}
                    onChange={(e) => setNewGrade({ ...newGrade, date: e.target.value })} // Обработка изменения даты
                />
                <input
                    className="grades-page__input"
                    type="number"
                    value={newGrade.value}
                    onChange={(e) => setNewGrade({ ...newGrade, value: e.target.value })} // Обработка изменения оценки
                    placeholder="Оценка"
                    min="0"
                    max="100"
                />
                <button className="grades-page__button" onClick={handleAddOrUpdateGrade}>
                    {editingGrade ? "Обновить" : "Добавить"} {/* Кнопка для добавления или обновления */}
                </button>
                {editingGrade && (
                    <button className="grades-page__button grades-page__button--cancel" onClick={() => setEditingGrade(null)}>Отменить</button> // Кнопка для отмены редактирования
                )}
            </div>
        </div>
    )
}

export default GradesPage