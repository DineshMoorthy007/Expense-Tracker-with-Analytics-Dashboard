package com.expensetracker.expense_tracker.service;

import com.expensetracker.expense_tracker.dto.CategoryDTO;
import com.expensetracker.expense_tracker.entity.Category;
import com.expensetracker.expense_tracker.entity.User;
import com.expensetracker.expense_tracker.repository.CategoryRepository;
import com.expensetracker.expense_tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public String addCategory(String name) {

        String email = (String) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = Category.builder()
                .name(name)
                .user(user)
                .build();

        categoryRepository.save(category);

        return "Category created successfully";
    }

    public List<CategoryDTO> getCategories() {

        String email = (String) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return categoryRepository.findByUserId(user.getId())
                .stream()
                .map(cat -> new CategoryDTO(cat.getId(), cat.getName()))
                .toList();
    }

    public String deleteCategory(Long categoryId) {

        String email = (String) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (!category.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access");
        }

        categoryRepository.delete(category);

        return "Category deleted successfully";
    }
}