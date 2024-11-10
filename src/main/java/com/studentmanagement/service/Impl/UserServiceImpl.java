package com.studentmanagement.service.Impl;

import com.studentmanagement.entity.Role;
import com.studentmanagement.entity.MyUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * Реализация UserDetails для работы с Spring Security
 */
@Data
@AllArgsConstructor
public class UserServiceImpl implements UserDetails {

    private Long id;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private Role role;
    private String email;

    public static UserServiceImpl build(MyUser myUser) {
        return new UserServiceImpl(
                myUser.getId(),
                myUser.getUsername(),
                myUser.getPassword(),
                myUser.getFirstName(),
                myUser.getLastName(),
                myUser.getRole(),
                myUser.getEmail()
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}