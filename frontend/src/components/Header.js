import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';
import logo_image from '../assets/ogotlife_logo.png';
import alarm_image from '../assets/alarm_image.png';
import profile_image from '../assets/default_profile_image.png';
import profile_side_icon from '../assets/header_profile_side_image.png';
import laptop from '../assets/header_profile_laptop.png';
import logout from '../assets/header_profile_logout.png';
import setting from '../assets/header_profile_setting.png';
import user from '../assets/header_profile_user.png';
import message from '../assets/header_profile_message.png';
import alarmComment from '../assets/header_alarm_message.png';
import alarmLike from '../assets/header_alarm_heart.png';
import alarmNotice from '../assets/header_alarm_check.png';
import alarmReply from '../assets/header_alarm_comment.png';

function Header() {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showAlarmMenu, setShowAlarmMenu] = useState(false);
    const profileNameRef = useRef(null);
    const alarmRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                profileNameRef.current && !profileNameRef.current.contains(event.target) &&
                alarmRef.current && !alarmRef.current.contains(event.target)
            ) {
                setShowProfileMenu(false);
                setShowAlarmMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleProfileMenuToggle = () => {
        setShowProfileMenu((prev) => !prev);
        setShowAlarmMenu(false);
    };

    const handleAlarmMenuToggle = () => {
        setShowAlarmMenu((prev) => !prev);
        setShowProfileMenu(false);
    };

    const alarms = [
        {
            icon: alarmComment,
            content: <><b>홍길동</b>님이 댓글을 남겼습니다.</>,
            time: "1시간전"
        },
        {
            icon: alarmLike,
            content: <><b>홍길동</b>님이 공감을 남겼습니다.</>,
            time: "2시간전"
        },
        {
            icon: alarmNotice,
            content: <> <b>아침일찍 일어나는법</b>의 조회수가 <b>100</b>이 넘었습니다.</>,
            time: "7시간전"
        },
        {
            icon: alarmReply,
            content: <>문의사항에 답변이 달렸습니다.</>,
            time: "1일전"
        }
    ];

    return (
        <header className="header">
            <div className="logo">
                <img src={logo_image} alt="main_logo" className="logo" />
            </div>
            <div className="menu">
                <ul>
                    <li><NavLink to="/dashboard" className="header-menu-item" activeClassName="active">대시보드</NavLink></li>
                    <li><NavLink to="/routine" className="header-menu-item" activeClassName="active">루틴</NavLink></li>
                    <li><NavLink to="/todo" className="header-menu-item" activeClassName="active">To do</NavLink></li>
                    <li><NavLink to="/record" className="header-menu-item" activeClassName="active">기록</NavLink></li>
                    <li><NavLink to="/calendar" className="header-menu-item" activeClassName="active">캘린더</NavLink></li>
                    <li><NavLink to="/focus" className="header-menu-item" activeClassName="active">집중모드</NavLink></li>
                    <li><NavLink to="/community" className="header-menu-item" activeClassName="active">커뮤니티</NavLink></li>
                </ul>
            </div>
            <div className="right_section">
                <div className="header-alarm-wrap" ref={alarmRef}>
                    <span style={{ position: "relative", display: "inline-block" }}>
                        <img
                            src={alarm_image}
                            alt="알람"
                            className="alarm_image"
                            style={{ cursor: "pointer" }}
                            onClick={handleAlarmMenuToggle}
                            tabIndex={0}
                            role="button"
                            aria-label="알림 메뉴 열기"
                            onKeyDown={e => {
                                if (e.key === "Enter" || e.key === " ") {
                                    handleAlarmMenuToggle();
                                }
                            }}
                        />
                        {alarms.length > 0 && (
                            <span className="alarm-badge"></span>
                        )}
                    </span>
                    {showAlarmMenu && (
                        <div className="alarm-dropdown-menu">
                            <ul className="alarm-list">
                                {alarms.map((alarm, idx) => (
                                    <li className="alarm-item" key={idx}>
                                        <img src={alarm.icon} alt="" className="alarm-item-icon" />
                                        <div className="alarm-item-content">
                                            <div className="alarm-item-text">{alarm.content}</div>
                                            <div className="alarm-item-time">{alarm.time}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="alarm-menu-bottom">
                                <button className="alarm-menu-btn read-all">모두 읽음 처리</button>
                                <button className="alarm-menu-btn more">더보기</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="header-profile-name-wrap" ref={profileNameRef}>
                    <img
                        src={profile_image}
                        alt="프로필"
                        className="profile_image"
                        style={{ cursor: "pointer" }}
                        onClick={handleProfileMenuToggle}
                        tabIndex={0}
                        role="button"
                        aria-label="프로필 메뉴 열기"
                        onKeyDown={e => {
                            if (e.key === "Enter" || e.key === " ") {
                                handleProfileMenuToggle();
                            }
                        }}
                    />
                    <span
                        className="header-profile-name-link"
                        tabIndex={0}
                        role="link"
                        onClick={handleProfileMenuToggle}
                        onKeyDown={e => {
                            if (e.key === "Enter" || e.key === " ") {
                                handleProfileMenuToggle();
                            }
                        }}
                    >
                        홍길동
                    </span>
                    <span
                        className="profile-triangle-btn"
                        tabIndex={0}
                        role="button"
                        aria-label="프로필 메뉴 열기"
                        onClick={handleProfileMenuToggle}
                        onKeyDown={e => {
                            if (e.key === "Enter" || e.key === " ") {
                                handleProfileMenuToggle();
                            }
                        }}
                    >
                        <img
                            src={profile_side_icon}
                            alt="아래"
                            className="profile_side_icon"
                        />
                    </span>
                    {showProfileMenu && (
                        <div className="profile-dropdown-menu">
                            <ul>
                                <li>
                                    <img src={user} alt="" className="profile-menu-icon" />
                                    내 프로필 보기
                                </li>
                                <li>
                                    <img src={setting} alt="" className="profile-menu-icon" />
                                    계정 설정
                                </li>
                                <li>
                                    <img src={laptop} alt="" className="profile-menu-icon" />
                                    환경 설정
                                </li>
                                <li>
                                    <img src={message} alt="" className="profile-menu-icon" />
                                    문의하기
                                </li>
                                <li>
                                    <img src={logout} alt="" className="profile-menu-icon" />
                                    로그아웃
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;