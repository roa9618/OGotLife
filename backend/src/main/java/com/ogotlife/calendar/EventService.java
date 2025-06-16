package com.ogotlife.calendar;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;

    public List<Event> getUserEvents(Long userId) {
        return eventRepository.findByUserId(userId);
    }

    public List<Event> getUserEventsByDate(Long userId, LocalDate date) {
        return eventRepository.findByUserIdAndDate(userId, date);
    }

    public List<Event> getUserEventsBetween(Long userId, LocalDate start, LocalDate end) {
        return eventRepository.findByUserIdAndDateBetween(userId, start, end);
    }

    public Event addEvent(Event event) {
        return eventRepository.save(event);
    }

    public Optional<Event> updateEvent(Long id, Event req) {
        return eventRepository.findById(id).map(event -> {
            event.setDate(req.getDate());
            event.setText(req.getText());
            return eventRepository.save(event);
        });
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
