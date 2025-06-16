import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/myPageTab.css";

function MyComments() {
    const [comments, setComments] = useState([]);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!userId) return;
        axios.get(`/api/mypage/comments/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setComments(res.data));
    }, [userId, token]);

    return (
        <div className="mypage-tab-root">
            <h2 className="mypage-tab-title">내가 작성한 댓글</h2>
            <div className="mypage-list-header">
                <span className="mypage-col-content">댓글 내용</span>
                <span className="mypage-col-post">게시글</span>
                <span className="mypage-col-date">작성일</span>
            </div>
            <div className="mypage-list">
                {comments.map(comment => (
                    <div className="mypage-list-row" key={comment.id}>
                        <span className="mypage-col-content">{comment.content}</span>
                        <span className="mypage-col-post">{comment.postTitle}</span>
                        <span className="mypage-col-date">{comment.createdAt ? comment.createdAt.slice(0, 10) : comment.date}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyComments;
