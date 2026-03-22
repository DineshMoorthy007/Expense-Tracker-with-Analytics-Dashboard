package com.expensetracker.expense_tracker.controller;

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

    // Add Expense
    @PostMapping
    public String addExpense(
            @RequestParam String title,
            @RequestParam Double amount,
            @RequestParam Long categoryId
    ) {
        return expenseService.addExpense(title, amount, categoryId);
    }

    @GetMapping
    public List<ExpenseResponseDTO> getExpenses() {
        return expenseService.getUserExpenses();
    }

    @PutMapping("/{id}")
    public String updateExpense(
        @PathVariable Long id,
        @RequestParam String title,
        @RequestParam Double amount
    ) {
        return expenseService.updateExpense(id, title, amount);
    }

    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable Long id) {
        return expenseService.deleteExpense(id);
    }
}