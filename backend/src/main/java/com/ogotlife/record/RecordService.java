package com.ogotlife.record;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecordService {
    private final RecordRepository recordRepository;

    public List<Record> getUserRecords(Long userId) {
        return recordRepository.findByUserIdOrderByDateDesc(userId);
    }

    public Optional<Record> getTodayRecord(Long userId) {
        return recordRepository.findByUserIdAndDate(userId, LocalDate.now()).stream().findFirst();
    }

    public Record addRecord(Record record) {
        return recordRepository.save(record);
    }

    public void deleteRecord(Long id) {
        recordRepository.deleteById(id);
    }
}
