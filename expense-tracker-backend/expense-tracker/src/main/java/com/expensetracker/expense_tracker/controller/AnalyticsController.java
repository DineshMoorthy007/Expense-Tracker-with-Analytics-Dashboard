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

    // GET: /api/analytics/monthly?userId=1
    @GetMapping("/monthly")
    public List<MonthlyExpenseDTO> getMonthlyExpenses(@RequestParam Long userId) {
        return analyticsService.getMonthlyExpenses(userId);
    }

    // GET: /api/analytics/category?userId=1
    @GetMapping("/category")
    public List<CategoryExpenseDTO> getCategoryExpenses(@RequestParam Long userId) {
        return analyticsService.getCategoryExpenses(userId);
    }
}