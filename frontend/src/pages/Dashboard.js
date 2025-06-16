import React, { useState } from 'react';
import '../styles/Dashboard.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import MyPosts from './MyPosts';
import MyComments from './MyComments';
import MyScraps from './MyScraps';

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("dashboard");
    const progress1 = 60;
    const progress2 = 75;
    const streakData = Array(14 * 7).fill(0).map((_, i) => Math.floor(Math.random() * 4));
    const today = new Date();
    const dailyData = Array.from({ length: 5 }).map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return {
            date: date.toLocaleDateString("ko-KR", { month: "2-digit", day: "2-digit", weekday: "short" }),
            todos: [
                "일정을 입력해주세요.",
                "일정을 입력해주세요.",
                "일정을 입력해주세요."
            ]
        };
    });

    const focusRecords = [
        { time: "12:00 - 12:35", duration: 35 },
        { time: "13:00 - 13:50", duration: 50 },
        { time: "14:00 - 14:30", duration: 30 },
        { time: "15:00 - 15:25", duration: 25 },
    ];

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
                                            {streakData.map((val, i) => (
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
                                            {focusRecords.map((rec, i) => (
                                                <div className="dashboard-focus-item" key={i}>
                                                    <span className="dashboard-focus-time">{rec.time}</span>
                                                    <span className="dashboard-focus-duration">{rec.duration}분</span>
                                                </div>
                                            ))}
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