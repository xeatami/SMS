import { useEffect, useState } from "react"
import { unassignStudentFromCourse, assignStudentToCourse } from "../services/StudentService"
import { listOfAssignedStudents, listOfUnassignedStudents } from "../services/CourseService"
import "../css/CourseManagement.css"
import { useParams } from "react-router-dom"

const CourseManagement = () => {
    const { courseId } = useParams() // Получение ID курса из URL
    const [students, setStudents] = useState([]) // Список назначенных студентов
    const [unassignedStudents, setUnassignedStudents] = useState([]) // Список не назначенных студентов
    const [selectedStudentId, setSelectedStudentId] = useState("") // Выбранный студент для назначения
    const [assigning, setAssigning] = useState(false) // Состояние назначения студента

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await listOfAssignedStudents(courseId) // Получение назначенных студентов
            setStudents(response.data) // Установка назначенных студентов
        }
        fetchStudents()
    }, [courseId]) // Загрузка студентов при изменении курса

    useEffect(() => {
        const fetchUnassignedStudents = async () => {
            const response = await listOfUnassignedStudents(courseId) // Получение не назначенных студентов
            setUnassignedStudents(response.data) // Установка не назначенных студентов
        }
        fetchUnassignedStudents()
    }, [courseId]) // Загрузка не назначенных студентов при изменении курса

    const handleUnassignStudent = async (studentId) => {
        await unassignStudentFromCourse(studentId, courseId) // Отчисление студента
        const updatedAssignedStudents = await listOfAssignedStudents(courseId) // Обновление списка назначенных студентов
        setStudents(updatedAssignedStudents.data) // Установка обновленного списка
        const updatedUnassignedStudents = await listOfUnassignedStudents(courseId) // Обновление списка не назначенных студентов
        setUnassignedStudents(updatedUnassignedStudents.data) // Установка обновленного списка
    }

    const handleAssignStudent = async () => {
        if (!selectedStudentId) return // Если студент не выбран, ничего не делать

        setAssigning(true) // Установка состояния
        try {
            await assignStudentToCourse(selectedStudentId, courseId) // Назначение студента
            const updatedAssignedStudents = await listOfAssignedStudents(courseId) // Обновление списка назначенных студентов
            setStudents(updatedAssignedStudents.data) // Установка обновленного списка
            const updatedUnassignedStudents = await listOfUnassignedStudents(courseId) // Обновление списка не назначенных студентов
            setUnassignedStudents(updatedUnassignedStudents.data) // Установка обновленного списка
            setSelectedStudentId("") // Сброс выбора студента
        } catch (error) {
            console.error("Ошибка при назначении студента:", error) // Вывод ошибки в консоль
        } finally {
            setAssigning(false) // Сброс состояния назначения
        }
    }

    return (
        <div className="course-management-container">
            <h2 className="course-management-title">Студенты этого курса</h2>
            <div className="course-management-students-grid">
                {students.length > 0 ? ( // Проверка наличия студентов
                    students.map(student => (
                        <div className="course-management-student-card" key={student.id}>
                            <div className="course-management-card-content">
                                <h5 className="course-management-student-name">{student.firstName} {student.lastName}</h5>
                                <p className="course-management-student-email">Email: {student.email}</p>
                                <button
                                    className="course-management-btn course-management-btn-danger"
                                    onClick={() => handleUnassignStudent(student.id)} // Обработка отчисления студента
                                >
                                    Отчислить
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Студенты отсутствуют.</p>
                )}
            </div>

            <h3 className="course-management-assign-title">Назначить студента</h3>
            <select
                className="course-management-form-select"
                value={selectedStudentId} // Текущий выбранный студент
                onChange={e => setSelectedStudentId(e.target.value)} // Обработка выбора студента
            >
                <option value="">Выберите студента</option>
                {unassignedStudents.map(student => ( // Список не назначенных студентов
                    <option key={student.id} value={student.id}>
                        {student.firstName} {student.lastName}
                    </option>
                ))}
            </select>
            <button
                className="course-management-btn course-management-btn-primary mt-3"
                onClick={handleAssignStudent} // Обработка назначения студента
                disabled={!selectedStudentId || assigning} // Кнопка отключена, если студент не выбран или идет процесс назначения
            >
                {assigning ? "Назначаем..." : "Назначить студента"}
            </button>
        </div>
    )
}

export default CourseManagement