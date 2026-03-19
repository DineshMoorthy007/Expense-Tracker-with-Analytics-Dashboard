package com.expensetracker.expense_tracker.service;

import com.expensetracker.expense_tracker.dto.CategoryExpenseDTO;
import com.expensetracker.expense_tracker.dto.MonthlyExpenseDTO;
import com.expensetracker.expense_tracker.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final ExpenseRepository expenseRepository;

    public List<MonthlyExpenseDTO> getMonthlyExpenses(Long userId) {
        List<Object[]> results = expenseRepository.getMonthlyExpenses(userId);

        return results.stream()
                .map(obj -> new MonthlyExpenseDTO(
                        (Integer) obj[0],
                        (Double) obj[1]
                ))
                .toList();
    }

    public List<CategoryExpenseDTO> getCategoryExpenses(Long userId) {
        List<Object[]> results = expenseRepository.getCategoryExpenses(userId);

        return results.stream()
                .map(obj -> new CategoryExpenseDTO(
                        (String) obj[0],
                        (Double) obj[1]
                ))
                .toList();
    }
}