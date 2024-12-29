import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";
import "../styles/PostForm.css";

const PostCreatePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await createPost({ title, content });
            navigate("/dashboard/posts"); // 게시판 목록 페이지로 이동
        } catch (err) {
            setError("게시글 작성 중 문제가 발생했습니다.");
        }
    };

    return (
        <div className="post-form">
            <h1>게시글 작성</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">내용</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">작성</button>
            </form>
        </div>
    );
};

export default PostCreatePage;
