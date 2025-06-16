package com.ogotlife.user;

import com.ogotlife.mail.MailService;
import com.ogotlife.security.JwtTokenProvider;
import com.ogotlife.security.TokenBlacklistService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final TokenBlacklistService tokenBlacklistService;
    private final MailService mailService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("이미 존재하는 아이디입니다.");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("이미 존재하는 이메일입니다.");
        }
        userService.signup(user);
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {
        Optional<User> userOpt = userService.login(req.get("username"), req.get("password"));
        if (userOpt.isPresent()) {
            String token = jwtTokenProvider.createToken(userOpt.get().getUsername(), userOpt.get().getRole());
            Map<String, Object> result = new HashMap<>();
            result.put("token", token);
            result.put("user", userOpt.get());
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.status(401).body("아이디 또는 비밀번호가 일치하지 않습니다.");
    }

    @GetMapping("/profile/{username}")
    public ResponseEntity<?> getProfile(@PathVariable String username) {
        return userRepository.findByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/profile/{username}")
    public ResponseEntity<?> updateProfile(@PathVariable String username, @RequestBody Map<String, String> req) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        User user = userOpt.get();
        user.setNickname(req.getOrDefault("nickname", user.getNickname()));
        user.setProfileImage(req.getOrDefault("profileImage", user.getProfileImage()));
        user.setDescription(req.getOrDefault("description", user.getDescription()));
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/account/{username}")
    public ResponseEntity<?> updateAccount(@PathVariable String username, @RequestBody Map<String, String> req) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        User user = userOpt.get();
        user.setEmail(req.getOrDefault("email", user.getEmail()));
        if (req.containsKey("password")) user.setPassword(passwordEncoder.encode(req.get("password")));
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    // 환경설정 조회 (테마/알림 등)
    @GetMapping("/preference/{username}")
    public ResponseEntity<?> getPreference(@PathVariable String username) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        User user = userOpt.get();
        Map<String, Object> pref = new HashMap<>();
        pref.put("theme", user.getTheme());
        pref.put("alarmEnabled", user.getAlarmEnabled());
        return ResponseEntity.ok(pref);
    }

    // 환경설정 변경 (테마/알림 등)
    @PutMapping("/preference/{username}")
    public ResponseEntity<?> updatePreference(@PathVariable String username, @RequestBody Map<String, Object> req) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        User user = userOpt.get();
        user.setTheme((String) req.getOrDefault("theme", user.getTheme()));
        user.setAlarmEnabled((Boolean) req.getOrDefault("alarmEnabled", user.getAlarmEnabled()));
        userRepository.save(user);

        // 변경된 환경설정 즉시 반환
        Map<String, Object> pref = new HashMap<>();
        pref.put("theme", user.getTheme());
        pref.put("alarmEnabled", user.getAlarmEnabled());
        // 프론트엔드는 이 응답을 받아 즉시 테마/환경설정에 반영
        return ResponseEntity.ok(pref);
    }

    @PostMapping("/contact")
    public ResponseEntity<?> contact(@RequestBody Map<String, String> req) {
        // 문의 저장/메일 발송 등 처리
        return ResponseEntity.ok("문의가 접수되었습니다.");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        // Bearer 토큰에서 실제 토큰만 추출
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            tokenBlacklistService.blacklist(token);
        }
        return ResponseEntity.ok("로그아웃 성공");
    }

    @PostMapping("/{username}/profile-image")
    public ResponseEntity<?> uploadProfileImage(
            @PathVariable String username,
            @RequestParam("file") MultipartFile file
    ) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        User user = userOpt.get();
        try {
            String ext = org.springframework.util.StringUtils.getFilenameExtension(file.getOriginalFilename());
            String filename = "profile_" + user.getId() + "_" + System.currentTimeMillis() + (ext != null ? "." + ext : "");
            java.nio.file.Path dir = java.nio.file.Paths.get("uploads/profile");
            if (!java.nio.file.Files.exists(dir)) java.nio.file.Files.createDirectories(dir);
            java.nio.file.Path path = dir.resolve(filename);
            file.transferTo(path);
            String url = "/api/file/download/profile/" + filename;
            user.setProfileImage(url);
            userRepository.save(user);
            return ResponseEntity.ok(url);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("업로드 실패: " + e.getMessage());
        }
    }

    // 아이디(Username) 중복 체크
    @GetMapping("/check-username")
    public ResponseEntity<?> checkUsername(@RequestParam String username) {
        boolean exists = userRepository.findByUsername(username).isPresent();
        return ResponseEntity.ok(Map.of("exists", exists));
    }

    // 이메일 중복 체크
    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestParam String email) {
        boolean exists = userRepository.findByEmail(email).isPresent();
        return ResponseEntity.ok(Map.of("exists", exists));
    }

    // 비밀번호 규칙(8자 이상, 영문/숫자/특수문자 포함) 검사
    @PostMapping("/validate-password")
    public ResponseEntity<?> validatePassword(@RequestBody Map<String, String> req) {
        String pw = req.get("password");
        boolean valid = pw != null && pw.length() >= 8
                && pw.matches(".*[A-Za-z].*")
                && pw.matches(".*[0-9].*")
                && pw.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?].*");
        return ResponseEntity.ok(Map.of("valid", valid));
    }

    // 회원 탈퇴(삭제)
    @DeleteMapping("/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable String username, Authentication authentication) {
        String currentUser = authentication.getName();
        if (!currentUser.equals(username)) {
            return ResponseEntity.status(403).body("탈퇴 권한이 없습니다.");
        }
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        userRepository.delete(userOpt.get());
        return ResponseEntity.ok("회원 탈퇴가 완료되었습니다.");
    }

    // 이메일/비밀번호 변경 시 2차 인증코드 발송
    private final Map<String, String> emailVerificationCodes = new HashMap<>();

    @PostMapping("/send-verify-code")
    public ResponseEntity<?> sendVerifyCode(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String code = String.valueOf((int)(Math.random() * 900000) + 100000); // 6자리
        emailVerificationCodes.put(email, code);
        try {
            mailService.sendMail(
                email,
                "[오갓생] 이메일 인증코드 안내",
                "인증코드: <b>" + code + "</b><br>화면에 입력해 주세요."
            );
            return ResponseEntity.ok("인증코드가 이메일로 발송되었습니다.");
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body("메일 발송 실패: " + e.getMessage());
        }
    }

    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCode(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String code = req.get("code");
        String saved = emailVerificationCodes.get(email);
        if (saved != null && saved.equals(code)) {
            emailVerificationCodes.remove(email);
            return ResponseEntity.ok(Map.of("verified", true));
        }
        return ResponseEntity.ok(Map.of("verified", false));
    }

    // 이메일 변경(2차 인증 필요)
    @PutMapping("/change-email/{username}")
    public ResponseEntity<?> changeEmail(@PathVariable String username, @RequestBody Map<String, String> req, Authentication authentication) {
        String currentUser = authentication.getName();
        if (!currentUser.equals(username)) {
            return ResponseEntity.status(403).body("이메일 변경 권한이 없습니다.");
        }
        String email = req.get("email");
        String code = req.get("code");
        String saved = emailVerificationCodes.get(email);
        if (saved == null || !saved.equals(code)) {
            return ResponseEntity.status(400).body("이메일 인증이 필요합니다.");
        }
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        User user = userOpt.get();
        user.setEmail(email);
        userRepository.save(user);
        emailVerificationCodes.remove(email);
        return ResponseEntity.ok("이메일이 변경되었습니다.");
    }

    // 비밀번호 변경(2차 인증 필요)
    @PutMapping("/change-password/{username}")
    public ResponseEntity<?> changePassword(@PathVariable String username, @RequestBody Map<String, String> req, Authentication authentication) {
        String currentUser = authentication.getName();
        if (!currentUser.equals(username)) {
            return ResponseEntity.status(403).body("비밀번호 변경 권한이 없습니다.");
        }
        String email = req.get("email");
        String code = req.get("code");
        String newPw = req.get("password");
        String saved = emailVerificationCodes.get(email);
        if (saved == null || !saved.equals(code)) {
            return ResponseEntity.status(400).body("이메일 인증이 필요합니다.");
        }
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        User user = userOpt.get();
        user.setPassword(passwordEncoder.encode(newPw));
        userRepository.save(user);
        emailVerificationCodes.remove(email);
        return ResponseEntity.ok("비밀번호가 변경되었습니다.");
    }
}
