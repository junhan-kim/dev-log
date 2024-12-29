import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PostList.css";

const PostList = ({ posts }) => {
    const navigate = useNavigate();

    if (!posts || posts.length === 0) {
        return <p className="no-posts">게시물이 없습니다.</p>;
    }

    return (
        <div className="post-list">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="post-item"
                    onClick={() => navigate(`/dashboard/posts/${post.id}`)}
                >
                    <h2>{post.title}</h2>
                    <p>{new Date(post.date_created).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default PostList;
