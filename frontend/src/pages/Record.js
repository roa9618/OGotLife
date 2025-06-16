import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
    const [records, setRecords] = useState([
        {
            id: 1,
            date: '2023-04-08',
            emotion: '😄',
            diary: '오늘은 정말 뿌듯한 하루였다! 목표한 공부를 모두 끝냈다.',
        },
        {
            id: 2,
            date: '2023-04-07',
            emotion: '😐',
            diary: '조금 피곤했지만 그래도 할 일은 했다.',
        },
        {
            id: 3,
            date: '2023-04-06',
            emotion: '😭',
            diary: '오늘은 힘든 하루였다. 내일은 더 나아지길.',
        },
        {
            id: 4,
            date: '2023-04-05',
            emotion: '🙂',
            diary: '산책을 하며 기분이 좋아졌다.',
        },
        {
            id: 5,
            date: '2023-04-04',
            emotion: '😔',
            diary: '공부가 잘 안돼서 속상했다.',
        },
        {
            id: 6,
            date: '2023-04-03',
            emotion: '😄',
            diary: '친구와 맛있는 저녁을 먹었다!',
        },
    ]);
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(records.length / PAGE_SIZE);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!emotion || !diary.trim()) return;
        setRecords([
            {
                id: Date.now(),
                date: new Date().toISOString().slice(0, 10),
                emotion,
                diary,
            },
            ...records,
        ]);
        setEmotion('');
        setDiary('');
        setPage(1);
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
                {totalPages > 1 && (
                    <div className="record-pagination">
                        <button
                            className="record-page-btn"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                        >
                            &lt;
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
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
                            disabled={page === totalPages}
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
