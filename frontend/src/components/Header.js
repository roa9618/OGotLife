import React from 'react';
import '../styles/Header.css';
import logo_image from '../assets/ogotlife_logo.png';
import alarm_image from '../assets/alarm_image.png';
import profile_image from '../assets/default_profile_image.png';
import profile_side_icon from '../assets/header_profile_side_image.png';

function Header() {
    return (
        <header className = "header">
            <div className = "logo">
                <img src = {logo_image} alt = "main_logo" className = "logo"/>
            </div>
            <div className = "menu">
                <ul>
                    <li><a href = '#'>대시보드</a></li>
                    <li><a href = '#'>루틴</a></li>
                    <li><a href = '#'>To do</a></li>
                    <li><a href = '#'>기록</a></li>
                    <li><a href = '#'>캘린더</a></li>
                    <li><a href = '#'>집중모드</a></li>
                    <li><a href = '#'>커뮤니티</a></li>
                </ul>
            </div>
            <div className = "right_section">
                <img src = {alarm_image} alt = "alarm" className = "alarm_image"/>
                <img src = {profile_image} alt = "profile" className = "profile_image"/>
                <a href = "#">홍길동</a>
                <img src = {profile_side_icon} alt = "profile_side_icon" className = "profile_side_icon"/>
            </div>
        </header>
    );
}

export default Header;