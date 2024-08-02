const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  nextPage,
  prevPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='flex justify-center mt-3'>
      <ul className='flex items-center justify-between w-full'>
        <li>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className='cursor-pointer text-xs px-4 py-2 rounded-md border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white'
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`text-xs py-2 px-3 rounded-md ${
                currentPage === number
                  ? 'bg-teal-500 text-white'
                  : 'bg-white text-teal-500'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={nextPage}
            disabled={currentPage === pageNumbers.length}
            className={`cursor-pointer text-xs px-4 py-2 rounded-md border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
