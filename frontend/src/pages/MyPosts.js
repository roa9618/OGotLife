import React from "react";
import "../styles/myPageTab.css";

function MyPosts() {
    const posts = [
        { id: 1, title: "첫 번째 글", date: "2024-06-01", commentCount: 2 },
        { id: 2, title: "두 번째 글", date: "2024-06-02", commentCount: 0 },
        { id: 3, title: "세 번째 글", date: "2024-06-03", commentCount: 5 },
    ];

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
                        <span className="mypage-col-date">{post.date}</span>
                        <span className="mypage-col-comment">{post.commentCount}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyPosts;
