package com.ogotlife.record;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Long> {
    List<Record> findByUserIdOrderByDateDesc(Long userId);
    List<Record> findByUserIdAndDate(Long userId, LocalDate date);
}
