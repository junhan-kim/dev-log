import api from "./axios";

export const fetchPosts = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const response = await api.get(`/posts/?skip=${skip}&limit=${limit}`);
    console.log("Fetched posts:", response.data);
    return {
        posts: response.data.posts || [],
        total_count: response.data.total_count || 0,
    };
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

