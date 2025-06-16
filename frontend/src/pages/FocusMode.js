import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function FocusMode() {
    const [isFocusing, setIsFocusing] = useState(false);
    const [time, setTime] = useState(0);

    return (
        <div className="dashboard-root">
            <Header />
            <div className="dashboard-body layout-container">
                <div className="dashboard-content">
                    <main className="dashboard-main">
                        <div className="dashboard-grid">
                            <div className="dashboard-progress-row">
                                <div className="dashboard-progress-card" style={{alignItems:'center', textAlign:'center'}}>
                                    <div style={{fontSize:'2.2rem', fontWeight:'bold', margin:'20px 0'}}>{`${String(Math.floor(time/60)).padStart(2,'0')}:${String(time%60).padStart(2,'0')}`}</div>
                                    <button
                                        className="dashboard-timetable-item"
                                        style={{margin:'8px 0'}}
                                        onClick={() => setIsFocusing(!isFocusing)}
                                    >
                                        {isFocusing ? '종료' : '집중 시작'}
                                    </button>
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

export default FocusMode;
