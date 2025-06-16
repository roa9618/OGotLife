import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Calendar.css';

function getDaysArray(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const days = [];
    let week = [];
    for (let i = 0; i < firstDay; i++) week.push(null);
    for (let d = 1; d <= lastDate; d++) {
        week.push(d);
        if (week.length === 7) {
            days.push(week);
            week = [];
        }
    }
    if (week.length > 0) {
        while (week.length < 7) week.push(null);
        days.push(week);
    }
    return days;
}

const todayObj = new Date();

function Calendar() {
    const [current, setCurrent] = useState({
        year: todayObj.getFullYear(),
        month: todayObj.getMonth()
    });
    const [events, setEvents] = useState([
        { date: '2025-06-16', text: '스터디 모임' },
        { date: '2025-06-16', text: '프로젝트 마감' }
    ]);
    const [modal, setModal] = useState({ open: false, date: '', text: '', editIdx: null });

    const days = getDaysArray(current.year, current.month);
    const monthStr = `${current.year}년 ${current.month + 1}월`;

    const handlePrev = () => {
        setCurrent(c => {
            const prevMonth = c.month === 0 ? 11 : c.month - 1;
            const prevYear = c.month === 0 ? c.year - 1 : c.year;
            return { year: prevYear, month: prevMonth };
        });
    };
    const handleNext = () => {
        setCurrent(c => {
            const nextMonth = c.month === 11 ? 0 : c.month + 1;
            const nextYear = c.month === 11 ? c.year + 1 : c.year;
            return { year: nextYear, month: nextMonth };
        });
    };

    const openAddModal = (dateStr) => {
        setModal({ open: true, date: dateStr, text: '', editIdx: null });
    };

    const openEditModal = (dateStr, idx, text) => {
        setModal({ open: true, date: dateStr, text, editIdx: idx });
    };

    const closeModal = () => setModal({ open: false, date: '', text: '', editIdx: null });

    const handleModalSubmit = (e) => {
        e.preventDefault();
        if (!modal.text.trim()) return;
        if (modal.editIdx !== null) {
            setEvents(events.map((ev, i) =>
                i === modal.editIdx ? { ...ev, text: modal.text } : ev
            ));
        } else {
            setEvents([...events, { date: modal.date, text: modal.text }]);
        }
        closeModal();
    };

    const handleDelete = (idx) => {
        setEvents(events.filter((_, i) => i !== idx));
        closeModal();
    };

    const getDateStr = (d) =>
        `${current.year}-${String(current.month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

    // 오늘 날짜 문자열
    const todayStr = `${todayObj.getFullYear()}-${String(todayObj.getMonth() + 1).padStart(2, '0')}-${String(todayObj.getDate()).padStart(2, '0')}`;
    const todayEvents = events.filter(ev => ev.date === todayStr);

    return (
        <div className="calendar-root">
            <Header />
            <div className="calendar-main">
                <div className="calendar-title-row">
                    <button className="calendar-nav-btn" onClick={handlePrev}>&lt;</button>
                    <span className="calendar-title">{monthStr}</span>
                    <button className="calendar-nav-btn" onClick={handleNext}>&gt;</button>
                </div>
                <div className="calendar-board">
                    <div className="calendar-weekdays">
                        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                            <div className="calendar-weekday" key={day}>{day}</div>
                        ))}
                    </div>
                    <div className="calendar-days">
                        {days.map((week, wi) => (
                            <div className="calendar-week" key={wi}>
                                {week.map((d, di) => {
                                    const dateStr = d ? getDateStr(d) : '';
                                    const dayEvents = events
                                        .map((ev, idx) => ({ ...ev, idx }))
                                        .filter(ev => ev.date === dateStr);
                                    const isToday =
                                        d &&
                                        current.year === todayObj.getFullYear() &&
                                        current.month === todayObj.getMonth() &&
                                        d === todayObj.getDate();
                                    return (
                                        <div
                                            className={`calendar-day${d ? '' : ' empty'}${isToday ? ' today' : ''}`}
                                            key={di}
                                            onClick={d ? () => openAddModal(dateStr) : undefined}
                                        >
                                            {d && <span className="calendar-day-num">{d}</span>}
                                            {dayEvents.map(ev => (
                                                <div
                                                    className="calendar-event"
                                                    key={ev.idx}
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        openEditModal(dateStr, ev.idx, ev.text);
                                                    }}
                                                >
                                                    {ev.text}
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
                {/* 오늘 일정 리스트만 표시 */}
                <div className="calendar-today-event-section">
                    <div className="calendar-today-event-title">오늘의 일정</div>
                    {todayEvents.length === 0 ? (
                        <div className="calendar-today-event-empty">오늘 등록된 일정이 없습니다.</div>
                    ) : (
                        <ul className="calendar-today-event-list">
                            {todayEvents.map((ev, i) => (
                                <li key={i} className="calendar-today-event-item">
                                    <span className="calendar-today-event-text">{ev.text}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <Footer />
            {modal.open && (
                <div className="calendar-modal-overlay" onClick={closeModal}>
                    <div className="calendar-modal" onClick={e => e.stopPropagation()}>
                        <div className="calendar-modal-title">
                            {modal.editIdx !== null ? '일정 수정' : '일정 추가'}
                        </div>
                        <form className="calendar-modal-form" onSubmit={handleModalSubmit}>
                            <div className="calendar-modal-date">{modal.date}</div>
                            <input
                                className="calendar-modal-input"
                                type="text"
                                value={modal.text}
                                onChange={e => setModal({ ...modal, text: e.target.value })}
                                placeholder="일정 내용을 입력하세요"
                                maxLength={40}
                                required
                            />
                            <div className="calendar-modal-actions">
                                {modal.editIdx !== null && (
                                    <button
                                        type="button"
                                        className="calendar-modal-delete"
                                        onClick={() => handleDelete(modal.editIdx)}
                                    >
                                        삭제
                                    </button>
                                )}
                                <button type="button" className="calendar-modal-cancel" onClick={closeModal}>
                                    취소
                                </button>
                                <button type="submit" className="calendar-modal-submit">
                                    {modal.editIdx !== null ? '수정' : '추가'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Calendar;
