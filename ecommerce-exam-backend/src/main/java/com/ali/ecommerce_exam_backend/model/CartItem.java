package com.ali.ecommerce_exam_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    private Integer quantity;
    @ToString.Exclude
    @JsonIgnore
    @ManyToOne
    @JoinColumn(
            referencedColumnName = "id"
    )
    private Cart cart;
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(
            referencedColumnName = "id"
    )
    private Product product;


    //    helper methods:
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || this.getClass() != o.getClass()) return false;
        CartItem that = (CartItem) o;
        return Objects.equals(this.id, that.id);
        //  return id.equals(that.id);
    }

    public int hashCode() {
        return Objects.hash(this.id);
    }
}
