import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import defaultProfileImage from "../assets/default_profile_image.png";
import "../styles/ProfileDropdown.css";
import "../styles/ProfileEditPage.css";

function ProfileEdit() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const [profile, setProfile] = useState(null);
    const [nickname, setNickname] = useState('');
    const [desc, setDesc] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (!username) return;
        axios.get(`/api/user/profile/${username}`)
            .then(res => {
                setProfile(res.data);
                setNickname(res.data.nickname || '');
                setDesc(res.data.description || '');
                setProfileImage(res.data.profileImage || '');
            });
    }, [username]);

    const handleImageChange = e => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleImageUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        const token = localStorage.getItem("token");
        const res = await axios.post(`/api/user/${username}/profile-image`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setProfileImage(res.data);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        await axios.put(
            `/api/user/profile/${username}`,
            { nickname, description: desc, profileImage },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("프로필이 저장되었습니다.");
        navigate("/profile");
    };

    if (!profile) return <div>로딩 중...</div>;

    return (
        <div className="profileedit-root">
            <div className="profileedit-header">
                <h2 className="profileedit-title">프로필 수정</h2>
                <button className="profileedit-main-btn" onClick={() => navigate("/")}>
                    메인으로
                </button>
            </div>
            <div className="profileedit-card">
                <form className="profileedit-form" onSubmit={handleSubmit}>
                    <div className="profileedit-img-wrap">
                        <img
                            className="profileedit-img"
                            src={profileImage || defaultProfileImage}
                            alt="프로필"
                        />
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        <button type="button" onClick={handleImageUpload}>이미지 업로드</button>
                    </div>
                    <div className="profileedit-form-group">
                        <label>닉네임</label>
                        <input value={nickname} onChange={e => setNickname(e.target.value)} />
                    </div>
                    <div className="profileedit-form-group">
                        <label>소개</label>
                        <textarea value={desc} onChange={e => setDesc(e.target.value)} />
                    </div>
                    <button type="submit" className="profileedit-save-btn">저장</button>
                </form>
            </div>
        </div>
    );
}

export default ProfileEdit;
