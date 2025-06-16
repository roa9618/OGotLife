import React from "react";
import "../styles/ProfileDropdown.css";

function Contact() {
    return (
        <div className="profile-dropdown-root">
            <h2 className="profile-dropdown-title">문의하기</h2>
            <form className="profile-dropdown-form">
                <label>문의 제목</label>
                <input type="text" placeholder="제목을 입력하세요" />
                <label>문의 내용</label>
                <textarea rows={5} placeholder="문의 내용을 입력하세요" />
                <button type="submit">문의하기</button>
            </form>
        </div>
    );
}

export default Contact;
