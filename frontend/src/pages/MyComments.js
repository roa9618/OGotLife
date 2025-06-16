import React from "react";
import "../styles/myPageTab.css";

function MyComments() {
    const comments = [
        { id: 1, content: "좋은 글이네요!", postTitle: "첫 번째 글", date: "2024-06-01" },
        { id: 2, content: "동의합니다.", postTitle: "두 번째 글", date: "2024-06-02" },
        { id: 3, content: "감사합니다.", postTitle: "세 번째 글", date: "2024-06-03" },
    ];

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
                        <span className="mypage-col-date">{comment.date}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyComments;
