package com.ali.ecommerce_exam_backend.auth.config;


import com.ali.ecommerce_exam_backend.auth.config.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    // implement the doFilterInternal method of the JwtAuthenticationFilter class:
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader;
        final String jwtAccessToken;
        final String userEmail;

        authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwtAccessToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwtAccessToken);

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // load the user details (in the database) to use them against the claims of the access token:
            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(userEmail);

            // check if the access token is valid (credentials in the token are the same as the ones in the database):
            if (jwtService.isAccessTokenValid(jwtAccessToken, userDetails)) {
                /* TODO: add the case of automatic triggering (in the frontend side) of
                    sending request to the refresh token endpoint, in case of the access token
                    being present but expired.
                    */

                // add the user to the security context:
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // add the authentication token in the security context:
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
