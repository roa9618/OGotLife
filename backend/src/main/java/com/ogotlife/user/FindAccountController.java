package com.ogotlife.user;

import com.ogotlife.mail.MailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/api/find-account")
@RequiredArgsConstructor
public class FindAccountController {
    private final UserRepository userRepository;
    private final MailService mailService;
    private final PasswordEncoder passwordEncoder;

    // 아이디 찾기 (이메일로)
    @PostMapping("/find-id")
    public ResponseEntity<?> findId(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get().getUsername());
        }
        return ResponseEntity.status(404).body("가입된 아이디가 없습니다.");
    }

    // 임시 비밀번호 발송 (아이디+이메일)
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> req) {
        String username = req.get("username");
        String email = req.get("email");
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty() || !userOpt.get().getEmail().equals(email)) {
            return ResponseEntity.status(404).body("일치하는 계정이 없습니다.");
        }
        User user = userOpt.get();
        String tempPw = generateTempPassword();
        user.setPassword(passwordEncoder.encode(tempPw));
        userRepository.save(user);

        try {
            mailService.sendMail(
                email,
                "[오갓생] 임시 비밀번호 안내",
                "임시 비밀번호: <b>" + tempPw + "</b><br>로그인 후 반드시 비밀번호를 변경해 주세요."
            );
            return ResponseEntity.ok("임시 비밀번호가 이메일로 발송되었습니다.");
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body("메일 발송 실패: " + e.getMessage());
        }
    }

    private String generateTempPassword() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();
        Random rnd = new Random();
        for (int i = 0; i < 10; i++) {
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        }
        return sb.toString();
    }
}
