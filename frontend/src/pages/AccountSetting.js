import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProfileDropdown.css";
import "../styles/AccountSettingPage.css";

function AccountSetting() {
    const navigate = useNavigate();

    return (
        <div className="accountsetting-root">
            <div className="accountsetting-header">
                <h2 className="accountsetting-title">계정 설정</h2>
                <button className="accountsetting-main-btn" onClick={() => navigate("/")}>
                    메인으로
                </button>
            </div>
            <div className="accountsetting-card">
                <form className="accountsetting-form">
                    <div className="accountsetting-form-group">
                        <label htmlFor="email">이메일</label>
                        <input id="email" type="email" placeholder="이메일을 입력하세요" />
                    </div>
                    <div className="accountsetting-form-group">
                        <label htmlFor="password">비밀번호 변경</label>
                        <input id="password" type="password" placeholder="새 비밀번호" />
                    </div>
                    <button type="submit" className="accountsetting-save-btn">저장</button>
                </form>
            </div>
        </div>
    );
}

export default AccountSetting;
