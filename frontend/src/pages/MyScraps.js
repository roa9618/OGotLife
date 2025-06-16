import React from "react";
import "../styles/myPageTab.css";

function MyScraps() {
    const scraps = [
        { id: 1, title: "스크랩한 글1", author: "홍길동", date: "2024-06-01" },
        { id: 2, title: "스크랩한 글2", author: "김철수", date: "2024-06-02" },
    ];

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
                        <span className="mypage-col-title">{scrap.title}</span>
                        <span className="mypage-col-author">{scrap.author}</span>
                        <span className="mypage-col-date">{scrap.date}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyScraps;
