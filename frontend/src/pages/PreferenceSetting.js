import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ProfileDropdown.css";
import "../styles/PreferenceSettingPage.css";

function PreferenceSetting() {
    const navigate = useNavigate();
    const [theme, setTheme] = useState('라이트');
    const [alarm, setAlarm] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            await axios.put(
                `/api/user/preference/${username}`,
                { theme, alarmEnabled: alarm },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('환경설정이 저장되었습니다.');
        } catch (err) {
            alert('저장 실패: ' + (err.response?.data || ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="preferencesetting-root">
            <div className="preferencesetting-header">
                <h2 className="preferencesetting-title">환경설정</h2>
                <button className="preferencesetting-main-btn" onClick={() => navigate("/")}>
                    메인으로
                </button>
            </div>
            <div className="preferencesetting-card">
                <form className="preferencesetting-form" onSubmit={handleSubmit}>
                    <div className="preferencesetting-form-group">
                        <label htmlFor="theme">테마</label>
                        <select id="theme" value={theme} onChange={e => setTheme(e.target.value)}>
                            <option>라이트</option>
                            <option>다크</option>
                        </select>
                    </div>
                    <div className="preferencesetting-form-group">
                        <label htmlFor="alarm" style={{ marginBottom: 0 }}>
                            <input type="checkbox" id="alarm" style={{ marginRight: 8 }} checked={alarm} onChange={e => setAlarm(e.target.checked)} />
                            알림 받기
                        </label>
                    </div>
                    <button type="submit" className="preferencesetting-save-btn" disabled={loading}>
                        {loading ? '저장 중...' : '저장'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PreferenceSetting;
