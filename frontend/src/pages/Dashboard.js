import React, { useState } from 'react';
import '../styles/Dashboard.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const progress = 60;
    const todoProgress = 40;
    const streakData = Array(7 * 6).fill(0).map((_, i) => Math.floor(Math.random() * 3));
    const timeTable = [
        { time: "12:00 - 12:35", task: "공부" },
        { time: "13:00 - 13:25", task: "공부" },
        { time: "15:00 - 15:25", task: "공부" },
        { time: "15:30 - 15:55", task: "공부" },
        { time: "16:00 - 16:25", task: "공부" },
        { time: "16:30 - 16:55", task: "공부" },
    ];
    const totalStudy = "총 3시간 20분 진행";

    return (
        <div className="dashboard-root">
            <Header/>
            <div className="dashboard-body layout-container">
                {sidebarOpen && (
                    <Sidebar visible={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
                )}

                {!sidebarOpen && (
                    <button className="sidebar-open-btn" onClick={() => setSidebarOpen(true)} aria-label="사이드바 열기">
                        ▶
                    </button>
                )}

                <div className="dashboard-content">
                    <main className="dashboard-main">
                        <div className="dashboard-grid">
                            {/* 상단 진행도 */}
                            <div className="dashboard-progress-row">
                                <div className="dashboard-progress-card">
                                    <div className="dashboard-progress-title">오늘의 루틴 진행도</div>
                                    <div className="dashboard-progress-bar">
                                        <div className="dashboard-progress-bar-inner" style={{width: `${progress}%`}} />
                                    </div>
                                    <div className="dashboard-progress-label">진행중</div>
                                </div>
                                <div className="dashboard-progress-card">
                                    <div className="dashboard-progress-title">오늘의 To do 진행도</div>
                                    <div className="dashboard-progress-bar">
                                        <div className="dashboard-progress-bar-inner" style={{width: `${todoProgress}%`}} />
                                    </div>
                                </div>
                            </div>
                            {/* 데일리 로그 */}
                            <div className="dashboard-daily-row">
                                {[4.07, 4.08, 4.09, 4.10, 4.11].map((date, idx) => (
                                    <div className="dashboard-daily-card" key={date}>
                                        <div className="dashboard-daily-date">{date}</div>
                                        <ul className="dashboard-daily-list">
                                            <li>일정을 입력해주세요.</li>
                                            <li>일정을 입력해주세요.</li>
                                            <li>일정을 입력해주세요.</li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            {/* 하단: 히트맵 & 타임테이블 */}
                            <div className="dashboard-bottom-row">
                                <div className="dashboard-streak-card">
                                    <div className="dashboard-streak-title">최근 4주간 나의 연속성 습관표</div>
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
                                    <div className="dashboard-timetable-title">집중도 기록</div>
                                    <div className="dashboard-timetable-list">
                                        {timeTable.map((item, i) => (
                                            <div key={i} className="dashboard-timetable-item">
                                                <span>{item.time}</span>
                                                <span>{item.task}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="dashboard-timetable-total">{totalStudy}</div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;