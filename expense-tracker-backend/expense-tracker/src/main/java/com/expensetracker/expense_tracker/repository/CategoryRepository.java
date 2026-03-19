package com.expensetracker.expense_tracker.repository;

import com.expensetracker.expense_tracker.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByUserId(Long userId);
}