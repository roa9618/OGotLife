package com.ogotlife.todo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;

    public List<Todo> getUserTodos(Long userId) {
        return todoRepository.findByUserIdOrderByIdDesc(userId);
    }

    public List<Todo> getUserRoutineTodos(Long userId, Long routineId) {
        return todoRepository.findByUserIdAndRoutineId(userId, routineId);
    }

    public Todo addTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public Optional<Todo> updateTodo(Long id, Todo req) {
        return todoRepository.findById(id).map(todo -> {
            todo.setText(req.getText());
            todo.setDone(req.isDone());
            return todoRepository.save(todo);
        });
    }

    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
}
