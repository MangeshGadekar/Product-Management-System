package com.backendseries.offsetpagination.dto;

import com.backendseries.offsetpagination.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
public class ProductResponse {

    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stockQuantity;
    private ProductStatus productStatus;

    // Assuming that category and brand are represented as strings in the response
    private String category;
    private String brand;

    private Instant createdAt;
    private Instant updatedAt;

}