import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/FocusMode.css';

function formatTime(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
}

function FocusMode() {
    const [isFocusing, setIsFocusing] = useState(false);
    const [time, setTime] = useState(0);
    const [history, setHistory] = useState([]);
    const [desc, setDesc] = useState('');
    const timerRef = useRef(null);

    const handleStart = () => {
        setIsFocusing(true);
        timerRef.current = setInterval(() => {
            setTime(t => t + 1);
        }, 1000);
    };

    const handleStop = () => {
        setIsFocusing(false);
        clearInterval(timerRef.current);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!desc.trim()) return;
        setHistory([
            { id: Date.now(), time, desc },
            ...history
        ]);
        setTime(0);
        setDesc('');
    };

    React.useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    const todayStr = new Date().toISOString().slice(0, 10);
    const todayHistory = history.filter(item => {
        const itemDate = new Date(item.id).toISOString().slice(0, 10);
        return itemDate === todayStr;
    });

    return (
        <div className="focus-root">
            <Header />
            <div className="focus-main">
                <div className="focus-title-row">
                    <span className="focus-title">집중모드</span>
                </div>
                <div className="focus-timer-card">
                    <div className="focus-timer-display">{formatTime(time)}</div>
                    <div className="focus-timer-actions">
                        {!isFocusing ? (
                            <button className="focus-btn focus-start-btn" onClick={handleStart}>집중 시작</button>
                        ) : (
                            <button className="focus-btn focus-stop-btn" onClick={handleStop}>종료</button>
                        )}
                    </div>
                    {!isFocusing && time > 0 && (
                        <form className="focus-save-form" onSubmit={handleSave}>
                            <input
                                className="focus-desc-input"
                                type="text"
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                                placeholder="이 시간 동안 한 일을 입력하세요"
                                maxLength={40}
                                required
                            />
                            <button className="focus-btn focus-save-btn" type="submit">저장</button>
                        </form>
                    )}
                </div>
                <div className="focus-section-title">오늘의 집중 기록</div>
                <div className="focus-history-list">
                    {todayHistory.length === 0 && (
                        <div className="focus-history-empty">아직 저장된 기록이 없습니다.</div>
                    )}
                    {todayHistory.map(item => (
                        <div className="focus-history-card" key={item.id}>
                            <span className="focus-history-time">{formatTime(item.time)}</span>
                            <span className="focus-history-desc">{item.desc}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default FocusMode;
