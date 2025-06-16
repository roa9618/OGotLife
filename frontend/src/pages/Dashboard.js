import React, { useState } from 'react';
import '../styles/Dashboard.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const progress1 = 60;
    const progress2 = 75;
    const streakData = Array(14 * 7).fill(0).map((_, i) => Math.floor(Math.random() * 4));
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
                            <div className="dashboard-progress-row">
                                <div className="dashboard-progress-card">
                                    <div className="dashboard-progress-title">주간 목표 달성률</div>
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
                                    <div className="dashboard-progress-title">월간 목표 달성률</div>
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