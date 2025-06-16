import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 로그인 로직 (예시)
        alert('로그인 시도: ' + id);
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
                    <button type="submit" className="login-btn">로그인</button>
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
