package com.ogotlife.calendar;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByUserIdAndDate(Long userId, LocalDate date);
    List<Event> findByUserIdAndDateBetween(Long userId, LocalDate start, LocalDate end);
    List<Event> findByUserId(Long userId);
}
