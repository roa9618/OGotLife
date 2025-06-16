import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Record() {
    const records = [
        { date: '2023-04-08', content: '수학 2시간, 영어 1시간' },
        { date: '2023-04-07', content: '운동 30분, 독서 1시간' },
    ];
    return (
        <div className="dashboard-root">
            <Header />
            <div className="dashboard-body layout-container">
                <div className="dashboard-content">
                    <main className="dashboard-main">
                        <div className="dashboard-grid">
                            <div className="dashboard-daily-row">
                                {records.map((rec, i) => (
                                    <div className="dashboard-daily-card" key={i}>
                                        <div className="dashboard-daily-date">{rec.date}</div>
                                        <div className="dashboard-daily-list">{rec.content}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Record;
