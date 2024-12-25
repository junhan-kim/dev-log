import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPage from './pages/UserPage';
import LoginPage from "./pages/LoginPage";
import PostPage from "./pages/PostPage";
import PostDetailPage from "./pages/PostDetailPage";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/users" element={<UserPage />} />
                <Route path="/posts" element={<PostPage />} />
                <Route path="/posts/:id" element={<PostDetailPage />} />
            </Routes>
        </Router>
    );
};

export default App;
