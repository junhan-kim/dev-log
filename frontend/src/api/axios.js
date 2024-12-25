import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Add Authorization header if token exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export const fetchPosts = async () => {
    const response = await api.get("/posts/");
    return response.data;
};

export const fetchPostById = async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
};

export const createPost = async (post) => {
    const response = await api.post("/posts/", post);
    return response.data;
};

export default api
