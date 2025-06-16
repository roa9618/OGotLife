import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

function Login({ onLogin }) {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('/api/user/login', {
                username: id,
                password: pw
            });
            if (res.data && res.data.token) {
                localStorage.setItem('token', res.data.token);
                if (onLogin) onLogin();
            } else {
                alert('로그인 실패');
            }
        } catch (err) {
            alert('로그인 실패: ' + (err.response?.data || ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-root">
            <div className="login-card">
                <div className="login-title">O'Got Life 로그인</div>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="text"
                        placeholder="아이디"
                        value={id}
                        onChange={e => setId(e.target.value)}
                        className="login-input"
                        autoFocus
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={pw}
                        onChange={e => setPw(e.target.value)}
                        className="login-input"
                    />
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? '로그인 중...' : '로그인'}
                    </button>
                </form>
                <div className="login-bottom">
                    <Link to="/signup" className="login-link">회원가입</Link>
                    <span className="login-divider">|</span>
                    <Link to="/find-account" className="login-link">계정 찾기</Link>
                </div>
                <div className="login-main-link">
                    <Link to="/dashboard" className="login-link">메인으로 돌아가기</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
