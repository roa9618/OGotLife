package com.ogotlife.admin;

import com.ogotlife.notification.NotificationService;
import com.ogotlife.notification.Notification;
import com.ogotlife.user.UserRepository;
import com.ogotlife.user.User;
import org.springframework.security.core.Authentication;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/notice")
@RequiredArgsConstructor
public class NoticeController {
    private final NoticeRepository noticeRepository;
    private final NoticeReadRepository noticeReadRepository;
    private final NotificationService notificationService;
    private final UserRepository userRepository;

    @GetMapping
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    // 공지 읽음 처리
    @PostMapping("/{noticeId}/read")
    public ResponseEntity<?> readNotice(
            @PathVariable Long noticeId,
            Authentication authentication
    ) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) return ResponseEntity.status(401).build();

        boolean alreadyRead = noticeReadRepository.findByUserIdAndNoticeId(user.getId(), noticeId).isPresent();
        if (!alreadyRead) {
            Notice notice = noticeRepository.findById(noticeId).orElse(null);
            if (notice == null) return ResponseEntity.notFound().build();
            noticeReadRepository.save(NoticeRead.builder().user(user).notice(notice).build());
        }
        return ResponseEntity.ok().build();
    }

    // 공지 알림 연동 (공지 등록 시 전체 사용자에게 알림)
    @PostMapping
    public Notice createNotice(@RequestBody Notice notice) {
        notice.setCreatedAt(LocalDateTime.now());
        Notice saved = noticeRepository.save(notice);

        // 전체 사용자에게 알림
        for (User user : userRepository.findAll()) {
            notificationService.sendNotification(
                Notification.builder()
                    .user(user)
                    .type("notice")
                    .message("[공지] " + notice.getTitle())
                    .build()
            );
        }
        return saved;
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNotice(@PathVariable Long id, @RequestBody Notice req) {
        return noticeRepository.findById(id).map(notice -> {
            notice.setTitle(req.getTitle());
            notice.setContent(req.getContent());
            noticeRepository.save(notice);
            return ResponseEntity.ok(notice);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable Long id) {
        noticeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
