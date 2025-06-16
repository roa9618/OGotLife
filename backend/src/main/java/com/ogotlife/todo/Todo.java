package com.ogotlife.todo;

import com.ogotlife.user.User;
import com.ogotlife.routine.Routine;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Todo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;
    private boolean done;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private Routine routine; // null이면 일반 투두, 아니면 루틴 기반 투두

    private LocalDateTime createdDate;
}
