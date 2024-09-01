import React from 'react';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    pageLimit = 5 // Number of page buttons to display
}) => {
    const startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
    const endPage = Math.min(totalPages, startPage + pageLimit - 1);

    const pages = [];
    for (let page = startPage; page <= endPage; page++) {
        pages.push(page);
    }

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex items-center justify-center space-x-2 mt-20">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:bg-gray-200"
            >
                Previous
            </button>

            {startPage > 1 && (
                <>
                    <button
                        onClick={() => handlePageChange(1)}
                        className={`px-3 py-1 rounded-lg ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-gray-300`}
                    >
                        1
                    </button>
                    {startPage > 2 && <span className="text-gray-500">...</span>}
                </>
            )}

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-lg ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-gray-300`}
                >
                    {page}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="text-gray-500">...</span>}
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        className={`px-3 py-1 rounded-lg ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-gray-300`}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:bg-gray-200"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
