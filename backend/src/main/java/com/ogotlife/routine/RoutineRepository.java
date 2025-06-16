package com.ogotlife.routine;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.time.LocalDate;


public interface RoutineRepository extends JpaRepository<Routine, Long> {
    List<Routine> findByUserId(Long userId);
    int countByUserId(Long userId);
    int countCheckedByUserIdAndDate(Long userId, LocalDate date); // 루틴 체크 기록 테이블 필요
}
