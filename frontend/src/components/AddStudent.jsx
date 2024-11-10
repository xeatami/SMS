import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addStudent } from "../services/StudentService"

const AddStudent = () => {
    const [firstName, setFirstName] = useState("") // Состояние для имени студента
    const [lastName, setLastName] = useState("") // Состояние для фамилии студента
    const [email, setEmail] = useState("") // Состояние для электронной почты студента
    const [birthDate, setBirthDate] = useState("") // Состояние для даты рождения студента
    const [error, setError] = useState("") // Состояние для хранения сообщений об ошибках
    const navigator = useNavigate() // Хук для навигации

    function saveStudent(e) {
        e.preventDefault() // Предотвращение перезагрузки страницы

        const student = { firstName, lastName, email, birthDate } // Объект с данными студента
        if (!email) {
            setError("Email обязателен.") // Проверка на обязательность email
            return
        }
        
        addStudent(student).then(response => {
            console.log("Добавлен новый студент")
            console.log(student)
            console.log(response.data)
            navigator("/students") // Перенаправление на страницу со списком студентов
        }).catch(err => {
            setError("Ошибка при добавлении студента: " + err.message) // Обработка ошибок
        });
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center">Добавить студента</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <form onSubmit={saveStudent}>
                                <div className="form-group mb-3">
                                    <label className="form-label">Имя:</label>
                                    <input
                                        type="text"
                                        placeholder="Введите имя студента"
                                        name="firstName"
                                        value={firstName}
                                        className="form-control"
                                        onChange={e => setFirstName(e.target.value)} // Обработка изменения имени
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label">Фамилия:</label>
                                    <input
                                        type="text"
                                        placeholder="Введите фамилию студента"
                                        name="lastName"
                                        value={lastName}
                                        className="form-control"
                                        onChange={e => setLastName(e.target.value)} // Обработка изменения фамилии
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        placeholder="Введите email студента"
                                        name="email"
                                        value={email}
                                        className={`form-control ${error ? "is-invalid" : ""}`} // Отображение ошибки
                                        onChange={e => {
                                            setEmail(e.target.value) // Обработка изменения email
                                            if (error) setError("") // Сброс ошибки
                                        }}
                                    />
                                    {error && <div className="invalid-feedback">{error}</div>} {/* Сообщение об ошибке */}
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label">Дата рождения:</label>
                                    <input
                                        type="date"
                                        name="birthday"
                                        value={birthDate}
                                        className="form-control"
                                        onChange={e => setBirthDate(e.target.value)} // Обработка изменения даты рождения
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

export default AddStudent