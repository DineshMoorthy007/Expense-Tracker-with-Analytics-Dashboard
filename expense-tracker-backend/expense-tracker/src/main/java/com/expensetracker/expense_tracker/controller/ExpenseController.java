package com.expensetracker.expense_tracker.controller;

import com.expensetracker.expense_tracker.dto.ApiResponse;
import com.expensetracker.expense_tracker.dto.ExpenseResponseDTO;
import com.expensetracker.expense_tracker.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public ApiResponse<String> addExpense(
            @RequestParam String title,
            @RequestParam Double amount,
            @RequestParam Long categoryId
    ) {
        String result = expenseService.addExpense(title, amount, categoryId);
        return new ApiResponse<>("success", result, null);
    }

    @GetMapping
    public ApiResponse<List<ExpenseResponseDTO>> getExpenses() {
        List<ExpenseResponseDTO> data = expenseService.getUserExpenses();
        return new ApiResponse<>("success", "Expenses fetched successfully", data);
    }

    @PutMapping("/{id}")
    public ApiResponse<String> updateExpense(
            @PathVariable Long id,
            @RequestParam String title,
            @RequestParam Double amount
    ) {
        String result = expenseService.updateExpense(id, title, amount);
        return new ApiResponse<>("success", result, null);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteExpense(@PathVariable Long id) {
        String result = expenseService.deleteExpense(id);
        return new ApiResponse<>("success", result, null);
    }
}