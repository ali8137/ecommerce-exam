package com.ali.ecommerce_exam_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Objects;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    @Column(
        unique = true
    )
    private String title; // each category should have unique title
    private String description;
    @ToString.Exclude
    @JsonIgnore
    @OneToMany(
            mappedBy = "category",
            cascade = CascadeType.ALL
    )
    private List<Product> products;
    @Column(
            unique = true,
            nullable = false
    )
    private Integer categoryListingOrder;




    //    helper methods:
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || this.getClass() != o.getClass()) return false;
        Category that = (Category) o;
        return Objects.equals(this.id, that.id);
        //  return id.equals(that.id);
    }

    public int hashCode() {
        return Objects.hash(this.id);
    }
}

