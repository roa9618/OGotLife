import React from "react";
import "../styles/ProfileDropdown.css";

function PreferenceSetting() {
    return (
        <div className="profile-dropdown-root">
            <h2 className="profile-dropdown-title">환경설정</h2>
            <form className="profile-dropdown-form">
                <label>테마</label>
                <select>
                    <option>라이트</option>
                    <option>다크</option>
                </select>
                <label>알림 설정</label>
                <input type="checkbox" id="alarm" />
                <label htmlFor="alarm" style={{ display: "inline", marginLeft: 8 }}>알림 받기</label>
                <button type="submit">저장</button>
            </form>
        </div>
    );
}

export default PreferenceSetting;
