package com.ogotlife.todo;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.time.LocalDate;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUserIdOrderByIdDesc(Long userId);
    List<Todo> findByUserIdAndRoutineId(Long userId, Long routineId);
    int countByUserIdAndCreatedAt(Long userId, LocalDate date);
    int countByUserIdAndCreatedAtAndDone(Long userId, LocalDate date, boolean done);
}
