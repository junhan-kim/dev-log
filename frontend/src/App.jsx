import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPage from './pages/UserPage';
import LoginPage from "./pages/LoginPage";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/users" element={<UserPage />} />
            </Routes>
        </Router>
    );
};

export default App;
