package com.ogotlife.mail;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/mail")
@RequiredArgsConstructor
public class MailController {
    private final MailService mailService;

    @PostMapping("/send")
    public ResponseEntity<?> sendMail(@RequestBody Map<String, String> req) {
        try {
            mailService.sendMail(req.get("to"), req.get("subject"), req.get("text"));
            return ResponseEntity.ok("메일이 발송되었습니다.");
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body("메일 발송 실패: " + e.getMessage());
        }
    }
}
