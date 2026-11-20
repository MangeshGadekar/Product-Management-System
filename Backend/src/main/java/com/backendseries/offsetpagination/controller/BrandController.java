package com.backendseries.offsetpagination.controller;

import com.backendseries.offsetpagination.entity.Brand;
import com.backendseries.offsetpagination.repository.BrandRepository;
import com.backendseries.offsetpagination.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/brand")
public class BrandController {

    private final BrandRepository brandRepository;
    private final ProductRepository productRepository;

    @GetMapping()
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    @GetMapping("by-category")
    public List<Brand> getBrandsByCategory(
            @RequestParam String category )
    {
        return productRepository.findDistinctBrandsByCategory(category);
    }
}
