import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProfileDropdown.css";
import "../styles/ProfileViewPage.css";
import defaultProfileImage from "../assets/default_profile_image.png";

function ProfileView() {
    const navigate = useNavigate();

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
                        src={defaultProfileImage}
                        alt="프로필"
                    />
                </div>
                <div className="profileview-info">
                    <div className="profileview-name">홍길동</div>
                    <div className="profileview-email">honggildong@email.com</div>
                    <div className="profileview-desc">
                        자기소개나 한 줄 소개가 여기에 들어갑니다.<br />
                        (예시) 꾸준히 성장하는 개발자!
                    </div>
                </div>
            </div>
            <div className="profileview-section">
                <div>
                    <b>가입일</b> : 2024-01-01
                </div>
                <div>
                    <b>최근 접속</b> : 2024-06-01 14:22
                </div>
            </div>
        </div>
    );
}

export default ProfileView;
