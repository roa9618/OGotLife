import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

function Signup() {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [pw2, setPw2] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pw !== pw2) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        // 회원가입 로직 (예시)
        alert('회원가입 시도: ' + id);
    };

    return (
        <div className="login-root">
            <div className="login-card">
                <div className="login-title">O'Got Life 회원가입</div>
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
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={pw}
                        onChange={e => setPw(e.target.value)}
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        value={pw2}
                        onChange={e => setPw2(e.target.value)}
                        className="login-input"
                    />
                    <button type="submit" className="login-btn">회원가입</button>
                </form>
                <div className="login-bottom">
                    <Link to="/login" className="login-link">로그인</Link>
                </div>
                <div className="login-main-link">
                    <Link to="/dashboard" className="login-link">메인으로 돌아가기</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
