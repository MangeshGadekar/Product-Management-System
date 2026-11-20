package com.backendseries.offsetpagination.controller;

import com.backendseries.offsetpagination.dto.DashboardStatsResponse;
import com.backendseries.offsetpagination.dto.PaginatedResponse;
import com.backendseries.offsetpagination.entity.Product;
import com.backendseries.offsetpagination.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    @GetMapping("/dashboard/stats")
    public DashboardStatsResponse getDashboardStats() {
        return productService.getDashboardStats();
    }

    @GetMapping
    public PaginatedResponse getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false)BigDecimal minPrice,
            @RequestParam(required = false)BigDecimal maxPrice,
            @RequestParam(required = false) String search)
    {
        return productService.getAllProducts(
                page,
                size,
                sortBy,
                direction,
                category,
                brand,
                minPrice,
                maxPrice,
                search);
    }
}


