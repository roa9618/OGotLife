import React from 'react';
import '../styles/Dashboard.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

function Dashboard() {
    return (
        <div className='dashboard-root'>
            <Header />
            <div className='dashboard-body'>
                <Sidebar />
                <div className='dashboard-content'>
                    <main className='dashboard-main'>
                        {/* 여기에 대시보드 본문 내용이 들어갑니다 */}
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;