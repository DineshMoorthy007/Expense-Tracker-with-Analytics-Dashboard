package com.expensetracker.expense_tracker.controller;

import com.expensetracker.expense_tracker.dto.ApiResponse;
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
    public ApiResponse<String> register(@RequestBody RegisterRequestDTO request) {
        String result = authService.register(request);
        return new ApiResponse<>("success", result, null);
    }

    @PostMapping("/login")
    public ApiResponse<String> login(@RequestBody LoginRequestDTO request) {
        String token = authService.login(request);
        return new ApiResponse<>("success", "Login successful", token);
    }

    @PostMapping("/change-password")
    public ApiResponse<String> changePassword(@RequestBody ChangePasswordDTO request) {
        String result = authService.changePassword(request);
        return new ApiResponse<>("success", result, null);
    }
}