package com.expensetracker.expense_tracker.controller;

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
}