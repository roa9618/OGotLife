package com.ogotlife.focus;

import com.ogotlife.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FocusRecord {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int duration; // 초 단위
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
