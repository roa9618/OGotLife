import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProfileDropdown.css";
import "../styles/ContactPage.css";

function Contact() {
    const navigate = useNavigate();

    return (
        <div className="contactpage-root">
            <div className="contactpage-header">
                <h2 className="contactpage-title">문의하기</h2>
                <button className="contactpage-main-btn" onClick={() => navigate("/")}>
                    메인으로
                </button>
            </div>
            <div className="contactpage-card">
                <div className="contactpage-info">
                    <span className="contactpage-info-icon">💬</span>
                    <span>
                        궁금한 점이나 불편한 점이 있으신가요?<br />
                        아래 폼을 통해 문의해주시면 빠르게 답변드리겠습니다.
                    </span>
                </div>
                <form className="contactpage-form">
                    <label htmlFor="contact-title">문의 제목</label>
                    <input id="contact-title" type="text" placeholder="제목을 입력하세요" />
                    <label htmlFor="contact-content">문의 내용</label>
                    <textarea id="contact-content" rows={5} placeholder="문의 내용을 입력하세요" />
                    <button type="submit" className="contactpage-submit-btn">문의하기</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
