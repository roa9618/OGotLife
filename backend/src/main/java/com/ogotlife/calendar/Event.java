package com.ogotlife.calendar;

import com.ogotlife.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Event {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
