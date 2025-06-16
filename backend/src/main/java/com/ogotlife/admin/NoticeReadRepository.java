package com.ogotlife.admin;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NoticeReadRepository extends JpaRepository<NoticeRead, Long> {
    Optional<NoticeRead> findByUserIdAndNoticeId(Long userId, Long noticeId);
    long countByNoticeId(Long noticeId);
}
