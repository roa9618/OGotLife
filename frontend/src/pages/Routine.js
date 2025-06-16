import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Routine() {
    return (
        <div className="dashboard-root">
            <Header />
            <div className="dashboard-body layout-container">
                <div className="dashboard-content">
                    <main className="dashboard-main">
                        <div className="dashboard-grid">
                            <div className="dashboard-progress-row">
                                <div className="dashboard-progress-card">
                                    <div className="dashboard-progress-title">나의 루틴 목록</div>
                                    <ul className="dashboard-daily-list">
                                        <li>아침 운동</li>
                                        <li>영어 단어 암기</li>
                                        <li>책 읽기</li>
                                    </ul>
                                    <button className="dashboard-timetable-item" style={{marginTop: '12px'}}>+ 루틴 추가</button>
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

export default Routine;
