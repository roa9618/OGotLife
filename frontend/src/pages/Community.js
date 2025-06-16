import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Community.css';

function Community() {
    const posts = [
        { id: 1, title: '스터디 모집합니다', author: '홍길동', date: '2023-04-08', content: '수학 스터디 구해요! 매주 토요일 2시, 관심 있으신 분 댓글 주세요.' },
        { id: 2, title: '오늘의 공부 인증', author: '김철수', date: '2023-04-07', content: '오늘 3시간 공부했습니다! 다들 화이팅!' },
        { id: 3, title: '질문있어요', author: '이영희', date: '2023-04-06', content: '영어 단어 암기법 추천 부탁드려요.' },
    ];

    return (
        <div className="community-root">
            <Header />
            <div className="community-body">
                <div className="community-layout">
                    <main className="community-main">
                        <div className="community-board">
                            <div className="community-board-header">
                                <h2>자유게시판</h2>
                                <button className="write-btn">+ 글쓰기</button>
                            </div>
                            <div className="post-list">
                                <div className="post-list-header">
                                    <span className="col-title">제목</span>
                                    <span className="col-author">작성자</span>
                                    <span className="col-date">작성일</span>
                                </div>
                                {posts.map(post => (
                                    <div className="post-card" key={post.id}>
                                        <div className="post-main">
                                            <div className="post-title">{post.title}</div>
                                            <div className="post-content">{post.content}</div>
                                        </div>
                                        <div className="post-author">{post.author}</div>
                                        <div className="post-date">{post.date}</div>
                                    </div>
                                ))}
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
