import React from "react";
import "../styles/ProfileDropdown.css";

function ProfileView() {
    return (
        <div className="profile-dropdown-root">
            <h2 className="profile-dropdown-title">내 프로필 보기</h2>
            <div className="profile-dropdown-section">
                여기에 내 프로필 정보가 표시됩니다.
            </div>
        </div>
    );
}

export default ProfileView;
