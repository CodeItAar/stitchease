package com.example.StitchEase.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Expose uploads directory to serve images at http://localhost:8080/uploads/filename
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}
