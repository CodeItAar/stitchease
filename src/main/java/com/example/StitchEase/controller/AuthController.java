package com.example.StitchEase.controller;

import com.example.StitchEase.model.User;
import com.example.StitchEase.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already registered!");
        }
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginData) {
        Optional<User> userOptional = userRepository.findByEmail(loginData.getEmail());
        if (userOptional.isPresent() && userOptional.get().getPassword().equals(loginData.getPassword())) {
            return ResponseEntity.ok(userOptional.get());
        }
        return ResponseEntity.badRequest().body("Error: Invalid email or password!");
    }
}