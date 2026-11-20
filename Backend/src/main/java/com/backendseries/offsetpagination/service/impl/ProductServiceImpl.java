package com.backendseries.offsetpagination.service.impl;

import com.backendseries.offsetpagination.dto.DashboardStatsResponse;
import com.backendseries.offsetpagination.dto.PaginatedResponse;
import com.backendseries.offsetpagination.dto.ProductResponse;
import com.backendseries.offsetpagination.entity.Product;
import com.backendseries.offsetpagination.mapper.ProductMapper;
import com.backendseries.offsetpagination.repository.BrandRepository;
import com.backendseries.offsetpagination.repository.CategoryRepository;
import com.backendseries.offsetpagination.repository.ProductRepository;
import com.backendseries.offsetpagination.service.ProductService;
import com.backendseries.offsetpagination.specification.ProductSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final ProductMapper productMapper;

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public PaginatedResponse getAllProducts(
            int page,
            int size,
            String sortBy,
            String direction,
            String category,
            String brand,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String search ) {

        // sorting based on the provided sortBy(field) & direction

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(
                page,
                size,
                sort );

        // filtering
        Specification<Product> specification =
                ProductSpecification.hasCategory(category)
                        .and(ProductSpecification.hasBrand(brand)
                        .and(ProductSpecification.hasPriceBetween(minPrice, maxPrice)
                        .and(ProductSpecification.hasSearch(search))));

        Page<Product> productPage = productRepository.findAll(specification, pageable);

        List<ProductResponse> content = productPage.getContent()
                .stream()
                .map(product -> productMapper.toProductResponse(product))
                .toList();

        return new PaginatedResponse(
                content,
                productPage.getNumber(),
                productPage.getSize(),
                productPage.getTotalElements(),
                productPage.getTotalPages(),
                productPage.hasNext(),
                productPage.hasPrevious()
        );
    }

    public Long getTotalCategoriesCount() {
        return categoryRepository.count();
    }

    @Override
    public DashboardStatsResponse getDashboardStats() {
        return new DashboardStatsResponse(
                productRepository.count(),
                categoryRepository.count(),
                brandRepository.count(),
                productRepository.countByStockQuantityLessThanEqual(5)
        );
    }
}