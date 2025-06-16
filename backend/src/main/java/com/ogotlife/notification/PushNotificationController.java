package com.ogotlife.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/push")
@RequiredArgsConstructor
public class PushNotificationController {
    private final PushNotificationService pushNotificationService;

    // 구독 저장
    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribe(@RequestBody Map<String, Object> req) {
        PushSubscription sub = PushSubscription.builder()
                .endpoint((String) req.get("endpoint"))
                .p256dh((String) ((Map<String, Object>) req.get("keys")).get("p256dh"))
                .auth((String) ((Map<String, Object>) req.get("keys")).get("auth"))
                .user(null) // 프론트에서 userId를 보내면 연동 가능
                .build();
        pushNotificationService.saveSubscription(sub);
        return ResponseEntity.ok().build();
    }

    // 구독 해제
    @DeleteMapping("/unsubscribe/{id}")
    public ResponseEntity<?> unsubscribe(@PathVariable Long id) {
        pushNotificationService.removeSubscription(id);
        return ResponseEntity.ok().build();
    }

    // 테스트 푸시 발송 (실제 서비스에서는 인증 필요)
    @PostMapping("/send")
    public ResponseEntity<?> sendPush(@RequestBody Map<String, Object> req) {
        Long userId = Long.valueOf(req.get("userId").toString());
        String title = (String) req.get("title");
        String body = (String) req.get("body");
        pushNotificationService.sendPush(userId, title, body);
        return ResponseEntity.ok().build();
    }
}
