import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

function FindAccount() {
    const [tab, setTab] = useState('id'); // 'id' 또는 'pw'
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [result, setResult] = useState('');
    const [verifyCode, setVerifyCode] = useState('');
    const [sentCode, setSentCode] = useState(false);
    const [verified, setVerified] = useState(false);

    // 아이디 찾기(이메일 인증코드 발송/확인)
    const handleSendCode = async (e) => {
        e.preventDefault();
        setResult('');
        try {
            await axios.post('/api/user/send-verify-code', { email });
            setSentCode(true);
            alert('인증코드가 이메일로 발송되었습니다.');
        } catch (err) {
            alert('인증코드 발송 실패: ' + (err.response?.data || ''));
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/user/verify-code', { email, code: verifyCode });
            if (res.data.verified) {
                setVerified(true);
                // 실제 아이디 찾기
                const idRes = await axios.post('/api/find-account/find-id', { email });
                setResult(`입력하신 이메일로 가입된 아이디는 ${idRes.data} 입니다.`);
            } else {
                alert('인증코드가 올바르지 않습니다.');
            }
        } catch (err) {
            alert('인증 실패: ' + (err.response?.data || ''));
        }
    };

    // 비밀번호 찾기(임시 비밀번호 발송)
    const handlePwFind = async (e) => {
        e.preventDefault();
        setResult('');
        try {
            await axios.post('/api/find-account/reset-password', { username: id, email });
            setResult('입력하신 정보로 임시 비밀번호가 이메일로 발송되었습니다.');
        } catch (err) {
            setResult('비밀번호 찾기 실패: ' + (err.response?.data || ''));
        }
    };

    return (
        <div className="login-root">
            <div className="login-card">
                <div className="login-title">계정 찾기</div>
                <div className="findaccount-tab-row">
                    <button
                        className={`findaccount-tab-btn${tab === 'id' ? ' active' : ''}`}
                        onClick={() => { setTab('id'); setResult(''); setSentCode(false); setVerified(false); }}
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
                    !sentCode ? (
                        <form onSubmit={handleSendCode} className="login-form">
                            <input
                                type="email"
                                placeholder="가입한 이메일"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="login-input"
                                required
                            />
                            <button type="submit" className="login-btn">인증코드 받기</button>
                        </form>
                    ) : !verified ? (
                        <form onSubmit={handleVerifyCode} className="login-form">
                            <input
                                type="text"
                                placeholder="이메일로 받은 인증코드"
                                value={verifyCode}
                                onChange={e => setVerifyCode(e.target.value)}
                                className="login-input"
                                required
                            />
                            <button type="submit" className="login-btn">인증코드 확인</button>
                        </form>
                    ) : (
                        <div className="login-result">{result}</div>
                    )
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
