import { useEffect } from "react"
import "../css/HomePage.css"

const HomePage = () => {
    useEffect(() => {
        const cards = document.querySelectorAll(".home-feature-card") // Получение всех карточек функций
        cards.forEach(card => {
            card.addEventListener("mouseenter", createParticles) // Добавление обработчика для создания частиц при наведении
            card.addEventListener("mouseleave", removeParticles) // Добавление обработчика для удаления частиц при уходе курсора
        })

        return () => {
            cards.forEach(card => {
                card.removeEventListener("mouseenter", createParticles) // Удаление обработчиков при размонтировании
                card.removeEventListener("mouseleave", removeParticles)
            })
        }
    }, [])

    const createParticles = (e) => {
        const particleContainer = document.createElement("div") // Создание контейнера для частиц
        particleContainer.className = "home-particle-container"
        e.currentTarget.appendChild(particleContainer) // Добавление контейнера к карточке

        for (let i = 0; i < 30; i++) { // Создание 30 частиц
            const particle = document.createElement("div")
            particle.className = "home-particle"
            particleContainer.appendChild(particle)

            const side = Math.floor(Math.random() * 4) // Случайный выбор стороны появления частицы
            const size = Math.random() * 10 + 5 + "px" // Случайный размер частицы
            switch (side) {
                case 0: // Верхняя сторона
                    particle.style.left = Math.random() * 100 + "%"
                    particle.style.top = "-10px"
                    break
                case 1: // Правая сторона
                    particle.style.left = "100%"
                    particle.style.top = Math.random() * 100 + "%"
                    break
                case 2: // Нижняя сторона
                    particle.style.left = Math.random() * 100 + "%"
                    particle.style.top = "100%"
                    break
                case 3: // Левая сторона
                    particle.style.left = "-10px"
                    particle.style.top = Math.random() * 100 + "%"
                    break
            }

            particle.style.width = size // Установка размера частицы
            particle.style.height = size
            particle.style.backgroundColor = "rgba(76, 175, 80, 0.7)" // Цвет частицы
            particle.style.animationDuration = Math.random() * 2 + 1 + "s" // Случайная продолжительность анимации
            particle.style.opacity = Math.random() // Случайная прозрачность
            particle.style.transition = "transform 1s, opacity 1s"
        }

        setTimeout(() => {
            particleContainer.remove() // Удаление контейнера через 1 секунду
        }, 1000)
    }

    const removeParticles = (e) => {
        const particles = e.currentTarget.querySelector(".home-particle-container") // Поиск контейнера частиц
        if (particles) {
            particles.remove() // Удаление контейнера при уходе курсора
        }
    }

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Добро пожаловать на образовательную платформу</h1>
                <p>Управляйте студентами и курсами легко и удобно</p>
            </header>
            <main className="home-main">
                <section className="home-info-section">
                    <h2>Что мы предлагаем?</h2>
                    <p>
                        Наша платформа помогает вам управлять учебным процессом,
                        отслеживать успеваемость студентов и организовывать курсы.
                    </p>
                </section>
                <section className="home-features-section">
                    <h2>Ключевые возможности</h2>
                    <div className="home-features-cards">
                        <div className="home-feature-card">
                            <h3>Добавление студентов</h3>
                            <p>Легко добавляйте и редактируйте информацию о студентах.</p>
                        </div>
                        <div className="home-feature-card">
                            <h3>Управление курсами</h3>
                            <p>Создавайте и управляйте курсами для студентов.</p>
                        </div>
                        <div className="home-feature-card">
                            <h3>Поиск и фильтрация</h3>
                            <p>Удобный поиск по студентам и курсам.</p>
                        </div>
                        <div className="home-feature-card">
                            <h3>Интуитивно понятный интерфейс</h3>
                            <p>Легкий и понятный интерфейс для всех пользователей.</p>
                        </div>
                    </div>
                </section>
                <section className="home-cta-section">
                    <h2>Готовы начать?</h2>
                    <p>Перейдите к разделам ниже:</p>
                    <div className="home-cta-buttons">
                        <a href="/students" className="home-btn">Студенты</a>
                        <a href="/courses" className="home-btn">Курсы</a>
                    </div>
                </section>
            </main>
            <footer className="home-footer">
                <p>&copy; 2025 Образовательная платформа. Все права защищены.</p>
            </footer>
        </div>
    )
}

export default HomePage