package com.ali.ecommerce_exam_backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Objects;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(
        // no two products with the same product_listing_order and category_id:
        uniqueConstraints = @UniqueConstraint(
                columnNames = {"product_listing_order", "category_id"}
        )
)
public class Product {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    @NotNull(
            message = "category of a product cannot be null"
    )
    @ManyToOne
    @JoinColumn(
            referencedColumnName = "id"
    )
    private Category category;
    @Column(
//        unique = true,
        nullable = false
    )
    private Integer productListingOrder;



    //    helper methods:

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || this.getClass() != o.getClass()) return false;
        Product that = (Product) o;
        return Objects.equals(this.id, that.id);
        //  return id.equals(that.id);
    }

    public int hashCode() {
        return Objects.hash(this.id);
    }
}
