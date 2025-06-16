package com.ogotlife.community;

import com.ogotlife.community.entity.Like;
import com.ogotlife.community.entity.Post;
import com.ogotlife.community.entity.Report;
import com.ogotlife.community.entity.Scrap;
import com.ogotlife.community.repository.LikeRepository;
import com.ogotlife.community.repository.ReportRepository;
import com.ogotlife.community.repository.ScrapRepository;
import com.ogotlife.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class CommunityActionController {

    private final ScrapRepository scrapRepository;
    private final LikeRepository likeRepository;
    private final ReportRepository reportRepository;

    // 스크랩 추가/삭제
    @PostMapping("/post/{postId}/scrap")
    public ResponseEntity<?> scrap(@PathVariable Long postId, @RequestBody Map<String, Long> req) {
        Long userId = req.get("userId");
        if (scrapRepository.findByUserIdAndPostId(userId, postId).isPresent()) {
            return ResponseEntity.badRequest().body("이미 스크랩한 글입니다.");
        }
        Scrap scrap = Scrap.builder()
                .user(User.builder().id(userId).build())
                .post(new Post(postId, null, null, null, null, null))
                .build();
        scrapRepository.save(scrap);
        return ResponseEntity.ok("스크랩 완료");
    }

    // 스크랩 삭제 (본인만)
    @DeleteMapping("/post/{postId}/scrap")
    public ResponseEntity<?> unscrap(
            @PathVariable Long postId,
            @RequestBody Map<String, Long> req,
            Authentication authentication
    ) {
        Long userId = req.get("userId");
        String currentUser = authentication.getName();
        if (!currentUser.equals(String.valueOf(userId))) {
            return ResponseEntity.status(403).body("삭제 권한이 없습니다.");
        }
        return scrapRepository.findByUserIdAndPostId(userId, postId)
                .map(scrap -> {
                    scrapRepository.delete(scrap);
                    return ResponseEntity.ok("스크랩 취소");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 좋아요 추가
    @PostMapping("/post/{postId}/like")
    public ResponseEntity<?> like(@PathVariable Long postId, @RequestBody Map<String, Long> req) {
        Long userId = req.get("userId");
        if (likeRepository.findByUserIdAndPostId(userId, postId).isPresent()) {
            return ResponseEntity.badRequest().body("이미 추천한 글입니다.");
        }
        Like like = Like.builder()
                .user(User.builder().id(userId).build())
                .post(new Post(postId, null, null, null, null, null))
                .build();
        likeRepository.save(like);
        return ResponseEntity.ok("추천 완료");
    }

    // 좋아요 취소 (본인만)
    @DeleteMapping("/post/{postId}/like")
    public ResponseEntity<?> unlike(
            @PathVariable Long postId,
            @RequestBody Map<String, Long> req,
            Authentication authentication
    ) {
        Long userId = req.get("userId");
        String currentUser = authentication.getName();
        if (!currentUser.equals(String.valueOf(userId))) {
            return ResponseEntity.status(403).body("취소 권한이 없습니다.");
        }
        return likeRepository.findByUserIdAndPostId(userId, postId)
                .map(like -> {
                    likeRepository.delete(like);
                    return ResponseEntity.ok("추천 취소");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 좋아요 개수
    @GetMapping("/post/{postId}/like/count")
    public long likeCount(@PathVariable Long postId) {
        return likeRepository.countByPostId(postId);
    }

    // 신고
    @PostMapping("/post/{postId}/report")
    public ResponseEntity<?> report(@PathVariable Long postId, @RequestBody Map<String, Object> req) {
        Long userId = Long.valueOf(req.get("userId").toString());
        String reason = req.get("reason").toString();
        Report report = Report.builder()
                .user(User.builder().id(userId).build())
                .post(new Post(postId, null, null, null, null, null))
                .reason(reason)
                .build();
        reportRepository.save(report);
        return ResponseEntity.ok("신고가 접수되었습니다.");
    }
}
