import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/Community.css';

function Community() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    useEffect(() => {
        setLoading(true);
        axios.get('/api/community/posts')
            .then(res => setPosts(res.data))
            .finally(() => setLoading(false));
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(posts.length / postsPerPage);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className="community-root">
            <Header />
            <div className="community-body">
                <div className="community-layout">
                    <main className="community-main">
                        <div className="community-board">
                            <div className="community-board-header">
                                <h2>커뮤니티</h2>
                                <button className="write-btn" onClick={() => navigate("/community/write")}>
                                    글쓰기
                                </button>
                            </div>
                            <div className="post-list">
                                <div className="post-list-header">
                                    <span className="col-title">제목</span>
                                    <span className="col-author">작성자</span>
                                    <span className="col-date">작성일</span>
                                </div>
                                {loading && <div>로딩 중...</div>}
                                {currentPosts.map(post => (
                                    <div
                                        className="post-card"
                                        key={post.id}
                                        onClick={() => navigate(`/community/post/${post.id}`)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div className="post-main">
                                            <div className="post-title">{post.title}</div>
                                            <div className="post-content">{post.content}</div>
                                        </div>
                                        <div className="post-author">{post.author}</div>
                                        <div className="post-date">{post.createdAt ? post.createdAt.slice(0, 10) : ''}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="pagination">
                                <button
                                    className="pagination-btn"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    이전
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        className={`pagination-btn${currentPage === i + 1 ? " active" : ""}`}
                                        onClick={() => handlePageChange(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    className="pagination-btn"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    다음
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Community;
