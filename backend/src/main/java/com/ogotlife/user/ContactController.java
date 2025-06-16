package com.ogotlife.user;

import com.ogotlife.mail.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {
    private final MailService mailService;

    @PostMapping
    public ResponseEntity<?> contact(@RequestBody Map<String, String> req) {
        // 문의 저장/메일 발송 등 처리
        String title = req.getOrDefault("title", "문의");
        String content = req.getOrDefault("content", "");
        String email = req.getOrDefault("email", "no-reply@ogotlife.com");
        try {
            mailService.sendMail(
                "admin@ogotlife.com", // 운영자 메일로 변경
                "[문의] " + title,
                "문의자 이메일: " + email + "<br><br>" + content
            );
            return ResponseEntity.ok("문의가 접수되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("메일 발송 실패: " + e.getMessage());
        }
    }
}
