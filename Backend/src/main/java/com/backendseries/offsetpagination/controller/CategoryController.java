package com.backendseries.offsetpagination.controller;

import com.backendseries.offsetpagination.entity.Category;
import com.backendseries.offsetpagination.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    @GetMapping()
    public List<Category> getAllCategory (){
        return categoryRepository.findAll();
    }
}
