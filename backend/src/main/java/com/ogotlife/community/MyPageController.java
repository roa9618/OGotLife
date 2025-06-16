package com.ogotlife.community;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MyPageController {
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final ScrapRepository scrapRepository;

    // 내가 쓴 글
    @GetMapping("/posts/{userId}")
    public List<Post> getMyPosts(@PathVariable Long userId) {
        return postRepository.findAll().stream()
                .filter(post -> post.getAuthor() != null && post.getAuthor().equals(String.valueOf(userId)))
                .toList();
    }

    // 내가 쓴 댓글
    @GetMapping("/comments/{userId}")
    public List<Comment> getMyComments(@PathVariable Long userId) {
        return commentRepository.findAll().stream()
                .filter(comment -> comment.getAuthor() != null && comment.getAuthor().equals(String.valueOf(userId)))
                .toList();
    }

    // 내가 스크랩한 글
    @GetMapping("/scraps/{userId}")
    public List<Scrap> getMyScraps(@PathVariable Long userId) {
        return scrapRepository.findByUserId(userId);
    }

    // 닉네임 기반 내가 쓴 글
    @GetMapping("/posts/nickname/{nickname}")
    public List<Post> getMyPostsByNickname(@PathVariable String nickname) {
        return postRepository.findAll().stream()
                .filter(post -> post.getAuthor() != null && post.getAuthor().equals(nickname))
                .toList();
    }

    // 닉네임 기반 내가 쓴 댓글
    @GetMapping("/comments/nickname/{nickname}")
    public List<Comment> getMyCommentsByNickname(@PathVariable String nickname) {
        return commentRepository.findAll().stream()
                .filter(comment -> comment.getAuthor() != null && comment.getAuthor().equals(nickname))
                .toList();
    }

    // 닉네임 기반 내가 스크랩한 글
    @GetMapping("/scraps/nickname/{nickname}")
    public List<Scrap> getMyScrapsByNickname(@PathVariable String nickname) {
        return scrapRepository.findAll().stream()
                .filter(scrap -> scrap.getUser() != null && nickname.equals(scrap.getUser().getNickname()))
                .toList();
    }
}
