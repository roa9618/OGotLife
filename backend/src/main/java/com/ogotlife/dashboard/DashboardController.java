package com.ogotlife.dashboard;

import com.ogotlife.routine.RoutineRepository;
import com.ogotlife.todo.TodoRepository;
import com.ogotlife.record.RecordRepository;
import com.ogotlife.focus.FocusRecordRepository;
import com.ogotlife.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.List;


@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final RoutineRepository routineRepository;
    private final TodoRepository todoRepository;
    private final RecordRepository recordRepository;
    private final FocusRecordRepository focusRecordRepository;
    private final UserRepository userRepository;
    private final DashboardService dashboardService;

    // 오늘의 루틴/투두 진행률
    @GetMapping("/progress/{userId}")
    public Map<String, Object> getProgress(@PathVariable Long userId) {
        LocalDate today = LocalDate.now();
        // 루틴 진행률
        long routineTotal = routineRepository.findByUserId(userId).size();
        long routineDone = todoRepository.findByUserIdAndRoutineId(userId, null).stream()
                .filter(todo -> todo.isDone() && todo.getRoutine() != null).count();
        // 투두 진행률
        long todoTotal = todoRepository.findByUserIdOrderByIdDesc(userId).size();
        long todoDone = todoRepository.findByUserIdOrderByIdDesc(userId).stream().filter(t -> t.isDone()).count();

        int routineProgress = routineTotal == 0 ? 0 : (int) (routineDone * 100 / routineTotal);
        int todoProgress = todoTotal == 0 ? 0 : (int) (todoDone * 100 / todoTotal);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("routineProgress", routineProgress);
        result.put("todoProgress", todoProgress);
        return result;
    }

    // 최근 4개월 히트맵 (성공률)
    @GetMapping("/streak-heatmap/{userId}")
    public Map<String, Integer> getStreakHeatmap(@PathVariable Long userId) {
        LocalDate today = LocalDate.now();
        LocalDate start = today.minusWeeks(16).with(java.time.DayOfWeek.MONDAY);
        Map<String, Integer> heatmap = new LinkedHashMap<>();
        for (int i = 0; i < 16 * 7; i++) {
            LocalDate d = start.plusDays(i);
            int todoCount = todoRepository.findByUserIdOrderByIdDesc(userId).stream()
                    .filter(t -> t.getRoutine() == null && t.getCreatedDate() != null && t.getCreatedDate().toLocalDate().equals(d)).toList().size();
            int todoDone = todoRepository.findByUserIdOrderByIdDesc(userId).stream()
                    .filter(t -> t.getRoutine() == null && t.isDone() && t.getCreatedDate() != null && t.getCreatedDate().toLocalDate().equals(d)).toList().size();
            int percent = todoCount == 0 ? 0 : (int) (todoDone * 100 / todoCount);
            heatmap.put(d.toString(), percent);
        }
        return heatmap;
    }

    // 최근 7일 집중모드 일별 총 시간(분)
    @GetMapping("/focus-week/{userId}")
    public Map<String, Integer> getFocusWeek(@PathVariable Long userId) {
        LocalDate today = LocalDate.now();
        Map<String, Integer> result = new LinkedHashMap<>();
        for (int i = 0; i < 7; i++) {
            LocalDate d = today.minusDays(6 - i);
            int total = focusRecordRepository.findByUserIdAndStartTimeBetween(
                    userId, d.atStartOfDay(), d.plusDays(1).atStartOfDay())
                    .stream().mapToInt(f -> f.getDuration() / 60).sum();
            result.put(d.toString(), total);
        }
        return result;
    }

    // 최근 7일 일기/감정 기록
    @GetMapping("/record-week/{userId}")
    public Map<String, String> getRecordWeek(@PathVariable Long userId) {
        LocalDate today = LocalDate.now();
        Map<String, String> result = new LinkedHashMap<>();
        for (int i = 0; i < 7; i++) {
            LocalDate d = today.minusDays(6 - i);
            String emotion = recordRepository.findByUserIdAndDate(userId, d)
                    .stream().findFirst().map(r -> r.getEmotion()).orElse("");
            result.put(d.toString(), emotion);
        }
        return result;
    }

    @GetMapping("/streak/{userId}")
    public List<StreakDto> getStreak(@PathVariable Long userId) {
        return dashboardService.getStreakData(userId);
    }
}
