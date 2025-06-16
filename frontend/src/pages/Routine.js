import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Routine.css';

function Routine() {
    const [routines, setRoutines] = useState([
        { id: 1, title: '아침 운동', desc: '30분 스트레칭과 산책', icon: '💪' },
        { id: 2, title: '영어 단어 암기', desc: '매일 20개씩 외우기', icon: '📚' },
        { id: 3, title: '책 읽기', desc: '자기 전 20분 독서', icon: '📖' }
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newIcon, setNewIcon] = useState('🌟');

    const handleAddRoutine = (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;
        setRoutines([
            ...routines,
            {
                id: Date.now(),
                title: newTitle,
                desc: newDesc,
                icon: newIcon
            }
        ]);
        setNewTitle('');
        setNewDesc('');
        setNewIcon('🌟');
        setModalOpen(false);
    };

    const handleDelete = (id) => {
        setRoutines(routines.filter(r => r.id !== id));
    };

    return (
        <div className="routine-root">
            <Header />
            <div className="routine-main">
                <div className="routine-title-row">
                    <span className="routine-title">나의 루틴</span>
                    <button className="routine-add-btn" onClick={() => setModalOpen(true)}>
                        <span style={{fontSize:'1.2em', marginRight:6}}>＋</span> 루틴 추가
                    </button>
                </div>
                <div className="routine-card-list">
                    {routines.length === 0 && (
                        <div className="routine-empty">아직 등록된 루틴이 없습니다.</div>
                    )}
                    {routines.map(routine => (
                        <div className="routine-card" key={routine.id}>
                            <span className="routine-card-icon">{routine.icon}</span>
                            <div className="routine-card-content">
                                <span className="routine-card-title">{routine.title}</span>
                                <span className="routine-card-desc">{routine.desc}</span>
                            </div>
                            <div className="routine-card-actions">
                                <button className="routine-delete-btn" onClick={() => handleDelete(routine.id)}>삭제</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />

            {modalOpen && (
                <div className="routine-modal-overlay" onClick={() => setModalOpen(false)}>
                    <div className="routine-modal" onClick={e => e.stopPropagation()}>
                        <div className="routine-modal-title">루틴 추가</div>
                        <form className="routine-modal-form" onSubmit={handleAddRoutine}>
                            <label className="routine-modal-label">
                                <span>아이콘</span>
                                <select
                                    className="routine-modal-icon-select"
                                    value={newIcon}
                                    onChange={e => setNewIcon(e.target.value)}
                                >
                                    <option value="🌟">🌟</option>
                                    <option value="💪">💪</option>
                                    <option value="📚">📚</option>
                                    <option value="📖">📖</option>
                                    <option value="🧘">🧘</option>
                                    <option value="📝">📝</option>
                                    <option value="🚰">🚰</option>
                                    <option value="🍎">🍎</option>
                                    <option value="🛏️">🛏️</option>
                                </select>
                            </label>
                            <label className="routine-modal-label">
                                <span>루틴명</span>
                                <input
                                    className="routine-modal-input"
                                    type="text"
                                    value={newTitle}
                                    onChange={e => setNewTitle(e.target.value)}
                                    placeholder="루틴명을 입력하세요"
                                    maxLength={20}
                                    required
                                />
                            </label>
                            <label className="routine-modal-label">
                                <span>설명</span>
                                <input
                                    className="routine-modal-input"
                                    type="text"
                                    value={newDesc}
                                    onChange={e => setNewDesc(e.target.value)}
                                    placeholder="간단한 설명을 입력하세요"
                                    maxLength={40}
                                />
                            </label>
                            <div className="routine-modal-actions">
                                <button type="button" className="routine-modal-cancel" onClick={() => setModalOpen(false)}>취소</button>
                                <button type="submit" className="routine-modal-submit">추가</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Routine;
