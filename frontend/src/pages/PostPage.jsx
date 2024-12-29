import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api/posts";
import PostList from "../components/PostList";
import "../styles/PostPage.css";
import { useNavigate } from "react-router-dom";


const PostPage = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const loadPosts = async () => {
        try {
            const data = await fetchPosts();
            const sortedPosts = data.sort(
                (a, b) => new Date(b.date_created) - new Date(a.date_created)
            );
            setPosts(sortedPosts);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    return (
        <div className="post-page">
            <div className="post-page-header">
                <h1>게시판</h1>
                <button
                    className="create-post-button"
                    onClick={() => navigate("/dashboard/posts/new")}
                >
                    새 글 작성
                </button>
            </div>
            <PostList posts={posts} />
        </div>
    );
};

export default PostPage;
