package com.expensetracker.expense_tracker.service;

import com.expensetracker.expense_tracker.dto.RegisterRequestDTO;
import com.expensetracker.expense_tracker.entity.Role;
import com.expensetracker.expense_tracker.entity.User;
import com.expensetracker.expense_tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public String register(RegisterRequestDTO request) {

        // Check if email exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // Create user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        return "User registered successfully";
    }
}