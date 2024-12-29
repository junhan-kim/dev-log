import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../api/posts";
import "../styles/PostDetailPage.css";

const PostDetailPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const getPost = async () => {
            try {
                const data = await fetchPostById(id);
                setPost(data);
            } catch (error) {
                console.error("Failed to fetch post:", error);
            }
        };
        getPost();
    }, [id]);

    if (!post) return <div className="post-detail">로딩 중...</div>;

    return (
        <div className="post-detail">
            <h1>{post.title}</h1>
            <p className="post-date">{new Date(post.date_created).toLocaleDateString()}</p>
            <p>{post.content}</p>
        </div>
    );
};

export default PostDetailPage;
