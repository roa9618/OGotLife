package com.ogotlife.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StreakDto {
    private String date; // yyyy-MM-dd
    private int score;   // 0~3
}
