package com.ogotlife.focus;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FocusRecordService {
    private final FocusRecordRepository focusRecordRepository;

    public List<FocusRecord> getUserFocusRecords(Long userId) {
        return focusRecordRepository.findByUserIdOrderByStartTimeDesc(userId);
    }

    public List<FocusRecord> getTodayFocusRecords(Long userId) {
        LocalDate today = LocalDate.now();
        LocalDateTime start = today.atStartOfDay();
        LocalDateTime end = today.plusDays(1).atStartOfDay();
        return focusRecordRepository.findByUserIdAndStartTimeBetween(userId, start, end);
    }

    public int getTotalDuration(Long userId, LocalDateTime start, LocalDateTime end) {
        return focusRecordRepository.findByUserIdAndStartTimeBetween(userId, start, end)
                .stream().mapToInt(FocusRecord::getDuration).sum();
    }

    public FocusRecord addFocusRecord(FocusRecord record) {
        return focusRecordRepository.save(record);
    }

    public void deleteFocusRecord(Long id) {
        focusRecordRepository.deleteById(id);
    }
}
