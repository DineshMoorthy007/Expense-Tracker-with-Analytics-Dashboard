package com.expensetracker.expense_tracker.controller;

import com.expensetracker.expense_tracker.dto.ChangePasswordDTO;
import com.expensetracker.expense_tracker.dto.LoginRequestDTO;
import com.expensetracker.expense_tracker.dto.RegisterRequestDTO;
import com.expensetracker.expense_tracker.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequestDTO request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequestDTO request) {
        return authService.login(request);
    }

    @PostMapping("/change-password")
    public String changePassword(@RequestBody ChangePasswordDTO request) {
        return authService.changePassword(request);
    }
}