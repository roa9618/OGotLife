import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ProfileDropdown.css";
import "../styles/AccountSettingPage.css";

function AccountSetting() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            await axios.put(
                `/api/user/account/${username}`,
                { email, password },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('계정 정보가 저장되었습니다.');
        } catch (err) {
            alert('저장 실패: ' + (err.response?.data || ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="accountsetting-root">
            <div className="accountsetting-header">
                <h2 className="accountsetting-title">계정 설정</h2>
                <button className="accountsetting-main-btn" onClick={() => navigate("/")}>
                    메인으로
                </button>
            </div>
            <div className="accountsetting-card">
                <form className="accountsetting-form" onSubmit={handleSubmit}>
                    <div className="accountsetting-form-group">
                        <label htmlFor="email">이메일</label>
                        <input id="email" type="email" placeholder="이메일을 입력하세요" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="accountsetting-form-group">
                        <label htmlFor="password">비밀번호 변경</label>
                        <input id="password" type="password" placeholder="새 비밀번호" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="accountsetting-save-btn" disabled={loading}>
                        {loading ? '저장 중...' : '저장'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AccountSetting;
