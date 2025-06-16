import React, { useState } from "react";
import "../styles/CommunityWrite.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CommunityWrite() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        try {
            await axios.post('/api/community/post', {
                title,
                content,
                author: username
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate("/community");
        } catch (err) {
            alert('글 등록 실패: ' + (err.response?.data || ''));
        }
    };

    return (
        <div className="community-write-root">
            <div className="community-write-container">
                <h2 className="community-write-title">글쓰기</h2>
                <form onSubmit={handleSubmit} className="community-write-form">
                    <input
                        className="community-write-input"
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        className="community-write-textarea"
                        placeholder="내용을 입력하세요"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required
                    />
                    <div className="community-write-actions">
                        <button
                            type="button"
                            className="community-write-cancel"
                            onClick={() => navigate("/community")}
                        >
                            취소
                        </button>
                        <button type="submit" className="community-write-submit">
                            등록
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CommunityWrite;
