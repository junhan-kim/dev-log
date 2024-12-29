import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import UserPage from "./pages/user/UserPage";
import PostPage from "./pages/post/PostPage";
import PostCreatePage from "./pages/post/PostCreatePage";
import PostDetailPage from "./pages/post/PostDetailPage";
import Navigation from "./components/Navigation";
import "./styles/App.css";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* 로그인 페이지 */}
                <Route path="/" element={<LoginPage />} />

                {/* 대시보드 */}
                <Route
                    path="/dashboard/*"
                    element={
                        <div>
                            <Navigation />
                            <Routes>
                                <Route path="users" element={<UserPage />} />
                                <Route path="posts" element={<PostPage />} />
                                <Route path="posts/new" element={<PostCreatePage />} />
                                <Route path="posts/:id" element={<PostDetailPage />} />
                            </Routes>
                        </div>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
