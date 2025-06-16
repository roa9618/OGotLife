import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/myPageTab.css";

function MyScraps() {
    const [scraps, setScraps] = useState([]);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!userId) return;
        axios.get(`/api/mypage/scraps/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setScraps(res.data));
    }, [userId, token]);

    return (
        <div className="mypage-tab-root">
            <h2 className="mypage-tab-title">내 스크랩</h2>
            <div className="mypage-list-header">
                <span className="mypage-col-title">제목</span>
                <span className="mypage-col-author">작성자</span>
                <span className="mypage-col-date">작성일</span>
            </div>
            <div className="mypage-list">
                {scraps.map(scrap => (
                    <div className="mypage-list-row" key={scrap.id}>
                        <span className="mypage-col-title">{scrap.post?.title}</span>
                        <span className="mypage-col-author">{scrap.post?.author}</span>
                        <span className="mypage-col-date">{scrap.post?.createdAt ? scrap.post.createdAt.slice(0, 10) : ''}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyScraps;
