import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/Record.css';

const EMOTIONS = [
    { emoji: '😄', label: '매우 좋음' },
    { emoji: '🙂', label: '좋음' },
    { emoji: '😐', label: '보통' },
    { emoji: '😔', label: '나쁨' },
    { emoji: '😭', label: '매우 나쁨' },
];

const PAGE_SIZE = 4;

function Record() {
    const [emotion, setEmotion] = useState('');
    const [diary, setDiary] = useState('');
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(1);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!userId) return;
        axios.get(`/api/record/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setRecords(res.data));
    }, [userId, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emotion || !diary.trim()) return;
        await axios.post('/api/record', {
            emotion,
            diary,
            user: { id: userId }
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setEmotion('');
        setDiary('');
        setPage(1);
        // 목록 새로고침
        const res = await axios.get(`/api/record/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setRecords(res.data);
    };

    const pagedRecords = records.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="record-root">
            <Header />
            <div className="record-main">
                <div className="record-title-row">
                    <span className="record-title">오늘의 일기 & 감정 트래킹</span>
                </div>
                <form className="record-form" onSubmit={handleSubmit}>
                    <div className="record-emotion-row">
                        <span className="record-emotion-label">오늘의 감정</span>
                        <div className="record-emotion-list">
                            {EMOTIONS.map(e => (
                                <button
                                    type="button"
                                    key={e.emoji}
                                    className={`record-emotion-btn${emotion === e.emoji ? ' selected' : ''}`}
                                    onClick={() => setEmotion(e.emoji)}
                                    aria-label={e.label}
                                >
                                    {e.emoji}
                                </button>
                            ))}
                        </div>
                    </div>
                    <textarea
                        className="record-diary-input"
                        placeholder="오늘 하루를 기록해보세요."
                        value={diary}
                        onChange={e => setDiary(e.target.value)}
                        rows={4}
                        maxLength={300}
                        required
                    />
                    <div className="record-form-actions">
                        <button type="submit" className="record-save-btn">저장</button>
                    </div>
                </form>
                <div className="record-section-title">최근 일기</div>
                <div className="record-list record-list-paged">
                    {pagedRecords.length === 0 && (
                        <div className="record-empty">아직 작성된 일기가 없습니다.</div>
                    )}
                    {pagedRecords.map(rec => (
                        <div className="record-card" key={rec.id}>
                            <div className="record-card-header">
                                <span className="record-card-emotion">{rec.emotion}</span>
                                <span className="record-card-date">{rec.date}</span>
                            </div>
                            <div className="record-card-diary">{rec.diary}</div>
                        </div>
                    ))}
                </div>
                {Math.ceil(records.length / PAGE_SIZE) > 1 && (
                    <div className="record-pagination">
                        <button
                            className="record-page-btn"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                        >
                            &lt;
                        </button>
                        {Array.from({ length: Math.ceil(records.length / PAGE_SIZE) }, (_, i) => (
                            <button
                                key={i + 1}
                                className={`record-page-btn${page === i + 1 ? ' active' : ''}`}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            className="record-page-btn"
                            onClick={() => setPage(page + 1)}
                            disabled={page === Math.ceil(records.length / PAGE_SIZE)}
                        >
                            &gt;
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Record;
