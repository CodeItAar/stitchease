package com.example.StitchEase.controller;

import com.example.StitchEase.model.Address;
import com.example.StitchEase.model.User;
import com.example.StitchEase.repository.AddressRepository;
import com.example.StitchEase.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@Tag(name = "Address Controller", description = "APIs for managing user shipping addresses")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class AddressController {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Operation(summary = "Get all saved addresses for a user")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Address>> getUserAddresses(@PathVariable Long userId) {
        List<Address> addresses = addressRepository.findByUserId(userId);
        return ResponseEntity.ok(addresses);
    }

    @Operation(summary = "Save a new address for a user")
    @PostMapping("/user/{userId}")
    public ResponseEntity<Address> saveAddress(@PathVariable Long userId, @RequestBody Address addressRequest) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
        addressRequest.setUser(user);
        Address savedAddress = addressRepository.save(addressRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAddress);
    }

    @Operation(summary = "Get a specific address by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Address> getAddressById(@PathVariable Long id) {
        return addressRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
