import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ProfileDropdown.css";
import "../styles/ProfileViewPage.css";
import defaultProfileImage from "../assets/default_profile_image.png";

function ProfileView() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const username = localStorage.getItem("username"); // 또는 context 등에서 가져오기

    useEffect(() => {
        if (!username) return;
        axios.get(`/api/user/profile/${username}`)
            .then(res => setProfile(res.data))
            .catch(() => setProfile(null));
    }, [username]);

    if (!profile) {
        return <div className="profileview-root">로딩 중...</div>;
    }

    return (
        <div className="profileview-root">
            <div className="profileview-header">
                <h2 className="profileview-title">내 프로필 보기</h2>
                <button className="profileview-main-btn" onClick={() => navigate("/")}>
                    메인으로
                </button>
            </div>
            <div className="profileview-card">
                <div className="profileview-img-wrap">
                    <img
                        className="profileview-img"
                        src={profile.profileImage || defaultProfileImage}
                        alt="프로필"
                    />
                </div>
                <div className="profileview-info">
                    <div className="profileview-name">{profile.nickname || profile.username}</div>
                    <div className="profileview-email">{profile.email}</div>
                    <div className="profileview-desc">
                        {profile.description || "자기소개가 없습니다."}
                    </div>
                </div>
            </div>
            {/* 가입일, 최근 접속 등은 백엔드에 필드가 있으면 추가 */}
        </div>
    );
}

export default ProfileView;
