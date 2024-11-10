package com.studentmanagement.service;

import com.studentmanagement.entity.MyUser;
import com.studentmanagement.repository.MyUserRepository;
import com.studentmanagement.service.Impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Сервис для работы с пользователями
 */
@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final MyUserRepository myUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MyUser myUser = myUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь '" + username + "' не найден"));
        return UserServiceImpl.build(myUser);
    }
}