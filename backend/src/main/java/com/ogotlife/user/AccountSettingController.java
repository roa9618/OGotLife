package com.ogotlife.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/account-setting")
@RequiredArgsConstructor
public class AccountSettingController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PutMapping("/{username}")
    public ResponseEntity<?> updateAccount(@PathVariable String username, @RequestBody Map<String, String> req) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        User user = userOpt.get();
        user.setEmail(req.getOrDefault("email", user.getEmail()));
        if (req.containsKey("password")) user.setPassword(passwordEncoder.encode(req.get("password")));
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }
}
