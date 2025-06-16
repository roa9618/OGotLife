import React, { useEffect, useState } from 'react';
import '../styles/Sidebar.css';
import profile_image from '../assets/sidebar_default_profile_image.png';
import setting_icon from '../assets/sidebar_setting_button.png';
import close_icon from '../assets/sidebar_close_button.png';
import post_icon from '../assets/sidebar_post_icon.png';
import comment_icon from '../assets/sidebar_comment_icon.png';
import star_icon from '../assets/sidebar_star_icon.png';

function Sidebar({ visible, onClose }) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const week = ['일', '월', '화', '수', '목', '금', '토'];
            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            const day = now.getDate();
            const dayOfWeek = week[now.getDay()];
            const hour = String(now.getHours()).padStart(2, '0');
            const min = String(now.getMinutes()).padStart(2, '0');
            const sec = String(now.getSeconds()).padStart(2, '0');
            setDate(`${year}년 ${month}월 ${day}일 (${dayOfWeek})`);
            setTime(`${hour} : ${min} : ${sec}`);
        };

        updateDateTime();
        const timer = setInterval(updateDateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <aside className={`sidebar ${visible ? 'show' : 'hide'}`}>
            <button className="sidebar-close-btn" onClick={onClose}>
                <img src={close_icon} alt="close" className="sidebar-close-icon"/>
            </button>
            <div className="sidebar-profile">
                <img src={profile_image} alt="profile" className="sidebar-profile-img"/>
                <div className="sidebar-profile-name">홍길동</div>
                <button className="sidebar-profile-edit">
                    <img src={setting_icon} alt="edit" className="sidebar-profile-edit-icon"/>
                    프로필 수정
                </button>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <button className="sidebar-nav-title sidebar-nav-link">
                            <img src={post_icon} alt="작성글" className="sidebar-nav-icon"/>
                            작성글
                        </button>
                    </li>
                    <li>
                        <button className="sidebar-nav-link">
                            <img src={comment_icon} alt="작성댓글" className="sidebar-nav-icon"/>
                            작성댓글
                        </button>
                    </li>
                    <li>
                        <button className="sidebar-nav-link">
                            <img src={star_icon} alt="내 스크랩" className="sidebar-nav-icon"/>
                            내 스크랩
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="sidebar-footer">
                <div className="sidebar-date">{date}</div>
                <div className="sidebar-time">{time}</div>
            </div>
        </aside>
    );
}

export default Sidebar;