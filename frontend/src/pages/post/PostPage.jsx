import React, { useEffect, useState } from "react";
import { fetchPosts } from "../../api/posts";
import PostList from "../../components/post/PostList";
import "../../styles/post/PostPage.css";
import { useNavigate } from "react-router-dom";

const PostPage = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [order, setOrder] = useState("desc");
    const [pageGroup, setPageGroup] = useState(0);
    const navigate = useNavigate();
    const limit = 10;
    const pageGroupSize = 5;

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
        setPageGroup(0);
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleNextGroup = () => {
        const nextGroupStart = (pageGroup + 1) * pageGroupSize + 1;
        if (nextGroupStart <= totalPages) {
            setPageGroup(pageGroup + 1);
            setCurrentPage(nextGroupStart);
        }
    };

    const handlePreviousGroup = () => {
        const previousGroupStart = pageGroup * pageGroupSize - pageGroupSize + 1;
        if (previousGroupStart > 0) {
            setPageGroup(pageGroup - 1);
            setCurrentPage(previousGroupStart);
        }
    };

    const renderPagination = () => {
        const startPage = pageGroup * pageGroupSize + 1;
        const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

        return (
            <>
                {pageGroup > 0 && (
                    <button className="pagination-arrow" onClick={handlePreviousGroup}>
                        &laquo; 이전
                    </button>
                )}
                {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                    <button
                        key={index}
                        className={currentPage === startPage + index ? "active" : ""}
                        onClick={() => handlePageChange(startPage + index)}
                    >
                        {startPage + index}
                    </button>
                ))}
                {endPage < totalPages && (
                    <button className="pagination-arrow" onClick={handleNextGroup}>
                        다음 &raquo;
                    </button>
                )}
            </>
        );
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
            <div className="pagination">{renderPagination()}</div>
        </div>
    );
};

export default PostPage;
