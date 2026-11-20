package com.backendseries.offsetpagination.service;

import com.backendseries.offsetpagination.dto.DashboardStatsResponse;
import com.backendseries.offsetpagination.dto.PaginatedResponse;
import com.backendseries.offsetpagination.dto.ProductResponse;
import com.backendseries.offsetpagination.entity.Product;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService {

    // for creating a new product.
    Product createProduct(Product product);

    // for retrieving all products with pagination support.
    PaginatedResponse getAllProducts(
            int page,
            int size,
            String sortBy,
            String direction,
            String category,
            String brand,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String search );

    Long getTotalCategoriesCount();

    DashboardStatsResponse getDashboardStats();

}
