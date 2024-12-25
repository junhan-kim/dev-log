import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../api/posts";
import "../styles/PostDetailPage.css";

const PostDetailPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const loadPost = async () => {
            try {
                const data = await fetchPostById(id);
                setPost(data);
            } catch (err) {
                console.error("Failed to fetch post:", err);
            }
        };
        loadPost();
    }, [id]);

    if (!post) return <p>Loading post...</p>;

    return (
        <div className="post-detail-page">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
};

export default PostDetailPage;
