package com.expensetracker.expense_tracker.service;

import com.expensetracker.expense_tracker.dto.CategoryExpenseDTO;
import com.expensetracker.expense_tracker.dto.MonthlyExpenseDTO;
import com.expensetracker.expense_tracker.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.expensetracker.expense_tracker.entity.User;
import com.expensetracker.expense_tracker.repository.UserRepository;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public List<MonthlyExpenseDTO> getMonthlyExpenses() {

        String email = (String) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();

        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

            List<Object[]> results = expenseRepository.getMonthlyExpenses(user.getId());

        return results.stream()
            .map(obj -> new MonthlyExpenseDTO(
                    (Integer) obj[0],
                    (Double) obj[1]
            ))
            .toList();
    }

    public List<CategoryExpenseDTO> getCategoryExpenses() {

        String email = (String) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();

        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        List<Object[]> results = expenseRepository.getCategoryExpenses(user.getId());

        return results.stream()
            .map(obj -> new CategoryExpenseDTO(
                    (String) obj[0],
                    (Double) obj[1]
            ))
            .toList();
    }
}