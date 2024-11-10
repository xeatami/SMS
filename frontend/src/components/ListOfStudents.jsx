import { useEffect, useState } from "react"
import { deleteStudentById, listOfStudents } from "../services/StudentService"
import { useNavigate } from "react-router-dom"
import "../css/ListOfStudents.css"

const ListOfStudents = () => {
    const [students, setStudents] = useState([]) // Состояние для списка студентов
    const [searchQuery, setSearchQuery] = useState("") // Состояние для поискового запроса
    const navigate = useNavigate() // Хук для навигации

    useEffect(() => {
        const fetchData = async () => {
            try {
                await loadStudents() // Загрузка студентов
            } catch (error) {
                console.error("Ошибка загрузки данных:", error) // Обработка ошибок загрузки
            }
        }

        fetchData() // Вызов функции загрузки данных
    }, [])

    const loadStudents = async () => {
        try {
            const response = await listOfStudents() // Запрос на получение списка студентов
            setStudents(response.data) // Установка полученных студентов в состояние
        } catch (error) {
            console.error("Ошибка загрузки студентов:", error) // Обработка ошибок загрузки студентов
        }
    }

    const viewProfile = (id) => {
        navigate(`/students/${id}`) // Переход к профилю студента
    }

    const editStudent = (id) => {
        navigate(`/updateStudent/${id}`) // Переход к редактированию студента
    }

    const deleteStudent = async (id) => {
        try {
            await deleteStudentById(id) // Удаление студента по ID
            setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id)) // Обновление списка студентов
        } catch (error) {
            console.error("Ошибка удаления студента:", error) // Обработка ошибок удаления
        }
    }

    const filteredStudents = students.filter((student) => 
        student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) // Фильтрация студентов по имени или фамилии
    )

    return (
        <div className="list-students-container mt-5">
            <h2 className="text-center">Список студентов</h2>
            <div className="d-flex justify-content-end mb-3">
                <input 
                    type="text" 
                    placeholder="Поиск по ФИО"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Обработка изменения поискового запроса
                    className="form-control w-25"
                />
            </div>
            <table className="list-students-table table table-striped table-bordered">
                <thead>
                    <tr>
                        <th style={{ width: '150px' }}>Имя студента</th>
                        <th style={{ width: '150px' }}>Фамилия студента</th>
                        <th style={{ width: '150px' }}>Email студента</th>
                        <th style={{ width: '80px' }}>Дата рождения</th>
                        <th style={{ width: '200px' }}>Курсы</th>
                        <th style={{ width: '200px' }}>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map(student => (
                            <tr key={student.id} className="student-row">
                                <td>{student.firstName}</td>
                                <td>{student.lastName}</td>
                                <td>{student.email}</td>
                                <td>{student.birthDate}</td>
                                <td>
                                    {student.courses.length > 0 ? (
                                        student.courses.map(course => (
                                            <div key={course.id}>{course.title}</div> // Отображение курсов студента
                                        ))
                                    ) : (
                                        "Нет курсов" // Сообщение, если у студента нет курсов
                                    )}
                                </td>
                                <td style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <button className="list-students-btn list-students-btn-success btn-sm" onClick={() => viewProfile(student.id)}>Просмотр профиля</button>
                                    <button className="list-students-btn list-students-btn-warning btn-sm" onClick={() => editStudent(student.id)}>Редактировать</button>
                                    <button className="list-students-btn list-students-btn-danger btn-sm" onClick={() => deleteStudent(student.id)}>Удалить</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">Студенты отсутствуют</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ListOfStudents