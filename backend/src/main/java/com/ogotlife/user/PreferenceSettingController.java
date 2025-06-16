package com.ogotlife.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/preference-setting")
@RequiredArgsConstructor
public class PreferenceSettingController {
    private final UserRepository userRepository;

    @PutMapping("/{username}")
    public ResponseEntity<?> updatePreference(@PathVariable String username, @RequestBody Map<String, Object> req) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        User user = userOpt.get();
        user.setTheme((String) req.getOrDefault("theme", user.getTheme()));
        user.setAlarmEnabled((Boolean) req.getOrDefault("alarmEnabled", user.getAlarmEnabled()));
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }
}
