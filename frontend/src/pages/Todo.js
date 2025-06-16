import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Todo.css';

function Todo() {
    const [todos, setTodos] = useState([
        { id: 1, text: '수학 숙제', done: false },
        { id: 2, text: '영어 단어 외우기', done: true },
        { id: 3, text: '운동 30분', done: false },
    ]);
    const [routines, setRoutines] = useState([
        { id: 1, title: '아침 운동', icon: '💪', checked: false },
        { id: 2, title: '영어 단어 암기', icon: '📚', checked: false },
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        setTodos([
            ...todos,
            {
                id: Date.now(),
                text: newTodo,
                done: false
            }
        ]);
        setNewTodo('');
        setModalOpen(false);
    };

    const handleToggle = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        ));
    };

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleRoutineCheck = (id) => {
        setRoutines(routines.map(r =>
            r.id === id ? { ...r, checked: !r.checked } : r
        ));
    };

    return (
        <div className="todo-root">
            <Header />
            <div className="todo-main">
                <div className="todo-title-row">
                    <span className="todo-title">오늘의 할 일</span>
                    <button className="todo-add-btn" onClick={() => setModalOpen(true)}>
                        <span style={{fontSize:'1.2em', marginRight:6}}>＋</span> 할 일 추가
                    </button>
                </div>
                {routines.length > 0 && (
                    <div className="todo-section">
                        <div className="todo-section-title">등록된 루틴</div>
                        <div className="todo-routine-list">
                            {routines.map(routine => (
                                <div className={`todo-routine-card${routine.checked ? ' todo-routine-card-checked' : ''}`} key={routine.id}>
                                    <input
                                        type="checkbox"
                                        className="todo-routine-check"
                                        checked={routine.checked}
                                        onChange={() => handleRoutineCheck(routine.id)}
                                    />
                                    <span className="todo-routine-icon">{routine.icon}</span>
                                    <span className="todo-routine-title">{routine.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="todo-card-list">
                    {todos.length === 0 && (
                        <div className="todo-empty">아직 등록된 할 일이 없습니다.</div>
                    )}
                    {todos.map(todo => (
                        <div className={`todo-card${todo.done ? ' done' : ''}`} key={todo.id}>
                            <label className="todo-checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={todo.done}
                                    onChange={() => handleToggle(todo.id)}
                                    className="todo-checkbox"
                                />
                                <span className="todo-card-text">{todo.text}</span>
                            </label>
                            <button className="todo-delete-btn" onClick={() => handleDelete(todo.id)}>삭제</button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />

            {modalOpen && (
                <div className="todo-modal-overlay" onClick={() => setModalOpen(false)}>
                    <div className="todo-modal" onClick={e => e.stopPropagation()}>
                        <div className="todo-modal-title">할 일 추가</div>
                        <form className="todo-modal-form" onSubmit={handleAddTodo}>
                            <input
                                className="todo-modal-input"
                                type="text"
                                value={newTodo}
                                onChange={e => setNewTodo(e.target.value)}
                                placeholder="할 일을 입력하세요"
                                maxLength={40}
                                required
                            />
                            <div className="todo-modal-actions">
                                <button type="button" className="todo-modal-cancel" onClick={() => setModalOpen(false)}>취소</button>
                                <button type="submit" className="todo-modal-submit">추가</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Todo;
