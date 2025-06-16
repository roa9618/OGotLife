package com.ogotlife.todo;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todo")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @GetMapping("/{userId}")
    public List<Todo> getTodos(@PathVariable Long userId) {
        return todoService.getUserTodos(userId);
    }

    @GetMapping("/{userId}/routine/{routineId}")
    public List<Todo> getRoutineTodos(@PathVariable Long userId, @PathVariable Long routineId) {
        return todoService.getUserRoutineTodos(userId, routineId);
    }

    @PostMapping
    public Todo addTodo(@RequestBody Todo todo) {
        return todoService.addTodo(todo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTodo(@PathVariable Long id, @RequestBody Todo req) {
        return todoService.updateTodo(id, req)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.ok().build();
    }
}
