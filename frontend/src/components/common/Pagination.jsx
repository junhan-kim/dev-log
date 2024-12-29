import React from "react";
import PropTypes from "prop-types";
import { calculatePageGroups } from "../../utils/paginationUtils";
import "../../styles/common/Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange, pageGroupSize = 5 }) => {
    const { startPage, endPage } = calculatePageGroups(currentPage, totalPages, pageGroupSize);

    return (
        <div className="pagination">
            {startPage > 1 && (
                <button className="pagination-arrow" onClick={() => onPageChange(startPage - 1)}>
                    &laquo; 이전
                </button>
            )}
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                <button
                    key={index}
                    className={currentPage === startPage + index ? "active" : ""}
                    onClick={() => onPageChange(startPage + index)}
                >
                    {startPage + index}
                </button>
            ))}
            {endPage < totalPages && (
                <button className="pagination-arrow" onClick={() => onPageChange(endPage + 1)}>
                    다음 &raquo;
                </button>
            )}
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    pageGroupSize: PropTypes.number,
};

export default Pagination;
