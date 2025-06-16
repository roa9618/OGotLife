package com.ogotlife.record;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/record")
@RequiredArgsConstructor
public class RecordController {
    private final RecordService recordService;

    @GetMapping("/{userId}")
    public List<Record> getRecords(@PathVariable Long userId) {
        return recordService.getUserRecords(userId);
    }

    @GetMapping("/{userId}/today")
    public ResponseEntity<?> getTodayRecord(@PathVariable Long userId) {
        return recordService.getTodayRecord(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    @PostMapping
    public Record addRecord(@RequestBody Record record) {
        return recordService.addRecord(record);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecord(@PathVariable Long id) {
        recordService.deleteRecord(id);
        return ResponseEntity.ok().build();
    }
}
