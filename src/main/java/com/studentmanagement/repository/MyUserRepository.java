package com.studentmanagement.repository;

import com.studentmanagement.entity.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Репозиторий для работы с пользователями
 */
@Repository
public interface MyUserRepository extends JpaRepository<MyUser, Long> {
    Optional<MyUser> findByUsername(String username); // Найти пользователя по имени
    Optional<MyUser> findByEmail(String email); // Найти пользователя по email
}