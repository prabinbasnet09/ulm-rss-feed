// import React from 'react';

// const wrapperStyle = {
//   width: '100%',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginTop: '20px',
// };

// const pagerStyle = {
//   display: 'flex',
//   alignItems: 'center',
//   fontWeight: 'bold',
//   fontSize: '18px',
// };

// const pagerItemStyle = {
//   margin: '0 10px',
//   cursor: 'pointer',
//   color: '#2f3640',
//   textDecoration: 'none',
//   transition: '0.3s',
// };

// const disabledPagerItemStyle = {
//   ...pagerItemStyle,
//   cursor: 'not-allowed',
//   color: '#ccc',
// };

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const previousPage = () => {
//     if (currentPage > 1) onPageChange(currentPage - 1);
//   };

//   const nextPage = () => {
//     if (currentPage < totalPages) onPageChange(currentPage + 1);
//   };

//   return (
//     <div style={wrapperStyle}>
//       <div style={pagerStyle}>
//         <button
//           style={currentPage === 1 ? disabledPagerItemStyle : pagerItemStyle}
//           onClick={previousPage}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span style={pagerItemStyle}>
//           {currentPage} / {totalPages}
//         </span>
//         <button
//           style={
//             currentPage === totalPages ? disabledPagerItemStyle : pagerItemStyle
//           }
//           onClick={nextPage}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;

import React from 'react';

const wrapperStyle = {
  width: 'fit-content',
  margin: '50px auto 5px auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '20px',
  fontFamily: 'Arial, Helvetica, sans-serif',
  border: '1px solid #ccc',
  padding: '15px 5px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
  borderRadius: '20px',
};

const pagerStyle = {
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold',
  fontSize: '18px',
};

const pagerItemStyle = {
  margin: '0 10px',
  cursor: 'pointer',
  color: 'black',
  textDecoration: 'none',
  transition: '0.3s',
};

const disabledPagerItemStyle = {
  ...pagerItemStyle,
  cursor: 'not-allowed',
  color: '#ccc',
};

const activePagerItemStyle = {
  ...pagerItemStyle,
  backgroundColor: '#ffb74d',
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const previousPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const goToPage = pageNumber => {
    onPageChange(pageNumber);
  };

  const pageButtons = Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      style={index + 1 === currentPage ? activePagerItemStyle : pagerItemStyle}
      onClick={() => goToPage(index + 1)}
    >
      {index + 1}
    </button>
  ));

  return (
    <div style={wrapperStyle}>
      <div style={pagerStyle}>
        <button
          style={currentPage === 1 ? disabledPagerItemStyle : pagerItemStyle}
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {pageButtons}
        <button
          style={
            currentPage === totalPages ? disabledPagerItemStyle : pagerItemStyle
          }
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
