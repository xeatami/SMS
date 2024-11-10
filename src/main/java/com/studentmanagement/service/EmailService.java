package com.studentmanagement.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

/**
 * Сервис для работы с электронной почтой
 */
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender emailSender;

    /**
     * Отправка электронного письма
     *
     * @param to Получатель
     * @param subject Тема письма
     * @param htmlContent HTML-содержимое письма
     */
    public void sendEmail(String to, String subject, String htmlContent) {
        MimeMessage message = emailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            emailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace(); // TODO: Улучшить обработку ошибок
        }
    }

    /**
     * Построение приветственного письма
     *
     * @param username Имя пользователя
     * @param generatedPassword Сгенерированный пароль
     * @return HTML-содержимое приветственного письма
     */
    public String buildWelcomeEmail(String username, String generatedPassword) {
        return "<html>" +
                "<head>" +
                "<style>" +
                "    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f0f0f0; }" +
                "    .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); }" +
                "    .header { border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-bottom: 20px; }" +
                "    h1 { margin: 0; font-size: 26px; color: #333; }" +
                "    p { line-height: 1.5; color: #555; font-size: 16px; }" +
                "    .password { font-size: 18px; font-weight: bold; color: #007bff; }" +
                "    .footer { margin-top: 20px; font-size: 14px; color: #aaa; text-align: center; }" +
                "    .button { display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; transition: background-color 0.3s; }" +
                "    .button:hover { background-color: #0056b3; }" +
                "    @media (max-width: 600px) { .container { padding: 20px; } h1 { font-size: 24px; } }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='container'>" +
                "<div class='header'>" +
                "<h1>Добро пожаловать, " + username + "!</h1>" +
                "</div>" +
                "<p>Вы успешно зарегистрированы в нашей системе.</p>" +
                "<p>Ваш временный пароль: <span class='password'>" + generatedPassword + "</span></p>" +
                "<p>Вы можете сменить его в личном кабинете после входа в систему.</p>" +
                "<a href='#' class='button'>Перейти в личный кабинет</a>" +
                "<div class='footer'>" +
                "<p>С уважением,<br>Команда поддержки</p>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
    }
}