package com.ogotlife.routine;

import com.ogotlife.user.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Routine {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String icon;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
