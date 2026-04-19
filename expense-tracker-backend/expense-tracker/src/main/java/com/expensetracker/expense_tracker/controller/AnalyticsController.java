package com.expensetracker.expense_tracker.controller;

import com.expensetracker.expense_tracker.dto.ApiResponse;
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
    public ApiResponse<List<MonthlyExpenseDTO>> getMonthly() {
        List<MonthlyExpenseDTO> data = analyticsService.getMonthlyExpenses();
        return new ApiResponse<>("success", "Monthly analytics fetched", data);
    }

    @GetMapping("/category")
    public ApiResponse<List<CategoryExpenseDTO>> getCategory() {
        List<CategoryExpenseDTO> data = analyticsService.getCategoryExpenses();
        return new ApiResponse<>("success", "Category analytics fetched", data);
    }
}