import PropTypes from "prop-types"; 
const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="mt-4 flex justify-center">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-full"
        disabled={currentPage === 1}
        onClick={handlePrev}
      >
        Prev
      </button>
      <span className="px-4 py-2">{`${currentPage} of ${totalPages}`}</span>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-full"
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
