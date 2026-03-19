package com.expensetracker.expense_tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MonthlyExpenseDTO {
    private int month;
    private Double total;
}