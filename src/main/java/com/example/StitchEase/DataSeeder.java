package com.example.StitchEase;

import com.example.StitchEase.model.CustomizationOption;
import com.example.StitchEase.repository.CustomizationOptionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CustomizationOptionRepository repository;

    public DataSeeder(CustomizationOptionRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (repository.count() == 0) {
            // Fabric
            repository.save(createOption("FABRIC", "Premium Velvet", null, 0.0, null));
            repository.save(createOption("FABRIC", "Raw Silk", null, 1500.0, null));

            // Color
            repository.save(createOption("COLOR", "Deep Maroon", "#5a0f28", 0.0, "https://images.unsplash.com/photo-1596455607563-ad6193f76b19?w=500&q=80"));
            repository.save(createOption("COLOR", "Mustard", "#e3b838", 0.0, "https://images.unsplash.com/photo-1596455607563-ad6193f76b19?w=500&q=80"));
            repository.save(createOption("COLOR", "Emerald", "#2a623d", 0.0, "https://images.unsplash.com/photo-1596455607563-ad6193f76b19?w=500&q=80"));
            repository.save(createOption("COLOR", "Navy", "#1e2a47", 0.0, "https://images.unsplash.com/photo-1596455607563-ad6193f76b19?w=500&q=80"));

            // Details
            repository.save(createOption("DETAIL", "Satin Lining", null, 500.0, null));
            repository.save(createOption("DETAIL", "Gold Tassels (Latkan)", null, 300.0, null));
            repository.save(createOption("DETAIL", "Piping Accent", null, 200.0, null));
            repository.save(createOption("DETAIL", "Heavy Embroidery on Blouse", null, 2500.0, null));
        }
    }

    private CustomizationOption createOption(String category, String name, String colorHex, Double price, String imageUrl) {
        CustomizationOption opt = new CustomizationOption();
        opt.setCategory(category);
        opt.setName(name);
        opt.setColorHex(colorHex);
        opt.setPriceModifier(price);
        opt.setImageUrl(imageUrl);
        return opt;
    }
}
