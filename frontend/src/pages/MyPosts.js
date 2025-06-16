import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/myPageTab.css";

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!userId) return;
        axios.get(`/api/mypage/posts/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setPosts(res.data));
    }, [userId, token]);

    return (
        <div className="mypage-tab-root">
            <h2 className="mypage-tab-title">내가 작성한 글</h2>
            <div className="mypage-list-header">
                <span className="mypage-col-title">제목</span>
                <span className="mypage-col-date">작성일</span>
                <span className="mypage-col-comment">댓글</span>
            </div>
            <div className="mypage-list">
                {posts.map(post => (
                    <div className="mypage-list-row" key={post.id}>
                        <span className="mypage-col-title">{post.title}</span>
                        <span className="mypage-col-date">{post.createdAt ? post.createdAt.slice(0, 10) : ''}</span>
                        <span className="mypage-col-comment">{post.commentCount ?? 0}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyPosts;
