package com.studentmanagement.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Конфигурация CORS для приложения
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Настройка CORS
     *
     * @param registry Реестр CORS
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Разрешенные пути
                .allowPrivateNetwork(true) // Доступ из частных сетей
                .allowedOrigins("http://localhost:3000") // Разрешенные источники
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Разрешенные HTTP-методы
                .allowedHeaders("*") // Разрешенные заголовки
                .allowCredentials(true); // Отправка учетных данных
    }
}