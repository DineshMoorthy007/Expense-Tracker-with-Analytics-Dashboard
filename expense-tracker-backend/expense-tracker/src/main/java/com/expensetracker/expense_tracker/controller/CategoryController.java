package com.expensetracker.expense_tracker.controller;

import com.expensetracker.expense_tracker.dto.ApiResponse;
import com.expensetracker.expense_tracker.dto.CategoryDTO;
import com.expensetracker.expense_tracker.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ApiResponse<String> addCategory(@RequestParam String name) {
        String result = categoryService.addCategory(name);
        return new ApiResponse<>("success", result, null);
    }

    @GetMapping
    public ApiResponse<List<CategoryDTO>> getCategories() {
        List<CategoryDTO> data = categoryService.getCategories();
        return new ApiResponse<>("success", "Categories fetched", data);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteCategory(@PathVariable Long id) {
        String result = categoryService.deleteCategory(id);
        return new ApiResponse<>("success", result, null);
    }
}