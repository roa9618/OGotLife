package com.ogotlife.record;

import com.ogotlife.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Record {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private String emotion;
    @Column(length = 500)
    private String diary;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
