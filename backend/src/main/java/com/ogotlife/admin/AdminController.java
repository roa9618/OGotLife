package com.ogotlife.admin;

import com.ogotlife.community.Report;
import com.ogotlife.community.ReportRepository;
import com.ogotlife.user.User;
import com.ogotlife.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final UserRepository userRepository;
    private final ReportRepository reportRepository;

    // 회원 전체 목록
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 회원 권한 변경 (USER <-> ADMIN)
    @PutMapping("/user/{id}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable Long id, @RequestBody String role) {
        return userRepository.findById(id).map(user -> {
            user.setRole(role);
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }).orElse(ResponseEntity.notFound().build());
    }

    // 회원 삭제
    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // 신고 목록 조회
    @GetMapping("/reports")
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    // 신고 삭제(처리)
    @DeleteMapping("/report/{id}")
    public ResponseEntity<?> deleteReport(@PathVariable Long id) {
        reportRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // 공지사항 등록/수정/삭제는 별도 Notice 엔티티/컨트롤러로 확장 가능
}
