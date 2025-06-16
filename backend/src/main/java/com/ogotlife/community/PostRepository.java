package com.ogotlife.community;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(String title, String content, Pageable pageable);

    @Query("SELECT p FROM Post p LEFT JOIN Like l ON l.post = p GROUP BY p.id ORDER BY COUNT(l.id) DESC")
    Page<Post> findAllOrderByLikeCountDesc(Pageable pageable);
}
