import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api/posts";
import PostList from "../components/PostList";
import "../styles/PostPage.css";
import { useNavigate } from "react-router-dom";

const PostPage = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const limit = 10;

    const loadPosts = async (page) => {
        try {
            const { posts: newPosts, total_count } = await fetchPosts(page, limit);
            setPosts(newPosts);
            setTotalPages(Math.ceil(total_count / limit));
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    };

    useEffect(() => {
        loadPosts(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

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
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={currentPage === index + 1 ? "active" : ""}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PostPage;
