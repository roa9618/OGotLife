package com.ogotlife.community;

import com.ogotlife.notification.NotificationService;
import com.ogotlife.notification.Notification;
import com.ogotlife.user.UserRepository;
import com.ogotlife.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class PostController {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final NotificationService notificationService;
    private final UserRepository userRepository;
    private final ScrapRepository scrapRepository; // ✅ 추가된 부분

    @GetMapping("/posts")
    public Page<Post> getPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "desc") String dir,
            @RequestParam(required = false) String keyword
    ) {
        Pageable pageable = PageRequest.of(page, size, "desc".equalsIgnoreCase(dir) ? Sort.by(sort).descending() : Sort.by(sort).ascending());
        if (keyword != null && !keyword.isBlank()) {
            return postRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(keyword, keyword, pageable);
        }
        return postRepository.findAll(pageable);
    }

    @GetMapping("/post/{id}")
    public ResponseEntity<?> getPost(@PathVariable Long id) {
        return postRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/post")
    public ResponseEntity<?> createPost(@RequestBody Post post) {
        post.setCreatedAt(LocalDateTime.now());
        return ResponseEntity.ok(postRepository.save(post));
    }

    @PutMapping("/post/{id}")
    public ResponseEntity<?> updatePost(
            @PathVariable Long id,
            @RequestBody Post req,
            Authentication authentication
    ) {
        String currentUser = authentication.getName();
        return postRepository.findById(id).map(post -> {
            if (!post.getAuthor().equals(currentUser)) {
                return ResponseEntity.status(403).body("수정 권한이 없습니다.");
            }
            post.setTitle(req.getTitle());
            post.setContent(req.getContent());
            postRepository.save(post);
            return ResponseEntity.ok(post);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/post/{id}")
    public ResponseEntity<?> deletePost(
            @PathVariable Long id,
            Authentication authentication
    ) {
        String currentUser = authentication.getName();
        return postRepository.findById(id).map(post -> {
            if (!post.getAuthor().equals(currentUser)) {
                return ResponseEntity.status(403).body("삭제 권한이 없습니다.");
            }
            postRepository.deleteById(id);
            return ResponseEntity.ok("삭제됨");
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/post/{postId}/comments")
    public Page<Comment> getComments(
            @PathVariable Long postId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "asc") String dir
    ) {
        Pageable pageable = PageRequest.of(page, size, "desc".equalsIgnoreCase(dir) ? Sort.by(sort).descending() : Sort.by(sort).ascending());
        return commentRepository.findByPostId(postId, pageable);
    }

    @GetMapping("/scraps/{userId}")
    public Page<Scrap> getScraps(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return scrapRepository.findByUserId(userId, pageable);
    }

    @GetMapping("/posts/top-liked")
    public Page<Post> getTopLikedPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return postRepository.findAllOrderByLikeCountDesc(pageable);
    }

    @PostMapping("/post/{postId}/comment")
    public ResponseEntity<?> addComment(@PathVariable Long postId, @RequestBody Comment comment) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) return ResponseEntity.notFound().build();
        comment.setPost(post);
        comment.setCreatedAt(LocalDateTime.now());
        Comment saved = commentRepository.save(comment);

        if (post.getAuthor() != null && !post.getAuthor().equals(comment.getAuthor())) {
            User postUser = userRepository.findByNickname(post.getAuthor()).orElse(null);
            if (postUser != null) {
                notificationService.sendNotification(
                        Notification.builder()
                                .user(postUser)
                                .type("comment")
                                .message("[" + comment.getAuthor() + "]님이 [" + post.getTitle() + "]에 댓글을 남겼습니다.")
                                .build()
                );
            }
        }
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/comment/{id}")
    public ResponseEntity<?> updateComment(
            @PathVariable Long id,
            @RequestBody Comment req,
            Authentication authentication
    ) {
        String currentUser = authentication.getName();
        return commentRepository.findById(id).map(comment -> {
            if (!comment.getAuthor().equals(currentUser)) {
                return ResponseEntity.status(403).body("수정 권한이 없습니다.");
            }
            comment.setContent(req.getContent());
            commentRepository.save(comment);
            return ResponseEntity.ok(comment);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/comment/{id}")
    public ResponseEntity<?> deleteComment(
            @PathVariable Long id,
            Authentication authentication
    ) {
        String currentUser = authentication.getName();
        return commentRepository.findById(id).map(comment -> {
            if (!comment.getAuthor().equals(currentUser)) {
                return ResponseEntity.status(403).body("삭제 권한이 없습니다.");
            }
            commentRepository.deleteById(id);
            return ResponseEntity.ok("삭제됨");
        }).orElse(ResponseEntity.notFound().build());
    }
}
