package com.ogotlife.routine;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoutineService {
    private final RoutineRepository routineRepository;

    public List<Routine> getUserRoutines(Long userId) {
        return routineRepository.findByUserId(userId);
    }

    public Routine addRoutine(Routine routine) {
        return routineRepository.save(routine);
    }

    public void deleteRoutine(Long id) {
        routineRepository.deleteById(id);
    }
}
