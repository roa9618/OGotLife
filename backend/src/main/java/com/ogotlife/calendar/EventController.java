package com.ogotlife.calendar;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @GetMapping("/{userId}")
    public List<Event> getEvents(@PathVariable Long userId) {
        return eventService.getUserEvents(userId);
    }

    @GetMapping("/{userId}/date/{date}")
    public List<Event> getEventsByDate(@PathVariable Long userId, @PathVariable String date) {
        return eventService.getUserEventsByDate(userId, LocalDate.parse(date));
    }

    @GetMapping("/{userId}/range")
    public List<Event> getEventsBetween(
            @PathVariable Long userId,
            @RequestParam String start,
            @RequestParam String end
    ) {
        return eventService.getUserEventsBetween(userId, LocalDate.parse(start), LocalDate.parse(end));
    }

    @PostMapping
    public Event addEvent(@RequestBody Event event) {
        return eventService.addEvent(event);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody Event req) {
        return eventService.updateEvent(id, req)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok().build();
    }
}
