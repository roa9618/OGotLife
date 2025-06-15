import React, { useState } from 'react';
import '../styles/Dashboard.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

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
                        {/* 여기에 대시보드 본문 내용이 들어갑니다 */}
                    </main>
                    
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;