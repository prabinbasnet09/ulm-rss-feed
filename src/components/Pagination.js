const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const previousPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className='pagination'>
      <button onClick={previousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button onClick={nextPage} disabled={currentPage === totalPages}>
        Next
      </button>

      <style jsx>{`
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 1rem 0;
        }

        button {
          background-color: #2d7ff9;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          margin: 0 0.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        button:hover {
          background-color: #4a8ff5;
        }

        button:disabled {
          background-color: #a0c1ff;
          cursor: not-allowed;
        }

        span {
          margin: 0 1rem;
        }
      `}</style>
    </div>
  );
};

export default Pagination;
