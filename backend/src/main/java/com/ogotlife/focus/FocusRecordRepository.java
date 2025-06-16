package com.ogotlife.focus;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface FocusRecordRepository extends JpaRepository<FocusRecord, Long> {
    List<FocusRecord> findByUserIdOrderByStartTimeDesc(Long userId);
    List<FocusRecord> findByUserIdAndStartTimeBetween(Long userId, LocalDateTime start, LocalDateTime end);
}
