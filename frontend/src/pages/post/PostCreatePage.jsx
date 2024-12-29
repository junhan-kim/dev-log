import React from "react";
import { createPost } from "../../api/posts";
import PostForm from "../../components/post/PostForm";

const PostCreatePage = () => {
    const handlePostCreate = async (postData) => {
        await createPost(postData);
    };

    return (
        <div>
            <h1>게시글 작성</h1>
            <PostForm onSubmit={handlePostCreate} />
        </div>
    );
};

export default PostCreatePage;
