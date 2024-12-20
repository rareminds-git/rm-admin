/* eslint-disable react/prop-types */
import React from 'react';

const Pagination = ({ postsPerPage, length, currentPage, handlePagination }) => {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className="pagination">
      {paginationNumbers.map((pageNumber) => (
        <button key={pageNumber}  onClick={() => handlePagination(pageNumber)} className={currentPage === pageNumber ? 'active' : ''}>
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
