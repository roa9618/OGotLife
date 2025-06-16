import React, { useState, useEffect } from "react";
import "../styles/CommunityPostView.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CommunityPostView() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [likes, setLikes] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/community/post/${postId}`)
            .then(res => {
                setPost(res.data);
                setLikes(res.data.likeCount || 0);
            });
        axios.get(`/api/community/post/${postId}/comments`)
            .then(res => setComments(res.data));
    }, [postId]);

    const handleLike = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        await axios.post(`/api/community/post/${postId}/like`, { userId }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        // 좋아요 개수 재조회
        const res = await axios.get(`/api/community/post/${postId}`);
        setLikes(res.data.likeCount || 0);
    };

    const handleReport = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const reason = window.prompt("신고 사유를 입력하세요.");
        if (!reason) return;
        await axios.post(`/api/community/post/${postId}/report`, { userId, reason }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert("신고가 접수되었습니다.");
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        await axios.post(`/api/community/post/${postId}/comment`, {
            content: comment,
            author: username
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setComment("");
        // 댓글 목록 재조회
        const res = await axios.get(`/api/community/post/${postId}/comments`);
        setComments(res.data);
    };

    if (!post) return <div className="community-postview-root">로딩 중...</div>;

    return (
        <div className="community-postview-root">
            <div className="community-postview-container">
                <button className="community-postview-back" onClick={() => navigate("/community")}>
                    ← 목록으로
                </button>
                <div className="community-postview-header">
                    <h2>{post.title}</h2>
                    <div className="community-postview-meta">
                        <span>{post.author}</span>
                        <span>{post.createdAt ? post.createdAt.slice(0, 10) : ''}</span>
                    </div>
                </div>
                <div className="community-postview-content">{post.content}</div>
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
                                <div className="comment-date">{c.createdAt ? c.createdAt.slice(0, 10) : c.date}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CommunityPostView;
