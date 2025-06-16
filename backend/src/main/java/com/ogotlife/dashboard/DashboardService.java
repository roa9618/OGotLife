package com.ogotlife.dashboard;

import com.ogotlife.todo.TodoRepository;
import com.ogotlife.routine.RoutineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final TodoRepository todoRepository;
    private final RoutineRepository routineRepository;

    public List<StreakDto> getStreakData(Long userId) {
        LocalDate today = LocalDate.now();
        LocalDate start = today.minusMonths(4).withDayOfMonth(1);
        List<StreakDto> result = new ArrayList<>();
        for (LocalDate date = start; !date.isAfter(today); date = date.plusDays(1)) {
            int todoTotal = todoRepository.countByUserIdAndCreatedAt(userId, date);
            int todoDone = todoRepository.countByUserIdAndCreatedAtAndDone(userId, date, true);
            int routineTotal = routineRepository.countByUserId(userId);
            int routineDone = routineRepository.countCheckedByUserIdAndDate(userId, date);
            int total = todoTotal + routineTotal;
            int done = todoDone + routineDone;
            int score = 0;
            if (total > 0) {
                double rate = (double) done / total;
                if (rate >= 0.8) score = 3;
                else if (rate >= 0.5) score = 2;
                else if (rate > 0) score = 1;
            }
            result.add(new StreakDto(date.toString(), score));
        }
        return result;
    }
}
