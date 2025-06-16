import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Todo() {
    const todos = [
        { text: '수학 숙제', done: false },
        { text: '영어 단어 외우기', done: true },
        { text: '운동 30분', done: false },
    ];
    return (
        <div className="dashboard-root">
            <Header />
            <div className="dashboard-body layout-container">
                <div className="dashboard-content">
                    <main className="dashboard-main">
                        <div className="dashboard-grid">
                            <div className="dashboard-progress-row">
                                <div className="dashboard-progress-card">
                                    <div className="dashboard-progress-title">오늘의 할 일</div>
                                    <ul className="dashboard-daily-list">
                                        {todos.map((todo, i) => (
                                            <li key={i}>
                                                <input type="checkbox" checked={todo.done} readOnly /> {todo.text}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="dashboard-timetable-item" style={{marginTop: '12px'}}>+ 할 일 추가</button>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Todo;
