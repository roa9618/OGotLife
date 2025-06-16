package com.ogotlife.notification;

import com.ogotlife.user.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PushSubscription {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String endpoint;
    private String p256dh;
    private String auth;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
