import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPage from './pages/UserPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserPage />} />
            </Routes>
        </Router>
    );
};

export default App;
