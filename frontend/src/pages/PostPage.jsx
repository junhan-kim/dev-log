import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api/posts";
import PostList from "../components/PostList";
import "../styles/PostPage.css";
import { useNavigate } from "react-router-dom";

const PostPage = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [order, setOrder] = useState("desc");
    const navigate = useNavigate();
    const limit = 10;

    const loadPosts = async (page, orderOption) => {
        try {
            const { posts: newPosts, total_count } = await fetchPosts(page, limit, orderOption);
            setPosts(newPosts);
            setTotalPages(Math.ceil(total_count / limit));
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    };

    useEffect(() => {
        loadPosts(currentPage, order);
    }, [currentPage, order]);

    const handleOrderChange = (e) => {
        setOrder(e.target.value);
        setCurrentPage(1);
    };

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
                <select value={order} onChange={handleOrderChange} className="order-select">
                    <option value="desc">최신순</option>
                    <option value="asc">오래된 순</option>
                </select>
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
