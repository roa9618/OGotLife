import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import MyPosts from './MyPosts';
import MyComments from './MyComments';
import MyScraps from './MyScraps';
import axios from 'axios';

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("dashboard");

    // 추가: 대시보드 데이터 상태
    const [todos, setTodos] = useState([]);
    const [routines, setRoutines] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [focusHistory, setFocusHistory] = useState([]);
    const [streakData, setStreakData] = useState([]);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!userId || !token) return;
        // 투두
        axios.get(`/api/todo/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setTodos(res.data || []));
        // 루틴
        axios.get(`/api/routine/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setRoutines(res.data || []));
        // 캘린더
        axios.get(`/api/calendar/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setCalendarEvents(res.data || []));
        // 집중모드
        axios.get(`/api/focus/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setFocusHistory(res.data || []));
        // 히트맵(백엔드에 API가 있다면)
        axios.get(`/api/dashboard/streak/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setStreakData(res.data || []))
        .catch(() => setStreakData([])); // 없으면 빈 배열
    }, [userId, token]);

    // 오늘 날짜
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);

    // 오늘의 투두 진행도
    const todayTodos = todos.filter(todo => todo.createdAt && todo.createdAt.slice(0, 10) === todayStr);
    const todoDoneCount = todayTodos.filter(todo => todo.done).length;
    const todoTotalCount = todayTodos.length;
    const progress2 = todoTotalCount > 0 ? Math.round((todoDoneCount / todoTotalCount) * 100) : 0;

    // 오늘의 루틴 진행도 (루틴 체크 여부가 있다면)
    // 루틴에 checked 또는 todayDone 등 필드가 있다면 사용, 없으면 전체 개수로 0%
    const routineDoneCount = routines.filter(r => r.checked || r.todayDone).length;
    const routineTotalCount = routines.length;
    const progress1 = routineTotalCount > 0 ? Math.round((routineDoneCount / routineTotalCount) * 100) : 0;

    // 오늘/향후 5일 일정
    const dailyData = Array.from({ length: 5 }).map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = date.toISOString().slice(0, 10);
        const events = calendarEvents.filter(ev => ev.date === dateStr);
        return {
            date: date.toLocaleDateString("ko-KR", { month: "2-digit", day: "2-digit", weekday: "short" }),
            todos: events.length > 0 ? events.map(ev => ev.text) : ["일정을 입력해주세요."]
        };
    });

    // 오늘의 집중모드 기록
    const todayFocus = focusHistory.filter(item => {
        const itemDate = item.createdAt ? item.createdAt.slice(0, 10) : '';
        return itemDate === todayStr;
    });

    // 히트맵 데이터: streakData가 있으면 사용, 없으면 임시 랜덤
    const heatmapData = streakData.length > 0
        ? streakData.map(d => d.score ?? 0)
        : Array(14 * 7).fill(0).map(() => Math.floor(Math.random() * 4));

    return (
        <div className="dashboard-root">
            <Header/>
            <div className="dashboard-body layout-container">
                {sidebarOpen && (
                    <Sidebar
                        visible={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                )}

                {!sidebarOpen && (
                    <button className="sidebar-open-btn" onClick={() => setSidebarOpen(true)} aria-label="사이드바 열기">
                        ▶
                    </button>
                )}

                <div className="dashboard-content">
                    <main className="dashboard-main">
                        {activeTab === "dashboard" && (
                            <div className="dashboard-grid">
                                <div className="dashboard-progress-row">
                                    <div className="dashboard-progress-card">
                                        <div className="dashboard-progress-title">오늘의 루틴 진행도</div>
                                        <div className="dashboard-progress-bar-wrap">
                                            <div
                                                className="dashboard-progress-comment"
                                                style={{ left: `calc(${progress1}% - 28px)` }}
                                            >
                                                {progress1}%
                                                <span className="dashboard-progress-comment-arrow"></span>
                                            </div>
                                            <div className="dashboard-progress-bar">
                                                <div
                                                    className="dashboard-progress-bar-inner"
                                                    style={{ width: `${progress1}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dashboard-progress-card">
                                        <div className="dashboard-progress-title">오늘의 To Do 진행도</div>
                                        <div className="dashboard-progress-bar-wrap">
                                            <div
                                                className="dashboard-progress-comment"
                                                style={{ left: `calc(${progress2}% - 28px)` }}
                                            >
                                                {progress2}%
                                                <span className="dashboard-progress-comment-arrow"></span>
                                            </div>
                                            <div className="dashboard-progress-bar">
                                                <div
                                                    className="dashboard-progress-bar-inner"
                                                    style={{ width: `${progress2}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="dashboard-daily-row">
                                    {dailyData.map((day, idx) => (
                                        <div className="dashboard-daily-card" key={idx}>
                                            <div className="dashboard-daily-date">{day.date}</div>
                                            <ul className="dashboard-daily-list">
                                                {day.todos.map((todo, i) => (
                                                    <li key={i}>{todo}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                                <div className="dashboard-bottom-row">
                                    <div className="dashboard-streak-card">
                                        <div className="dashboard-streak-title">최근 4개월 계획 성공률 히트맵</div>
                                        <div className="dashboard-streak-heatmap">
                                            {heatmapData.map((val, i) => (
                                                <div
                                                    key={i}
                                                    className={`dashboard-streak-cell dashboard-streak-cell-${val}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="dashboard-timetable-card">
                                        <div className="dashboard-timetable-header">
                                            <span className="dashboard-timetable-title">집중모드 기록</span>
                                        </div>
                                        <div className="dashboard-focus-list">
                                            {todayFocus.map((rec, i) => (
                                                <div className="dashboard-focus-item" key={i}>
                                                    <span className="dashboard-focus-time">
                                                        {rec.startTime && rec.endTime
                                                            ? `${rec.startTime} - ${rec.endTime}`
                                                            : ''}
                                                    </span>
                                                    <span className="dashboard-focus-duration">
                                                        {rec.duration}분
                                                    </span>
                                                </div>
                                            ))}
                                            {todayFocus.length === 0 && (
                                                <div className="dashboard-focus-item">오늘 집중 기록이 없습니다.</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "myposts" && <MyPosts />}
                        {activeTab === "mycomments" && <MyComments />}
                        {activeTab === "myscraps" && <MyScraps />}
                    </main>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;