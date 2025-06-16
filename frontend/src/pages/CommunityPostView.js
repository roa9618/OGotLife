import React, { useState } from "react";
import "../styles/CommunityPostView.css";
import { useNavigate, useParams } from "react-router-dom";

const dummyPost = {
    id: 1,
    title: "예시 글 제목",
    content: "이곳에 글 내용이 표시됩니다.",
    author: "작성자",
    date: "2024-06-01",
    likes: 5,
};

const dummyComments = [
    { id: 1, author: "댓글러1", content: "좋은 글이네요!", date: "2024-06-01" },
    { id: 2, author: "댓글러2", content: "동의합니다.", date: "2024-06-02" },
];

function CommunityPostView() {
    const { postId } = useParams();
    const [comments, setComments] = useState(dummyComments);
    const [comment, setComment] = useState("");
    const [likes, setLikes] = useState(dummyPost.likes);
    const navigate = useNavigate();

    const handleLike = () => setLikes(likes + 1);
    const handleReport = () => alert("신고가 접수되었습니다.");
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        setComments([
            ...comments,
            {
                id: comments.length + 1,
                author: "나",
                content: comment,
                date: new Date().toISOString().slice(0, 10),
            },
        ]);
        setComment("");
    };

    return (
        <div className="community-postview-root">
            <div className="community-postview-container">
                <button className="community-postview-back" onClick={() => navigate("/community")}>
                    ← 목록으로
                </button>
                <div className="community-postview-header">
                    <h2>{dummyPost.title}</h2>
                    <div className="community-postview-meta">
                        <span>{dummyPost.author}</span>
                        <span>{dummyPost.date}</span>
                    </div>
                </div>
                <div className="community-postview-content">{dummyPost.content}</div>
                <div className="community-postview-actions">
                    <button className="like-btn" onClick={handleLike}>추천 {likes}</button>
                    <button className="report-btn" onClick={handleReport}>신고</button>
                </div>
                <div className="community-postview-comments">
                    <h3>댓글</h3>
                    <form onSubmit={handleCommentSubmit} className="comment-form">
                        <textarea
                            className="comment-input"
                            placeholder="댓글을 입력하세요"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            required
                        />
                        <button type="submit" className="comment-submit">등록</button>
                    </form>
                    <ul className="comment-list">
                        {comments.map(c => (
                            <li key={c.id} className="comment-item">
                                <div className="comment-author">{c.author}</div>
                                <div className="comment-content">{c.content}</div>
                                <div className="comment-date">{c.date}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CommunityPostView;
