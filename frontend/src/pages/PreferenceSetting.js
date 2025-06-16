import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProfileDropdown.css";
import "../styles/PreferenceSettingPage.css";

function PreferenceSetting() {
    const navigate = useNavigate();

    return (
        <div className="preferencesetting-root">
            <div className="preferencesetting-header">
                <h2 className="preferencesetting-title">환경설정</h2>
                <button className="preferencesetting-main-btn" onClick={() => navigate("/")}>
                    메인으로
                </button>
            </div>
            <div className="preferencesetting-card">
                <form className="preferencesetting-form">
                    <div className="preferencesetting-form-group">
                        <label htmlFor="theme">테마</label>
                        <select id="theme">
                            <option>라이트</option>
                            <option>다크</option>
                        </select>
                    </div>
                    <div className="preferencesetting-form-group">
                        <label htmlFor="alarm" style={{ marginBottom: 0 }}>
                            <input type="checkbox" id="alarm" style={{ marginRight: 8 }} />
                            알림 받기
                        </label>
                    </div>
                    <button type="submit" className="preferencesetting-save-btn">저장</button>
                </form>
            </div>
        </div>
    );
}

export default PreferenceSetting;
