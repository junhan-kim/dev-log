import React, { useEffect, useState } from "react";
import { fetchPosts, createPost } from "../api/posts";

const PostPage = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const loadPosts = async () => {
            const data = await fetchPosts();
            setPosts(data);
        };
        loadPosts();
    }, []);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        const newPost = await createPost({ title, content });
        setPosts([newPost, ...posts]);
        setTitle("");
        setContent("");
    };

    return (
        <div>
            <h1>Posts</h1>
            <form onSubmit={handleCreatePost}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                />
                <button type="submit">Create Post</button>
            </form>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
};

export default PostPage;
