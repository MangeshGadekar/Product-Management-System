package com.backendseries.offsetpagination.specification;

import com.backendseries.offsetpagination.entity.Product;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;

public class ProductSpecification {

    // filtering by category
    public static Specification<Product> hasCategory(String category) {

        return (root, query, criteriaBuilder) -> {

            if (category == null || category.isBlank())
                return criteriaBuilder.conjunction();

            return criteriaBuilder.equal(
                    root.get("category").get("name"),
                    category
            );
        };
    }

    //  filtering by brand
    public static Specification<Product> hasBrand(String brand) {
        return (root, query, criteriaBuilder) -> {

            if (brand == null || brand.isBlank()) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.equal(
                    root.get("brand").get("name"),
                    brand
            );
        };
    }

    // filtering by price range
    public static Specification<Product> hasPriceBetween(
            BigDecimal minPrice,
            BigDecimal maxPrice) {

        return (root, query, criteriaBuilder) -> {

            if(minPrice == null && maxPrice == null)
            {
                return criteriaBuilder.conjunction();
            }

            if(minPrice == null)
            {
                return criteriaBuilder.lessThanOrEqualTo(
                        root.get("price"),
                        maxPrice
                );
            }

            if(maxPrice == null)
            {
                return criteriaBuilder.greaterThanOrEqualTo(
                        root.get("price"),
                        minPrice
                );
            }

            return criteriaBuilder.between(
                    root.get("price"),
                    minPrice,
                    maxPrice
            );
        };
    }

    public static Specification<Product> hasSearch(String search) {
        return (root, query, criteriaBuilder) -> {

            if (search == null || search.isBlank()) {
                return criteriaBuilder.conjunction();
            }

            String likePattern = "%" + search.toLowerCase() + "%";

            return criteriaBuilder.or(
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("name")), likePattern),

                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("description")), likePattern)
            );
        };
    }
}