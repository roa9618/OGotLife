package com.ogotlife.community;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ScrapRepository extends JpaRepository<Scrap, Long> {
    Optional<Scrap> findByUserIdAndPostId(Long userId, Long postId);
    List<Scrap> findByUserId(Long userId);
    Page<Scrap> findByUserId(Long userId, Pageable pageable);
}
