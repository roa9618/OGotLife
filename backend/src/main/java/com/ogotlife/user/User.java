package com.ogotlife.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    private String nickname;
    private String profileImage;
    private String description;
    private String role; // USER, ADMIN 등
    private String theme; // 환경설정 예시
    private Boolean alarmEnabled;
}
