import React from "react";
import "../styles/ProfileDropdown.css";

function AccountSetting() {
    return (
        <div className="profile-dropdown-root">
            <h2 className="profile-dropdown-title">계정 설정</h2>
            <form className="profile-dropdown-form">
                <label>이메일</label>
                <input type="email" placeholder="이메일을 입력하세요" />
                <label>비밀번호 변경</label>
                <input type="password" placeholder="새 비밀번호" />
                <button type="submit">저장</button>
            </form>
        </div>
    );
}

export default AccountSetting;
