package com.expensetracker.expense_tracker.service;

import com.expensetracker.expense_tracker.dto.ExpenseResponseDTO;
import com.expensetracker.expense_tracker.entity.Category;
import com.expensetracker.expense_tracker.entity.Expense;
import com.expensetracker.expense_tracker.entity.User;
import com.expensetracker.expense_tracker.repository.CategoryRepository;
import com.expensetracker.expense_tracker.repository.ExpenseRepository;
import com.expensetracker.expense_tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public String addExpense(String title, Double amount, Long categoryId) {

        String email = (String) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (!category.getUser().getId().equals(user.getId())) {
                throw new RuntimeException("Invalid category for this user");
        }

        Expense expense = Expense.builder()
                .title(title)
                .amount(amount)
                .date(LocalDate.now())
                .user(user)
                .category(category)
                .build();

        expenseRepository.save(expense);

        return "Expense added successfully";
    }

    public List<ExpenseResponseDTO> getUserExpenses() {

        String email = (String) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();

        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return expenseRepository.findByUserId(user.getId())
            .stream()
            .map(expense -> new ExpenseResponseDTO(
                    expense.getTitle(),
                    expense.getAmount(),
                    expense.getCategory().getName(),
                    expense.getDate()
            ))
            .toList();
    }

    public String updateExpense(Long expenseId, String title, Double amount) {

        String email = (String) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();

        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

            Expense expense = expenseRepository.findById(expenseId)
            .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getUser().getId().equals(user.getId())) {
                throw new RuntimeException("Unauthorized access");
        }

        expense.setTitle(title);
        expense.setAmount(amount);

        expenseRepository.save(expense);

        return "Expense updated successfully";
    }

    public String deleteExpense(Long expenseId) {

        String email = (String) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();

        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Expense expense = expenseRepository.findById(expenseId)
            .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getUser().getId().equals(user.getId())) {
                throw new RuntimeException("Unauthorized access");
        }

        expenseRepository.delete(expense);

        return "Expense deleted successfully";
    }
}
