import api from "./axios";

// 게시글 가져오기
export const fetchPosts = async () => {
    const response = await api.get("/posts/");
    return response.data;
};

// 게시글 상세 가져오기
export const fetchPostById = async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
};

// 게시글 생성
export const createPost = async (post) => {
    const response = await api.post("/posts/", post);
    return response.data;
};
