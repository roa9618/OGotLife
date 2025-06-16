package com.ogotlife.focus;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/focus")
@RequiredArgsConstructor
public class FocusRecordController {
    private final FocusRecordService focusRecordService;

    @GetMapping("/{userId}")
    public List<FocusRecord> getFocusRecords(@PathVariable Long userId) {
        return focusRecordService.getUserFocusRecords(userId);
    }

    @GetMapping("/{userId}/today")
    public List<FocusRecord> getTodayFocusRecords(@PathVariable Long userId) {
        return focusRecordService.getTodayFocusRecords(userId);
    }

    // 오늘의 총 집중 시간(초)
    @GetMapping("/{userId}/today/total")
    public Map<String, Integer> getTodayTotalFocus(@PathVariable Long userId) {
        LocalDate today = LocalDate.now();
        LocalDateTime start = today.atStartOfDay();
        LocalDateTime end = today.plusDays(1).atStartOfDay();
        int total = focusRecordService.getTotalDuration(userId, start, end);
        return Map.of("totalSeconds", total);
    }

    // 주간 집중 시간(일별)
    @GetMapping("/{userId}/week")
    public Map<String, Integer> getWeekFocus(@PathVariable Long userId) {
        LocalDate today = LocalDate.now();
        LocalDate weekStart = today.with(java.time.DayOfWeek.MONDAY);
        LocalDate weekEnd = weekStart.plusDays(7);
        Map<String, Integer> result = new java.util.LinkedHashMap<>();
        for (int i = 0; i < 7; i++) {
            LocalDate d = weekStart.plusDays(i);
            int total = focusRecordService.getTotalDuration(userId, d.atStartOfDay(), d.plusDays(1).atStartOfDay());
            result.put(d.toString(), total);
        }
        return result;
    }

    // 월간 집중 시간(일별)
    @GetMapping("/{userId}/month")
    public Map<String, Integer> getMonthFocus(@PathVariable Long userId) {
        LocalDate today = LocalDate.now();
        LocalDate first = today.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate last = today.with(TemporalAdjusters.lastDayOfMonth());
        Map<String, Integer> result = new java.util.LinkedHashMap<>();
        for (LocalDate d = first; !d.isAfter(last); d = d.plusDays(1)) {
            int total = focusRecordService.getTotalDuration(userId, d.atStartOfDay(), d.plusDays(1).atStartOfDay());
            result.put(d.toString(), total);
        }
        return result;
    }

    @PostMapping
    public FocusRecord addFocusRecord(@RequestBody FocusRecord record) {
        return focusRecordService.addFocusRecord(record);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFocusRecord(@PathVariable Long id) {
        focusRecordService.deleteFocusRecord(id);
        return ResponseEntity.ok().build();
    }
}
