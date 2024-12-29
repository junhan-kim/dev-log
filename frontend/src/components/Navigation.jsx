import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navigation.css";

const Navigation = () => {
    return (
        <nav className="navigation">
            <Link to="/dashboard/users">유저 페이지</Link>
            <Link to="/dashboard/posts">게시판</Link>
        </nav>
    );
};

export default Navigation;
