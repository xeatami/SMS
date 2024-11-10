package com.studentmanagement.mapper;

import com.studentmanagement.dto.UserDTO;
import com.studentmanagement.entity.MyUser;
import org.springframework.stereotype.Component;

/**
 * Маппер для преобразования MyUser и UserDTO
 */
@Component
public class UserMapper {

    public UserDTO toDTO(MyUser user) {
        if (user == null) {
            return null;
        }
        return new UserDTO(user.getId(), user.getUsername(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getRole());
    }

    public MyUser toEntity(UserDTO userDTO) {
        if (userDTO == null) {
            return null;
        }
        return MyUser.builder()
                .id(userDTO.getId())
                .username(userDTO.getUsername())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .email(userDTO.getEmail())
                .role(userDTO.getRole())
                .build();
    }
}