package com.expensetracker.expense_tracker.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequestDTO {

    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    @Size(min = 6)
    private String password;
}