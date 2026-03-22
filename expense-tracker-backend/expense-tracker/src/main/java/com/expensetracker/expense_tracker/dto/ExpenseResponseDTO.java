package com.expensetracker.expense_tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class ExpenseResponseDTO {

    private String title;
    private Double amount;
    private String category;
    private LocalDate date;
}