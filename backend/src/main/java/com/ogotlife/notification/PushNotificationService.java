package com.ogotlife.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

// import nl.martijndwars.webpush.Notification;
// import nl.martijndwars.webpush.PushService;
// import nl.martijndwars.webpush.Utils;
// import org.jose4j.lang.JoseException;

@Service
@RequiredArgsConstructor
public class PushNotificationService {
    private final PushSubscriptionRepository pushSubscriptionRepository;
    // private final PushService pushService; // 실제 서비스에서는 DI

    // 실제 서비스에서는 WebPush 라이브러리 등을 이용해 푸시 발송 구현 필요
    public void sendPush(Long userId, String title, String body) {
        List<PushSubscription> subs = pushSubscriptionRepository.findByUserId(userId);
        for (PushSubscription sub : subs) {
            // 실제 WebPush 발송 예시 (web-push-java 라이브러리 필요)
            // try {
            //     String payload = "{\"title\":\"" + title + "\",\"body\":\"" + body + "\"}";
            //     Notification notification = new Notification(
            //         sub.getEndpoint(),
            //         sub.getP256dh(),
            //         sub.getAuth(),
            //         payload.getBytes()
            //     );
            //     pushService.send(notification);
            // } catch (Exception e) {
            //     // 로깅 등
            // }
        }
    }

    public void saveSubscription(PushSubscription sub) {
        pushSubscriptionRepository.save(sub);
    }

    public void removeSubscription(Long id) {
        pushSubscriptionRepository.deleteById(id);
    }
}
