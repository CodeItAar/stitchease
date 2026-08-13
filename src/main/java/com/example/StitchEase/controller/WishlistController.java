package com.example.StitchEase.controller;

import com.example.StitchEase.model.Design;
import com.example.StitchEase.model.User;
import com.example.StitchEase.model.Wishlist;
import com.example.StitchEase.repository.DesignRepository;
import com.example.StitchEase.repository.UserRepository;
import com.example.StitchEase.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DesignRepository designRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserWishlist(@PathVariable Long userId) {
        List<Wishlist> wishlists = wishlistRepository.findByUserId(userId);
        List<Design> designs = wishlists.stream()
                .map(Wishlist::getDesign)
                .collect(Collectors.toList());
        return ResponseEntity.ok(designs);
    }

    @PostMapping("/{userId}/add/{designId}")
    public ResponseEntity<?> addToWishlist(@PathVariable Long userId, @PathVariable Long designId) {
        Optional<Wishlist> existing = wishlistRepository.findByUserIdAndDesignId(userId, designId);
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().body("Design is already in wishlist");
        }

        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Design> designOpt = designRepository.findById(designId);

        if (userOpt.isEmpty() || designOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User or Design not found");
        }

        Wishlist wishlist = new Wishlist();
        wishlist.setUser(userOpt.get());
        wishlist.setDesign(designOpt.get());
        wishlistRepository.save(wishlist);

        return ResponseEntity.ok("Added to wishlist successfully");
    }

    @Transactional
    @DeleteMapping("/{userId}/remove/{designId}")
    public ResponseEntity<?> removeFromWishlist(@PathVariable Long userId, @PathVariable Long designId) {
        wishlistRepository.deleteByUserIdAndDesignId(userId, designId);
        return ResponseEntity.ok("Removed from wishlist successfully");
    }
}
