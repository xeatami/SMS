import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import HomePage from "./components/HomePage"
import AuthPage from "./components/LoginPage"
import AddStudent from "./components/AddStudent"
import AddCourse from "./components/AddCourse"
import ListOfStudents from "./components/ListOfStudents"
import ListOfCourses from "./components/ListOfCourses"
import CourseManagement from "./components/CourseManagement"
import UpdateStudent from "./components/UpdateStudent"
import UpdateCourse from "./components/UpdateCourse"
import ProtectedRoute from "./components/ProtectedRoute"
import UserProfile from "./components/UserProfile"
import StudentProfile from "./components/StudentProfile"
import GradesPage from "./components/GradesPage"
import AdminPage from "./components/AdminPage"

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false) // Состояние для аутентификации
    const [isSidebarVisible, setSidebarVisible] = useState(true) // Состояние для видимости боковой панели

    // Проверка наличия токена аутентификации при монтировании компонента
    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem("token"))
    }, [])
    
    // Функция для переключения видимости боковой панели
    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible)
    }

    return (
        <BrowserRouter>
            <Sidebar 
                isAuthenticated={isAuthenticated} 
                setIsAuthenticated={setIsAuthenticated} 
                isOpen={isSidebarVisible} 
                toggleSidebar={toggleSidebar} 
            />
            <div style={{ marginLeft: isSidebarVisible ? "270px" : "20px", transition: "margin-left 0.3s ease", padding: "20px" }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/auth" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/students" element={<ProtectedRoute element={<ListOfStudents />} allowedRoles={["TEACHER", "ADMIN"]} />} />
                    <Route path="/courses" element={<ProtectedRoute element={<ListOfCourses />} allowedRoles={["TEACHER", "ADMIN"]} />} />
                    <Route path="/addStudent" element={<ProtectedRoute element={<AddStudent />} allowedRoles={["TEACHER", "ADMIN"]} />} />
                    <Route path="/addCourse" element={<ProtectedRoute element={<AddCourse />} allowedRoles={["TEACHER", "ADMIN"]} />} />
                    <Route path="/updateStudent/:id" element={<ProtectedRoute element={<UpdateStudent />} allowedRoles={["TEACHER", "ADMIN"]} />} />
                    <Route path="/updateCourse/:id" element={<ProtectedRoute element={<UpdateCourse />} allowedRoles={["TEACHER", "ADMIN"]} />} />
                    <Route path="/adminPage" element={<ProtectedRoute element={<AdminPage />} allowedRoles={["ADMIN"]} />} />
                    <Route path="/userProfile" element={<ProtectedRoute element={<UserProfile />} allowedRoles={["TEACHER", "ADMIN"]} />} />
                    <Route path="/grades/:studentId/courses/:courseId" element={<ProtectedRoute element={<GradesPage />} allowedRoles={["TEACHER", "ADMIN"]} />} />
                    <Route path="/students/:studentId" element={<ProtectedRoute element={<StudentProfile />} allowedRoles={["TEACHER", "ADMIN"]} />} />
                    <Route path="/manageCourse/:courseId" element={<ProtectedRoute element={<CourseManagement />} allowedRoles={["TEACHER", "ADMIN"]} />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App