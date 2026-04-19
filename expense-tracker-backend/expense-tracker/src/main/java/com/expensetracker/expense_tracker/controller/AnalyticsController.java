package com.expensetracker.expense_tracker.controller;

import com.expensetracker.expense_tracker.dto.CategoryExpenseDTO;
import com.expensetracker.expense_tracker.dto.MonthlyExpenseDTO;
import com.expensetracker.expense_tracker.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/monthly")
    public List<MonthlyExpenseDTO> getMonthly() {
        return analyticsService.getMonthlyExpenses();
    }

    @GetMapping("/category")
    public List<CategoryExpenseDTO> getCategory() {
        return analyticsService.getCategoryExpenses();
    }
}