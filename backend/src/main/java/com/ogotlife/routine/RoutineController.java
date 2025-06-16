package com.ogotlife.routine;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/routine")
@RequiredArgsConstructor
public class RoutineController {
    private final RoutineService routineService;

    @GetMapping("/{userId}")
    public List<Routine> getRoutines(@PathVariable Long userId) {
        return routineService.getUserRoutines(userId);
    }

    @PostMapping
    public Routine addRoutine(@RequestBody Routine routine) {
        return routineService.addRoutine(routine);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRoutine(@PathVariable Long id) {
        routineService.deleteRoutine(id);
        return ResponseEntity.ok().build();
    }
}
