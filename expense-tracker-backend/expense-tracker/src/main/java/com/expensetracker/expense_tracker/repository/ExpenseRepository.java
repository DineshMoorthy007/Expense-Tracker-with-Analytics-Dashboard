package com.expensetracker.expense_tracker.repository;

import com.expensetracker.expense_tracker.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUserId(Long userId);

    List<Expense> findByUserIdAndDateBetween(Long userId, LocalDate start, LocalDate end);

    List<Expense> findByCategoryId(Long categoryId);

    @Query("""
        SELECT MONTH(e.date), SUM(e.amount)
        FROM Expense e
        WHERE e.user.id = :userId
        GROUP BY MONTH(e.date)
        ORDER BY MONTH(e.date)
    """)
    List<Object[]> getMonthlyExpenses(@Param("userId") Long userId);

    @Query("""
        SELECT e.category.name, SUM(e.amount)
        FROM Expense e
        WHERE e.user.id = :userId
        GROUP BY e.category.name
    """)
    List<Object[]> getCategoryExpenses(@Param("userId") Long userId);
}