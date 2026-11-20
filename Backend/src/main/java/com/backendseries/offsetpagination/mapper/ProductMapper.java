package com.backendseries.offsetpagination.mapper;

import com.backendseries.offsetpagination.dto.ProductResponse;
import com.backendseries.offsetpagination.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public ProductResponse toProductResponse(Product product) {
        return new ProductResponse(

                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStockQuantity(),
                product.getProductStatus(),
                product.getCategory().getName(),
                product.getBrand().getName(),
                product.getCreatedAt(),
                product.getUpdatedAt()
        );
    }
}
