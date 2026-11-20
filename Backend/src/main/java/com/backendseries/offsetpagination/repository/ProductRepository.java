package com.backendseries.offsetpagination.repository;

import com.backendseries.offsetpagination.entity.Brand;
import com.backendseries.offsetpagination.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends
        JpaRepository<Product, Long>,
        JpaSpecificationExecutor<Product> {

    Long countByStockQuantityLessThanEqual(Integer stockQuantity);

    //
    @Query("""
        SELECT DISTINCT p.brand
        FROM Product p
        WHERE p.category.name = :category
        ORDER BY p.brand.name
    """)
    List<Brand> findDistinctBrandsByCategory(@Param("category") String category);
}
