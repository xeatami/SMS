import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getStudentById, listOfAssignedCourses } from "../services/StudentService"
import "../css/StudentProfile.css"

const StudentProfile = () => {
    const { studentId } = useParams() // Получение ID студента из URL
    const [student, setStudent] = useState(null) // Состояние для хранения информации о студенте
    const [courses, setCourses] = useState([]) // Состояние для хранения списка курсов

    useEffect(() => {
        const fetchStudent = async () => {
            const response = await getStudentById(studentId) // Запрос на получение информации о студенте
            setStudent(response.data) // Установка полученных данных о студенте
        }

        const fetchCourses = async () => {
            const response = await listOfAssignedCourses(studentId) // Запрос на получение курсов студента
            setCourses(response.data) // Установка полученных курсов
        }

        fetchStudent() // Вызов функции для получения информации о студенте
        fetchCourses() // Вызов функции для получения курсов
    }, [studentId]) // Зависимость от studentId

    return (
        <div className="student-profile">
            {student && (
                <div className="student-profile__card">
                    <h2>{student.firstName} {student.lastName}</h2> {/* Имя и фамилия студента */}
                    <p>Email: {student.email}</p> {/* Email студента */}
                </div>
            )}
            <h3>Курсы</h3>
            <div className="student-profile__course-list">
                {courses.map(course => (
                    <Link to={`/grades/${studentId}/courses/${course.id}`} key={course.id} className="student-profile__course-card">
                        <h4>{course.title}</h4> {/* Название курса */}
                        <p>{course.description}</p> {/* Описание курса */}
                        <p>Преподаватель: {course.teacher}</p> {/* Имя преподавателя */}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default StudentProfile