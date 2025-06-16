import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Calendar() {
    return (
        <div className="dashboard-root">
            <Header />
            <div className="dashboard-body layout-container">
                <div className="dashboard-content">
                    <main className="dashboard-main">
                        <div className="dashboard-grid">
                            <div className="dashboard-progress-row">
                                <div className="dashboard-progress-card" style={{minHeight: '240px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                                    <span style={{color:'#bbb'}}>여기에 캘린더가 표시됩니다.</span>
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

export default Calendar;
