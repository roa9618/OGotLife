import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

function FindAccount() {
    const [tab, setTab] = useState('id'); // 'id' 또는 'pw'
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [result, setResult] = useState('');

    const handleIdFind = (e) => {
        e.preventDefault();
        // 실제 서비스에서는 이메일로 아이디 찾기 로직 필요
        setResult('입력하신 이메일로 가입된 아이디는 example_id 입니다.');
    };

    const handlePwFind = (e) => {
        e.preventDefault();
        // 실제 서비스에서는 아이디+이메일로 비밀번호 재설정 메일 발송 로직 필요
        setResult('입력하신 정보로 비밀번호 재설정 메일을 전송했습니다.');
    };

    return (
        <div className="login-root">
            <div className="login-card">
                <div className="login-title">계정 찾기</div>
                <div className="findaccount-tab-row">
                    <button
                        className={`findaccount-tab-btn${tab === 'id' ? ' active' : ''}`}
                        onClick={() => { setTab('id'); setResult(''); }}
                        type="button"
                    >
                        아이디 찾기
                    </button>
                    <button
                        className={`findaccount-tab-btn${tab === 'pw' ? ' active' : ''}`}
                        onClick={() => { setTab('pw'); setResult(''); }}
                        type="button"
                    >
                        비밀번호 찾기
                    </button>
                </div>
                {tab === 'id' ? (
                    <form onSubmit={handleIdFind} className="login-form">
                        <input
                            type="email"
                            placeholder="가입한 이메일"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="login-input"
                            required
                        />
                        <button type="submit" className="login-btn">아이디 찾기</button>
                    </form>
                ) : (
                    <form onSubmit={handlePwFind} className="login-form">
                        <input
                            type="text"
                            placeholder="아이디"
                            value={id}
                            onChange={e => setId(e.target.value)}
                            className="login-input"
                            required
                        />
                        <input
                            type="email"
                            placeholder="가입한 이메일"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="login-input"
                            required
                        />
                        <button type="submit" className="login-btn">비밀번호 찾기</button>
                    </form>
                )}
                {result && <div className="login-result">{result}</div>}
                <div className="login-bottom">
                    <Link to="/login" className="login-link">로그인</Link>
                    <span className="login-divider">|</span>
                    <Link to="/signup" className="login-link">회원가입</Link>
                </div>
                <div className="login-main-link">
                    <Link to="/dashboard" className="login-link">메인으로 돌아가기</Link>
                </div>
            </div>
        </div>
    );
}

export default FindAccount;
