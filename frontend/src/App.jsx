import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostDetailPage from "./pages/PostDetailPage";
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
