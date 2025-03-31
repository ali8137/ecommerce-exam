package com.ali.ecommerce_exam_backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(
    name = "users"
)
public class User implements UserDetails {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    @NotBlank(message = "first name should not be empty")
    private String firstName;
    @NotBlank(message = "last name should not be empty")
    private String lastName;
    /* TODO: we can create a custom validation annotation for password*/
    @Column(
            length = 60
    )
    private String password;
    @NotNull(message = "email cannot be null")
    @NotBlank(message = "email cannot be blank")
    @Column(
            unique = true
    )
    private String email; // email should be unique
    @Enumerated(EnumType.STRING)
    private Role role;
    @Column(
            updatable = false
    )
    private LocalDateTime createdAT;


    //    helper methods:

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || this.getClass() != o.getClass()) return false;
        User that = (User) o;
        return Objects.equals(this.id, that.id);
        //  return id.equals(that.id);
    }

    public int hashCode() {
        return Objects.hash(this.id);
    }

    //    UserDetails interface methods:
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.role.name()));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
