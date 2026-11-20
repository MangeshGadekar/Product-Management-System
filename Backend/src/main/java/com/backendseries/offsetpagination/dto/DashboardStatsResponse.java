package com.backendseries.offsetpagination.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DashboardStatsResponse {

    private long totalProducts;
    private long totalCategories;
    private long totalBrands;
    private long lowStockProducts;
}