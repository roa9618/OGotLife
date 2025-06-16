import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/Routine.css';

function Routine() {
    const [routines, setRoutines] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newIcon, setNewIcon] = useState('🌟');
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!userId) return;
        axios.get(`/api/routine/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setRoutines(res.data));
    }, [userId, token]);

    const handleAddRoutine = async (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;
        await axios.post('/api/routine', {
            title: newTitle,
            description: newDesc,
            icon: newIcon,
            user: { id: userId }
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setNewTitle('');
        setNewDesc('');
        setNewIcon('🌟');
        setModalOpen(false);
        // 목록 새로고침
        const res = await axios.get(`/api/routine/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setRoutines(res.data);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/routine/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        // 목록 새로고침
        const res = await axios.get(`/api/routine/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setRoutines(res.data);
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
                                <span className="routine-card-desc">{routine.description}</span>
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
