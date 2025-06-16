import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/Todo.css';

function Todo() {
    const [todos, setTodos] = useState([]);
    const [routines, setRoutines] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newTodo, setNewTodo] = useState('');
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!userId) return;
        axios.get(`/api/todo/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setTodos(res.data));
        axios.get(`/api/routine/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setRoutines(res.data));
    }, [userId, token]);

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        await axios.post('/api/todo', {
            text: newTodo,
            done: false,
            user: { id: userId }
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setNewTodo('');
        setModalOpen(false);
        // 목록 새로고침
        const res = await axios.get(`/api/todo/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setTodos(res.data);
    };

    const handleToggle = async (id, done) => {
        await axios.put(`/api/todo/${id}`, { done: !done }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        // 목록 새로고침
        const res = await axios.get(`/api/todo/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setTodos(res.data);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/todo/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        // 목록 새로고침
        const res = await axios.get(`/api/todo/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setTodos(res.data);
    };

    // 루틴 체크는 실제로는 루틴 기반 투두로 연동 필요(여기선 단순 체크만)
    const handleRoutineCheck = async (routineId, checked) => {
        // 루틴 기반 투두 생성/완료 처리 등 백엔드 연동 필요
        // 예시: await axios.post(`/api/todo`, { ... });
        setRoutines(routines.map(r =>
            r.id === routineId ? { ...r, checked: !checked } : r
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
                                        onChange={() => handleRoutineCheck(routine.id, routine.checked)}
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
                                    onChange={() => handleToggle(todo.id, todo.done)}
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
